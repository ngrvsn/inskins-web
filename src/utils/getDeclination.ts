export const getDeclination = (number: number, titles: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2]
  const mod100 = Math.abs(number) % 100
  const mod10 = mod100 % 10

  if (mod100 > 10 && mod100 < 20) {
    return titles[0]
  }

  if (mod10 > 1 && mod10 < 5) {
    return titles[2]
  }

  if (mod10 === 1) {
    return titles[1]
  }

  return titles[0]
}
