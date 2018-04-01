// console.log('Oh, hey');
// When the user clicks on a planet card all the cards dissapear and the only thing displayed on the page is information about the planet they clicked on. 

// When the user clicks on the red X on a single planet that information goes away and all the original cards are displayed again.

// When the user types in the search bar, planet cards should only show up if they have what is typed in their name or description.

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};
// BUILD INITIAL PLANET CARDS 
const planetCard = (planetsArray) => {
    let domString = "";
    planetsArray.forEach((planets) => { 
        domString += `<div class ="original-card">`;
        domString += `<h2 class="planet-name">${planets.name}</h2>`;
        domString += `<img class="hidden" src="${planets.imageUrl}" alt="">`;
        domString += `</div>`;
    });
    printToDom(domString, 'planet-holder');
};

// BUILD ENLARGED PLANET CARDS
const planetCard2 = (planet) => {
    let expandedCard = "";
    domString2 += `<div class="exp-card">`;
    domString2 +=   `<button id="close">X</button>`;
    domString2 +=   `<h2 class="exp-name">${planets.name}</h2>`;
    domString2 +=   `<img class="exp-img" src="${planets.imageUrl}" alt="">`;
    if(planets.numberOfMoons === 0){
        domString2 +=   `<h4>${planets.name} does not have any moons.</h4>`;
    } else if (planets.numberOfMoons === 1){
        domString2 +=   `<h4>${planets.name} has one moon.</h4>`;
    } else {
        domString2 +=   `<h4>${planets.name} has ${planets.numberOfMoons} moons.</h4>`;
        domString2 +=   `<h4>${planets.nameOfLargestMoon} is it's largest moon.</h4>`;
    }
    if(planets.isGasPlanet === false){
        domString2 +=   `<h4>${planets.name} is not a gas planet.</h4>`;
    } else {
        domString2 +=   `<h4>${planets.name} is a gas planet.</h4>`;
    }
    domString2 += `<p>${planets.description}</p>`;
    domString2 += `</div>`;
    printToDom(domString2, 'planet-holder');
};

 const clickPlanet = (e) => {
     let 
 }

// ON MOUSE-ENTER, SHOW PLANET IMAGE 
const previewPlanet = (e) => {
    e.target.children[1].classList.remove('hidden');
    e.target.children[0].classList.add('hidden');
};
// ON MOUSE-OUT, HIDE PLANET IMAGE
const exitPreview = (e) => {
    e.target.children[0].classList.remove('hidden');
    e.target.children[1].classList.add('add');
};
// ADD EVENTLISTENERS FOR MOUSE & CLICK EVENTS
const addEventListeners = () => {
    let planets = document.getElementsByClassName('original-card');
    for(let i = 0; i <planets.length; i++){
      planets[i].addEventListener('mouseenter', previewPlanet);
      planets[i].addEventListener('mouseout', exitPreview);
      planets[i].addEventListener('click', clickPlanet); 
    }
  };

// XHR REQUEST TO LOAD DATA FROM planets.json & START APPLICATION
function executeThisCodeIfXHRFails() {
    console.log('something went wrong');
}

function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    planetCard(data.planets);
    // add..EventListener();
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "planets.json");
    myRequest.send();
};

startApplication();