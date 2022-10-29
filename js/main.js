var apiResponse,
    finalResult,
    apiCategoryResponse,
    getCategoryData,
    apiAreaResponse,
    areasData,
    apiIngredientsResponse,
    ingredientsData,
    responseAreaFilter,
    getAreaFilter,
    firstLetterResponse,
    firstLetterData


async function getApiData(searchMeal = '',filterAreas='',firstLetter='') {
    // SearchApi
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`);
    finalResult = await apiResponse.json();
    // CategoryApi
    apiCategoryResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    getCategoryData = await apiCategoryResponse.json();
    // AreasApi
    apiAreaResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    areasData = await apiAreaResponse.json();
    // IngredientsApi
    apiIngredientsResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    ingredientsData = await apiIngredientsResponse.json();
    //Filter AreaApi

    displayApi();
    // console.log(getAreaFilter)
};
var temp = ``;
var temp2 = ``;
var temp3 = ``;
var temp4 =``;


getApiData('','Egyptian','c');
function displayApi() {
    temp = ``;
    temp2 = ``;
    temp3 = ``;
    temp4 = ``;

    for (var i = 0; i < finalResult.meals.length; i++) {
        temp += ` <div class="col-md-3">
        <div class="item" >
           <img src="${finalResult.meals[i].strMealThumb}" class="w-100 rounded-2" alt="" srcset="">
           <div class="layer rounded-2">
               <h3>${finalResult.meals[i].strMeal}</h3>
           </div>
          </div>
        </div>
        `
    }
    for (var i = 0; i < areasData.meals.length; i++) {
        temp2 += `
        <div class="col-md-3 shadow-lg area-item">
                       <div class="area-item text-center shadow-lg">
                           <i class="fa-solid fa-city fa-3x text-danger"></i>
                           <h2 class="text-center text-white">${areasData.meals[i].strArea}</h2>
                       </div>
                   </div>`
    }
  
    for (var i = 0; i < getCategoryData.categories.length; i++) {
        temp3 += ` 
        <div class="col-md-3">
          <div class="category-item">
            <img src="${getCategoryData.categories[i].strCategoryThumb}" class="w-100 rounded-2" alt="">
            <div class="layer2 rounded-2">
                <h2 class="text-center text-white">${getCategoryData.categories[i].strCategory}</h2>
                <p class="text-center text-white">${getCategoryData.categories[i].strCategoryDescription.split(" ").splice(0, 10).join(' ')}</p>
            </div>
          </div>
       </div>`

    }
    for (var i = 0; i < 20; i++) {

        temp4 += `<div class="col-md-3">
        <div class="gradientsItem shadow-lg text-center">
            <i class="fa-solid fa-bowl-food fa-3x"></i>
            <h2>${ingredientsData.meals[i].strIngredient}</h2>
             <p>${ingredientsData.meals[i].strDescription.split(" ").splice(0, 10).join(' ')}</</p>
        </div>
    </div>`
    }
    document.getElementById('my-Row').innerHTML= temp;
    document.getElementById('area-row').innerHTML = temp2;
    document.getElementById('category-row').innerHTML = temp3;
    document.getElementById('row-ingredients').innerHTML = temp4;

};

//Start Side Bar
let outerWidth = $('.black').outerWidth();
$('.sideBar').css({ left: `-${outerWidth}` });
$('#close').css({ display: 'none' });
$('ul li').hide(500);
$('.white #open').click(function () {
    if ($('.sideBar').css('left') === '0px') {
        $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
        $('#close').css({ display: 'none' });
        $('#open').css({ display: 'block' });
    } else {
        $('.sideBar').animate({ left: '0px', display: 'block' }, 500, function () {
            $('ul li').show(500);
        });
        $('#open').css({ display: 'none' });
        $('#close').css({ display: 'block' });
    }
});

$('#close').click(function () {
    $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
    $('#close').css({ display: 'none' });
    $('#open').css({ display: 'block' });
});
//End Side Bar
// Start Search
$('#rowSearchByLetter').css({ display: 'none' });
let searchByLetter = document.getElementById('searchByLetter');
searchByLetter.addEventListener('keyup', function () {
    $('#rowSearchByLetter').css({ display: 'flex' });
    let searchMeal = searchByLetter.value;
    let temp6 = ``;
    for (var i = 0; i < finalResult.meals.length; i++) {
        temp6 += `<div class="col-md-3">
        <div class="searchItem">
            <img src="${finalResult.meals[i].strMealThumb}" class="w-100 rounded-2" alt="" srcset="">
            <div class="layer rounded-2">
                <h2>${finalResult.meals[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }

    document.getElementById('rowSearchByLetter').innerHTML = temp6;
    getApiData(searchMeal);

});
let searchByName = document.getElementById('searchByName');
$('#rowSearchByName').css({ display: 'none' })
searchByName.addEventListener('keyup', function () {
    $('#rowSearchByName').css({ display: 'flex' });

    let searchMeal = searchByName.value;
    let temp5 = ``;
    for (var i = 0; i < finalResult.meals.length; i++) {
        temp5 += `<div class="col-md-3">
        <div class="searchItem">
            <img src="${finalResult.meals[i].strMealThumb}" class="w-100 rounded-2" alt="" srcset="">
            <div class="layer rounded-2">
                <h2>${finalResult.meals[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById('rowSearchByName').innerHTML = temp5

    getApiData(searchMeal);

});
$('#search').css({ display: 'none' });
$('.search').click(function () {
    $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
    $('#my-Row').css({ display: 'none' });
    $('.contact-us').css({ display: 'none' });
    $('#area-row').css({ display: 'none' });
    $('#category-row').css({ display: 'none' });
    $('#areaFilter').css({display:'none'});
    $('#search').css({ display: 'flex' });
    $('#row-ingredients').css({ display: 'none' });
    $('#close').css({ display: 'none' });
    $('#open').css({ display: 'block' });
})
// End Search
// Start Categories
$('#category-row').css({ display: 'none' });
$('.categories').click(function () {
    $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
    $('#my-Row').css({ display: 'none' });
    $('.contact-us').css({ display: 'none' });
    $('#area-row').css({ display: 'none' });
    $('#category-row').css({ display: 'flex' });
    $('#row-ingredients').css({ display: 'none' });
    $('#rowSearchByName').css({ display: 'none' });
    $('#rowSearchByLetter').css({ display: 'none' });
    $('#areaFilter').css({display:'none'});
    $('#close').css({ display: 'none' });
    $('#open').css({ display: 'block' });
});
// End Categories
//Start Area
$('#area-row').css({ display: 'none' });
$('.Area').click(function () {
    $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
    $('#my-Row').css({ display: 'none' });
    $('#area-row').css({ display: 'flex' });
    $('#areaFilter').css({display:'none'});
    $('.contact-us').css({ display: 'none' });
    $('#rowSearchByName').css({ display: 'none' });
    $('#rowSearchByLetter').css({ display: 'none' });
    $('#row-ingredients').css({ display: 'none' });
    $('#close').css({ display: 'none' });
    $('#open').css({ display: 'block' });
});

// End Area

// Start Ingredients
$('#row-ingredients').css({ display: 'none' });
$('.ingredients').click(function () {
    $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
    $('#my-Row').css({ display: 'none' });
    $('#area-row').css({ display: 'none' });
    $('.contact-us').css({ display: 'none' });
    $('#row-ingredients').css({ display: 'flex' });
    $('#category-row').css({ display: 'none' });
    $('#rowSearchByName').css({ display: 'none' });
    $('#rowSearchByLetter').css({ display: 'none' });
    $('#areaFilter').css({display:'none'});
    $('#close').css({ display: 'none' });
    $('#open').css({ display: 'block' });
})
// End Ingredients

// Start Contact Us
$('.contact-us').css({ display: 'none' });
$('.contact').click(function () {
    $('.sideBar').animate({ left: `-${outerWidth}` }, 500);
    $('#my-Row').css({ display: 'none' });
    $('.contact-us').css({ display: 'block' });
    $('#search').css({ display: 'none' });
    $('#row-ingredients').css({ display: 'none' });
    $('#areaFilter').css({display:'none'});
    $('#category-row').css({ display: 'none' });
    $('#rowSearchByName').css({ display: 'none' });
    $('#rowSearchByLetter').css({ display: 'none' });
    $('#close').css({ display: 'none' });
    $('#open').css({ display: 'block' });

});

let alertName = document.querySelector('#alertName')
let alertEmail = document.querySelector('#alertEmail')
let alertPhone = document.querySelector('#alertPhone')
let alertAge = document.querySelector('#alertAge')
let alertPassword = document.querySelector('#alertPassword')
let alertRepassword = document.querySelector('#alertRepassword')
let nameInput = document.querySelector('#name')
let emailInput = document.querySelector('#email')
let phoneInput = document.querySelector('#phone')
let ageInput = document.querySelector('#age')
let passwordInput = document.querySelector('#password')
let repasswordInput = document.querySelector('#repassword')
let formBtn = document.querySelector('#form-btn')

nameInput.addEventListener('keyup', validName);

function validName() {
    let regexName = /[A-Z]?[a-z]$/
    if (regexName.test(nameInput.value) == true) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        alertName.classList.replace('d-block', 'd-none');
        return true;
    } else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        alertName.classList.replace('d-none', 'd-block');

        return false;
    }
};
emailInput.addEventListener('keyup', validEmail);

function validEmail() {
    let regexEmail = /[a-z0-9]+@[a-z]+\.com/;
    if (regexEmail.test(emailInput.value) == true) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        alertEmail.classList.replace('d-block', 'd-none');
        return true
    } else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        alertEmail.classList.replace('d-none', 'd-block');

        return false;
    }

};
phoneInput.addEventListener('keyup', validPhone);

function validPhone() {

    let regexPhone = /^01[0-9]{9}$/;

    if (regexPhone.test(phoneInput.value) == true) {
        phoneInput.classList.add('is-valid');
        phoneInput.classList.remove('is-invalid');
        alertPhone.classList.replace('d-block', 'd-none');
        return true;
    } else {
        phoneInput.classList.add('is-invalid');
        phoneInput.classList.remove('is-valid');
        alertPhone.classList.replace('d-none', 'd-block');
        return false
    }
};
ageInput.addEventListener('keyup', validAge);

function validAge() {
    let regexAge = /^[1-9][0-9]{1,2}$/;
    if (regexAge.test(ageInput.value) == true) {
        ageInput.classList.add('is-valid');
        ageInput.classList.remove('is-invalid');
        alertAge.classList.replace('d-block', 'd-none');
        return true;
    } else {
        ageInput.classList.add('is-invalid');
        ageInput.classList.remove('is-valid');
        alertAge.classList.replace('d-none', 'd-block');
        return false;
    }

};
passwordInput.addEventListener('keyup', validPassword);
function validPassword() {
    let regexPass = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;

    if (regexPass.test(passwordInput.value) == true) {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');
        alertPassword.classList.replace('d-block', 'd-none');
        return true;

    } else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
        alertPassword.classList.replace('d-none', 'd-block');
        return false;
    }
};
repasswordInput.addEventListener('keyup', function(){
    validRepassword();    
    formBtn.classList.remove('disabled');

});

function validRepassword() {

    if (repasswordInput.value == passwordInput.value) {

        repasswordInput.classList.add('is-valid');
        repasswordInput.classList.remove('is-invalid');
        alertRepassword.classList.replace('d-block', 'd-none');
        return true;
    } else {
        repasswordInput.classList.add('is-invalid');
        repasswordInput.classList.remove('is-valid');
        alertRepassword.classList.replace('d-none', 'd-block');
        return false;
    }

}
// End Contact Us
$(document).ready(function () {
    $('.loading').fadeOut(1000, function () {
        $('body').css({ overflow: 'auto' });
    });
});

