// When the user types in the search bar, planet cards should only show up if they have what is typed in their name or description.
// SEARCH BAR
// GATHER INPUT FROM SEARCH BAR
const getUserInput = (e) => {
    let rawInput = document.getElementById('input').value;
    document.getElementById('input').value = '';
    // console.log(rawInput);
    washInput(rawInput);
};

const washInput = (input) => {
    input = input.replace(/[^A-Za-z/s]/g, "").toLowerCase();
    let inputArray = input.split(" ");
    // console.log(inputArray);
    searchBarXHR(inputArray);

        // findSearchMatches(words);

}
// findSearchMatches = () => {
// where does the info i need live? data.planets .. see executeThisCodeAfterFileLoaded function
// loop through planet.name and planet.description to find matches
// }

// showSearchMatches = () => {
// create new XHR that calls the buildPlanetCards function
// }

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

// BUILD SMALL PLANET CARDS 
const buildPlanetCards = (input) => {
    let domString = "";
    input.forEach((planet) => { 
        domString += `<div class="original-card">`;
        domString +=    `<h2 class="planet-name">${planet.name}</h2>`;
        domString +=    `<img class="hidden image" src="${planet.imageUrl}" alt="">`;
        domString += `</div>`;
    });
    printToDom(domString, 'planet-holder');
    addEventListeners();
};

// BUILD BIG PLANET CARD
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
        xEventListener();
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

const xEventListener = () => {
    let closeButton = document.getElementById('close');
    closeButton.addEventListener('click', startApplication);
};

const searchButtonEvent = () => {
    let search = document.getElementById('search-btn');
    search.addEventListener('click', getUserInput);
};

function searchXHRsuccess() {
    const data = JSON.parse(this.responseText);
    buildPlanetCards(matches);
}
// XHR CALL FOR SEARCH TERMS
const searchBarXHR = (input) => {
    let myRequest = new XMLHttpRequest(); 
    if (typeof(input) !== "object") {
        myRequest.addEventListener('load', searchXHRsuccess);
    } else {
        myRequest.addEventListener('load', function() {
            const data = JSON.parse(this.responseText);
            let matches = [];
            for (let i = 0; i < data.planets.length; i++) {
                if (data.planets[i].name.toLowerCase().includes(input[0]) || data.planets[i].description.toLowerCase().includes(input[0])) {
                    matches.push(data.planets[i]);
                }
            } if (matches.length > 0) {
                buildPlanetCards(matches);
            } else {
                alert('No matches found');
            }
        })
    }
    myRequest.addEventListener("error", executeThisCodeIfXHRFails);
    myRequest.open("GET", "./planets.json");
    myRequest.send();
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
    // findSearchMatches(data.planets);
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
searchButtonEvent();
startApplication();
