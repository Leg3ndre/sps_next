export const drawFrame = (
  ctx: CanvasRenderingContext2D,
  pt1x: number, pt1y: number,
  pt2x: number, pt2y: number,
  color = "white",
  lineWidth = 1
) => {
  ctx.beginPath();
  ctx.moveTo(pt1x, pt1y);
  ctx.lineTo(pt2x, pt1y);
  ctx.lineTo(pt2x, pt2y);
  ctx.lineTo(pt1x, pt2y);
  ctx.lineTo(pt1x, pt1y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}
