// TO DO LIST 

// Creazione interfaccia per i tipi di dati 
interface ToDo {
    text: string;
    completed: boolean;
}

// Lista delle attività
let attivita: ToDo[] = [];

// Funzione per verificare se è un nuovo giorno e fare il reset della lista
function checkList(): void {
    const ultimaVisita = localStorage.getItem('ultimaVisita');
    const dataCorrente = new Date().toLocaleDateString(); // Aggiungi le parentesi per ottenere la data

    // Se è un nuovo giorno, resetta la lista e aggiorna la data di ultima visita
    if (ultimaVisita !== dataCorrente) {
        attivita = [];  // Resetta la lista
        localStorage.setItem('ultimaVisita', dataCorrente); 
        localStorage.setItem('todos', JSON.stringify(attivita)); 
    } else {
        // Altrimenti carica la lista salvata dal localStorage
        const salvaLista = localStorage.getItem('todos');
        if (salvaLista) {
            attivita = JSON.parse(salvaLista); // Carica le attività salvate
        }
    }
}

// Aggiungere nuove attività
function aggiungiAttivita(text: string): void {
    const attivitaNuova: ToDo = { text, completed: false };
    attivita.push(attivitaNuova);
    salvaItem();  // Salva la lista aggiornata nel localStorage
    visualizzaAttivita();  // Rende visibile la lista aggiornata
}

// Completa un'attività
function completaAttivita(index: number): void {
    attivita[index].completed = !attivita[index].completed;
    salvaItem();  // Salva la lista aggiornata nel localStorage
    visualizzaAttivita();  // Rende visibile la lista aggiornata
}

// Elimina un'attività
function eliminaAttivita(index: number): void {
    attivita.splice(index, 1); // Rimuove l'elemento
    salvaItem();  // Salva la lista aggiornata nel localStorage
    visualizzaAttivita();  // Rende visibile la lista aggiornata
}

// Visualizza la lista delle attività
function visualizzaAttivita(): void {
    const elementoLista = document.getElementById('content');
    if (elementoLista) {
        elementoLista.innerHTML = '';  // Pulisce la lista esistente
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
function salvaItem(): void {
    if (typeof(Storage) !== "undefined") {
            // Salva la lista nel localStorage
            localStorage.setItem('todos', JSON.stringify(attivita));
            console.log('Lista salvata nel localStorage');
        } else {
            console.error('localStorage non è supportato');
        }
}

// Gestisce l'aggiunta di una nuova attività
function aggiungiNuovaAttivita(): void {
    const aggiungiAttivitaBtn = document.getElementById('aggiungiAttivitaBtn');
    const nuovaAttivita = document.getElementById('nuovaAttivita') as HTMLInputElement;

    if (aggiungiAttivitaBtn && nuovaAttivita) {
        aggiungiAttivitaBtn.addEventListener('click', () => {
            const attivitaText = nuovaAttivita.value.trim();
            if (attivitaText !== '') {
                aggiungiAttivita(attivitaText);  // Aggiungi l'attività all'array
                nuovaAttivita.value = '';  // Reset del campo input
            }
        });
    }
}

// Funzione di inizializzazione
function initApp(): void {
    checkList();  // Verifica e carica la lista se necessario
    visualizzaAttivita();  // Visualizza le attività già caricate
    aggiungiNuovaAttivita();  // Gestisce l'aggiunta di nuove attività
}

// Inizializza l'app
initApp();
