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

    const stylePlayerTurn = () => {
        const P1Style = document.getElementById("P1");
        const P2Style = document.getElementById("P2");
        //console.log(gameController.currentPlayer.getId());
        if (gameController.currentPlayer.getId() == gameController.P1.getId()) { //p1
            P1Style.className = "turnStyleActive";
            P2Style.className = "turnStyle";
        } else if(gameController.currentPlayer.getId() == gameController.P2.getId()) { //p2
            P2Style.className = "turnStyleActive";
            P1Style.className = "turnStyle";
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
        stylePlayerTurn();  
    }
    return { renderArray, emptyContainer };
})();

const gameController = (() => {
    const P1 = Player("Player 1", "X", "Human");
    const P2 = Player("Player 2", "O", "Human");
    let currentPlayer = P1;
    const changePlayer = () => {
        if (gameController.currentPlayer == P1) { gameController.currentPlayer = P2;}
        else { gameController.currentPlayer = P1;}
    }
    const playMove = (event) => {
        //console.log(event.target);
        if (gameBoard.board[event.target.id] === "") {
            gameBoard.board[event.target.id] = gameController.currentPlayer.getSym();
            //console.log(currentPlayer.getId());
            if (!isGameFinished()) {
                changePlayer();
                if (gameBoard.board.every(element => element !== "") === true) {
                    alert(`Game has resulted in a draw!`);
                    gameBoard.resetGame();
                }
            } else {
                alert(`${gameController.currentPlayer.getId()} has won the game!`);
                gameBoard.resetGame();
            }
            displayController.renderArray(gameBoard.board);
        } else {
            alert("Invalid move");
        }
    }
    const isGameFinished = () => {
        const currSymbol = gameController.currentPlayer.getSym();
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
    return { playMove, P1, P2, currentPlayer }
})();


window.addEventListener("load", () => {
    displayController.renderArray(gameBoard.board);
    
})
