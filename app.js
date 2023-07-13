// supabase
const { createClient } = supabase;
const SUPABASE_URL = "https://cwumtresgbumthhxlueo.supabase.co";
const SUPABASE_ANONKEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDgzMjU1NiwiZXhwIjoxOTU2NDA4NTU2fQ.NuaT3j379HHdV9Yzf66oxop5yxWNtcKCUbonv1g8kk8";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANONKEY);

// Socket Init
const socket = io("http://localhost:3000");
socket.emit("newGame");
socket.on("onePlayerCurrentState", handleCurrentState);

// DOM
const generalContainer = document.querySelector(".general-container");
const marker = document.querySelector(".marker");
const squareContainer = document.querySelector(".square-container");
const squares = document.querySelectorAll(".standard");
const questionContainer = document.querySelector(".question-container");
const finalResultContainer = document.querySelector(".final-result-container");
const headerTitle = document.querySelector(".header-title");
const gameCodeContainer = document.querySelector(".game-code");
const playerMistakes = document.querySelector(".player-mistakes-one");
const playerPoints = document.querySelector(".player-points-one");

// DOM Multiplayer
const joinGameBtn = document.getElementById("join-game");
const gameCodeInput = document.getElementById("code-input");
const playerTwoContainer = document.querySelector(".player-two");
const playerTwoMistakes = document.querySelector(".player-mistakes-two");
const playerTwoPoints = document.querySelector(".player-points-two");

// Game Values
let isGameActive = localStorage.getItem("isGameActive") === "true" || false;
let isPlayerActive = false;
let errors = 0;
let points = 0;
let rounds = 0;
const SECOND = 1000;
let totalAmount = 20 * 1000;
let countDown = null;
let theAnswer = null;
let roundsLimit = 25;
let counter = 0;
let currentLength = -4.86;

// marker position
const markerRightPosition = marker.getBoundingClientRect().right;

// socket values
let roomMultiplayer = null;
// Game values Multiplayer
let isGameMultiplayer = false;
let playerId = null;
let consecutiveRightAnswers = 0;
let isFirstTurn = true;
let roundsMultiplayerLimit = 6;

// Sockets events
socket.on("stateUpdated", (state) => {
  headerTitle.innerText = `Ronda ${state.state.rounds} / ${roundsMultiplayerLimit}`;
  const playerSelected = state.state.players.find(
    (player) => player.id === playerId
  );
  rounds = state.state.rounds;
  isPlayerActive = playerSelected.isActive;
  playerTwoContainer.style.display = "flex";
  // se puede emitir un evento desde el socket para que actualice cuando se ganen puntos
  const playerOne = state.state.players[state.state.players.length - 2];
  const playerTwo = state.state.players[state.state.players.length - 1];
  playerMistakes.innerText = `Errores: ${playerOne.errors}`;
  playerPoints.innerText = `Puntos: ${playerOne.points}`;
  playerTwoMistakes.innerText = `Errores: ${playerTwo.errors}`;
  playerTwoPoints.innerText = `Puntos: ${playerTwo.points}`;
});

socket.on("playerAlert", (players) => {
  // console.log(players.players);
  const playerSelected = players.players.find(
    (player) => player.id === playerId
  );
  isPlayerActive = playerSelected.isActive;
  sendPlayerAlert(isPlayerActive);
});

// exit game
socket.on("playerExit", (message) => {
  // console.log(message);
  const playerAlert = document.createElement("div");
  playerAlert.classList.add("result-container", "player-alert", "wrong-answer");
  playerAlert.innerText = message.message;
  generalContainer.insertAdjacentElement("afterbegin", playerAlert);
  setTimeout(() => {
    playerAlert.style.display = "none";
  }, 2000);
  localStorage.setItem("isGameActive", false);
  setGameValuesLS();
  location.reload();
});

// Marker not disabled
if (isGameActive && !isGameMultiplayer) {
  marker.style.pointerEvents = "auto";
  headerTitle.style.pointerEvents = "none";
  playerMistakes.innerText = `Errores: ${errors}`;
  playerPoints.innerText = `Puntos: ${points}`;
  headerTitle.innerText = `Ronda ${rounds} / ${roundsLimit}`;
} else {
  // at the beginning of the game
  // this one only renders when the page load for the first time;
  marker.style.pointerEvents = "none";
  headerTitle.style.pointerEvents = "auto";
  playerMistakes.innerText = `Errores: ${errors}`;
  playerPoints.innerText = `Puntos: ${points}`;
  headerTitle.innerText = `Comenzar a Jugar`;
}

