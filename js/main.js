
const coordinateMap = {
    0: [6, 13],
    1: [6, 12],
    2: [6, 11],
    3: [6, 10],
    4: [6, 9],
    5: [5, 8],
    6: [4, 8],
    7: [3, 8],
    8: [2, 8],
    9: [1, 8],
    10: [0, 8],
    11: [0, 7],
    12: [0, 6],
    13: [1, 6],
    14: [2, 6],
    15: [3, 6],
    16: [4, 6],
    17: [5, 6],
    18: [6, 5],
    19: [6, 4],
    20: [6, 3],
    21: [6, 2],
    22: [6, 1],
    23: [6, 0],
    24: [7, 0],
    25: [8, 0],
    26: [8, 1],
    27: [8, 2],
    28: [8, 3],
    29: [8, 4],
    30: [8, 5],
    31: [9, 6],
    32: [10, 6],
    33: [11, 6],
    34: [12, 6],
    35: [13, 6],
    36: [14, 6],
    37: [14, 7],
    38: [14, 8],
    39: [13, 8],
    40: [12, 8],
    41: [11, 8],
    42: [10, 8],
    43: [9, 8],
    44: [8, 9],
    45: [8, 10],
    46: [8, 11],
    47: [8, 12],
    48: [8, 13],
    49: [8, 14],
    50: [7, 14],
    51: [6, 14],

    // Home Enterance:----

    // P1(blue)
    100: [7, 13],
    101: [7, 12],
    102: [7, 11],
    103: [7, 10],
    104: [7, 9],
    105: [7, 8],

    // P2(green)
    200: [7, 1],
    201: [7, 2],
    202: [7, 3],
    203: [7, 4],
    204: [7, 5],
    205: [7, 6],

    // P4(yellow)
    300: [13, 7],
    301: [12, 7],
    302: [11, 7],
    303: [10, 7],
    304: [9, 7],
    305: [8, 7],

    // P3(red)
    400: [1, 7],
    401: [2, 7],
    402: [3, 7],
    403: [4, 7],
    404: [5, 7],
    405: [6, 7],


    // Base-Positions

    // [x,y] = start to 0 to upto length

    // P1
    500: [1.5, 10.58],
    501: [3.57, 10.58],
    502: [1.5, 12.43],
    503: [3.57, 12.43],


    // P2
    600: [10.5, 1.58],
    601: [12.54, 1.58],
    602: [10.5, 3.45],
    603: [12.54, 3.45],
    // P3
    700: [1.5, 1.5],
    701: [3.57, 1.5],
    702: [1.5, 3.57],
    703: [3.57, 3.57],
    // P4
    800: [10.5, 10.5],
    801: [12.54, 10.5],
    802: [10.5, 12.54],
    803: [12.54, 12.54],
};

const stepLength = 6.66;

const PLAYERS = ['P1', 'P2', 'P3', "P4"];

const basePositions = {
    P1: [500, 501, 502, 503],
    P2: [600, 601, 602, 603],
    P3: [700, 701, 702, 703],
    P4: [800, 801, 802, 803],
}

const startPositions = {
    P1: 0,
    P2: 26,
    P3: 13,
    P4: 39
}

const homeEnterance = {
    P1: [100, 101, 102, 103, 104],
    P2: [200, 201, 202, 203, 204],
    P3: [400, 401, 402, 403, 404],
    P4: [300, 301, 302, 303, 304],

}

const homePositions = {
    P1: 105,
    P2: 205,
    P3: 405,
    P4: 305,
}


const turningPoints = {
    P1: 50,
    P2: 24,
    P3: 11,
    P4: 37,
}
const safePositions = [0, 8, 13, 21, 26, 34, 39, 47];

const STATE = {
    DICE_NOT_ROLLED: 'DICE_NOT_ROLLED',
    DICE_ROLLED: 'DICE_ROLLED',
}
// const dice = document.querySelector('.dice');
// const rollBtn = document.querySelector('.roll');


const diceButtonElement = document.querySelector('#dice-btn');
const playerPiecesElements = {
    P1: document.querySelectorAll('[player-id="P1"].player-piece'),
    P2: document.querySelectorAll('[player-id="P2"].player-piece'),
    P3: document.querySelectorAll('[player-id="P3"].player-piece'),
    P4: document.querySelectorAll('[player-id="P4"].player-piece'),
}

