import { Sprite } from './Sprite';

export class Utils {
  static randomize(min: number, max: number) {
    return Math.round(min + Math.random() * (max - min));
  } 
  
  static raffle(winPorcentageIntenger=50) {
    return this.randomize(1, 100) <= winPorcentageIntenger;
  }

  static rectangularCollision(reactangle1: Sprite, reactangle2: Sprite) {
    return (
      reactangle1.attackBox.position.x + reactangle1.attackBox.width >= reactangle2.position.x && //
      reactangle1.attackBox.position.x <= reactangle2.position.x + reactangle2.dimensions.width && //
      reactangle1.attackBox.position.y + reactangle1.attackBox.height >= reactangle2.position.y && //
      reactangle1.attackBox.position.y <= reactangle2.position.y + reactangle2.dimensions.height //
    );
  }
}