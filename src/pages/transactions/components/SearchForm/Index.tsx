import { SearchFormContainer } from "./styles-SearchForm";
import {MagnifyingGlass} from 'phosphor-react'
import { useForm } from "react-hook-form";
import * as  z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useContextSelector} from "use-context-selector"
import { TransactionsContext } from "../../../../contexts/transactionContexts";
const SearchFormSchema = z.object({
    query: z.string()
})
type SearchFormInputs = z.infer<typeof SearchFormSchema>
export function SearchForm(){
    const fetchTransactions =  useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })
    const {register, 
        handleSubmit,
        formState: {isSubmitting}    
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(SearchFormSchema),
    });
     async function handleSearchTransactions(data: SearchFormInputs){
        await fetchTransactions(data.query);
        console.log(data);
        
    } 
    return( 
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)} >
            <input type="text" placeholder="Busque por transações"
            {...register('query')}  />
            <button type="submit" disabled={isSubmitting}><MagnifyingGlass/>Buscar</button>
        </SearchFormContainer>
    )
}