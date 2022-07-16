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

const PIECES = {
	k: 'KING',
	q: 'QUEEN',
	r: 'ROOK',
	b: 'BISHOP',
	k: 'KNIGHT',
	p: 'PAWN'
};

class Chess {

	state = {
		board: EMPTY_BOARD,
		movingSide: WHITE,
		checked: undefined,
		moveCount: 0,
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

	isMoveLegal = (piece, location) => {
		const [r, c] = this.getCoordinatesByMove(location);
		
		switch(piece.toLowerCase()) {
			case 'k': {

			};

			case 'q': {

			};

			case 'r': {

			};

			case 'b': {

			};

			case 'k': {

			};

			case 'p': {
				if(this.state.movingSide === WHITE) {
					(r === 4 && this.state.board[r][c] === '.' && this.state.board[r - 2][c] === 'p' && ) || // First pawn move jump 2 boxes
					(this.state.board[r - 1][c] === 'p' && this.state.board[r][c] === '.') || // Pawn moving forward
					//(this.state.board[r][c] !== '.' && this.state.board[r + 1][c + 1] === 'p') // Pawn taking a piece
				}
			};
		}
	}

	parseMoveNotation = moveNotation => {

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

const fullGame = ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'd3', 'Bc5', 'Bxc6', 'dxc6', 'Nbd2', 'Nd7', '0-0', '0-0', 'Nc4', 'f6', 'Kh1', 'Rf7', 'Nh4', 'Bf8', 'Nf5', 'Nc5', 'Qh5', 'Be6', 'b3', 'Qd7', 'Be3', 'Kh8', 'Nh4', 'Kg8', 'Qe2', 'Re8', 'a4', 'b6', 'Rg1', 'a5', 'Nd2', 'f5', 'exf5', 'Bxf5', 'Nxf5', 'Qxf5', 'Bxc5', 'Bxc5', 'Ne4', 'Bb4', 'Rgf1', 'Qg6', 'Rad1', 'h5', 'g3', 'Ref8', 'd4', 'exd4', 'Rxd4', 'h4', 'gxh4', 'Rf4', 'Qc4+', 'Kh8', 'Ng5', 'b5', 'Qd3', 'Qxd3', 'Rxd3', 'bxa4', 'bxa4', 'Bd6', 'Rc3', 'Rxa4', 'Rxc6', 'Rxh4', 'f4', 'Rhxf4', 'Rxf4', 'Bxf4', 'Ne4', 'Ra8', 'Rc4', 'Be5', 'Ra4', 'Kg8', 'Kg2', 'Kf7', 'Nd2', 'Bc3', 'Ne4', 'Bb4', 'Kf3', 'Ke6', 'c3', 'Be7', 'Ke3', 'c6', 'h3', 'Bd8', 'Nc5+', 'Kf5', 'Nb3', 'Bb6+', 'Kf3', 'Ke5', 'h4', 'Kd5', 'h5', 'c5', 'Nd2', 'Bc7', 'Ke2', 'Rh8', 'Rg4', 'Rxh5', 'Rxg7', 'Kc6', 'Kd3', 'Be5', 'Rf7', 'a4', 'Ne4', 'Rh3+', 'Kd2', 'Kd5', 'Nf2', 'Rxc3', 'Rf5', 'Rg3']

// game.printBoard();
// d4
// 
// 4 3