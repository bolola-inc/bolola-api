const initApp = require("./src/app");
const env = require("./config/env");

initApp().then((server) => {
  server.listen(env.APP_PORT || 3000, () => {
    console.log(`started ${env.APP_PORT || 3000}`);
  });
});
