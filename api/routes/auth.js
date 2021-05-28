const express = require('express');
const router = express.Router();
const axios = require('axios')
const querystring = require('querystring')
const jwt = require('jsonwebtoken');

router.get('/dashboard', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Dashboard',
      });
})

router.get('/', (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
    })}`);
});

router.get('/callback', async (req, res) => {
    const {code} = req.query;
    const clientId = process.env.CLIENT_ID;
    const secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const grant_type = 'authorization_code';

    const basicHeader = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const {data} = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type,
        code,
        redirect_uri,
    }), {
        headers: {
            Authorization: `Basic ${basicHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const sessionJWTObject = {
        token: data.access_token,
    };

    req.session.jwt = sessionJWTObject
    return res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

module.exports = router