import { Position } from '../types';
import { Stats } from "./base/Stats";
import { Utils } from './base/Utils';
import { Character } from "./Character";

interface LulaParams {
  initialPosition: Position;
  offset?: Position
  player: "FIRST" | "SECOND"
}

export class Lula extends Character {
  constructor({initialPosition, offset, player}: LulaParams) {
    const stats = new Stats(500, 100, 200, 20, 20);
    super({
      initialPosition,
      offset,
      player,
      name: "Lula",
      stats,
      attackBox: {
        offset: { x: -175, y: 20 },
      },
      effects: {
        scale: 2.5,
      },
      frames: {
        max: 4,
      },
      imageSrc: "/assets/chars/lula/Idle.png",
      sprites: {
        idle: {
          imageSrc: "/assets/chars/lula/Idle.png",
          framesMax: 4
        },
        attack: {
          imageSrc: "/assets/chars/lula/Attack1.png",
          framesMax: 4
        },
        run: {
          imageSrc: "/assets/chars/lula/Run.png",
          framesMax: 8
        },
      }
    });
  }

  attack(target: Character) {
    if (Utils.rectangularCollision(target, this)) {
      target.receiveAttack(this.battleStats.physicalDamage);
    }
    this._drawAttack();
  }

  magicAttack(target: Character) {
    if (Utils.rectangularCollision(this, target)) {
      target.receiveAttack(this.battleStats.specialDamage);
    }
    this._drawAttack();
  }

  buff() {
    this.battleStats.actualHp += 100;
  }
}
