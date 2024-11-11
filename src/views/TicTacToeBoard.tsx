import React from "react";

const TicTacToeBoard = () => {
  type Player = "X" | "O";
  type Cell = Player | "";
  type Winner = Cell | "Draw";
  type Board = [[Cell, Cell, Cell], [Cell, Cell, Cell], [Cell, Cell, Cell]];

  const initialBoardState: Board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const initialCurrentMove: Player = "X";
  const initialWinner: Winner = "";

  const [boardState, setBoardState] = React.useState<Board>(initialBoardState);
  const [currentMove, setCurrentMove] =
    React.useState<Player>(initialCurrentMove);
  const [winner, setWinner] = React.useState<Winner>(initialWinner);

  const resetBoard = () => {
    setBoardState(initialBoardState);
    setCurrentMove("X");
    setWinner("");
  };
  const ResetButton = () => {
    return (
      <button id="reset" onClick={resetBoard}>
        Reset
      </button>
    );
  };

  type Coordinate = [number, number];
  type Victory = [Coordinate, Coordinate, Coordinate];

  const victories: Victory[] = [
    // Horizontals
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Verticals
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const checkBoard = (newBoardState: Board): Winner => {
    for (const victory of victories) {
      const cell1 = newBoardState[victory[0][0]][victory[0][1]];
      const cell2 = newBoardState[victory[1][0]][victory[1][1]];
      const cell3 = newBoardState[victory[2][0]][victory[2][1]];
      if (cell1 === cell2 && cell2 === cell3 && cell1 !== "") {
        return cell1;
      }
    }
    if (newBoardState.every((row) => row.every((cell) => cell !== "")))
      return "Draw";

    return "";
  };

  const handleCellClick = (row: number, col: number, content: Cell = "") => {
    if (winner) return;
    if (content !== "") return;
    const newBoardState: Board = [...boardState];
    newBoardState[row][col] = currentMove;
    const newWinner = checkBoard(newBoardState);
    if (newWinner) setWinner(newWinner);
    setBoardState(newBoardState);
    setCurrentMove(currentMove === "X" ? "O" : "X");
  };

  const BoardCell = ({
    row,
    col,
    content = "",
  }: {
    row: number;
    col: number;
    content: Cell;
  }) => {
    return (
      <button
        className="cell"
        data-row={row.toString()}
        data-col={col.toString()}
        data-content={content}
        onClick={() => handleCellClick(row, col, content)}
      />
    );
  };

  return (
    <div id="container">
      <h1>Tic Tac Toe!</h1>
      <div id="board">
        {boardState.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <BoardCell
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              content={cell}
            />
          ))
        )}
      </div>
      <p id="move-element" className="current-move">
        {winner ? `Winner: ${winner}` : `Next Move: ${currentMove}`}
      </p>
      <ResetButton />
    </div>
  );
};

export default TicTacToeBoard;
