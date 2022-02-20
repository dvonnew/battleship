import {Gameboard} from './gameboard'

class Player {
    constructor (name){
        this.name = name
        this.gameboard = new Gameboard
    }

    turn (location, gameboard){
        if (gameboard.board[location].isHit !== true){
            gameboard.receiveAttack(location)
        }
        else{
            return
        }
        this.winCheck(gameboard)
        console.log(gameboard.fleet.length)
    }

    winCheck(gameboard){
        if (gameboard.fleet.length > 0){
            return
        }
        else{
            console.log(`${this.name} Wins!`)
        }
    }
}

export {Player}