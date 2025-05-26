import * as CONST from '@/constants/game';
import { perspective, projection, transport, vec2D, vec3D } from '@/gameLogic/projectionUtils';

class Field {
  draw(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    for (let i = 0; i <= CONST.LINE_NUM_X; i++) {
      const pt1 = perspective(transport({ x: CONST.LINE_SPLIT_X * i - CONST.WIDTH, y: CONST.PLAYER_HEIGHT }, enemyPosition), CONST.MAG_START);
      const pt2 = perspective(transport({ x: CONST.LINE_SPLIT_X * i - CONST.WIDTH, y: CONST.PLAYER_HEIGHT }, enemyPosition), CONST.MAG_END);
      this.drawLine(ctx, pt1, pt2);
    }

    for (let i = 0; i <= CONST.LINE_NUM_Y; i++) {
      const pt1 = projection({ x: -CONST.WIDTH, y: CONST.PLAYER_HEIGHT, z: CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z }, enemyPosition);
      const pt2 = projection({ x: CONST.WIDTH,  y: CONST.PLAYER_HEIGHT, z: CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z }, enemyPosition);
      this.drawLine(ctx, pt1, pt2);
    }
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    topLeft: vec2D,
    bottomRight: vec2D,
    color = "yellow",
    lineWidth = 1,
  ) {
    ctx.beginPath();
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(bottomRight.x, bottomRight.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

export default Field;
