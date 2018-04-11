var app = function(){
  const url = 'https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json'
  makeRequest(url, requestComplete)

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers)

}

const populateList = function(beers) {
  const ul = document.getElementById('beer-list')
  beers.forEach(function(beer, index) {
    let li = document.createElement('li')
    li.innerText = beer.name + " " + "<img src='beer.image_url'/>"
    li.value = index
    ul.appendChild(li)
    debugger;
  })
}

window.addEventListener('load', app);