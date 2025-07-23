"use strict";
// TO DO LIST 
// Lista delle attività
let attivita = [];
// Funzione per verificare se è un nuovo giorno e fare il reset della lista
function checkList() {
    const ultimaVisita = localStorage.getItem('ultimaVisita');
    const dataCorrente = new Date().toLocaleDateString(); // Aggiungi le parentesi per ottenere la data
    // Se è un nuovo giorno, resetta la lista e aggiorna la data di ultima visita
    if (ultimaVisita !== dataCorrente) {
        attivita = []; // Resetta la lista
        localStorage.setItem('ultimaVisita', dataCorrente);
        localStorage.setItem('todos', JSON.stringify(attivita));
    }
    else {
        // Altrimenti carica la lista salvata dal localStorage
        const salvaLista = localStorage.getItem('todos');
        if (salvaLista) {
            attivita = JSON.parse(salvaLista); // Carica le attività salvate
        }
    }
}
// Aggiungere nuove attività
function aggiungiAttivita(text) {
    const attivitaNuova = { text, completed: false };
    attivita.push(attivitaNuova);
    salvaItem(); // Salva la lista aggiornata nel localStorage
    visualizzaAttivita(); // Rende visibile la lista aggiornata
}
// Completa un'attività
function completaAttivita(index) {
    attivita[index].completed = !attivita[index].completed;
    salvaItem(); // Salva la lista aggiornata nel localStorage
    visualizzaAttivita(); // Rende visibile la lista aggiornata
}
// Elimina un'attività
function eliminaAttivita(index) {
    attivita.splice(index, 1); // Rimuove l'elemento
    salvaItem(); // Salva la lista aggiornata nel localStorage
    visualizzaAttivita(); // Rende visibile la lista aggiornata
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
// Funzione per salvare la lista nel localStorage
function salvaItem() {
    if (typeof (Storage) !== "undefined") {
        // Salva la lista nel localStorage
        localStorage.setItem('todos', JSON.stringify(attivita));
        console.log('Lista salvata nel localStorage');
    }
    else {
        console.error('localStorage non è supportato');
    }
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
// Funzione di inizializzazione
function initApp() {
    checkList(); // Verifica e carica la lista se necessario
    visualizzaAttivita(); // Visualizza le attività già caricate
    aggiungiNuovaAttivita(); // Gestisce l'aggiunta di nuove attività
}
// Inizializza l'app
initApp();
