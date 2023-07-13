const { Server } = require("socket.io");

const {
  onePlayerScoreGameState,
  multiPlayerScoreGameState,
} = require("./state");
const { createRoom } = require("./gameCode");

const io = new Server({
  cors: {
    origin: "http://127.0.0.1:8080" || "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});
// npx live server

const state = {};
let clientRooms = {};

io.on("connection", (client) => {
  // console.log(client)
  client.on("newGame", handleNewGame);

  function handleNewGame() {
    const onePlayerState = onePlayerScoreGameState();
    const room = createRoom(6);
    clientRooms[client.id] = room;
    state[room] = onePlayerState;
    client.join(room);
    client.number = 1;
    client.emit("init", { room, state, multiplayer: false });
    io.to(client.id).emit("greeting", {
      message: `Hola jugador: ${client.id}`,
    });
  }

  client.on("onePlayerUpdate", handleOnePlayerUpdate);

  function handleOnePlayerUpdate(data) {
    state[data.room].rounds = data.rounds;
    state[data.room].players[0].errors = data.errors;
    // if (state.rounds > 3) {
    //   room = null;
    // }
    client.emit("onePlayerCurrentState", { state });
  }

  client.on("joinGame", handleJoinGame);
  function handleJoinGame(gameCode) {
    // multiPlayerScoreGameState();
    const rooms = io.sockets.adapter.rooms;
    let roomGame;
    let allUsers;
    let numClients = 0;
    for (let [key, value] of rooms.entries()) {
      if (gameCode === key) {
        roomGame = value;
      }
    }
    if (roomGame) {
      allUsers = roomGame;
    }
    if (allUsers) {
      numClients = allUsers.size;
    }
    if (numClients === 0) {
      console.log("Sin jugadores");
      return client.emit("noRoom", { message: "Room does not exist" });
    } else if (numClients > 1) {
      console.log("Demasiados jugadores");
      return client.emit("tooManyPlayers", { message: "Too many players" });
    }

    clientRooms[client.id] = gameCode;
    state[gameCode] = multiPlayerScoreGameState();
    client.join(gameCode);
    client.number = 2;
    // console.log("clientRooms", clientRooms);
    // console.log("state players", state[gameCode].players);

    for (let client in clientRooms) {
      // console.log(`${client}: ${clientRooms[client]}`);
      if (clientRooms[client] === gameCode) {
        state[gameCode].players.push({
          id: client,
          points: 0,
          errors: 0,
          isActive: false,
        });
        io.to(client).emit("init", {
          room: gameCode,
          state: state[gameCode],
          multiplayer: true,
          player: client,
        });
      }
      // io.to(client).emit("greeting", {message: `Hola jugador: ${client}`})
    }
  }

  client.on("changePlayersStatus", changePlayersState);
  function changePlayersState(data) {
    const playerSelected = state[data.room].players.find(
      (player) => player.id === data.playerId
    );
    playerSelected.isActive = data.status;
    const otherPlayers = state[data.room].players.filter(
      (player) => player.id !== data.playerId
    );
    otherPlayers.map((player) => {
      player.isActive = !data.status;
    });
    // console.log("playerSelected", playerSelected);
    // console.log("others", otherPlayers)
    for (let client in clientRooms) {
      io.to(client).emit("stateUpdated", { state: state[data.room] });
    }
  }

  client.on("updateSinglePlayerState", updateSinglePlayerState);
  function updateSinglePlayerState(data) {
    const playerSelected = state[data.room].players.find(
      (player) => player.id === data.id
    );
    playerSelected.points = data.points;
    playerSelected.errors = data.errors;
    for (let client in clientRooms) {
      io.to(client).emit("stateUpdated", { state: state[data.room] });
    }
  }

  client.on("roundsMultiplayer", updateRoundsMulti);
  function updateRoundsMulti({ data }) {
    state[data.room].rounds = data.rounds;
    for (let client in clientRooms) {
      io.to(client).emit("stateUpdated", { state: state[data.room] });
    }
  }

  client.on("showAlert", sendPlayerAlert);
  function sendPlayerAlert(data) {
    // console.log(state[data.room].players);
    for (let client in clientRooms) {
      io.to(client).emit("playerAlert", { players: state[data.room].players });
    }
  }

  client.on("gameEnded", multiPlayerGameEnded);
  function multiPlayerGameEnded(data) {
    // sort points
    let isTied = false;
    const players = state[data.room].players;
    console.log(players);
    const sortedPoints = players.sort((a, b) => {
      if (b.points === a.points) {
        if (b.errors === a.errors) {
          isTied = true;
        }
        return a.errors - b.errors;
      }
      return b.points - a.points;
    });

    // retrieve winner
    const winnerId = sortedPoints[0].id;
    if (winnerId && !isTied) {
      // console.log("no se empató");
      for (let client in clientRooms) {
        io.to(client).emit("showWinner", { winner: winnerId });
      }
    }
    if (isTied) {
      for (let client in clientRooms) {
        io.to(client).emit("gameTied");
      }
    }
    state[data.room].players = [];
    state[data.room] = {};
    // console.log("clientRooms una vez inicializado al terminar", clientRooms);
  }

  client.on("disconnect", () => {
    for (let client in clientRooms) {
      io.to(client).emit("playerExit", {
        message: "Tu contrincante se retiró",
      });
    }
  });
});

io.listen(3000);
