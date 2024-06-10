const express = require('express');
const bodyparser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const apiroutes = require('./routes/index');
const app = express();
const db = require('./models/index');

const setupAndStartServer = () => {

    app.use('/api', apiroutes);
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended : true}));

    app.listen(PORT, () => {
        console.log('Server Started on Port :',PORT);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }
    })
}

setupAndStartServer();
