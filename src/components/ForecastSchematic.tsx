import { useRef, useState, type RefObject } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { research } from '../content/portfolio';
import { snapshots, weekLabels } from './weeklyForecast';
import { useMediaQuery } from './useMediaQuery';

const labels = research.schematic;
const left = 30;
const right = 375;
const top = 18;
const bottom = 177;
const valueMarks = [0, 20, 40, 60, 80];
const mainWeekLabels = [0, 3, 6, 10];
const extraWeekLabels = [8];

const weekX = (week: number) => left + (week * (right - left)) / 10;
const valueY = (value: number) =>
  +(bottom - (value * (bottom - top)) / 80).toFixed(2);
const coordinate = (week: number, value: number) =>
  `${weekX(week)},${valueY(value)}`;

const frames = snapshots.map(({ cutoff, observed, predictions }) => {
  const latest = observed[cutoff]!;
  const start = coordinate(cutoff, latest);
  const upper = predictions.map(({ week, upper }) => coordinate(week, upper));
  const lower = predictions
    .map(({ week, lower }) => coordinate(week, lower))
    .reverse();
  return {
    cutoff,
    latest,
    observed,
    observedPath: `M${observed.map((value, week) => coordinate(week, value)).join(' L')}`,
    median: `M${start} L${predictions.map(({ week, median }) => coordinate(week, median)).join(' L')}`,
    interval: `M${start} L${[...upper, ...lower].join(' L')} Z`,
  };
});

function ForecastAxes() {
  return (
    <>
      <path
        className="forecast-axis"
        d={`M${left} ${top}V${bottom}H${right}`}
      />
      {valueMarks.map((value) => (
        <g key={value}>
          <path
            className="forecast-gridline"
            d={`M${left} ${valueY(value)}H${right}`}
          />
          <text
            className="figure-axis-label"
            x={left - 8}
            y={valueY(value)}
            dy=".33em"
            textAnchor="end"
          >
            {value}
          </text>
        </g>
      ))}
      {weekLabels.map((label, week) => (
        <g key={label}>
          <path className="forecast-axis" d={`M${weekX(week)} ${bottom}v4`} />
          {mainWeekLabels.includes(week) || extraWeekLabels.includes(week) ? (
            <text
              className={`figure-axis-label${extraWeekLabels.includes(week) ? ' forecast-extra-date' : ''}`}
              x={weekX(week)}
              y={bottom + 23}
              textAnchor="middle"
            >
              {label}
            </text>
          ) : null}
        </g>
      ))}
    </>
  );
}

function ForecastFigure({
  frame,
  target,
  selectWeek,
}: {
  frame: (typeof frames)[number];
  target?: RefObject<HTMLElement | null>;
  selectWeek?: (index: number) => void;
}) {
  const { cutoff, latest, observed, observedPath, median, interval } = frame;
  const cutoffX = weekX(cutoff);

  return (
    <figure className="forecast" ref={target}>
      <div className="figure-heading">
        <span>{labels.title}</span>
        <span className="figure-context">{labels.context}</span>
      </div>
      <div className="forecast-meta">
        <span>{labels.valueAxis}</span>
        <span className="forecast-cutoff-date">
          {labels.cutoff} <strong>{weekLabels[cutoff]}</strong>
        </span>
      </div>
      <svg viewBox="0 0 402 207" fill="none" aria-hidden="true">
        <ForecastAxes />
        <path className="forecast-interval" d={interval} />
        <path className="forecast-cutoff" d={`M${cutoffX} ${top}V${bottom}`} />
        <path className="forecast-median" d={median} />
        <path className="forecast-observed" d={observedPath} />
        {observed.map((value, week) => (
          <circle
            className="forecast-observation"
            key={weekLabels[week]}
            cx={weekX(week)}
            cy={valueY(value)}
            r="3.4"
          />
        ))}
        <circle
          className="forecast-latest"
          cx={cutoffX}
          cy={valueY(latest)}
          r="5.4"
        />
      </svg>
      <ul className="forecast-legend" aria-label="Chart legend">
        <li>
          <span className="legend-observed" aria-hidden="true" />
          {labels.observed}
        </li>
        <li>
          <span className="legend-median" aria-hidden="true" />
          {labels.median}
        </li>
        <li>
          <span className="legend-interval" aria-hidden="true" />
          {labels.interval}
        </li>
      </ul>
      {selectWeek ? (
        <label className="figure-scrubber">
          {labels.scrubber}
          <input
            type="range"
            min={0}
            max={frames.length - 1}
            value={cutoff - frames[0]!.cutoff}
            aria-valuetext={`${labels.cutoff} ${weekLabels[cutoff]}`}
            onChange={(event) => selectWeek(event.currentTarget.valueAsNumber)}
          />
        </label>
      ) : null}
      <figcaption>{labels.caption}</figcaption>
    </figure>
  );
}

function ScrollingForecast() {
  const target = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start 70%', 'start 8%'],
  });
  const week = useTransform(scrollYProgress, (value) =>
    Math.min(frames.length - 1, Math.floor(value * frames.length)),
  );
  const [index, setIndex] = useState(0);
  useMotionValueEvent(week, 'change', setIndex);

  return (
    <ForecastFigure
      frame={frames[index]!}
      target={target}
      selectWeek={setIndex}
    />
  );
}

export function ForecastSchematic() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return reduced ? (
    <ForecastFigure frame={frames[frames.length - 1]!} />
  ) : (
    <ScrollingForecast />
  );
}
