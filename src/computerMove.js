import { hasExactlyTwoVals, randomMove, getDiagnolArrays, rotateBoard, countItems, isValidMove, isOnDiagonal, hasTwoInRow, isRowComplete } from './utils';
/*
function computerMove_old(board){
	// easier to check rows/cols simultaneously
	var rotatedBoard = rotateBoard(board);

	// get diagonals as an array
	const [diag1,diag2] = getDiagnolArrays(board);

// snap up middle position ASAP
	if(board[1][1]===' '){
		return {row: 1, col: 1};
	}
	
	// check diags, rows and columns for win!
	// diags
	if(hasTwoInSeries(diag1,'O')){
		var index = diag1.indexOf(' ');
		return { row: index, col: index};
	}
	if(hasTwoInSeries(diag2,'O')){
		var index = diag2.indexOf(' ');
		return { row: index, col: 2-index};
	}
	// rows/cols
	for(let i=0;i<3;i++){
		if(hasTwoInSeries(board[i],'O')){
			var index = board[i].indexOf(' ');
			return {row: i, col: index};
		}
		if(hasTwoInSeries(rotatedBoard[i],'O')){
			var index = rotatedBoard[i].indexOf(' ')
			return {row: index, col: i};
		}
	}
	// play defense to prevent win
	for(let i=0;i<3;i++){
		if(hasTwoInSeries(board[i],'X')){
			var index = board[i].indexOf(' ');
			return {row: i, col: index};
		}
		if(hasTwoInSeries(rotatedBoard[i],'X')){
			var index = rotatedBoard[i].indexOf(' ')
			return {row: index, col: i};
		}
		if(hasTwoInSeries(diag1,'X')){
			var index = diag1.indexOf(' ');
			return {row: index, col: index};
		}
		if(hasTwoInSeries(diag2,'X')){
			var index = diag2.indexOf(' ');
			return {row: index, col: 2-index};
		}
	}
	// cats game most likely here
	return randomMove(board);
}
*/
// using calculated index values
export function computerMove(board){
	// create points per cell based on opponent blocks and chain created

	var rotatedBoard = rotateBoard(board);
	var maxPoints=0, maxCoord, currentPoints;
	var defenseCoord;
	for(var i=0;i<board.length;i++){
		for(var j=0;j<board.length;j++){
			var coord = {row: i, col: j};
			if(!isValidMove(coord,board)){
				continue;
			}
			var diagArrays = getDiagnolArrays(board);
			var diagFull = (isRowComplete(diagArrays[0]) || isRowComplete(diagArrays[1])) && board[1][1] === 'X';

			var currentPoints = 0;
			
			// create row, col, diag array (if applicable)
			var row = board[i]; 
			var col = rotatedBoard[j];
			

			var diagNum = isOnDiagonal(coord,board); // false if not a diag
			
			// short curcuit lookup, or grab proper array based on diagNum (0/1)
			var diag = diagNum === false ? null : getDiagnolArrays(board)[diagNum];
			
			// check win
			if(hasExactlyTwoVals(row,'O') || hasExactlyTwoVals(col,'O') || hasExactlyTwoVals(diag,'O')){
				return coord;
			}
			
			// check for immediate loss
			if(hasTwoInRow(row) || hasTwoInRow(col) || hasTwoInRow(diag)){
				defenseCoord = coord;
			}

			if(isValidMove({row:1,col:1},board)){
				return {row: 1, col: 1};
			}
			//console.log('Row:',row, 'Col:',col);
			// otherwise use points to choose location
			var rowPoints = countItems(row,'O') + countItems(row,'X');
			var colPoints = countItems(col,'O') + countItems(col,'X');
			console.log('Column: ',col);
			var diagPoints = 0;

			if(diag !== null){
				console.log(diag);
				diagPoints = countItems(diag,'O') + countItems(diag,'X');
			}
			var totalPoints = rowPoints+colPoints+diagPoints;
			console.log('Diag Points:',diagPoints, 'rowPoints:',rowPoints, 'colPoints:',colPoints);
			console.log('Coord: ',coord.row +" "+ coord.col, 'Points:',totalPoints);
			if(maxPoints < totalPoints && !((isOnDiagonal(coord) && diagFull)) {
				maxPoints = totalPoints;
				maxCoord = coord;
			}
		}
	}
	console.log('Max Points: ',maxPoints);
	console.log('D Coord: ',defenseCoord);
	return defenseCoord || maxCoord;	
}

// check if move results in a fork -- disqualify forks.
// boardCanBeForked(board) checks altered board produces a loss