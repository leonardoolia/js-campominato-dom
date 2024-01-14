//?------------------------------------------------------------------
//? RECUPERO GLI ELEMENTI DAL DOM
//?------------------------------------------------------------------
const form = document.getElementById('form');
const grid = document.getElementById('grid');
const button = document.getElementById('button');

const levelSelect = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('score');






//?------------------------------------------------------------------
//? FUNZIONI GENERALI
//?------------------------------------------------------------------

//? Funzione per far iniziare il gioco
const startGame = (e) => {

    //! Impedisco che venga ricaricata la pagina
    if (e) e.preventDefault();

    //! Flag per il game over
    let isGameOver = false;

    //------------------------------------------------------------------
    // FUNZIONI INTERNE
    //------------------------------------------------------------------

    // FUNZIONE CHE CREA CELLE
    /**
     * Funzione che crea celle da aggiungere successivamente in una grid
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


    // FUNZIONE PER GENERARE BOMBE CASUALI
    /**
     * Funzione per generare tot bombe casuali, una diversa dall'altra
     * @param {number} cells numero di celle nella griglia
     * @param {number} totalBombs numero di bombe presenti nella griglia
     * @returns {array} numeri delle celle corrispondeni a dove verranno posizionate le bombe
     */
    const generateRandomBombs = (cells, totalBombs) => {
        const numberOfBombs = [];
        do {
            const randomNumber = Math.floor(Math.random() * (cells + 1 - 1)) + 1;
            if (!numberOfBombs.includes(randomNumber)) {
                numberOfBombs.push(randomNumber)
            };
        } while (numberOfBombs.length < totalBombs);

        console.log(numberOfBombs);
        return numberOfBombs;
    }


    // FUNZIONE PER RIVELARE TUTTE LE BOMBE
    // const revealAllBombs = (bombs) => {
    //     const allCells = document.querySelectorAll('.cell');
    //     for (let allCell of allCells) {
    //         allCell.classList.add('bomb');
    //         if (bombs.includes(parseInt(allCell.innerText))) {
    //             allCell.classList.add('bomb');
    //         }
    //     }
    // }



    //?------------------------------------------------------------------
    //? OPERAZIONI INIZIALI
    //?------------------------------------------------------------------

    //! Rimuovo griglia precedente quando viene cliccato nuovamente il bottone
    grid.innerHTML = '';

    //! Cambio il testo del bottone
    button.innerText = 'RICOMINCIA';

    //! Recupero il valore dalla select
    const level = levelSelect.value;

    // Dati di partenza per rows e cols
    let rows = 10;
    let cols = 10;

    // Numero totale di bombe
    const totalBombs = 16;

    // Il numero di rows e cols cambia in base al livello di difficoltà scelto dall'utente
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

    // La grandezza delle celle è data dal root nel css
    const root = document.querySelector(':root');
    root.style.setProperty('--cols-per-row', cols);

    // Il totale delle celle è dato da:
    const cells = rows * cols;  //! 100 o 81 o 49


    // Variabile per tenere il punteggio dell'utente
    let score = 0;
    scoreDisplay.innerText = score;

    // Calcolare punteggio massimo
    const maxScore = cells - totalBombs;


    // Generare bombe casuali
    const bombs = generateRandomBombs(cells, totalBombs);




    //------------------------------------------------------------------
    // CREAZIONE CELLE
    //------------------------------------------------------------------

    for (let i = 1; i <= cells; i++) {

        // Invoco la funzione che crea la cella e le passo il content (i).
        const cell = createCell(i);

        //Quando la cella viene cliccata...
        cell.addEventListener('click', function () {

            //! Controllo se è game over
            if (isGameOver) return;

            //! Controllo se la cella è già stata cliccata
            if (cell.classList.contains('clicked')) return;

            // Se non è stata cliccata aggiungiamo la classe clicked
            cell.classList.add('clicked');
            console.log(i);


            //! Controllo se l'utente clicca una bomba
            const hasClickedBomb = bombs.includes(i);
            console.log(hasClickedBomb);

            // Se clicca la bomba la casella diventa rossa e l'utente perde
            if (hasClickedBomb) {
                cell.classList.add('bomb');
                console.log('Hai perso, il tuo punteggio è: ', score);
                isGameOver = true;


            } else {
                // Incremento punteggio quando utente clicca la cella
                score++;
                scoreDisplay.innerText = score;
                console.log(score);

                // Se il punteggio dell'utente è uguale allo score massimo, l'utente vince
                if (score === maxScore) {
                    isGameOver = true;

                    console.log('Hai vinto, il tuo punteggio è: ', score);
                };
            }



            // Chiediamo all'utente se vuole giocare di nuovo dopo il gameover
            // if (isGameOver === true) {
            //     const playAgain = setTimeout(() => { confirm('Vuoi giocare di nuovo?') }, 1)
            //     if (playAgain) startGame();
            // }



        })

        // Inserisco la cella nella grid
        grid.appendChild(cell);
    }











}






//?------------------------------------------------------------------
//? CREO EVENT LISTENER PER FAR INIZIARE IL GIOCO
//?------------------------------------------------------------------
form.addEventListener('submit', startGame);

