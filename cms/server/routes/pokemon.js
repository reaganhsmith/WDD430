var express = require('express');
var router = express.Router();
const Pokemon = require('../models/Pokemon'); // Changed PokemonModel to Pokemon to match the model definition

router.get('/', async (req, res, next) => {
  try {
      const pokemon = await Pokemon.find(); // Changed contacts to Contacts to reflect the fetched data
      res.status(200).json(pokemon);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


  router.post('/', async (req, res, next) => {
    try {
      // Creating a new Pokemon object using the Pokemon model
      const pokemon = new Pokemon({
        id: req.body.id,
        name: req.body.name, 
        type: req.body.type, 
        weakness: req.body.weakness, 
        color: req.body.color, 
        evolution: req.body.evolution,
        category : req.body.category,
        img : req.body.img
      });
  
      // Saving the new Pokemon to the database
      const createdPokemon = await pokemon.save();
  
      // Responding with status 201 (Created) and the created Pokemon object
      res.status(201).json({
        message: 'Pokemon added successfully',
        pokemon: createdPokemon
      });
    } catch (error) {
      // If an error occurs, respond with status 500 (Internal Server Error) and an error message
      res.status(500).json({
        message: 'An error occurred',
        error: error.message
      });
    }
  });
  
  
  
  router.put('/:id', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.findOne({ id: req.params.id });
      if (!pokemon) {
        return res.status(404).json({
          message: 'Pokemon not found.'
        });
      }
  
      pokemon.name = req.body.name;
      pokemon.type = req.body.type;
      pokemon.weakness = req.body.weakness;
      pokemon.color = req.body.color;
      pokemon.evolution = req.body.evolution;
      pokemon.img = req.body.img;
  
      await pokemon.save();
  
      res.status(204).json({
        message: 'Pokemon updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error.message
      });
    }
  });
  
  router.delete('/:id', async (req, res, next) => {
    try {
      const pokemon = await Pokemon.findOne({ id: req.params.id });
      if (!pokemon) {
        return res.status(404).json({
          message: 'Pokemon not found.'
        });
      }
  
      await Pokemon.deleteOne({ id: req.params.id });
  
      res.status(204).json({
        message: 'Pokemon deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred',
        error: error.message
      });
    }
  });
  
  module.exports = router;
  