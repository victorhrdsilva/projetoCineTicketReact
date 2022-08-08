import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";

export default function Sucess({ postData, movieInformation, seatsNumber }) {
    const [sucess, setSucess] = useState(false);

    useEffect(() => {
        const promisse = axios.post(`https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many`, postData);

        promisse.then(() => {
            setSucess(true)
        });
    }, []);

    return (
        <Page>
            {sucess ? (
                <>
                    <Title>Pedido feito com sucesso!</Title>
                    <Informations>
                        <h2>Filmes e sesão</h2>
                        <p>{movieInformation.title}</p>
                        <p>{movieInformation.date} - {movieInformation.name}</p>
                    </Informations>
                    <Informations>
                        <h2>Ingressos</h2>
                        {seatsNumber.map((item, index) => {
                            return (
                                <p key={index}>Assento {item}</p>
                            )
                        })}
                    </Informations>
                    <InformationsBuyer>
                        <h2>Comprador</h2>
                        <p>Nome: {postData.name}</p>
                        <p>CPF: {postData.cpf}</p>
                    </InformationsBuyer>
                    <Link to="/">
                        <Button>Voltar para Home</Button>
                    </Link>
                </>
            ) : <Title>Carregando...</Title>}
                
        </Page>
    )
}

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding-top: 100px;
    `
const Title = styled.h1`
    font-size: 28px;
    color: #247A6B;
    width: 225px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 40px;
`
const Informations = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 22px;
    width: 80vw;
    h2 {
        font-weight: 700;
        font-size: 24px;
        margin: 30px 0 15px;
    }
    p{
        margin-bottom: 5px;
    }
`
const InformationsBuyer = styled(Informations)`
    margin-top: 25px;
`
const Button = styled.button`
        width: 250px;
        height: 55px;
        color: #FFFFFF;
        font-size: 18px;
        background: #E8833A;
        border-radius: 3px;
        border: none;
        padding: 5px;
        margin: 70px auto 20px;
`