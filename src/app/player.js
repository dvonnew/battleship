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
    }
}

export {Player}