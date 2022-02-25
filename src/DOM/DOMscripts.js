import {shipTypes} from '../app/shipTypes'

class DOMcontroller {

    constructor() {
        this.shipNames = Object.keys(shipTypes)
    }

    startDOM (player1, player2) {
        const startButton = document.getElementById('start')

        startButton.addEventListener('click', () =>{
            this.clearGameBox()
            this.createGameboard(player1)
            this.createPlayerPlacementUI(player1, player2)
        })
    }

    playGame(player1, player2){
        player2.gameboard.computerShipPlacement()
        this.clearGameBox()
        this.createGameboard(player1, player2) // only need to call this once
        this.createGameboard(player2, player1)
    }
    
    clearGameBox(){
        const gameBox = document.getElementById('game-box')
        while(gameBox.hasChildNodes()){
            gameBox.removeChild(gameBox.lastChild)
        }
    }

    createGameboard(player, otherPlayer){
        const gameBox = document.getElementById('game-box')
        const gameboard = document.createElement('div')

        gameBox.appendChild(gameboard)
        gameboard.classList = `gameboard ${player.name}board`

        gameboard.style.setProperty('--grid-rows', 10)
        gameboard.style.setProperty('--grid-cols', 10)
        player.gameboard.board.forEach((box,i) => {
            let div = document.createElement('div')
            div.dataset.index = i
            gameboard.appendChild(div).classList.add('box', 'empty', `${player.name}`)
            if(player.name === 'player'){
                if(box.hasShip){
                        div.classList.add('has-ship')
                    }
            } else {
                div.addEventListener('click', ()=>{
                    player.turn(i, player.gameboard)
                    div.classList.remove('empty')
                    console.log('shot')
                    if (player.gameboard.board[i].hasShip !== true){
                        div.classList.add('hit')
                    }
                    else{
                        div.classList.add('ship-hit')
                    }
                    if(player.winCheck(otherPlayer.gameboard) || otherPlayer.winCheck(player.gameboard)){
                        this.displayWinner(player, otherPlayer)
                    } else {
                        setTimeout(() =>{
                            player.gameboard.computerTurn(player, otherPlayer)
                        }, 2000)
                    }
                })
            }
        });
    }

    displayWinner(player1, player2){
        if(player1.winCheck(player2.gameboard)){
            let winDisplay = this.createWinDisplay(player1)
            const playerboard = document.querySelector('.playerboard')
            while (playerboard.hasChildNodes()){
                playerboard.remove(playerboard.lastChild)
            }
            playerboard.appendChild(winDisplay)
        }
        else{
            let winDisplay = this.createWinDisplay(player2)
            const computerboard = document.querySelector('.computerboard')
            while (computerboard.hasChildNodes()){
                computerboard.remove(computerboard.lastChild)
            }
            computerboard.appendChild(winDisplay)
        }
    }

    createWinDisplay(player){
        const winDisplay = document.createElement('div')

        winDisplay.innerHTML = `${player.name} Wins`

        return winDisplay
    }

    createPlayerPlacementUI(player, player2){
        this.createPlayerInputDOMElements()
        
        const boxes = document.querySelectorAll('.player')
        const playerInputDescription = document.querySelector('.player-input-description')
        const axisButtons = document.querySelectorAll('.axis-button')

        let i=0

        axisButtons.forEach(button=>{
            button.addEventListener('click', ()=>{
                this.changeActiveAxis(button)
            })}
        )

        boxes.forEach(box =>{
            if(i>5){
                return
            }
            else{
                box.addEventListener('click', ()=>{
                    let axis = this.getAxis()
                    let locationArray = player.gameboard.createLocationArray(parseInt(box.dataset.index), this.shipNames[i], axis)
                    if(!player.gameboard.isValidPlacement(locationArray)){
                        return
                    }
                    else{
                        player.gameboard.placeShip(parseInt(box.dataset.index), this.shipNames[i], axis)
                        locationArray.forEach(loc =>{
                            boxes[loc].classList.add('has-ship')
                        })
                        i++
                        if (i<5){
                            playerInputDescription.innerText = `Please place your: ${this.shipNames[i]}`
                        }
                        else{
                            this.createPlayGameButton()
                            let playButton = document.getElementById('play')
                            
                            playButton.addEventListener('click', ()=>{
                                this.playGame(player, player2)
                            })
                        }
                    }
                })
            }
        })
    }

    createPlayerInputDOMElements(){
        const gameBox = document.getElementById('game-box')
        const playerInputContent = document.createElement('div')
        const playerInputDescription = document.createElement('div')
        const axisBox = document.createElement('div')
        const xButton = document.createElement('button')
        const yButton = document.createElement('button')

        gameBox.className = 'player-input'

        xButton.classList.add('x', 'active', 'axis-button')
        xButton.innerHTML ='x'
        xButton.value = 'x'

        yButton.classList.add('y', 'inactive', 'axis-button')
        yButton.innerHTML ='y'
        yButton.value = 'y'

        axisBox.className = 'axis-box'
        axisBox.appendChild(xButton)
        axisBox.appendChild(yButton)

        playerInputDescription.className = 'player-input-description'
        playerInputDescription.innerText = 'Please place your: Carrier'
        
        playerInputContent.id = 'player-input-content'
        playerInputContent.appendChild(axisBox)
        playerInputContent.appendChild(playerInputDescription)

        gameBox.appendChild(playerInputContent)
    }

    createPlayGameButton(){
        const playerInputDescription = document.querySelector('.player-input-description')
        const playButton = document.createElement('button')
        const axisBox = document.querySelector('.axis-box')

        while(axisBox.hasChildNodes()){
            axisBox.removeChild(axisBox.lastChild)
            axisBox.classList.remove('axis-box')
        }

        playButton.innerHTML = 'Play'
        playButton.id = 'play'
        playerInputDescription.innerText = ''
        playerInputDescription.appendChild(playButton)
    }

    changeActiveAxis(button){
        if (button.classList.contains('inactive')){
            button.classList.add('active')
            button.classList.remove('inactive')
            if (button.value == 'x'){
                let y = document.querySelector('.y')
                y.classList.add('inactive')
                y.classList.remove('active')
            }

            else{
                let x = document.querySelector('.x')
                x.classList.remove('active')
                x.classList.add('inactive')
            }
        }
        else{
            return
        }
    }

    getAxis(){
        let activeAxis = document.querySelector('.active').value

        return activeAxis
    }
}

export {DOMcontroller}