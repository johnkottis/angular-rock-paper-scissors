/**
 *   Controller to manage game flow & UI
 *
 *   @param  {object} $Scope                  - Angular Scope object
 *   @param  {object} $timeout                - Angular timeout function
 *   @param  {object} rpsAI                   - CPU Machine Learing functions
 *   @param  {object} rpsGame                 - RPS Game's Rules' functions
 *
 */
'use strict';
var rpsCtrl = ($scope, $timeout, rpsAI, rpsGame, rpsHelpers) => {
    $scope.user = (event) => {
        event.preventDefault();
        $scope.userSelection = event.target.getAttribute('data-selection');
    };

    // Constants
    $scope.moves = ['0', '1', '2'];
    // Statistics
    $scope.userHistory = [];
    $scope.cpuHistory = [];
    $scope.winsHistory = [];
    $scope.Games = [];
    $scope.HistoryPercent = [];
    // Current game
    $scope.winner = null;
    $scope.currentPrediction = '1';
    $scope.currentStrategy = 'getRandomInt';

    $scope.newGame = true;
    $scope.gameIsActive = false;
    $scope.userSelection = '0';

    $scope.winnerName = rpsGame.winnerName;
    $scope.moveName = rpsGame.moveName;

    // View
    $scope.showCpu = false;

    // Start Game
    $scope.startGame = () => {
        $scope.timer = 4;
        $scope.userSelection = '0';
        $scope.showCpu = false;

        // Initializes View
        $scope.userSelection = '0';
        $scope.currentDecision = null;
        $scope.winner = null;
        $scope.viewMoves = false;
        $scope.newGame = false;
        $scope.gameIsActive = true;
        // cpu predicts based on previous moves
        $scope.currentDecision = rpsAI.cpuDecision($scope.currentStrategy, $scope.userHistory, $scope.moves);

        $timeout(() => {
            $scope.showCpu = true;
            $scope.winner = rpsGame.defineWinner($scope.userSelection, $scope.currentDecision);
            $scope.userHistory.unshift($scope.userSelection);
            $scope.cpuHistory.unshift($scope.currentDecision);
            $scope.winsHistory.unshift($scope.winner);
            $scope.currentStrategy = rpsAI.switchStrategy($scope.winsHistory, $scope.currentStrategy);

            $scope.Games.unshift({
                userM: rpsGame.moveName($scope.userSelection),
                cpuM: rpsGame.moveName($scope.currentDecision),
                winner: rpsGame.winnerName($scope.winner)
            });

            $scope.HistoryPercent = [{
                R: rpsHelpers.indexesOfValue('0', $scope.userHistory).length,
                P: rpsHelpers.indexesOfValue('1', $scope.userHistory).length,
                S: rpsHelpers.indexesOfValue('2', $scope.userHistory).length,
                RPercent: rpsHelpers.indexesOfValue('0', $scope.userHistory).length * 100 / $scope.userHistory.length,
                PPercent: rpsHelpers.indexesOfValue('1', $scope.userHistory).length * 100 / $scope.userHistory.length,
                SPercent: rpsHelpers.indexesOfValue('2', $scope.userHistory).length * 100 / $scope.userHistory.length
            }, {
                R: rpsHelpers.indexesOfValue('0', $scope.cpuHistory).length,
                P: rpsHelpers.indexesOfValue('1', $scope.cpuHistory).length,
                S: rpsHelpers.indexesOfValue('2', $scope.cpuHistory).length,
                RPercent: rpsHelpers.indexesOfValue('0', $scope.cpuHistory).length * 100 / $scope.cpuHistory.length,
                PPercent: rpsHelpers.indexesOfValue('1', $scope.cpuHistory).length * 100 / $scope.cpuHistory.length,
                SPercent: rpsHelpers.indexesOfValue('2', $scope.cpuHistory).length * 100 / $scope.cpuHistory.length
            }, {
                draw: rpsHelpers.indexesOfValue('0', $scope.winsHistory).length,
                user: rpsHelpers.indexesOfValue('1', $scope.winsHistory).length,
                cpu: rpsHelpers.indexesOfValue('2', $scope.winsHistory).length,
                drawPercent: rpsHelpers.indexesOfValue('0', $scope.winsHistory).length * 100 / $scope.winsHistory.length,
                userPercent: rpsHelpers.indexesOfValue('1', $scope.winsHistory).length * 100 / $scope.winsHistory.length,
                cpuPercent: rpsHelpers.indexesOfValue('2', $scope.winsHistory).length * 100 / $scope.winsHistory.length
            }];

            $scope.gameIsActive = false;
        }, 4000);
    };

    // Deletes CPU's memory and restarts the game
    $scope.resetGame = () => {
        // Statistics
        $scope.userHistory = [];
        $scope.cpuHistory = [];
        $scope.winsHistory = [];
        $scope.Games = [];

        // Current game
        $scope.newGame = true;
        $scope.winner = null;
        $scope.currentPrediction = '1';
        $scope.currentStrategy = 'getRandomInt';

        $scope.showCpu = false;
    };
};

rpsCtrl.$inject = ['$scope', '$timeout', 'rpsAI', 'rpsGame', 'rpsHelpers'];

angular
    .module('rpsApp')
    .controller('rpsCtrl', rpsCtrl);
