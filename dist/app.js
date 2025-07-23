"use strict";
// TO DO LIST 
// lista attività 
let attivita = [];
// salvare item?
// aggiungere nuove attività
function aggiungiAttivita(text) {
    const attivitaNuova = { text, completed: false };
    attivita.push(attivitaNuova);
    salvaItem();
    visualizzaAttivita();
}
// Completa un'attività
function completaAttivita(index) {
    attivita[index].completed = !attivita[index].completed;
    salvaItem();
    visualizzaAttivita();
}
// Elimina un'attività
function eliminaAttivita(index) {
    attivita.splice(index, 1); // Rimuove l'elemento
    salvaItem();
    visualizzaAttivita();
}
// Visualizza la lista delle attività
function visualizzaAttivita() {
    const elementoLista = document.getElementById('content');
    if (elementoLista) {
        elementoLista.innerHTML = ''; // Pulisce la lista esistente
        attivita.forEach((attivita, index) => {
            const elemento = document.createElement('li');
            elemento.classList.add('list-group-item', 'd-flex');
            elemento.textContent = attivita.text;
            if (attivita.completed) {
                elemento.style.textDecoration = 'line-through';
            }
            elemento.addEventListener('click', () => completaAttivita(index));
            elemento.addEventListener('dblclick', () => eliminaAttivita(index));
            elementoLista.appendChild(elemento);
        });
    }
}
function salvaItem() {
    localStorage.setItem('todos', JSON.stringify(attivita));
}
// Gestisce l'aggiunta di una nuova attività
function aggiungiNuovaAttivita() {
    const aggiungiAttivitaBtn = document.getElementById('aggiungiAttivitaBtn');
    const nuovaAttivita = document.getElementById('nuovaAttivita');
    if (aggiungiAttivitaBtn && nuovaAttivita) {
        aggiungiAttivitaBtn.addEventListener('click', () => {
            const attivitaText = nuovaAttivita.value.trim();
            if (attivitaText !== '') {
                aggiungiAttivita(attivitaText); // Aggiungi l'attività all'array
                nuovaAttivita.value = ''; // Reset del campo input
            }
        });
    }
}
aggiungiNuovaAttivita();
visualizzaAttivita();
aggiungiAttivita('Prima attivita di prova');
aggiungiAttivita('Seconda attivita di prova');
