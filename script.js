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
    let element = event.target;

}

function showResultsPage() {
    
}