const readPets = async function () {
   const response = await fetch('http://localhost:4000/pets');
   const lstpets = await response.json();

   const container = document.getElementById('petContainer');

   let out = "";

   for (let i = 0; i < lstpets.length; i++) {

      const profile = lstpets[i];

      out += `
      <div class="col-sm-6 col-lg-4">
         <div class="card h-100">
            <img src="${profile.img}" class="card-img-top" alt="${profile.name}">
            <div class="card-body">
               <h5>${profile.name}</h5>
               <h6>AKA, ${profile.alias}</h6>
               <p>Species/Breed: ${profile.breed}</p>
               <p>${profile.born} - ${profile.death}</p>
            </div>
         </div>
      </div>
      `;
   }

   container.innerHTML = out;
}
readPets();