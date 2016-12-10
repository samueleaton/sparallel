function isArray(obj) {
  if (!obj)
    return false;
  return (
    typeof obj === 'object' &&
    (
      (Array.isArray && Array.isArray(obj)) ||
      obj.constructor === Array ||
      obj instanceof Array
    )
  );
}

function forOwn(arg, func) {
  for (const key in arg) {
    if (arg.hasOwnProperty(key)) {
      if (typeof func === 'function')
        func(arg[key], key);
    }
  }
}

function isObject(value) {
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
}

function forEach(list, func) {
  if (!list || !list.length)
    return null;
  if (typeof func !== 'function')
    return console.error('2nd param to forEach must be function');
  for (let i = 0, ii = list.length; i < ii; i++)
    func(list[i], i);
}

function flatten(arr) {
  const result = [];
  forEach(arr, elm => {
    if (isArray(elm))
      forEach(elm, elm2 => result.push(elm2));
    else
      result.push(elm);
  });
  return result;
}

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

			if (isObject(obj)) {
				forOwn(obj, (val, key) => {
					this.doneObj[key] = val;
				});
			}

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
			forEach(this.functions, func => {
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
