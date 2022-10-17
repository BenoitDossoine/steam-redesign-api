# Steam redesign - API

https://steam-redesign.herokuapp.com/

## Overview

This is a basic API created for a course project, aiming to redesign the Steam website.
This API was created to relay the data from the RAWG API (https://rawg.io/apidocs) to this project.

## Routes

* **/**: Shows info page
* **/allGames**: Returns all games
* **/userGames/?id=userId**: Returns all games of user with id 'userId'
* **/game/?id=gameId**: Returns game with id 'gameId'
* **/featuredGames**: Returns 4 featured games
* **/gamesByGenre/?genre=genre**: Returns games of the specified genre
* **/gameDetails/?id=gameId**: Returns game details of the game with id 'gameId'
