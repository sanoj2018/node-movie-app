//express is function
const dbDebugger = require('debug')('app:db');
const startDebugger = require('debug')('app:start');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();
const Logger = require('./middleware/logger.js');
const courses = require('./routes/courses.js');
const home = require('./routes/home.js');
const movies = require('./routes/movies.js');
const mongoose = require('mongoose');


app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json());

app.use(Logger);

app.use((req, res, next) => {
    dbDebugger('db.');
    startDebugger('statrt');
    next();
});
app.use(express.static('public'));

app.use(helmet());
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('MOrgan enabled');
}

app.use('/api/movies', movies);

app.get('/api/courses', (req, res) => {
    //getCourses().then((result) => res.send(result));
    
});
app.post('/api/courses', (req, res) => {
    // const {error} = validateCourse(req.body);
    // if (error) {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    createCourse(req.body).then(() => res.send('data added'));
});
//app.use('/', home);
//* MongoDB Learing
mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log('connected to mongo DB....'))
    .catch(error => console.log('Didnot connect to DB',error));

    const cousesSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    });

    const Course = mongoose.model('Course', cousesSchema);
    
    async function createCourse(courseObj) {
        console.log('create course' +courseObj);
        const {name, author, tags, isPublished} = {...courseObj};
        const course = new Course({
            name,
            author,
            tags,
            isPublished
        });
        const result = course.save();
        return result;
    }
    async function getCourses() {
        console.log('get couse');
        const courses = Course.find({})
        .sort({name: 1})
        .select({});
        return courses;
    }



// console.log("Application Name" + config.get('name'));
// console.log("Mail server" + config.get('mail.host'));
// console.log("Mail pass" + config.get('mail.password'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listing at ${port}`);
});

