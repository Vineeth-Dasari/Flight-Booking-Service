const express = require('express');
const bodyparser = require('body-parser');

const {PORT, FLIGHT_SERVICE_PATH} = require('./config/serverConfig');
const Apiroutes = require('./routes/index');
const app = express();
const db = require('./models/index');

const setupAndStartServer = () => {

    
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : true}));
    app.use('/api',Apiroutes);

    app.listen(PORT, () => {
        console.log('Server Started on Port :',PORT);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }
    })
    
}

setupAndStartServer();
