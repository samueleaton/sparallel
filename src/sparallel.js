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
					setImmediate(() => this.runCb(this.doneObj));
				}
				else {
					setTimeout(() => this.runCb(this.doneObj), 0);
				}
			}

			return obj;
		}
		run(runCb, runCatch) {
			this.runCb = runCb;
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
					})(),
					runCatch
				)
			});
		}
	}

	return new Promise((resolve, reject) => {
		setImmediate(() => new Sparallel(...flatten(args)).run(resolve, reject));
	});
}

module.exports = sparallel;
