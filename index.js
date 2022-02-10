const searchBtn = document.getElementById("search-btn");

const mealList = document.getElementById("meal");

const mealDetailsContent = document.querySelector(".meal-details-content");

const recipeCloseBtn = document.getElementById("recipe-close-btn");

const mealDetails = document.querySelector(".meal-details")

const detailsMain = document.querySelector(".details-main")

// EVENT LISTENERS 

searchBtn.addEventListener('click', getMealList);

mealList.addEventListener('click', getMealRecipe);

recipeCloseBtn.addEventListener('click', () => {
    mealDetails.classList.remove("showRecipe"),
    detailsMain.classList.remove("showRecipe")
});



// getting API

function getMealList(){
    let searchInputTxt = 
    document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.map(meal => {
                html += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="" width="300px" height="200px">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Show info</a>
                        </div>
                    </div>
                `;
            });
        } else{
            html = "Sorry we did'nt find any meal of this ingredient, please type other( chicken , egg , beef ) ";
            mealList.classList.add("notFound");
        }

        mealList.innerHTML = html;
        
    })
}

// get recipe of the meal

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains("recipe-btn")){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal= meal[0];
    let html = `
               <h2 class="recipe-title">${meal.strMeal}</h2>
               <p class="recipe-category">${meal.strCategory}</p>
               <div class="recipe-instruction">
                   <h3>Instruction:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="recipe-meal-img">
                    <img src="${meal.strMealThumb}" alt="" width="300px" height="200px">
                </div>
                <div class="recipe-link">
                    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetails.classList.add("showRecipe");
    detailsMain.classList.add("showRecipe");
}