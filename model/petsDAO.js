const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/pets.json");

function readData() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getAllPets() {
    return readData();
};

exports.createPet = (pet) => {
    const pets = readData();
    pets.push(pet);
    writeData(pets);
    return pet;
};

exports.updatePet = (id, updatedPet) => {
    const pets = getAllPets();
    let found = false;
    let j = -1;
    for (let i = 0; i < pets.length; i++) {
        if (pets[i].id === id) {    
            j = i;
            for (let key in updatedPet) {
                if (updatedPet.hasOwnProperty(key)) {
                    pets[i][key] = updatedPet[key];
                }
            }
            found = true;
            break;
        }
    }
    if (!found) {
        return null
    }; // pet not found

    fs.writeFileSync(filePath, JSON.stringify(pets, null, 2));
    return pets[j]; // return updated pet
};

exports.deletePet = (id) => {
    let pets = getAllPets()
    let deleted = false;

    for (let i = 0; i < pets.length; i++) {
        if (pets[i].id === id) {
            pets.splice(i, 1);
            deleted = true;
            break;
        }
    }
    fs.writeFileSync("data/pets.json", JSON.stringify(pets, null, 2));
    return deleted;
};

exports.getAllPets = getAllPets;