if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let modal = document.getElementsByClassName('modal')[0]
    let btnRules = document.getElementsByClassName('btn-rules')[0]
    let btnModalClose = document.getElementsByClassName('btn-modal-close')[0]
    let playerPickElement = document.getElementsByClassName('player-pick')[0]
    let playerPickButtons = document.getElementsByClassName('btn-choice')

    for(let i = 0; i < playerPickButtons.length; i++) {
        let button = playerPickButtons[i]
        button.addEventListener('click', playerPickButtonClicked)
    }

    btnRules.addEventListener('click', btnRulesClicked)
    btnModalClose.addEventListener('click', btnModalCloseClicked)
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
    let playerOptionsParentElement = element.closest('.player-options')
    let computerChoice = getComputerChoice()
    let playerChoice = element.dataset.btn

    toggleActive(playerOptions)
    displayResults(playerChoice, computerChoice)
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
    
    //displays content
    playerPickResultContainer.innerHTML = createResultsContent('You', playerChoice)
    computerPickResultContainer.innerHTML = createResultsContent('The House', computerChoice)
    //animate computer pick
    let btnResult = computerPickResultContainer.getElementsByClassName('btn-result')[0]
    btnResult.classList.add('show-result-animation')
    
    const results = {0 : "It's a tie", 1 : "You Win", "-1": "You Lose"}
    result = evaluateResults(playerChoice, computerChoice)
    console.log(result)
    updateResultLabel(results[result])
    setTimeout(()=> {
        resultLabel.classList.add('active')
        updateScore(result)
    }, 4000)
    
    
}

function evaluateResults(playerChoice, computerChoice) {
    let result = 0;
    console.log(playerChoice === 'rock')
    if(playerChoice === 'rock') {
        switch(computerChoice) {
            case 'rock':
                result = 0
                break;
            case 'paper':
                result = 1
                break;
            case 'scissors':
                result = -1
                break;
        }
    }
    else if(playerChoice === 'paper'){
        switch(computerChoice) {
            case 'rock':
                result = -1
                break;
            case 'paper':
                result = 0
                break;
            case 'scissors':
                result = 1
                break;
        }
    }
    else if (playerChoice === 'scissors'){    
        switch(computerChoice) {
            case 'rock':
                result = 0
                break;
            case 'paper':
                result = 1
                break;
            case 'scissors':
                result = -1
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

function toggleActive(elementClass) {
    for(let i = 0; i < elementClass.length; i++) {
        let element = elementClass[i]
        if(element.classList.contains('active')) element.classList.remove('active')
        else element.classList.add('active')
    }
}