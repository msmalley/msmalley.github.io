// SPDX-License-Identifier: MIT

// 15952 of 24977
// 0x0d08f2a0c4c1db4ec0feeb8b3f94f1e13b745c99

// PAYABLE = 0x49e00e0fa7645ec8bea5f184e31ea2d7d45cffce

pragma solidity ^0.8.0;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies on extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        require(isContract(target), "Address: call to non-contract");

        (bool success, bytes memory returndata) = target.call{value: value}(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(address target, bytes memory data) internal view returns (bytes memory) {
        return functionStaticCall(target, data, "Address: low-level static call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a static call.
     *
     * _Available since v3.3._
     */
    function functionStaticCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal view returns (bytes memory) {
        require(isContract(target), "Address: static call to non-contract");

        (bool success, bytes memory returndata) = target.staticcall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(address target, bytes memory data) internal returns (bytes memory) {
        return functionDelegateCall(target, data, "Address: low-level delegate call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-string-}[`functionCall`],
     * but performing a delegate call.
     *
     * _Available since v3.4._
     */
    function functionDelegateCall(
        address target,
        bytes memory data,
        string memory errorMessage
    ) internal returns (bytes memory) {
        require(isContract(target), "Address: delegate call to non-contract");

        (bool success, bytes memory returndata) = target.delegatecall(data);
        return _verifyCallResult(success, returndata, errorMessage);
    }

    function _verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) private pure returns (bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
    
    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
    
    function toString(address x) internal pure returns (string memory) 
    {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) 
        {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);           
        }
        return string(s);
    }
}

/**
 * @dev String operations.
 */
library Strings {
    bytes16 private constant _HEX_SYMBOLS = "0123456789abcdef";

    /**
     * @dev Converts a `uint256` to its ASCII `string` decimal representation.
     */
    function toString(uint256 value) internal pure returns (string memory) {
        // Inspired by OraclizeAPI's implementation - MIT licence
        // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
     */
    function toHexString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0x00";
        }
        uint256 temp = value;
        uint256 length = 0;
        while (temp != 0) {
            length++;
            temp >>= 8;
        }
        return toHexString(value, length);
    }

    /**
     * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
     */
    function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
        bytes memory buffer = new bytes(2 * length + 2);
        buffer[0] = "0";
        buffer[1] = "x";
        for (uint256 i = 2 * length + 1; i > 1; --i) {
            buffer[i] = _HEX_SYMBOLS[value & 0xf];
            value >>= 4;
        }
        require(value == 0, "Strings: hex length insufficient");
        return string(buffer);
    }
}

library SafeMath 
{
    function add(uint a, uint b) internal pure returns (uint c) 
    {
        c = a + b;
        require(c >= a);
    }

    function sub(uint a, uint b) internal pure returns (uint c) 
    {
        require(b <= a);
        c = a - b;
    }

    function mul(uint a, uint b) internal pure returns (uint c) 
    {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function div(uint a, uint b) internal pure returns (uint c) 
    {
        require(b > 0);
        c = a / b;
    }
}

interface NonFungibleArtists
{
    function getArtisticStyleBytes(uint256 artist) external view returns(bytes memory);
}

// NOTE - MAYNOT WORK DUE TO SWITCHING TO EXTERNAL HERE BUT NOT ATR SOURCE ???

contract NonFungibleStyles
{
    NonFungibleArtists artists;
    
    using SafeMath for uint;
    using Address for address;
    using Strings for uint256;
    
    string internal xor = "function XS(t,i,n,e){this.x=t?t>>>0:123456789,this.y=i?i>>>0:362436069,this.z=n?n>>>0:521288629,this.w=e?e>>>0:88675123}XS.prototype.next=function(){var t=this.x^this.x<<11&2147483647;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>19^t^t>>8,this.w},XS.prototype.unit=function(){return this.next()/2147483648},XS.prototype.unitInclusive=function(){return this.next()/2147483647},XS.prototype.integer=function(t,i){return this.integerExclusive(t,i+1)},XS.prototype.integerExclusive=function(t,i){return t=Math.floor(t),i=Math.floor(i),Math.floor(this.unit()*(i-t))+t},XS.prototype.real=function(t,i){return this.unit()*(i-t)+t},XS.prototype.realInclusive=function(t,i){return this.unitInclusive()*(i-t)+t},XS.prototype.reseed=function(t,i,n,e){this.x=t?t>>>0:123456789,this.y=i?i>>>0:362436069,this.z=n?n>>>0:521288629,this.w=e?e>>>0:88675123};";
    
    string internal util = "var s2s=function(e){var n='';for(x=0;x<e.length;x++){n+=e.charAt(x).charCodeAt(0)}return parseInt(n)},gc=function(e){var n=['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'],t=new XS(parseInt(s2s('R')*e)),r=new XS(parseInt(s2s('G')*e)),s=new XS(parseInt(s2s('B')*e)),g=new XS(parseInt(s2s('C')*e)),a=new XS(parseInt(s2s('M')*e)),h=new XS(parseInt(s2s('Y')*e)),i=n[t.integer(0,n.length-1)];return i+=n[r.integer(0,n.length-1)],i+=n[s.integer(0,n.length-1)],i+=n[g.integer(0,n.length-1)],i+=n[a.integer(0,n.length-1)],'#'+(i+=n[h.integer(0,n.length-1)])};";
    
    string internal setup = "var div=document.createElement('DIV'),can=document.createElement('CANVAS'),ctx=can.getContext('2d');can.id='pandora-square-'+nft,div.id='pandora-wrapper-'+nft,div.classList.add('pandora-square'),document.body.appendChild(div);var wrapper=document.querySelector('#pandora-wrapper-'+nft);wrapper.appendChild(can);var size=300,dpr=2;can.width=size*dpr,can.height=size*dpr,ctx.scale(dpr,dpr);";
    
    string internal blockatar = 'var build_head=function(e){avatar_layer("head",e)},build_leye=function(e){avatar_layer("leye",e)},build_reye=function(e){avatar_layer("reye",e)},build_mouth=function(e){avatar_layer("mouth",e)},build_nose=function(e){avatar_layer("nose",e)},build_avatar=function(e,t,a,i,l){build_head(e),build_leye(t),build_reye(a),build_mouth(i),build_nose(l)},avatar_layer=function(e,t){var a=parseInt(t*s2s("R")),l=parseInt(t*s2s("G")),n=parseInt(t*s2s("B")),r=new XS(a),o=new XS(l),g=new XS(n),c=new XS(a+l),h=new XS(l+n),s=new XS(a+n),x=[gc(a),gc(l),gc(n),gc(a+l),gc(l+n)],d=x[0],u={ghead:!1,geyes:!1,gnose:!1,gmouth:!1,glasses:!1,teeth:!1,eyes:"square",pupils:"square",lashes:"square",nose:"square",mouth:"square"};r.integer(0,1)&&(u.ghead=!0),o.integer(0,1)&&(u.geyes=!0),g.integer(0,1)&&(u.gnose=!0),c.integer(0,1)&&(u.gmouth=!0),h.integer(0,1)&&(u.glasses=!0),s.integer(0,1)&&(u.teeth=!0),r.integer(2,4)+o.integer(0,3)>5&&(u.eyes="round"),g.integer(2,4)+c.integer(0,3)>5&&(u.pupils="round"),h.integer(2,4)+s.integer(0,3)>5&&(u.lashes="round"),r.integer(2,4)+s.integer(0,3)>5&&(u.nose="round"),o.integer(2,4)+h.integer(0,3)>5&&(u.mouth="round");var p=parseFloat("0."+r.integer(25,95)),v=(parseFloat("0."+o.integer(25,95)),parseFloat("0."+g.integer(25,95)),parseFloat("0."+c.integer(25,95))),f=parseFloat("0."+h.integer(25,95)),b=parseFloat("0."+s.integer(25,95));console.log("bac",u);var y=function(e,t,a,i,l=!1,n=!1,r=0){ctx.beginPath(),ctx.rect(e,t,a,i),ctx.lineWidth=0,r&&(ctx.lineWidth=r),l&&(ctx.fillStyle=l,ctx.fill()),n&&(ctx.strokeStyle=n,ctx.stroke())},A=function(e,t,a,i=2,l=!1,n=!1,r=0,o=!1){ctx.beginPath(),o?ctx.arc(e+a/2,t+a/2,a/2,i*Math.PI,0):ctx.arc(e+a/2,t+a/2,a/2,0,i*Math.PI),ctx.lineWidth=0,r&&(ctx.lineWidth=r),l&&(ctx.fillStyle=l,ctx.fill()),n&&(ctx.strokeStyle=n,ctx.stroke())},_=function(e=0,t=0,a=0,i=0,l=1,n=!1,r=!1){var g=l,h=ctx.createLinearGradient(e,t,e,i);2==g&&(h=ctx.createLinearGradient(e,t,a,i)),3==g&&(h=ctx.createLinearGradient(e,i,a,e)),4==g&&(h=ctx.createRadialGradient(can.width/2/2,can.height/2/2,0,can.width/2,can.height/2,can.width));var s=x[o.integer(0,x.length-1)],d=x[c.integer(0,x.length-1)];return n&&r?(h.addColorStop(0,n),h.addColorStop(1,r)):(h.addColorStop(0,s),h.addColorStop(1,d)),h},m=function(e,t,a){t-=g.integer(1,10);var i=c.integer(0,4);if(ctx.beginPath(),ctx.strokeStyle=x[2],ctx.lineCap=u.lashes,ctx.lineWidth=i,s.integer(0,1)&&h.integer(0,1))ctx.moveTo(e,t-(10+i)),ctx.lineTo(e+a,t-(10+i));else{var l=-5+h.integer(0,10),n=-5+s.integer(0,10);ctx.moveTo(e,t-(10+i+l)),ctx.lineTo(e+a,t-(10+i+n))}ctx.stroke()};!function(){var t=d;if(u.ghead){var a=r.integer(1,4),l=x[o.integer(0,x.length-1)];t=_(0,0,can.width,can.height,a,d,l)}"head"==e&&(y(0,0,can.width,can.height,t),u.ghead&&(ctx.globalAlpha=v,y(0,0,can.width,can.height,d),ctx.globalAlpha=1));var n=r.integer(60,110),w=o.integer(25,35),S=110-n,T=(de=w+(xe=w+(S-S/10))/3)+n;ctx.globalAlpha=b;var k=-5+g.integer(0,10),q=-5+c.integer(0,10);t=x[1];var W=0,F=0,X=0,C=!1,G=!1,I=!1;if((r.integer(0,1)||s.integer(0,1))&&(W=c.integer(1,10)),(o.integer(0,1)||c.integer(0,1))&&(F=o.integer(1,5)),(g.integer(0,1)||h.integer(0,1))&&(X=s.integer(1,3)),W>0&&(C=x[2]),F>0&&(G=x[3]),X>0&&(I=x[4]),u.geyes){var P=o.integer(1,4),L=x[g.integer(0,x.length-1)];t=_(0,0,can.width,can.height,P,x[1],L)}if("head"==e&&u.glasses){var M=n/20*s.integer(1,10);y(0-W,de+n/2-M/2,can.width+2*W,M,t,C,W),b=1,ctx.globalAlpha=b,t=d}if("leye"==e){"square"==u.eyes?(y(xe,de,n,n,t,C,W),ctx.globalAlpha=.35,y(xe+10,de+10,n-20,n-20,C,!1),ctx.globalAlpha=b,u.geyes&&(ctx.globalAlpha=.66,y(xe,de,n,n,x[1],C,W),ctx.globalAlpha=b)):(A(xe,de,n,2,t,C,W),u.geyes&&(ctx.globalAlpha=.66,A(xe,de,n,2,x[1],C,W),ctx.globalAlpha=b)),m(xe,de,n),T=T+de+n;var R=x[3],B=n/r.integer(3,9)}if("head"==e&&u.glasses&&(B=B/100*g.integer(10,50)+B),"leye"==e){var j=xe+n/2-B/2,z=de+n/2-B/2,D=B/2/1.5,E=0-D+h.integer(0,2*D),H=0-D+c.integer(0,2*D);"square"==u.pupils?y(j+E,z+H,B,B,R,!1,W):A(j+E,z+H,B,2,R,!1,W)}if("reye"==e){var J=can.width/2-(n+xe);"head"==e&&u.glasses&&(q=0,k=0),"square"==u.eyes?(y(J,de+q,n+k,n+k,t,C,W),ctx.globalAlpha=.35,y(J+10,de+q+10,n+k-20,n+k-20,C,!1),ctx.globalAlpha=b,u.geyes&&(ctx.globalAlpha=.66,y(J,de+q,n+k,n+k,x[1],C,W),ctx.globalAlpha=b)):(A(J,de+q,n+k,2,t,C,W),u.geyes&&(ctx.globalAlpha=.66,A(J,de+q,n+k,2,x[1],C,W),ctx.globalAlpha=b)),m(J,de+q,n+k),j=J+(n+k)/2-B/2,z=de+q+(n+k)/2-B/2;var K=0-D+g.integer(0,2*D),N=0-D+o.integer(0,2*D);s.integer(66,67)>66&&(K=E,N=H),"square"==u.pupils?y(j+K,z+N,B,B,R,!1,W):A(j+K,z+N,B,2,R,!1,W)}console.log("nosex",T);var O=can.height/2/2+xe,Q=-10+r.integer(0,20),U=T+w,V=O+Q;if(console.log("mouth_location",V),"mouth"==e){ctx.globalAlpha=p;var Y=-10+o.integer(0,20),Z=n/2+Y,$=2*n+Q;"round"==u.mouth&&($=n+Q);var ee=(can.width/2-$)/2,te=x[1];if(u.gmouth){g.integer(1,4);var ae=x[c.integer(0,x.length-1)];te=_(0,0,can.width,can.height,P,x[1],ae)}if("square"==u.mouth)if(u.teeth){var ie=ee+Y,le=O+Q;y(ie-10,le-10,$+20,Z+20,te,G,F),y(ie,le,$,Z,te,G,F);var ne=r.integer(2,6),re=$/ne,oe=!1,ge=!1;if(r.integer(0,1)&&s.integer(0,1)&&(oe=!0),(o.integer(0,1)||h.integer(0,1))&&(ge=!0),oe||ge)for(i=0;i<ne;i++)i%2==0?ge?(ctx.moveTo(ie+i*re,le),ctx.lineTo(ie+(i+1)*re,le+Z)):(ctx.moveTo(ie+i*re,le+Z),ctx.lineTo(ie+(i+1)*re,le)):oe?(ctx.moveTo(ie+i*re,le+Z),ctx.lineTo(ie+(i+1)*re,le)):(ctx.moveTo(ie+i*re,le),ctx.lineTo(ie+(i+1)*re,le+Z)),ctx.lineWidth=F,ctx.strokeStyle=G,ctx.stroke();else for(i=0;i<ne;i++)ctx.globalAlpha=.5,y(ee+Y+re*i,O+Q,re,Z/2,d,G,F),ctx.globalAlpha=.75,y(ee+Y+re*i,O+Q+Z/2,re,Z/2,d,G,F);ctx.globalAlpha=p}else ctx.globalAlpha=.5,y(ee+Y-10,O+Q-10,$+20,Z+20,te,G,F),ctx.globalAlpha=p,y(ee+Y,O+Q,$,Z,te,G,F);else{var ce=["full","happy","sad"],he=ce[h.integer(0,ce.length-1)];if("full"==he){var se=$-$/4,xe=ee+Y,de=O+Q-$/4;console.log("check for lower mouth"),console.log("ly",de),console.log("w",se),u.teeth?(A(ee+Y-10,O+Q-$/4-10,$-$/4+20,2,te,G,F),A(ee+Y,O+Q-$/4,$-$/4,2,te,G,F),ctx.moveTo(xe+se/2,de),ctx.lineTo(xe+se/2,de+se),ctx.stroke(),ctx.moveTo(xe,de+se/2),ctx.lineTo(xe+se,de+se/2),ctx.lineWidth=F,ctx.strokeStyle=x[3],ctx.stroke()):A(ee+Y,O+Q-$/4,$-$/4,2,te,G,F),ctx.strokeStyle=G,ctx.lineWidth=F}else"happy"==he?A(ee+Y-$/2,O+Q-$/2-($/2+w),2*$,1,te,G,F):"sad"==he&&A(ee+Y-$/2,O+Q+$/2-($/2+w),2*$,1,te,G,F,!0);if(("happy"==he||"sad"==he)&&u.teeth){var ue=O+Q-$/2-($/2+w)+$;"sad"==he&&(ue+=$/2),ctx.globalAlpha=parseFloat("0."+h.integer(22,77)),y(ee+Y-$/2+$-$/8-$/6,ue,$/4,$/2,d,!1,!1),y(ee+Y-$/2+$-$/8+$/6,ue,$/4,$/2,d,!1,!1),h.integer(22,77)>55&&(y(ee+Y-$/2+$-$/8-$/2,ue,$/4,$/2,d,!1,!1),y(ee+Y-$/2+$-$/8+$/2,ue,$/4,$/2,d,!1,!1)),ctx.globalAlpha=p}V=O+Q-$/2}}if("nose"==e){var pe=V-U;if(console.log("space",pe),pe>30){ctx.globalAlpha=f;var ve=x[4],fe=n/o.integer(2,5),be=can.width/2/2-fe/2;if(u.gnose){var ye=c.integer(1,4),Ae=x[h.integer(0,x.length-1)];ve=_(be,U-w/2,fe,fe,ye,x[4],Ae)}if("square"==u.nose)y(be-fe/3,U-w/2,fe/3,fe/1.5,ve,I,X),y(be+fe/3,U-w/2,fe/3,fe/1.5,ve,I,X);else{A(be,U-w/2,fe,2,ve,I,X);var _e=fe/o.integer(3,10),me=can.width/2/2-_e/2,we=U-w/2+fe/2,Se=-5+g.integer(0,10);ctx.globalAlpha=1,A(me-_e,we+Se,_e,2,d),A(me+_e,we+Se,_e,2,d),ctx.globalAlpha=f}}}}()};build_avatar(head_nft,leye_nft,reye_nft,mouth_nft,nose_nft);';
    
    string internal png = "var w=document.querySelector('#pandora-wrapper-'+nft);img=new Image,img.onload=function(){var t=document.querySelector('#pandora-square-'+nft);w.removeChild(t)},img.src=can.toDataURL(),w.appendChild(img);";
    
    address public artistsAddress;
    address public owner;
    
    mapping(uint256 => uint256) internal _heads;
    mapping(uint256 => uint256) internal _leyes;
    mapping(uint256 => uint256) internal _reyes;
    mapping(uint256 => uint256) internal _mouths;
    mapping(uint256 => uint256) internal _noses;
    
    mapping(uint256 => bool) internal _mutants;
    
    constructor
    (
        address artistAddress
    ) 
    {
        owner = tx.origin;
        artists = NonFungibleArtists(artistAddress);
        artistsAddress = artistAddress;
    }
    
    /*
    
    PUBLIC
    
    */
    
    function swapParts(uint256 blockatarA, uint256 blockatarB, string memory part) public 
    {
        require(artist.ownerOf(blockatarA) == msg.sender);
        require(artist.ownerOf(blockatarB) == msg.sender);
    }
    
    /*
    
    EXTERNA:
    
    */
    
    function getOwner() external view returns(address)
    {
        return owner;
    }
    
    function generateAvatar(uint256 nft_id) external view returns(bytes memory)
    {   
        require(artist.ownerOf(nft_id) != address(0));
        require(msg.sender == artistsAddress);
        
        return abi.encodePacked(
            xor, 
            util, 
            setup,
            _set(nft_id),
            blockatar,
            png
        );
    }
    
    /*
    
    INTERNAL
    
    */
    
    function _set(uint256 nft_id) internal pure returns(string memory)
    {
        return string(abi.encodePacked(
            'var n1 = "', 
            _get_head(nft_id), 
            '"; var head_nft = n1.substring(0, 16);',
            'var n2 = "', 
            _get_leye(nft_id), 
            '"; var leye_nft = n2.substring(0, 16);',
            'var n3 = "', 
            _get_reye(nft_id), 
            '"; var reye_nft = n3.substring(0, 16);',
            'var n4 = "', 
            _get_mouth(nft_id), 
            '"; var mouth_nft = n4.substring(0, 16);',
            'var n5 = "', 
            _get_nose(nft_id), 
            '"; var nose_nft = n5.substring(0, 16);'
        ));
    }
    
    function _get_head(uint256 nft_id) internal pure returns(string memory)
    {
        if(_heads[nft_id] > 0 && _heads[nft_id] != nft_id) return _heads[nft_id];
        else return nft_id;
    }
    
    function _get_leye(uint256 nft_id) internal pure returns(string memory)
    {
        
    }
    
    function _get_reye(uint256 nft_id) internal pure returns(string memory)
    {
        
    }
    
    function _get_mouth(uint256 nft_id) internal pure returns(string memory)
    {
        
    }
    
    function _get_nose(uint256 nft_id) internal pure returns(string memory)
    {
        
    }
}