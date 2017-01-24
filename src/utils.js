
function isRowCompleteWithChar(char,row){
	// check if array has char as values
	return row.filter(x=>char===x).length === 3;
}

export function isRowComplete(row){
	return row.filter(x=> x === 'X' || x === 'O').length === 3;
}

export function randomMove(board){
	// first valid moves gets it
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			var coord = {row: i, col: j};
			if(isValidMove(coord,board)){
				return coord;
			}
		}
	}
	console.error('random move failed');
}

export function getDiagnolArrays(board){
	const diag1 = board.map( (row,i)=> row[i]);
	const diag2 = board.map( (row,i)=> row[2-i]);
	return [diag1,diag2];
}

export function rotateBoard(board){
	var result = [];
	for(let i = 0;i<3;i++){
		for(let j=0;j<3;j++){
			if(!Array.isArray(result[j]))
				result.push([]);
			result[j][i] = board[i][j];
		}
	}
	return result;
}

export function hasExactlyTwoVals(arr,val){
	// checks to see if there are exactly two val values in arr -- one open space required!
	if(!Array.isArray(arr) || arr.length === 0) return false;
	return arr.indexOf(val) !== arr.lastIndexOf(val) && (arr.indexOf(' ') !== -1);
}

export function isGameWon(board,char){
	var rotatedBoard = rotateBoard(board);
	var checkRow = isRowCompleteWithChar.bind(this,char);
	const [diag1,diag2] = getDiagnolArrays(board);

	if(checkRow(diag1) || checkRow(diag2)){
		return true;
	}
	for(var i=0;i<board.length;i++){
		if(checkRow(board[i]) || checkRow(rotatedBoard[i])) {
			return true;
		}
	}
	return false;
}

export function isCatsGame(board){
	return !board.some(row => row.includes(' '));
}

export function isValidMove(coord,board){
	return board[coord.row][coord.col] === ' ';
}

export function isOnDiagonal(coord, board){ 
	var row = coord.row;
	var col = coord.col;
	if(row === col){
		return 0;
	} else if (col === (2-row)){
		return 1;
	} else {
		return false;
	}
}

export function countItems(arr,item){
	return arr.filter(x=> x===item).length;
}

export function hasTwoInRow(arr){
	if(!Array.isArray(arr)) return false;
	return arr.filter(x=>x==='X').length === 2 || arr.filter(x=>x==='O').length === 2;
}