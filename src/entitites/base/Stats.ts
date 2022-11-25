export class Stats {
  constructor(
    private _hp: number,
    private _defense: number,
    private _attack: number,
    private _magic: number,
    private _speed: number,
  ) { }

  public get hp() : number {
    return this._hp
  }
  public get defense() : number {
    return this._defense
  }
  public get attack() : number {
    return this._attack
  }
  public get magic() : number {
    return this._magic
  }
  public get speed() : number {
    return this._speed
  }
  
}