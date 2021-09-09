var these_checker_options = {};
var initialize_checkers = false;

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
    
initialize_checkers = function(canvas, context, seed, white, colors, rand1, rand2, dpr)
{
  
var this_x; var this_y;
    
var base_x = rand1.integer(0, (canvas.width * 2));
this_x = JSON.parse(JSON.stringify(base_x));
if(base_x > canvas.width)
{
    this_x = (0 + canvas.width) - base_x;
}
    
var base_y = rand2.integer(0, (canvas.width * 2));
this_y = JSON.parse(JSON.stringify(base_y));
if(base_y > canvas.height)
{
    this_y = (0 + canvas.height) - base_y;
}
    
these_checker_options = {
    size: rand1.integer(5, 50),
    x: this_x,
    y: this_y
}
    
var _controller = __webpack_require__(1);

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Currently assuming square proportions.
var SIZE = 300;

var scale = 1;
var lastTime = void 0;
var controller = void 0;
var mousePosition = { x: 0, y: 0 };

function init() {
    
    /*
	lastTime = Date.now();
    */
    
	controller = new _controller2.default();
    
	handleResize();

	window.requestAnimationFrame(everyFrame);
}
    
init();
    
function oneTime()
{

}

// TODO: Make tweak this to allow frame skipping for slow computers. Maybe.
function everyFrame() {
	update();
	render();
	//requestAnimationFrame(everyFrame);
	requestAnimationFrame(oneTime);
}

function update() {
	var curTime = Date.now();
	var dt = (curTime - lastTime) / 1000;
	controller.update(dt, mousePosition);
	lastTime = curTime;
}

function render() {
	// Clear the previous frame
	context.resetTransform();
    
    context.clearRect(0, 0, canvas.width, canvas.height);

	// Set origin to middle and scale canvas
	context.translate(canvas.width / 2, canvas.height / 2);
	context.scale(scale, scale);

	controller.render(context, rand1, rand2, white, colors);
}

function handleResize(evt) {
	//var pixelRatio = window.devicePixelRatio || 1;
    /*
	var pixelRatio = dpr;
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;
	canvas.style.width = width + 'px';
	//canvas.style.height = height + 'px';
	canvas.style.height = width + 'px';

	// Math.max -> no borders (will cut off edges of the thing)
	// Math.min -> show all (with borders)
	// There are other options too :)
    */
	scale = Math.max(canvas.width, canvas.height) / (SIZE / rand1.integer(1, 3));

	render();
}

function updateMousePosition(evt) {
	mousePosition = screenPointToNormalisedPoint({
		x: evt.clientX,
		y: evt.clientY
	});
}

function updateTouchPosition(evt) {
	if (evt.touches.length > 0) {
		mousePosition = screenPointToNormalisedPoint({
			x: evt.touches[0].clientX,
			y: evt.touches[0].clientY
		});
	}
}

// scale/translate
function screenPointToNormalisedPoint(point) {
	var pixelRatio = window.devicePixelRatio || 1;
	return {
		x: (pixelRatio * point.x - canvas.width / 2) / scale,
		y: (pixelRatio * point.y - canvas.height / 2) / scale
	};
}

init();
    
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _constants = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
	function Controller() {
		_classCallCheck(this, Controller);

		//this.squareSize = 20;
		this.squareSize = these_checker_options.size;
		this.animAmt = 0;
		this.period = 0;
		//this.center = { x: 0, y: 0 };
		this.center = { x: these_checker_options.x, y: these_checker_options.y };
	}

	_createClass(Controller, [{
		key: "update",
		value: function update(dt, mousePosition) {
			this.animAmt += dt / this.period;
			this.animAmt %= 1;
			var states = 4;
			var state = Math.floor(states * this.animAmt);
			var stateAnim = states * this.animAmt % 1;
			stateAnim = (0, _util.easeInOut)(stateAnim, 4);
			var distance = states * this.squareSize;
			switch (state) {
				case 0:
					this.center = {
						x: (0, _util.slurp)(-distance, distance, stateAnim),
						y: -distance
					};
					break;
				case 1:
					this.center = {
						x: distance,
						y: (0, _util.slurp)(-distance, distance, stateAnim)
					};
					break;
				case 2:
					this.center = {
						x: (0, _util.slurp)(distance, -distance, stateAnim),
						y: distance
					};
					break;
				case 3:
					this.center = {
						x: -distance,
						y: (0, _util.slurp)(distance, -distance, stateAnim)
					};
					break;
			}
		}

		/**
   * @param {CanvasRenderingContext2D} context 
   */

	}, {
		key: "render",
		value: function render(context, rand1, rand2, white, colors) {
			context.beginPath();
			//context.fillStyle = 'black';
			context.fillStyle = white;
			//var numSquares = 32;
			var numSquares = rand1.integer(8, 64);
			var size = this.squareSize * numSquares;
			for (var iy = 0; iy < numSquares; iy++) {
				var minY = (0, _util.slurp)(-size, size, iy / numSquares);
				var maxY = (0, _util.slurp)(-size, size, (iy + 1) / numSquares);
                
                
				for (var ix = 0; ix < numSquares; ix++) {
					var minX = (0, _util.slurp)(-size, size, ix / numSquares);
					var maxX = (0, _util.slurp)(-size, size, (ix + 1) / numSquares);

					if ((ix + iy) % 2 == 0) {
						continue;
					}
                    
					this.adjustedPath(context, [{ x: minX, y: minY }, { x: maxX, y: minY }, { x: maxX, y: maxY }, { x: minX, y: maxY }]);
				}
			}
			context.fill();
		}
	}, {
		key: "adjustedPath",
		value: function adjustedPath(context, points) {
			var numPoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

			this.adjustedMoveTo(context, points[0].x, points[0].y);
			for (var i = 0; i < points.length; i++) {
				var nextI = (i + 1) % points.length;
				this.adjustedLine(context, points[i], points[nextI], numPoints);
			}
		}
	}, {
		key: "adjustedLine",
		value: function adjustedLine(context, start, end) {
			var numPoints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

			for (var i = 1; i <= numPoints; i++) {
				var amt = i / numPoints;
				var x = (0, _util.slurp)(start.x, end.x, amt);
				var y = (0, _util.slurp)(start.y, end.y, amt);
				this.adjustedLineTo(context, x, y);
			}
		}
	}, {
		key: "adjustedMoveTo",
		value: function adjustedMoveTo(context, x, y) {
			var adjusted = this.adjustPoint({ x: x, y: y });
			context.moveTo(adjusted.x, adjusted.y);
		}
	}, {
		key: "adjustedLineTo",
		value: function adjustedLineTo(context, x, y) {
			var adjusted = this.adjustPoint({ x: x, y: y });
			context.lineTo(adjusted.x, adjusted.y);
		}
	}, {
		key: "adjustPoint",
		value: function adjustPoint(point) {
			point.x -= this.center.x;
			point.y -= this.center.y;
			var r = Math.sqrt(point.x * point.x + point.y * point.y);
			var theta = Math.atan2(point.y, point.x);

			var normalisingFactor = 1;
			if (Math.abs(point.x) > Math.abs(point.y)) {
				normalisingFactor = Math.abs(Math.cos(theta));
			} else {
				normalisingFactor = Math.abs(Math.sin(theta));
			}

			r *= normalisingFactor;
			var rAmt = r / this.size;

			return {
				x: r * Math.cos(theta) + this.center.x,
				y: r * Math.sin(theta) + this.center.y
			};
		}
	}]);

	return Controller;
}();

