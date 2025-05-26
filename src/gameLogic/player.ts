import * as CONST from '@/constants/game';
import CharacterBase from './characterBase';
import Shot from './shot';
import { drawFrame } from './freezeUtils';
import { perspective, transport } from './projectionUtils';

class Player extends CharacterBase {
  protected side = CONST.SIDE_PLAYER;
  private image;
  private actQueue: string[] = [];

  constructor() {
    super();
    this.image = new Image;
    this.image.src = "/player.png";
  }

  draw(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    ctx.drawImage(
      this.image,
      (this.position - enemyPosition - this.image.width/2.0) * CONST.MAG_END + 320,
      (CONST.PLAYER_HEIGHT - this.image.height) * CONST.MAG_END + 240,
      this.image.width * CONST.MAG_END,
      this.image.height * CONST.MAG_END
    );
    this.drawShots(ctx, enemyPosition);
    if (this.freeze > 0) this.drawFreezed(ctx, enemyPosition);
  }

  tick(keysPressed: { [index: string]: boolean }, enemyShots: Shot[]): void {
    this.handleKeyPressed(keysPressed);
    this.processActQueue();
    this.updatePositionAndVelocity();
    this.updateShots();
    this.updateLifeAndFreeze(enemyShots);
  }

  private handleKeyPressed(keysPressed: { [index: string]: boolean }) {
    if (keysPressed['a'] || keysPressed['ArrowLeft']) {
      this.actQueue.push('l');
    } else if (keysPressed['d'] || keysPressed['ArrowRight']) {
      this.actQueue.push('r');
    } else {
      this.actQueue.push('n');
    }
    if (keysPressed['w'] || keysPressed['ArrowUp']) {
      this.actQueue[CONST.INPUT_DELAY] += 's';
    }
  }

  private processActQueue() {
    if (this.actQueue.length <= CONST.INPUT_DELAY) return;

    const act = this.actQueue.shift();
    if (act == undefined) return;

    if (this.freeze > 0) return;

    if (/l/.test(act)) {
      this.velocity += CONST.ACCELERATION;
    } else if (/r/.test(act)) {
      this.velocity -= CONST.ACCELERATION;
    }
    if (/s/.test(act)) this.shoot();
  }

  private drawFreezed(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    const frz_w = [
      50.0 * (1.0 - Math.pow(this.freeze / CONST.FREEZE_WAIT, 5.0)),
      50.0 * (1.0 - Math.pow((this.freeze - 20) / CONST.FREEZE_WAIT, 5.0))
    ];
    for(let i = 0; i < 2; i++) {
      const imageCenterY = CONST.PLAYER_HEIGHT - this.image.height / 2.0;
      const pt1 = perspective(transport({ x: this.position - frz_w[i] / 2.0, y: imageCenterY - frz_w[i] / 2.0 }, enemyPosition), CONST.MAG_END);
      const pt2 = perspective(transport({ x: this.position + frz_w[i] / 2.0, y: imageCenterY + frz_w[i] / 2.0 }, enemyPosition), CONST.MAG_END);
      drawFrame(ctx, pt1, pt2, "white", 1);
    }
  }
}

export default Player;
