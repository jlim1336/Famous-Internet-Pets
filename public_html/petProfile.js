//let pets = []; // global
console.log("petProfile.js loaded");
// READ
async function readPets() {
   const response = await fetch('http://localhost:4000/pets');
   const pets = await response.json();

   const container = document.getElementById('petContainer');
   let out = "";

   pets.forEach(profile => {
      out += `
      <div class="col-sm-6 col-lg-4">
         <div class="card h-100">
            <img src="${profile.img}" class="card-img-top" alt="${profile.name}">
            <div class="card-body">
               <h5>${profile.name}</h5>
               <h6>AKA, ${profile.alias}</h6>
               <p>Species/Breed: ${profile.breed}</p>
               <p>${profile.born} - ${profile.death}</p>
               <button data-bs-target="#editpopup" onclick="deletePet(${profile.id})">Delete</button>
               <button onclick="openEditPopup(${profile.id})">Edit</button>
            </div>
         </div>
      </div>`;
   });


   container.innerHTML = out;
}

// CREATE
async function addPet() {
   const pet = {
      id: Date.now(),
      name: document.getElementById("name").value,
      alias: "New Pet",
      breed: "Unknown",
      born: "2020",
      death: "-"
   };

   await fetch('http://localhost:4000/pets', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet)
   });

   readPets();
}

// DELETE
async function deletePet(id) {
   await fetch(`${'http://localhost:4000/pets'}/${id}`, {
      method: "DELETE"
   });

   readPets();
}

// UPDATE
async function updatePet(id) {
   await fetch(`${'http://localhost:4000/pets'}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Updated Name" })
   });

   readPets();
}










readPets();
console.log("readPets called");
