import * as CONST from '@/constants/game';
import { projection, vec3D } from '@/gameLogic/projectionUtils';
import { drawLine } from '@/gameLogic/drawUtils';

class Field {
  draw(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    for (let i = 0; i <= CONST.LINE_NUM_X; i++) {
      const pt1: vec3D = { x: CONST.LINE_SPLIT_X * i - CONST.WIDTH, y: CONST.PLAYER_HEIGHT, z: CONST.LINE_START_Z };
      const pt2: vec3D = { x: CONST.LINE_SPLIT_X * i - CONST.WIDTH, y: CONST.PLAYER_HEIGHT, z: CONST.LINE_END_Z   };
      const [ppt1, ppt2] = [pt1, pt2].map((pt) => projection(pt, enemyPosition));
      drawLine(ctx, ppt1, ppt2);
    }

    for (let i = 0; i <= CONST.LINE_NUM_Y; i++) {
      const pt1: vec3D = { x: -CONST.WIDTH, y: CONST.PLAYER_HEIGHT, z: CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z };
      const pt2: vec3D = { x: CONST.WIDTH,  y: CONST.PLAYER_HEIGHT, z: CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z };
      const [ppt1, ppt2] = [pt1, pt2].map((pt) => projection(pt, enemyPosition));
      drawLine(ctx, ppt1, ppt2);
    }
  }
}

export default Field;