exports.default = Controller;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.easeInOut = easeInOut;
exports.sinEaseInOut = sinEaseInOut;
exports.slurp = slurp;
exports.experp = experp;
exports.clampedSlurp = clampedSlurp;
exports.clamp = clamp;
function easeInOut(t) {
    var amt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var tPow = Math.pow(t, amt);
    return tPow / (tPow + Math.pow(1 - t, amt));
}

function sinEaseInOut(t) {
    return 0.5 - 0.5 * Math.cos(Math.PI * t);
}

function slurp(val1, val2, amt) {
    return (val2 - val1) * amt + val1;
}

function experp(val1, val2, amt) {
    return Math.exp(slurp(Math.log(val1), Math.log(val2), amt));
}

function clampedSlurp(val1, val2, amt) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return slurp(val1, val2, amt);
}

function clamp(amt, val1, val2) {
    if (amt < 0) {
        return val1;
    }
    if (amt > 1) {
        return val2;
    }
    return amt;
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"O_RDONLY":0,"O_WRONLY":1,"O_RDWR":2,"S_IFMT":61440,"S_IFREG":32768,"S_IFDIR":16384,"S_IFCHR":8192,"S_IFBLK":24576,"S_IFIFO":4096,"S_IFLNK":40960,"S_IFSOCK":49152,"O_CREAT":512,"O_EXCL":2048,"O_NOCTTY":131072,"O_TRUNC":1024,"O_APPEND":8,"O_DIRECTORY":1048576,"O_NOFOLLOW":256,"O_SYNC":128,"O_SYMLINK":2097152,"O_NONBLOCK":4,"S_IRWXU":448,"S_IRUSR":256,"S_IWUSR":128,"S_IXUSR":64,"S_IRWXG":56,"S_IRGRP":32,"S_IWGRP":16,"S_IXGRP":8,"S_IRWXO":7,"S_IROTH":4,"S_IWOTH":2,"S_IXOTH":1,"E2BIG":7,"EACCES":13,"EADDRINUSE":48,"EADDRNOTAVAIL":49,"EAFNOSUPPORT":47,"EAGAIN":35,"EALREADY":37,"EBADF":9,"EBADMSG":94,"EBUSY":16,"ECANCELED":89,"ECHILD":10,"ECONNABORTED":53,"ECONNREFUSED":61,"ECONNRESET":54,"EDEADLK":11,"EDESTADDRREQ":39,"EDOM":33,"EDQUOT":69,"EEXIST":17,"EFAULT":14,"EFBIG":27,"EHOSTUNREACH":65,"EIDRM":90,"EILSEQ":92,"EINPROGRESS":36,"EINTR":4,"EINVAL":22,"EIO":5,"EISCONN":56,"EISDIR":21,"ELOOP":62,"EMFILE":24,"EMLINK":31,"EMSGSIZE":40,"EMULTIHOP":95,"ENAMETOOLONG":63,"ENETDOWN":50,"ENETRESET":52,"ENETUNREACH":51,"ENFILE":23,"ENOBUFS":55,"ENODATA":96,"ENODEV":19,"ENOENT":2,"ENOEXEC":8,"ENOLCK":77,"ENOLINK":97,"ENOMEM":12,"ENOMSG":91,"ENOPROTOOPT":42,"ENOSPC":28,"ENOSR":98,"ENOSTR":99,"ENOSYS":78,"ENOTCONN":57,"ENOTDIR":20,"ENOTEMPTY":66,"ENOTSOCK":38,"ENOTSUP":45,"ENOTTY":25,"ENXIO":6,"EOPNOTSUPP":102,"EOVERFLOW":84,"EPERM":1,"EPIPE":32,"EPROTO":100,"EPROTONOSUPPORT":43,"EPROTOTYPE":41,"ERANGE":34,"EROFS":30,"ESPIPE":29,"ESRCH":3,"ESTALE":70,"ETIME":101,"ETIMEDOUT":60,"ETXTBSY":26,"EWOULDBLOCK":35,"EXDEV":18,"SIGHUP":1,"SIGINT":2,"SIGQUIT":3,"SIGILL":4,"SIGTRAP":5,"SIGABRT":6,"SIGIOT":6,"SIGBUS":10,"SIGFPE":8,"SIGKILL":9,"SIGUSR1":30,"SIGSEGV":11,"SIGUSR2":31,"SIGPIPE":13,"SIGALRM":14,"SIGTERM":15,"SIGCHLD":20,"SIGCONT":19,"SIGSTOP":17,"SIGTSTP":18,"SIGTTIN":21,"SIGTTOU":22,"SIGURG":16,"SIGXCPU":24,"SIGXFSZ":25,"SIGVTALRM":26,"SIGPROF":27,"SIGWINCH":28,"SIGIO":23,"SIGSYS":12,"SSL_OP_ALL":2147486719,"SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION":262144,"SSL_OP_CIPHER_SERVER_PREFERENCE":4194304,"SSL_OP_CISCO_ANYCONNECT":32768,"SSL_OP_COOKIE_EXCHANGE":8192,"SSL_OP_CRYPTOPRO_TLSEXT_BUG":2147483648,"SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS":2048,"SSL_OP_EPHEMERAL_RSA":0,"SSL_OP_LEGACY_SERVER_CONNECT":4,"SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER":32,"SSL_OP_MICROSOFT_SESS_ID_BUG":1,"SSL_OP_MSIE_SSLV2_RSA_PADDING":0,"SSL_OP_NETSCAPE_CA_DN_BUG":536870912,"SSL_OP_NETSCAPE_CHALLENGE_BUG":2,"SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG":1073741824,"SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG":8,"SSL_OP_NO_COMPRESSION":131072,"SSL_OP_NO_QUERY_MTU":4096,"SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION":65536,"SSL_OP_NO_SSLv2":16777216,"SSL_OP_NO_SSLv3":33554432,"SSL_OP_NO_TICKET":16384,"SSL_OP_NO_TLSv1":67108864,"SSL_OP_NO_TLSv1_1":268435456,"SSL_OP_NO_TLSv1_2":134217728,"SSL_OP_PKCS1_CHECK_1":0,"SSL_OP_PKCS1_CHECK_2":0,"SSL_OP_SINGLE_DH_USE":1048576,"SSL_OP_SINGLE_ECDH_USE":524288,"SSL_OP_SSLEAY_080_CLIENT_DH_BUG":128,"SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG":0,"SSL_OP_TLS_BLOCK_PADDING_BUG":512,"SSL_OP_TLS_D5_BUG":256,"SSL_OP_TLS_ROLLBACK_BUG":8388608,"ENGINE_METHOD_DSA":2,"ENGINE_METHOD_DH":4,"ENGINE_METHOD_RAND":8,"ENGINE_METHOD_ECDH":16,"ENGINE_METHOD_ECDSA":32,"ENGINE_METHOD_CIPHERS":64,"ENGINE_METHOD_DIGESTS":128,"ENGINE_METHOD_STORE":256,"ENGINE_METHOD_PKEY_METHS":512,"ENGINE_METHOD_PKEY_ASN1_METHS":1024,"ENGINE_METHOD_ALL":65535,"ENGINE_METHOD_NONE":0,"DH_CHECK_P_NOT_SAFE_PRIME":2,"DH_CHECK_P_NOT_PRIME":1,"DH_UNABLE_TO_CHECK_GENERATOR":4,"DH_NOT_SUITABLE_GENERATOR":8,"NPN_ENABLED":1,"RSA_PKCS1_PADDING":1,"RSA_SSLV23_PADDING":2,"RSA_NO_PADDING":3,"RSA_PKCS1_OAEP_PADDING":4,"RSA_X931_PADDING":5,"RSA_PKCS1_PSS_PADDING":6,"POINT_CONVERSION_COMPRESSED":2,"POINT_CONVERSION_UNCOMPRESSED":4,"POINT_CONVERSION_HYBRID":6,"F_OK":0,"R_OK":4,"W_OK":2,"X_OK":1,"UV_UDP_REUSEADDR":4}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map