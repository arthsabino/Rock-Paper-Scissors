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
    let playerPickButtons = document.getElementsByClassName('rps-button')

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
    toggleActive(playerOptions)
    if(element.classList.contains('btn-choice')) {
        displayResults(element.dataset.btn)
    } else {
        displayPlayerPickPage()
    }
}

function displayResults(playerChoice) {
    console.log(playerChoice)
    let playerPickResultContainer = document.getElementsByClassName('rps-player-pick-container')[0]
    let divElement = document.createElement('div')
    playerPickResultContainer.innerHTML = `
        <div>
            <span>You Picked</span>
        </div>
        <button class="btn btn-result rps-button ${playerChoice}-button" type="button">
            <span>
            <img class="rps-icon" src="images/icon-${playerChoice}.svg" alt="">
            </span>
        </button>
    `
    
}

function displayPlayerPickPage() {}

function toggleActive(elementClass) {
    for(let i = 0; i < elementClass.length; i++) {
        let element = elementClass[i]
        if(element.classList.contains('active')) element.classList.remove('active')
        else element.classList.add('active')
    }
}