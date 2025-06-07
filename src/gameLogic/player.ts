import * as CONST from '@/constants/game';
import CharacterBase from '@/gameLogic/characterBase';
import Shot from '@/gameLogic/shot';
import { drawFrame } from '@/gameLogic/drawUtils';
import { getPerspectiveScale, projection, vec3D } from '@/gameLogic/projectionUtils';

class Player extends CharacterBase {
  protected side = CONST.SIDE_PLAYER;
  private image;
  private actQueue: string[] = [];

  constructor() {
    super();
    this.image = new Image;
    this.image.src = "./player.png";
  }

  draw(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    const position: vec3D = {
      x: this.position - this.image.width / 2.0,
      y: CONST.PLAYER_Y + (CONST.CARACTER_HEIGHT - this.image.height),
      z: CONST.PLAYER_Z,
    };
    const pt = projection(position, enemyPosition);
    const scale = getPerspectiveScale(position, enemyPosition);
    ctx.drawImage(this.image, pt.x, pt.y, this.image.width * scale, this.image.height * scale);

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
      const imageCenterY = CONST.PLAYER_Y + (CONST.CARACTER_HEIGHT - this.image.height / 2.0);
      const pt1: vec3D = { x: this.position - frz_w[i] / 2.0, y: imageCenterY - frz_w[i] / 2.0, z: CONST.PLAYER_Z };
      const pt2: vec3D = { x: this.position + frz_w[i] / 2.0, y: imageCenterY + frz_w[i] / 2.0, z: CONST.PLAYER_Z };
      const [ppt1, ppt2] = [pt1, pt2].map((pt) => projection(pt, enemyPosition));
      drawFrame(ctx, ppt1, ppt2, "white", 1);
    }
  }
}

export default Player;
