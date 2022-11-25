/// <reference types="vite/client" />



interface Window {
  canvasContext: CanvasRenderingContext2D | null | undefined;
  canvas: HTMLCanvasElement | null;
  UI: NodeListOf<Element>;
  __DEV__: boolean;
  gravity: number;
  controlsKeys: {
    FIRST: {
      up: {
        key: "w",
        pressed: boolean
      },
      // down: {
      //   key: "w",
      //   pressed: boolean
      // },
      left: {
        key: "a",
        pressed: boolean
      },
      right: {
        key: "d",
        pressed: boolean
      },
      attack1: {
        key: "s",
        pressed: boolean
      },
      // attack2: {
      //   key: "s",
      //   pressed: boolean
      // },
    },
    SECOND: {
      up: {
        key: "ArrowUp",
        pressed: boolean
      },
      // down: {
      //   key: "w",
      //   pressed: boolean
      // },
      left: {
        key: "ArrowLeft",
        pressed: boolean
      },
      right: {
        key: "ArrowRight",
        pressed: boolean
      },
      attack1: {
        key: "ArrowDown",
        pressed: boolean
      },
      // attack2: {
      //   key: "s",
      //   pressed: boolean
      // },
    }
  }
}

declare const canvasContext: CanvasRenderingContext2D | null | undefined;
declare const canvas: HTMLCanvasElement | null;
declare const gravity: number
declare const UI: NodeListOf<Element>;
declare const __DEV__: boolean;

declare const controlsKeys: {
  FIRST: {
    up: {
      key: "w",
      pressed: boolean
    },
    up: {
      key: "w",
      pressed: boolean
    },
    // down: {
    //   key: "w",
    //   pressed: boolean
    // },
    left: {
      key: "d",
      pressed: boolean
    },
    right: {
      key: "a",
      pressed: boolean
    },
    attack1: {
      key: "s",
      pressed: boolean
    },
    // attack2: {
    //   key: "s",
    //   pressed: boolean
    // },
  },
  SECOND: {
    up: {
      key: "ArrowUp",
      pressed: boolean
    },
    // down: {
    //   key: "w",
    //   pressed: boolean
    // },
    left: {
      key: "ArrowLeft",
      pressed: boolean
    },
    right: {
      key: "ArrowRight",
      pressed: boolean
    },
    attack1: {
      key: "ArrowDown",
      pressed: boolean
    },
    // attack2: {
    //   key: "s",
    //   pressed: boolean
    // },
  }
}