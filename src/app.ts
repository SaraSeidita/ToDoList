// TO DO LIST 

// creazione interfaccia per i tipi di dati 

interface ToDo {
    text: string;
    completed: boolean;
}


// lista attività 

let attivita: ToDo[] = [];


// salvare item?


// aggiungere nuove attività

function aggiungiAttivita(text: string): void {
    const attivitaNuova: ToDo = { text, completed: false };
    attivita.push(attivitaNuova);
    salvaItem();
    visualizzaAttivita();
}

// Completa un'attività
function completaAttivita(index: number): void {
    attivita[index].completed = !attivita[index].completed;
    salvaItem();
    visualizzaAttivita();
}

// Elimina un'attività
function eliminaAttivita(index: number): void {
    attivita.splice(index, 1); // Rimuove l'elemento
    salvaItem();
    visualizzaAttivita();
}

// Visualizza la lista delle attività
function visualizzaAttivita(): void {
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

function salvaItem(): void {
    localStorage.setItem('todos', JSON.stringify(attivita));
}

// Gestisce l'aggiunta di una nuova attività
function aggiungiNuovaAttivita(): void {
    const aggiungiAttivitaBtn = document.getElementById('aggiungiAttivitaBtn');
    const nuovaAttivita = document.getElementById('nuovaAttivita') as HTMLInputElement;

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
