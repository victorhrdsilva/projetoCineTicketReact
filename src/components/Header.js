import styled from 'styled-components';

export default function Header () {
    return (
        <>
        <HeaderDiv>
            <h1>CineTicket</h1>
        </HeaderDiv>
        </>
    )
}

const HeaderDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 67px;
    font-family: 'Roboto', sans-serif;
    color: #E8833A;
    background-color: #C3CFD9;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    position: fixed;

    h1 {
        font-size: 34px;
        text-transform: uppercase;
    }
`
