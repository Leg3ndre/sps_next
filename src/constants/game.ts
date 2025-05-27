export const FPS = 60.0;
export const WIDTH = 400;

export const SIDE_ENEMY = 0;
export const SIDE_PLAYER = 1;

// Characters properties
export const ACCELERATION = 0.1;
export const DECELERATION_RATE = 0.995;
export const INPUT_DELAY = 18;
export const SHOT_WAIT = 15;
export const FREEZE_WAIT = 120.0;
export const INITIAL_LIFE = 5;

// Display properties
export const ENEMY_Z = -100.0;
export const PLAYER_HEIGHT = 20;
export const LINE_START_Z = -90;
export const LINE_END_Z = 100;
export const LINE_SPLIT_X = 50;
export const LINE_NUM_X = WIDTH * 2 / LINE_SPLIT_X;
export const LINE_NUM_Y = 6;
export const LINE_SPLIT_Y = (LINE_END_Z - LINE_START_Z) / LINE_NUM_Y;

// Shot properties
export const MAX_SHOT_NUM = 5;
export const SHOT_START_Z = -90.0;
export const SHOT_END_Z = 90.0;
export const SHOT_SIZE = 5.0;
export const SHOT_HIT_SIZE = 9.0;

export const PLAYER_COLOR = "red";
export const ENEMY_COLOR = "lime";
