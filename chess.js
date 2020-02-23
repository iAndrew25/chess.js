// ROW - HEIGHT - Y
// COLUMN - WIDTH - X

const EMPTY_BOARD = [
	['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
	['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['.', '.', '.', '.', '.', '.', '.', '.'],
	['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const COLUMN_NOTATION = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const ROW_NOTATION = [8, 7, 6, 5, 4, 3, 2, 1];

const WHITE = 'WHITE';
const BLACK = 'BLACK';

const WHITE_PIECES = 'PNBRQK';
const BLACK_PIECES = 'pnbrqk';

class Chess {

	state = {
		board: EMPTY_BOARD,
		moveCount: 0,
		movingSide: WHITE
	};

	// generateNewBoard = () => this.state.board = EMPTY_BOARD;

	getMoveByCoordinates = (y, x) => `${COLUMN_NOTATION[x]}${ROW_NOTATION[y]}`;
	getCoordinatesByMove = ([c, r]) => [ROW_NOTATION.indexOf(parseInt(r)), COLUMN_NOTATION.indexOf(c)];

	printBoard = () => this.state.board.reduce((total, item, key) => {
		if(key === 0) {
			total += '   +-----------------+\n';
		}

		total += ` ${this.state.board.length - key} | ${item.reduce((total, item) => total += item + ' ', '')}|\n`;

		if(key === 7) {
			total += '   +-----------------+\n     a b c d e f g h';
		}

		return total;
	}, '');

	movePawn = location => {
		const [r, c] = this.getCoordinatesByMove(location);

		if(this.state.movingSide === WHITE) {
			if(this.state.board[r + 1][c] === 'P') {
				this.updateBoard([r + 1, c], [r, c], 'P');

				return;
			}

			if(r === 4 && this.state.board[r + 2][c] === 'P') {
				this.updateBoard([r + 2, c], [r, c], 'P');

				return;
			}

			if(this.state.board[r + 1][c - 1] === 'P' && BLACK_PIECES.includes(this.state.board[r][c])) {
				this.updateBoard([r + 1, c - 1], [r, c], 'P');

				return;
			}
		} else {
			if(this.state.board[r - 1][c] === 'p') {
				this.updateBoard([r - 1, c], [r, c], 'p');

				return;
			}

			if(r === 3 && this.state.board[r - 2][c] === 'p') {
				this.updateBoard([r - 2, c], [r, c], 'p');

				return;
			}

			if(this.state.board[r - 1][c + 1] === 'p' && WHITE_PIECES.includes(this.state.board[r][c])) {
				this.updateBoard([r - 1, c + 1], [r, c], 'p');

				return;
			}
		}

		console.log(`${location} is an illegal move.`);
	}

	updateBoard = ([sorurceY, sourceX], [targetY, targetX], piece) => {
		this.state.board[sorurceY][sourceX] = '.';
		this.state.board[targetY][targetX] = piece;

		this.state.moveCount++;
		this.state.movingSide = this.state.moveCount % 2 === 0 ? WHITE : BLACK;
	}

	move = moveNotation => {
		const [, piece, location] = moveNotation.match(/([PNBRQK])?([a-h][1-8])/);

		if(piece === undefined) this.movePawn(location);

		console.log(this.printBoard());
		// return this.board;
	}
};

const game = new Chess();

game.move('e4');
game.move('e5');
game.move('d4');
game.move('d5');
game.move('e5');
game.move('d4');
// d4
// 
// 4 3