import React from "react";
import ReactDOM from 'react-dom/client';

function StartGame() {
    return(<Game />);
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
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

//     handleClick(i) {
//         const squares = this.state.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             squares: squares,
//             xIsNext: !this.state.xIsNext,
//     });
//   }
    renderSquare(i) {
        return <Square 
            res={this.props.squares[i]} 
            onClick={()=> this.props.onClick(i)}
            />; // Squareクラスのpropsに、KeyValueペアを渡す
    }
    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if(winner) {
        //     status = "Winner: " + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }
        return (
            <div>
            {/* <div className="status">{status}</div> */}
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ // []をつけることで可変長の配列にできる？
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext :true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();
  
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((move) => {
            const desc = move ?
                'Go to move #' + move:
                'Go to game start';
            return(
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })
        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                     />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

export default StartGame;
  