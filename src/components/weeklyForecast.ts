export const observations = [20, 23, 26, 34, 41, 35, 28] as const;
export const weekLabels = [
  '5 Jan',
  '12 Jan',
  '19 Jan',
  '26 Jan',
  '2 Feb',
  '9 Feb',
  '16 Feb',
  '23 Feb',
  '2 Mar',
  '9 Mar',
  '16 Mar',
] as const;

const forecastWeeks = 4;
const priorVariance = 16;
const weeklyVariance = 16;
const normal80 = 1.281551566;

export function weeklyForecast(values: readonly number[], cutoff: number) {
  const observed = values.slice(0, cutoff + 1);
  const latest = observed[cutoff]!;

  // Weekly changes are Normal(drift, weeklyVariance), with a zero-centered
  // Normal prior on drift. Their sum telescopes to the last minus first value.
  const driftVariance = 1 / (1 / priorVariance + cutoff / weeklyVariance);
  const drift = (driftVariance * (latest - observed[0]!)) / weeklyVariance;

  const predictions = Array.from({ length: forecastWeeks }, (_, index) => {
    const ahead = index + 1;
    const median = latest + ahead * drift;
    // Future weekly shocks are independent. The uncertain drift is shared.
    const spread =
      normal80 * Math.sqrt(ahead * weeklyVariance + ahead ** 2 * driftVariance);
    return {
      week: cutoff + ahead,
      median,
      lower: median - spread,
      upper: median + spread,
    };
  });

  return { cutoff, observed, predictions };
}

export const snapshots = observations
  .slice(2)
  .map((_, index) => weeklyForecast(observations, index + 2));
