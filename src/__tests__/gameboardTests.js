import {Gameboard} from '../app/gameboard'

describe('Gameboard goes brr', ()=>{

    let testBoard = ''

    beforeEach(()=>{
        testBoard = new Gameboard ()
    })

    test('Board built with 100 cells', ()=>{
        const arr = []
        for (let i=0; i<100; i++){
            arr.push({hasShip: false, isHit: false})
        }
        expect(testBoard.board.length).toEqual(100)
        
    })

    test('Shots fired', ()=>{
        testBoard.receiveAttack(50)
        expect(testBoard.board[50].isHit).toBe(true)
    })

    test('Ship hit', ()=>{
        testBoard.placeShip(2, 'Carrier', 'x')
        testBoard.receiveAttack(3)
        expect(testBoard.fleet[0].beenHit.includes(3)).toBe(true)
    })

    test('Ship has been placed', ()=>{
        testBoard.placeShip(2, 'Carrier', 'x')
        expect(testBoard.board[6].hasShip).toBe(true)
    })

    test('Ship has been placed', ()=>{
        testBoard.placeShip(2, 'Carrier', 'y')
        expect(testBoard.board[12].hasShip).toBe(true)
    })

    test('Ship has been placed', ()=>{
        testBoard.placeShip(2, 'Carrier', 'x')
        expect(testBoard.fleet[0].position.includes(2)).toBe(true)
    })

    test('Ship has been placed', ()=>{
        testBoard.placeShip(2, 'Carrier', 'y')
        expect(testBoard.fleet[0].position.includes(12)).toBe(true)
    })
})