/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    games.forEach(game => {
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        // create and add class game-card to div
        gameCard.classList.add('game-card');

        // set the inner HTML using a template literal to display some info (use backticks`)
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
        <img src="${game.img}" width=100% height=auto />
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        `
        ;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);

    });
    }
//addGamesToPage(GAMES_JSON); //call to function addGamesToPage


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

//Now change value of contributionsCard to display result
contributionsCard.textContent = total_contributions;

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<p>${total_contributions.toLocaleString('en-US')}</p>`
//--------------------------------------------

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_raised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${total_raised.toLocaleString('en-US')}</p>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = GAMES_JSON.reduce((acc, game) => acc + 1, 0);
gamesCard.innerHTML = `<p>${numGames}</p>`


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded_games = GAMES_JSON.filter((game) => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded_games); //displays unfunded games
}
//filterUnfundedOnly(GAMES_JSON); //call the function to output unfunded games

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded_games = GAMES_JSON.filter((game) => game.pledged >= game.goal, 0);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded_games);
}
filterFundedOnly() //call to function to display funded games

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
//showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const count_unfunded = GAMES_JSON.reduce((acc, game) => {
    return game.pledged < game.goal ? acc + 1 : acc;
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
let displayStr = `A total amount of $${total_raised.toLocaleString('en-US')} has been raised 
for ${GAMES_JSON.length} games. Currently, there are ${count_unfunded ? count_unfunded : "no"} games 
that remain unfunded. Thank you for your support.`;

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.textContent = displayStr; //paragraph now contains template str in displayStr
descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games from the sortedGames list.

const [firstGame, secondGame] = sortedGames; //destructure first 2 games from sortedGames.

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_game = document.createElement('p');
top_game.textContent = firstGame.name;
firstGameContainer.appendChild(top_game);

// do the same for the runner up item
const second_game = document.createElement('p');
second_game.textContent = secondGame.name;
secondGameContainer.appendChild(second_game);