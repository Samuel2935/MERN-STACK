
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./config/db");
const User = require("./models/User");
const fs = require('fs');
const yaml = require('yaml');


// Load the YAML file
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(file);


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", require("./routes/users"));
app.use('/api/auth', require('./routes/auth'));

// Sync DB and start server
sequelize
  .sync()
  .then(() => {
    console.log(" MySQL connected and tables synced");
    app.listen(PORT, () =>
      console.log(` Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MySQL connection error:", err);
  });
