import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config.js';
import HouseHoldItemsRoutes from './routes/HouseHoldItemsroutes.js';
//import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(express.json())
app.use('/api/household', HouseHoldItemsRoutes);
//app.use(bodyParser.json())


const PORT = process.env.APP_PORT || 9000;

sequelize.sync({ alter: true })
.then( () => {
    console.log("DATABASE IS SUCCCESSFULLY CONNECTED")
    app.listen(PORT, () => {
        console.log(`SEVER IS RUNNING ON PORT ${PORT}`)
    })
})
.catch (err => {
    console.error("DB CONNECTION FAILED: ", err)
})