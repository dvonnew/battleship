import {shipTypes} from '../app/shipTypes'

class DOMcontroller {

    constructor (){
        this.shipNames = Object.keys(shipTypes)
    }

    runDOM (player1, player2) {
        const startButton = document.getElementById('start')

        startButton.addEventListener('click', () =>{
            this.clearGameBox()
            this.createGameboard(player1)
            this.createPlayerPlacementUI(player1)
        })
    }
    
    clearGameBox(){
        const gameBox = document.getElementById('game-box')
        while(gameBox.hasChildNodes()){
            gameBox.removeChild(gameBox.lastChild)
        }
    }

    createGameboard(player){
        const gameBox = document.getElementById('game-box')
        const gameboard = document.createElement('div')

        gameBox.appendChild(gameboard)
        gameboard.className = 'gameboard'

        gameboard.style.setProperty('--grid-rows', 10)
        gameboard.style.setProperty('--grid-cols', 10)
        player.gameboard.board.forEach((box,i) => {
            let div = document.createElement('div')
            div.dataset.index = i
            gameboard.appendChild(div).classList.add('box', 'empty', `${player.name}`)
        });
    }

    playerTurn(attackingPlayer, recievingPlayer){
        const boxes = document.querySelectorAll(`.${recievingPlayer.name}`)
        boxes.forEach((box, i) => {
            box.addEventListener('click', ()=>{
                attackingPlayer.turn(i, recievingPlayer.gameboard)
                box.classList.remove('empty')
                if (recievingPlayer.gameboard.board[i].hasShip !== true){
                    box.classList.add('hit')
                }
                else{
                    box.classList.add('ship-hit')
                }
            })
        })
    }

    createPlayerPlacementUI(player){
        this.createPlayerInputDOMElements()
        
        const boxes = document.querySelectorAll('.player')
        const playerInputDescription = document.querySelector('.player-input-description')
        const axisButtons = document.querySelectorAll('.axis-button')

        let i =0

        axisButtons.forEach(button=>{
            button.addEventListener('click', ()=>{
                this.changeActiveAxis()
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

    changeActiveAxis(){
        let activeAxis = document.querySelector('.active')
        let inactiveAxis = document.querySelector('.inactive')
    
        inactiveAxis.classList.remove('inactive')
        inactiveAxis.classList.add('acitve')

        activeAxis.classList.remove('active')
        activeAxis.classList.add('inactive')
    }

    getAxis(){
        let activeAxis = document.querySelector('.active').value

        return activeAxis
    }
}

export {DOMcontroller}