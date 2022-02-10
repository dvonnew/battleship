

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
            gameboard.appendChild(div).classList.add('box', 'empty')
        });
    }

    playerTurn(attackingPlayer, recievingPlayer){
        const boxes = document.querySelectorAll('.box')
        boxes.forEach(box => {
            box.addEventListener('click', ()=>{
                attackingPlayer.turn(box.dataset.index, recievingPlayer.gameboard)
                box.classList.remove('empty')
                if (recievingPlayer.gameboard.board[box.dataset.index].hasShip !== true){
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