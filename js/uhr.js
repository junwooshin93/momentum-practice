const CN_UHR = ".js-uhr";

const uhr = document.querySelector(CN_UHR);

function getCurrentTime() {
    const date = new Date();
    const stunden = date.getHours();
    const minuten = date.getMinutes();
    uhr.innerText = `${stunden < 10 ? `0${stunden}` : stunden}:${
        minuten < 10 ? `0${minuten}` : minuten
    }`;
}

function init() {
    getCurrentTime();
    setInterval(getCurrentTime, 1000);
}

init();
