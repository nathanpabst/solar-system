// console.log('Oh, hey');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
};

const buildDomString = planetsArray => {
    let domString = "";
    for (let i = 0; i < planetsArray.length; i++) {
        domString += `<h1>${planetsArray[i].name}</h1>`;
    }
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