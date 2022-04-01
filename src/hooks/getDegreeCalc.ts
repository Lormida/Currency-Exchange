export const getDegreeCalc = (value: string | number, degree: number): number => {
  return +(+value / Math.pow(10, degree)).toFixed(2)
}
