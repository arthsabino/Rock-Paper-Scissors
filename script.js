if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let modal = document.getElementsByClassName('modal')[0]
    let btnRules = document.getElementsByClassName('btn-rules')[0]
    let btnModalClose = document.getElementsByClassName('btn-modal-close')[0]
    let playAgainElement = document.getElementsByClassName('btn-play-again')[0]
    let playerPickButtons = document.getElementsByClassName('btn-choice')

    for(let i = 0; i < playerPickButtons.length; i++) {
        let button = playerPickButtons[i]
        button.addEventListener('click', playerPickButtonClicked)
    }

    btnRules.addEventListener('click', btnRulesClicked)
    btnModalClose.addEventListener('click', btnModalCloseClicked)
    playAgainElement.addEventListener('click', btnPlayAgainClicked)

    document.getElementsByClassName('player-score')[0].innerText = (sessionStorage.getItem('score')) ? sessionStorage.getItem('score') : 0
}

function btnRulesClicked(event) {
    let modal = document.getElementsByClassName('modal')[0]
    modal.style.display = 'block';
}

function btnModalCloseClicked(event) {
    let modal = document.getElementsByClassName('modal')[0]
    modal.style.display = 'none';
}

function playerPickButtonClicked(event) {
    let element = event.currentTarget;
    let playerOptions = document.getElementsByClassName('player-options')
    let computerChoice = getComputerChoice()
    let playerChoice = element.dataset.btn

    toggleClass(playerOptions, 'active')
    displayResults(playerChoice, computerChoice)
}

function btnPlayAgainClicked(event) {
    let playerOptions = document.getElementsByClassName('player-options')
    let resultLabel = document.getElementsByClassName('result-label')
    let pickContainers = document.getElementsByClassName('pick-container')
    toggleClass(playerOptions, 'active')
    toggleClass(resultLabel, 'active')
    removeClass(pickContainers, 'effect')
}
function getComputerChoice() {
    const rpsChoices = ['rock', 'paper', 'scissors'];
    let randomNumber = (Math.floor(Math.random() * 2)) + 1 
    return rpsChoices[randomNumber]
}

function createResultsContent(player, pick) {
    return (
        `
            <div>
                <span>${player} Picked</span>
            </div>
            ${createRPSButton(pick)}
        `

    )
}

function displayResults(playerChoice, computerChoice) {
    let playerPickResultContainer = document.getElementsByClassName('rps-player-pick-container')[0]
    let computerPickResultContainer = document.getElementsByClassName('rps-computer-pick-container')[0]
    let resultLabel = document.getElementsByClassName('result-label')[0]
    const results = {0 : "It's a tie", 1 : "You Win", "-1": "You Lose"}

    //displays content
    playerPickResultContainer.innerHTML = createResultsContent('You', playerChoice)
    computerPickResultContainer.innerHTML = createResultsContent('The House', computerChoice)
    //animate computer pick

    let btnResult = computerPickResultContainer.getElementsByClassName('btn-result')[0]
    btnResult.classList.add('show-result-animation')

    result = evaluateResults(playerChoice, computerChoice)

    setTimeout(()=> {
        updateResultLabel(results[result])
        updateResultIcon(result)
        resultLabel.classList.add('active')
        updateScore(result)
    }, 2500)
    
    
}
function updateResultIcon(result) {
    let playerPickResultContainer = document.getElementsByClassName('rps-player-pick-container')[0]
    let computerPickResultContainer = document.getElementsByClassName('rps-computer-pick-container')[0]

    if(result == 1) playerPickResultContainer.classList.add('effect')
    else if(result == -1) computerPickResultContainer.classList.add('effect')

}

function evaluateResults(playerChoice, computerChoice) {
    let result = 0;
    if(playerChoice === 'rock') {
        switch(computerChoice) {
            case 'rock':
                result = 0
                break;
            case 'paper':
                result = -1
                break;
            case 'scissors':
                result = 1
                break;
        }
    }
    else if(playerChoice === 'paper'){
        switch(computerChoice) {
            case 'rock':
                result = 1
                break;
            case 'paper':
                result = 0
                break;
            case 'scissors':
                result = -1
                break;
        }
    }
    else if (playerChoice === 'scissors'){    
        switch(computerChoice) {
            case 'rock':
                result = -1
                break;
            case 'paper':
                result = 1
                break;
            case 'scissors':
                result = 0
                break;
        }
    }

    return result
}

function updateScore(result) {
    let score = parseInt(document.getElementsByClassName('player-score')[0].innerText)
    score += result
    if(score <= 0 || isNaN(score)) score = 0
    document.getElementsByClassName('player-score')[0].innerText = score
    sessionStorage.setItem('score', score)
}

function updateResultLabel(result) {
    let resultLabel = document.getElementsByClassName('result-label')[0]
    let headerLabel = resultLabel.getElementsByTagName('h2')[0]
    headerLabel.innerText = `${result}!`
}

function createRPSButton(buttonType) {
    let rpsButton = 
    `
        <button class="btn btn-result rps-button ${buttonType}-button" type="button">
            <span>
            <img class="rps-icon" src="images/icon-${buttonType}.svg" alt="">
            </span>
        </button>
    `
    return rpsButton;
}

function displayPlayerPickPage() {}

function toggleClass(elementClass, className) {
    for(let i = 0; i < elementClass.length; i++) {
        let element = elementClass[i]
        if(element.classList.contains(className)) element.classList.remove(className)
        else element.classList.add(className)
    }
}

function removeClass(elements, className) {
    for(let i = 0; i < elements.length; i++) {
        let element = elements[i]
        element.classList.remove(className)
    }
}