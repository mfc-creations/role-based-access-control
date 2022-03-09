const express =require("express");
const db = require("./db/models");
const userRoutes = require('./routes/user.route.js');
const projectRoutes = require('./routes/project.route.js');


const app = express();

app.use(express.json())

app.use('/api', userRoutes); 
app.use('/api/project', projectRoutes); 

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(3000, () => console.log("connected"));
});
