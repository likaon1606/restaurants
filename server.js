const { app } = require("./app");

//models
const { initModel } = require("./models/initModel");

//utils
const { database } = require("./utils/database");

//Authenticate database credentials
database
  .authenticate()
  .then(() => console.log("Database authenticated successfully"))
  .catch((err) => console.log(err));

initModel();

//Sync sequelize models
database
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

//PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
