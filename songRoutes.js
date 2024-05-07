
const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');


router.post('/', songController.createSong);
router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSongById);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);


router.post('/api/songs', async (req, res) => {
    try {
        const newSong = req.body;

        await handleNewSongAdded(newSong);

        res.status(200).json({ message: 'New song added successfully' });
    } catch (error) {
        console.error('Error adding new song:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;




