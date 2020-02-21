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

class Chess {

	board = EMPTY_BOARD

	generateNewBoard = () => this.board = EMPTY_BOARD;

	getMoveByCoordinates = (y, x) => `${COLUMN_NOTATION[x]}${ROW_NOTATION[y]}`;
	getCoordinatesByMove = ([c, r]) => [ROW_NOTATION.indexOf(parseInt(r)), COLUMN_NOTATION.indexOf(c)];

	printBoard = () => this.board.reduce((total, item, key) => {
		if(key === 0) {
			total += '   +-----------------+\n';
		}

		total += ` ${this.board.length - key} | ${item.reduce((total, item) => total += item + ' ', '')}|\n`;

		if(key === 7) {
			total += '   +-----------------+\n     a b c d e f g h';
		}

		return total;
	}, '');

	movePawn = location => {
		const [r, c] = this.getCoordinatesByMove(location);

		if(this.board[r + 1][c] === 'P') {
			this.updateBoard([r + 1, c], [r, c], 'P');
		} else if(r === 4 && this.board[r + 2][c] === 'P') {
			this.updateBoard([r + 2, c], [r, c], 'P');
		} else {
			console.log(`${location} is an illegal move.`);
		}
	}

	updateBoard = ([sorurceY, sourceX], [targetY, targetX], piece) => {
		this.board[sorurceY][sourceX] = '.';
		this.board[targetY][targetX] = piece;
	}

	move = moveNotation => {
		const [, piece, location] = moveNotation.match(/([PNBRQK])?([a-h][1-8])/);

		if(piece === undefined) this.movePawn(location);

		console.log(this.printBoard());
		// return this.board;
	}
};

const game = new Chess();

game.move('d4');
// game.move('e5');

// d4
// 
// 4 3