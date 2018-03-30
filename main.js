// console.log('Oh, hey');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = planetsArray => {
    let domString = "";
    planetsArray.forEach((planets) => { 
        domString += `<div class ="card">`;
        domString += `<h1>${planets.name}</h1>`;
        domString += `<img class="image" src="${planets.imageUrl}" alt="">`;
        // domString += `<p class="text">${planets.description}</p>`;
        domString += `</div>`;
    });
    printToDom(domString, 'planet-holder');
};



function executeThisCodeIfXHRFails() {
    console.log('something went wrong');
}

function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
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