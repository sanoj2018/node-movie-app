const express = require('express');
const router = express.Router();

const courses = [
    {
        id: 1,
        name: "course1"
    },
    {
        id: 2,
        name: "course2"
    },{
        id: 3,
        name: "course3"
    }
];

router.get('/', (req, res) => {
    //res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find((course) => {
        return course.id === Number(req.params.id);
    })
    if (!course) 
    res.status(404).send('course not found'); 
    res.send(course);
    return;
});

router.post('', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find((course) => {
        return course.id === Number(req.params.id);
    }) 
    if (!course) { 
        res.status(404).send('course not found'); 
        res.send(course);
        return;
    }
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

router.delete('/:id', (req, res) => {
    const course = courses.find((course) => {
        return course.id === Number(req.params.id);
    });
    if (!course) {
        res.status(404).send('course not found');
        return;
    } 
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
    
})



function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);

}

module.exports = router;