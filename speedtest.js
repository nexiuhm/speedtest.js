 var speedtest = (function(window) {

     /**
      * Performance.now() polyfill.
      */

     (function() {
         // quick return if not needed
         if ("performance" in window && "now" in window.performance) {
             return;
         }

         if ("performance" in window == false) {
             window.performance = {};
         }

         Date.now = (Date.now || function() { // thanks IE8 :))
             return new Date().getTime();
         });

         if ("now" in window.performance == false) {

             var nowOffset = Date.now();

             if (performance.timing && performance.timing.navigationStart) {
                 nowOffset = performance.timing.navigationStart
             }

             window.performance.now = function now() {
                 return Date.now() - nowOffset;
             }

             console.log("Warning: Browser doesn't support performance.now(), this will lead to less accurate results")
         }

     }());


     function speedtest(config) {
         if (typeof config !== 'object') {
             // error: Excepts plain object
             return;
         }

         // filter input obj
         var testsToExecute = {};
         var iterations = config.iterations || 10;

         for (var key in config) {
             if (config.hasOwnProperty(key) && typeof config[key] === 'function') {
                 testsToExecute[key] = config[key];
             }

         }

         //dbg
         _run(iterations);

         function _run(iterations) {
             var finalResults = [];

             for (var test in testsToExecute) {
                 var i = 0,
                     resultCache = [],
                     timeStampBefore, timeStampAfter;
                 var currentTest = testsToExecute[test];

                 _prettyPrint("Executing test: " + test);

                 // ## TODO ## instead of doing all iterations on one "job" at once, mix it up.
                 // because chances are the processor be more/less busy when you are executing the last job compared to the first one, skewing results.
                 for (; i < iterations; i++) {

                     // Start test job
                     timeStampBefore = performance.now();
                     currentTest.call(undefined); // diable use of 'this' in tests
                     timeStampAfter = performance.now();

                     //console.log("result: " + (timeStampAfter - timeStampBefore));
                     resultCache.push(timeStampAfter - timeStampBefore);

                     // On last iteration
                     if (i + 1 === iterations) {

                         var avg = _findAverage(resultCache);
                         _prettyPrint("Average:" + avg + " MS");

                         break;
                     }
                 }
             }
         }

         /**
          * Calculate average of an array of numbers
          */

         function _findAverage(arr) {

             var sampleSize = arr.length;
             var sum = arr.reduce(function(a, b) { return a + b; });
             return sum / sampleSize;
         }

         function _prettyPrint(string) {
             console.log('%c' + string,
                 'color: #ffffff; background: #450f78;'
             );
         }

     }


     return speedtest;

 })(window);
