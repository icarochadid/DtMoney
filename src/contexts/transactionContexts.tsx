import { Children, ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../lib/axios"

interface TransactionsTypeProps {
    id: number,
    type: "income" | "outcome",
    descrip: string,
    price: number,
    createAt:string,
    category: string,
}
interface CreateTransactionType {
    descrip: string,
    price:number, 
    type: 'income' | 'outcome', 
    category: string,  
}
interface TransactionContextType {
    Transactions: TransactionsTypeProps[],
    fetchTransactions: (query?: string) => Promise<void>,
    CreateTransaction: (data: CreateTransactionType) => Promise<void>

}
interface TransactionProvideProps {
    children: ReactNode,    
}
export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({children}: TransactionProvideProps){
    const [Transactions, setTransactions] = useState<TransactionsTypeProps[]>([])
    async function fetchTransactions(query?: string) {
        const response = await api.get('transactions', {
        params: {
            _sort: 'createAt',
            _order: 'desc',
            q:query,
        }
        })
        setTransactions(response.data)
    }
    useEffect(()=> {fetchTransactions()},[])

   const CreateTransaction = useCallback( async (data: CreateTransactionType) => {
    const{descrip, category, type, price} = data;
    const response = await api.post('transactions', {
      descrip, 
      category, 
      type,
      price,
      createAt: new Date()
    })
    setTransactions((state) => [response.data, ...state])
 }, [setTransactions])
 return (<TransactionsContext.Provider value={{Transactions, fetchTransactions, CreateTransaction}}>
    {children} 
 </TransactionsContext.Provider>)
}