function generateRandomData(userContext, events, done) {
  const url = Math.floor(Math.random() * 10000000) + 1;
  userContext.vars.url = url;

  return done();
}

function generate10Data(userContext, events, done) {
  const url = Math.floor(Math.random() * 10) + 1;
  userContext.vars.url = url;

  return done();
}

function generate100Data(userContext, events, done) {
  const url = Math.floor(Math.random() * 100) + 1;
  userContext.vars.url = url;

  return done();
}

module.exports = { generateRandomData, generate10Data, generate100Data };
