import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "./Footer";



function SingularSeat({ id, name, isAvailable, setSelectedSeats, selectedSeats, setSeatsNumber, seatsNumber }) {
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
        seatsNumber.splice(indiceName, 1)
        setAvailable(true)
    }

    switch (available) {
        case true:
            return (<SeatOption onClick={selectSeat}>{name}</SeatOption>)
            // eslint-disable-next-line
            break;
        case false:
            return (<SeatOptionUnavailable onClick={() => alert('Este assento está indisponível!')}>{name}</SeatOptionUnavailable>);
            // eslint-disable-next-line
            break;
        case 'selected':
            return (<SeatOptionSelected onClick={deselectSeat}>{name}</SeatOptionSelected>);
            // eslint-disable-next-line
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
        // eslint-disable-next-line
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
        } else {
            alert("Preencha os dados corretamente")
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
            <Link to={`/`}>
                <Return>
                    <ion-icon name="arrow-back-circle"></ion-icon>
                </Return>
            </Link>
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
                    <Screen>Tela</Screen>
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
                    <input autocomplete="off" id="name" type="text" value={name} placeholder="Digite seu nome..." onChange={e => setName(e.target.value)} required />
                    <label autocomplete="off" htmlFor="cpf" form="cpf">Nome do comprador:</label>
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
    color: #FFFFFF;

    h2 {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-top: 40px;
        height: 120px;
        width: 100vw;
        font-size: 24px;
        max-width: 90vw;
    }
`
const Screen = styled.div`
    height: 20px;
    border-bottom: 3px solid #FF5757;
    border-radius: 100%;
    width: 350px;
    text-align: center;
    margin-top: 10px;
    max-width: 90vw;
`
const Subtitle = styled(SeatsScreen)`
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 90vw;
`
const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    margin: 15px;

    p{
        margin-top: 5px;
    }
`
const ColorGreen = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: #094523;
    color: #000000;
    font-weight: 700;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`
const ColorGreey = styled(ColorGreen)`
    background: #FFFFFF;
`
const ColorRed = styled(ColorGreen)`
    background: #FF5757;
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
    max-width: 90vw;
`
const SeatOption = styled(ColorGreen)`
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
    align-items: center;
    width: 9%;
    margin: 10px 1%;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`
const SeatOptionUnavailable = styled(SeatOption)`
    background: #FF5757;
    color: #FFFFFF;
`
const SeatOptionSelected = styled(SeatOption)`
    background: #094523;
    color: #FFFFFF;
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
        border-radius: 5px;
        font-size: 18px;
        max-width: 80vw;

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
        background: #FF5757;
        border-radius: 5px;
        border: none;
        padding: 5px;
        margin: 30px auto 90px;
        max-width: 90vw;
    }
`
const Return = styled.button`
    position: sticky;
    top: 14px;
    left: 14px;
    font-size: 40px;
    background-color: transparent;
    border: none;
    color: #FF5757;
`