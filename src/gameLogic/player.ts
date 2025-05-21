import * as CONST from '@/constants/game';

const MAX_POSITION = CONST.WIDTH;
const MIN_POSITION = -CONST.WIDTH;

class Player {
  image;
  position = 0.0;
  velocity = 0.0;
  shotList = [];
  shotWait = 0;
  freeze = 0;

  constructor() {
    this.image = new Image;
    this.image.src = "/player.png";
  }

  draw(ctx: CanvasRenderingContext2D, enemyPosition: number) {
    ctx.drawImage(
      this.image,
      (this.position - enemyPosition - this.image.width/2.0) * CONST.MAG_END + 320,
      (CONST.PLAYER_HEIGHT - this.image.height) * CONST.MAG_END + 240,
      this.image.width * CONST.MAG_END,
      this.image.height * CONST.MAG_END
    );
  }
}

export default Player;
