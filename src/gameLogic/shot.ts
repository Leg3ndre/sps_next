import * as CONST from '@/constants/game';

class Shot {
  x;
  z;
  side;
  velocityZ = 1.0;
  isAlive = true;

  constructor(position: number, side: number) {
    this.x = position;
    this.side = side;
    this.z = (this.side == CONST.SIDE_PLAYER) ? CONST.SHOT_END_Z : CONST.SHOT_START_Z;
  }

  tick(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    this.z -= ((this.side == CONST.SIDE_PLAYER) ? 1.0 : -1.0) * this.velocityZ;
    console.log("tick", this.z);
    this.updateAlive();

    this.draw(ctx, enemyPosition);
  }

  // private dist(x1, y1, x2, y2) {
  //   return Math.sqrt(Math.pow(x1 - x2, 2.0) + Math.pow(y1 - y2, 2.0));
  // }

  private updateAlive() {
    if (this.side == CONST.SIDE_PLAYER) {
      if (this.z <= CONST.SHOT_START_Z) this.isAlive = false;
    }
  }

  private draw(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    if (!this.isAlive) return;

    if (this.side == CONST.SIDE_PLAYER) {
      this.drawPlayerSide(ctx, enemyPosition);
    }
  }

  private drawPlayerSide(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    this.drawTriangle(
      ctx,
      (this.x - enemyPosition) * (-CONST.ENEMY_Z) / (this.z - CONST.SHOT_SIZE - CONST.ENEMY_Z) + 320,
      CONST.PLAYER_HEIGHT * 0.67 * (-CONST.ENEMY_Z) / (this.z - CONST.SHOT_SIZE - CONST.ENEMY_Z) + 240,
      (this.x - enemyPosition + CONST.SHOT_SIZE * 0.7) * (-CONST.ENEMY_Z) / (this.z + CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 320,
      CONST.PLAYER_HEIGHT * 0.33 * (-CONST.ENEMY_Z) / (this.z + CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 240,
      (this.x - enemyPosition - CONST.SHOT_SIZE * 0.7) * (-CONST.ENEMY_Z) / (this.z + CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 320,
      CONST.PLAYER_HEIGHT * 0.33 * (-CONST.ENEMY_Z) / (this.z + CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 240,
      CONST.PLAYER_COLOR
    );
  }

  drawTriangle(
    ctx: CanvasRenderingContext2D,
    pt1x: number, pt1y: number,
    pt2x: number, pt2y: number,
    pt3x: number, pt3y: number,
    color: string,
  ) {
    ctx.beginPath();
    ctx.moveTo(pt1x, pt1y);
    ctx.lineTo(pt2x, pt2y);
    ctx.lineTo(pt3x, pt3y);
    ctx.lineTo(pt1x, pt1y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

export default Shot;
