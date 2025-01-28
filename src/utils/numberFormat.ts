export const formatNumber = (num: number): string => {
  const absNum = Math.abs(num);
  let formattedNum: string;

  if (absNum >= 1000000) {
    formattedNum = (absNum / 1000000).toFixed(1) + 'M';
  } else if (absNum >= 1000) {
    formattedNum = (absNum / 1000).toFixed(1) + 'K';
  } else {
    formattedNum = absNum.toString();
  }

  return num < 0 ? '-' + formattedNum : formattedNum;
};