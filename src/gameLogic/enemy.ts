import * as CONST from '@/constants/game';
import CharacterBase from '@/gameLogic/characterBase';
import Shot from '@/gameLogic/shot';
import { drawFrame } from '@/gameLogic/drawUtils';
import { vec2D } from '@/gameLogic/projectionUtils';

class Enemy extends CharacterBase {
  protected side = CONST.SIDE_ENEMY;
  private direction = 0;

  constructor() {
    super();
    this.direction = (Math.random() * 10 < 5) ? -1 : 1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.drawShots(ctx, this.position);
    if (this.freeze > 0) this.drawFreezed(ctx);
  }

  tick(playerPosition: number, playerShots: Shot[]): void {
    this.actAI(playerPosition);
    this.updatePositionAndVelocity();
    this.updateShots();
    this.updateLifeAndFreeze(playerShots);
  }

  private actAI(playerPosition: number) {
    if (this.freeze > 0) return;

    this.velocity += (this.direction == 1) ? CONST.ACCELERATION : -CONST.ACCELERATION;
    if (Math.random() * 100 < this.direction * 150 * Math.pow((this.position - playerPosition) / 100.0, 3.0)) {
      this.direction *= -1;
    }

    if (Math.random() * 100 < 10) this.shoot();
  }

  drawFreezed(ctx: CanvasRenderingContext2D, interval = 5): void {
    for (let i = 0; i < (CONST.FREEZE_WAIT - 50) / interval; i++) {
      const frz_w = Math.max(1.0 - Math.pow((this.freeze + i * interval) / CONST.FREEZE_WAIT, 5.0), 0.0);
      const pt1: vec2D = { x: -frz_w * 320 + 320, y: -frz_w * 240 + 240 };
      const pt2: vec2D = { x: frz_w * 320 + 320,  y: frz_w * 240 + 240  };
      drawFrame(ctx, pt1, pt2, "white", 5);
    }
  }
}

export default Enemy;
