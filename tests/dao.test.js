const petDAO = require("../model/petsDAO.js");

const mongoose = require("mongoose");

describe("DAO Tests", () => {

    test("Return all pets", () => {
        const pets = petDAO.getAllPets();
        expect(Array.isArray(pets)).toBe(true);
    });

    test("Add a pet", () => {
        const pet = { id: 999, name: "Test Pet" };
        const result = petDAO.createPet(pet);
        expect(result.name).toBe("Test Pet");
    });

    test("Update a pet", () => {
        const updated = petDAO.updatePet(999, { name: "Updated" });
        expect(updated.name).toBe("Updated");
    });

    test("Delete a pet", () => {
        const result = petDAO.deletePet(999);
        expect(result).toBe(true);
    });

});