socket.on("init", handleInit);
function handleInit(data) {
  // aquí recibe el estado global del juego
  isGameMultiplayer = data.multiplayer;
  // console.log(isGameMultiplayer);
  // roomMultiplayer = rounds <= 3 ? data.room : null;
  if (!isGameMultiplayer) {
    roomMultiplayer = data.room;
    gameCodeContainer.innerText = `El código es: ${roomMultiplayer}`;
    isPlayerActive = true;
    playerTwoContainer.style.display = "none";
    joinGameBtn.disabled = false;
  } else {
    joinGameBtn.disabled = true;
    const playerAlert = document.createElement("div");
    playerAlert.classList.add("result-container", "player-alert");
    gameCodeContainer.innerText = `Multijugador`;
    isGameActive = true;
    localStorage.setItem("isGameActive", true);
    setGameValuesLS();
    // reiniciando valores
    points = 0;
    errors = 0;
    marker.style.pointerEvents = "auto";
    headerTitle.style.pointerEvents = "none";
    headerTitle.innerText = `Ronda 0 / ${roundsMultiplayerLimit}`;
    playerId = data.player;
    console.log(data.state);
    console.log("jugadores", data.state.players);
    roomMultiplayer = data.room;
    // check which place is the player
    if (data.state.players.length % 2 !== 0) {
      isPlayerActive = true;
      socket.emit("changePlayersStatus", {
        playerId: data.player,
        status: isPlayerActive,
        room: data.room,
      });
      playerAlert.classList.add("success-answer");
      playerAlert.innerText = "Comienzas tú!";
    } else {
      isPlayerActive = false;
      playerAlert.classList.add("wrong-answer");
      playerAlert.innerText = "Espera tu turno";
    }
    // enviar alerta del jugador que participe y del que esté bloqueado
    generalContainer.insertAdjacentElement("afterbegin", playerAlert);
    setTimeout(() => {
      playerAlert.style.display = "none";
    }, 5000);
  }
  // console.log(isGameMultiplayer);
  // console.log(playerId);
}

socket.on("gameTied", () => {
  setTimeout(() => {
    finalResultTemplate("Juego empatado");
  }, 1500);
  localStorage.setItem("isGameActive", false);
  setGameValuesLS();
  setTimeout(() => {
    location.reload();
  }, 4000);
});

socket.on("showWinner", (winner) => {
  console.log(winner);
  if (winner.winner === playerId) {
    setTimeout(() => {
      finalResultTemplate("Ganaste");
    }, 1500);
  } else {
    setTimeout(() => {
      finalResultTemplate("Perdiste");
    }, 1500);
  }
  localStorage.setItem("isGameActive", false);
  setGameValuesLS();
  setTimeout(() => {
    location.reload();
  }, 4000);
});

// Sockets functions
function updateOnePlayerServerState(rounds, errors, room) {
  socket.emit("onePlayerUpdate", { rounds, errors, room });
}

// only works when there is one player
function handleCurrentState(data) {
  // console.log(data);
  console.log(data.state[roomMultiplayer]);
}

// Socket Multiplayer
joinGameBtn.addEventListener("click", joinGame);

function joinGame() {
  const code = gameCodeInput.value;
  if (code && code.trim().length === 6) {
    socket.emit("joinGame", code);
    console.log("actualmente tienes estos puntos", points);
  }
}

function updateRoundsMultiplayers(data) {
  socket.emit("roundsMultiplayer", { data });
}

function updateSinglePlayerState(id, points, errors, room) {
  socket.emit("updateSinglePlayerState", { id, points, errors, room });
}

// Game functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min - 1)) + min;
}

function sendPlayerAlert(isActive) {
  const playerAlert = document.createElement("div");
  playerAlert.classList.add("result-container", "player-alert");
  if (isActive) {
    playerAlert.classList.add("success-answer");
    playerAlert.innerText = "Continúa";
  } else {
    playerAlert.classList.add("wrong-answer");
    playerAlert.innerText = "Espera tu turno";
  }
  generalContainer.insertAdjacentElement("afterbegin", playerAlert);
  setTimeout(() => {
    playerAlert.style.display = "none";
  }, 2500);
}

// Active Game
function activeGame() {
  headerTitle.addEventListener("click", () => {
    localStorage.setItem("isGameActive", true);
    // isPlayerActive = true;
    marker.style.pointerEvents = "auto";
    headerTitle.style.pointerEvents = "none";
    setGameValuesLS();
    headerTitle.innerText = `Ronda 0 / ${roundsLimit}`;
  });
}

// Set values in LS
function setGameValuesLS() {
  localStorage.setItem("points", 0);
  localStorage.setItem("errors", 0);
  localStorage.setItem("rounds", 0);
}

