import * as CONST from '@/constants/game';

class Field {
  draw(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    for (let i = 0; i <= CONST.LINE_NUM_X; i++) {
      this.drawLine(ctx,
        (CONST.LINE_SPLIT_X * i - CONST.WIDTH - enemyPosition) * CONST.MAG_START + 320,
        CONST.MAN_HEIGHT * CONST.MAG_START + 240,
        (CONST.LINE_SPLIT_X * i - CONST.WIDTH - enemyPosition) * CONST.MAG_END + 320,
        CONST.MAN_HEIGHT * CONST.MAG_END + 240);
    }

    for (let i = 0; i <= CONST.LINE_NUM_Y; i++) {
      this.drawLine(ctx,
        (-CONST.WIDTH - enemyPosition) * (-CONST.ENEMY_Z) / (CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z  - CONST.ENEMY_Z) + 320,
        CONST.MAN_HEIGHT * (-CONST.ENEMY_Z) / (CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z  - CONST.ENEMY_Z) + 240,
        (CONST.WIDTH - enemyPosition) * (-CONST.ENEMY_Z) / (CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z  - CONST.ENEMY_Z) + 320,
        CONST.MAN_HEIGHT * (-CONST.ENEMY_Z) / (CONST.LINE_SPLIT_Y * i + CONST.LINE_START_Z  - CONST.ENEMY_Z) + 240);
    }
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    tlx: number, tly: number, brx: number, bry: number,
    col = "yellow",
    lw = 1
  ) {
    ctx.beginPath();
    ctx.moveTo(tlx, tly);
    ctx.lineTo(brx, bry);
    ctx.strokeStyle = col;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

export default Field;
