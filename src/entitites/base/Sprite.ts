import { AttackBox, Dimensions, Position, Sprites } from "../../types";
import { SpriteBase, ISpriteBaseParams } from "./SpriteBase";

export interface ISpriteParams extends ISpriteBaseParams {
  attackBox: Pick<AttackBox, "offset">;
  sprites: Sprites;
  player: "FIRST" | "SECOND";
  speed?: number;
}

export class Sprite extends SpriteBase {
  private _velocity: Position;
  private _speed: number;
  private _attackBox: AttackBox;
  private _sprites: Sprites;
  private _config: {
    states: {
      isAttacking: boolean;
      isDead: boolean;
    };
    controlls: {
      player: "FIRST" | "SECOND";
      lastKey: string;
    };
  };

  constructor({ attackBox, sprites, player, speed = 5, ...params }: ISpriteParams) {
    super(params);
    this._speed = speed;
    this._velocity = { x: 0, y: 0 };
    this._attackBox = {
      position: { ...this._position },
      offset: attackBox.offset,
      height: 50,
      width: 100,
    };
    this._sprites = sprites;

    this._config = {
      states: {
        isAttacking: false,
        isDead: false,
      },
      controlls: {
        player,
        lastKey: "",
      },
    };

    for (const sprite in this._sprites) {
      (sprites as any)[sprite].image = new Image();
      (sprites as any)[sprite].image.src = (sprites as any)[sprite].imageSrc;
    }

    // CONFIGURE CONTROLLS
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case controlsKeys[this._config.controlls.player].left.key:
          controlsKeys[this._config.controlls.player].left.pressed = true;
          this._config.controlls.lastKey = controlsKeys[this._config.controlls.player].left.key;
          break;
        case controlsKeys[this._config.controlls.player].right.key:
          controlsKeys[this._config.controlls.player].right.pressed = true;
          this._config.controlls.lastKey = controlsKeys[this._config.controlls.player].right.key;
          break;
        case controlsKeys[this._config.controlls.player].up.key:
          this._drawJump();
          break;
        case controlsKeys[this._config.controlls.player].attack1.key:
          this._config.states.isAttacking = true;
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case controlsKeys[this._config.controlls.player].left.key:
          controlsKeys[this._config.controlls.player].left.pressed = false;
          break;
        case controlsKeys[this._config.controlls.player].right.key:
          controlsKeys[this._config.controlls.player].right.pressed = false;
          break;
      }
    });
  }

  private _switchSprite(sprite: "idle" | "run" | "attack1" | "attack2" | "jump" | "fall" | "takeHit" | "death") {
    // if (this._image === this._sprites.death.image) {
    //   if (this.framesCurrent === this.sprites.death.framesMax - 1)
    //     this.dead = true
    //   return
    // }

    // overriding all other animations with the attack animation
    if (
      this._image === this._sprites.attack.image &&
      this._frames.current < this._sprites.attack.framesMax - 1
    )
      return;

    // override when fighter gets hit
    // if (
    //   this.image === this.sprites.takeHit.image &&
    //   this.framesCurrent < this.sprites.takeHit.framesMax - 1
    // )
    //   return

    switch (sprite) {
      case "idle":
        if (this._image !== this._sprites.idle.image) {
          if (this?._sprites?.idle?.image)
            this._image = this._sprites.idle.image;
          this._frames.max = this._sprites.idle.framesMax;
          this._frames.current = 0;
        }
        break;
      case "run":
        if (this._image !== this._sprites.run.image) {
          if (this?._sprites?.run?.image) this._image = this._sprites.run.image;
          this._frames.max = this._sprites.run.framesMax;
          this._frames.current = 0;
        }
        break;
      case "attack1":
        if (this._image !== this._sprites.attack.image) {
          if (this?._sprites?.attack?.image)
            this._image = this._sprites.attack.image;
          this._frames.max = this._sprites.attack.framesMax;
          this._frames.current = 0;
        }
        break;
      // case 'jump':
      //   if (this.image !== this.sprites.jump.image) {
      //     this.image = this.sprites.jump.image
      //     this.framesMax = this.sprites.jump.framesMax
      //     this.framesCurrent = 0
      //   }
      //   break
      // case 'fall':
      //   if (this.image !== this.sprites.fall.image) {
      //     this.image = this.sprites.fall.image
      //     this.framesMax = this.sprites.fall.framesMax
      //     this.framesCurrent = 0
      //   }
      //   break
      // case 'attack1':
      //   if (this.image !== this.sprites.attack1.image) {
      //     this.image = this.sprites.attack1.image
      //     this.framesMax = this.sprites.attack1.framesMax
      //     this.framesCurrent = 0
      //   }
      //   break
      // case 'takeHit':
      //   if (this.image !== this.sprites.takeHit.image) {
      //     this.image = this.sprites.takeHit.image
      //     this.framesMax = this.sprites.takeHit.framesMax
      //     this.framesCurrent = 0
      //   }
      //   break
      // case 'death':
      //   if (this.image !== this.sprites.death.image) {
      //     this.image = this.sprites.death.image
      //     this.framesMax = this.sprites.death.framesMax
      //     this.framesCurrent = 0
      //   }
      //   break
    }
  }

  private _drawIdle() {
    this._velocity.x = 0;
    this._switchSprite("idle");
  }
  private _drawJump() {
    if (this._velocity.y === 0) {
      this._velocity.y = -20;
      this._switchSprite("jump");
    }
  }
  private _drawMoveLeft() {
    this._velocity.x = -this._speed;
    this._switchSprite("run");
  }
  private _drawMoveRight() {
    this._velocity.x = this._speed;
    this._switchSprite("run");
  }

  protected _drawAttack() {
    this._switchSprite("attack1");
    setTimeout(() => {
      this._config.states.isAttacking = false;
    }, 100);
  }

  public update() {
    this._draw();
    this._animateFrames();

    // MOVE SPRITE
    this._position.x += this._velocity.x; // Horizontal movement
    this._position.y += this._velocity.y; // Vertical movement

    // MOVE ATTACK BOX
    this._attackBox.position.x = this._position.x + this._attackBox.offset.x;
    this._attackBox.position.y = this._position.y + this._attackBox.offset.y;

    // PLAYER MOVEMENT

    if (
      controlsKeys[this._config.controlls.player].left.pressed &&
      this._config.controlls.lastKey === controlsKeys[this._config.controlls.player].left.key
    ) {
      this._drawMoveLeft();
    } else if (
      controlsKeys[this._config.controlls.player].right.pressed &&
      this._config.controlls.lastKey === controlsKeys[this._config.controlls.player].right.key
    ) {
      this._drawMoveRight();
    } else {
      this._drawIdle();
    }

    // DRAW ATTACK BOX
    if (__DEV__) {
      canvasContext!.fillStyle = "red";
      canvasContext!.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }

    if (
      this._position.y + this._dimensions.height + this._velocity.y >=
      canvas!.height - 50
    ) {
      this._velocity.y = 0;
    } else {
      this._velocity.y += gravity;
    }
  }

  public get position(): Position {
    return this._position;
  }
  public get dimensions(): Dimensions {
    return this._dimensions;
  }
  public get attackBox(): AttackBox {
    return this._attackBox;
  }
  public get isAttacking(): boolean {
    return this._config.states.isAttacking;
  }
  public get player(): "FIRST" | "SECOND" {
    return this._config.controlls.player;
  }
}
