// console.log('Oh, hey');
// When the user clicks on a planet card all the cards dissapear and the only thing displayed on the page is information about the planet they clicked on. 

// When the user clicks on the red X on a single planet that information goes away and all the original cards are displayed again.
//   document.getElementById('close').addEventListener('click', startApplication);

// When the user types in the search bar, planet cards should only show up if they have what is typed in their name or description.
// SEARCH BAR
// domString +=    `<div class="col-lg-6">`;
//     domString +=    `<div class="input-group">`;
//     domString +=    `<input type="text" class="form-control" placeholder="Search for...">`;
//     domString +=    `<span class="input-group-btn">`;
//     domString +=    `<button class="btn btn-default" type="button">Go!</button>`;
//     domString +=    `</span>`;
//     domString +=    `</div>`;
// GATHER INPUT FROM SEARCH BAR
// const getUserInput = e.target.....value;
// CLEAR SEARCH BAR
// const clearSearchBox = (input) => {
//     input.value = "";
// }

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

// BUILD INITIAL PLANET CARDS 
const buildPlanetCards = (planetsArray) => {
    let domString = "";
    planetsArray.forEach((planet) => { 
        domString += `<div class="original-card">`;
        domString +=    `<h2 class="planet-name">${planet.name}</h2>`;
        domString +=    `<img class="hidden image" src="${planet.imageUrl}" alt="">`;
        domString += `</div>`;
    });
    printToDom(domString, 'planet-holder');
    addEventListeners();
};

// BUILD PLANET CARD
    const planetCard2 = (planet) => {
        let domString2 = "";
        domString2 += `<div class="exp-card">`;
        domString2 +=   `<button id="close">X</button>`;
        domString2 +=   `<h2 class="exp-name">${planet.name}</h2>`;
        domString2 +=   `<img class="exp-img" src="${planet.imageUrl}" alt="planet-image">`;
        if(planet.numberOfMoons === 0){
            domString2 +=   `<h4>${planet.name} does not have any moons.</h4>`;
        } else if (planet.numberOfMoons === 1){
            domString2 +=   `<h4>${planet.name} has one moon.</h4>`;
        } else {
            domString2 +=   `<h4>${planet.name} has ${planet.numberOfMoons} moons.</h4>`;
            domString2 +=   `<h4>${planet.nameOfLargestMoon} is it's largest moon.</h4>`;
        }
        if(planet.isGasPlanet === false){
            domString2 +=   `<h4>${planet.name} is not a gas planet.</h4>`;
        } else {
            domString2 +=   `<h4>${planet.name} is a gas planet.</h4>`;
        }
        domString2 +=   `<p>${planet.description}</p>`;
        domString2 += `</div>`;
        printToDom(domString2, 'big-card');
};

const hidePlanetCards = (e) => { 
    let planetsCollection = document.getElementsByClassName('original-card');
// LOOP OVER PLANET CARDS AND HIDE
    for (var j = 0; j < planetsCollection.length; j++) {
            planetsCollection[j].classList.add('hidden'); 
    };
    newApplication(e.target.currentSrc);
};  

// DETERMINE WHICH PLANET IS CLICKED
const clickPlanet = (e) => {
    hidePlanetCards(e);
};

// ON MOUSE-ENTER, SHOW PLANET IMAGE 
const previewPlanet = (e) => {
    e.target.children[1].classList.remove('hidden');
    e.target.children[0].classList.add('hidden'); 
};

// ADD EVENT-LISTENERS FOR MOUSE & CLICK EVENTS
const addEventListeners = () => {
    let planets = document.getElementsByClassName('original-card');
    for(let i = 0; i <planets.length; i++){
      planets[i].addEventListener('mouseenter', previewPlanet);
      planets[i].addEventListener('click', clickPlanet);
    };
};  

// XHR CALL FOR BIG CARD
const newApplication = (planetId) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", function () {
        const data = JSON.parse(this.responseText).planets;
        for (let i = 0; i < data.length; i++)
        if (data[i].imageUrl === planetId) {
        planetCard2(data[i]);
        }
    });
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "./planets.json");
    myRequest.send();
};

function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    buildPlanetCards(data.planets);
}

function executeThisCodeIfXHRFails() {
    console.log('something went wrong');
}

const startApplication = () => {
    // stores the request as a variable
    let myRequest = new XMLHttpRequest();
    // what to do after the file loads
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    // what to do if there is a problem loading the page
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    // what to "do" and where to get it
    myRequest.open("GET", "./planets.json");
    // initiates the request
    myRequest.send();
};

startApplication();
