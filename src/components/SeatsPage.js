import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";



function SingularSeat({ id, name, isAvailable, setSelectedSeats, selectedSeats, setSeatsNumber,seatsNumber }) {
    const [available, setAvailable] = useState(isAvailable)

    function selectSeat() {
        setSelectedSeats([...selectedSeats, id])
        setSeatsNumber([...seatsNumber, name])
        setAvailable('selected')
    }

    function deselectSeat() {
        let indiceID = selectedSeats.indexOf(id)
        selectedSeats.splice(indiceID, 1)
        let indiceName = seatsNumber.indexOf(name)
        selectedSeats.splice(indiceName, 1)
        setAvailable(true)
    }

    switch (available) {
        case true:
            return (<SeatOption onClick={selectSeat}>{name}</SeatOption>)
            break;
        case false:
            return (<SeatOptionUnavailable onClick={() => alert('Este assento está indisponível!')}>{name}</SeatOptionUnavailable>);
            break;
        case 'selected':
            return (<SeatOptionSelected onClick={deselectSeat}>{name}</SeatOptionSelected>);
            break;
        default: return "";
    }
}

export default function SeatsPage({ postData, setPostData, setMovieInformation, setSeatsNumber, seatsNumber }) {
    const parames = useParams();
    const [data, setData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSession, setSelectedSession] = useState(false);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${parames.idSessions}/seats`);

        promisse.then(res => {
            setData(res.data.seats);
            setSelectedSession(res.data);
        });
    }, []);
    
    function Submit(event) {
        event.preventDefault()
        if (cpf.length === 14 && selectedSeats.length > 0) {
            let orderInformation = {
                ids: selectedSeats,
                name: name,
                cpf: cpf
            }
            setPostData(orderInformation)

            setMovieInformation({
                posterURL: selectedSession.movie.posterURL,
                title: selectedSession.movie.title,
                weekday: selectedSession.day.weekday,
                name: selectedSession.name,
                date: selectedSession.day.date,
            })

            navigate('/sucess', { replace: true });
        }
    }

    function formatCPF(cpf) {
        const cpfCurrent = cpf

        let newCpf;

        newCpf = cpfCurrent.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,
            function (regex, argumento1, argumento2, argumento3, argumento4) {
                return argumento1 + '.' + argumento2 + '.' + argumento3 + '-' + argumento4;
            })
        setCpf(newCpf);
        console.log(newCpf.length)
    }

    return (
        <>
            <SeatsScreen>
                <h2>Selecione o(s) assento(s)</h2>
                <Seats>
                    <ChoiceSeats>
                        {data.map((item, index) =>
                            <SingularSeat
                                key={index}
                                item={item}
                                id={item.id}
                                name={item.name}
                                isAvailable={item.isAvailable}
                                setSelectedSeats={setSelectedSeats}
                                selectedSeats={selectedSeats}
                                setSeatsNumber={setSeatsNumber}
                                seatsNumber={seatsNumber}
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
                <Form onSubmit={Submit}>
                    <label htmlFor="name">Nome do comprador:</label>
                    <input id="name" type="text" value={name} placeholder="Digite seu nome..." onChange={e => setName(e.target.value)} required />
                    <label htmlFor="cpf" form="cpf">Nome do comprador:</label>
                    <input id="cpf" type="text" value={cpf} placeholder="Digite seu CPF..." onBlur={() => formatCPF(cpf)} onChange={e => setCpf(e.target.value)} required />
                    <button type="submit">Reservar assento(s)</button>
                </Form>
            </SeatsScreen>
            {selectedSession ? (<Footer
                posterURL={selectedSession.movie.posterURL}
                title={selectedSession.movie.title}
                weekday={selectedSession.day.weekday}
                name={selectedSession.name}
                selectedSession={selectedSession} />) : ""}
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

    p{
        margin-top: 5px;
    }
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
const Form = styled.form`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    margin: 60px 0;

    input{
        width: 327px;
        height: 51px;
        margin: 5px 0 15px;
        padding-left: 18px;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        font-size: 18px;

        &::placeholder {
            font-size: 18px;
            color: #AFAFAF;
        }
    }

    button {
        width: 250px;
        height: 55px;
        color: #FFFFFF;
        font-size: 18px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        padding: 5px;
        margin: 30px auto 90px;
    }
`