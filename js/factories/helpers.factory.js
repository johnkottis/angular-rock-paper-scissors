/**
 * rps Machine Learning Functions
 *
 */
'use strict';
var rpsHelpers = () => {
    /**
     * Returns an array with the occurances of input array's elements
     *
     * @param  {Object} arrayToCheck                    - array input
     * @param  {Object} arrayOfPossibleResults          - array with possible results
     *
     */
    let selectionAppearances = (arrayToCheck, arrayOfPossibleResults) => {
            let count = [];

            for (let j = 0; j < arrayOfPossibleResults.length; j++) {
                count[j] = 0;
                for (let i = 0; i < arrayToCheck.length; ++i) {
                    if (arrayToCheck[i] === arrayOfPossibleResults[j]) {
                        count[j]++;
                    }
                }
            }
            return count;
        },

        /**
         * Returns the multiple index of the array elements that match a specific value
         * Returns an array
         *
         * @param  {Object} arrayToCheck            - array to check for value
         * @param  {String} valueToCheck            - value we are looking for
         *
         */
        indexesOfValue = (valueToCheck, arrayToCheck) => {
            let indexes = [];

            for (let i = arrayToCheck.length - 1; i >= 0; i--) {
                if (arrayToCheck[i] === valueToCheck) {
                    indexes.unshift(i);
                }
            }
            return indexes;
        };

    return {
        selectionAppearances: selectionAppearances,
        indexesOfValue: indexesOfValue
    };
};

angular
    .module('rpsApp')
    .factory('rpsHelpers', rpsHelpers);