activeGame();

// event listener for clicking the marker
marker.addEventListener("click", (e) => {
  e.preventDefault();
  // roulette wont roll if errors or player is not active
  if (!isGameMultiplayer) {
    if (errors > 3 || !isPlayerActive) return false;
  } else {
    if (!isPlayerActive) return false;
  }

  // disable marker when the roulette is rolling
  marker.style.pointerEvents = "none";

  localStorage.getItem("rounds");
  rounds++;
  // Socket
  if (!isGameMultiplayer) {
    updateOnePlayerServerState(rounds, errors, roomMultiplayer);
    headerTitle.innerText = `Ronda ${rounds} / ${roundsLimit}`;
  } else {
    // console.log('Ya es multipartida')
    updateRoundsMultiplayers({ rounds, room: roomMultiplayer });
    headerTitle.innerText = `Ronda ${rounds} / ${roundsMultiplayerLimit}`;
  }
  // headerTitle.innerText = `Ronda ${rounds} / ${roundsLimit}`;
  currentLength += 900 + getRandomInt(0, 37) * 9.729;
  squareContainer.style.transform = "rotate(-" + currentLength + "deg)";

  const gameTime = setTimeout(async () => {
    const filtered = Array.from(squares).sort(
      (a, b) =>
        a.getBoundingClientRect().right - b.getBoundingClientRect().right
    );

    const categorySelected = filtered[0].dataset.category;
    // console.log(categorySelected);
    const { data, error } = await supabaseClient.rpc("get_random_final", {
      category: categorySelected,
    });

    // console.log(data);
    // const questionRevealed = questionQuery.data[questionIndex];
    const questionRevealed = data[0];
    // background for question
    questionContainer.style.display = "block";
    // Build and insert the template
    const backgroundColorCat = categorySelected.substring(0, 3);

    questionContainer.innerHTML = questionsTemplate(
      backgroundColorCat,
      questionRevealed,
      categorySelected
    );
    // get the right answer
    theAnswer = questionRevealed.correcta;
    const countDownContainer = document.createElement("span");
    const questionBar = document.createElement("div");
    countdownContainerTemplate(countDownContainer, questionBar);
    // clear
    clearTimeout(gameTime);
    // countdown
    countDown = setInterval(() => {
      totalAmount -= SECOND;
      countDownContainer.innerText = `${totalAmount / SECOND}'`;
      questionBar.style.width = `${totalAmount / 200}%`;
      if (totalAmount <= 0) {
        errors++;
        points -= 5;
        if (!isGameMultiplayer) {
          playerMistakes.innerText = `Errores: ${errors}`;
          playerPoints.innerText = `Puntos: ${points}`;
          if (errors > 3) {
            // Show the template for ending game
            localStorage.setItem("isGameActive", false);
            setGameValuesLS();
            setTimeout(() => {
              finalResultTemplate("Perdiste");
            }, 1500);
            setTimeout(() => {
              location.reload();
            }, 4000);
          }
        }
        if (isGameMultiplayer) {
          // gamer loses his turn when countdown runs out
          if (isPlayerActive) isPlayerActive = false;
          socket.emit("changePlayersStatus", {
            playerId,
            status: isPlayerActive,
            room: roomMultiplayer,
          });
          updateSinglePlayerState(playerId, points, errors, roomMultiplayer);
          socket.emit("showAlert", { room: roomMultiplayer });
        }
        // reset values
        let endTime = setTimeout(() => {
          questionContainer.innerHTML = "";
          questionContainer.style.display = "none";
          marker.style.pointerEvents = "auto";
          totalAmount = 20 * SECOND;
          clearTimeout(endTime);
        }, 1500);
        clearInterval(countDown);
      }
    }, SECOND);
  }, 4000);
});

