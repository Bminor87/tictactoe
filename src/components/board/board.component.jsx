import React from 'react';
import Square from '../square/square.component';
import './board.styles.css'
import { max_squares } from '../../helpers/settings';

class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square
          key={i}
          className={this.props.winners.includes(i) ? 'square square-winner': 'square'}
          value={this.props.squares[i]}
          onClick={() => {this.props.onClick(i)}}
        />
      );
    }

    renderBoard = () => {

      let board = [];

      for (let x = 0; x < Math.sqrt(max_squares); x++) {

        let children = [];

        for (let y = 1; y <= Math.sqrt(max_squares); y++) {

          children.push(this.renderSquare(x*Math.sqrt(max_squares) + y));

        }

        board.push(<div key={x} className="board-row">{children}</div>)

      }

      return board;
    }
  
    render() {



      return (
        <div>
          {this.renderBoard()}
        </div>
      );
    }
  }

  export default Board;