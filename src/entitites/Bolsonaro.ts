import { Position } from '../types';
import { Stats } from "./base/Stats";
import { Utils } from './base/Utils';
import { Character } from "./Character";

interface BolsonaroParams {
  initialPosition: Position;
  offset?: Position
  player: "FIRST" | "SECOND"
}

export class Bolsonaro extends Character {
  constructor({
    initialPosition,
    offset,
    player,
  }: BolsonaroParams) {
    const stats = new Stats(350, 50, 300, 250, 30);
    super({
      initialPosition,
      offset,
      player,
      name: "Bolsonaro", 
      stats,
      attackBox: {
        offset: { x: 30, y: 20 },
      },
      effects: {
        scale: 2.5,
      },
      frames: {
        max: 8,
      },
      imageSrc: "/assets/chars/bolsonaro/Idle.png",
      sprites: {
        idle: {
          imageSrc: "/assets/chars/bolsonaro/Idle.png",
          framesMax: 8
        },
        attack: {
          imageSrc: "/assets/chars/bolsonaro/Attack1.png",
          framesMax: 3
        },
        run: {
          imageSrc: "/assets/chars/bolsonaro/Run.png",
          framesMax: 8
        },
      }
    });
  }

  attack(target: Character) {
    if (Utils.rectangularCollision(this, target)) {
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
