function Buffer(){this.bytes=new Array};function Parser(t){this.deliveredByteCt=0,this.bytes=t.slice(0,t.length)}var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){for(var e,r,i,o,s,B,n,h="",a=0;a<t.length;)e=t[a++],r=t[a++],i=t[a++],o=e>>2,s=(3&e)<<4|r>>4,B=(15&r)<<2|i>>6,n=63&i,isNaN(r)?B=n=64:isNaN(i)&&(n=64),h=h+this._keyStr.charAt(o)+this._keyStr.charAt(s)+this._keyStr.charAt(B)+this._keyStr.charAt(n);return h},decode:function(t){var e,r,i,o,s,B,n,h=new Array,a=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");a<t.length;)o=this._keyStr.indexOf(t.charAt(a++)),s=this._keyStr.indexOf(t.charAt(a++)),B=this._keyStr.indexOf(t.charAt(a++)),n=this._keyStr.indexOf(t.charAt(a++)),e=o<<2|s>>4,r=(15&s)<<4|B>>2,i=(3&B)<<6|n,h.push(e),64!=B&&h.push(r),64!=n&&h.push(i);return h}},PBU_BYTES_MIN_SHORT=-Math.pow(2,15),PBU_BYTES_MAX_SHORT=-1*PBU_BYTES_MIN_SHORT-1,PBU_BYTES_MIN_INT=-Math.pow(2,31),PBU_BYTES_MAX_INT=-1*PBU_BYTES_MIN_INT-1,PBU_BYTES_MAX_DOUBLE_EXP=2047,PBU_BYTES_DOUBLE_EXP_BIAS=PBU_BYTES_MAX_DOUBLE_EXP>>1;Buffer.prototype.writeBool=function(t){this.bytes.push(t?1:0)},Buffer.prototype.writeByte=function(t){t===!0&&(t=1),t===!1&&(t=0),0>t?t=0:t>255&&(t=255),this.bytes.push(t)},Buffer.prototype.writeShort=function(t){PBU_BYTES_MIN_SHORT>t?t=PBU_BYTES_MIN_SHORT:t>PBU_BYTES_MAX_SHORT&&(t=PBU_BYTES_MAX_SHORT);for(var e=this.bytes.length,r=1;r>=0;r--)this.bytes[e+r]=255&t,t>>=8},Buffer.prototype.writeInt=function(t){PBU_BYTES_MIN_INT>t?t=PBU_BYTES_MIN_INT:t>PBU_BYTES_MAX_INT&&(t=PBU_BYTES_MAX_INT);for(var e=this.bytes.length,r=3;r>=0;r--)this.bytes[e+r]=255&t,t>>=8},Buffer.prototype.writeDouble=function(t){var e,r,i,o=0>t?1:0;t=Math.abs(t),isNaN(t)||1/0==t?(r=isNaN(t)?1:0,e=PBU_BYTES_MAX_DOUBLE_EXP):(e=Math.floor(Math.log(t)/Math.LN2),t*(i=Math.pow(2,-e))<1&&(e--,i*=2),t*i>=2&&(e++,i/=2),e+PBU_BYTES_DOUBLE_EXP_BIAS>=PBU_BYTES_MAX_DOUBLE_EXP?(r=0,e=PBU_BYTES_MAX_DOUBLE_EXP):e+PBU_BYTES_DOUBLE_EXP_BIAS>=1?(r=(t*i-1)*Math.pow(2,52),e+=PBU_BYTES_DOUBLE_EXP_BIAS):(r=t*Math.pow(2,PBU_BYTES_DOUBLE_EXP_BIAS-1)*Math.pow(2,52),e=0));var s=this.bytes.length,B=52,n=0;for(n=0;B>=8;B-=8)this.bytes[s+n]=255&r,n++,r/=256;var h=11+B;for(e=e<<B|r;h>0;h-=8)this.bytes[s+n]=255&e,n++,e/=256;this.bytes[s+n-1]|=128*o},Buffer.prototype.writeStringNarrow=function(t){var e=t.length;this.writeShort(e);for(var r=this.bytes.length,i=0;e>i;i++)this.bytes[r+i]=t.charCodeAt(i)},Buffer.prototype.writeStringWide=function(t){var e=t.length;this.writeShort(e);for(var r=0;e>r;r++)this.writeShort(t.charCodeAt(r))},Buffer.prototype.writeByteBuffer=function(t){var e=t.length;this.writeInt(e);for(var r=0;e>r;r++)this.bytes.push(t[r])},Buffer.prototype.writeIntBuffer=function(t){var e=t.length;this.writeInt(e);for(var r=0;e>r;r++)this.writeInt(t[r])},Buffer.prototype.getRawBytes=function(){return this.bytes},Buffer.prototype.printOutBytes=function(){for(var t=0;t<this.bytes.length;)console.log(this.bytes[t++]);return this.bytes},Parser.prototype.readBool=function(){var t=this.bytes[this.deliveredByteCt];return this.deliveredByteCt++,1===t?!0:!1},Parser.prototype.readByte=function(){var t=this.bytes[this.deliveredByteCt];return this.deliveredByteCt++,t},Parser.prototype.readShort=function(){for(var t=0,e=1,r=1;r>=0;r--)t+=this.bytes[this.deliveredByteCt+r]*e,e*=256;return t&-PBU_BYTES_MIN_SHORT&&(t+=2*PBU_BYTES_MIN_SHORT),this.deliveredByteCt+=2,t},Parser.prototype.readInt=function(){for(var t=0,e=1,r=3;r>=0;r--)t+=this.bytes[this.deliveredByteCt+r]*e,e*=256;return t&-PBU_BYTES_MIN_INT&&(t+=2*PBU_BYTES_MIN_INT),this.deliveredByteCt+=4,t},Parser.prototype.readDouble=function(){var t=0,e=7,r=this.bytes[this.deliveredByteCt+e];e--;var i=-7,o=127&r;for(r>>=7,i=4;i>0;i-=8)o=256*o+this.bytes[this.deliveredByteCt+e],e--;var s=o&(1<<-i)-1;for(o>>=-i,i+=52;i>0;i-=8)s=256*s+this.bytes[this.deliveredByteCt+e],e--;switch(o){case 0:o=1-PBU_BYTES_DOUBLE_EXP_BIAS;break;case PBU_BYTES_MAX_DOUBLE_EXP:return t=s?0/0:1/0*(r?-1:1),this.deliveredByteCt+=8,t;default:s+=Math.pow(2,52),o-=PBU_BYTES_DOUBLE_EXP_BIAS}return t=(r?-1:1)*s*Math.pow(2,o-52),this.deliveredByteCt+=8,t},Parser.prototype.readStringNarrow=function(){for(var t=this.readShort(),e=new Array,r=0;t>r;r++)e[r]=String.fromCharCode(this.bytes[this.deliveredByteCt]),this.deliveredByteCt++;return e.join("")},Parser.prototype.readStringWide=function(){for(var t=this.readShort(),e=new Array,r=0;t>r;r++)e[r]=String.fromCharCode(this.readShort());return e.join("")},Parser.prototype.readByteBuffer=function(){for(var t=this.readInt(),e=new Array,r=0;t>r;r++)e[r]=this.bytes[this.deliveredByteCt],this.deliveredByteCt++;return e},Parser.prototype.readIntBuffer=function(){for(var t=this.readInt(),e=new Array,r=0;t>r;r++)e[r]=this.readInt();return e};{#
Parser.prototype.readDataType = function ()
{
	switch(this.readByte())
	{
		case 0: return { type: 'byte', value: readByte() };
		case 1: return { type: 'short', value: readShort() };
		case 2: return { type: 'int', value: readInt() };
		case 3: return { type: 'int64', value: readInt64() };
		case 4: return { type: 'bool', value: readBool()) };
		case 5: return { type: 'float', value: readFloat() };
		case 6: return { type: 'double', value: readDouble() };
		case 7: return { type: 'byte_buffer', value: readByteBuffer() };
		case 8: return { type: 'string_narrow', value: readStringNarrow() };
		default: return false;
	}
}
#}