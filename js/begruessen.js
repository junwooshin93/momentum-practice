const CN_BEGRUESSEN_TITLE = ".js-begruessen";
const CN_BEGRUESSEN_FORM = ".js-begruessen__form";
const CN_BEGRUESSEN_TEXT = ".js-begruessen__text";
const CN_SHOWING = "showing";
const CN_HIDE = "hide";

const begTitle = document.querySelector(CN_BEGRUESSEN_TITLE);
const begForm = document.querySelector(CN_BEGRUESSEN_FORM);
const begInput = document.querySelector(CN_BEGRUESSEN_TEXT);

const LS_USERNAME = "username";

function zeigenName(userName) {
    begTitle.innerText = `Guten Tag! ${userName}`;
    hideForm();
}

function callName() {
    const userName = localStorage.getItem(LS_USERNAME);
    zeigenName(userName);
}

function saveName(event) {
    event.preventDefault();
    const userName = begInput.value;
    localStorage.setItem(LS_USERNAME, userName);

    callName();
}

function showObjekt(obj) {
    obj.classList.remove(CN_HIDE);
    obj.classList.add(CN_SHOWING);
}

function hideObjekt(obj) {
    obj.classList.remove(CN_SHOWING);
    obj.classList.add(CN_HIDE);
}

function hideForm() {
    hideObjekt(begForm);
    showObjekt(begTitle);
}

function hideTitle() {
    hideObjekt(begTitle);
    showObjekt(begForm);
}

function showForm() {
    hideTitle();
    begForm.addEventListener("submit", saveName);
}

function init() {
    const userName = localStorage.getItem(LS_USERNAME);
    if (userName === null) {
        showForm();
    } else {
        zeigenName(userName);
    }
}

init();
