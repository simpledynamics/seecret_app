/*
Compression utilities
Depends on the shoco and smaz libs
shoco: https://github.com/Ed-von-Schleck/shoco
smaz: https://github.com/personalcomputer/smaz.js
 
 
Both smaz and shoco return string indexed objects instead of actual arrays.  We convert the compression out put to actual arrays. 
*/
var seecret_compression = {
	SMAZ_TYPE:0,
	SHOCO_TYPE:1,
	isAscii: function (val){
		return /^[\x00-\x7F]*$/.test(val);
	},
	compress: function (val) {
			var smazified = seecret_compression.smazify(val);
			var shocotized = seecret_compression.shocotize(val);
			return smazified.length >= shocotized.length?shocotized:smazified;
	},
	smazify:function(val){
		var smazified = smaz.compress(val);
		var smazifiedArray = seecret_compression.convertIndexedObectToArray(smazified);
		smazifiedArray.unshift(seecret_compression.SMAZ_TYPE);
		return smazifiedArray;
	},
	shocotize:function(val){
		var shocotized = shoco.compress(val);
		var shocotizedArray = seecret_compression.convertIndexedObectToArray(shocotized);
		shocotizedArray.unshift(seecret_compression.SHOCO_TYPE);
		return shocotizedArray;
	},
	toUint8Array:function(vals){
		var buf = new ArrayBuffer(vals.length);
		var returnVal = new Uint8Array(buf);
		for(each in vals){
			returnVal[each] = vals[each];
		}
		return returnVal;
	},
	decompress:function(vals){
		if(!seecret_compression.validateCompressedArray(vals)) {
			throw seecret_compression.INVALID_COMPRESSED_ARRAY_VALUES_ERROR;
		}
		if(vals[0] == seecret_compression.SMAZ_TYPE){
			return seecret_compression.desmazify(vals.slice(1));
		}
		else if (vals[0] == seecret_compression.SHOCO_TYPE){
			return seecret_compression.deshocotize(vals.slice(1));
		}
	},
	desmazify:function(vals) {
		var smazzed = smaz.decompress(vals);
		return smazzed;
	},
	deshocotize:function(vals){
		var shocoProper = seecret_compression.toUint8Array(vals);
		return shoco.decompress(shocoProper);
	},
	validateCompressedArray:function(vals){
		for(var i =0;i<vals.length;i++){
			if(!Number.isInteger(vals[i])) {
				return false;
			}
		}
		return true;
	},
	convertIndexedObectToArray:function(obj){
		var arr = [];
		for(var o in obj){
			arr.push(obj[o]);
		}
		return arr;
	},
	INVALID_COMPRESSED_ARRAY_VALUES_ERROR:{
		name:"INVALID_COMPRESSED_ARRAY_VALUES_ERROR",
		message:"Each value in the array be a Javascript Integer type",
		toString:function(){return this.name + " : " + this.message;}
	}
}