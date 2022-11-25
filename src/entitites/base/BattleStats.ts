export class BattleStats {
  constructor(
    private _totalHp: number,
    private _actualHp: number,
    private _physicalDamage: number,
    private _specialDamage: number,
  ) { }

  public get totalHp() : number {
    return this._totalHp
  }
  public get actualHp() : number {
    return this._actualHp
  }
  public set actualHp(v : number) {
    this._actualHp = v
  }

  public get physicalDamage() : number {
    return this._physicalDamage
  }
  public get specialDamage() : number {
    return this._specialDamage
  }
  
}