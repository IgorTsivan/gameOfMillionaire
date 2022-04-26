export const prizeConverter = (prize: number): string => {
  const result = prize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${result}`;
};
