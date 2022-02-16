import './style.css'
import {Player} from '../src/app/player'
import {DOMcontroller} from './DOM/DOMscripts'

class Battleship {

    constructor(){
        this.player1 = new Player('player')
        this.player2 = new Player('computer')
        this.DOMcontroller = new DOMcontroller(this.player1, this.player2)
    }

    run(){
        this.DOMcontroller.runDOM(this.player1, this.player2)
        this.DOMcontroller.playerTurn(this.player1, this.player2)
    }
}

let game = new Battleship
game.run()