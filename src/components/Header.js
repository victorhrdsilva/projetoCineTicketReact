import styled from 'styled-components';

export default function Header () {
    return (
        <>
        <HeaderDiv>
            <h1>Cine</h1><h2>Ticket</h2>
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
    color: #FF5757;
    background-color: #191D31;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    position: fixed;
    font-size: 34px;
    font-weight: 700;

    h2 {
        color: #FFFFFF;
    }
`
