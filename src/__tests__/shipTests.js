import { Ship } from '../app/ships'

describe('Ship', ()=>{
    
    let ship = ''

    beforeEach(()=>{
        ship = new Ship ('sub', 3)
    })

    test('Ship Object', ()=>{
        expect(typeof ship ==='object').toBe(true)
    })

    test('Ship hit', ()=>{
        ship.hit(2)
        expect(ship.beenHit).toContain(2)
    })

    test('Ship has been sank', ()=>{
        ship.position.push(1)
        ship.position.push(2)
        ship.position.push(3)
        ship.beenHit.push(1)
        ship.beenHit.push(2)
        ship.beenHit.push(3)
        expect(ship.isSunk()).toBe(true)
    })
})