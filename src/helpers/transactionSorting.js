export const transactionSortingByDate = (transactions) => {
  const copiedArray = [...transactions];
  const sortedArray = copiedArray.sort((a, b) => (new Date(b.transactionDate)) - (new Date(a.transactionDate)));
  return sortedArray;
}