import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";
import styled from "styled-components";
import Footer from "./Footer";

function Session({ weekday, date, showtimes }) {
    return (
        <div>
            <h4>{weekday}</h4><span> - {date}</span>
            <SessionTimes>
                {showtimes.map((item, index) => {
                    return (
                        <Link key={index} to={`/seats/${item.id}`}>
                            <SessionButton>{item.name}</SessionButton>
                        </Link>
                    )
                })}
            </SessionTimes>
        </div>
    )
}

export default function MovieSessionPage() {
    const parames = useParams();
    const [data, setData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(false)

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${parames.idMovie}/showtimes`);

        promisse.then(res => {
            setData(res.data.days)
            setSelectedMovie(res.data)
        });
        // eslint-disable-next-line
    }, []);

    return (
        <Page>
            <Link to={"/"}>
                <Return>
                    <ion-icon name="arrow-back-circle"></ion-icon>
                </Return>
            </Link>
            <Image img={selectedMovie.posterURL}></Image>
            <h1>{selectedMovie.title}</h1>
            <p>{selectedMovie.overview}</p>
            <Title>Selecione o Filme</Title>
            <Sessions>
                {data.map((item, index) =>
                    <Session
                        key={index}
                        weekday={item.weekday}
                        date={item.date}
                        showtimes={item.showtimes}
                    />
                )}
            </Sessions>
        </Page>
    )
}
const Page = styled.div`
    padding-top: 10px;
    color: #FFFFFF;
    background-color: #191D31;;

    h1{
        font-size: 25px;
        margin-left: 20px;
        font-weight: 700;
    }
    p {
        margin: 10px 0 0 20px;
        width: 80vw;
    }
    h4 {
        font-weight: 700;
        display: inline;
    }
`
const Image = styled.div`
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #191D31 100%), url(${props => props.img});
    background-size: cover;
    height: 400px;
`
const Title = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    height: 110px;
    font-size: 24px;
    padding-top: 20px;
    margin-left: 20px;
    color: #FF5757;
`
const Sessions = styled.div`
    font-size: 20px;
    margin: 0 25px;
    padding-bottom: 40px;
`
const SessionTimes = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const SessionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 82px;
    height: 43px;
    font-size: 18px;
    background-color: #FF5757;
    color: #FFFFFF;
    border-radius: 3px;
    margin: 22px 8px 22px 0;
    text-decoration: none;
    border: none;
    font-weight: 700;
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