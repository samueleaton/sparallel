import each from 'lodash.foreach';
import isObject from 'lodash.isobject';
import assign from 'lodash.assign';
import isFunction from 'lodash.isfunction';

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

			if (this.counter === this.total)
				this.thenCb(this.doneObj);
		}
		run() {
			each(this.functions, func => {
				func(
					(() => {
						let doneCalledAlready = false;

						const done = obj => {
							if (doneCalledAlready) return;
							doneCalledAlready = true;
							this.functionDone(obj);
						}

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
	const s = new Sparallel(...args);
	return s;
}

module.exports = sparallel;
