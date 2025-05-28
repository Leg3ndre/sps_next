import * as CONST from '@/constants/game';
import { projection, vec3D } from '@/gameLogic/projectionUtils';
import { drawTriangle } from '@/gameLogic/drawUtils';

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

  tick(): void {
    this.z -= ((this.side == CONST.SIDE_PLAYER) ? 1.0 : -1.0) * this.velocityZ;
    this.updateAlive();
  }

  private updateAlive() {
    if (this.side == CONST.SIDE_PLAYER) {
      if (this.z <= CONST.SHOT_START_Z) this.isAlive = false;
    } else {
      if (this.z >= CONST.SHOT_END_Z) this.isAlive = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    if (!this.isAlive) return;

    let pt1, pt2, pt3, color;
    if (this.side == CONST.SIDE_PLAYER) {
      [pt1, pt2, pt3] = this.buildPlayerShot(enemyPosition);
      color = CONST.PLAYER_COLOR;
    } else {
      [pt1, pt2, pt3] = this.buildEnemyShot(enemyPosition);
      color = CONST.ENEMY_COLOR;
    }
    drawTriangle(ctx, pt1, pt2, pt3, color);
  }

  private buildPlayerShot(enemyPosition: number) {
    const pt1: vec3D = { x: this.x,                         y: CONST.CARACTER_HEIGHT * 0.67, z: this.z - CONST.SHOT_SIZE       };
    const pt2: vec3D = { x: this.x + CONST.SHOT_SIZE * 0.7, y: CONST.CARACTER_HEIGHT * 0.33, z: this.z + CONST.SHOT_SIZE * 0.7 };
    const pt3: vec3D = { x: this.x - CONST.SHOT_SIZE * 0.7, y: CONST.CARACTER_HEIGHT * 0.33, z: this.z + CONST.SHOT_SIZE * 0.7 };
    return [pt1, pt2, pt3].map((pt) => projection(pt, enemyPosition));
  }

  private buildEnemyShot(enemyPosition: number) {
    const pt1: vec3D = { x: this.x,                         y: CONST.CARACTER_HEIGHT * 0.67, z: this.z + CONST.SHOT_SIZE       };
    const pt2: vec3D = { x: this.x + CONST.SHOT_SIZE * 0.7, y: CONST.CARACTER_HEIGHT * 0.33, z: this.z - CONST.SHOT_SIZE * 0.7 };
    const pt3: vec3D = { x: this.x - CONST.SHOT_SIZE * 0.7, y: CONST.CARACTER_HEIGHT * 0.33, z: this.z - CONST.SHOT_SIZE * 0.7 };
    return [pt1, pt2, pt3].map((pt) => projection(pt, enemyPosition));
  }

  hits(position: number) {
    if (this.side == CONST.SIDE_PLAYER) {
      return (this.distance(position, CONST.SHOT_START_Z, this.x, this.z) < CONST.SHOT_HIT_SIZE);
    } else {
      return (this.distance(position, CONST.SHOT_END_Z, this.x, this.z) < CONST.SHOT_HIT_SIZE);
    }
  }

  private distance(x1: number, z1: number, x2: number, z2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2.0) + Math.pow(z1 - z2, 2.0));
  }
}

export default Shot;
