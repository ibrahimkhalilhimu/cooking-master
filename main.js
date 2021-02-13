document.getElementById("searchBtn").addEventListener("click",getInput)

function getInput() {
   const input = document.getElementById("inputSearch").value
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
   .then(response => response.json())
   .then(data => searchResult(data))

   .catch(err => {
    document.getElementById('list').innerHTML = '';
    document.getElementById("cardDetails").innerHTML = ''
    document.getElementById('notFind').innerHTML = `
    <h3>Sorry! We Can not find search result</h3>
    `;

});
}


function searchResult(show) {
    let data = show.meals
    console.log(data);
    let list = []

    for (let i = 0; i < data.length; i++) {
        const item ={
            name:data[i].strMeal,
            photo: data[i].strMealThumb,
            id:data[i].idMeal,
        }
        list.push(item)
    }
 

    console.log(list);
   
    document.getElementById('notFind').innerHTML = ''
    let display = document.getElementById("list")
    display.innerHTML = ''
    document.getElementById("cardDetails").innerHTML = ''
for (let i = 0; i < list.length; i++) {
    const {name,photo,id} = list[i];
    display.innerHTML += 
    `<div class="col-md-4">
   <div class="card mb-3" data-id='${id}'>
      <img class="card-img-top" src=${photo} alt="image cannot support">
      <div class="card-body">
        <h5 class="card-title text-center">${name}</h5>
      </div>
      </div>
      </div>
    `
}

}

document.getElementById("list").addEventListener("click",resultDetails)

function resultDetails(e) {
    e.preventDefault();
    let mealItems = e.target.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
    .then(response => response.json())
    .then(data => 
        details(data.meals)
    )
}
function details(meal) {
   console.log(meal);
   meal = meal[0];
   document.getElementById('notFind').innerHTML = ''
   document.getElementById("cardDetails").innerHTML = ''
   document.getElementById("cardDetails").innerHTML += 
   ` <div class="card my-3 w-75">
   <img class="card-img-top" src=${meal.strMealThumb} alt="image cannot support" >
   <div class="card-body">
     <h4 class="card-title">${meal.strMeal}</h4>
     <h6>Ingredients</h6>
     <ul class="list-item">
     <li><input type="checkbox"checked="checked" disable> ${meal.strMeasure1}</li>
     <li><input type="checkbox"checked="checked"> ${meal.strMeasure2}</li>
     <li> <input type="checkbox"checked="checked"> ${meal.strMeasure3}</li>
     <li> <input type="checkbox"checked="checked"> ${meal.strMeasure4}</li>
     <li> <input type="checkbox"checked="checked"> ${meal.strMeasure5}</li>
     <li> <input type="checkbox"checked="checked"> ${meal.strMeasure6}</li>
     </ul>
   </div>
   </div>
   
   `
}