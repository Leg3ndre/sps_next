import * as CONST from '@/constants/game';

class Shot {
  private x;
  private z;
  private side;
  private velocityZ = 1.0;
  isAlive = true;

  constructor(position: number, side: number) {
    this.x = position;
    this.side = side;
    this.z = (this.side == CONST.SIDE_PLAYER) ? CONST.SHOT_END_Z : CONST.SHOT_START_Z;
  }

  tick(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    this.z -= ((this.side == CONST.SIDE_PLAYER) ? 1.0 : -1.0) * this.velocityZ;
    this.updateAlive();
    this.draw(ctx, enemyPosition);
  }

  private updateAlive() {
    if (this.side == CONST.SIDE_PLAYER) {
      if (this.z <= CONST.SHOT_START_Z) this.isAlive = false;
    } else {
      if (this.z >= CONST.SHOT_END_Z) this.isAlive = false;
    }
  }

  private draw(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    if (!this.isAlive) return;

    if (this.side == CONST.SIDE_PLAYER) {
      this.drawPlayerSide(ctx, enemyPosition);
    } else {
      this.drawEnemySide(ctx, enemyPosition);
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

  private drawEnemySide(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    this.drawTriangle(
      ctx,
      (this.x - enemyPosition) * (-CONST.ENEMY_Z) / (this.z + CONST.SHOT_SIZE - CONST.ENEMY_Z) + 320,
      CONST.PLAYER_HEIGHT * 0.67 * (-CONST.ENEMY_Z) / (this.z + CONST.SHOT_SIZE - CONST.ENEMY_Z) + 240,
      (this.x - enemyPosition + CONST.SHOT_SIZE * 0.7) * (-CONST.ENEMY_Z) / (this.z - CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 320,
      CONST.PLAYER_HEIGHT * 0.33 * (-CONST.ENEMY_Z) / (this.z - CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 240,
      (this.x - enemyPosition - CONST.SHOT_SIZE * 0.7) * (-CONST.ENEMY_Z) / (this.z - CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 320,
      CONST.PLAYER_HEIGHT * 0.33 * (-CONST.ENEMY_Z) / (this.z - CONST.SHOT_SIZE * 0.7 - CONST.ENEMY_Z) + 240,
      CONST.ENEMY_COLOR
    );
  }

  private drawTriangle(
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

  hits(position: number) {
    if (this.side == CONST.SIDE_ENEMY) {
      return (this.distance(position, CONST.SHOT_END_Z, this.x, this.z) < CONST.SHOT_HIT_SIZE);
    }
  }

  private distance(x1: number, z1: number, x2: number, z2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2.0) + Math.pow(z1 - z2, 2.0));
  }
}

export default Shot;
