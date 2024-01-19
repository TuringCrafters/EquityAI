import regression, { DataPoint } from "regression";

export function calculateLineOfBestFit(dataPoints: DataPoint[]) {
  const slope = regression.linear(dataPoints);

  const start = {
    yearsOfExperience: slope.points[0][0],
    line: (slope.equation[0] * slope.points[0][0] + slope.equation[1]) / 1000,
  };

  const end = {
    yearsOfExperience: slope.points[slope.points.length - 1][0],
    line:
      (slope.equation[0] * slope.points[slope.points.length - 1][0] +
        slope.equation[1]) /
      1000,
  };

  return [start, end];
}
