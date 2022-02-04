import {Player} from '../app/player'

describe('Player Class', ()=>{

    let player1;
    let player2

    test('Player takes a turn', ()=>{
        player1 = new Player
        player2 = new Player
        player1.turn(1, player2.gameboard)
        expect(player2.gameboard.board[1].isHit).toBe(true)
    })

})