
function openMenu(){
    $('.side-Bar').animate({ left: 0 }, 500);
    $('.open-close').removeClass('fa-align-justify');
    $('.open-close').addClass('fa-x');

    for (let i = 0; i < 5; i++) {
        $('.nav-links ul li').eq(i).animate({ top: 0 }, (i + 5) * 100);
    }
}
function closeMenu(){
    $('.side-Bar').animate({ left: -`${outerWidth}` }, 500);
    $('.open-close').addClass('fa-align-justify');
    $('.open-close').removeClass('fa-x');
    $('.nav-links ul li').animate({ top: 300 }, 500);
}
    let outerWidth = $('.left-side').outerWidth();
    $('.side-Bar').css({ left: -`${outerWidth}` })
    $('.nav-links ul li').animate({ top: 300 }, 500);

    $('.open-close').click(function () {
        if ($('.side-Bar').css('left') == '0px') {
           
            closeMenu()
        } else {
            openMenu()
        }
    });


let MealsData = document.getElementById('myRow');
let SearchRow = document.getElementById('SearchRow');

$(document).ready(()=>{
    getMealsData('').then(()=>{
        $('.loading-screen').fadeOut(500);
        $('body').css({overflow:'visible'});
        $('.inner-loading-screen').fadeOut(500);

    })
})

async function getMealsData(meals) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`);
    response = await response.json();

    displayMeals(response.meals);
}


function displayMeals(arr) {

    let cartona = '';

    for (let i = 0; i < arr.length; i++) {

        cartona += ` <div class="col-md-3">
        <div onclick="getMealsDetails('${arr[i].idMeal}')" class="meal position-relative rounded-2">
            <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="">
            <div class="meal-layer position-absolute rounded-2 d-flex align-items-center text-black">
                <h3 class="ps-2">${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>
`
    }
    MealsData.innerHTML = cartona;
};



async function getCategories() {
    closeMenu()
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    displayCategories(response.categories);
    $('.inner-loading-screen').fadeOut(500);

};

function displayCategories(arr) {
    let cartona = '';

    for (let i = 0; i < arr.length; i++) {

        cartona += ` <div class="col-md-3">
    <div onclick="getCategoriesFilter('${arr[i].strCategory}')" class="meal position-relative rounded-2">
        <img src="${arr[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
        <div class="meal-layer position-absolute rounded-2 text-center text-black">
            <h3 class="ps-2">${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
        </div>
    </div>
</div>
    `
    }
    MealsData.innerHTML = cartona;

};


async function getArea() {
    closeMenu()
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    response = await response.json();
    displayArea(response.meals);
    $('.inner-loading-screen').fadeOut(500);

};

function displayArea(arr) {
    let cartona = '';
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-3">
<div onclick="getAreaFilter('${arr[i].strArea}')" class=" text-center rounded-2">
<i class="fa-solid fa-city text-danger fa-3x py-2"></i>
        <h3 class="ps-2 text-center">${arr[i].strArea}</h3>
</div>
</div>
`
    }
    MealsData.innerHTML = cartona;

};

async function getIngredients() {
    closeMenu();
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    response = await response.json();
    displayIngredrients(response.meals);
    $('.inner-loading-screen').fadeOut(500);

};

function displayIngredrients(arr) {

    let cartona = '';
    for (let i = 0; i < 20; i++) {
        cartona += `<div class="col-md-3">
<div onclick="getIngredientFilter('${arr[i].strIngredient}')" class=" text-center rounded-2">
<i class="fa-solid fa-bowl-food text-success fa-4x py-2"></i>
        <h3 class="ps-2 text-center">${arr[i].strIngredient}</h3>
        <p>${arr[i].strDescription.split(' ').slice(0, 20).join(' ')}</p>
</div>
</div>
`
    }
    MealsData.innerHTML = cartona;

};

async function getCategoriesFilter(category) {
    closeMenu()
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals);
    $('.inner-loading-screen').fadeOut(500);

};

async function getAreaFilter(area) {
    closeMenu();
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    displayMeals(response.meals)
    $('.inner-loading-screen').fadeOut(500);


};
async function getIngredientFilter(ingredient) {
    closeMenu();
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    response = await response.json();
    displayMeals(response.meals);
    $('.inner-loading-screen').fadeOut(500);

};

async function getMealsDetails(mealId) {
    closeMenu();
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    SearchRow.innerHTML=''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    response = await response.json();
    displayMealsDetails(response.meals[0]);
    $('.inner-loading-screen').fadeOut(500);

}

function displayMealsDetails(meal) {

    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-success m-1 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>
        `
        }
    }

    let tags = meal.strTags?.split(',');
    if (!tags) tags = [];
    let tagStr = '';
    for (let i = 0; i < tags.length; i++) {

        tagStr += `<li class="alert alert-danger m-1 p-1">${tags[i]}</li>`
    }

    let cartona = `
         <div class="col-md-4 text-center">
    <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="">
    <h2 class="mt-3">${meal.strMeal}</h2>
</div>
<div class="col-md-8">
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    <h5 class="mt-3"><span class="fw-bloder">Area : </span> ${meal.strArea}</h5>
    <h5><span class="fw-bloder">Category : </span> ${meal.strCategory}</h5>
    <h3 class="mt-4">Recipies :</h3>
    <ul class="list-unstyled d-flex flex-wrap ">
        ${ingredients}
    </ul>

    <h3>Tags : </h3>
    <ul class="list-unstyled d-flex flex-wrap">
    ${tagStr}
    </ul>
    <a href="${meal.strSource}" target='_blank' class="btn btn-success">Source</a>
    <a href="${meal.strYoutube}" target='_blank' class="btn btn-danger">Youtube</a>
</div>`


    MealsData.innerHTML = cartona;

}

function searchData() {
    SearchRow.innerHTML = `
        <div class="row py-5">
            <div class="col-md-6" >
                <input type="text" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input type="text" onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter">
            </div>
        </div>
    
    `;
    MealsData.innerHTML = '';
};


async function searchByName(search) {
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $('.inner-loading-screen').fadeOut(500);


}
async function searchByFirstLetter(search) {
    MealsData.innerHTML = '';
    $('.inner-loading-screen').fadeIn(500);
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $('.inner-loading-screen').fadeOut(500);

}
