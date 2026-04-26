const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const app = express();
const connectDB = require('./model/dbConnection.js');

app.use(morgan('dev'));

const petsController = require('./controllers/petsController');

app.use(express.json());

let hostname = 'localhost';
let port = 4000;

app.use(express.static('public_html'));

connectDB.connect();

// REST endpoints directly here
app.get('/pets', petsController.getPets);
app.post('/pets', petsController.createPet);
app.put('/pets/:id', petsController.updatePet);
app.delete('/pets/:id', petsController.deletePet);
// app.put('/pets/:id', function(req, res) {
//     const id = parseInt(req.params.id);
//     const updated = petDAO.updatePet(id, req.body);
//     if (!updated) return res.status(404).send("Pet not found");
//     res.status(200).json(updated);
// });


const server=app.listen(port,hostname,function(){
    console.log(`Server running in ${hostname}:${port}`);
});



