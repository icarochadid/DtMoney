import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } 
from './styles-NewTransactionsModel'
import {ArrowCircleDown, ArrowCircleUp} from 'phosphor-react'
import {X} from 'phosphor-react'
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/transactionContexts';
import {useContextSelector} from "use-context-selector"

interface TransactionsTypeProps {
    id: number,
    type: "income" | "outcome",
    descrip: string,
    price: number,
    createAt:string,
    category: string,
}

export function NewTransactionsModal(){
    const CreateTransaction = useContextSelector(TransactionsContext, (context)=>{
        return context.CreateTransaction
    })
    const NewTransactionValidationSchema = z.object({
        descrip: z.string().min(1 , "Informe o nome da transação"), 
        price: z.number().min(1),
        category: z.string(),
        type: z.enum(['income', 'outcome'])
    })
    type TransactionFormValidationSchema = z.infer<typeof NewTransactionValidationSchema>;
    const {register, handleSubmit, formState:{isSubmitting}, control, reset} = useForm<TransactionFormValidationSchema>({
        resolver: zodResolver(NewTransactionValidationSchema),
        defaultValues: {
            type: 'income'
        }
    })
    async function handleAddNewTransaction(data: TransactionFormValidationSchema) {
        const {descrip, type,category, price} = data;
        CreateTransaction({
            descrip, 
            category, 
            type, 
            price
        })
        reset();
    }
    return (
        
            <Dialog.Portal>
                    <Overlay/>
                    <Content>
                    <Dialog.Title>Nova Transação</Dialog.Title>
                    <CloseButton><X size={24}/></CloseButton>
                    <form   onSubmit={handleSubmit(handleAddNewTransaction)}>
                        <input type="text" placeholder='Descrição' required 
                        {...register ('descrip')}/>
                        <input type="number" placeholder='Preço' required
                        {...register ('price', {valueAsNumber: true})}/>
                        <input type="text" placeholder='Categoria' required 
                        {...register ('category')}/>
                    <Controller
                        control={control}
                        name= "type"
                        render={({field}) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                <TransactionTypeButton value='income' variant='income'>
                                    <ArrowCircleUp size={24}/>
                                    Entrada
                                    </TransactionTypeButton>
                                <TransactionTypeButton value='outcome' variant='outcome'>
                                    <ArrowCircleDown size={24} />
                                    Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />
                        <button type="submit" disabled={isSubmitting} >Cadastrar</button>
                    </form>
                    </Content>
                </Dialog.Portal>
        
    )
}