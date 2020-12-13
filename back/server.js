const express = require('express');
const connectDb = require('./DB/connection')
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const port  = process.env.PORT || 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express());
app.use(cors());
app.use('/uploads', express.static('uploads'));
connectDb();


const courseRoute = require('./routes/courses');
app.use('/courses', courseRoute);


const lessonRoute = require('./routes/lessons');
app.use('/lessons', lessonRoute);


app.get('/', (req, res, next) => {
   res.status(200).json({
       message: "It Works"
   });
});

app.use((req, res, next) => {
    const error = new error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
})


//LISTEN TO THE SERVER
app.listen(port);