(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['authenticated-header-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "	<a title=\""
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "\" href=\"https://www.twitter.com/"
    + alias2(alias1((depth0 != null ? depth0.screen_name : depth0), depth0))
    + "\" target=\"_blank\"><img  src=\""
    + alias2(alias1((depth0 != null ? depth0.profile_image_url : depth0), depth0))
    + "\" /></a>				";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['direct-message-breadcrumb-template.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"breadCrumbSeparator\">\r\n				<a href=\"javascript:app.showAllDirectMessages()\">Direct messages</a>  \r\n\r\n				<li class=\"fa fa-long-arrow-right\"></li></div>  with "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n				&nbsp;&nbsp;\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.publicKey : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<br/>Not sure if "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " has your public key?  <input type=button onClick=\"app.initiateDirectMessages("
    + alias4(((helper = (helper = helpers.id_str || (depth0 != null ? depth0.id_str : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_str","hash":{},"data":data}) : helper)))
    + ",true)\" value=\"send it\"/>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "					<!--<br/>"
    + alias1(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + " sent you an encryption key on "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.publicKey : depth0)) != null ? stack1.displayDate : stack1), depth0))
    + ". -->\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<br/>Your current key is newer than the key you last sent to "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + ". \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "			<div style=\"margin:10px 0\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sentKeyWarning : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['direct-message-button-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return " 			<input type=button onClick=\"app.setDirectMessageReceiver('"
    + alias4(((helper = (helper = helpers.id_str || (depth0 != null ? depth0.id_str : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_str","hash":{},"data":data}) : helper)))
    + "','"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "');app.setView(app.DIRECT_MESSAGES_VIEW);\" value=\"Message\"/>";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['direct-messages-template.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.outbound : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing;

  return "					<div style=\"text-align:right;margin: 0 0 10px 0;\" class=\"dmMessageDiv dm_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.recipient : depth0)) != null ? stack1.id_str : stack1), depth0))
    + "\">\r\n						<div class=\"directMessageContainer bubbleRight\">\r\n								Send a message to \r\n								<span><a href=\"javascript:app.setDirectMessageReceiver('"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.recipient : depth0)) != null ? stack1.id_str : stack1), depth0))
    + "','"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.recipient : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "')\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.recipient : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "</a> at "
    + alias2((helpers.tweetShortDate || (depth0 && depth0.tweetShortDate) || alias4).call(alias3,(depth0 != null ? depth0.created_at : depth0),{"name":"tweetShortDate","hash":{},"data":data}))
    + "</span>\r\n								<div class=\"directMessage\">"
    + alias2(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"text","hash":{},"data":data}) : helper)))
    + "</div>\r\n						</div>\r\n						<div class=\"bubbleImageRight\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.profile_image_url : stack1), depth0))
    + "\" /></div>\r\n\r\n					</div>\r\n					\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "					<div class=\"container dmMessageDiv dm_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id_str : stack1), depth0))
    + "\">\r\n						<div class=\"bubbleImageLeft\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.profile_image_url : stack1), depth0))
    + "\" /></div>\r\n						<div class=\"directMessageContainer bubbleLeft\">\r\n							<div>\r\n								Message from\r\n								<span><a href=\"javascript:app.setDirectMessageReceiver('"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id_str : stack1), depth0))
    + "','"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "')\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "</a>  "
    + alias2((helpers.tweetShortDate || (depth0 && depth0.tweetShortDate) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.created_at : depth0),{"name":"tweetShortDate","hash":{},"data":data}))
    + "  \r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.decryptionSuccessful : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.signed : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</span>\r\n								<div class=\"directMessage\">"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.decryptionSuccessful : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\r\n							</div>\r\n						</div>\r\n					</div>\r\n					\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "								<img src=\"img/encrypted.png\" class=\"dmIcon\" />\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "								<img src=\"img/signed.jpg\" class=\"dmIcon\" />\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\r\n								"
    + container.escapeExpression(((helper = (helper = helpers.seecret || (depth0 != null ? depth0.seecret : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"seecret","hash":{},"data":data}) : helper)))
    + "\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "								"
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n								";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":".","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['direct-message-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<div id=\"directMessageForm\">\r\n						Send direct message to <span id=\"directMessageTarget\">"
    + alias4(((helper = (helper = helpers.receiverName || (depth0 != null ? depth0.receiverName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiverName","hash":{},"data":data}) : helper)))
    + "</span><p/>\r\n						<textarea id=\"directMessage\"></textarea>\r\n						<input type=hidden id=\"directMessageReceiverId\" value=\""
    + alias4(((helper = (helper = helpers.receiverId || (depth0 != null ? depth0.receiverId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiverId","hash":{},"data":data}) : helper)))
    + "\" />\r\n						<br/>\r\n						<input type=button onClick=\"app.prepareDirectMessage('"
    + alias4(((helper = (helper = helpers.receiverId || (depth0 != null ? depth0.receiverId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiverId","hash":{},"data":data}) : helper)))
    + "')\" value=\"Send message\"/>\r\n			</div>\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['hashes-template.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<li style=\"margin-top:8px;\"> - SHA1 hash for <a href=\""
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "\" target=\"_new\">"
    + alias4(((helper = (helper = helpers.filename || (depth0 != null ? depth0.filename : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"filename","hash":{},"data":data}) : helper)))
    + "</a>\r\n		<div style=\"padding:3px;margin:5px;background-color:#DEDEDE;border:1px solid #AAA;\">"
    + alias4(((helper = (helper = helpers.hash || (depth0 != null ? depth0.hash : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hash","hash":{},"data":data}) : helper)))
    + "</div>\r\n		</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<h2 class=\"timeLine\">File hashes</h2>\r\n		<br/>\r\n		You are using Seecret version 1.0\r\n		<br/><br/>\r\n			You can verify the integrity of the major components of this application with the SHA1 values listed below.  Read more at <a href=\"https://www.seecret.net/mirror.html\" target=\"_new\">https://www.seecret.net/mirror.html</a><p/><br/>\r\n		<ul class=\"hashes\">\r\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":".","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\r\n		<p/>\r\n		<br/>\r\n		Source of the hash values presented here is:  <a href=\"js/seecret_hashes.js\" target=\"_new\">js/seecret_hashes.js</a><p/><br/>\r\n		These SHA1 hash values as well as the SHA1 hash value for seecret_hashes.js can be found at the following locations:<p/>\r\n		<ul>\r\n		<li style=\"padding:5px;\"><a href=\"https://www.seecret.net/mirror.html\">https://www.seecret.net/mirror.html</a></li>\r\n        <li style=\"padding:5px;\"><a href=\"https://github.com/simpledynamics/seecret_app\">https://github.com/simpledynamics/seecret_app</a></li>		\r\n		<li style=\"padding:5px;\"><a href=\"https://www.twitter.com/seecretapp\">https://www.twitter.com/seecretapp</a></li>\r\n		<li style=\"padding:5px;\"><a href=\"https://www.facebook.com/Seecret-1780007618900168/info?tab=page_info\">https://www.facebook.com/Seecret-1780007618900168/</a></li>\r\n		<li style=\"padding:5px;\"><a href=\"https://www.linkedin.com/company/simple-dynamics\">https://www.linkedin.com/company/simple-dynamics</a></li>\r\n		<li style=\"padding:5px;\"><a href=\"https://www.simpledynamics.net/seecret_hashes.html\">https://www.simpledynamics.net/seecret_hashes.html</a></li>\r\n		<li style=\"padding:5px;\"><a href=\"https://gist.github.com/nategrover/16b84670ef1f43f8f5dbc219b3736787\">https://gist.github.com/nategrover/16b84670ef1f43f8f5dbc219b3736787</a></li>\r\n		</ul>\r\n		<br/><br/>\r\n		IMPORTANT!\r\n		<br/>\r\n		You should also verify that the contents of <a href=\"js/oauthio_key.js\" target=\"_new\">js/oauthio_key.js</a> look something like this:\r\n		<br/><br/>\r\n		<div style=\"padding:10px;padding-left:20px;background-color:#EFEFEF;font-face:arial\">\r\n		<pre>\r\n		\r\n var oauthio_key={\r\n	key: 'D-G71uLuTzHet-_Km8m5RzH49d8'\r\n }		\r\n		</pre>\r\n		</div>\r\n		<br/>\r\n		The key value itself could be different. That doesn't matter.  But if you see more code than the three lines above, be concerned. \r\n		";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['no-more-direct-messages-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div style=\"font-weight:bold\">You have reached the very first direct message to you.  There are no more.</div>";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['no-more-timeline-message-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div style=\"font-weight:bold\">You have reached the very first message of this timeline.  There are no more.</div>";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['no-seecrets-in-timeline-segment-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div style=\"font-weight:bold\">There were no Seecrets found in the last 200 tweets in the timeline.</div>";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['private-key-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "			<div id=\"privateKeyManager\">\r\n				No private key.  (You either deleted it or the initial gen failed).  Go to the <a href=\"javascript:app.setView(app.SETTINGS_VIEW)\">Settings</a> and regenerate your private key to activate direct messaging on Seecret.  \r\n			</div>\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['public-key-pending-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div id=\"publicKeyManager\" class=\"container\">\r\n				"
    + alias4(((helper = (helper = helpers.receiver_name || (depth0 != null ? depth0.receiver_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver_name","hash":{},"data":data}) : helper)))
    + " has not yet connected with you over Seecret.  Once they install Seecret you can both send secure encrypted direct messages.<br/>  \r\n				You sent "
    + alias4(((helper = (helper = helpers.receiver_name || (depth0 != null ? depth0.receiver_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver_name","hash":{},"data":data}) : helper)))
    + " an invite on "
    + alias4(((helper = (helper = helpers.invite_date || (depth0 != null ? depth0.invite_date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"invite_date","hash":{},"data":data}) : helper)))
    + " <span style=\"font-style:italic\">from this device</span>.  You can resend the invite if you like.  <span id=\"sendPublicKeyButtonContainer\"><input type=button id=\"sendPublicKeyButton\" value=\"Send it\" onClick=\"app.initiateDirectMessages("
    + alias4(((helper = (helper = helpers.receiver_id || (depth0 != null ? depth0.receiver_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver_id","hash":{},"data":data}) : helper)))
    + ",true)\"/></span>\r\n				</div>\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['public-keys-template.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div class=\"keyDisplayContainer\">\r\n					<br/><br/>\r\n					From <a href=\"javascript:app.setDirectMessageReceiver('"
    + alias4(((helper = (helper = helpers.id_str || (depth0 != null ? depth0.id_str : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_str","hash":{},"data":data}) : helper)))
    + "','"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "');app.setView(app.DIRECT_MESSAGES_VIEW);\">"
    + alias4(((helper = (helper = helpers.screen_name || (depth0 != null ? depth0.screen_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screen_name","hash":{},"data":data}) : helper)))
    + "</a> sent on "
    + alias4(((helper = (helper = helpers.displayDate || (depth0 != null ? depth0.displayDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayDate","hash":{},"data":data}) : helper)))
    + ".\r\n					<pre class=\"keyDisplay\" id=\"keyDisplay_"
    + alias4(((helper = (helper = helpers.id_str || (depth0 != null ? depth0.id_str : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_str","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</pre>\r\n					<br/>\r\n					<button onClick=\"app.copySenderPublicKeyToClipboard('"
    + alias4(((helper = (helper = helpers.id_str || (depth0 != null ? depth0.id_str : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id_str","hash":{},"data":data}) : helper)))
    + "')\">Copy to clipboard</button>\r\n				</div>\r\n				<br/><br/>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.keys : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['public-key-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "				<div id=\"publicKeyManager\" class=\"container\">\r\n					Do you want to ask "
    + alias4(((helper = (helper = helpers.receiver_name || (depth0 != null ? depth0.receiver_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver_name","hash":{},"data":data}) : helper)))
    + " to message you with Seecret?\r\n					<input type=button value=\"YES\" onClick=\"app.initiateDirectMessages("
    + alias4(((helper = (helper = helpers.receiver_id || (depth0 != null ? depth0.receiver_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver_id","hash":{},"data":data}) : helper)))
    + ")\"/>.  \r\n					<br/> "
    + alias4(((helper = (helper = helpers.receiver_name || (depth0 != null ? depth0.receiver_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receiver_name","hash":{},"data":data}) : helper)))
    + " will receive an invite and a Seecret key that will allow you to send and receive encrypted messages.  Read more in the <a href=\"https://www.seecret.net/faq.html\" target=\"_new\">FAQ</a>\r\n				</div>\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scaffold-status-good-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<span>Message is <span style=\"color:#2BD618;font-weight:bold\">good</span> to send.  You have room for <span style=\"font-weight:bold\">"
    + container.escapeExpression(((helper = (helper = helpers.availableCharacters || (depth0 != null ? depth0.availableCharacters : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"availableCharacters","hash":{},"data":data}) : helper)))
    + "</span> more characters.</span>";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scaffold-status-incomplete-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "			<span style=\"color:red;font-weight:bold\">NOT READY</span>\r\n		    Still need to add a visible tweet of at least two characters to hide Seecret message inside.\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scaffold-status-spillover-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<span style=\"color:red;font-weight:bold\">NOT READY</span>\r\n		You can either reduce the message length by <span style=\"font-weight:bold\">"
    + container.escapeExpression(((helper = (helper = helpers.spillover || (depth0 != null ? depth0.spillover : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"spillover","hash":{},"data":data}) : helper)))
    + "</span> \r\n		<span id=\"addAnotherScaffoldButton\"> or <button onClick=\"app.newVisibleMessageField()\" class=\"addMoreButton\">add another visible tweet</button></span>.\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scaffolds-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "			<div id=\"scaffoldingEntryContainer0\"><span>Message 1:</span>&nbsp<input type=text value=\"\" onKeyUp=\"app.processScaffoldField(0);app.processScaffolding()\" id=\"scaffold0\" /></div>										\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['scaffold-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "			<div id=\"scaffoldingEntryContainer"
    + alias4(((helper = (helper = helpers.scaffoldId || (depth0 != null ? depth0.scaffoldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scaffoldId","hash":{},"data":data}) : helper)))
    + "\"><span>Tweet "
    + alias4(((helper = (helper = helpers.scaffoldCount || (depth0 != null ? depth0.scaffoldCount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scaffoldCount","hash":{},"data":data}) : helper)))
    + ":</span>  <input type=text value=\""
    + alias4(((helper = (helper = helpers.val || (depth0 != null ? depth0.val : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"val","hash":{},"data":data}) : helper)))
    + "\" onKeyUp=\"app.processScaffoldField("
    + alias4(((helper = (helper = helpers.scaffoldId || (depth0 != null ? depth0.scaffoldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scaffoldId","hash":{},"data":data}) : helper)))
    + ");app.processScaffolding()\" id=\"scaffold"
    + alias4(((helper = (helper = helpers.scaffoldId || (depth0 != null ? depth0.scaffoldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scaffoldId","hash":{},"data":data}) : helper)))
    + "\" /><div id=\"scaffoldRemover"
    + alias4(((helper = (helper = helpers.scaffoldId || (depth0 != null ? depth0.scaffoldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scaffoldId","hash":{},"data":data}) : helper)))
    + "\" onClick=\"app.removeScaffold("
    + alias4(((helper = (helper = helpers.scaffoldId || (depth0 != null ? depth0.scaffoldId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scaffoldId","hash":{},"data":data}) : helper)))
    + ")\" title=\"Remove\" class=\"removeButton\"><i class=\"fa fa-trash-o\"></i></div></div>\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['status-template.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "					<div class=\"basicTweet\" style=\"display:none;\">\r\n						<div class=\"leftCol\"><a href=\"https://www.twitter.com/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "\" target=\"_blank\"><img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.profile_image_url : stack1), depth0))
    + "\" /></a></div>\r\n						<div class=\"rightCol\">\r\n							<div class=\"profileInfo\">\r\n								<div class=\"user\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "</div> \r\n								<div class=\"userLink\"><a href=\"javascript:app.updateUserTimeline('"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "',true)\" target=\"_blank\">@"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "</a></div> \r\n								<div class=\"tweetDate\">("
    + alias2((helpers.tweetShortDate || (depth0 && depth0.tweetShortDate) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.created_at : depth0),{"name":"tweetShortDate","hash":{},"data":data}))
    + ")</div>\r\n							</div>\r\n							<div class=\"message\"> \r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.seecret : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "							\r\n							</div>\r\n							<div class=\"footer\">\r\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.seecret : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "								\r\n							</div>\r\n						</div>\r\n					</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "								<div class=\"tworse\">\r\n									<div class=\"seecretLogo\"><div class=\"icon\"></div></div>\r\n									<div class=\"\">"
    + container.escapeExpression(((helper = (helper = helpers.seecret || (depth0 != null ? depth0.seecret : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"seecret","hash":{},"data":data}) : helper)))
    + "</div>\r\n								</div>  \r\n								<div class=\"originalMessage\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.covertexts : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "										<div class=\"messages\">\r\n											<div class=\"tweetLogo\"></div>\r\n											<div>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div>\r\n										</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "								<div class=\"tworse\">\r\n									<div class=\"seecretLogo\"></div>\r\n									<div class=\"\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper)))
    + "</div>\r\n								</div>  \r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								<div class=\"tweetActionsDisabled\">\r\n									<ul class=\"tweetActions\">\r\n										<li class=\"reply\"><div href=\"\" alt=\"Reply\"></div></li>\r\n										<li class=\"retweet\"><div href=\"\" alt=\"ReTweet\"></div></li> <!-- if retweet should be 'on' use class=retweetOn -->\r\n										<li class=\"favorite\"><div href=\"\" alt=\"Favorite\"></div></li> <!-- if favorite should be 'on' use class=favoriteOn -->\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.follower : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									</ul>							\r\n								</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "										<li class=\"dm\">\r\n											<div class=\"dm_button3\" title=\"Message\" onclick=\"app.setDirectMessageReceiver('"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.id_str : stack1), depth0))
    + "','"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + "');app.setView(app.DIRECT_MESSAGES_VIEW);\">\r\n												<div class=\"fa fa-envelope\"></div>\r\n											</div>\r\n										</li>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								<div class=\"tweetActions\">\r\n									<ul class=\"tweetActions\">\r\n										<li class=\"reply\"><div href=\"\" alt=\"Reply\"></div></li>\r\n										<li class=\"retweet\"><div href=\"\" alt=\"ReTweet\"></div></li> <!-- if retweet should be 'on' use class=retweetOn -->\r\n										<li class=\"favorite\"><div href=\"\" alt=\"Favorite\"></div></li> <!-- if favorite should be 'on' use class=favoriteOn -->\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.follower : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									</ul>							\r\n								</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":".","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['unauthenticated-header-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "			<a id=\"loginButton\" href=\"#\" onclick=\"app.loginToTwitter(); return false;\" ><div></div></a>		\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['undecrypted-message-content-template.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			This message could not be decrypted.  "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.screen_name : stack1), depth0))
    + " may not have your current public key.  You can <input type=button value=\"Send it\" onClick=\"app.initiateDirectMessages("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.sender : depth0)) != null ? stack1.id_str : stack1), depth0))
    + ",true)\"/> now or first <a href=\"javascript:app.setView(app.SETTINGS_VIEW)\">verify your key in the Settings</a> to be sure.\r\n";
},"useData":true});
})();(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['user-keys-template.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								<pre id=\"privateKeyPassphrase\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.keyOptions : depth0)) != null ? stack1.passphrase : stack1), depth0))
    + "</pre>\r\n								<button onClick=\"app.copyContentsToClipboard('privateKeyPassphrase')\">Copy to clipboard</button>\r\n								<button onClick=\"app.deleteSavedPassphrase()\">Delete from device</button>(Be sure you've memorized it!)\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "								Passphrase not saved. \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "		<div>\r\n						<div class=\"formRow\">\r\n							<div>\r\n							<pre id=\"privateKeyTextarea\">Generated on "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.privateKey : depth0)) != null ? stack1.dateCreatedDisplay : stack1), depth0))
    + "\r\n"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.privateKey : depth0)) != null ? stack1.armored : stack1), depth0))
    + "\r\n							</pre>\r\n							<br/>\r\n							<button onClick=\"app.copyContentsToClipboard('privateKeyTextarea')\">Copy to clipboard</button>\r\n							<p/>\r\n							<br/>\r\n							</div>\r\n						</div>\r\n						<div class=\"formRow\">\r\n							<div><strong>Passphrase:</strong></div>\r\n							<div>\r\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.keyOptions : depth0)) != null ? stack1.passphrase : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.unless.call(alias3,((stack1 = (depth0 != null ? depth0.keyOptions : depth0)) != null ? stack1.passphrase : stack1),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								<button onClick=\"app.changePassphrase()\">Change passphrase</button>\r\n								<p/>\r\n								<br/>\r\n							</div>\r\n						</div>																		 \r\n						<div class=\"formRow\">\r\n							<div><strong>Public Key:</strong></div>\r\n							<div>\r\n								<pre id=\"publicKeyExport\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.publicKey : depth0)) != null ? stack1.armored : stack1), depth0))
    + "</pre>\r\n								<button onClick=\"app.copyContentsToClipboard('publicKeyExport')\">Copy to clipboard</button><p/>\r\n							</div>\r\n						</div>		\r\n		</div>\r\n";
},"useData":true});
})();