//Déclaration variables par défaut
let gridSize = 3;
let winCount = 3;
let playerTurn = true;
let gameBoard = [];
let gameWon = false;
let winner = "";

const gridSizeEl = document.getElementById("gridSize")
const winCountEl = document.getElementById("winCount")

const lvlAIEl = (document.getElementById("lvlAI"))
const playerSymbol = "X";
const IA_Symbol = "O";

//fonction qui reset les variables si besoin. Utile en fin de jeu
function defVar() {

	gridSize = 3;
	winCount = 3;
	playerTurn = true;
	gameBoard = [];
	gameWon = false;
	winner = "";
}

function checkForm() {
	if (gridSizeEl.value < winCountEl.value) {
		return alert("La valeur de ligne gagnante est supérieur au nombre de cases possibles selectionnées pour gagner");
	}
	// else if(lvlAIEl.value != 1){
	// 	return alert("Le mode Hardcore n'est pas disponible..");
	// }
	else {
		startGame();
	}
}

//function to start the game
function startGame() {

	let form = document.getElementById("form");
	form.style.display = "none"; //hide the form after submitting
	let game = document.getElementById("game");
	game.style.display = "block"; //show the game board

	//get user input for grid size and win count
	gridSize = gridSizeEl.value;
	winCount = winCountEl.value;

	//get user input for starting player
	let startPlayer = document.getElementById("startPlayer").value;
	if (startPlayer == "IA") {
		playerTurn = false;
	}

	//create game board
	for (let i = 0; i < gridSize; i++) {
		gameBoard[i] = []; //create new row
		for (let j = 0; j < gridSize; j++) {
			gameBoard[i][j] = ""; //initialize all cells to empty
		}
	}

	//display game board on the page
	console.log(lvlAIEl.value)
	let gameHTML = "";
	if (lvlAIEl.value == 1) {
		for (let i = 0; i < gridSize; i++) {
			gameHTML += "<tr>";
			for (let j = 0; j < gridSize; j++) {
				gameHTML += "<td onclick='play(" + i + "," + j + ")' id='" + i + j + "'></td>";
			}
			gameHTML += "</tr>";
		}

	} else if (lvlAIEl.value == 2) {
		for (let i = 0; i < gridSize; i++) {
			gameHTML += "<tr>";
			for (let j = 0; j < gridSize; j++) {
				gameHTML += "<td onclick='playH(" + i + "," + j + ")' id='" + i + j + "'></td>";
			}
			gameHTML += "</tr>";

		}
	}
	document.getElementById("gameTable").innerHTML = gameHTML;

	if (!playerTurn) {
		//IA starts first
		lvlAIEl.value == 1 ? IAmove() : IAmoveH();
	}
}

//function to handle player move
function play(i, j) {
	if (!gameWon && playerTurn) {
		if (gameBoard[i][j] == "") {
			gameBoard[i][j] = playerSymbol;
			document.getElementById(i + "" + j).innerHTML = playerSymbol;
			checkWin(playerSymbol);
			console.log(gameBoard)
			playerTurn = false;
			if (!gameWon) {
				IAmove();
			}
		}
	}
}

//function to handle IA move
function IAmove() {
	if (!gameWon) {
		let emptyCells = [];
		for (let i = 0; i < gridSize; i++) {
			for (let j = 0; j < gridSize; j++) {
				if (gameBoard[i][j] == "") {
					emptyCells.push([i, j]);
				}
			}
		}
		if (emptyCells.length > 0) {
			let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
			let i = randomCell[0];
			let j = randomCell[1];
			gameBoard[i][j] = IA_Symbol;
			document.getElementById(i + "" + j).innerHTML = IA_Symbol;
			checkWin(IA_Symbol);
			playerTurn = true;
		}
	}
}


//function to check if a player has won the game
function checkWin(symbol) {
	//check rows
	for (let i = 0; i < gridSize; i++) {
		let count = 0;
		for (let j = 0; j < gridSize; j++) {
			if (gameBoard[i][j] == symbol) {
				count++;
			}
		}
		if (count == winCount) {
			gameWon = true;
			winner = symbol;
			endGame();
			return;
		}
	}

	//check columns
	for (let i = 0; i < gridSize; i++) {
		let count = 0;
		for (let j = 0; j < gridSize; j++) {
			if (gameBoard[j][i] == symbol) {
				count++;
			}
		}
		if (count == winCount) {
			gameWon = true;
			winner = symbol;
			endGame();
			return;
		}
	}

	//check diagonals
	let count = 0;
	for (let i = 0; i < gridSize; i++) {
		if (gameBoard[i][i] == symbol) {
			count++;
		}
	}
	if (count == winCount) {
		gameWon = true;
		winner = symbol;
		endGame();
		return;
	}

	count = 0;
	for (let i = 0; i < gridSize; i++) {
		if (gameBoard[i][gridSize - 1 - i] == symbol) {
			count++;
		}
	}
	if (count == winCount) {
		gameWon = true;
		winner = symbol;
		endGame();
		return;
	}
	if (checkFull()) {
		alert("It's a tie!");
		createResetButton();
	}
}

