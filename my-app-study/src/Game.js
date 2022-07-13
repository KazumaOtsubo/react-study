import React from "react";
import ReactDOM from 'react-dom/client';

function Game() {
    return(<Board />);
}

// 関数コンポーネント
function Square(props) {
    return(
        <button className="square" onClick={props.onClick}>
            {props.res}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

// 制御されたコンポーネント(controlled component) ⇒ 状態管理を上位コンポーネントにゆだねる
class Square2 extends React.Component {
    // コンストラクタ
    constructor(props) { // 引数propsに値を渡すにはどうするんだろう
        super(props); // superは必ず呼ばないといけないらしい
        this.state = { 
            test: ()=>{console.log("test")}, // 関数を突っ込んでみる
        }
    }
    render() {
        return (
        <button className="square" onClick={() => {
            // this.setState({value: this.props.res}); // setState関数で、state(プライベート変数)に登録する
            this.props.onClick();
            console.log("clock"); // 要らない
            this.state.test(); // 要らない
        }}>
            {this.props.res}
        </button>
        );
    }
}
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
    });
  }
    renderSquare(i) {
        return <Square 
            res={this.state.squares[i]} 
            onClick={()=> this.handleClick(i)}
            />; // Squareクラスのpropsに、KeyValueペアを渡す
    }
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = "Winner: " + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
            </div>
        );
    }
}

export default Game;
  