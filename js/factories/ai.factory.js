/**
 * CPU move selection functions
 *
 */
'use strict';
var rpsAI = (rpsHelpers) => {
    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     *
     * @param  {Int} min            - Lower limit
     * @param  {Int} max            - Upper Limit
     *
     */
    let getRandomInt = (min, max) => {
            return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
        },

        /**
         * Predicts next move based on the most popular user's selection
         * If two or all three possible selections apparea equaly
         * cpu takes a random decision between these two or three possibilities
         *
         * @param  {Object} pastMoves           - array of User's past moves LIFO order
         * @param  {Object} moves               - array with possible move
         *
         */
        userMostPopular = (pastMoves, moves) => {
            let totals = rpsHelpers.selectionAppearances(pastMoves, moves),
                mostPopular = Math.max(totals[0], totals[1], totals[2]),
                mostPopularIndx = rpsHelpers.indexesOfValue(mostPopular, totals);

            if (mostPopularIndx.length === 1) {
                return totals[mostPopularIndx[0]];
            } else if (mostPopularIndx.length === 3) {
                return totals[getRandomInt(0, 2)];
            } else {
                return totals[mostPopularIndx[getRandomInt(0, 1)]];
            }
        },

        /**
         * Returns most popular value of the elements after n same selections
         *
         * @param  {Int} sequenceOf             - Number of same items in sequence
         * @param  {Object} pastMoves           - array of results
         *
         */
        getNextOfSame = (pastMoves, sequenceOf) => {
            let nextOfsame = [];

            for (let i = 0; i < pastMoves.length - sequenceOf; i++) {
                let seq = 0;

                for (let j = 1; j < sequenceOf; j++) {
                    if (pastMoves[i] === pastMoves[i + j]) {
                        seq++;
                    } else {
                        seq--;
                    }
                    if (seq === sequenceOf - 1) {
                        nextOfsame.push(pastMoves[i + sequenceOf]);
                    }
                }
            }

            userMostPopular(nextOfsame, ['0', '1', '2']);
        },

        /**
         * Changes strategy after opponent's three straight wins
         * Returns functions name
         *
         * @param {Object} wins                 - Array of Winners
         * @param {String} strategy             - Strategy to change
         * @param {Int} opponentId              - Opponent that play against
         *
         */
        switchStrategy = (wins, strategy) => {
            let games = wins.length;

            if (games > 2) {
                if (wins[games - 1] === wins[games - 2] && wins[games - 1] === wins[games - 3] && wins[games - 1] === 1) {
                    let strategyId = getRandomInt(0, 2);

                    if (strategyId === 0) {
                        strategy = 'userMostPopular';
                    } else if (strategyId === 1) {
                        strategy = 'getNextOfSame';
                    } else {
                        strategy = 'getRandomInt';
                    }
                }
            } else {
                strategy = 'getRandomInt';
            }
            return strategy;
        },

        /**
         * Returns possible winning move
         *
         * @param  {Int} userPrediction         - Possible opponent's move
         *
         */
        cpuMove = (userPrediction) => {
            switch (userPrediction) {
            case '0':
                return '1';
            case '1':
                return '2';
            case '2':
                return '0';
            }
        },

        /**
         * Prediction for usr's selection
         *
         * @param  {String} currentStrategy             - Current Strategy
         * @param  {Object} userHistory                 - User's history of selections
         *
         */
        cpuDecision = (currentStrategy, userHistory) => {
            let prediction;

            if (currentStrategy === 'getRandomInt') {
                prediction = getRandomInt(0, 2);
            } else if (currentStrategy === 'userMostPopular') {
                prediction = userMostPopular(userHistory, ['0', '1', '2']);
            } else {
                prediction = getNextOfSame(userHistory, 2);
            }

            return cpuMove(prediction);
        };

    return {
        cpuDecision: cpuDecision,
        switchStrategy: switchStrategy
    };

};

angular
    .module('rpsApp')
    .factory('rpsAI', ['rpsHelpers', rpsAI]);
