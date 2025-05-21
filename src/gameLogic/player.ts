import * as CONST from '@/constants/game';
import CharacterBase from './characterBase';
import Shot from './shot';
import { drawFrame } from './freezeUtil';

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

    if (this.freeze > 0) this.drawFreezed(ctx, enemyPosition);
  }

  tick(
    ctx: CanvasRenderingContext2D,
    keysPressed: { [index: string]: boolean },
    enemyPosition: number,
    enemyShots: Shot[],
  ): void {
    this.handleKeyPressed(keysPressed);
    this.processActQueue();
    this.updatePositionAndVelocity();
    this.updateShots(ctx, enemyPosition);
    if (this.freeze > 0) this.freeze--;

    if (this.isAttacked(enemyShots)) {
      this.life--;
      this.freeze = CONST.FREEZE_WAIT;
    }
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

  private isAttacked(enemyShots: Shot[]) {
    if (this.freeze > 0) return false;

    for (const shot of enemyShots) {
      if (shot.hits(this.position)) return true;
    }
    return false;
  }

  private drawFreezed(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    const frz_w = [
      50.0 * (1.0 - Math.pow(this.freeze / CONST.FREEZE_WAIT, 5.0)),
      50.0 * (1.0 - Math.pow((this.freeze - 20) / CONST.FREEZE_WAIT, 5.0))
    ];
    for(let i = 0; i < 2; i++) {
      drawFrame(
        ctx,
        (this.position - enemyPosition - frz_w[i] / 2.0) * CONST.MAG_END + 320,
        (CONST.PLAYER_HEIGHT - this.image.height / 2.0 - frz_w[i] / 2.0) * CONST.MAG_END + 240,
        (this.position - enemyPosition + frz_w[i] / 2.0) * CONST.MAG_END + 320,
        (CONST.PLAYER_HEIGHT - this.image.height / 2.0 + frz_w[i] / 2.0) * CONST.MAG_END + 240,
        "white",
        1
      );
    }
  }
}

export default Player;
