import React, { Component } from 'react';
import { computerMove } from '../computerMove';
import { isGameWon, isValidMove, isCatsGame, rotateBoard } from '../utils';

export default class BoardContainer extends Component {
	constructor(props){
		super(props);
		this.state = {
			boardMatrix: [
				[' ',' ',' '],
				[' ',' ',' '],
				[' ',' ',' '],
			],
			winner: null
		}
		this.onCellClick = this.onCellClick.bind(this);
	}

	onCellClick(rowM,colM){
		// if the move is invalid, or game is over, click does nothing
		if(!isValidMove({row: rowM, col: colM},this.state.boardMatrix) || this.state.winner !== null) 
			return; 
		this.playerMove(rowM,colM);
	}

	playerMove(rowC,colC){
		var winner = this.state.winner,
			board = this.state.boardMatrix.map(row=>row.slice());
		// mark player move on matrix
		board[rowC][colC] = 'X';
		
		var hasPlayerWon = isGameWon(board,'X');
		// check if that was winning play or created a tie
		if(isCatsGame(board) || hasPlayerWon){
			winner = hasPlayerWon ? 'Player' : 'Cats Game';	// set winner
		} else {
			// get computer move coordinates
			const {row, col } = computerMove(board);
			// mark computer move
			if(board[row][col] === ' '){
				board[row][col] = 'O';
			} else {
				console.error('Picked a square already chosen.');
			}
			
			var hasComputerWon = isGameWon(board,'O');
			if(hasComputerWon){
				winner = 'Computer'; // set winner
			}
		}
		this.setState({boardMatrix: board,winner});
	}

	resetGame(){
		this.setState({
			boardMatrix: [
				[' ',' ',' '],
				[' ',' ',' '],
				[' ',' ',' '],
			],
			winner: null
		});
	}

	displayTitle(){
		if(this.state.winner!==null){
			return (<div onClick={() => this.resetGame()}>{this.state.winner} wins! Click Here to Restart!	</div>);
		} else {
			return (<div>Vanilla React Tic Tac Toe</div>);
		}
	}

	render(){
		console.log('render');
		return (
			<div>
				{this.displayTitle()}
				{this.state.boardMatrix.map((row,rowIndex) => 
					<div key={rowIndex} className="row">
					{
						row.map( (cell,colIndex) => 
							<div key={colIndex} className="cell" onClick={() => this.onCellClick(rowIndex,colIndex)}><span className="cellItem" key={colIndex}>{cell}</span></div>
					)
					}
					</div>
				)}
			
			</div>

		);
	}
}