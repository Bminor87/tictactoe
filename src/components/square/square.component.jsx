import React from 'react';
import './square.styles.css';

class Square extends React.Component {
    render() {
      return (
        <button
            className={this.props.className}
            onClick={this.props.onClick}
        >
          {this.props.value}
        </button>
      );
    }
}

export default Square;