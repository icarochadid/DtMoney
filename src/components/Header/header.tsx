import { HeaderContainer, HeaderContent, NewTransactionsButton } from "./styles-header";
import * as Dialog from '@radix-ui/react-dialog'
import logo from '../../assets/Logo.svg'
import { NewTransactionsModal } from "../NewTransactionsModal";
export function Header() {
    return (
       <HeaderContainer>
        <HeaderContent>
            <div><img src={logo} alt="" /></div>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <NewTransactionsButton>Nova Transação</NewTransactionsButton>
                </Dialog.Trigger>
                <NewTransactionsModal/>
            </Dialog.Root>
            
        </HeaderContent>
       </HeaderContainer>
    )
}