'use strict';
const env = process.env.NODE_ENV || 'development';
console.log (`°**-. Enviroment: ${env} .-**°`);
if (process.env.googleClientID) {
  console.log (process.env.googleClientID);
} else {
  console.log ('doesnt exist');
}
if (process.env.googleClientSecret) {
  console.log (process.env.googleClientSecret);
}
if (env === 'test' || env === 'development') {
  const config = require ('./config.json');
  const configEnv = config[env];

  Object.keys (configEnv).forEach (key => {
    process.env[key] = configEnv[key];
  });
}
