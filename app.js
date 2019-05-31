/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* eslint-disable */

var scores, roundSum, activePlayer, dice;

scores = [0,0];
roundSum = 0;
activePlayer = 0; // 0 -> first player, 1 -> second player


dice = Math.floor(Math.random() * 6) + 1; //Randomly picks a number 1 - 6



//document.querySelector('#current-' + activePlayer).innerHTML =

document.querySelector('.dice').style.display =  'none';


document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdDice);
document.querySelector('.btn-new').addEventListener('click', reset);

function rollDice(){
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector('.dice').style.display =  'block';
    if(dice === 1){
        document.querySelector('.dice').src =  'dice-1.png';
        roundSum = 0;
        document.querySelector('#current-' + activePlayer).textContent =  roundSum;
        switchPlayers();
    }
    else{
        document.querySelector('.dice').src =  'dice-' +dice+'.png';
        roundSum+= dice;
        document.querySelector('#current-' + activePlayer).textContent =  roundSum;
    }   
    
}

function holdDice(){
    console.log(roundSum);
    //Moving current round score to total score
    scores[activePlayer] += roundSum;
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    roundSum = 0;
    document.querySelector('#current-'+activePlayer).textContent = roundSum;
   
    //Check for winner
    checkWinner();
        
    //Switching players
    if(scores[activePlayer]< 100)
        switchPlayers();
}

function switchPlayers(){   
    if(activePlayer === 0)
        activePlayer = 1;
    else
        activePlayer = 0;   
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function checkWinner(){
    if(scores[activePlayer] >= 100){
        document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display =  'none';
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        
    }
    
}

function reset(){
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    scores = [0,0];
    roundSum = 0;
    activePlayer = 0; 
    document.querySelector('.dice').style.display =  'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('.btn-roll').disabled = false;
    document.querySelector('.btn-hold').disabled = false;
    
}