class User {
    static DiceClick(callback) {
        diceButtonElement.addEventListener('click', callback);

    }

    static resetClick(callback) {
        document.querySelector('button#reset-btn').addEventListener('click', callback)
    }

    static PieceClick(callback) {
        document.querySelector('.player-pieces').addEventListener('click', callback)
    }


    // player(str),piece(Number),newPosition(number)
    static setPiecePosition(player, piece, newPosition) {
        if (!playerPiecesElements[player] || !playerPiecesElements[player][piece]) {
            console.error(`Player element of given player: ${player} and piece: ${piece} not here`)
            return;
        }

        const [x, y] = coordinateMap[newPosition];

        const pieceElement = playerPiecesElements[player][piece];
        pieceElement.style.top = y * stepLength + '%';
        pieceElement.style.left = x * stepLength + '%';
    }

    static setTurn(index) {
        if (index < 0 || index >= PLAYERS.length) {
            console.error('index out of bound!');
            return;
        }

        const player = PLAYERS[index];
        const color = player === "P1" ? "Blue" : (player === "P2") ? "Green" : (player === "P3") ? "Red" : (player === "P4") ? "Yellow" : "Blue"

        // Display player ID
        document.querySelector('.active-player span').innerText = player + " " + color;
        document.querySelector('.active-player span').style.color = color;
        document.querySelector('.active-player span').style.background = "black";
        document.querySelector('.active-player').style.color = color;
        document.querySelector('.active-player').style.background = "black";


        const activePlayerBase = document.querySelector('.player-base.highlight');
        if (activePlayerBase) {
            activePlayerBase.classList.remove('highlight');
        }
        // highlight
        document.querySelector(`[player-id="${player}"].player-base`).classList.add('highlight')
    }

    static enableDice() {
        diceButtonElement.removeAttribute('disabled');
    }

    static disableDice() {
        diceButtonElement.setAttribute('disabled', '');
    }


    // player(string),peices(Number[])
    static highlightPieces(player, pieces) {
        pieces.forEach(piece => {
            const pieceElement = playerPiecesElements[player][piece];
            pieceElement.classList.add('highlight');
        })
    }

    static unhighlightPieces() {
        document.querySelectorAll('.player-piece.highlight').forEach(el => {
            el.classList.remove('highlight');
        })
    }

    static setDiceValue(value) {
        document.querySelector('.dice-value');
    }
}


class Ludo {
    constructor() {


        this.DiceClick();
        this.resetClick();
        this.PieceClick();

        this.resetGame();


    }

    currentPositions = {
        P1: [],
        P2: [],
        P3: [],
        P4: [],
    }

    _diceValue;
    get diceValue() {
        return this._diceValue;
    }
    set diceValue(value) {
        this._diceValue = value;

        User.setDiceValue(value);
    }

    _turn;
    get turn() {
        return this._turn;
    }
    set turn(value) {
        this._turn = value;
        User.setTurn(value);
    }

    _state;
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;

