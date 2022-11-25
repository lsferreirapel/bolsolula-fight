import { Utils } from "./entitites/base/Utils";
import "../public/styles/reset.css";
import "../public/styles/global.css";
import { SpriteBase } from "./entitites/base/SpriteBase";
import { Bolsonaro } from './entitites/Bolsonaro';
import { Lula } from './entitites/Lula';
import { decreaseTimer, determineWinner } from './ui';

window.canvas = document.querySelector("canvas");
window.canvasContext = canvas?.getContext("2d");
window.gravity = 1.5;

window.__DEV__ = true;

window.UI = document.querySelectorAll(".ui");

window.controlsKeys = {
  FIRST: {
    up: {
      key: "w",
      pressed: false
    },
    // down: {
    //   key: "w",
    //   pressed: false
    // },
    left: {
      key: "a",
      pressed: false
    },
    right: {
      key: "d",
      pressed: false
    },
    attack1: {
      key: "s",
      pressed: false
    },
    // attack2: {
    //   key: "s",
    //   pressed: false
    // },
  },
  SECOND: {
    up: {
      key: "ArrowUp",
      pressed: false
    },
    // down: {
    //   key: "w",
    //   pressed: false
    // },
    left: {
      key: "ArrowLeft",
      pressed: false
    },
    right: {
      key: "ArrowRight",
      pressed: false
    },
    attack1: {
      key: "ArrowDown",
      pressed: false
    },
    // attack2: {
    //   key: "s",
    //   pressed: false
    // },
  }
}

// Define game resolution
canvas!.width = 1024;
canvas!.height = 576;

// Define canvas default background
canvasContext!.fillStyle = "white";
canvasContext?.fillRect(0, 0, canvas!.width, canvas!.height);

const stageBackground = new SpriteBase({
  initialPosition: {
    x: 0,
    y: 0,
  },
  dimensions: {
    width: canvas!.width,
    height: canvas!.height,
  },
  effects: {
    scale: 2.6,
  },
  imageSrc: "/assets/stages/stage.png",
});

const bolsonaro = new Bolsonaro({
  player: "FIRST",
  initialPosition: {x: 20, y: 20},
  offset: {
    x: 215,
    y: 157,
  },
})

const lula = new Lula({
  player: "SECOND",
  initialPosition: { x: 400, y: 100 },
  offset: {
    x: 215,
    y: 157,
  },
});



function animate() {
  // CONFIGURE ANIMATION LOOP
  window.requestAnimationFrame(animate);
  canvasContext!.fillStyle = "white";
  canvasContext!.fillRect(0, 0, canvas!.width, canvas!.height);
  
  // DRAW ENTITIES
  stageBackground.update();
  bolsonaro.update();
  lula.update();

  // ATTACK
  if (bolsonaro.isAttacking) {
    bolsonaro.attack(lula);
  }
  if (lula.isAttacking) {
    lula.attack(bolsonaro);
  }

  // end game based on health
  if (bolsonaro.battleStats.actualHp <= 0 || lula.battleStats.actualHp <= 0) {
    determineWinner(lula, bolsonaro)
  }
}

animate();
decreaseTimer();


