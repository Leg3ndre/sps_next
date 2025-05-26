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
  const scale = -camera.z / (position.z - camera.z);
  return perspective(transport(position, enemyPosition), scale);
}

export const transport = (position: vec2D, enemyPosition: number): vec2D => {
  const camera = getCameraPosition(enemyPosition);
  return {
    x: position.x - camera.x,
    y: position.y - camera.y,
  };
}

export const perspective = (position: vec2D, scale: number): vec2D => {
  return {
    x: position.x * scale + 320,
    y: position.y * scale + 240,
  };
}

const getCameraPosition = (enemyPosition: number): vec3D => {
  return {
    x: enemyPosition,
    y: 0,
    z: CONST.ENEMY_Z,
  };
}