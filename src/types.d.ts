export interface Position {
  x: number;
  y: number;
}

export type Dimensions = {
  width: number;
  height: number;
};

export type Effects = {
  scale: number;
  opacity: number;
};

type AttackBox = {
  position: Position;
  offset: Position;
  width: number;
  height: number;
};

export type Frames = {
  max: number;
  current: number;
  frameHold: number;
  frameElapsed: number;
 
};

type SpritesState = {
  image?: HTMLImageElement
  imageSrc: string;
  framesMax: number;
}
export type Sprites = {
  idle: SpritesState;
  attack: SpritesState;
  run: SpritesState;
}

