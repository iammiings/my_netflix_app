import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';
import NetflixLogo from '../../assets/images/LOGO.png';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    if (keywords.length > 0) {
      navigate(`/search?keywords=${keywords.trim()}`);
    } else {
      navigate('/');
    }
  };

  const [scrollY, setScrollY] = useState(0);
  const handleScrollY = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    setScrollY(scrollY);
  };
  useEffect(() => {
    handleScrollY();
    window.addEventListener('scroll', handleScrollY);
    return () => {
      window.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Di chuyển trang lên đầu
    setKeywords('');
  };

  return (
    <Navigation style={scrollY < 50 ? { backgroundColor: 'transparent' } : { backgroundColor: 'var(--color-background' }}>
      <div className="navContainer">
        <div className="logo" onClick={goHome}>
          <img src={NetflixLogo} alt="" />
        </div>
        <div className="navSearch">
          <MdSearch className="iconSearch" />
          <input
            type="text"
            placeholder="Input title, genner, people"
            onChange={handleChangeInput}
            value={keywords}
          />
        </div>
      </div>
    </Navigation>
  );
}

export default Navbar;

const Navigation = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: black;
  top: 0;
  transition-timing-function: ease-in;
  transition: all 1s;
  z-index: 10;
  @media only screen and (max-width: 600px) {
    height: 100px;
  }

  .navContainer {
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    height: 60px;

    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }

    .logo {
      width: 125px;
      cursor: pointer;
      img {
        width: 125px;
      }
    }
    .navSearch {
      color: var(--color-white);
      padding-right: 20px;
      display: flex;
      justify-content: flex-end;

      &:hover .iconSearch {
        color: var(--color-white);
      }

      .iconSearch {
        width: 20px;
        height: 20px;
        cursor: pointer;
        transform: translateX(24px) translateY(10px);
        color: #bbb;
      }

      input {
        font-size: 14px;
        border: 1px solid #fff;
        color: white;
        outline: none;
        width: 0;
        padding: 10px;
        cursor: pointer;
        opacity: 0;
        background: var(--color-background);
        transition: width 0.5s;

        &:focus {
          padding-left: 26px;
          width: 300px;
          cursor: text;
          opacity: 1;
          border-radius: 4px;
        }
      }
    }
  }
`;
