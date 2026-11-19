type Point = { x: number; y: number };
type SurfacePoint = { u: number; v: number; loss: number };

const valleyCurvature = 0.35;
const alongValleyWeight = 0.16;
const acrossValleyWeight = 0.62;

function valleyOffset(u: number, v: number) {
  return v - valleyCurvature * u * u + 0.1;
}

function surfacePoint(u: number, v: number): SurfacePoint {
  return {
    u,
    v,
    loss:
      0.04 +
      alongValleyWeight * u * u +
      acrossValleyWeight * valleyOffset(u, v) ** 2,
  };
}

function downhill({ u, v }: SurfacePoint) {
  const residual = valleyOffset(u, v);
  return {
    u:
      4 * acrossValleyWeight * valleyCurvature * u * residual -
      2 * alongValleyWeight * u,
    v: -2 * acrossValleyWeight * residual,
  };
}

export const descent = (() => {
  let point = surfacePoint(0.84, -0.76);
  const learningRate = 0.17;
  return Array.from({ length: 43 }, () => {
    const step = point;
    const direction = downhill(step);
    point = surfacePoint(
      step.u + learningRate * direction.u,
      step.v + learningRate * direction.v,
    );
    return step;
  });
})();

let length = 0;
const distances = descent.map((point, index) => {
  const previous = descent[index - 1];
  if (previous)
    length += Math.hypot(
      point.u - previous.u,
      point.v - previous.v,
      point.loss - previous.loss,
    );
  return length;
});

const samples = Array.from({ length: 23 }, (_, index) => index / 11 - 1);
const gridLines = Array.from({ length: 11 }, (_, index) => {
  const coordinate = index / 5 - 1;
  return {
    near: coordinate > 0,
    alongU: samples.map((u) => surfacePoint(u, coordinate)),
    alongV: samples.map((v) => surfacePoint(coordinate, v)),
  };
});
const rim = [
  ...samples.map((u) => surfacePoint(u, 1)),
  ...samples
    .slice(0, -1)
    .reverse()
    .map((v) => surfacePoint(1, v)),
];

const round = (value: number) => Math.round(value * 10) / 10;
const xy = ({ x, y }: Point) => `${round(x)},${round(y)}`;
const pathThrough = (points: readonly Point[]) =>
  `M${points.map(xy).join('L')}`;

function arrow(from: Point, to: Point, headSize: number) {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const dx = (to.x - from.x) / length;
  const dy = (to.y - from.y) / length;
  const baseX = to.x - headSize * dx;
  const baseY = to.y - headSize * dy;
  const wing = headSize * 0.48;
  return `${pathThrough([from, to])}${pathThrough([
    { x: baseX - wing * dy, y: baseY + wing * dx },
    to,
    { x: baseX + wing * dy, y: baseY - wing * dx },
  ])}`;
}

export function landscapeFrame(progress: number) {
  // Orbit around the loss axis, then project the unchanged surface through
  // a shallow perspective camera. Progress along the route is in model space.
  const angle = ((24 + 40 * progress) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const project = ({ u, v, loss }: SurfacePoint): Point => {
    const depth = sin * u + cos * v;
    const scale = 1 / (1 - 0.075 * depth);
    return {
      x: 180 + 106 * (cos * u - sin * v) * scale,
      y: 158 + (49 * depth - 68 * loss) * scale,
    };
  };
  const ground = (u: number, v: number) => project({ u, v, loss: 0 });
  const west = ground(-1, 1);
  const front = ground(1, 1);
  const east = ground(1, -1);
  const lossBase = { x: Math.max(18, west.x - 5), y: west.y - 5 };
  const lossTop = { x: lossBase.x, y: lossBase.y - 81 };

  let farGrid = '';
  let nearGrid = '';
  for (const { near, alongU, alongV } of gridLines) {
    const lines =
      pathThrough(alongU.map(project)) + pathThrough(alongV.map(project));
    if (near) nearGrid += lines;
    else farGrid += lines;
  }

  const distance = progress * length;
  const index = distances.findIndex((stop) => stop >= distance && stop > 0);
  const before = descent[index - 1]!;
  const after = descent[index]!;
  const portion =
    (distance - distances[index - 1]!) /
    (distances[index]! - distances[index - 1]!);
  const point = surfacePoint(
    before.u + (after.u - before.u) * portion,
    before.v + (after.v - before.v) * portion,
  );
  const marker = project(point);
  const start = project(descent[0]!);
  const trail =
    progress > 0
      ? pathThrough([...descent.slice(0, index).map(project), marker])
      : '';

  // Project the negative gradient in the local tangent plane so the arrow
  // remains attached to the point and shows the next downhill direction.
  const direction = downhill(point);
  const next = project({
    u: point.u + direction.u * 0.01,
    v: point.v + direction.v * 0.01,
    loss: point.loss - (direction.u ** 2 + direction.v ** 2) * 0.01,
  });
  const heading = Math.hypot(next.x - marker.x, next.y - marker.y);
  const arrowLength = 27 * Math.min(1, (1 - progress) * 7);
  const gradient =
    heading > 0 && arrowLength > 5
      ? arrow(
          marker,
          {
            x: marker.x + ((next.x - marker.x) / heading) * arrowLength,
            y: marker.y + ((next.y - marker.y) / heading) * arrowLength,
          },
          Math.min(7, arrowLength * 0.35),
        )
      : '';

  return {
    floor: `${pathThrough([ground(-1, -1), east, front, west])}Z`,
    axes:
      arrow(front, west, 7) +
      arrow(front, east, 7) +
      arrow(lossBase, lossTop, 7),
    farGrid,
    nearGrid,
    rim: pathThrough(rim.map(project)),
    trail,
    gradient,
    startX: round(start.x),
    startY: round(start.y),
    markerX: round(marker.x),
    markerY: round(marker.y),
    lossX: round(lossTop.x),
    lossY: round(lossTop.y - 8),
    direction1X: round((front.x + west.x) / 2 - 6),
    direction1Y: round((front.y + west.y) / 2 + 19),
    direction2X: round((front.x + east.x) / 2 + 12),
    direction2Y: round((front.y + east.y) / 2 + 17),
  };
}
