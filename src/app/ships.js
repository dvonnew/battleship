class Ship {
    constructor(name, size){
        this.name = name
        this.size = size
        this.position = []
        this.beenHit = []
    }

    hit(num) {
        if (this.beenHit.includes(num)){
            return
        }
        else{
            this.beenHit.push(num)
        }
    }

    isSunk (){
        return this.position.every(num =>{
            return this.beenHit.includes(num)
        })
    }
}

export {Ship}