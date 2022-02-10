

class DOMcontroller {

    runDOM (player1, player2) {
        this.createGameboard(player1)
        this.createGameboard(player2)

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


}

export {DOMcontroller}