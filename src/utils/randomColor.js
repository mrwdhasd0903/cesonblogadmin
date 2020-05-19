//随机颜色生成
export function randomColor(n = 100) {
  //补齐值
  const c = 256 - n;
  const r = (Math.floor(Math.random() * n + c)).toString(16);
  const g = (Math.floor(Math.random() * n + c)).toString(16);
  const b = (Math.floor(Math.random() * n + c)).toString(16);
  return "#" + r + g + b
}