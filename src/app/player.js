import {Gameboard} from './gameboard'

class Player {
    constructor (){
        this.gameboard = new Gameboard
    }

    turn (location, gameboard){
        if (gameboard.board[location].isHit !== true){
            gameboard.receiveAttack(location)
        }
        else{
            return
        }
        gameboard.fleet.forEach(ship => {
            if (!ship.isSunk()){
                console.log(gameboard.fleet[0].beenHit)
                return
            }
            else {
                console.log(`${ship.name} sank`)
            }
        });
    }
}

export {Player}