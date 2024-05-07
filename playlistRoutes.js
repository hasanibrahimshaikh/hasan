
const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.put('/:playlistId/add-songs/:songId',authMiddleware,  playlistController.addSongsToPlaylist);
router.delete('/:playlistId/remove-song/:songId',playlistController.removeSongFromPlaylist);
router.post('/', playlistController.createPlaylist);
router.get('/', authMiddleware, playlistController.getAllPlaylists);
router.get('/:id', playlistController.getPlaylistById);
router.put('/:id', playlistController.updatePlaylist);
router.delete('/:id', playlistController.deletePlaylist);


module.exports = router;

