require('dotenv').config();
const mongoose = require('mongoose');

exports.connect = async function(where){
   let uri = process.env.DB_URI; // Default place, prod db
   if(where==='test') uri = process.env.TESTDB_URI; // test db
   if(process.env.CI) uri = 'mongodb://adm:secret@localhost:27017'; //CI test 

   try { 
      await mongoose.connect(uri); //connects to DB
   } catch (error) { // Catch connection errors
      console.log(error);
   }
} 

exports.disconnect = async function(){
   await mongoose.connection.close();
}
