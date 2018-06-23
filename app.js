const express = require('express');
const logger = require('morgan');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const parentsController = require('./server/parents/parents.controller');
const activitiesController = require('./server/activities/activities.controller');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(config.public_path));

app.use('/parents', parentsController);
app.use('/categories', activitiesController);

app.use('/assets', express.static(config.public_path));

mongoose.connect(config.dbPath);

app.all('/', (req,res) => res.sendFile(`${config.public_path}/index.html`));
app.all('*', (req,res) => res.status(400).send('This path does not exist'));

const port = config.port;
app.listen(port,() => console.log(`Server listening to: ${port}`));