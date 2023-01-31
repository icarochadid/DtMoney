import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './contexts/transactionContexts'
import { Transactions } from './pages/transactions'
import { GlobalStyle } from './styles/Global'
import { defaultTheme } from './styles/Themes/default'

export function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}> 
    <GlobalStyle/> 
    <TransactionsProvider>
    <Transactions/>
    </TransactionsProvider>
    
    </ThemeProvider>
  )
}

