import each from 'lodash.foreach';
import isObject from 'lodash.isobject';
import assign from 'lodash.assign';
import isFunction from 'lodash.isfunction';
import isArray from 'lodash.isarray';
import flatten from 'lodash.flatten';

function sparallel(...args) {
	class Sparallel {
		constructor(...argv) {
			this.total = argv.length;
			this.counter = 0;
			this.functions = argv;
			this.doneObj = {};
		}
		functionDone(obj) {
			this.counter++;

			if (isObject(obj))
				this.doneObj = assign(this.doneObj, obj);

			if (this.counter === this.total) {
				if (typeof setImmediate === 'function') {
					setImmediate(() => this.thenCb(this.doneObj));
				}
				else {
					setTimeout(() => this.thenCb(this.doneObj), 0);
				}
			}

			return obj;
		}
		run() {
			each(this.functions, func => {
				func(
					(() => {
						let doneCalledAlready = false;

						const done = obj => {
							if (doneCalledAlready) return;
							doneCalledAlready = true;
							return this.functionDone(obj);
						}

						// this is what's passed to each function
						return obj => done(obj);
					})()
				)
			});
		}
		then(cb) {
			if (!isFunction(cb))
				return console.error('Error: passed non-function to "then"');
			this.thenCb = cb;
			this.run();
		}
	}

	const s = new Sparallel(...flatten(args));
	return {then: cb => s.then(cb)};
}

module.exports = sparallel;
