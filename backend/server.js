"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {top50} = require("./data/top50");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/top50', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };

    const randomTime = Math.floor(Math.random() * 3000);

    setTimeout(() => {
        res.status(200).json({ status: 200, top50 });
    }, randomTime);

  })
  .get('/top50/song/:rank', (req, res) => {

     const result = top50.filter(song => {

      return song.rank == req.params.rank
    })

     if(result.length > 0){

        res.status(200).json({ status: 200, result });
     }else{
       res.status(404).json({ status: 404, "message" :"Song not found." });
     }


  })
  .get('/top50/artist/:name', (req, res) => {

     const result = top50.filter(song => {
      console.log("filter sng artist", song.artist );
      console.log("req.params.artist", req.params.artist );
      return song.artist.toLowerCase() == req.params.name.toLowerCase()
    })

     if(result.length > 0){

        res.status(200).json({ status: 200, result });
     }else{
       res.status(404).json({ status: 404, "message" :"Artist not found." });
     }


  })

  .get('/top50/most-popular', (req, res) => {

     let artist_arr = [];

     top50.forEach((song) => {
        artist_arr.push(song.artist);

     });

     const map = artist_arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

     let popularArtistName = [...map.entries()].reduce((a, e ) => e[1] > a[1] ? e : a)[0];


    let data = [];
    top50.forEach((song) => {
        if(popularArtistName == song.artist){
           data.push(song);       
        }
     });


    res.status(200).json({ status: 200, data });

  })

  .get('/top50/artist', (req, res) => {

     let filtered_arr = new Set();

     top50.forEach((song) => {
      console.log("inside array");
        filtered_arr.add(song.artist);

     });

     let data = [...filtered_arr];//i have to do this, sending filtered_arr directly to the res will give an empty value

    res.status(200).json({ status: 200, data  });

  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
