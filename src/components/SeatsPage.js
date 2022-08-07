import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";


function SingularSeat({ id, name, isAvailable }) {
    switch (isAvailable) {
        case true:
            return (<SeatOption>{name}</SeatOption>)
            break;
        case false:
            return (<SeatOptionUnavailable onClick={() => alert('Este assento está indisponível!')}>{name}</SeatOptionUnavailable>);
            break;
        case 'selected':
            return (<SeatOptionSelected>{name}</SeatOptionSelected>);
            break;
    }
}

export default function SeatsPage({ setSelectedSession, selectedMovie, selectedSession }) {
    const parames = useParams();
    const [data, setData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${parames.idSessions}/seats`);

        promisse.then(res => {
            setData(res.data.seats)
            setSelectedSession(res.data)
        });
    }, []);

    return (
        <>
            <SeatsScreen>
                <h2>Selecione o(s) assento(s)</h2>
                <Seats>
                    <ChoiceSeats>
                        {data.map((item, index) =>
                            <SingularSeat
                                key={index}
                                id={item.id}
                                name={item.name}
                                isAvailable={item.isAvailable}
                            />)}
                    </ChoiceSeats>
                    <Subtitle>
                        <Option>
                            <ColorGreen></ColorGreen>
                            <p>Selecionado</p>
                        </Option>
                        <Option>
                            <ColorGreey></ColorGreey>
                            <p>Disponível</p>
                        </Option>
                        <Option>
                            <ColorRed></ColorRed>
                            <p>Indisponível</p>
                        </Option>
                    </Subtitle>
                </Seats>
            </SeatsScreen>
            <Footer selectedMovie={selectedMovie} selectedSession={selectedSession} />
        </>
    )
}

const SeatsScreen = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100vw;

    h2 {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-top: 72px;
        height: 110px;
        width: 100vw;
        font-size: 24px;
    }
`
const Subtitle = styled(SeatsScreen)`
    flex-direction: row;
    flex-wrap: wrap;
`
const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    color: #4E5A65;
    margin: 15px;
`
const ColorGreen = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 17px;
    background: #8DD7CF;
    border: 1px solid #1AAE9E;
`
const ColorGreey = styled(ColorGreen)`
    background: #C3CFD9;
    border: 1px solid #7B8B99;
`
const ColorRed = styled(ColorGreen)`
    background: #FBE192;
    border: 1px solid #F7C52B;
`
const Seats = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;

`
const ChoiceSeats = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 387px;
`
const SeatOption = styled(ColorGreen)`
    display: flex;
    justify-content: center;
    background-color: #C3CFD9;
    border: 1px solid #808F9D;
    align-items: center;
    width: 26px;
    margin: 10px 3.6px;
`
const SeatOptionUnavailable = styled(SeatOption)`
    background: #FBE192;
    border: 1px solid #F7C52B;
`
const SeatOptionSelected = styled(SeatOption)`
    background: #8DD7CF;
    border: 1px solid #45BDB0;
`