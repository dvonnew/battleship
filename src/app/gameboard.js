import {Ship} from './ships'
import {shipTypes} from './shipTypes'

class Gameboard {

    constructor (){
        this.board = []
        this.ships = shipTypes
        this.fleet = []
        this.build()
    }

    build(){
        for (let i=0; i<100; i++){
            this.board.push({hasShip: false, isHit: false})
        }
    }

    receiveAttack(location){
        this.board[location].isHit = true
        if(this.board[location].hasShip !== true){
            return
        }
        else{
            this.attackShip(location)
        } 
    }

    attackShip(location){
        this.fleet.forEach((boat)=>{
            if (!boat.position.includes(location)){
                return
            }
            else{
                boat.beenHit.push(location)
            }
        })
    }

    placeShip(location, shipName, axis){
        let ship = new Ship(shipName, this.ships[shipName])
        let b = location + ship.size

        if (axis == 'x'){
            while(location<b){
                this.board[location].hasShip = true
                ship.position.push(location)
                location ++
            }
        }
        else{
            let i = 0
            while(i<b){
                this.board[location].hasShip = true
                ship.position.push(location)
                location +=10
                i++
            }

        }
        this.fleet.push(ship)
    }
}

export {Gameboard}