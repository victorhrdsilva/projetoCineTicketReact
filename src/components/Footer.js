import styled from "styled-components"

export default function Footer({ posterURL, title, selectedSession, weekday, name}) {
    return (
        <div>
            <MoviePoster>
                <img src={posterURL} alt="poster de filme" />
                <Text>
                    <h3>{title}</h3>
                    {selectedSession ? 
                    <h3>{weekday} - {name}</h3> : ""}
                </Text>
            </MoviePoster>
        </div>
    )
}

const MoviePoster = styled.div`
    display: flex;
    align-items: center;
    height: 117px;
    width: 100vw;
    box-shadow: 0px -2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: #191D31;
    position: fixed;
    bottom: 0;
    font-size: 26px;
    color: #FFFFFF;
    
    img {
        height: 90px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        margin: 0 18px 0 25px;
        border-radius: 2px;
    }
`
const Text = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        margin-top: 2px;
    }
`