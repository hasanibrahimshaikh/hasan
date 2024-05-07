const Song = require('../models/Song');
const { sendNotification } = require('../controllers/notificationController');

const createSong = async ({ name, singer, musicDirector, releaseDate, albumName }) => {
  try {
    const song = new Song({ name, singer, musicDirector, releaseDate, albumName });
    await song.save();
  
    sendNotification(`New song added: ${song.name}`);
    return song;
  } catch (error) {
    console.error('Error creating song:', error);
    throw new Error('Server error');
  }
};

const getAllSongs = async ({ musicDirector, albumName, singer }) => {
  try {
    let query = {};
    if (musicDirector) {
      query.musicDirector = { $regex: new RegExp(musicDirector, 'i') };
    }
    if (albumName) {
      query.albumName = { $regex: new RegExp(albumName, 'i') };
    }
    if (singer) {
      query.singer = { $regex: new RegExp(singer, 'i') };
    }
    const songs = await Song.find(query);
    return songs;
  } catch (error) {
    console.error('Error retrieving songs:', error);
    throw new Error('Server error');
  }
};

const getSongById = async (id) => {
  try {
    const song = await Song.findById(id);
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  } catch (error) {
    console.error('Error retrieving song by ID:', error);
    throw new Error('Server error');
  }
};

const updateSong = async (id, { name, singer, musicDirector, releaseDate, albumName }) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(id, { name, singer, musicDirector, releaseDate, albumName }, { new: true });
    if (!updatedSong) {
      throw new Error('Song not found');
    }
    return updatedSong;
  } catch (error) {
    console.error('Error updating song:', error);
    throw new Error('Server error');
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      throw new Error('Song not found');
    }
    return { message: 'Song deleted successfully' };
  } catch (error) {
    console.error('Error deleting song:', error);
    throw new Error('Server error');
  }
};

module.exports = { createSong, getAllSongs, getSongById, updateSong, deleteSong };
