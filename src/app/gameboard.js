import { Ship } from "./ships";
import { shipTypes } from "./shipTypes";

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = shipTypes;
    this.fleet = [];
    this.build();
  }

  build() {
    for (let i = 0; i < 100; i++) {
      this.board.push({ hasShip: false, isHit: false });
    }
  }

  receiveAttack(location) {
    this.board[location].isHit = true;
    if (this.board[location].hasShip !== true) {
      return;
    } else {
      this.attackShip(location);
    }
  }

  attackShip(location) {
    this.fleet.forEach((boat, i) => {
      if (!boat.position.includes(location)) {
        return;
      } else {
        boat.hit(location);
        if (!boat.isSunk()) {
          return;
        } else {
          this.fleet.slice(i, 1);
          console.log(`${boat.name} sank`);
        }
      }
    });
  }

  placeShip(location, shipName, axis) {
    let ship = new Ship(shipName, this.ships[shipName]);
    let locationArray = this.createLocationArray(location, shipName, axis);
    if (!this.isValidPlacement(locationArray)) {
      return;
    } else {
      locationArray.forEach((loc) => {
        this.board[loc].hasShip = true;
        ship.position.push(loc);
      });
    }
    this.fleet.push(ship);
  }

  createLocationArray(location, shipName, axis) {
    let locationArray = [];
    if (axis == "x") {
      for (let i = 0; i < this.ships[shipName]; i++) {
        locationArray.push(location + i);
      }
    } else {
      for (let i = 0; i < this.ships[shipName]; i++) {
        locationArray.push(location + i * 10);
      }
    }
    return locationArray;
  }

  isValidPlacement(locationArray) {
    if (locationArray.length <= 0) {
      return false;
    }

    const wall = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];

    if (locationArray.some((loc) => !this.board[loc])) {
      return false;
    }

    if (locationArray.some((loc) => this.board[loc].hasShip)) {
      return false;
    }

    if (
      wall.some((num) => {
        return [num, num + 1].every((combo) => locationArray.includes(combo));
      })
    ) {
      return false;
    }

    return true;
  }

  computerShipPlacement() {
    let axis = ["x", "y"];

    let shipNames = Object.keys(this.ships);

    shipNames.forEach((shipName) => {
      let locationArray = [];
      let randomLoc = 0;
      let randomAxis = 0;

      while (!this.isValidPlacement(locationArray)) {
        randomLoc = Math.floor(Math.random() * 99);
        randomAxis = Math.floor(Math.random() * 2);
        locationArray = this.createLocationArray(
          randomLoc,
          shipName,
          axis[randomAxis]
        );
      }
      this.placeShip(randomLoc, shipName, axis[randomAxis]);
    });
  }
}

export { Gameboard };
