import express from 'express';
const app = express();
const port = 1337;

import cors from 'cors';

import fetch from 'node-fetch';

import dotenv from 'dotenv/config';

const key = process.env.KEY;

app.use(express.static('public'));
app.use(cors());

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

app.get('/userGames', async(req,res)=>{
    let url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?steamid=76561198090377206&key=${process.env.KEY}`;
    
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

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`API is running`);
})