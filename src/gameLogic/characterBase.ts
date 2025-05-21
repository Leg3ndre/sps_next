import * as CONST from '@/constants/game';
import Shot from './shot';

const MAX_POSITION = CONST.WIDTH;
const MIN_POSITION = -CONST.WIDTH;

class CharacterBase {
  life = CONST.INITIAL_LIFE;
  position = 0.0;
  protected velocity = 0.0;

  shotList: Shot[] = [];
  protected shotWait = 0;
  protected freeze = 0;
  protected side = CONST.SIDE_ENEMY;

  protected drawShots(ctx: CanvasRenderingContext2D, cameraPosition: number) {
    for (const shot of this.shotList) {
      shot.draw(ctx, cameraPosition);
    }
  }

  protected updatePositionAndVelocity() {
    if (this.isInMovableRange()) {
      this.position += this.velocity;
    } else {
      this.velocity = 0.0;
    }
    this.velocity *= CONST.DECELERATION_RATE;
  }

  protected updateShots() {
    for (const shot of this.shotList) {
      shot.tick();
    }
    this.shotList = this.shotList.filter(t => t.isAlive);
    if (this.shotWait > 0) this.shotWait--;
  }

  protected updateLifeAndFreeze(attackShots: Shot[]) {
    if (this.freeze > 0) this.freeze--;

    if (this.isAttacked(attackShots)) {
      this.life--;
      this.freeze = CONST.FREEZE_WAIT;
    }
  }

  protected shoot() {
    if (!this.canShot()) return;

    var newShot = new Shot(this.position, this.side);
    this.shotList.push(newShot);
    this.shotWait = CONST.SHOT_WAIT;
  }

  protected canShot() {
    return (this.shotList.length < CONST.MAX_SHOT_NUM && this.shotWait <= 0);
  }

  protected isInMovableRange() {
    return (this.position + this.velocity <= MAX_POSITION && this.position + this.velocity >= MIN_POSITION);
  }

  protected isAttacked(attackShots: Shot[]) {
    if (this.freeze > 0) return false;

    for (const shot of attackShots) {
      if (shot.hits(this.position)) return true;
    }
    return false;
  }
}

export default CharacterBase;
