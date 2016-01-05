<img src="http://i.imgur.com/PZ7OZCP.png" align="right">



Provides a simple interface to check the performance of sevral js subroutines. Work in progress





##### Example usage:

```
  speedtest({

        iterations: 50,

        forLoopBigData: function() {

            var arr = [];

            for (var i = 1; i < 2141245; ++i) {
                arr.push(i + 14141 - 2222 * 2);
            }

            arr = undefined;
        },

        whileLoopBigData: function() {
            var i = 0;
            var arr = [];
            while (i < 2141245) {
                arr.push(i + 141414 - 2222 * 2);
                ++i;

            }
            arr = undefined;
        }
    });
    ```
