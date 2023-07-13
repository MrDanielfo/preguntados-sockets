const onePlayerScoreGameState = () => {
  return {
    rounds: 0,
    players: [
      {
        points: 0,
        errors: 0,
      },
    ],
    isMultiplayer: false,
  };
};

const multiPlayerScoreGameState = () => {
  return {
    rounds: 0,
    players: [],
    isMultiplayer: true,
  };
};

module.exports = {
  onePlayerScoreGameState,
  multiPlayerScoreGameState,
};
