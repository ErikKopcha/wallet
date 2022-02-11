export const transactionSortingByDate = (transactions) => {
  const copiedArray = [...transactions];
  return copiedArray.sort((a, b) => (new Date(a.date)).getTime() > (new Date(b.date)).getTime() ? -1 : 1);
}