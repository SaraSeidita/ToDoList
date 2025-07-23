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
        localStorage.setItem('ultimaVisita', dataCorrente); // aggiorna la data
        localStorage.setItem('todos', JSON.stringify(attivita)); // salvo i nuovi item del giorno
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
    const attivitaNuova = { text, completed: false, dataAggiunta: new Date() };
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
        elementoLista.innerHTML = ''; // Pulisce la lista esistente, per evitare i duplicati
        attivita.forEach((attivita, index) => {
            // aggiungo il checkbox per completare le attività
            const checkbox = document.createElement('input'); // creo l'elemento checkbox che è un input
            checkbox.type = 'checkbox'; // aggiungo il tipo dell'input, ossia checkbox 
            checkbox.checked = attivita.completed; // se è checkato, è completata 
            checkbox.classList.add('form-check-input', 'm-2'); // lo stile
            checkbox.addEventListener('change', () => completaAttivita(index));
            const elemento = document.createElement('li');
            elemento.classList.add('list-group-item'); // aggiungo lo stile css boostrap all'elemento li
            const divSuperiore = document.createElement('div');
            divSuperiore.classList.add('d-flex', 'align-items-center');
            const testoAttivita = document.createElement('span');
            divSuperiore.appendChild(checkbox); // checkbox nel div superiore 
            divSuperiore.appendChild(testoAttivita); // testo attività div superiore
            const data = new Date(attivita.dataAggiunta);
            const dataFormattata = data.toLocaleString(); // es: "23/07/2025, 14:32:01"
            const infoData = document.createElement('span');
            infoData.textContent = `${dataFormattata}`;
            infoData.classList.add('text-muted', 'm-2');
            testoAttivita.textContent = attivita.text;
            if (attivita.completed) {
                testoAttivita.style.textDecoration = 'line-through'; // sbarro l'item quando l'attività è completata
                infoData.style.textDecoration = 'line-through';
            }
            const divInferirore = document.createElement('div');
            divInferirore.appendChild(infoData);
            elemento.appendChild(divSuperiore);
            elemento.appendChild(divInferirore);
            // cancellare l'attività con il doppio click. COnfermare prima di cancellare
            elemento.addEventListener('dblclick', () => {
                const conferma = confirm(`Sei sicuro di voler eliminare: "${attivita.text}"?`);
                if (conferma) {
                    eliminaAttivita(index);
                }
            });
            // aggiungo elemento alla lista
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
    const erroreAttivita = document.getElementById('erroreAttivita');
    if (aggiungiAttivitaBtn && nuovaAttivita && erroreAttivita) {
        aggiungiAttivitaBtn.addEventListener('click', () => {
            const attivitaText = nuovaAttivita.value.trim();
            if (attivitaText === '') {
                erroreAttivita.textContent = 'Inserisci un\'attività prima di aggiungere.';
                erroreAttivita.style.display = 'block';
            }
            else {
                aggiungiAttivita(attivitaText); // Aggiungi all’array o lista
                nuovaAttivita.value = '';
                erroreAttivita.style.display = 'none'; // Nascondi errore
            }
        });
    }
}
// Funzione di inizializzazione dell'applicazione
function initApp() {
    checkList(); // Verifica e carica la lista se necessario
    visualizzaAttivita(); // Visualizza le attività già caricate
    aggiungiNuovaAttivita(); // Gestisce l'aggiunta di nuove attività
}
// Inizializza l'app
initApp();
