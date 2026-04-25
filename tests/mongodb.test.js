const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const dao = require("../model/petsMongoDAO");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    await dao.deleteAll();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

test("Create pet", async () => {
    const pet = await dao.createPet({
        id: 1,
        name: "Test",
        alias: "T",
        breed: "Cat"
    });

    expect(pet.name).toBe("Test");
});

test("Get all pets", async () => {
    await dao.createPet({ id: 2, name: "A" });

    const pets = await dao.getAllPets();
    expect(pets.length).toBe(1);
});

test("Update pet", async () => {
    await dao.createPet({ id: 3, name: "Old" });

    const updated = await dao.updatePet(3, { name: "New" });

    expect(updated.name).toBe("New");
});

test("Delete pet", async () => {
    await dao.createPet({ id: 4, name: "X" });

    const result = await dao.deletePet(4);

    expect(result).toBe(true);
});