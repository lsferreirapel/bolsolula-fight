import { Dimensions, Effects, Frames, Position } from "../../types";

export interface ISpriteBaseParams {
  initialPosition: Position;
  imageSrc: string;
  dimensions?: Dimensions;
  effects?: Partial<Effects>;
  frames?: Partial<Frames>;
  offset?: Position;
}

export class SpriteBase {
  protected _image: HTMLImageElement = new Image();
  protected _position: Position;
  protected _offset: Position;
  protected _dimensions: Dimensions = {
    width: 50,
    height: 150,
  };
  protected _effects: Effects;
  protected _frames: Frames;

  constructor(params: ISpriteBaseParams) {
    this._position = params.initialPosition;

    this._image.onload = () => {
      this._dimensions = params?.dimensions ?? {
        width: this._image.width,
        height: this._image.height,
      };
    };
    this._image.src = params.imageSrc;

    this._effects = {
      scale: params?.effects?.scale ?? 1,
      opacity: params?.effects?.opacity ?? 1,
    };

    this._frames = {
      max: params?.frames?.max ?? 1,
      current: 0,
      frameHold: params?.frames?.frameHold ?? 10,
      frameElapsed: 0,
    };

    this._offset = params?.offset ?? {
      x: 0,
      y: 0,
    };
  }

  protected _animateFrames() {
    this._frames.frameElapsed++;
    if (this._frames.frameElapsed % this._frames.frameHold !== 0) return;

    if (this._frames.current < this._frames.max - 1) this._frames.current++;
    else this._frames.current = 0;
  }

  protected _draw() {
    canvasContext!.drawImage(
      this._image,
      this._frames.current * (this._image.width / this._frames.max),
      0,
      this._image.width / this._frames.max,
      this._image.height,
      this._position.x - this._offset.x,
      this._position.y - this._offset.y,
      (this._image.width / this._frames.max) * this._effects.scale,
      this._image.height * this._effects.scale
    );

    // c.drawImage(
    //   this.image,
    //   this.framesCurrent * (this.image.width / this.framesMax),
    //   0,
    //   this.image.width / this.framesMax,
    //   this.image.height,
    //   this.position.x - this.offset.x,
    //   this.position.y - this.offset.y,
    //   (this.image.width / this.framesMax) * this.scale,
    //   this.image.height * this.scale
    // )
  }

  update() {
    this._draw();
    this._animateFrames();
  }

  public get position(): Position {
    return this._position;
  }

  public get dimensions(): Dimensions {
    return this._dimensions;
  }
}
