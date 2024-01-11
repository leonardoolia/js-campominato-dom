//? RECUPERO GLI ELEMENTI DAL DOM
const form = document.getElementById('form');
const grid = document.getElementById('grid');
const button = document.getElementById('button');

const levelSelect = document.getElementById('difficulty');
const level = levelSelect.value;




//? FUNZIONI

// Funzione per far iniziare il gioco
const startGame = (e) => {
    //! Impedisco che venga ricaricata la pagina
    e.preventDefault();

    //! Rimuovo griglia precedente quando viene cliccato nuovamente il bottone
    grid.innerHTML = '';

    //! Cambio il testo del bottone
    button.innerText = 'RICOMINCIA';

    //? Dati di partenza
    let rows = 10;
    let cols = 10;

    switch (level) {
        case 'hard':
            rows = 7;
            cols = 7;
            break;
        case 'normal':
            rows = 9;
            cols = 9;
            break;
    }

    const cells = rows * cols;

    for (let i = 1; i <= cells; i++) {

        // Invoco la funzione che crea la cella e le passo il content (i).
        const cell = createCell(i);

        //! La cella cambia colore quando viene cliccata
        cell.addEventListener('click', function () {
            cell.classList.toggle('clicked');
            console.log(i);
        })

        // Inserisco la cella nella grid
        grid.appendChild(cell);
    }




}


/**
 * Funzione che crea delle celle da aggiungere successivamente in una grid
 * @param {number} content index del ciclo for
 * @returns {node} restituisce un div (cella)
 */
const createCell = (content) => {

    // Creo una cella
    const newCell = document.createElement('div');
    newCell.className = 'cell';
    newCell.innerText = content;
    return newCell;
}



//? CREO EVENT LISTENER PER FAR INIZIARE IL GIOCO

form.addEventListener('submit', startGame);