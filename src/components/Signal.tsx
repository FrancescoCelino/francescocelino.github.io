import { useRef, type RefObject } from 'react';
import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { portfolio } from '../content/portfolio';
import { landscapeFrame } from './lossLandscape';
import { useMediaQuery } from './useMediaQuery';

const labels = portfolio.lossLandscape;
const completeDescent = landscapeFrame(1);
type Frame = ReturnType<typeof landscapeFrame>;
type DrawnFrame = {
  [Key in keyof Frame]: Frame[Key] | MotionValue<Frame[Key]>;
};

function LandscapePlot({ frame }: { frame: DrawnFrame }) {
  return (
    <svg viewBox="0 0 360 258" fill="none" aria-hidden="true">
      <m.path className="loss-floor" d={frame.floor} />
      <m.path className="loss-axis" d={frame.axes} />
      <g className="loss-mesh">
        <m.path d={frame.farGrid} opacity={0.5} />
        <m.path d={frame.nearGrid} opacity={0.79} />
        <m.path className="loss-rim" d={frame.rim} />
      </g>
      <m.path className="loss-route" d={frame.trail} />
      <m.circle
        className="loss-start"
        cx={frame.startX}
        cy={frame.startY}
        r="4.7"
      />
      <m.path className="loss-gradient" d={frame.gradient} />
      <m.circle
        className="loss-current"
        cx={frame.markerX}
        cy={frame.markerY}
        r="4.7"
      />
      <g className="figure-axis-label">
        <m.text x={frame.lossX} y={frame.lossY} textAnchor="middle">
          {labels.loss}
        </m.text>
        <m.text x={frame.direction1X} y={frame.direction1Y} textAnchor="middle">
          {labels.direction1}
        </m.text>
        <m.text x={frame.direction2X} y={frame.direction2Y} textAnchor="middle">
          {labels.direction2}
        </m.text>
      </g>
    </svg>
  );
}

function RotatingLandscape({ progress }: { progress: MotionValue<number> }) {
  const scene = useTransform(progress, landscapeFrame);
  const frame = {
    floor: useTransform(scene, (value) => value.floor),
    axes: useTransform(scene, (value) => value.axes),
    farGrid: useTransform(scene, (value) => value.farGrid),
    nearGrid: useTransform(scene, (value) => value.nearGrid),
    rim: useTransform(scene, (value) => value.rim),
    trail: useTransform(scene, (value) => value.trail),
    gradient: useTransform(scene, (value) => value.gradient),
    startX: useTransform(scene, (value) => value.startX),
    startY: useTransform(scene, (value) => value.startY),
    markerX: useTransform(scene, (value) => value.markerX),
    markerY: useTransform(scene, (value) => value.markerY),
    lossX: useTransform(scene, (value) => value.lossX),
    lossY: useTransform(scene, (value) => value.lossY),
    direction1X: useTransform(scene, (value) => value.direction1X),
    direction1Y: useTransform(scene, (value) => value.direction1Y),
    direction2X: useTransform(scene, (value) => value.direction2X),
    direction2Y: useTransform(scene, (value) => value.direction2Y),
  };
  return <LandscapePlot frame={frame} />;
}

function DescentScrubber({ progress }: { progress: MotionValue<number> }) {
  const input = useRef<HTMLInputElement>(null);
  useMotionValueEvent(progress, 'change', (value) => {
    if (input.current) input.current.value = String(Math.round(value * 100));
  });

  return (
    <label className="figure-scrubber">
      {labels.scrubber}
      <input
        ref={input}
        type="range"
        min={0}
        max={100}
        defaultValue={0}
        onInput={(event) =>
          progress.set(event.currentTarget.valueAsNumber / 100)
        }
      />
    </label>
  );
}

function LossFigure({
  target,
  progress,
  shift,
}: {
  target?: RefObject<HTMLElement | null>;
  progress?: MotionValue<number>;
  shift?: MotionValue<number>;
}) {
  return (
    <m.figure
      className={shift ? 'signal signal-travel' : 'signal'}
      ref={target}
      style={shift ? { y: shift } : undefined}
    >
      <div className="figure-heading">{labels.title}</div>
      {progress ? (
        <RotatingLandscape progress={progress} />
      ) : (
        <LandscapePlot frame={completeDescent} />
      )}
      {progress ? <DescentScrubber progress={progress} /> : null}
      <figcaption>{labels.caption}</figcaption>
    </m.figure>
  );
}

function ScrollingLoss({ mobile }: { mobile: boolean }) {
  const target = useRef<HTMLElement>(null);
  const { scrollY, scrollYProgress } = useScroll(
    mobile ? { target, offset: ['start 72%', 'start 5%'] } : {},
  );
  const desktopProgress = useTransform(scrollY, [0, 380], [0, 1]);
  const desktopShift = useTransform(desktopProgress, [0, 1], [0, 135]);
  const scrollProgress = mobile ? scrollYProgress : desktopProgress;
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollProgress, 'change', (value) => progress.set(value));

  return (
    <LossFigure
      target={target}
      progress={progress}
      shift={mobile ? undefined : desktopShift}
    />
  );
}

export function Signal() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mobile = useMediaQuery('(max-width: 700px)');
  return reduced ? (
    <LossFigure />
  ) : (
    <ScrollingLoss mobile={mobile} key={mobile ? 'mobile' : 'desktop'} />
  );
}
