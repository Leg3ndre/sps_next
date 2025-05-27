import { vec2D } from "./projectionUtils";

export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  pt1: vec2D,
  pt2: vec2D,
  color = "white",
  lineWidth = 1
) => {
  ctx.beginPath();
  ctx.moveTo(pt1.x, pt1.y);
  ctx.lineTo(pt2.x, pt1.y);
  ctx.lineTo(pt2.x, pt2.y);
  ctx.lineTo(pt1.x, pt2.y);
  ctx.lineTo(pt1.x, pt1.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  topLeft: vec2D,
  bottomRight: vec2D,
  color = "yellow",
  lineWidth = 1,
) => {
  ctx.beginPath();
  ctx.moveTo(topLeft.x, topLeft.y);
  ctx.lineTo(bottomRight.x, bottomRight.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

export const drawTriangle = (
  ctx: CanvasRenderingContext2D,
  pt1: vec2D,
  pt2: vec2D,
  pt3: vec2D,
  color: string,
) => {
  ctx.beginPath();
  ctx.moveTo(pt1.x, pt1.y);
  ctx.lineTo(pt2.x, pt2.y);
  ctx.lineTo(pt3.x, pt3.y);
  ctx.lineTo(pt1.x, pt1.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.stroke();
}
