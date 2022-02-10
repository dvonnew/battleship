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
        this.fleet.forEach(boat=>{
            if (!boat.position.includes(location)){
                return
            }
            else{
                boat.hit(location)
            }
        })
    }

    placeShip(location, shipName, axis){
        let ship = new Ship(shipName, this.ships[shipName])
        let locationArray = this.createLocationArray(location, ship, axis)
            if (!this.checkPlacement(locationArray)){
                return
            }
            else{
                locationArray.forEach(loc =>{
                    this.board[loc].hasShip = true
                    ship.position.push(loc)
                })
            }
        this.fleet.push(ship)
    }

    createLocationArray(location, ship, axis){
        const locationArray = []
        if (axis === 'x'){
            for(let i=0; i <ship.size; i++){
                locationArray.push(location + i)
            }
        }
        else{
            for(let i=0; i < ship.size;i++){
                locationArray.push(location + i * 10)
            }
        }
        return locationArray
    }

    checkPlacement (locationArray){

        const wall = [9,19,29,39,49,59,69,79,89,99]

        if(locationArray.some((loc) => !this.board[loc])){
            return false
        }
        else if (locationArray.some((loc)=>this.board[loc].hasShip)){
            return false
        }
        else if (wall.some((num)=>{
            return [num, num+1].every((combo)=>
                locationArray.includes(combo))
        })
        ){
            return false
        }
        else{
            return true
        }
    }
}

export {Gameboard}