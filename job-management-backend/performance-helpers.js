const { faker } = require('@faker-js/faker');

function generateUserCredentials(userContext, events, done) {
  // Generate random user data
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password(10);
  
  // Add to context
  userContext.vars.username = username;
  userContext.vars.email = email;
  userContext.vars.password = password;
  
  return done();
}

module.exports = {
  generateUserCredentials
};

