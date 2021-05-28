const express = require('express');
const router = express.Router();
const axios = require('axios')
const jwt = require('jsonwebtoken');

router.get('/getArtist', async(req, res) => {
    try {
        let searchQuery = req.query.searchItem
        let token = req.session.jwt

        const result = await axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist&limit=10`, 
        { headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}` 
            }
        })
        if (result.status === 200) {
            res.json({data: result.data.artists}).status(200)
        } else {
            res.json({success: false}).status(result.status)
        }
    } catch(err) {
        console.log(err)
        res.json({success: false}).status(500)
    }
});

router.get('/getAlbums', async(req, res) => {
    try {
        let artistId = req.query.artistId
        let token = req.session.jwt

        const result = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`, 
        { headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}` 
            }
        })
        if (result.status === 200) {
            
            res.status(200).render('albums.hbs', { data: result.data.items} )
        } else {
            res.json({success: false}).status(result.status)
        }
    }catch(err) {
        console.log(err)
        res.json({success: false}).status(500)
    }
})

router.get('/getTracks', async (req,res) => {
    try {
        let albumId = req.query.albumId
        let token = req.session.jwt

        const result = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=10`, 
        { headers:
            {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}` 
            }
        })
        if (result.status === 200) {
            res.status(200).render('tracks.hbs', { data: result.data.items} )
        } else {
            res.json({success: false}).status(result.status)
        }
    }catch(err) {
        console.log(err)
        res.json({success: false}).status(500)
    }
})

module.exports = router