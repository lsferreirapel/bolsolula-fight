import { BattleStats } from "./base/BattleStats";
import { ISpriteParams, Sprite } from './base/Sprite';
import { Stats } from "./base/Stats";
import { Utils } from "./base/Utils";
import { gsap } from "gsap";

interface ICharacterParams extends ISpriteParams {
  name: string;
  stats: Stats
}

export abstract class Character extends Sprite {
  private _name: string;
  private _baseStats: Stats;
  private _battleStats: BattleStats;
  

  constructor({name, stats, ...params}: ICharacterParams) {
    super(params)
    this._name = name;
    this._baseStats = stats;
    this._battleStats = new BattleStats(
      stats.hp * 1000,
      stats.hp * 1000,
      stats.attack * 10,
      stats.magic * 15
    );
  }

  private _hasDodged() {
    return Utils.raffle(this._baseStats.speed * 0.5);
  }

  private _calculateDamageReceived(damage: number) {
    const mitigatedDamage = damage * (this.baseStats.defense / 1000);

    return damage - mitigatedDamage;
  }

  protected abstract attack(target: Character): void;
  protected abstract magicAttack(target: Character): void;
  protected abstract buff(): void;
  // protected abstract debuff(target: Character): void;

  public receiveAttack(damage: number) {
    if (this._hasDodged()) {
      return;
    }

    this._battleStats.actualHp -= this._calculateDamageReceived(damage);

    const hpPocentage = (100 * this._battleStats.actualHp) / this._battleStats.totalHp
    gsap.to(`#${this.player}-HP`, {
      width: hpPocentage + '%'
    })
  }

  public get name() {
    return this._name;
  }
  public get baseStats() {
    return this._baseStats;
  }
  public get battleStats() {
    return this._battleStats;
  }
}
