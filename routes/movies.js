const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Movie = mongoose.model('Movie', mongoose.Schema({
    name: {type: String, required: true},
    actor: String,
    rating: Number,
    genre: {
        type: String,
        enum: ['comedy','action']
    },
    price: {
        type: Number,
        min: 20,
        max: 100
    }
}));

const addMovie = async (movieObj) => {
    console.log('addMovie', 'Enter');
    const {name, actor, rating, genre, price} = {...movieObj};
    const movie = new Movie({
        name,
        actor,
        rating,
        genre,
        price
    });
    try {
        const result = await movie.save();
        console.log(result);
    } catch(ex) {
        console.log(ex.message);
    }
}
const updateMovie = async (id) => {
    const movie = await Movie.findByIdAndUpdate(id, {
        $set: {
            actor : 'Ajay'
        }
    }, {
        new: true
    });
    
    return movie;
}

const deleteMovie = async(id) => {
    const result = await Movie.findByIdAndRemove(id);
    return result;
}


router.put('/:id', async (req, res) => {
    const result = await updateMovie(req.params.id);
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const result = await deleteMovie(req.params.id);
    res.send(result);
});

router.get('/', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});


router.post('/', (req, res) => {
    console.log('adding a movie in db::', req.body);
    const result = addMovie(req.body);
    console.log('movie saved', result);
    res.send('movie saved');
});


module.exports = router;