// event listener for answering the question
questionContainer.addEventListener("click", (e) => {
  const answerSelected = e.target.getAttribute("data-id");
  if (answerSelected) {
    clearInterval(countDown);
    totalAmount = 20 * SECOND;
    counter++;
    if (answerSelected === theAnswer) {
      points += 5;
      if (!isGameMultiplayer) {
        playerPoints.innerText = `Puntos: ${points}`;
      } else {
        updateSinglePlayerState(playerId, points, errors, roomMultiplayer);
        // socket.emit('showAlert', {room: roomMultiplayer})
        if (errors === 0 && isFirstTurn) {
          consecutiveRightAnswers++;
          // console.log(consecutiveRightAnswers)
          if (consecutiveRightAnswers === 5) {
            if (isPlayerActive) isPlayerActive = false;
            socket.emit("changePlayersStatus", {
              playerId,
              status: isPlayerActive,
              room: roomMultiplayer,
            });
            isFirstTurn = false;
            socket.emit("showAlert", { room: roomMultiplayer });
          } else {
            socket.emit("showAlert", { room: roomMultiplayer });
          }
        } else {
          socket.emit("showAlert", { room: roomMultiplayer });
        }
      }

      answerResultTemplate("Correcto", "success");
      if (!isGameMultiplayer) {
        // finishing the game
        if (rounds === roundsLimit) {
          localStorage.setItem("isGameActive", false);
          setGameValuesLS();
          setTimeout(() => {
            finalResultTemplate("Ganaste");
          }, 1500);
          setTimeout(() => {
            location.reload();
          }, 4000);
        }
      } else {
        if (rounds === roundsMultiplayerLimit) {
          socket.emit("gameEnded", { room: roomMultiplayer });
        }
      }
    } else if (answerSelected !== theAnswer) {
      errors++;
      if (points > 0) points -= 5;
      answerResultTemplate("Incorrecto", "error");

      if (!isGameMultiplayer) {
        playerMistakes.innerText = `Errores: ${errors}`;
        playerPoints.innerText = `Puntos: ${points}`;
        if (errors > 3) {
          // Show the template for ending game
          localStorage.setItem("isGameActive", false);
          setGameValuesLS();
          // puede reutilizarse el questionContainer
          setTimeout(() => {
            finalResultTemplate("Perdiste");
          }, 1500);
          setTimeout(() => {
            location.reload();
          }, 4000);
        }
        if (rounds === roundsLimit && errors <= 3) {
          localStorage.setItem("isGameActive", false);
          setGameValuesLS();
          setTimeout(() => {
            finalResultTemplate("Ganaste");
          }, 1500);
          setTimeout(() => {
            location.reload();
          }, 4000);
        }
      } else {
        if (isPlayerActive) isPlayerActive = false;
        socket.emit("changePlayersStatus", {
          playerId,
          status: isPlayerActive,
          room: roomMultiplayer,
        });
        updateSinglePlayerState(playerId, points, errors, roomMultiplayer);
        socket.emit("showAlert", { room: roomMultiplayer });
        if (rounds === roundsMultiplayerLimit) {
          socket.emit("gameEnded", { room: roomMultiplayer });
        }
      }
    }
    let endTime = setTimeout(() => {
      questionContainer.innerHTML = "";
      questionContainer.style.display = "none";
      counter = 0;
      clearTimeout(endTime);
    }, 1500);

    marker.style.pointerEvents = "auto";
  }
});

// templates
function questionsTemplate(
  backgroundColorCat,
  questionRevealed,
  categorySelected
) {
  return `
    <div class="question">
      <div class="question-header ${backgroundColorCat}">
        <h2 class="category-name">${categorySelected}</h2>
      </div>
      <div class="question-body">
        <div class="question-title ${backgroundColorCat}">
          <h3>${questionRevealed.nombre}</h3>
        </div>
        <div class="answers-container">
          <span data-id="a" class="answer ${backgroundColorCat}">${questionRevealed.opciones[0].a}</span>
          <span data-id="b" class="answer ${backgroundColorCat}">${questionRevealed.opciones[0].b}</span>
          <span data-id="c" class="answer ${backgroundColorCat}">${questionRevealed.opciones[0].c}</span>
          <span data-id="d" class="answer ${backgroundColorCat}">${questionRevealed.opciones[0].d}</span>
        </div>
      </div>
    </div>
  `;
}

function countdownContainerTemplate(countDownContainer, questionBar) {
  countDownContainer.classList.add("countdown");
  countDownContainer.innerText = "20' ";
  const questionHeader = document.querySelector(".question-header");
  questionHeader.insertAdjacentElement("beforeend", countDownContainer);
  questionBar.classList.add("question-bar");
  questionHeader.insertAdjacentElement("afterend", questionBar);
}

function answerResultTemplate(message, resultColor) {
  const questionBody = document.querySelector(".question-body");
  const answerTemplate = document.createElement("div");
  answerTemplate.classList.add("result-container");
  if (resultColor === "success") {
    answerTemplate.classList.add("success-answer");
  } else {
    answerTemplate.classList.add("wrong-answer");
  }
  answerTemplate.innerText = message;
  questionBody.insertAdjacentElement("beforeend", answerTemplate);
}

function finalResultTemplate(message) {
  finalResultContainer.style.display = "block";
  const finalResultBody = document.createElement("div");
  finalResultBody.innerText = message;
  finalResultBody.classList.add("final-result");
  finalResultContainer.append(finalResultBody);
}
