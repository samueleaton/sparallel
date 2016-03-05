# Sparallel

Super parallel function runner.

Simply pass functions to `sparallel` and call the `done` callback when each finishes. Attach the `then` method for a callback that will run after all other functions have called the `done` callback.

Example

``` javascript
import sparallel from './sparallel';

sparallel(
    done => {
        console.log('code 1');
        done();
    },
    done => {
        console.log('code 2');
        done();
    },
    done => {
        console.log('code 3');
        done();
    }
).then(() => {
    console.log('all done.');
});
```

The best part of sparallel is that you can pass an object to each `done` callback and all of the objects will be merged into a single object and passed to the `then` callback.

Example

``` javascript
sparallel(
    done => {
        setTimeout(function() {
            done({name: 'sam'});
        }, 1000);
    },
    done => {
        setTimeout(function() {
            done({color: 'blue'});
        }, 1100);
    },
    done => {
        setTimeout(function() {
            done({fat: 'probably not'});
        }, 5);
    }
).then(resObj => {
    console.log(resObj); // {name: 'sam', color: 'blue', fat: 'probably not'}
});
```