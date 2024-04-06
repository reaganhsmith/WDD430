const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    id: { type: String, require: true },
    name: { type: String, require: true },
    type: { type: String, require: true },
    weakness: { type: String, require: true },
    color: { type: String, require: true },
    evolution: { type: String, require: true },
    category: { type: String, require: true },
    img: { type: String, require: true }
});

module.exports = mongoose.model("pokemons", pokemonSchema);
