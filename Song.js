const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name:
   { type: String, 
    required: true 
  },
  singer:
  { type: String, 
    required: true
   },
  musicDirector:
  { type: String, 
    required: true 
  },
  releaseDate:
   { type: Date, 
    required: true 
  },
  albumName: 
  { type: String, 
    required: true 
  },
  visibility:
   { type: String, 
    enum: ['public', 'private', 'restricted'],
     default: 'private' 
    },
});


const Song = mongoose.model('Song', songSchema);

module.exports = Song;