//Vérifie si le tableau est rempli pour annoncer l'égalité
function checkFull() {
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (gameBoard[i][j] === "") {
				return false;
			}
		}
	}
	return true;
}

//function to end the game
function endGame() {
	createResetButton();
	if (winner == playerSymbol) {
		alert("You won!");
	} else if (winner == IA_Symbol) {
		alert("IA won!");
	} else {
		alert("Y'a une erreur quelquepart là poto");
	}

}

function resetGame() {
	//Affichage du formulaire et on cache la grille
	document.getElementById("game").style.display = "none";
	document.getElementById("form").style.display = "block";

	let resetBtn = document.getElementById("resetbtn");
	document.getElementById("game").removeChild(resetBtn);

	defVar();

}


function createResetButton() {
	let resetBtn = document.createElement("input");

	resetBtn.type = "button";
	resetBtn.value = "Reset game";
	resetBtn.setAttribute("id", "resetbtn")
	document.getElementById("game").appendChild(resetBtn);
	resetBtn.addEventListener("click", resetGame);
}

/********************************************************************************************************************************************* */

function playH(i, j) {
	if (!gameWon && playerTurn) {
		if (gameBoard[i][j] == "") {
			gameBoard[i][j] = playerSymbol;
			document.getElementById(i + "" + j).innerHTML = playerSymbol;
			checkWinH(playerSymbol);
			console.log(gameBoard)

			if (!gameWon) {
				playerTurn = false;
				IAmoveH();
			}
		}
	}

}


//MINI MAX ALGO
function IAmoveH() {
	if (!gameWon) {
		// get the best move using the minimax algorithm
		let bestMove = getBestMove();
		let i = bestMove[0];
		let j = bestMove[1];
		gameBoard[i][j] = IA_Symbol;
		document.getElementById(i + "" + j).innerHTML = IA_Symbol;
		checkWinH(IA_Symbol);
		playerTurn = true;
		console.log(checkWinH(IA_Symbol))
	}
}

// minimax function to get the best move
function getBestMove() {
	let bestScore = -Infinity;
	let bestMove;
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (gameBoard[i][j] == "") {
				gameBoard[i][j] = IA_Symbol;
				let score = minimax(false);
				gameBoard[i][j] = "";
				if (score > bestScore) {
					bestScore = score;
					bestMove = [i, j];
				}
			}
		}
	}
	return bestMove;
}

// recursive minimax function
function minimax(isMaximizing) {
	let result = checkWinH(IA_Symbol);
	if (result == IA_Symbol) {
		return 1;
	} else if (result == playerSymbol) {
		return -1;
	} else if (result == "Tie") {
		return 0;
	}
	let bestScore;
	if (isMaximizing) {
		bestScore = -Infinity;
		for (let i = 0; i < gridSize; i++) {
			for (let j = 0; j < gridSize; j++) {
				if (gameBoard[i][j] == "") {
					gameBoard[i][j] = IA_Symbol;
					let score = minimax(false);
					gameBoard[i][j] = "";
					bestScore = Math.max(score, bestScore);
				}
			}
		}
	} else {
		bestScore = Infinity;
		for (let i = 0; i < gridSize; i++) {
			for (let j = 0; j < gridSize; j++) {
				if (gameBoard[i][j] == "") {
					gameBoard[i][j] = playerSymbol;
					let score = minimax(true);
					gameBoard[i][j] = "";
					bestScore = Math.min(score, bestScore);
				}
			}
		}
	}
	return bestScore;
}

function checkWinH(symbol) {
	// check rows
	for (let i = 0; i < gridSize; i++) {
		let count = 0;
		for (let j = 0; j < gridSize; j++) {
			if (gameBoard[i][j] == symbol) {
				count++;
			}
		}
		if (count == winCount) {
			gameWon = true;
			winner = symbol
			endGame()
			return;
		}
	}

	// check columns
	for (let j = 0; j < gridSize; j++) {
		let count = 0;
		for (let i = 0; i < gridSize; i++) {
			if (gameBoard[i][j] == symbol) {
				count++;
			}
		}
		if (count == winCount) {
			gameWon = true;
			winner = symbol
			endGame()
			return;
		}
	}

	// check diagonals
	let count = 0;
	for (let i = 0; i < gridSize; i++) {
		if (gameBoard[i][i] == symbol) {
			count++;
		}
	}
	if (count == winCount) {
		gameWon = true;
		winner = symbol
		endGame()
		return;
	}

	count = 0;
	for (let i = 0; i < gridSize; i++) {
		if (gameBoard[i][gridSize - i - 1] == symbol) {
			count++;
		}
	}
	if (count == winCount) {
		gameWon = true;
		winner = symbol
		endGame();
		return
	}
	let isTie = true;
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (gameBoard[i][j] === "") {
				isTie = false;
			}
		}
	}
	if (isTie) {
		return "Tie";
	}

}


function endGameH(result) {
	createResetButton();
	if (result == playerSymbol) {
		alert("Player wins!");
	} else if (result == IA_Symbol) {
		alert("IA wins!");
	} else if (result == "Tie") {
		alert("It's a tie!");
	}
}