import * as CONST from '@/constants/game';

export type vec3D = {
  x: number;
  y: number;
  z: number;
}

export type vec2D = {
  x: number;
  y: number;
}

export const projection = (position: vec3D, enemyPosition: number): vec2D => {
  const camera = getCameraPosition(enemyPosition);
  const scale = getPerspectiveScale(position, enemyPosition);
  return {
    x: (position.x - camera.x) * scale + 320,
    y: (position.y - camera.y) * scale + 240,
  };
}

export const getPerspectiveScale = (position: vec3D, enemyPosition: number): number => {
  const camera = getCameraPosition(enemyPosition);
  return (-camera.z / (position.z - camera.z));
}

const getCameraPosition = (enemyPosition: number): vec3D => {
  return {
    x: enemyPosition,
    y: 0,
    z: CONST.ENEMY_Z,
  };
}
