import {useContextSelector} from "use-context-selector"
import { Header } from "../../components/Header/header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/transactionContexts";
import { dateFormatter, priceFormatter } from "../../utils/formater";
import { SearchForm } from "./components/SearchForm/Index";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles-transactions";


export function Transactions() {
    const Transactions = useContextSelector(TransactionsContext, (context) => {
        return context.Transactions
    })
    return (
        <div>
            <Header/>
            <Summary/>
            <TransactionsContainer>
            <SearchForm/>
            <TransactionsTable>
            <tbody>
               {Transactions.map(Transaction => {
                return (
                    <tr key={Transaction.id}>
                    <td width='50%'>{Transaction.descrip}</td>
                    <td><PriceHighlight variant={Transaction.type}>
                        {Transaction.type == 'outcome' && '-'}
                        {priceFormatter.format(Transaction.price)}
                        </PriceHighlight>
                    </td>
                    <td>{Transaction.category}</td>
                    <td>{dateFormatter.format(new Date(Transaction.createAt))}</td>
                </tr>
                )
                })}</tbody>  
            </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}