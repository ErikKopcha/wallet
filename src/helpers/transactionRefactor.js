import { numberWithSpaces } from './helpers';

export const transactionRefactor = (transaction, categoriesState) => {
  return {
    id: transaction.id,
    date: (new Date(transaction.transactionDate)).toLocaleDateString(),
    comment: transaction.comment,
    amount: numberWithSpaces(+transaction.amount < 0 ? (+transaction.amount * (-1)).toString() : transaction.amount),
    type: transaction.type === 'INCOME' ? '+' : '-',
    category: (categoriesState.find(category => category.id === transaction.categoryId)).name,
  }
}