const LS_POSITION = "user-position";
const API_KEY = "bcee4a724fadf3def578994eb97bf6fc";

const CN_WETTERGRAD = ".js-wetter__grad";
const CN_WETTERSTADT = ".js-wetter__stadt";
const CN_WETTERGRADMINMAX = ".js-wetter__grad-minmax";

const wetterGrad = document.querySelector(CN_WETTERGRAD);
const wetterGradMinMax = document.querySelector(CN_WETTERGRADMINMAX);
const wetterStadt = document.querySelector(CN_WETTERSTADT);

function getWetter(position) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const temperature = json.main.temp;
            const maxTemp = json.main.temp_max;
            const minTemp = json.main.temp_min;
            const stadtName = json.name;
            const staatName = json.sys.country;
            wetterGrad.innerText = `${temperature}℃`;
            wetterStadt.innerText = `${stadtName}, ${staatName}`;
            wetterGradMinMax.innerText = `${minTemp}℃ ~ ${maxTemp}℃`;
        });
}

function updatePosition(positionObj) {
    localStorage.setItem(LS_POSITION, JSON.stringify(positionObj));
}

function getPositionSuc(position) {
    const positionLatitude = position.coords.latitude;
    const positionLongitude = position.coords.longitude;

    const positionObj = {
        latitude: positionLatitude,
        longitude: positionLongitude,
    };
    updatePosition(positionObj);
    getWetter(positionObj);
}

function getPositionError() {
    console.log("Deine Position konnte nicht heruntergeladen werden");
}

function askForPosition() {
    navigator.geolocation.getCurrentPosition(getPositionSuc, getPositionError);
}

function loadPosition() {
    const loadedPosition = localStorage.getItem(LS_POSITION);
    if (loadedPosition === null) {
        askForPosition();
    } else {
        const parsedPositon = JSON.parse(loadedPosition);
        getWetter(parsedPositon);
    }
}

function init() {
    loadPosition();
}

init();
