import{FaHotjar,FaStar} from "react-icons/fa";
import { MdTheaterComedy } from "react-icons/md";
import {GiNinjaHeroicStance,GiRomanToga,GiGhost,GiBandageRoll} from "react-icons/gi";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import {SiNetflix} from 'react-icons/si';
function Menus(props) {
    return(
        <MenusPane>
           <MenuItem name="Netflix" Icon={SiNetflix} to='netflix' />
           <MenuItem name="Trending" Icon={FaHotjar} to='trending' />
           <MenuItem name="Top rated" Icon={FaStar} to='toprated' />
           <MenuItem name="Acitions Movies" Icon={GiNinjaHeroicStance} to='actionMovies' />
           <MenuItem name="Comedy Movies" Icon={MdTheaterComedy} to='comedyMovies' />
           <MenuItem name="Horror Movies" Icon={GiGhost} to='horrorMovies' />
           <MenuItem name="Romance Movies" Icon={ GiRomanToga} to='romaceMovies' />
           <MenuItem name="Documentaries" Icon={GiBandageRoll} to='documentaries' />
        </MenusPane>
    )
}
export default Menus;

const MenusPane = styled.div`
 
    
    position: fixed;
    left: 0;
    top :20%;
    width: 33px;
    border-radius: 8px;
    height:36px;
    opacity:0.5;
    padding: 4px 0;
    background: rgba(0,0,0,0.54);
    z-index: 180;
    display: flex;
    flex-direction: column;
    transform-origin: left center;
    transition: all 0.3s linear;
    overflow: hidden;
    &:hover{
        width: 180px;
        background: black;
        opacity:1;
        height: 245px;
    }

    .subMenu{
        display: flex;
        align-items: center;
        width: max-content;
        padding: 7px, 6px;
        margin-left: 2px;
        cursor: pointer;
        
        .subMenu__icon{
            font-size: 30px;
            
            color:#E50914;
           
        }
        span{
            transition: all 0.3s;
            transform: scale(1,1);
            font-size: 16px;
            font-weight: 400;
            color: rgba(255,255,255,0.6);
            margin-left: 10px;
            &:hover{
        
                transform: scale(1.2,1.2) ;
                color:#fff;
            }

        }
    }

`;