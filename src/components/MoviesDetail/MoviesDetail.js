import React from 'react';
import {useDispatch} from "react-redux";
import styled, { keyframes } from 'styled-components';
import { setMovieDetail } from '../store/actions';
import moment from 'moment/moment';


// const showModal = false;

function MoviesDetail(props) {
    const {movie, showModal} = props;
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(setMovieDetail(null))
    }

    return (
        <MoviesDetailModal>
            <div 
                className={`backdrop ${showModal ? 'showBackdrop' : 'hiddenBackdrop' }`}
                onClick = {handleCloseModal}

            ></div>
            <div className={`modal ${showModal ? 'showModal' : 'hiddenModal' }`}
                style={
                    movie ? {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path})`,
                    
                    backgroundSize: 'cover'
                    }: {} 
                }           
            >
                <div className='container'>
                    <div className='moviesInfo'>
                        <h1 className='moviesTitle'> {movie && (movie.title || movie.name )} </h1>
                        <p className='statistical'> 
                            <span className='Rating'> Rating: {movie && movie.vote_average * 10} % </span> 
                            <span className='Popularity'> Popularity: {movie && movie.popularity} </span> 
                        </p>
                        <p className='releaseDate'> Release Date: {movie && 
                            (moment(movie.release_date).format('DD/MM/YYYY') || 
                            moment(movie.first_air_date).format('DD/MM/YYYY'))
                        } 
                        </p>
                        <p className='runTime'> Run Time: {movie && (movie.runtime || movie.episode_run_time)} </p>
                        <p className='overView'> {movie && movie.overview} </p>
                        
                    </div> 
                </div>
            </div>
        </MoviesDetailModal>
    );
}


export default MoviesDetail;

const FadeIn = keyframes` 
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const MoviesDetailModal = styled.div`
    .backdrop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 200;
        background-color: rgba(0,0,0,0.6);
        animation: $(FadeIn) 1s cubic-bezier(0.17, 0.85, 0.45, 1) forward;
    }

    .showBackdrop {
        display: block;
    }
    .hiddenBackdrop {
        display: none;
    }

    .modal {
        position: fixed;
        top: 25%;
        left: 0;
        z-index: 300;
        height: 60%;
        width: 100%;
        margin: 0 auto;
        color: var(--color-white);
        box-shadow: 0 15px 40px rgba(var(--color-dark), 0,2);

        @media screen and (max-width: 1184px){
            height: 70%;
        }
    
        @media screen and (max-width: 600px){
            height: 80%;
        }

        .container {
            position: relative;
            width: 70%;
            height: 100%;
            background: linear-gradient(90deg, rgba(0,0,0,0.94) 60% , transparent);

            @media screen and (max-width: 1184px) {
                background: linear-gradient(90deg, 
                    rgba(0,0,0,0.95) 40%,
                    rgba(0,0,0,0.733),
                    transparent);
                width: 88%
            }
            
            @media screen and (max-width: 980px) {
                background: linear-gradient(90deg, 
                    rgba(0,0,0,0.95) 50%,
                    transparent);
                width: 100%;
            }

            @media screen and (max-width: 600px) {
                background: linear-gradient(90deg, 
                    rgba(0,0,0,0.88) 60%,
                    transparent);
            }

            .moviesInfo {
                width: 65%;
                height: 100%;
                padding-left: 14px;
                color: var(--color-white);
                font-size: 20px;
                padding-top: 30px;
                @media and (max-width: 600px) {
                    font-size: 16px;
                    width: 80%;
                }

                .moviesTitle {
                    margin-top: 30px;
                }

                .statistical {
                    margin-top: 20px;
                    display: flex;
                    
                    .Rating {
                        color: green;
                    }
                    .Popularity {
                        color: yellow;
                        margin-left: 12px;
                    }
                }

                .releaseDate, .runTime {
                    margin-top: 12px;
                }

                .overView {
                    margin-top: 20px;
                    color: rgba(255,255,255, 0.6);
                    line-height: 1.4;
                    font-size: 18px;

                    @media screen and (max-width: 600px) {
                        font-size: 14px;
                    }
                }
            }
        }
    } 

    .showModal {
        top: 25%;
        opacity: 1;
        left: 0;
        visibility: visible;
        transition: 0.3s ease-in-out;
    }

    .hiddenModal {
        top: 0;
        opacity: 0;
        visibility: hidden;
        transition: 0.3s ease-in-out;
    }

`