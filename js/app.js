/*
 * Create a list that holds all of your cards
 */
 const cardHolder = []
 //set up moves counter
 //loop through and get all card instances
 const theseCards = document.querySelectorAll('.card');
 for (const card of theseCards){
   cardHolder.push(card);
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// lets get the peices to play width
//start time
var start = Date.now();

let stars = document.querySelector('.stars');

let moves = document.querySelector('.moves');

const cardsBoard = document.querySelector('#cardsBoard');

const deckOfCards = document.querySelector('.deck')

let allCards = document.querySelectorAll('.card');

let time = document.querySelector('.seconds');

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
function displayTime(time){
  setInterval(function() {
      var delta = Date.now() - start; // milliseconds elapsed since start
      time.innerText=(Math.floor(delta / 1000)); // in seconds


  }, 1000);
}
displayTime(time);
let openCardList =[];
let movesCounter=0;
let matchCounter=0;
MovesDisplay(movesCounter);
 function openCards(card) {
   console.log("you should be in open cards");
   openCardList.push(card);
    // if open card list has 2 cards in it check them
    if (openCardList.length ==2){
        //check if theyre the same
        console.log("now you have 2");
      if(openCardList[0].isEqualNode(openCardList[1])){
          AreMatch(openCardList);
          matchCounter+=1;
            //reset the list for next check
          openCardList=[];
          movesCounter+=1;
          MovesDisplay(movesCounter);
          // are all of them matched?
          if(matchCounter==8){
            var end = Date.now();
            let totalTime = (end-start)/1000;
            const rating = document.querySelector('.stars').getElementsByTagName("li").length;
            displayModal(totalTime,rating);
          }
        }
      //**********************if they dont match remove them from the list and flip back stackoverflow
      else {
        console.log("they dont match");
        ArentMatch(openCardList);
        openCardList=[];
        movesCounter+=1;
        MovesDisplay(movesCounter);

      }

    }
 }
 //*******************************this sets the display to the amount of moves and does star starsRating
function MovesDisplay(movesCounter){
  moves.textContent=movesCounter;
  if (movesCounter==10){
    stars.removeChild(stars.childNodes[1]);
  }
  if (movesCounter==12){
    stars.removeChild(stars.childNodes[2]);
  }

}


function displayModal(totalTime,rating){
  swal({
  title: 'YOU WON you took',
  text: totalTime +' seconds and got a star rating of '+ rating,
  type: 'success',
  showButton: true,
  confirmButtonColor: '#DD6B55',
  confirmButtonText: 'replay?',

}).then(() => {

    creatCardsBoard();

    // do nothing

});
}


//************************** display cards
function displayCard(card){
  //add open and show classes to card
  card.classList.add('open','show');
  return card;
}
//****************************match cards
function AreMatch(){
  for(card of openCardList){
    card.classList.add('match');
  }
}
function ArentMatch(openCardList){
  setTimeout(function(){ for(card of openCardList){
    card.classList.remove('open');
    card.classList.remove('show');
  }}, 500);
}


//*******************funtion to set and create board
function creatCardsBoard() {
  movesCounter=0;
  matchCounter=0;
  start = Date.now();
  const cards = shuffle(cardHolder);
  //reset all cards
  for(const card of cards){
    card.classList.remove('open');
    card.classList.remove('show');
    card.classList.remove('match');
    deckOfCards.appendChild(card);
      }
  //***********************need to clear the stars and create 3 new ones
  //********************** was helped with this function from the internet thank you  interwebs
    document.querySelector('.stars').innerHTML = '';
    const ul = document.querySelector('.stars');
    let li = document.createElement("li");
    for(i = 1; i <= 3; i++)
    {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(""));
      li.setAttribute("class", "fa fa-star");
      ul.appendChild(li);
    }
  }

// ***************************reset board by clicking icon
  let resetIcon= document.querySelector('.restart');
  resetIcon.addEventListener('click',creatCardsBoard);



//add event listeners to each card
  for(const card of cardHolder){
    // console.log(card);
    //update move_counter
    //add event listener to each card
    card.addEventListener('click',function(){
      //display and show card function
      if(card.classList.contains('open')){
        //do nothing
      }
      else{
        displayCard(card);

        openCards(card);

      }
    });
  }












//adding comment to give me room to scroll
