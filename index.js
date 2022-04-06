import express from 'express';
const app = express();
const port = 1337;

import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';


app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.status(300).redirect('./info.html');
})

app.get('/allGames', async(req,res)=>{
    let url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2';

    try{
        let games = await fetch(url)
            .then(response => response.json());
        res.status(200).json(games);
    }catch(error){
        res.status(500).send('Try again later');
    }finally{
        console.log('Call made');
    }
})

// /userGames/?id=
app.get('/userGames', async(req,res)=>{
    // make the url for the fetch call
    // api key is secret and is saved on heroku
    // steam id should be given as a parameter
    let url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?steamid=${req.query.id}&key=${process.env.KEY}`;
    
    try{
        // fetch the data
        let games = await fetch(url)
            .then(response => response.json());
        // send the data
        res.status(200).json(games);
    }catch(error){
        console.log(error);
        res.status(500).send('API call could not be made. Try again later!')
    } finally{
        console.log('call done');
    }
})

// /game/?id=
app.get('/game', async(req,res)=>{
    let url = `https://store.steampowered.com/api/appdetails?appids=${req.query.id}`
    try{
        // fetch the data
        let gameInfo = await fetch(url)
            .then(response => response.json());
        // send the data
        res.status(200).json(gameInfo);
    }catch(error){
        console.log(error);
        res.status(500).send('API call could not be made. Try again later!')
    } finally{
        console.log('call done');
    }
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`API is running`);
})