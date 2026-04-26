const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
    id: Number,
    name: String,
    alias: String,
    breed: String,
    born: String,
    death: String,
    img: String
});

const Pet = mongoose.model("pets", petSchema);

// CREATE
exports.createPet = async (petData) => {
    const pet = new Pet(petData);
    await pet.save()
    return pet;
};

// READ ALL
exports.getAllPets = async () => {
    const lstPets = await Pet.find();
    return lstPets;
};

// UPDATE
exports.updatePet = async (id, updatedData) => {
    const result = await Pet.updateOne({ id: Number(id) },{ $set: updatedData } );

    if (result.matchedCount === 0) {
        return null; // not found
    }

    return await Pet.findOne({ id: Number(id) });
};

// DELETE
exports.deletePet = async (id) => {
    const result = await Pet.deleteOne({ id: Number(id) });
    return result.deletedCount > 0;
};

exports.deleteAll = async () => {
    await Pet.deleteMany({});
};