        if (value === STATE.DICE_NOT_ROLLED) {
            User.enableDice();
            User.unhighlightPieces();
        } else {
            User.disableDice();
        }
    }



    DiceClick() {
        User.DiceClick(this.onDiceClick.bind(this))
    }

    onDiceClick() {
        this.diceValue = Math.floor(Math.random() * 6) + 1;
        this.state = STATE.DICE_ROLLED;

        const dice = document.querySelector('.dice');
        const rollBtn = document.querySelector('.roll');

        const randomDice = () => {

            const random = this.diceValue
            console.log(this.diceValue);
            if (random >= 1 && random <= 6) {
                rollDice(random);
            }
            else {
                randomDice();
            }
        }

        const rollDice = random => {
            console.log(random)
            dice.style.animation = 'rolling 1s';

            setTimeout(() => {

                switch (random) {
                    case 1:
                        dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                        break;

                    case 6:
                        dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                        break;

                    case 2:
                        dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                        break;

                    case 5:
                        dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                        break;

                    case 3:
                        dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                        break;

                    case 4:
                        dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                        break;

                    default:
                        break;
                }

                dice.style.animation = 'none';

            }, 4050);

        }

        this.checkForAllowPiece();

        rollBtn.addEventListener("click", randomDice)
        // document.querySelector('.dice-value').innerHTML = this.diceValue;

    }


    checkForAllowPiece() {
        const player = PLAYERS[this.turn];

        // eligible pieces of given player
        const allowPieces = this.getAllowPieces(player);
        if (allowPieces.length) {

            // highlight the pieces
            User.highlightPieces(player, allowPieces);
        } else {
            this.incrementTurn();
        }
    }

    incrementTurn() {
        this.turn = this.turn === 0 ? 1 : (this.turn === 1) ? 2 : (this.turn === 2) ? 3 : 0;
        this.state = STATE.DICE_NOT_ROLLED;
    }

    getAllowPieces(player) {
        return [0, 1, 2, 3].filter(piece => {
            const currentPosition = this.currentPositions[player][piece];

            if (currentPosition === homePositions[player]) {
                return false;
            }

            if (
                basePositions[player].includes(currentPosition)
                && this.diceValue !== 6
            ) {
                return false;
            }

            if (
                homeEnterance[player].includes(currentPosition)
                && this.diceValue > homePositions[player] - currentPosition
            ) {
                return false;
            }

            return true;
        });
    }

    resetClick() {
        User.resetClick(this.resetGame.bind(this))
    }

    resetGame() {
        this.currentPositions = structuredClone(basePositions);

        PLAYERS.forEach(player => {
            [0, 1, 2, 3].forEach(piece => {
                this.setPiecePosition(player, piece, this.currentPositions[player][piece])
            })
        });

        this.turn = 0;
        this.state = STATE.DICE_NOT_ROLLED;
    }

    PieceClick() {
        User.PieceClick(this.onPieceClick.bind(this));
    }

    onPieceClick(event) {
        const target = event.target;

        if (!target.classList.contains('player-piece') || !target.classList.contains('highlight')) {
            return;
        }

        const player = target.getAttribute('player-id');
        const piece = target.getAttribute('piece');
        this.handlePieceClick(player, piece);
    }

    handlePieceClick(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (basePositions[player].includes(currentPosition)) {
            this.setPiecePosition(player, piece, startPositions[player]);
            this.state = STATE.DICE_NOT_ROLLED;
            return;
        }

        User.unhighlightPieces();
        this.movePiece(player, piece, this.diceValue);
    }

    setPiecePosition(player, piece, newPosition) {
        this.currentPositions[player][piece] = newPosition;
        User.setPiecePosition(player, piece, newPosition)
    }

    movePiece(player, piece, moveBy) {
        const interval = setInterval(() => {
            this.incrementPiecePosition(player, piece);
            moveBy--;

            if (moveBy === 0) {
                clearInterval(interval);

                // check if player won
                if (this.hasPlayerWon(player)) {
                    alert(`Player: ${player} has won!`);
                    this.resetGame();
                    return;
                }

                const isKill = this.checkForKill(player, piece);

                if (isKill || this.diceValue === 6) {
                    this.state = STATE.DICE_NOT_ROLLED;
                    return;
                }

                this.incrementTurn();
            }
        }, 200);
    }

    checkForKill(player, piece) {
        const currentPosition = this.currentPositions[player][piece];
        // console.log(currentPosition);
        const opponent = player === "P1" ? "P2" : "P1"

        let kill = false;

        [0, 1, 2, 3].forEach(piece => {
            const opponentPosition = this.currentPositions[opponent][piece];

            if (currentPosition === opponentPosition && !safePositions.includes(currentPosition)) {
                this.setPiecePosition(opponent, piece, basePositions[opponent][piece]);
                kill = true
            }
        });

        return kill
    }

    hasPlayerWon(player) {
        return [0, 1, 2, 3].every(piece => this.currentPositions[player][piece] === homePositions[player])
    }

    incrementPiecePosition(player, piece) {
        this.setPiecePosition(player, piece, this.getIncrementedPosition(player, piece));
    }

    getIncrementedPosition(player, piece) {
        const currentPosition = this.currentPositions[player][piece];

        if (currentPosition === turningPoints[player]) {
            return homeEnterance[player][0];
        }
        else if (currentPosition === 51) {
            return 0;
        }
        return currentPosition + 1;
    }
}

new Ludo();