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
