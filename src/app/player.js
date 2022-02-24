import {Gameboard} from './gameboard'

class Player {
    constructor (name){
        this.name = name
        this.gameboard = new Gameboard
    }

    turn (location, gameboard){
        if (gameboard.board[location].isHit !== true){
            gameboard.receiveAttack(location)
            this.winCheck(gameboard)
            return
        }
    }

    winCheck(gameboard){
        if (gameboard.fleet.length > 0){
            return false
        }
        else{
            console.log(`${this.name} Wins!`)
            return true
        }
    }
}

export {Player}