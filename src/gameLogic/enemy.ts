import * as CONST from '@/constants/game';
import Shot from './shot';

const MAX_POSITION = CONST.WIDTH;
const MIN_POSITION = -CONST.WIDTH;

class Enemy {
  position = 0.0;
  private velocity = 0.0;
  private direction = 0;

  shotList: Shot[] = [];
  private shotWait = 0;
  private freeze = 0;

  constructor() {
    this.direction = (Math.random() * 10 < 5) ? -1 : 1;
  }

  tick(ctx: CanvasRenderingContext2D, playerPosition: number) {
    this.process(playerPosition);

    // Control of velocity
    if (this.isInMovableRange()) {
      this.position += this.velocity;
    } else {
      this.velocity = 0.0;
    }
    this.velocity *= CONST.DECELERATION_RATE;

    // Control of shots
    for (const shot of this.shotList) {
      shot.tick(ctx, this.position);
    }
    this.shotList = this.shotList.filter(t => t.isAlive);
    if (this.shotWait > 0) this.shotWait--;
    if (this.freeze > 0) this.freeze--;
  }

  private process(playerPosition: number) {
    if (this.freeze > 0) return;

    this.velocity += (this.direction == 1) ? CONST.ACCELERATION : -CONST.ACCELERATION;

    if (Math.random() * 100 < this.direction * 150 * Math.pow((this.position - playerPosition)/100.0, 3.0)) {
      this.direction *= -1;
    }

    if (Math.random() * 100 < 10) this.shoot();
  }

  private shoot() {
    if (!this.canShot()) return;

    var newShot = new Shot(this.position, CONST.SIDE_ENEMY);
    this.shotList.push(newShot);
    this.shotWait = CONST.SHOT_WAIT;
  }

  private canShot() {
    return (this.shotList.length < CONST.MAX_SHOT_NUM && this.shotWait <= 0);
  }

  private isInMovableRange() {
    return (this.position + this.velocity <= MAX_POSITION && this.position + this.velocity >= MIN_POSITION);
  }
}

export default Enemy;
