import React from "react";
import {Link} from 'react-scroll';

function MenuItem(props) {
    const{name,Icon, to} = props;
    return(
            <Link 
                className="subMenu"
                to = {to}
                spy = {true}
                smooth = {true}
                offset = {-70}
                duration = {500}
                activeClass = "active"
            >
                <Icon className="subMenu__icon" />
                <span>{name}</span>
            </Link>
    );
}
export default MenuItem;
