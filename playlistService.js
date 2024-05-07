const Playlist = require('../models/Playlist');

const createPlaylist = async ({ name, userId }) => {
  try {
    const playlist = new Playlist({ name, userId });
    await playlist.save();
    return playlist;
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw new Error('Server error');
  }
};

const getAllPlaylists = async ({ keyword }) => {
  try {
    const query = {
      $or: [
        { name: { $regex: new RegExp(keyword, 'i') } },
        { description: { $regex: new RegExp(keyword, 'i') } }
      ]
    };
    const playlists = await Playlist.find(query);
    return playlists;
  } catch (error) {
    console.error('Error retrieving playlists:', error);
    throw new Error('Server error');
  }
};

const getPlaylistById = async (playlistId) => {
  try {
    const playlist = await Playlist.findById(playlistId).populate('songs');
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    return playlist;
  } catch (error) {
    console.error('Error retrieving playlist by ID:', error);
    throw new Error('Server error');
  }
};

const updatePlaylist = async (playlistId, { name }) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { name }, { new: true });
    if (!updatedPlaylist) {
      throw new Error('Playlist not found');
    }
    return updatedPlaylist;
  } catch (error) {
    console.error('Error updating playlist:', error);
    throw new Error('Server error');
  }
};

const deletePlaylist = async (playlistId) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
    if (!deletedPlaylist) {
      throw new Error('Playlist not found');
    }
    return { message: 'Playlist deleted successfully' };
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw new Error('Server error');
  }
};

const addSongsToPlaylist = async (playlistId, songId) => {
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    playlist.songs.push(songId);
    await playlist.save();
    return { message: 'Songs added to playlist successfully', playlist };
  } catch (error) {
    console.error('Error adding songs to playlist:', error);
    throw new Error('Server error');
  }
};

const removeSongFromPlaylist = async (playlistId, songId) => {
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }
    playlist.songs.pull(songId);
    await playlist.save();
    return { message: 'Song removed from playlist successfully', playlist };
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    throw new Error('Server error');
  }
};

module.exports = {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongsToPlaylist,
  removeSongFromPlaylist
};
