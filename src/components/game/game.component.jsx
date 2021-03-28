import React from 'react';
import Board from '../board/board.component';
import './game.styles.css';
import { calculateWinner, getCoordinates } from '../../helpers/calculations';
import { max_squares } from '../../helpers/settings';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(max_squares).fill(null),
                lastMove: {
                    sign: null,
                    to: null
                }
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).winner || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
           history: history.concat([{
               squares: squares,
               lastMove: {
                   sign: this.state.xIsNext ? 'X' : 'O',
                   to: getCoordinates(i)
               }
           }]),
           stepNumber: history.length,
           xIsNext: !this.state.xIsNext
        });
    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Mene siirtoon #' + move :
                'Mene pelin alkuun';
            return (
                <li key={move}>
                    <button 
                        className={ this.state.stepNumber === move ? 'selected-step' : '' } 
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                    { step.lastMove.sign ? ' ' + step.lastMove.sign + ' ruutuun ' + step.lastMove.to : '' }
                </li>
            );
        });

        let status;
        if (winner.winner) {
            status = 'Voittaja: ' + winner.winner;
        } else {
            status = 'Seuraava pelaaja: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
                <Board
                    winners={winner.squares}
                    squares={current.squares}
                    onClick={(i) => {this.handleClick(i)}}
                />
            </div>
            <div className="game-info">
                <div>{ status }</div>
                <ol>{ moves }</ol>
            </div>
        </div>
        );
    }
}

export default Game;