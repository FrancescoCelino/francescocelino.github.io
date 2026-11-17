import { useRef } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react';

// A deterministic parametric surface: no canvas, WebGL, video, or per-frame React state.
const contours = Array.from({ length: 27 }, (_, ring) => {
  const depth = ring / 26;
  const points = Array.from({ length: 145 }, (_, point) => {
    const angle = (point / 144) * Math.PI * 2;
    const radius = 117 + depth * 79;
    const wave = Math.cos(angle * 3 + depth * 2.7) * (9 + depth * 16);
    const x = 280 + Math.cos(angle) * (radius + wave);
    const y =
      266 + Math.sin(angle) * (radius * 0.59 + wave) + (depth - 0.5) * 65;
    return `${point === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `${points} Z`;
});

export function Signal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-16, 6]);
  return (
    <div className="signal" ref={ref} aria-hidden="true">
      <span className="signal-coordinate coordinate-top">
        Research → inference
      </span>
      <div className="signal-cross cross-top" />
      <m.div
        className="signal-surface"
        style={reduced ? undefined : { y, rotate }}
      >
        <svg viewBox="0 0 560 540" fill="none">
          {contours.map((path, index) => (
            <path
              key={index}
              d={path}
              stroke={index % 6 === 0 ? '#e7a57b' : '#8098ad'}
              strokeOpacity={index % 6 === 0 ? 0.95 : 0.32 + index / 110}
              strokeWidth={index % 6 === 0 ? 1.2 : 0.7}
            />
          ))}
          <ellipse
            cx="280"
            cy="266"
            rx="42"
            ry="23"
            stroke="#e7a57b"
            strokeWidth="0.8"
          />
        </svg>
      </m.div>
      <span className="signal-axis" />
      <span className="signal-coordinate coordinate-bottom">
        Complexity, made useful.
      </span>
      <div className="signal-cross cross-bottom" />
    </div>
  );
}
