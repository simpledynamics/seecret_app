/*
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
http://creativecommons.org/licenses/by-nc-sa/4.0/
*/
var app = {	
	TIMELINE_VIEW:"timeline",
	SETTINGS_VIEW:"settings",
	DIRECT_MESSAGES_VIEW:"privateMessages",
	PUBLIC_KEYS_VIEW:"publicKeys",
	STATUS_MESSAGE_VIEW:"statusMessage",
	ABOUT_VIEW:"about",
	HASHES_VIEW:"hashes",
	oauthResult:null,
	doScroll:true,
	activeUser:{},
	NUM_DM:200,
	publicKeyStartRegex:/^\s*-----BEGIN PGP PUBLIC KEY BLOCK-----\s/,
	publicKeyEndRegex:/\s-----END PGP PUBLIC KEY BLOCK-----\s*$/,
	pgpMessageStartRegex:/^\s*-----BEGIN PGP MESSAGE-----/,
	pgpMessageEndRegex:/\s-----END PGP MESSAGE-----\s*$/,
	dmPostData:{},
    dmMaxId:null,
	dmSinceId:null,
	passphrase: null,
	hasFirstDirectMessage:false,
	joinMessage:
	"I'm using Seecret to send encrypted direct messages over Twitter. Try it with me! Just go to https://www.seecret.net",
	sendingDirectMessage:false,
	postedDirectMessageId:null,
	directMessagesToPost:null,
	directMessageCount:0,
	maxId:null,
	lastId:null,
	homeTimeline:true,
	userTimelineId:null,
	httpsReplaceRegex:/^http:/,
	postCompleteCount:0,
	postCompleteTarget:0,
	timers:{},
	privateKeyUpdateStatus:{},
	refreshActiveUserTotal:function(){
		if(app.activeUser){
			var obj = app.getObject("privateKey-" + app.activeUser.user.id_str);
			app.activeUser.privateKey = obj;

			var obj = app.getObject("publicKey-" + app.activeUser.user.id_str);
			app.activeUser.publicKey = obj;

			var obj = app.getObject("publicKeys-" + app.activeUser.user.id_str);
			app.activeUser.publicKeys = obj;

			var obj = app.getObject("keyOptions-" + app.activeUser.user.id_str);
			app.activeUser.keyOptions = obj;

			var obj = app.getObject("sentPublicKeys-" + app.activeUser.user.id_str);
			app.activeUser.sentPublicKeys = obj;
			app.refreshActiveUserDMSenders();
		}
	},
	refreshActiveUserDMSenders:function(callback) {
		var obj = app.getObject("dmSenders-" + app.activeUser.user.id_str);
		app.activeUser.dmSenders = obj;
	},
    initialize: function() {
		if(location.hash){
			history.pushState("", document.title, window.location.pathname + window.location.search);
		}
		app.unauthenticatedUI();
		app.initOauth();
    },
    loginToTwitter: function() {
    	OAuth.popup('twitter', {
    		options: {
                cache: true
            }
        })
    	.done(function(result) {
			console.log("oauth done!");
    		app.oauthResult = result;
    		app.saveOauth();
			app.updateOauthUserInfo();
    	})
    	.fail(function (err) {
			console.log(JSON.stringify(err));
			alert("Error logging into Twitter.  Please try again");
			app.unauthenticatedUI();
    	});
    },
    logoutFromTwitter: function() {
			app.oauthResult=null;
			app.lastProcessedStatusId=null;
			app.lastProcessedMessageId=null;
			app.dmMaxId=null;
			app.postedDirectMessageId=null;
			app.directMessagesToPost=null;
			app.directMessageCount=null;
			app.maxId=null;
			app.activeUser={};
			app.lastId=null;
			app.password=null;
			app.postCompleteCount=0;
			app.postCompleteTarget=0;
			app.deleteSavedItem("user");
			localStorage.removeItem('oauth_token');
			localStorage.removeItem('oauth_token_secret');
			app.hideAllViews();
			app.unauthenticatedUI();
	},
    initOauth: function() {
    	if(app.oauthResult == null) {
    		OAuth.initialize(oauthio_key.key);	
			app.loadOauth();
			app.updateOauthUserInfo();
    	}
		else {
			app.loadOauth();
			app.updateOauthUserInfo();
		}

    }, 
    saveOauth: function () {
    	localStorage.setItem('oauth_token', app.oauthResult.oauth_token);
    	localStorage.setItem('oauth_token_secret', app.oauthResult.oauth_token_secret);
    },
    loadOauth: function() {
    	var oauth_token_str = localStorage.getItem('oauth_token');
    	var oauth_token_secret_str = localStorage.getItem('oauth_token_secret');
    	if(oauth_token_str == null || oauth_token_secret_str == null) {
    		return null;
    	}
    	var tokens = {
			oauth_token: oauth_token_str,
			oauth_token_secret : oauth_token_secret_str
        };
    	app.oauthResult = OAuth.create('twitter', tokens);
    },
	updateOathUserInfoComplete:function(data) {
		if(app.activeUser != null  && app.activeUser.user != null && app.activeUser.user.id_str != null  && app.activeUser.privateKey == null){
			app.hideAllViews();
			//don't use normal setView because the 'fadeIn()' function creates UI thrashing while generating the key
			$("#" + app.STATUS_MESSAGE_VIEW).show();
			app.generatePrivateKeyPair(app.generatePassword(),true,function() {
				app.updateUIBasedUponOauthResult();
			});
		}
		else {
			app.updateUIBasedUponOauthResult();
		}
	},
	updateOauthUserInfo: function () {
		if(app.oauthResult != null) {
	    	app.oauthResult.me().done(function(data) {
				app.activeUser.user = data.raw;
				app.refreshActiveUserTotal();
				app.updateOathUserInfoComplete(data);
			})
			.fail(function (err) {
				alert("There was an error logging you into Twitter.  Please reload the page and try again.");
				//console.log("could not load oauthResult");
		    });
		}
		else {
			//console.log("already loaded oauthResult");
			app.updateOathUserInfoComplete();
		}
	},
    updateUIBasedUponOauthResult: function() {
			if(app.oauthResult != null) {  
				app.authenticatedUI();
				app.maxId=null;
				app.updateHomeTimeline();
			} else {
				app.unauthenticatedUI();
			}
    },
	initializeDirectMessagesView:function(){
		app.setView(app.DIRECT_MESSAGES_VIEW);		
		if($("#friendsContainer").html() == "") {
			app.startDirectMessages();
		}
	},
	getNewestDirectMessages:function() {
		app.setupDMPostData();
		if(app.dmSinceId){
			app.dmPostData.since_id=app.dmSinceId;
			app.overlay();
			app.doDMPost(app.dmPostData,app.handleDMResponse);
		}
		else {
			console.log("getting newest but there's no since id?  ");
		}
	},
	setupDMPostData:function() {
		app.dmPostData = {
			count: app.NUM_DM,
			full_text:true,
			include_entities:false,
			skip_status:true
		};
	},
	startDirectMessages:function() {
		app.setupDMPostData();
		app.overlay();
		app.doDMPost(app.dmPostData,app.handleDMResponse);
		
	},
	doDMPost:function(postData,callback){
		app.updatingDirectMessages=true;
		app.timer("direct message post");
    	app.oauthResult.get('1.1/direct_messages.json', {
            data: postData
        })
        .done(function (response) {
			app.timer("direct message post");
			//console.log("Got "+ response.length + " direct messages");
			if(response.length > 0){
				if(response.length == app.NUM_DM){
					$("#getOlderMessagesButton").show();
					
				}
				app.dmSinceId = response[0].id_str;
				//if(!app.dmSinceId){}
				callback(response);
			}
			else {
				app.hideOverlays();
				if(app.dmPostData.since_id){
					alert("No new direct messages");
				}
				else if(!app.dmPostData.max_id){
					$("#directMessages").html("You have no direct messages.");
				}
				
			}
		})
        .fail(function (err) {
			app.hideOverlays();
        })
	},
	toConversation:function(followerId){
		app.setView(app.DIRECT_MESSAGES_VIEW);
		if(document.getElementById("friendDetails_" + followerId) == null) {
			app.getFollowerInfo(followerId,app.createConversationEntry);
		}
		else {
			//app.toggleFriendMessages('{{id_str}}',this.id)" id="friendMessagesToggleLink_{{id_str}}"
			app.toggleFriendMessages(followerId,"friendMessagesToggleLink_"+followerId);				
		}
	},
	getFollowerInfo:function(followerId,callback){
		console.log("getting follower info for " + followerId);
		app.oauthResult.get('1.1/users/show.json?user_id='+followerId)
		.done(function (response) {
			console.log("Got the follower: " + response);
			callback(response)
		})
		.fail(function (err) {
			console.log("Error getting new follower id " + JSON.stringify(err));
		});
	},
	createConversationEntry:function(follower){
		var keys = app.getObject("publicKeys-"+app.activeUser.user.id_str);
		if(keys){
			follower.publicKey = keys[follower.id_str];
		}
		var sentkeys = app.getObject("sentPublicKeys-"+app.activeUser.user.id_str);
		if(sentkeys){
			follower.sentKey = sentkeys[follower.id_str];
		}
		$("#friendsContainer").append(Handlebars.getTemplate("conversation-template")(follower));
	},
	handleDMResponse:function(response){
		app.timer("handleDMResponse");
		var bNewest = app.dmPostData.since_id != null;
		if(bNewest && response.length == 0){
			alert("No new messages");
			return;
		}
		$(".dmIconNew").hide();
		console.log("handling dm response for " + response.length);
		if(response.length == 1 && response[0].id_str == app.dmMaxId){
			if(!app.hasFirstDirectMessage) {
					$("#directMessages").append(Handlebars.getTemplate("no-more-direct-messages-template")());
					$("#getOlderMessagesButton").hide();
			}
			app.hasFirstDirectMessage = true;
			app.hideOverlays();
			app.updatingDirectMessages=false;
		}
		else if(response.length == 0){
			$("#directMessages").append(Handlebars.getTemplate("no-seecrets-in-direct-messages-template")());
			app.hideOverlays();
			app.updatingDirectMessages=false;
		}
		else {
		/* 
		Ok let's dechainify seecrets, and save off new public keys received, and decrypt valid encrypted messages
		*/
		var messages = app.processMessageList(response,"sender","dmMaxId");
		if(app.timelineContainsKeys(messages)) {
			console.log("saving public keys!");
			app.savePublicKeys(app.getPublicKeyMessagesFromDMList(messages));
		}
		
		var friendList = app.getFriendsFromMessageList(messages);
		app.markMessageableFriends(friendList);
		app.markFriendsWithSentKeys(friendList);
		console.log("Found " + friendList.length + " friends");
		if(  $("#friendsContainer").is(":empty") ){
			$("#friendsContainer").html(Handlebars.getTemplate("conversations-template")(friendList));
		}
		else {
			//TODO:  update friend list entry with a 'new' indicator?  or message count etc... or 'have key, don't have key' indicator...?
			var newFriends = [];
			for(var f in friendList){
				if(document.getElementById("friendDetails_" + friendList[f].id_str) == null) {
					newFriends.push(friendList[f]);
				}
			}
			if(newFriends.length > 0){
				$("#friendsContainer").prepend(Handlebars.getTemplate("friends-list-template")(newFriends));
				
			}
			else {
				console.log("no new friends");
			}
		}

		if(bNewest) {
			var screen_names = "New messages from ";
			var delimiter = "";
			for(var f in friendList){
				screen_names += delimiter + friendList[f].screen_name;
				delimiter = ",";
			}
			if(response.length > 0){
				alert(screen_names);
			}
		}
		if(app.timelineContainsEncryptedMessages(messages)) {
				app.markEncryptedDirectMessages(messages);
				//The animated image freezes when jumping into promise land
				app.decryptDirectMessages(messages);
			}
			else {
				app.updateDirectMessagesUI(messages,friendList);
			}
		}
		app.hideOverlays();
		app.timer("handleDMResponse");
	},
	updateDirectMessagesUI:function(messages,friendList) {
		app.hideOverlays();
		var friendList = friendList?friendList:app.getFriendsFromMessageList(messages);
		app.renderAllFriendMessages(friendList,messages);
		app.updatingDirectMessages=false;
	},
	markMessageableFriends:function(friends){
		var keys = app.getObject("publicKeys-"+app.activeUser.user.id_str);
		for(var f in friends){
			console.log("the public key is " + keys[friends[f].id_str]);
			friends[f].publicKey = keys[friends[f].id_str];
		}
	},
	markFriendsWithSentKeys:function(friends){
		console.log("marking friends with sent keys!");
		var sentKeys = app.getObject("sentPublicKeys-"+app.activeUser.user.id_str);
		for(var s in sentKeys){
			for (var f in friends){
				if(s == friends[f].id_str){
					//console.log("found a sent key to " + s);
					friends[f].sentKey = sentKeys[s];
				}
			}
		}
	},
	renderAllFriendMessages:function(friends,timeline){
		for(var f in friends){
			app.renderFriendMessages(friends[f].id_str,timeline);
		}
	},
	renderFriendMessages:function(friendId,timeline){
		var messages = app.filterMessageListByFriendId(timeline,friendId);
		if(app.dmPostData.since_id){
			for(var m in messages){
				messages[m].new = true;
			}
			$("#friendMessages_" + friendId).prepend(Handlebars.getTemplate("direct-messages-template")(messages));
		}
		else {
			$("#friendMessages_" + friendId).append(Handlebars.getTemplate("direct-messages-template")(messages));
		}
	},
	getFriendsFromMessageList:function(timeline){
		var friends = {};
		for(var t in timeline){
			if(!friends[timeline[t].sender.screen_name]) {
				friends[timeline[t].sender.screen_name] = timeline[t].sender;
				friends[timeline[t].sender.screen_name].most_recent = timeline[t];
				console.log("Most recent message from " + timeline[t].sender.screen_name +  " is " + timeline[t].created_at);
			}
			if(!friends[timeline[t].sender.screen_name].message_count) {
				friends[timeline[t].sender.screen_name].message_count = 0;
			}
			friends[timeline[t].sender.screen_name].message_count++;
		}
		var friendList = [];
		for(f in friends){
			friendList.push(friends[f]);
		}
		return friendList;
		
	},
	toggleFriendMessages:function(friendId){
		var linkText = $("#friendMessagesToggleLink_" + friendId).html();
		if(linkText != "show conversation"){
			$("#friendMessagesToggleLink_" + friendId).html("show conversation");
			$("#friendMessageForm_"+friendId).fadeOut();
			$("#friendMessages_" + friendId).fadeOut();
			
		}
		else {
			$("#friendMessagesToggleLink_" + friendId).html("hide conversation");
			$("#friendMessageForm_"+friendId).fadeIn();
			$("#friendMessages_" + friendId).fadeIn();
		}
	},
	filterMessageListByFriendId:function(list,friendId){
		var messages = [];
		for(var l in list){
			if(list[l].sender.id_str== friendId || list[l].sender.id_str == app.activeUser.id_str){
				messages.push(list[l]);
			}
		}
		console.log("filtered " + list.length + " down to " + messages.length);
		return messages;
	},
	getOlderDirectMessages:function() {
		if(!app.hasFirstDirectMessage){
			app.setupDMPostData();
			app.dmPostData.max_id=app.dmMaxId;
			app.doDMPost(app.dmPostData,function(response){
				if(response.length < app.NUM_DM || app.dmMaxId == response[response.length-1].id_str){
						app.hasFirstDirectMessage = true;
						$("#directMessages").append(Handlebars.getTemplate("no-more-direct-messages-template")());
						$("#getOlderMessagesButton").hide();
				}
				app.handleDMResponse(response);
			});
			
		}
	},
	isPublicKey:function(val){
		return app.publicKeyStartRegex.test(val) && app.publicKeyEndRegex.test(val);
	},
	isPGPMessage:function(val){
		return app.pgpMessageStartRegex.test(val) && app.pgpMessageEndRegex.test(val);
	},
	timelineContainsKeys:function(timeline){
		for(var t in timeline){
			var val = timeline[t].seecret;
			if(app.isPublicKey(val)) {
				return true;
			}
		}
		return false;
	},
	timelineContainsEncryptedMessages:function(timeline){
		for(var t in timeline){
			var val = timeline[t].seecret;
			if(app.isPGPMessage(val)) {
				return true;
			}
		}
		return false;
	},
	getPublicKeyMessagesFromDMList:function(list){
		var keys = [];
		for(var i in list){
			if(app.isPublicKey(list[i].seecret)){
				keys.push(list[i]);
			}
		}
		return keys;
	},
	savePublicKeys:function(keys){
		var user = app.activeUser.user;
		var sentPublicKeys = app.activeUser.sentPublicKeys;
		var publicKeys = app.activeUser.publicKeys;
		if(publicKeys == null) publicKeys = {};
		var newPublicKeys = {};
		if(sentPublicKeys == null) sentPublicKeys = {};
		var outbound = Array();
		for(var each in keys){
			if(keys[each].sender.id_str == app.activeUser.user.id){
				//this is the user's own key in an outbound DM;
				//should never happen because dms API returns only inbound AFAICT
				continue;
			}
			//last sent key should be found first and the older ones ignored
			if(!newPublicKeys[keys[each].sender.id_str]){
				newPublicKeys[keys[each].sender.id_str] =  {
					key:keys[each].seecret,
					screen_name:keys[each].sender.screen_name,
					id_str:keys[each].sender.id_str,
					profile_image_url:keys[each].sender.profile_image_url,
					receiveDate:keys[each].created_at
				}
			}
		}
		for(var x in newPublicKeys){
			if(!publicKeys[x]){
				//this is a newly received public key
				//TODO:  yellow fade this?
				$("#friendKeyContainer_"+x).html("Just sent you their key!");
			}
			publicKeys[x] = newPublicKeys[x];
		}
		app.saveObject("publicKeys-"+app.activeUser.user.id_str,publicKeys);
		app.activeUser.publicKeys = publicKeys;
	},
	markEncryptedDirectMessages:function(messages){
		for(var m in messages){
			if(this.isPGPMessage(messages[m].seecret)) {
				messages[m].encrypted=true;
				messages[m].decrypted=false;
			}
		}
	},
	sendPublicKeyMessages:function(pkMessages,keysToSend){
		app.postDirectMessages(pkMessages,function(){
			app.trackSentPublicKeys(keysToSend);
		});
	},
	trackSentPublicKeys:function(newKeys){
			var sentPublicKeys = app.activeUser.sentPublicKeys;
			if(sentPublicKeys == null) sentPublicKeys = {};
			for(var k in newKeys){
				sentPublicKeys[k] = new Date();
			}
			app.activeUser.sentPublicKeys=sentPublicKeys;
			app.saveObject("sentPublicKeys-"+app.activeUser.user.id_str,sentPublicKeys);
	},
	decryptDirectMessages:function(messages){
		app.timer("decryptDirectMessages");
		var privateKey = openpgp.key.readArmored(app.activeUser.privateKey.armored).keys[0];
		if(app.decryptPrivateKey(privateKey)) {
			app.verifyMessagesDecrypted(messages,privateKey);
		}
		else {
			alert("Could not verify your passphrase.  Showing messages undecrypted.")
			for(var m in messages){
				if(messages[m].encrypted){
					messages[m].text = messages[m].text + " (could not decrypt)";
				}
			}
			app.updateDirectMessagesUI(messages);
		}
	},
	verifyMessagesDecrypted:function(messages,pkey) {
		var index = null;
		for(var x in messages)
		{
			if(messages[x].encrypted && messages[x].decrypted == false){
				index = x;
				break;
			}
		}
		var user = app.activeUser.user;
		if(index != null)
		{
			if(messages[index].sender.id_str == user.id) {
				messages[index].decrypted = true;
				app.verifyMessagesDecrypted(messages,pkey);
			}
			else {
				messages[index].decrypted=true;
				messages[index].decryptionSuccessful=false;
				messages[index].originaltext = messages[index].text;
				try{
					var pgpmsg = openpgp.message.readArmored(messages[index].seecret);
					var opts = {
						privateKey:pkey,
						message:pgpmsg
					}
					if(app.activeUser.publicKeys && app.activeUser.publicKeys[messages[index].sender.id_str]){
						var thePublicKey = app.activeUser.publicKeys[messages[index].sender.id_str].key;
						var senderPublicKeys = openpgp.key.readArmored(thePublicKey);
						opts.publicKeys = senderPublicKeys.keys;
					}
					
					try{
						openpgp.decrypt(opts)
						.then(
							function(response){
								messages[x].decryptionSuccessful=true;
								messages[x].seecret = response.data;
								if(response.signatures && response.signatures.length > 0 && response.signatures[0].valid){
									messages[x].signed = true;
								}
								app.verifyMessagesDecrypted(messages,opts.privateKey);
							},
							function(error){
								messages[x].text=app.generateUndecryptedMessageContent(messages[x]);
								app.verifyMessagesDecrypted(messages,opts.privateKey);
							}
						)
					}
					catch(Error){
						console.log("try/catch error decrypting: " + JSON.stringify(Error) );
						messages[x].text=app.generateUndecryptedMessageContent(messages[x]);
						app.verifyMessagesDecrypted(messages,pkey);
					}
				}	
				catch(Error){
					console.log("major try/catch error decrypting: " + JSON.stringify(Error) );
					messages[x].text=app.generateUndecryptedMessageContent(messages[x]);
					app.verifyMessagesDecrypted(messages,pkey);
				}
			}
		}
		else{
			var dmSenders = app.activeUser.dmSenders;
			if(!dmSenders){
				dmSenders = {};
			}
			for(var each in messages){
				if(messages[each].encrypted && messages[each].sender.id_str != app.activeUser.id){
					dmSenders[messages[each].sender.id_str] = true;
				}
			}
			app.saveObject("dmSenders-"+app.activeUser.user.id_str,dmSenders);
			app.refreshActiveUserDMSenders(),
			app.timer("decryptDirectMessages");
			app.timer("updateDirectMessagesUI");
			app.updateDirectMessagesUI(messages);
			app.timer("updateDirectMessagesUI");
		}
	},
	undecryptedMessageContentHandler:null,
	generateUndecryptedMessageContent:function(message){
		return Handlebars.getTemplate("undecrypted-message-content-template")(message);
	},
	showPublicKeyManager:function(receiverId, receiverName){
		app.doScroll=false;
		var data = {};
		data.receiver_name = receiverName;
		data.receiver_id = receiverId;
        $('#directMessagesActionsContainer').html(Handlebars.getTemplate("public-key-template")(data));        
	},
	showWaitingForPublicKeyView:function(receiverId, receiverName){
		app.doScroll=false;
		var data = {};
		data.receiver_name = receiverName;
		data.receiver_id = receiverId;
		data.invite_date = moment(app.activeUser.sentPublicKeys[receiverId]).format('MMMM Do YYYY, h:mm:ss a');
        $('#directMessagesActionsContainer').html(Handlebars.getTemplate("public-key-pending-template")(data));        
	},
	showDirectMessageForm:function(receiverId,receiverName){
		app.doScroll=false;
		var data ={receiverId:receiverId,receiverName:receiverName};
		//TODO:  get the user's public key and decide if to show the last date 
        $('#directMessagesActionsContainer').html(Handlebars.getTemplate("direct-message-template")(data));        
		app.doScroll=false;
	},
	makeKeyOptionsForUser:function(user) {
		var phrase = app.generatePassword();
		var bits  = 1024;
		//taken directly from openpgp test 
		if (openpgp.util.getWebCryptoAll()) { bits = 2048; } // webkit webcrypto accepts minimum 2048 bit
		var keyOptions = {
					numBits:bits,
					//openpgpjs requires a valid email format for the userid, FOR SOME REASON
					userIds:[{name:user.name,email:user.screen_name+"@seecretApp.seecret"}],
					passphrase:phrase
		}
		return keyOptions;
	},
	generatePassword:function(){
		var str = "";
		for(var i =0; i<50;i++){
			str += app.getValidPasswordCharacter();
		}
		return str;
	},
	getValidPasswordCharacter:function() {
		var bContinue = true;
		while(bContinue){
			var charCode = Math.floor(Math.random() * 206) + 48;
			if(charCode==173 || charCode == 92 || (charCode >= 58 && charCode <= 64) || (charCode >= 127 && charCode<= 160) ){
				continue;
			}
			return String.fromCharCode(charCode);
		}
	},
	validateNewPrivateKey:function(fieldId){
		var val = $("#" + fieldId).val();
		if(val.length < 1){
			$("#" + fieldId + "Error").html("You must have a passphrase for your key of at least one character");
			return false;
		}
		else {
			$("#" + fieldId + "Error").html("");
			if(confirm("Are you sure?")){
				var passphrase = $("#" + fieldId).val();
				var save = document.getElementById(fieldId + "Cache").checked == true;
				app.hideAllViews();
				//don't use normal setView because the 'fadeIn()' function creates UI thrashing while generating the key
				$("#" + app.STATUS_MESSAGE_VIEW).show();
				app.generatePrivateKeyPair(passphrase, save, function(){
					$("#" + fieldId).val("");
					if(confirm("Send your new key to the contacts who have the old one?")) {
						app.resendPublicKeys();
					}
					$("#directMessagesActionsContainer").empty();
					app.renderPrivateKeySettings();
					app.setView(app.SETTINGS_VIEW);
				});
				
			}
		}
	},
	resendPublicKeys: function(){
			var user = app.activeUser.user;
			var sentPublicKeys = app.activeUser.sentPublicKeys;
			var dmSenders = app.activeUser.dmSenders;
			if(sentPublicKeys == null && dmSenders == null){
				return;
			}
			var outbound = Array();
			var keysToSend = {};
			var count = 0;
			for(var each in sentPublicKeys){
				keysToSend[each] = true;
			}
			for(var each in dmSenders){
				keysToSend[each] = true;
			}
			var keyCount=0;
			for(var k in keysToSend)
			{
				keyCount++;
				var pkMessages = app.generatePublicKeyMessages(k);
				for(var pk in pkMessages){
					outbound.push({receiverId:k,text:pkMessages[pk]});
				}
			}
			if(outbound.length > 0) app.sendPublicKeyMessages(outbound,keysToSend);
	},
	generatePrivateKeyPair:function(passphrase,save,callback){
			var user = app.activeUser.user;
			var keyOptions = app.makeKeyOptionsForUser(user);
			keyOptions.passphrase = passphrase;
			if(!user.id_str ){
				keyOptions.userId = user.id_str;
			}
			if(user != null) {
				var start = new Date();
				console.log("start generating key pair : " + start.getSeconds() + ":" + start.getMilliseconds());
				openpgp.config.debug=true;
				openpgp.generateKey(keyOptions).then(function(key) {
					var end = new Date();
					console.log("done generating key pair : " + end.getSeconds() + ":" + end.getMilliseconds());
					var privkey = key.privateKeyArmored; 
					var pubkey = key.publicKeyArmored;
					app.generatePrivateKeyPairSuccess(key, keyOptions, save, callback);
				}).
				catch(function(err){
					console.log("Caught an error generatinga key pair");
					console.log(JSON.stringify(err));
					
				});
			}
	},
	generatePrivateKeyPairSuccess:function(response, keyOptions, save, callback){
					if(!save){
						delete keyOptions.passphrase;
					}
					var user = app.activeUser.user;
					var dateCreated = new Date();
					var privKey = {};
					privKey.armored = response.privateKeyArmored;
					privKey.dateCreated = dateCreated;
					var pubKey = {};
					pubKey.armored = response.publicKeyArmored;
					pubKey.dateCreated = dateCreated;
					app.saveObject("keyOptions-"+user.id_str,keyOptions);
					app.saveObject("privateKey-"+ user.id_str,privKey);
					app.saveObject("publicKey-"+user.id_str,pubKey);
					app.checkDirectMessageStatus();
					app.refreshActiveUserTotal();
					callback();
	},
    showAllDirectMessages:function(){
		$(".friendMessages").show();
	},	
	invite:function(receiverId,bSkipWelcome) {
				var pkMessages = app.generatePublicKeyMessages(receiverId);
				var messages = Array();
				for(var pk in pkMessages){
					messages.push({receiverId:receiverId,text:pkMessages[pk]});
				}
				if(!bSkipWelcome) {
					messages.push({text:app.joinMessage,receiverId:receiverId});
				}
				app.postDirectMessages(messages, function(){
					var sentKeys = {};
					sentKeys[receiverId] = true;
					app.trackSentPublicKeys(sentKeys);
					//app.getFollowerInfo(receiverId,app.updateConversationEntry);
					$("#friendKeyContainer_"+receiverId).html("Invite sent.");
				});
	},
	prepareDirectMessage:function(receiverId) {
		if(app.sendingDirectMessage){
			return;
		}
		var directMessage = $("#directMessage_"+receiverId).val();
		if(directMessage.length ==0){
			return;
		}
		$("#directMessage_"+receiverId).val("");
		app.sendingDirectMessage = true;
		app.overlay();
		app.encryptDirectMessage(directMessage,receiverId);
	},
	decryptPrivateKey:function(key){
		var keyOptions = app.activeUser.keyOptions;
		var pass = null;
		if(app.passphrase){
			pass = app.passphrase;
		}
		if(keyOptions.passphrase){
			pass = keyOptions.passphrase;
		}
		if(!keyOptions.passphrase && app.passphrase == null){
			app.passphrase = pass = prompt("Enter your passphrase");;
		}
		if(key.decrypt(pass)) {
			return true;
		}
		else {
			app.passphrase = null;
			return false;
		}
	},
	encryptDirectMessage:function(directMessage,receiverId){
		var user = app.activeUser.user;
		var keys = app.activeUser.publicKeys;
		var key = null;
		for(var k in keys){
			if(k == receiverId){
				key = keys[k].key;
			}
		}
		if(key){
			var publicKey = openpgp.key.readArmored(key);
			var keys = publicKey.keys;
			var opt = {
				publicKeys:keys,
				data:directMessage
				
			}
			//use private key to  sign the message
			if(app.activeUser.privateKey){
				var privateKey = openpgp.key.readArmored(app.activeUser.privateKey.armored);
				if(app.decryptPrivateKey(privateKey.keys[0])){
					opt.privateKeys = privateKey.keys;
				}
			}
			openpgp.encrypt(opt)
				.then(function(response) {
					var msg = app.hideAndCompress(response.data);
					app.seecret_engine.config.RANDOM_COVERTEXTS = true;
					app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH=10000;
					var chain = app.seecret_engine.chainify(msg,covertexts);
					app.seecret_engine.config.RANDOM_COVERTEXTS = false;
					app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH=140;
					chain.reverse();
					for(var each in chain){
						var msgText = chain[each];
						chain[each] = {receiverId:receiverId,text:msgText};
					}
					app.postDirectMessages(chain,function() {} );
					$("#directMessage").val("");
				})
				.catch(function (err) {
					console.log("Error generating the messages:" + JSON.stringify(err));
					app.hideOverlays();
					app.sendingDirectMessage=false;
				} );
		}
		else {
			app.sendingDirectMessage=false;
			app.hideOverlays();
			alert("You do not have that users public key.");
		}
		
	},
	postDirectMessages:function(msgs,callback){
		app.directMessagesToPost= msgs;
		app.directMessageCount=0;
		app.checkDirectMessages(callback);
	},
	checkDirectMessages:function(callback) {
			if(app.directMessagesToPost && (app.directMessageCount < app.directMessagesToPost.length)){
				var text = app.directMessagesToPost[app.directMessageCount].text;
				var receiverId = app.directMessagesToPost[app.directMessageCount].receiverId;
				app.directMessageCount++;
				app.postDirectMessage(text,receiverId,callback);
			}
			else {
				app.hideOverlays();
				alert("Sent!");
				app.sendingDirectMessage=false;
				if(callback){
					callback();
				}
			}
	},
	postDirectMessage:function(msg,receiverId,callback){
			app.oauthResult.post('1.1/direct_messages/new.json', {
				data: {
					text:msg,user_id:receiverId
				}
			})
			.done(function (response) {
				app.checkDirectMessages(callback);
			})
			.fail(function (err) {
			});
	},
	generatePublicKeyMessages : function(receiverId){
		var key = app.activeUser.publicKey;
		if(key!= null) {
			var envelope = app.hideAndCompress(key.armored);
			app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH=10000;
			chain = app.seecret_engine.chainify(envelope,["Here's my Seecret key","Now we can start using Seecret to send encrypted messages on Twitter."]);
			chain.reverse();
			app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH=140;
			return chain;
		}
	},
	promptDeleteKey:function() {
		if(confirm("Are you sure?")) {
			app.deleteSavedItem("privateKey-" + app.activeUser.user.id_str);
			app.deleteSavedItem("publicKey-" + app.activeUser.user.id_str);
			app.deleteSavedItem("keyOptions-" + app.activeUser.user.id_str);
			app.activeUser.privateKey=null;
			app.activeUser.publicKey=null;
			app.activeUser.keyOptions=null;
			app.renderPrivateKeySettings();
			app.setView(app.SETTINGS_VIEW);
		}
	},
	openDirectMessageForm:function(id_str){
		$("#friendMessageForm_"+id_str).fadeIn();
	},
	checkDirectMessageStatus:function() {
		app.doScroll=false;
		var receiverId = $("#selectedReceiverId").val();
		var receiverName = $("#selectedReceiverName").val();
		if(!receiverId){
			return;
		}
		var user = app.activeUser.user;
		var privateKey = app.activeUser.privateKey;
		if(privateKey == null) {
			app.showPrivateKeyManager();
			return;
		}
		var publicKeys = app.activeUser.publicKeys;
		var sentPublicKeys = app.activeUser.sentPublicKeys;
		if(sentPublicKeys != null && sentPublicKeys[receiverId] != null && !(publicKeys != null && publicKeys[receiverId])) { 
			app.showWaitingForPublicKeyView(receiverId,receiverName);
		}
		else if(publicKeys == null || (publicKeys != null && !publicKeys[receiverId])){
			app.showPublicKeyManager(receiverId,receiverName);
		}
		else {
			
			app.showDirectMessageForm(receiverId,receiverName);
		}
		app.doScroll=true;
	},
	updateUserTimeline:function(screenName,bStart){
		if(bStart){
			app.maxId = null;
		}
		app.userTimelineId = screenName;
		app.homeTimeline = false;
		app.updatingTimeline = true;
		var postData = {};
		postData.data = {};
		postData.data.count = 200;
		postData.data.screen_name = screenName;
		postData.data.include_rts = false; 
		if(app.maxId != null){
			postData.data.max_id=app.maxId;
		}
		else {
			$("#status-list").empty();
		}
		app.hideOverlays();
		app.getUserTimeline(postData,app.handleTimelineResponse);
	},
	getTimeline:function(postVals,callback){
		app.oauthResult.get('1.1/statuses/home_timeline.json', postVals)
		.done(function (response) {
			callback(response);
			app.hideOverlays();
		}).fail(app.handleGetTimelineError);
	},
	getUserTimeline:function(postVals,callback){
		$("#twitterUser").val("");
		app.oauthResult.get('1.1/statuses/user_timeline.json', postVals)
		.done(function (response) {
			callback(response);
			app.hideOverlays();
		}).fail(app.handleGetTimelineError);
	},
	handleTimelineResponse:function(response){
		app.timer("Get timeline");
		if(response.length > 0) {
			if(response.length == 1 && response[0].id_str == app.maxId){
				$("#status-list").append(Handlebars.getTemplate("no-more-timeline-message-template")());
				$("#getOlderTimelineButton").hide();
			}
			else {
				app.timer("Process timeline Response");
				app.processTimelineResponse(response);
				app.timer("Process timeline Response");
			}
		}
		else {
			app.handleEmptyTimelineResponse(response);
		}
	},
	handleGetTimelineError:function(err){
		if(err.status == 429){
			alert("Twitter rate limit exceeded.  You must wait 15 minutes to make more requests from this app.")
		}
		else if(err.status == 404){
			alert("Twitter says that screen name does not exist.")
		}
		else {
			alert("There was an error retrieving the timeline.")
			
		}
		console.log("Error:" + JSON.stringify(err));
		app.hideOverlays();
	},
	handleEmptyTimelineResponse:function(response){
		app.hideOverlays();
	},
	processTimelineResponse:function(response){
		app.addFollowerTagToTweets(response,app.processTimelineWithFollowerInfo);
	},
	addFollowerTagToTweets:function(timeline,callback){
		//Get the follower information for all tweets from followers
		var ids = {};
		for(var r in timeline){
			ids[timeline[r].user.id_str] = timeline[r].user.id_str;
		}
		var followersList = Array();
		for(var i in ids){
			followersList.push(i);
		}
		var fData = {};
		fData.data = {};
		fData.data.user_id = followersList.join();
		app.oauthResult.get('1.1/friendships/lookup.json', fData)
		.done(function (response) {
			var followers = {};
			for(var x in response){
				if(response[x].connections.indexOf("followed_by") >= 0) {
					followers[response[x].id_str] = true;
				}
			}
			for(var t in timeline){
				if(followers[timeline[t].user.id_str]){
						timeline[t].follower = true;
				}
			}
			callback(timeline);
		})
		.fail(function(err) {
			//console.log("failed to get follower info but keep going ");
			callback(timeline);
		});
	},
	unhideAndDecompressSeecretsInList:function(timeline,bShowAll){
		var filteredTimeline = [];
		for(var x in timeline){
			if(!timeline[x].seecret_envelope && document.getElementById("showOnlySeecrets").checked){
				continue;
			}
			if(timeline[x].seecret_envelope){
				//console.log("found a seecret enevelop in message " + x);
				var envelope = timeline[x].seecret_envelope;
				var seecretMessage = app.seecret_engine.getSeecretFromEnvelope(envelope);
				var contentType = app.seecret_engine.getContentTypeFromEnvelope(envelope);
				var message = app.seecret_engine.unhide(seecretMessage,contentType);
				if(contentType == app.seecret_engine.config.CONTENT_TYPES.NUMBERS_ARRAY){
					try{
						message = seecret_compression.decompress(message);
						timeline[x].seecret = message;
					}
					catch(error){
						//console.log("error decompressing a seecret message: " + JSON.stringify(error));
						timeline[x].seecret = "Could not decompress the Seecret";
						timeline[x].seecret_error = error;
					}
				}
				else {
					timeline[x].seecret = message;
				}
				filteredTimeline.push(timeline[x]);
			}
			else if(bShowAll && !app.seecret_engine.hasSeecretContent(timeline[x].text)){
				filteredTimeline.push(timeline[x]);
			}
		}
		return filteredTimeline;
	},
	unhideAndDecompressTimelineSeecrets:function(timeline,bShowAll){
		var filteredTimeline = [];
		for(var x in timeline){
			if(timeline[x].seecret_envelope){
				var envelope = timeline[x].seecret_envelope;
				var seecretMessage = app.seecret_engine.getSeecretFromEnvelope(envelope);
				var contentType = app.seecret_engine.getContentTypeFromEnvelope(envelope);
				var message = app.seecret_engine.unhide(seecretMessage,contentType);
				if(contentType == app.seecret_engine.config.CONTENT_TYPES.NUMBERS_ARRAY){
					try{
						message = seecret_compression.decompress(message);
						timeline[x].seecret = message;
					}
					catch(error){
						console.log("error decompressing a seecret message: " + JSON.stringify(error));
						timeline[x].seecret = "Could not decompress the Seecret";
						timeline[x].seecret_error = error;
					}
				}
				else {
					timeline[x].seecret = message;
				}
				filteredTimeline.push(timeline[x]);
			}
			else if(bShowAll && !app.seecret_engine.hasSeecretContent(timeline[x].text)){
				filteredTimeline.push(timeline[x]);
			}
		}
		return filteredTimeline;
	},
	getEarliestIncompleteChainStartId:function(timeline,uniqueTweeters){
		var startIndex = 0;
		for(var ut in uniqueTweeters){
			var maxId = app.getFirstIncompleteChainStart(timeline,uniqueTweeters[ut])
		}
	},
	getEarliestIncompleteDMChainStartId:function(timeline,uniqueSenders){
		var startIndex = 0;
		for(var ut in uniqueSenders){
			var maxId = app.getFirstIncompleteDMChainStart(timeline,uniqueSenders[ut])
		}
	},
	getFirstIncompleteChainStart:function(timeline,userId){
		var bStarted = false;
		var bEnded = false;
		var startIndex = 0;
		for(var t in timeline){
			if(timeline[t].user.id_str == userId){
				if(app.seecret_engine.hasSeecretContent(timeline[t].text)) {
					if(app.seecret_engine.isEnvelopeStart(timeline[t].text)){
						bStarted = true;
						startIndex= t;
					}
					if(app.seecret_engine.isEnvelopeEnd(timeline[t].text)){
						bEnded = true;
						bStarted = false;
						startIndex = 0;
					}
				} 
			}
		}
		return startIndex;
	},
	getFirstIncompleteDMChainStart:function(timeline,userId){
		var bStarted = false;
		var bEnded = false;
		var startIndex = 0;
		for(var t in timeline){
			if(timeline[t].sender.id_str == userId){
				if(app.seecret_engine.hasSeecretContent(timeline[t].text)) {
					if(app.seecret_engine.isEnvelopeStart(timeline[t].text)){
						bStarted = true;
						startIndex= t;
					}
					if(app.seecret_engine.isEnvelopeEnd(timeline[t].text)){
						bEnded = true;
						bStarted = false;
						startIndex = 0;
					}
				} 
			}
		}
		return startIndex;
	},
	getFirstIncompleteChainStart:function(chain,matcher){
		var bStarted = false;
		var bEnded = false;
		var startIndex = 0;
		for(var c in chain){
			if(matcher(chain[c]) [senderProp].sender.id_str == userId){
				if(app.seecret_engine.hasSeecretContent(timeline[t].text)) {
					if(app.seecret_engine.isEnvelopeStart(timeline[t].text)){
						bStarted = true;
						startIndex= t;
					}
					if(app.seecret_engine.isEnvelopeEnd(timeline[t].text)){
						bEnded = true;
						bStarted = false;
						startIndex = 0;
					}
				} 
			}
		}
		return startIndex;
		
	},
	processMessageList:function(messages,senderPropertyRef,maxIdRef){
		var senderFinder = function(message) {
			return message[senderPropertyRef]?message[senderPropertyRef].id_str:null;
		}
		var uniqueSenders = app.getUniqueInstancesFromList(messages,senderFinder);
		//console.log("unique senders = " + JSON.stringify(uniqueSenders));
		var messageIndexes = app.getMessageIndexes(messages,uniqueSenders,senderFinder);
		//console.log("message indexes  = " + JSON.stringify(messageIndexes));
		var messages = app.dechainifyMessages(messages,messageIndexes,senderPropertyRef);
		//console.log("dechainified to " + messages.length + " messages");
		app[maxIdRef] = app.lastProcessedStatusId  = messages[messages.length-1].id_str;
		//find out if any chained seecrets are started by not finished in this chain, and set max id to that message so next time we get latest we start there...
		//yes, there is a chance that a seecret is started and finished across more than 200 tweets in a user's timeline... no idea what to do with that.
		var firstIncompleteStartIndex = 0;
		for(var u in uniqueSenders){
			console.log("finding first incomplete message start for " + u)
			var bStarted = false;
			var bEnded = false;
			var startIndex = 0;
			for(var m in messages){
				var id = senderFinder(messages[m]);
				//console.log("about to check if " + id + " is same as " + u);
				if(id == u){
					if(app.seecret_engine.hasSeecretContent(messages[m].text)) {
						if(app.seecret_engine.isEnvelopeStart(messages[m].text)){
							bStarted = true;
							startIndex= m;
						}
						if(app.seecret_engine.isEnvelopeEnd(messages[m].text)){
							bEnded = true;
							bStarted = false;
							startIndex = 0;
						}
					} 
				}
			}
			if(startIndex > 0 && firstIncompleteStartIndex == 0){
				firstIncompleteStartIndex = startIndex;
			}
			else if(startIndex > 0 && startIndex < firstIncompleteStartIndex){
				firstIncompleteStartIndex = startIndex;
			}
		}
		var firstIncompleteStart = firstIncompleteStartIndex;
		if(firstIncompleteStart > 0){
			app[maxIdRef] = messages[firstIncompleteStart].id_str;
		}
		console.log("unhideAndDecompress started with " + messages.length);
		messages = app.unhideAndDecompressSeecretsInList(messages,true);
		console.log("unhideAndDecompress left " + messages.length);
		//now make sure all profile image refs are https;
		for(var m in messages){
			if(messages[m][senderPropertyRef] && messages[m][senderPropertyRef].profile_image_url){
				messages[m][senderPropertyRef].profile_image_url = messages[m][senderPropertyRef].profile_image_url.replace(app.httpsReplaceRegex,"https:");
			}
		}
		return messages;
	},
	processTimelineWithFollowerInfo:function(timeline){
		//var timeline = app.processTimelineMessages(timeline,app.getUniqueTweeters);
		var timeline = app.processMessageList(timeline,"user","maxId");
		if(timeline.length > 0){
			$('#status-list').append(Handlebars.getTemplate("status-template")(timeline)); 
		}
		else if(document.getElementById("showOnlySeecrets").checked){
			$("#status-list").append(Handlebars.getTemplate("no-seecrets-in-timeline-segment-template")());
		}
		$('.basicTweet').fadeIn();
		app.updatingTimeline = false;
		if(app.userTimelineId){
			app.renderUserTimelineHeader(app.userTimelineId);
		}
		else {
			$("#timelineName").html("");
		}
	},
	renderUserTimelineHeader:function(screenName){
		$("#timelineName").html( "for " + screenName + " &nbsp;&nbsp;&nbsp;<a href='javascript:app.initTimeline();app.updateHomeTimeline()'>Back to my timeline</a>");
	},
	dechainifyMessages:function(messages,indexes,idRef){
		for(var mi in indexes){
			if(indexes[mi].length > 0){
				var matcher = function(segment){
					if(segment && segment.text && typeof segment.text == "string" && segment[idRef] && segment[idRef].id_str==mi){
						return segment;
					} 
					else 
					{
						return null;
					}
				}
				var ordinal = 0;
				for(var uid in indexes[mi]){
					var dechained = app.seecret_engine.dechainify(messages,{
						chainSegmentMatcher:matcher,
						chainSegmentContentFinder:this.chainSegmentContentFinder,
						startIndex:indexes[mi][uid],
						withCovertexts:true
					})
					if(dechained && dechained.seecret!="") {
						messages[indexes[mi][uid]].seecret_envelope = dechained.seecret;
						messages[indexes[mi][uid]].covertexts = dechained.covertexts;
					}
					ordinal++;
				}
			}
		}
		return messages;
	},	
	chainSegmentContentFinder:function(segment){
		return segment.text;
	},
	tweetSenderGetter:function(tweet){
		return tweet.user?tweet.user.id_str:null;
	},
	dmSenderGetter:function(dm){
		return dm.user?dm.user.id_str:null;
	},
	getMessageIndexes:function(timeline,values,valueFinder){
		var messageIndexes = {};
		for(var v in values){
			messageIndexes[v] = app.seecret_engine.getOrdinalIndexes(
			timeline,{
				chainSegmentMatcher:function(segment){
					var val = valueFinder(segment);
					if(val==values[v]){
						return segment;
					} 
					else 
					{
						return null;
					}
				},
				chainSegmentContentFinder:this.chainSegmentContentFinder
			})
		}
		return messageIndexes;
	},
	getSeecretMessageIndexesByUser:function(timeline,userIds){
		var messageIndexes = {};
		for(var uid in userIds){
			messageIndexes[uid] = app.seecret_engine.getOrdinalIndexes(
			timeline,{
				chainSegmentMatcher:function(segment){
					if(segment && segment.text && typeof segment.text == "string" && segment.user && segment.user.id_str==userIds[uid]){
						return segment;
					} 
					else 
					{
						return null;
					}
				},
				chainSegmentContentFinder:this.chainSegmentContentFinder
			})
		}
		return messageIndexes;
	},
	getSeecretMessageIndexesBySender:function(timeline,senderIds){
		var messageIndexes = {};
		for(var uid in senderIds){
			messageIndexes[uid] = app.seecret_engine.getOrdinalIndexes(
			timeline,{
				chainSegmentMatcher:function(segment){
					if(segment && segment.text && typeof segment.text == "string" && segment.sender && segment.sender.id_str==senderIds[uid]){
						
						return segment;
					} 
					else 
					{
						return null;
					}
				},
				chainSegmentContentFinder:this.chainSegmentContentFinder
			})
		}
		return messageIndexes;
	},
	getUniqueTweeters:function(timeline) {
			var uniques =  app.getUniqueInstancesFromList(timeline,app.getTweeterId);
			return uniques;
	},
	getUniqueDMSenders:function(timeline) {
			var uniques =  app.getUniqueInstancesFromList(timeline,app.getDMSenderId);
			return uniques;
	},
	getTweeterId:function(tweet){
		return tweet.user.id_str;
	},
	getDMSenderId:function(dm){
		return dm.sender.id_str;
	},
	getUniqueInstancesFromList:function(list,getter){
		console.log("getting unique instances");
		var uniques = {};
		for(var l in list){
			var unique = getter(list[l]);
			if(unique){
				uniques[unique] = unique;
			}
		}
		return uniques;
	},
	generateTimelinePostVals:function(){
		var postData = {};
		postData.data = {};
		postData.data.count = 200;
		if(app.maxId != null){
			postData.data.max_id=app.maxId;
		}
		return postData;
	},
	initTimeline:function() {
		app.maxId = null;
		app.homeTimeline=true;
		app.userTimelineId = null;
		app.updateHomeTimeline();
	},
    updateHomeTimeline: function(bFromTheTop) {
		$("#twitterUser").val("");
		if(bFromTheTop) app.maxId = null;
		app.homeTimeline=true;
		$("#timelineName").empty();
		//we set this to true because certain UI triggers such as scroll handler are deprecated while updating Timeline
		app.updatingTimeline = true;
		var postData = app.generateTimelinePostVals();
		if(!postData.data.max_id){
			//if max id null we are getting the list for the first time
			$("#status-list").empty();
			app.lastProcessedStatusId= null;
		}
		app.overlay()
		app.timer("Get timeline");
		app.getTimeline(postData,app.handleTimelineResponse);
    },
	prepareUpdateMessage:function() { 
			var plainMessage = $('#textarea-statusUpdate').val();
			var envelope=app.hideAndCompress(plainMessage);
			var scaffolds = null;
			if(!app.useAutogeneratedScaffolding()) {
				scaffolds = app.getScaffolds();
			}
			var messages = app.seecret_engine.chainify(envelope,scaffolds);
			messages.reverse();
			return messages;
	},
	updateStatus:function() {
		var messages = this.prepareUpdateMessage();
		this.postChain(messages);
	},
	postChain:function(messages){
		this.currentMessageChain = messages;
		this.chainCount = 0;
		this.postChainItem();
	},
	postChainItem:function(){
		if(this.chainCount < this.currentMessageChain.length) {
				app.oauthResult.post('1.1/statuses/update.json', {
					data: {
						status:this.currentMessageChain[this.chainCount++]
					}
				})
				.done(function (response) {
					setTimeout(function() {app.postChainItem();},50);
				})
				.fail(function (err) {
				});
		}
		else {
			$("#status-list").empty();
			$("#scaffoldingWarningContainer").empty();
			$("#scaffoldingStatus").empty();
			$('#textarea-statusUpdate').val('');
			$('#textarea-statusUpdate').val('');
			$('#scaffoldsContainer').html(Handlebars.getTemplate("scaffolds-template")());        
			$('#scaffoldingContainer > div > div > input').val('');
			app.maxId = null;
			this.currentMessageChain = Array();
			this.chainCount = 0;
			app.updateHomeTimeline();
			app.setView(app.TIMELINE_VIEW);
		}
	},
	authenticatedUI:function(){
			app.authenticatedHeader();
			app.authenticatedMenu();
			app.setView(app.TIMELINE_VIEW);
	},
	unauthenticatedUI:function(){
			$("#status-list").empty();
			$("#userLabel").empty();
			$("#userProfileImg").hide();
			$("#directMessages").empty();
			$("#publicKeys").empty();
			$("#directMessagesActionsContainer").val("");
			$("#textarea-statusUpdate").val("");
			$("#importPrivateKeyText").val("");
			$("#importPrivateKeyPassphrase").val("");
			$("#privateKeyTextarea").val("");
			$("#privateKeyPassphrase").val("");
			$("#privateKeyCopyarea").empty();
			$("#publicKeysDisplayArea").empty();
			app.unauthenticatedHeader()
			$("#privateMessagesButton").hide();
			$("#timelineButton").hide();
			app.unauthenticatedMenu();
			app.setView(app.ABOUT_VIEW);
	},
	authenticatedMenu:function(){
			$("#privateMessagesButton").show();
			$("#timelineButton").show();
			$("#settingsButton").show();
			$("#logoutButton").show();
			$("#hashesButton").show();
			$("#publicKeysButton").show();
			$("#aboutButton").show();
			
	},
	unauthenticatedMenu:function(){
			$("#privateMessagesButton").hide();
			$("#timelineButton").hide();
			$("#settingsButton").hide();
			$("#logoutButton").hide();
			$("#publicKeysButton").hide();
	},
	authenticatedHeader: function () {
		//console.log(app.activeUser.user);
		if(app.activeUser && app.activeUser.user){
			app.activeUser.user.profile_image_url = app.activeUser.user.profile_image_url.replace(app.httpsReplaceRegex,"https:");
			$('#loginContainer').html(Handlebars.getTemplate("authenticated-header-template")(app.activeUser.user));     
		}
		
	},
	unauthenticatedHeader: function () {
		$('#loginContainer').html(Handlebars.getTemplate("unauthenticated-header-template")());    
	},
	hideAllViews:function(){
		$('#timeline').hide();
		$('#statusMessage').hide();
		$("#privateMessages").hide();
		$("#settings").hide();
		$("#publicKeys").hide();
		$("#about").hide();
		$("#hashes").hide();
	},
	setMenuState:function(button){
			$.each($('.menuLink'),function(index, val){
				$(this).css('background','');
				$(this).css('color','');
			});		
			$('#'+button).css('background','#e3e3e3');
			$('#'+button).css('color','#333');
			app.openClosePanel('close');
	},
	setView:function(viewName){
		app.doScroll=false;
		app.hideAllViews();
		$('#' + viewName).fadeIn(function(){app.doScroll=true;}).css("display","block");
		app.setMenuState(viewName + "Button");
	},
	renderPublicKeys:function (){
		var sentPublicKeys = app.activeUser.publicKeys;
		var keys = Array();
		var keysCount =0;
		for(var spk in sentPublicKeys){
		    sentPublicKeys[spk].displayDate = moment(sentPublicKeys[spk].receiveDate).format('MMMM Do YYYY, h:mm:ss a');
			keys.push(sentPublicKeys[spk]);
			keysCount++;
		}
		if(keysCount > 0){
			var html = Handlebars.getTemplate("public-keys-template")({keys:keys});
			$("#publicKeysDisplayArea").html(html);
		}
		else {
			$("#publicKeysDisplayArea").html("No public keys");
		}
	},
	copySenderPublicKeyToClipboard:function(id_str){
		var publicKeys = app.activeUser.publicKeys;
		if(publicKeys[id_str]){
			executeCopy(publicKeys[id_str].key)
			alert(publicKeys[id_str].screen_name + "'s key has been copied to your clipboard");
		}
	},
	copyContentsToClipboard:function(el_id){
		executeCopy($("#"+ el_id).html());
	},
	showPrivateKeyManager:function(){
		app.doScroll = false;
        //var pkHandler = Handlebars.compile($("#private-key-template").html());
        $('#directMessagesActionsContainer').html(Handlebars.getTemplate("private-key-template")());        
		$("#directMessagesActionsContainer").show();
	},	
	openClosePanel: function(direction){
		if(direction == 'open'){
			$('#left-panel').css('left', 0);			
		}else{
			$('#left-panel').css('left', '-14em');						
		}
	},	
	//Limit the covertext length to 100 characters.  we want at least 40 chars of hidden text per Seecret chain segment....
	//Strip all consecutive whitespace and remove leading whitespace..
	processScaffoldField:function(num){
		var field = $("#scaffold"+num);
		val = field.val();
		var val2 = val.replace(/\s{2,}/g," " );
		while(val2.substr(0,1) == " "){
			val2 = val2.substr(1);
		}
		val2 = val2.substr(0,100);
		if(val2 != val){
			field.val(val2);
		}
	},
	useAutogeneratedScaffolding:function() {
		return false;
		var useAutogeneratedScaffolding = document.getElementById("scaffoldingOption").checked;
		return useAutogeneratedScaffolding;
	},
	hideAndCompress:function(value){
			var plaintext = value;
			var seecretText = app.seecret_engine.hide(plaintext,app.seecret_engine.config.CONTENT_TYPES.PLAIN);
			var envelope = app.seecret_engine.envelope(seecretText,app.seecret_engine.config.CONTENT_TYPES.PLAIN);
			var compressed = seecret_compression.compress(value);
			var hiddenCompressed = app.seecret_engine.hide(compressed,app.seecret_engine.config.CONTENT_TYPES.NUMBERS_ARRAY);
			var compressedEnvelope = app.seecret_engine.envelope(hiddenCompressed,app.seecret_engine.config.CONTENT_TYPES.NUMBERS_ARRAY);
			return envelope.length > compressedEnvelope.length?compressedEnvelope:envelope;
	},
	processScaffolding: function() {
		var update = $("#textarea-statusUpdate").val();
		var useAutogeneratedScaffolding = app.useAutogeneratedScaffolding();
		if(!useAutogeneratedScaffolding){
			var bReady = false;
			var envelope = app.hideAndCompress(update);
			var scaffolds = app.getScaffolds();
			var availableLength = 0;
			var spillover = 0;
				if(scaffolds.length == 1){
					if(scaffolds[0].trim().length >= 2 && scaffolds[0].trim().length + envelope.length < app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH) {
						bReady=true;
						availableLength=app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH-envelope.length-scaffolds[0].trim().length;
					}
					else if(scaffolds[0].trim().length < 2) {
						app.makeUpdateFormPending();
						return;
					}
					else {
						spillover = app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH - (scaffolds[0].trim().length + envelope.length);
						spillover = spillover*-1;
					}
				}
				else {
					scaffoldLength = 0;
					var scaffoldsUsed = 0;
					for(each in scaffolds){
						if(scaffolds[each].trim().length >= 2){
							scaffoldLength += scaffolds[each].trim().length;
							scaffoldsUsed++;
						}
					}
					if((scaffoldLength + envelope.length) < (app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH*scaffoldsUsed)) 
					{
						bReady=true;
						availableLength = (app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH*scaffoldsUsed) - (scaffoldLength+envelope.length);

					}
					else {
						spillover = (app.seecret_engine.config.MAX_CHAIN_SEGMENT_LENGTH*scaffoldsUsed) - (scaffoldLength+envelope.length);
						spillover = spillover*-1;
					}
				}
			if(bReady){
				app.makeUpdateFormReady(availableLength);
			}
			else{
				app.makeUpdateFormNotReady(spillover);
			}
		}
	},
	newVisibleMessageField:function() {
		var scaffolds = app.getScaffolds();
		app.addScaffoldField(scaffolds.length);
		app.processScaffolding();
	},
	addScaffoldField:function(num,val){
			var id=num;
			var scaffoldCount = num+1;
			var data = {scaffoldId:id,val:val,scaffoldCount:scaffoldCount};
			$('#scaffoldsContainer').append(Handlebars.getTemplate("scaffold-template")(data));        
	},
	makeUpdateFormReady:function(availableCharacters) {
		$("#submitButtonContainer").show();
		var data  = {};
		data.availableCharacters = availableCharacters;
		$('#scaffoldingStatus').html(Handlebars.getTemplate("scaffold-status-good-template")(data));
	},
	makeUpdateFormNotReady:function(neededCharacters) {
		$("#submitButtonContainer").hide();
		var data  = {};
		data.spillover = neededCharacters;
		$('#scaffoldingStatus').html(Handlebars.getTemplate("scaffold-status-spillover-template")(data));        
	},
	makeUpdateFormPending:function() {
		$("#submitButtonContainer").hide();
		$('#scaffoldingStatus').html(Handlebars.getTemplate("scaffold-status-incomplete-template")());        
	},
	removeScaffold:function(index){
			var scaffolds = app.getScaffolds();
			var newScaffolds = Array();
			for(var each in scaffolds){
				if(each != index){
					newScaffolds.push(scaffolds[each]);
				}
			}
			app.renderScaffolds(newScaffolds);
			app.processScaffolding();
	},
	renderScaffolds:function(scaffolds) {
		$("#scaffoldsContainer").html("");
		var count = 0;
		for(var i=0;i<scaffolds.length;i++){
			app.addScaffoldField(count++, scaffolds[i]);
		}
		$("#scaffoldRemover0").remove();
	},
	getScaffolds:function() {
		var scaffolds = Array();
		var scaffoldField = document.getElementById("scaffold0");
		while(scaffoldField)
		{
			scaffolds.push(scaffoldField.value.trim());
			scaffoldField = document.getElementById("scaffold" + scaffolds.length);
		}
		return scaffolds;
	},
	toggleScaffolds: function() {
		var useAutogeneratedScaffolding = document.getElementById("scaffoldingOption").checked;
		if(useAutogeneratedScaffolding) {
			$("#scaffoldingStatus").html("");
			$("#scaffoldsContainer").html("");
			$("#scaffoldingWarningContainer").hide();
			$("#scaffoldingContainer").hide();
			$("#submitButtonContainer").show();
		}
		else {
			$("#scaffoldingStatus").html("");
			$("#scaffoldsContainer").html("");
			$("#scaffoldingContainer").show();
			$("#scaffoldingWarningContainer").html("");
			$("#submitButtonContainer").hide();
			app.addScaffoldField(0);
			app.processScaffolding();
		}
	},
	getScaffoldTotal:function(scaffolds){
		var scaffoldLength = 0;
		for(var i=0;i<scaffolds.length;i++){
			scaffoldLength += scaffolds[i].trim().length;
		}
		return scaffoldLength;
	},
	showCopyPrivateKey:function(el) {
		if( $('#privateKeyCopyarea').css('display') == 'block' ){
			$(el).html('Show');
			$("#privateKeyCopyarea").hide();
			$("#privateKeyCopyarea").html("");
		}else{
			$(el).html('Hide');
			app.renderPrivateKeySettings();
		}		
	},
	toggleDeleteSettings:function(el){
		if( $('#deleteKeyForm').css('display') == 'block' ){
			$(el).html('Show');
			$("#deleteKeyForm").hide();
		}else{
			$(el).html('Hide');
			$("#deleteKeyForm").show();
		}
	},
	renderPrivateKeySettings:function() {
			var user = app.activeUser.user;
			var key = app.activeUser.privateKey;
			var publicKey = app.activeUser.publicKey;
			var keyOptions = app.activeUser.keyOptions;
			var keysData = {};
			if(app.activeUser && app.activeUser.privateKey){
				keysData.privateKey = key;
				keysData.privateKey.dateCreatedDisplay = new moment(keysData.privateKey.dateCreated).format('MMMM Do YYYY, h:mm:ss a');
				keysData.publicKey = publicKey;
				keysData.keyOptions = keyOptions;
			}
    		var html = Handlebars.getTemplate("user-keys-template")(keysData);
			$("#privateKeyCopyarea").html(html);
			$("#privateKeyCopyarea").fadeIn();
	},
	showPublicKeys:function(el){
		if($("#publicKeysDisplayArea").css('display') == 'block') {
			$(el).html('Show');
			$("#publicKeysDisplayArea").hide();
		}
		else {
			$(el).html('Hide');
			app.renderPublicKeys();
			$("#publicKeysDisplayArea").fadeIn();
		}
	},
	showImportPrivateKey:function(el) {
		if( $('#importForm').css('display') == 'block' ){
			$(el).html('Show');
			$("#importForm").hide();
		}else{
			$(el).html('Hide');
			$("#importForm").show();
		}
	},
	showGeneratePrivateKey:function(el) {
		if( $('#generateForm').css('display') == 'block' ){
			$(el).html('Show');
			$("#generateForm").hide();
			
		}else{
			$(el).html('Hide');
			$("#generateForm").show();
		}
	},
	saveObject:function(name,val){
		localStorage[name] = JSON.stringify(val);
	},
	getObject:function(name){
		return app.getLocalObject(name);
	},
	getLocalObject:function(name){
		if(localStorage[name]) {
			var x =  JSON.parse(localStorage[name]);
			return x;
		}
		else {
			return null;
		}
	},
	saveLocalObject:function(name,object){
		localStorage[name] = JSON.stringify(object);
	},
	deleteSavedItem:function(name){
			delete localStorage[name];
	},
	//REVISIT
	importPrivateKey:function() {
		var user = app.activeUser.user;
		var keyVal = $("#importPrivateKeyText").val();
		var dc = new Date();
		var keys = openpgp.key.readArmored(keyVal);
		if(!keys || !keys.keys || keys.keys.length < 1){
			alert("The key is invalid");
			return;
		}
		var resultKey = openpgp.key.readArmored(keyVal).keys[0];
		var passphrase = $("#importPrivateKeyPassphrase").val();
		if(resultKey.decrypt(passphrase)) 
		{
			var passphrase = $("#importPrivateKeyPassphrase").val();
			$("#importPrivateKeyText").val("");
			$("#importPrivateKeyPassphrase").val("");
			var keyOptions = app.makeKeyOptionsForUser(user);
			keyOptions.passphrase = passphrase;
			var privateKey = {armored:keyVal,dateCreated:dc};
			var publicKey = {armored:resultKey.toPublic().armor(),dateCreated:dc};
			app.activeUser.privateKey = privateKey;
			app.activeUser.publicKey = publicKey;
			app.activeUser.keyOptions = keyOptions; 
			app.saveObject("privateKey-"+user.id_str,privateKey);
			app.saveObject("publicKey-"+user.id_str,publicKey);
			app.saveObject("keyOptions-"+user.id_str,keyOptions);
			app.activeUser.privateKey = privateKey;
			app.activeUser.publicKey = publicKey;
			app.activeUser.keyOptions = keyOptions; 
			app.renderPrivateKeySettings();
			if(confirm("Successfully imported the private key. Send your new key to the contacts who have the old one?")) {
				app.resendPublicKeys();
			}
		}
		else {
			alert("Could not decrypt the key with the passphrase you entered.  Please try again");
		}
	},

	deleteSavedPassphrase: function(){
		if(confirm("Are you sure?")) {
			var user = app.activeUser.user;
			var keyOptions = app.activeUser.keyOptions;
			keyOptions.passphrase = "";
			app.activeUser.keyOptions = keyOptions;
			app.saveObject("keyOptions-"+user.id_str,keyOptions); 
		}
		app.renderPrivateKeySettings();
	},
	//REVISIT
	changePassphrase: function() {
		var newPassphrase = prompt("Enter new passphrase");
		if(newPassphrase != null){
			var newPassphrase2 = prompt("Enter it again");
			if(newPassphrase2 != null) {
				if(newPassphrase == newPassphrase2) {
					alert("Changing your passphrase to " + newPassphrase2 + "\n we urge you to delete it from this device once you've got it memorized or saved elsewhere.");
					app.setNewPassphraseOnPrivateKey(newPassphrase);
				}
				else  {
					alert("Your new passphrase did not match, please try again");
				}
			}
			
		}
		app.renderPrivateKeySettings();
	},
	//REVISIT
	setNewPassphraseOnPrivateKey:function(phrase){
			var user  = app.activeUser.user;
			var options = app.activeUser.keyOptions;
			var privateKey = openpgp.key.readArmored(app.activeUser.privateKey.armored);
			var isDecrypted = app.decryptPrivateKey(privateKey.keys[0]);
			if(isDecrypted) {
				privateKey.keys[0].primaryKey.encrypt(phrase);
				if(privateKey.keys[0].subKeys && privateKey.keys[0].subKeys.length > 0 && privateKey.keys[0].subKeys[0]) {
					privateKey.keys[0].subKeys[0].subKey.encrypt(phrase);
				}
				var pkey = {};
				pkey.dateCreated = new Date();
				pkey.armored = privateKey.keys[0].armor();
				var pubkey={};
				pubkey.dateCreated = new Date();
				pubkey.armored = privateKey.keys[0].toPublic().armor();
				options.passphrase = phrase;
				app.saveObject("publicKey-" + user.id_str,pubkey);
				app.saveObject("privateKey-" + user.id_str,pkey);
				app.saveObject("keyOptions-" + user.id_str,options);
				app.activeUser.publicKey = pubkey;
				app.activeUser.privateKey = pkey;
				app.activeUser.keyOptions = options;
			}
			else {
				alert("Old passphrase was incorrect.  Please try again");
			}
			app.renderPrivateKeySettings();
	},
	overlay:function(id){
		if(!id) id="overlay";;
		$('#' + id).css('display','block');
	},
	hideOverlays:function(){
		$('#overlay').css('display','none');
		$('#static-overlay').css('display','none');
	},
	getNameValuePairsFromArgumentList:function(args,pairSplitter,nameValueSplitter){
		var list = [];
		var vals = args.split(pairSplitter);
		for(var v in vals){
			var splits = vals[v].split(nameValueSplitter);
			list.push(
				{
					name:splits[0],
					value:splits[1]
				}
			);
		}
		return list;
	},
	isIOS:function() {
		var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;		
		return iOS;
	},
	timer:function(name) {
		var time = moment();
		if(app.timers[name]){
			console.log(name + " took " + time.diff(app.timers[name]) + " milliseconds");
			delete app.timers[name];
		}
		else {
			app.timers[name] = time;
			//console.log(name + " started at " + time.format(""));
			
		}
	}
}
$( document ).ready(function() {
	//Handlebars.partials = Handlebars.templates;
	Handlebars.registerPartial("conversation-template",Handlebars.getTemplate("conversation-template"));
	$("body").html(Handlebars.getTemplate("body-template")())
	openpgp.config.show_comment=false;
	openpgp.config.show_version=false;
	app.seecret_engine = new SEECRET_ENGINE();
	$('body').click(function(event){
		if(event.target.id != "openTarget"){
			app.openClosePanel('close');
		}
	})
	$(window).scroll(function() {
		if(app.doScroll){
			var scrollTop = $(window).scrollTop();
			var winHeight = $(window).height();
			var docHeight = $(document).height()
			var v = scrollTop + winHeight;
			if(scrollTop + winHeight == docHeight) {
			   if(document.getElementById("timeline").style.display=="block" && !app.updatingTimeline){
					if(app.homeTimeline){
						app.updateHomeTimeline();
					}
					else {
						app.updateUserTimeline(app.userTimelineId);
					}
			   }
			   else if (document.getElementById("privateMessages").style.display=="block" && !app.updatingDirectMessages) {
					//app.getOlderDirectMessages();
			   }
			}
		}
	});
	$("#textarea-statusUpdate").keyup(
		function(eventObject){
			app.processScaffolding()
		}
	);
	$("#textarea-statusUpdate").change(
		function(eventObj){
			app.processScaffolding()
		}
	);
	$("#scaffoldingEntryContainer0").keyup(function(eventObject){
		app.processScaffoldField(0);
		app.processScaffolding()
	});
	$('#updateStatusForm').submit(function(e) { 
		e.preventDefault();
		app.updateStatus();
	});
	$('#hashesContent').html(Handlebars.getTemplate("hashes-template")(hashes));
	app.initialize();  

});
Handlebars.registerHelper('tweetShortDate', function(tweetDate) {
	var dtext =  moment(tweetDate, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').twitter();
	if(!dtext.match(/\//)) {dtext +=" ago";}
	return dtext;
});

Handlebars.getTemplate = function(name) {
	if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
		$.ajax({
			url : name + '.hbs',
			success : function(data) {
				if (Handlebars.templates === undefined) {
					Handlebars.templates = {};
				}
				Handlebars.templates[name] = Handlebars.compile(data);
			},
			async : false
		});
	}
	return Handlebars.templates[name];
};

function executeCopy(text){
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text.replace(/\n/g,"<br/>");
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
}
