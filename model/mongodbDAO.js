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

const Pet = mongoose.model("Pet", petSchema);

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
    return await Pet.findOneAndUpdate(
        { id: Number(id) },
        updatedData,
        { new: true }
    );
};

// DELETE
exports.deletePet = async (id) => {
    const result = await Pet.deleteOne({ id: Number(id) });
    return result.deletedCount > 0;
};

// EXTRA (useful for tests)
exports.deleteAll = async () => {
    await Pet.deleteMany({});
};