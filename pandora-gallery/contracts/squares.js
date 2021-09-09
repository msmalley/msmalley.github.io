// SPDX-License-Identifier: MIT

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

/*

PANDORA

*/

contract NonFungibleArtists 
{
    using SafeMath for uint;
    using Address for address;
    using Strings for uint256;
    
    string internal xor = "function XS(t,i,n,e){this.x=t?t>>>0:123456789,this.y=i?i>>>0:362436069,this.z=n?n>>>0:521288629,this.w=e?e>>>0:88675123}XS.prototype.next=function(){var t=this.x^this.x<<11&2147483647;return this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>19^t^t>>8,this.w},XS.prototype.unit=function(){return this.next()/2147483648},XS.prototype.unitInclusive=function(){return this.next()/2147483647},XS.prototype.integer=function(t,i){return this.integerExclusive(t,i+1)},XS.prototype.integerExclusive=function(t,i){return t=Math.floor(t),i=Math.floor(i),Math.floor(this.unit()*(i-t))+t},XS.prototype.real=function(t,i){return this.unit()*(i-t)+t},XS.prototype.realInclusive=function(t,i){return this.unitInclusive()*(i-t)+t},XS.prototype.reseed=function(t,i,n,e){this.x=t?t>>>0:123456789,this.y=i?i>>>0:362436069,this.z=n?n>>>0:521288629,this.w=e?e>>>0:88675123};";
    
    string internal util = "var s2s=function(e){var n='';for(x=0;x<e.length;x++){n+=e.charAt(x).charCodeAt(0)}return parseInt(n)},gc=function(e){var n=['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'],t=new XS(parseInt(s2s('R')*e)),r=new XS(parseInt(s2s('G')*e)),s=new XS(parseInt(s2s('B')*e)),g=new XS(parseInt(s2s('C')*e)),a=new XS(parseInt(s2s('M')*e)),h=new XS(parseInt(s2s('Y')*e)),i=n[t.integer(0,n.length-1)];return i+=n[r.integer(0,n.length-1)],i+=n[s.integer(0,n.length-1)],i+=n[g.integer(0,n.length-1)],i+=n[a.integer(0,n.length-1)],'#'+(i+=n[h.integer(0,n.length-1)])};";
    
    string internal config = "var s1=parseInt(nft*s2s('R')),s2=parseInt(nft*s2s('G')),s3=parseInt(nft*s2s('B')),r1=new XS(s1),r2=new XS(s2),r3=new XS(s3),r4=new XS(s1+s2),r5=new XS(s2+s3),r6=new XS(s1+s3),colors=[gc(s1),gc(s2),gc(s3),gc(s1+s2),gc(s2+s3)],white=colors[0];";
    
    string internal setup = "var div=document.createElement('DIV'),can=document.createElement('CANVAS'),ctx=can.getContext('2d');can.id='pandora-square-'+nft,div.id='pandora-wrapper-'+nft,div.classList.add('pandora-square'),document.body.appendChild(div);var wrapper=document.querySelector('#pandora-wrapper-'+nft);wrapper.appendChild(can);var size=300,dpr=window.devicePixelRatio;can.width=size*dpr,can.height=size*dpr,ctx.scale(dpr,dpr);";
    
    string internal style1 = "var square1=function(){var e,t=r1.integer(0,5),r=r2.integer(0,5),i=r3.integer(1,10)+r5.integer(1,10),n=r4.integer(0,5)+r6.integer(0,5),a=r,c=(size-2*a)/i,l=c,o=[-1,0,1];function g(t,r,i,a,c,o,h){ctx.beginPath(),ctx.rect(t,r,i,a),ctx.fillStyle=white;var s=new XS(parseInt(t+r+h));if(ctx.strokeStyle=colors[r6.integer(0,colors.length-1)],ctx.fillStyle=colors[s.integer(0,colors.length-1)],ctx.stroke(),ctx.fill(),h>=0){var x=l*(h/e)+n,d=t+(i-x)/2,f=r+(a-x)/2;g(d-=(t-d)/(h+2)*c,f-=(r-f)/(h+2)*o,x,x,c,o,h-1)}}ctx.lineWidth=t;var h=r5.integer(1,4),s=ctx.createLinearGradient(0,0,0,can.height);2==h&&(s=ctx.createLinearGradient(0,0,can.width,can.height)),3==h&&(s=ctx.createLinearGradient(0,can.height,can.width,0)),4==h&&(s=ctx.createRadialGradient(150,150,0,150,150,300));var x=colors[r2.integer(0,colors.length-1)],d=colors[r4.integer(0,colors.length-1)];s.addColorStop(0,x),s.addColorStop(1,d),ctx.fillStyle=s,ctx.rect(0,0,can.width,can.height),ctx.fill();var f=parseFloat('0.'+r5.integer(11,44));ctx.globalAlpha=f;for(var v=a;v<size-a;v+=c)for(var S=a;S<size-a;S+=c){e=2+Math.ceil(r1.integer(0,3));var p=o[Math.floor(r2.integer(0,o.length-1))],w=o[Math.floor(r3.integer(0,o.length-1))];g(v,S,l,l,p,w,e-1)}};";
    
    string internal style2 = "var square2=function(){ctx.lineWidth=2*r1.integer(2,4);var t=size/r2.integer(8,20)*2,e=[{x:0,y:0,width:size,height:size}],i=r5.integer(1,4),r=ctx.createLinearGradient(0,0,0,can.height);2==i&&(r=ctx.createLinearGradient(0,0,can.width,can.height)),3==i&&(r=ctx.createLinearGradient(0,can.height,can.width,0)),4==i&&(r=ctx.createRadialGradient(150,150,0,150,150,300));var h=colors[r2.integer(0,colors.length-1)],c=colors[r4.integer(0,colors.length-1)];r.addColorStop(0,h),r.addColorStop(1,c),ctx.fillStyle=r,ctx.rect(0,0,can.width,can.height),ctx.fill();var n=parseFloat('0.'+r5.integer(33,66));function a(t){const{x:i,y:r}=t;for(var h=e.length-1;h>=0;h--){const t=e[h];i&&i>t.x&&i<t.x+t.width&&r1.integer(0,1)>0&&(e.splice(h,1),o(t,i)),r&&r>t.y&&r<t.y+t.height&&r2.integer(0,1)>0&&(e.splice(h,1),l(t,r))}}function o(t,i){var r={x:t.x,y:t.y,width:t.width-(t.width-i+t.x),height:t.height},h={x:i,y:t.y,width:t.width-i+t.x,height:t.height};e.push(r),e.push(h)}function l(t,i){var r={x:t.x,y:t.y,width:t.width,height:t.height-(t.height-i+t.y)},h={x:t.x,y:i,width:t.width,height:t.height-i+t.y};e.push(r),e.push(h)}ctx.globalAlpha=n;for(var g=0;g<size;g+=t)a({y:g}),a({x:g});!function(){for(var t=0;t<colors.length;t++){var i=new XS(parseInt(t));e[i.integer(0,e.length-1)].color=colors[i.integer(1,colors.length-1)]}for(t=0;t<e.length;t++){if(ctx.beginPath(),ctx.rect(e[t].x,e[t].y,e[t].width,e[t].height),e[t].color)ctx.fillStyle=e[t].color;else{var r=r6.integer(1,4),h=ctx.createLinearGradient(0,0,0,can.height);2==r&&(h=ctx.createLinearGradient(0,0,can.width,can.height)),3==r&&(h=ctx.createLinearGradient(0,can.height,can.width,0)),4==r&&(h=ctx.createRadialGradient(150,150,0,150,150,300));var c=white,n=colors[r4.integer(0,colors.length-1)];h.addColorStop(0,c),h.addColorStop(1,n),ctx.fillStyle=h}ctx.fill(),ctx.stroke()}}()};";
    
    string internal choice = "var style=r1.integer(1,2);1==style?square1():square2();";
    
    string internal png = "var w=document.querySelector('#pandora-wrapper-'+nft);img=new Image,img.onload=function(){var t=document.querySelector('#pandora-square-'+nft);w.removeChild(t)},img.src=can.toDataURL(),w.appendChild(img);";
    
    constructor
    (
        
    ) 
    {
        
    }
    
    /*
    
    PUBLIC
    
    */
    
    function getStyle(uint256 artist) public view returns(string memory)
    {
        
    }
    
    function generateArt(string memory name) public view returns(string memory)
    {
        uint256 nft_id;
        
        return string(
            abi.encodePacked(
                xor, 
                util, 
                _set(nft_id),
                config,
                setup,
                style1,
                style2,
                choice,
                png
            )
        );
    }
    
    /*
    
    INTERNAL
    
    */
    
    function _set(uint256 nft_id) internal pure returns(string memory)
    {
        return string(abi.encodePacked('var nft = parseInt(parseInt("', nft_id.toString(), '") / 100000000);'));
    }
}