const searchBtn = document.getElementById("search-btn");

const mealList = document.getElementById("meal");

const mealDetailsContent = document.querySelector(".meal-details-content");

const recipeCloseBtn = document.getElementById("recipe-close-btn");

// EVENT LISTENERS 

searchBtn.addEventListener('click' , getMealList);

function getMealList(){
    let searchInputTxt = 
    document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id = "${meal.idmeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="" width="300px" height="200px">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
        } else{
            html = "Sorry we did'nt find any meal of this ingredient, please type other( chicken , egg , beef ) ";
        }

        mealList.innerHTML = html;
        mealList.classList.add("notFound");
    })
}