import * as CONST from '@/constants/game';
import CharacterBase from './characterBase';

class Enemy extends CharacterBase {
  protected side = CONST.SIDE_ENEMY;
  private direction = 0;

  constructor() {
    super();
    this.direction = (Math.random() * 10 < 5) ? -1 : 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawShots(ctx, this.position);
  }

  tick(playerPosition: number) {
    this.actAI(playerPosition);
    this.updatePositionAndVelocity();
    this.updateShots();
    if (this.freeze > 0) this.freeze--;
  }

  private actAI(playerPosition: number) {
    if (this.freeze > 0) return;

    this.velocity += (this.direction == 1) ? CONST.ACCELERATION : -CONST.ACCELERATION;

    if (Math.random() * 100 < this.direction * 150 * Math.pow((this.position - playerPosition)/100.0, 3.0)) {
      this.direction *= -1;
    }

    if (Math.random() * 100 < 10) this.shoot();
  }
}

export default Enemy;
