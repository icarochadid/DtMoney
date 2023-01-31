import { TransactionsContext } from "../contexts/transactionContexts";
import {useContextSelector} from "use-context-selector"

export function useSummary() {
    const Transactions = useContextSelector(TransactionsContext, (context)=> {
      return context.Transactions
    })
    const Summary = Transactions.reduce((acc, transaction) => {
        if(transaction.type == 'income') {
          acc.income += transaction.price,
          acc.total += transaction.price
        } if (transaction.type == 'outcome') {
          acc.outcome += transaction.price,
          acc.total -= transaction.price
        }  return acc;
    }, {income:0, outcome:0, total:0,})
    return Summary
}