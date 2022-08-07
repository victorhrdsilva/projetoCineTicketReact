import styled from "styled-components"

export default function Footer({ selectedMovie, selectedSession }) {
    return (
        <div>
            <MoviePoster>
                <img src={selectedMovie.posterURL} alt="poster de filme" />
                <Text>
                    <h3>{selectedMovie.title}</h3>
                    {selectedSession ? 
                    <h3>{selectedSession.day.weekday} - {selectedSession.name}</h3> : ""}
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
    border-top: 1px solid #9EADBA;
    background-color: #DFE6ED;
    position: fixed;
    bottom: 0;
    font-size: 26px;
    
    img {
        height: 90px;
        border: 8px solid #FFFFFF;
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