"use strict";
// TO DO LIST 



// lista attività 
let attivita = [];
// aggiungere nuove attività
function aggiungiAttivita(text) {
    const attivitaNuova = {
        text,
        completed: false
    }; // nuovo oggetto da aggiungere all'array delle attività inizializzato
    attivita.push(attivitaNuova); // aggiunge all'array la nuova attività
    visualizzaAttivita(); // la visualizzazione della lista
}


// segnare l'attività come completata quindi completed 
function completaAttivita(index) {
    attivita[index].completed = !attivita[index].completed;
    visualizzaAttivita();
}

// eliminare attivita 
function eliminaAttivita(index) {
    attivita.splice(index, 1); // comando per rimuovere l'elemento dall'array. Stesso principio del completare l'attività (evento click)
    visualizzaAttivita();
}

// la funzione visualizzaTodo: per la visualizzazione della lista dall'html 
function visualizzaAttivita() {
    const elementoLista = document.getElementById('content'); // dal div presente in index.html 
    if (elementoLista) {
        elementoLista.innerHTML = ''; // Se è presente l'elemento, pulisce la lista esistente. Evito i duplicati al click 
        attivita.forEach((attivita, index) => {
            const elemento = document.createElement('li');
            elemento.classList.add('list-group-item', 'd-flex');
            elemento.textContent = attivita.text;
            if (attivita.completed) {
                elemento.style.textDecoration = 'line-through'; // se l'attività è completata, si sbarra
            }
            elemento.addEventListener('click', () => completaAttivita(index));
            elemento.addEventListener('dblclick', () => eliminaAttivita(index));
            elementoLista.appendChild(elemento); // senza questo non appare la lista
        });
    }
}
function aggiungiNuovaAttivita() {
    // prendo gli elementi dall'html
    const aggiungiAttivitaBtn = document.getElementById('aggiungiAttivitaBtn');
    const nuovaAttivita = document.getElementById('nuovaAttivita'); // Cast dell'elemento a HTMLInputElement
    // se l'utente aggiunge l'attività 
    if (aggiungiAttivitaBtn && nuovaAttivita) {
        aggiungiAttivitaBtn.addEventListener('click', () => {
            const attivitaText = nuovaAttivita.value.trim(); // 'nuovaAttivita' è un input e ha la proprietà 'value'
            if (attivitaText !== '') {
                aggiungiAttivita(attivitaText); // aggiunge all'array l'attività
                nuovaAttivita.value = ''; // Reset del campo input
            }
        });
    }
}

aggiungiNuovaAttivita();
visualizzaAttivita();
aggiungiAttivita('Prima attivita di prova');
aggiungiAttivita('Seconda attivita di prova');
