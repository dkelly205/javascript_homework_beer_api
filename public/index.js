var app = function(){
  const url = 'https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json'
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', function(){
    var beersData = JSON.parse(request.responseText);
    renderDropDown(beersData);
  })
  request.send();
}

//list beers
var renderList = function(beerObjects){
  var mainDiv = document.getElementById("main");
  var list = document.createElement('ul');
  beerObjects.forEach(function(beer){
    var li = createListItem(beer);
    list.appendChild(li);
  })
  mainDiv.appendChild(list);
}

// createListItem
var createListItem = function(beerObject){
  var li = document.createElement('li');
  li.innerText = beerObject.name;
  var img = createImage(beerObject);
  li.appendChild(img);
  var ingredientsList = createIngredientsList(beerObject);
  li.appendChild(ingredientsList);
  return li;
}

//createImage
var createImage = function(beerObject){
  var img = document.createElement('img');
  img.src = beerObject.image_url;
  img.alt = beerObject.name;
  img.height = 200;
  img.width = 100;
  return img;
}

//createIngredientsList
var createIngredientsList = function(beerObject){
  var list = document.createElement('ul');
  var ingredients = combineIngredients(beerObject);
  ingredients.forEach(function(ingredient){
    var listItem = document.createElement('li');
    listItem.innerText = ingredient;
    list.appendChild(listItem);
  })
  return list;
}

//combineIngredients
var combineIngredients = function(beerObject){
  var malts = beerObject.ingredients.malt;
  var hops = beerObject.ingredients.hops;
  var combinedIngredients = malts.concat(hops);
  var ingredientNameStrings = combinedIngredients.map(function(ingredient){
    return ingredient.name;
  })
  ingredientNameStrings.push(beerObject.ingredients.yeast);
  var uniqueNames = removeDuplicates(ingredientNameStrings);
  return uniqueNames;
}

//removeDuplicates
var removeDuplicates = function(ingredients){
  var uniqueIngredients = ingredients.filter(function(ingredient, currentIndex){
    var firstIndexOfIngredient = ingredients.indexOf(ingredient);
    return firstIndexOfIngredient === currentIndex;
  });
  return uniqueIngredients;
}

//renderDropDown
var renderDropDown = function(beersData){
  var dropDown = createDropDown(beersData);
  var mainDiv = document.getElementById('main');
  mainDiv.appendChild(dropDown);
}

//crreateDropDown
var createDropDown = function(beers){
  var select = document.createElement('select');
  var defaultOption = document.createElement('option');
  defaultOption.innerText = 'Select a beer';
  defaultOption.value = -1;
  defaultOption.disabled = true;
  select.appendChild(defaultOption);
  beers.forEach(function(beer, index){
    var optionTag = createOptionTag(beer.name, index);
    select.appendChild(optionTag);
  })

  select.addEventListener('change', function(event){
    var selectedIndex = event.target.value;
    selectBeer(beers, selectedIndex)
  })
  return select;
}

//createOptionTag
var createOptionTag = function(text, index){
  var option = document.createElement('option');
  option.innerText = text;
  option.value = index;
  return option;
}
//selectBeer

var selectBeer = function(beers, selectedIndex){
  var beer = beers[selectedIndex];
  var beerElement = createListItem(beer);
  renderSingleBeer(beerElement);
}
//renderSingleBeer
var renderSingleBeer = function(beerElement){
  var mainDiv = document.getElementById('main');
  var existingBeerListItem = document.querySelector('li');
  if(existingBeerListItem != null){
    mainDiv.removeChild(existingBeerListItem);
  }
  mainDiv.appendChild(beerElement);
}


window.addEventListener('load', app);
