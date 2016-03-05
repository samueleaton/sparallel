'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.foreach');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.assign');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.isfunction');

var _lodash8 = _interopRequireDefault(_lodash7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sparallel() {
	var Sparallel = function () {
		function Sparallel() {
			_classCallCheck(this, Sparallel);

			for (var _len2 = arguments.length, argv = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				argv[_key2] = arguments[_key2];
			}

			this.total = argv.length;
			this.counter = 0;
			this.functions = argv;
			this.doneObj = {};
		}

		_createClass(Sparallel, [{
			key: 'functionDone',
			value: function functionDone(obj) {
				this.counter++;

				if ((0, _lodash4.default)(obj)) this.doneObj = (0, _lodash6.default)(this.doneObj, obj);

				if (this.counter === this.total) this.thenCb(this.doneObj);
			}
		}, {
			key: 'run',
			value: function run() {
				var _this = this;

				(0, _lodash2.default)(this.functions, function (func) {
					func(function () {
						var doneCalledAlready = false;

						var done = function done(obj) {
							if (doneCalledAlready) return;
							doneCalledAlready = true;
							_this.functionDone(obj);
						};

						return function (obj) {
							return done(obj);
						};
					}());
				});
			}
		}, {
			key: 'then',
			value: function then(cb) {
				if (!(0, _lodash8.default)(cb)) return console.error('Error: passed non-function to "then"');
				this.thenCb = cb;
				this.run();
			}
		}]);

		return Sparallel;
	}();

	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var s = new (Function.prototype.bind.apply(Sparallel, [null].concat(args)))();
	return s;
}

module.exports = sparallel;