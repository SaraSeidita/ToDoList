// TO DO LIST 

// creazione interfaccia per i tipi di dati 

interface ToDo {
    text: string;
    completed: boolean;
}


// lista attività 

let todo: ToDo[] = [];

// aggiungere nuove attività

function addTodo(text: string) : void {

    const newTodo: ToDo = {
        text, 
        completed: false
    }; // nuovo oggetto da aggiungere all'array delle attività inizializzato

    todo.push(newTodo); // aggiunge all'array la nuova attività
    visualizzaTodo(); // la visualizzazione della lista
}

// segnare l'attività come completata quindi completed 

function completeTodo(index: number) : void {
    todo[index].completed = !todo[index].completed;
    visualizzaTodo();
}

// la funzione visualizzaTodo: per la visualizzazione della lista dall'html 

function visualizzaTodo(): void {
    const elementoLista = document.getElementById('content'); // dal div presente in index.html 
    if (elementoLista) {
        elementoLista.innerHTML = ''; // Se è presente l'elemento, pulisce la lista esistente. Evito i duplicati al click 
        todo.forEach((todo, index) => {
            const elemento = document.createElement('li'); 
            elemento.classList.add('list-group-item', 'd-flex')
            elemento.textContent = todo.text;
            if (todo.completed) {
                elemento.style.textDecoration = 'line-through'; // se l'attività è completata, si sbarra
            }

            elemento.addEventListener('click', () => completeTodo(index));
            elementoLista.appendChild(elemento); // senza questo non appare la lista
        })
    }
}

function aggiungiNuovoTodo() {
    // prendo gli elementi dall'html
    const aggiungiAttivitaBtn = document.getElementById('aggiungiAttivitaBtn');
    const nuovaAttivita = document.getElementById('nuovaAttivita') as HTMLInputElement;  // Cast dell'elemento a HTMLInputElement

    // se l'utente aggiunge l'attività 
    if(aggiungiAttivitaBtn && nuovaAttivita) {
        aggiungiAttivitaBtn.addEventListener('click', () => { // evento on click
            const attivitaText = nuovaAttivita.value.trim(); // Ora TypeScript sa che 'nuovaAttivita' è un input e ha la proprietà 'value'
            if (attivitaText !== '') {
                addTodo(attivitaText); // aggiunge all'array l'attività
                nuovaAttivita.value = ''; // Reset del campo input
            }
        })
    }
}


aggiungiNuovoTodo(); 

visualizzaTodo();

addTodo('Inizio esercizio');
addTodo('Prova css');