'use strict';

var _sparallel = require('./sparallel');

var _sparallel2 = _interopRequireDefault(_sparallel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sparallel2.default)(function (done) {
	setTimeout(function () {
		console.log('S1: check 1b');
		done({ cat: 'meow' });
	}, 1050);
}, function (done) {
	setTimeout(function () {
		console.log('S1: check 2');
		done({ dog: 'doggy', cool: true });
	}, 1100);
}, function (done) {
	setTimeout(function () {
		console.log('S1: check 3');
		done({ mouse: 'mouserz', rat: 11, cat: 1111111111 });
	}, 5);
}).then(function (res) {
	console.log('s1 done: ', res);
});

// sparallel([
// 	done => {
// 		setTimeout(function() {
// 			console.log('S2: check 1');
// 			done({s2Check1: 's2 1'});
// 		}, 0);
// 	},
// 	done => {
// 		setTimeout(function() {
// 			console.log('S2: check 2');
// 			done({s2Check2: 's2 22'});
// 		}, 500);
// 	},
// 	done => {
// 		setTimeout(function() {
// 			console.log('S2: check 3');
// 			done({s2Check3: 's2 333'});
// 		}, 400);
// 	}
// ]).then(res => {
// 	console.log('s2 done: ', res);
// });