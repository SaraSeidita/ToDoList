"use strict";
// TO DO LIST 
// lista attività 
let todo = [];
// aggiungere nuove attività
function addTodo(text) {
    const newTodo = {
        text,
        completed: false
    }; // nuovo oggetto da aggiungere all'array delle attività inizializzato
    todo.push(newTodo); // aggiunge all'array la nuova attività
    visualizzaTodo(); // la visualizzazione della lista
}
// segnare l'attività come completata quindi completed 
function completeTodo(index) {
    todo[index].completed = !todo[index].completed;
    visualizzaTodo();
}
// la funzione visualizzaTodo: per la visualizzazione della lista dall'html 
function visualizzaTodo() {
    const elementoLista = document.getElementById('content'); // dal div presente in index.html 
    if (elementoLista) {
        elementoLista.innerHTML = ''; // Se è presente l'elemento, pulisce la lista esistente. Evito i duplicati al click 
        todo.forEach((todo, index) => {
            const elemento = document.createElement('li');
            elemento.classList.add('list-group-item', 'd-flex');
            elemento.textContent = todo.text;
            if (todo.completed) {
                elemento.style.textDecoration = 'line-through'; // se l'attività è completata, si sbarra
            }
            elemento.addEventListener('click', () => completeTodo(index));
            elementoLista.appendChild(elemento); // senza questo non appare la lista
        });
    }
}
visualizzaTodo();
addTodo('Inizio esercizio');
addTodo('Prova css');
