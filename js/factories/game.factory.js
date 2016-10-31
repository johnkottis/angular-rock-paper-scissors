    /**
     * CSS snippet generation functions
     */
    'use strict';
    var rpsGame = () => {
        /**
         *   Defines game's winner
         *
         *   @param  {int} userMove                  - user's selection
         *   @param  {int} cpuMove                   - cpu's selection
         *
         */
        let defineWinner = (userMove, cpuMove) => {
                if (userMove === cpuMove) {
                    return '0';
                } else if ((userMove === '0' && cpuMove === '2') ||
                    (userMove === '1' && cpuMove === '0') ||
                    (userMove === '2' && cpuMove === '1')) {
                    return '1';
                } else {
                    return '2';
                }
            },
            /**
             *   Defines game's winner
             *
             *   @param  {int} winner                  - Game winner
             *
             */
            winnerName = (winner) => {
                let win;

                switch (winner) {
                case '0':
                    win = 'Draw';
                    break;
                case '1':
                    win = 'User won';
                    break;
                case '2':
                    win = 'CPU won';
                }
                return win;
            },
            /**
             *   Defines game's winner
             *
             *   @param  {int} move                  - user's move
             *
             */
            moveName = (move) => {
                let choise;

                switch (move) {
                case '0':
                    choise = 'Rock';
                    break;
                case '1':
                    choise = 'Paper';
                    break;
                case '2':
                    choise = 'Scissors';
                }
                return choise;
            };

        return {
            defineWinner: defineWinner,
            winnerName: winnerName,
            moveName: moveName
        };
    };

    angular
        .module('rpsApp')
        .factory('rpsGame', rpsGame);
