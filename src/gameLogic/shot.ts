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

  tick(): void {
    this.z -= ((this.side == CONST.SIDE_PLAYER) ? 1.0 : -1.0) * this.velocityZ;
    console.log("tick", this.z);
    this.updateAlive();
  }

  // private dist(x1, y1, x2, y2) {
  //   return Math.sqrt(Math.pow(x1 - x2, 2.0) + Math.pow(y1 - y2, 2.0));
  // }

  private updateAlive() {
    if (this.side == CONST.SIDE_PLAYER) {
      if (this.z <= CONST.SHOT_START_Z) this.isAlive = false;
    }
  }
}

export default Shot;
