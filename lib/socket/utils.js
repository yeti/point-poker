module.exports.log = (room, user, msg) => {
  console.dir(`${user}(${room}): ${msg}`);
};

module.exports.debug = (data) => {
  console.dir('===============')
  console.dir(data)
};
