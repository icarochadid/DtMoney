import { SummaryCard, SummayContainer } from "./styles-summary";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionContexts";
import { priceFormatter } from "../../utils/formater";
import { useSummary } from "../../hooks/useSummary";

export function Summary(){
    const Summary = useSummary();
    return (
        <SummayContainer>
            <SummaryCard>
            <header>
                <span>Entradas</span>
                <ArrowCircleUp size={32} color="#00b37e" />
            </header>
            <strong>{priceFormatter.format(Summary.income)}</strong>
            </SummaryCard>
            <SummaryCard>
            <header>
                <span>Saidas</span>
                <ArrowCircleDown size={32} color="#f75a68" />
            </header>
            <strong>{priceFormatter.format(Summary.outcome)}</strong>
            </SummaryCard>
            <SummaryCard variant="green" >
            <header>
                <span>Total</span>
                <CurrencyDollar size={32} color="#ffff" />
            </header>
            <strong>{priceFormatter.format(Summary.total)}</strong>
            </SummaryCard>
        </SummayContainer>
    )
}