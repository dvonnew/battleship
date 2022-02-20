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
        this.fleet.forEach((boat,i)=>{
            if (!boat.position.includes(location)){
                return
            }
            else{
                boat.hit(location)
                if (!boat.isSunk()){
                    return
                }
                else {
                    this.fleet.splice(i,1)
                    console.log(`${boat.name} sank`)
                }
            }
        })

    }

    placeShip(location, shipName, axis){
        let ship = new Ship(shipName, this.ships[shipName])
        let locationArray = this.createLocationArray(location, shipName, axis)
            if (!this.isValidPlacement(locationArray)){
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

    createLocationArray(location, shipName, axis){
        const locationArray = []
        if (axis !== 'x'){
            for(let i=0; i < this.ships[shipName];i++){
                locationArray.push(location + i * 10)
            }
        }
        else{
            for(let i=0; i < this.ships[shipName];i++){
                locationArray.push(location + i)
            }
        }
        return locationArray
    }

    isValidPlacement (locationArray){
        
        const wall = [9,19,29,39,49,59,69,79,89]

        if (locationArray.length <=0){
            return false
        }
        if(locationArray.some((loc) => !this.board[loc])){
            return false
        }
        if (locationArray.some((loc)=>this.board[loc].hasShip)){
            return false
        }
        if (
            wall.some((num)=>{
                return [num, num+1].every((combo)=>locationArray.includes(combo))
            })
        )   {
            return false
        }
        return true
    }

    computerShipPlacement(){
        let axis = ['x','y']

        let shipNames = Object.keys(this.ships)

        shipNames.forEach(shipName =>{
            let locationArray = []
            let randomLoc =''
            let randomAxis =''

            while (!this.isValidPlacement(locationArray)){
                randomLoc = Math.floor(Math.random()*99)
                randomAxis = Math.floor(Math.random()*2)
                locationArray = this.createLocationArray(
                    randomLoc, 
                    shipName, 
                    axis[randomAxis]
                )
            }
            this.placeShip(randomLoc, shipName, axis[randomAxis])
        })
    }

    computerTurn(opponent){
        const boxes = document.querySelectorAll('.player')

        let randomLoc = Math.floor(Math.random()*99)

        opponent.gameboard.receiveAttack(randomLoc)
        
        boxes[randomLoc].classList.remove('empty')
        boxes[randomLoc].classList.add('hit')
        if(opponent.gameboard.board[randomLoc].hasShip === true){
            boxes[randomLoc].classList.add('ship-hit')
            boxes[randomLoc].classList.remove('has-ship')
        }
        
        this.winCheck(opponent.gameboard)
    }

    winCheck(gameboard){
        if (gameboard.fleet.length > 0){
            return
        }
        else{
            console.log(`Computer Wins!`)
        }
    }
}

export {Gameboard}