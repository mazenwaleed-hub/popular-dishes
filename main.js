let dishesSec = document.querySelector(".dishes");
let dotsSec = document.querySelector(".dots");
let limit = 4;
let skip = 0;
let total = 0;
document.getElementById("next").addEventListener("click", () => {
  skip += 4;
  GetRecipes();
});
document.getElementById("prev").addEventListener("click", () => {
  skip -= 4;
  GetRecipes();
});
function GetRecipes() {
    fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`)
    .then((response) => {
        return response.json();
    })
    .then((recipes) => {
        total = recipes.total;
        let pages = Math.ceil(total / limit)
        dotsSec.innerHTML = ""

        for (let i = 0; i < pages; i++){
            dotsSec.innerHTML += `<div class="dot"></div>`
        }

        let currenPage = skip / limit;
        dotsSec.children[currenPage].classList.add("active");


        dishesSec.innerHTML = recipes.recipes
        .map((recipe) => {
          return `
          <div class="dish">
          <div class="imageContainer">
          <img
          src="${recipe.image}"
          alt="img"
          width="200px"
          />
          </div>
          <div class="text">
          <span>${recipe.cuisine}</span>
          <h2>${recipe.name}</h2>
          <p>${recipe.instructions[0]}</p>
          </div>
          <div class="buying">
          <div class="line"></div>
          <h2>$14</h2>
          <button>Add To Cart</button>
          </div>
          </div>
          `;
        })
        .join("");
        document.getElementById("prev").disabled = skip === 0;
      document.getElementById("next").disabled = skip + limit >= total;
    });
}
GetRecipes();
