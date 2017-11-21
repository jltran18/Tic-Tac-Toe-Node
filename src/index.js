/**
 * Created by jessica.tran on 12/13/15.
 */
/**
 * Created by jessica.tran on 12/7/15.
 */

/*  Simple Tic-Tac-Toe Game
 1 | 2 | 3
 ---------
 4 | 5 | 6
 ---------
 7 | 8 | 9
 */



// TTTView (Display Information Back to the User)
// -------------------------
//
//  1 | 2 | 3  {model.c1} | 2 | 3
//  ---------  ---------
//  4 | 5 | 6  {model.c4 | 5 | 6
//  ---------  ---------
//  7 | 8 | 9  {model.c7 | 8 | 9
//
//  [model.getMessage]
//
//


// TTTModel (State of the Game)
//

// TTTController (Handling or Taking User Data)
// - Bind keyboard event to controller
// - Pass data to model
// - Pass model to view

//var v = new TTTView();
//
//var c = new TTTController( v );
//c.setView( v );

function TTTModel() {
    
        this.winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
            [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
    
        this.board = {
            1: ' ',
            2: ' ',
            3: ' ',
            4: ' ',
            5: ' ',
            6: ' ',
            7: ' ',
            8: ' ',
            9: ' '
        };
    
    }
    
    TTTModel.prototype = {
    
        newGame: function (player) {
            this.board = {
                1: ' ',
                2: ' ',
                3: ' ',
                4: ' ',
                5: ' ',
                6: ' ',
                7: ' ',
                8: ' ',
                9: ' '
            };
    
            TTTController.start(player, true);
        },
    
        saveMove: function(player, positionInt) {
            if (this.board[positionInt] === ' ') {
                this.board[positionInt] = player;
                return true;
            }
            return false;
        },
    
        checkWin: function (player) {
            var matchGame = false;
    
            for (var i = 0; i < this.winCombos.length; i++) {
                if (
                    this.board[this.winCombos[i][0]] == this.board[this.winCombos[i][1]]
                    &&
                    this.board[this.winCombos[i][0]] == this.board[this.winCombos[i][2]]
                    &&
                    this.board[this.winCombos[i][0]] != " "
                ) {
                    TTTController.textDisplay(1, player);
                    matchGame = true;
                    return true;
                }
                else if (this.checkTie() && !matchGame) {
                    TTTController.textDisplay(2, player);
                    return true;
                }
            }
            return false;
        },
    
        checkTie: function () {
            for (var i in this.board) {
                if (this.board[i] === " ") {
                    return false;
                }
            }
            return true;
        },
    
        switchPlayer: function(player) {
            this.player = player;
    
            if (this.player === 'X') {
                this.player = 'O';
            } else {
                this.player = 'X';
            }
    
            return this.player;
        }
    };
    
    function TTTView() {
    
        this.stdout = process.stdout;
        this.menuKey =
                    '\n' +
                    '      1 | 2 | 3 \n' +
                    '      --------- \n' +
                    '      4 | 5 | 6 \n' +
                    '      --------- \n' +
                    '      7 | 8 | 9 ';
    
        this.line = '___________________________';
        this.position = {1:' ',2:' ',3:' ',4:' ',5:' ',6:' ',7:' ',8:' ',9:' '}
    }
    
    TTTView.prototype = {
    
        startMode: function () {
            var menuKey = this.menuKey;
    
            console.log(this.line + '\n' + this.line);
            console.log('\n   NEW TIC-TAC-TOE GAME!');
            console.log(this.line);
            console.log(menuKey);
    
            this.position = {1:' ',2:' ',3:' ',4:' ',5:' ',6:' ',7:' ',8:' ',9:' '}
    
        },
    
        prompt: function (player) {
            console.log('\n   Your turn player: ' + player);
            this.stdout.write('   Choose your move: ');
        },
    
        printBoard: function (symbol, position) {
            this.position[position] = symbol;
            console.log(this.line);
            console.log(
                '\n' +
                '   1 | 2 | 3 ' + '  ' + this.position[1] + ' | ' + this.position[2] + ' | ' + this.position[3] + '\n' +
                '   --------- ' + '  ---------\n' +
                '   4 | 5 | 6 ' + '  ' + this.position[4] + ' | ' + this.position[5] + ' | ' + this.position[6] + '\n' +
                '   --------- ' + '  ---------\n' +
                '   7 | 8 | 9 ' + '  ' + this.position[7] + ' | ' + this.position[8] + ' | ' + this.position[9] + '');
        },
    
        askPlayAgain: function () {
            this.stdout.write('\n Play again? (Y/N): ');
        },
    
        displayText: function (code, player) {
            var text = '';
            if (code === 1) {
                text = "\n PlAYER " + player + ' IS THE WINNER!!';
            } else if (code === 2) {
                text = "\n TIE GAME. PLAY AGAIN!";
            } else if (code === 3) {
                text = "\n THANKS FOR PLAYING!!!!!";
            } else if (code === 4) {
                text = '\nIncorrect input. Try again.';
            }
    
            console.log(this.line + '\n' + text + '\n' + this.line);
        }
    };
    
    
    function TTTController() {
        this.stdin = process.stdin;
    }
    
    TTTController.prototype = {
    
        start: function (player, newGame) {
            if(newGame) {
                TTTView.startMode();
            }
    
            TTTView.prompt(player);
            this.playTurn(player);
        },
    
        textDisplay: function(codeNum, player) {
          TTTView.displayText(codeNum, player);
        },
    
        playAgain: function (player) {
            TTTView.askPlayAgain();
    
            var self = this;
            this.stdin.once('data', function (answer) {
                var play = answer.toString().toUpperCase().trim();
    
                if (play == 'N') {
                    TTTView.displayText(3, player);
                } else if (play == 'Y') {
                    TTTModel.newGame('X');
                } else {
                    TTTView.displayText(4, player);
                    self.playAgain(player);
                }
            });
        },
    
        playTurn: function (player) {
            var self = this;
            this.stdin.once('data', function (position) {
    
                var positionInt = parseInt(position);
                if (TTTModel.saveMove(player, positionInt)) {
                    TTTView.printBoard(player, positionInt);
    
                    if (TTTModel.checkWin(player)) {
                        self.playAgain(player);
                        return;
                    }
    
                    player = TTTModel.switchPlayer(player);
    
                } else {
                    TTTView.displayText(4, player);
                    TTTView.printBoard();
                }
    
                self.start(player);
            });
        }
    };
    
    var TTTModel = new TTTModel();
    var TTTView = new TTTView();
    var TTTController = new TTTController();
    
    TTTModel.newGame('X');