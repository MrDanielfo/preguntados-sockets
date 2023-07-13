function createRoom(idLength) {
  let result = "";
  let characters = "PREGUNTADOSpreguntados0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  createRoom,
};
