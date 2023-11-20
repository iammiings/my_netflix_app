import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from "../store/actions";
import MoviesRow from "./MoviesRow";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";

const ScrollToTop = () => {
  scroll.scrollToTop();
};

function Contents(props) {
  const dispatch = useDispatch();

  const {
    NetflixOriginals,
    TrendingMovies,
    TopRatedMovies,
    ActionsMovies,
    ComedyMovies,
    HorrorMovies,
    RomanceMovies,
    Documentaries,
  } = useSelector((state) => state.infoMovies);

  useEffect(() => {
    dispatch(ACTIONS.getNetflixOriginals());
    dispatch(ACTIONS.getTrendingMovies());
    dispatch(ACTIONS.getTopRatedMovies());
    dispatch(ACTIONS.getActionsMovies());
    dispatch(ACTIONS.getComedyMovies());
    dispatch(ACTIONS.getHorrorMovies());
    dispatch(ACTIONS.getRomanceMovies());
    dispatch(ACTIONS.getDocumentaries());
  }, [dispatch]);

  return (
    <div>
      <MoviesRow
        movies={NetflixOriginals}
        title="Netflix Originals"
        isNetflix={true}
        idSection="netflix"
      />
      <MoviesRow
        movies={TrendingMovies}
        title="Trending Movies"
        isNetflix={true}
        idSection="trending"
      />
      <MoviesRow
        movies={TopRatedMovies}
        title="Top Rated Movies"
        idSection="toprated"
      />
      <MoviesRow
        movies={ActionsMovies}
        title="Action Movies"
        idSection="actionMovies"
      />
      <MoviesRow
        movies={ComedyMovies}
        title="Comedy Movies"
        idSection="comedyMovies"
      />
      <MoviesRow
        movies={HorrorMovies}
        title="Horror Movies"
        idSection="horrorMovies"
      />
      <MoviesRow
        movies={RomanceMovies}
        title="Romance Movies"
        idSection="romaceMovies"
      />
      <MoviesRow
        movies={Documentaries}
        title="Documentaries Movies"
        idSection="documentaries"
      />

      <GoToTopButton onClick={() => ScrollToTop()}>
        <FaRegArrowAltCircleUp />
      </GoToTopButton>
    </div>
  );
}

export default Contents;

const GoToTopButton = styled.div`
  position: fixed;
  z-index: 10;
  right: 70px;
  bottom: 55px;
  font-size: 50px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s linear;
  &:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  @media screen and (max-width: 600px) {
    right: 40px;
  }
`;
