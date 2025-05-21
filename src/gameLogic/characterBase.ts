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

  protected updatePositionAndVelocity() {
    if (this.isInMovableRange()) {
      this.position += this.velocity;
    } else {
      this.velocity = 0.0;
    }
    this.velocity *= CONST.DECELERATION_RATE;
  }

  protected updateShots(ctx: CanvasRenderingContext2D, cameraPosition: number) {
    for (const shot of this.shotList) {
      shot.tick(ctx, cameraPosition);
    }
    this.shotList = this.shotList.filter(t => t.isAlive);
    if (this.shotWait > 0) this.shotWait--;
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
}

export default CharacterBase;
