const Player = (identifer, symbol, difficulty) => {
    const getId = () => identifer;
    const getSym = () => symbol;
    const getDifficulty = () => difficulty;


    return {getId, getSym, getDifficulty}
};

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];



    const resetGame = () => {
        gameBoard.board = ["", "", "", "", "", "", "", "", ""];
        gameController.currentPlayer = gameController.P1;
        displayController.renderArray(gameBoard.board);

    }
    return { board, resetGame };
})();


const displayController = (() => {
    const displayContainer = document.getElementById("gameBoardId");
    
    const emptyContainer = () => {
        while (displayContainer.firstChild) {
            displayContainer.removeChild(displayContainer.firstChild);
        }
    }
    const renderArray = (board) => {
        emptyContainer();
        board.forEach((element, index) => {
            let k = document.createElement("DIV");
            k.innerText = element;
            k.id = index;
            k.className = "playSquareStyle";
            k.addEventListener("click", event => {
                gameController.playMove(event);
            })
            displayContainer.appendChild(k);
        });   
    }
    return { renderArray, emptyContainer };
})();

const gameController = (() => {
    const P1 = Player("Player 1", "X", "Human");
    const P2 = Player("Player 2", "O", "Human");
    let currentPlayer = P1;
    const changePlayer = () => {
        if (currentPlayer == P1) { currentPlayer = P2;}
        else { currentPlayer = P1;}
    }
    const playMove = (event) => {
        //console.log(event.target);
        if (gameBoard.board[event.target.id] === "") {
            gameBoard.board[event.target.id] = currentPlayer.getSym();
            //console.log(gameBoard.board);
            displayController.renderArray(gameBoard.board);
            if (!isGameFinished()) {
                changePlayer();
                if (gameBoard.board.every(element => element !== "") === true) {
                    alert(`Game has resulted in a draw!`);
                    gameBoard.resetGame();
                }
            } else {
                alert(`${currentPlayer.getId()} has won the game!`);
                gameBoard.resetGame();
            }
        } else {
            alert("Invalid move");
        }
    }
    const isGameFinished = () => {
        const currSymbol = currentPlayer.getSym();
        const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]]
        let bool = false;
        winningCombinations.forEach(combination => {
            if (gameBoard.board[combination[0]-1] === currSymbol && 
                gameBoard.board[combination[1]-1] === currSymbol && 
                gameBoard.board[combination[2]-1] === currSymbol) {
                    bool = true;
                }
        })
        return bool;
    }
    return { playMove, P1, P2 }
})();


window.addEventListener("load", () => {
    displayController.renderArray(gameBoard.board);
    
})