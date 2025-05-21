import * as CONST from '@/constants/game';

const MAX_POSITION = CONST.WIDTH;
const MIN_POSITION = -CONST.WIDTH;

class Player {
  image;
  position = 0.0;
  velocity = 0.0;
  actQueue: string[] = [];
  shotList = [];
  shotWait = 0;
  freeze = 0;

  constructor() {
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
  }

  tick(keysPressed: { [index: string]: boolean }): void {
    this.handleKeyPressed(keysPressed);
    this.processActQueue();

    // Control of velocity
    if (this.isInMovableRange()) {
      this.position += this.velocity;
    } else {
      this.velocity = 0.0;
    }
    this.velocity *= CONST.PLAYER_DECELERATION_RATE;
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
    if (this.actQueue.length > CONST.INPUT_DELAY) {
      const act = this.actQueue.shift();
      if (act == undefined) return;

      if (/l/.test(act)) {
        this.accelerate(-CONST.PLAYER_ACCELERATION);
      } else if (/r/.test(act)) {
        this.accelerate(CONST.PLAYER_ACCELERATION);
      }
      if (/s/.test(act)) {
        // this.shoot();
      }
    }
  }

  private accelerate(acceleration: number) {
    if (this.freeze <= 0) {
      this.velocity += acceleration;
    }
  }

  private isInMovableRange() {
    return (this.position + this.velocity <= MAX_POSITION && this.position + this.velocity >= MIN_POSITION);
  }
}

export default Player;
