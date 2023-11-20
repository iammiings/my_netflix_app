import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SmoothHorizontalScrolling } from '../../utils';
import { setMovieDetail } from '../store/actions';
import { useViewport } from '../Hooks';

function MoviesRow(props) {
  const { movies, title, isNetflix, idSection } = props;
  const sliderRef = useRef();
  const movieRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [windowWidth] = useViewport();
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const handleSetMovie = (movie) => {
    dispatch(setMovieDetail(movie));
  };

  const handleScrollRight = () => {
    const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrolling(sliderRef.current, 250, movieRef.current.clientWidth * 2, sliderRef.current.scrollLeft);
    }
  };

  const handleScrollLeft = () => {
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(sliderRef.current, 250, -movieRef.current.clientWidth * 2, sliderRef.current.scrollLeft);
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore); // Đảo ngược giá trị showMore khi click
  };

  return (
    <MoviesRowContainer draggable="false" id={idSection}>
      <div className="MoviesRowContainer_top">
        <h1 className="heading">{title}</h1>
        <button onClick={toggleShowMore}>
          {showMore ? 'Xem thêm' : 'Thu gọn'}
        </button>
      </div>
      <MoviesSlider
        ref={sliderRef}
        draggable="true"
        onDragStart={(e) => {
          setIsDrag(true);
          setDragDown(e.screenX);
        }}
        onDragEnd={() => setIsDrag(false)}
        onDragEnter={(e) => setDragMove(e.screenX)}
        style={
          movies && movies.length > 0
            ? {
                gridTemplateColumns: `repeat(${showMore ? movies.length : 5},
                                ${windowWidth > 1200 ? '360px' : windowWidth > 992 ? '300px' : windowWidth > 768 ? '250px' : '200px'})`,
              }
            : {}
        }
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie, index) => (
            <div
              key={index}
              className="movieItem"
              ref={movieRef}
              draggable="false"
              onClick={() => handleSetMovie(movie)}
            >
              <img
                src={getMovieImageUrl(movie, isNetflix)}
                alt=""
                draggable="false"
              />
              <div className="movieName">{movie.title || movie.name}</div>
            </div>
          ))}
      </MoviesSlider>
    </MoviesRowContainer>
  );
}

export default MoviesRow;

function getMovieImageUrl(movie, isNetflix) {
  return isNetflix
    ? `http://image.tmdb.org/t/p/original/${movie.poster_path}`
    : `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
}

const MoviesRowContainer = styled.div`
  background-color: var(--color-background);
  color: var(--color-white);
  padding: 20px 20px 0;
  position: relative;
  width: 100%;
  height: 100%;

  .MoviesRowContainer_top {
    display: flex;
    justify-content: space-between;
  }
  
  .MoviesRowContainer_top button {
    font-weight: bold;
    font-size: 18px;
    font-family: 'ubuntu', sans-serif;
    background-color: #e50914; /* Màu đỏ Netflix */
    color: #fff;
    border: none;
    padding: 10px 20px; /* Điều chỉnh khoảng cách giữa văn bản và viền nút */
    cursor: pointer;
    transition: background-color 0.3s ease; /* Hiệu ứng màu nền thay đổi */

    &:hover {
      background-color: #b2070a; /* Màu đỏ đậm khi hover */
    }
  }
`;

const MoviesSlider = styled.div`
  display: grid;
  gap: 8px;
  transition: all 0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 28px;
  scroll-behavior: smooth;

  &:hover .movieItem {
    opacity: 0.5;
  }

  .movieItem {
    transform: scale(1);
    width: 400px;
    height: 500px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    border-radius: 6px;
    transform: center left;
    position: relative;
    cursor: pointer;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
      z-index: 10;
    }

    img {
      width: 100%;
      height: 100%
      // object-fit: cover;
    }

    .movieName {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 4px;
      text-align: center;
      font-size: 14px;
      background-color: rgba(0,0,0,0.5);
    }
  }
`;
