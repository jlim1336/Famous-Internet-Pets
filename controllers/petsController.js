const dao = require("../model/mongodbDAO.js");

exports.getPets = (req, res) => {
    res.json(dao.getAllPets());
};

exports.createPet = (req, res) => {
    const pet = dao.createPet(req.body);
    res.status(201).json(pet);
};

exports.updatePet = (req, res) => {
    const updated = dao.updatePet(req.params.id, req.body);
    res.json(updated);
};

exports.deletePet = (req, res) => {
    dao.deletePet(req.params.id);
    if (!deleted) {
        return res.status(404).send("Pet not found");
    }
    res.status(204).send();
};