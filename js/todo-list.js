const LS_TODOS = "to-do";

const CN_LISTEFORM = ".js-liste__form";
const CN_LISTETEXT = ".js-liste__form__text";
const CN_LISTELISTE = ".js-liste__liste";

const CN_LISTETODOS = "css-liste__todos";
const CN_LISTEDELBTN = "css-liste__delbtn";

const listeForm = document.querySelector(CN_LISTEFORM);
const listeInput = document.querySelector(CN_LISTETEXT);
const listeListe = document.querySelector(CN_LISTELISTE);

let toDos = [];

function removeFromToDos(toDoId) {
    let processedToDos = toDos.filter(function (element) {
        return element.id !== parseInt(toDoId);
    });

    for (let index = toDoId - 1; index < processedToDos.length; index++) {
        processedToDos[index].id = index + 1;
    }

    toDos = processedToDos;
    updateToDos();
}

function deleteToDos(event) {
    const toDoBtn = event.target;
    const toDoList = toDoBtn.parentNode;
    const toDoId = toDoList.id;

    removeFromToDos(toDoId);
}

function createToDoList(toDoText, toDoId) {
    const toDoList = document.createElement("li");
    toDoList.id = toDoId;
    toDoList.classList.add(CN_LISTETODOS);

    const toDoBtn = document.createElement("button");
    toDoBtn.classList.add(CN_LISTEDELBTN);
    toDoBtn.innerText = "Löschen";
    toDoBtn.addEventListener("click", deleteToDos);

    const toDoSpan = document.createElement("span");
    toDoSpan.innerText = toDoText;

    toDoList.appendChild(toDoSpan);
    toDoList.appendChild(toDoBtn);

    return toDoList;
}

function paintToDos() {
    toDos.forEach(function (element) {
        const toDoList = createToDoList(element.text, element.id);
        listeListe.appendChild(toDoList);
    });
}

function resetListeListe() {
    const listeNodeArray = listeListe.childNodes;
    const listNodeLength = listeNodeArray.length;
    if (listNodeLength > 0) {
        for (let index = 0; index < listNodeLength; index++) {
            const toDoList = listeListe.childNodes.item(0);
            listeListe.removeChild(toDoList);
        }
    }
}

function setUpToDos(parsedToDos) {
    toDos = parsedToDos;
    resetListeListe();
    paintToDos();
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(LS_TODOS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        setUpToDos(parsedToDos);
    }
}

function updateToDos() {
    localStorage.setItem(LS_TODOS, JSON.stringify(toDos));
    loadToDos();
}

function saveToDos(event) {
    event.preventDefault();
    const toDoText = listeInput.value;
    listeInput.value = "";
    const toDoId = toDos.length + 1;
    const toDoObj = {
        text: toDoText,
        id: toDoId,
    };
    toDos.push(toDoObj);
    updateToDos();
}

function init() {
    loadToDos();
    listeForm.addEventListener("submit", saveToDos);
}

init();
