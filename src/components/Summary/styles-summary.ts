import styled, { css } from "styled-components";
interface CardProps {
    variant?: 'green'
}
export const SummayContainer = styled.section`
width: 100%;
max-width: 1120px;
margin: 0 auto;
padding: 0 1.5rem;

display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 2rem;
margin-top: -5rem;
`
export const SummaryCard = styled.div<CardProps>`
background: ${props=> props.theme["gray-600"]};
border-radius: 6px;
padding:2rem;

header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme["gray-300"]};
}
strong{
    display: block;
    font-size: 2rem;
    margin-top: 1rem;
}
${ props => props.variant == 'green' && css`
    background-color: ${props.theme["green-500"]};
`}
`
