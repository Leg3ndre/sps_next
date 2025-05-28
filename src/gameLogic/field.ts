import * as CONST from '@/constants/game';
import { projection, vec3D } from '@/gameLogic/projectionUtils';
import { drawLine } from '@/gameLogic/drawUtils';

const LINE_SPLIT_X = (CONST.LINE_MAX_X - CONST.LINE_MIN_X) / CONST.LINE_NUM_X;
const LINE_SPLIT_Z = (CONST.LINE_END_Z - CONST.LINE_START_Z) / CONST.LINE_NUM_Z;

class Field {
  draw(ctx: CanvasRenderingContext2D, enemyPosition: number): void {
    for (let i = 0; i <= CONST.LINE_NUM_X; i++) {
      const pt1: vec3D = { x: CONST.LINE_MIN_X + LINE_SPLIT_X * i, y: CONST.CARACTER_HEIGHT, z: CONST.LINE_START_Z };
      const pt2: vec3D = { x: CONST.LINE_MIN_X + LINE_SPLIT_X * i, y: CONST.CARACTER_HEIGHT, z: CONST.LINE_END_Z   };
      const [ppt1, ppt2] = [pt1, pt2].map((pt) => projection(pt, enemyPosition));
      drawLine(ctx, ppt1, ppt2);
    }

    for (let i = 0; i <= CONST.LINE_NUM_Z; i++) {
      const pt1: vec3D = { x: CONST.LINE_MIN_X, y: CONST.CARACTER_HEIGHT, z: CONST.LINE_START_Z + LINE_SPLIT_Z * i };
      const pt2: vec3D = { x: CONST.LINE_MAX_X, y: CONST.CARACTER_HEIGHT, z: CONST.LINE_START_Z + LINE_SPLIT_Z * i };
      const [ppt1, ppt2] = [pt1, pt2].map((pt) => projection(pt, enemyPosition));
      drawLine(ctx, ppt1, ppt2);
    }
  }
}

export default Field;
