import { Link, Form, redirect } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import "src/css/NavBar.css"
import { navData } from "./NavData"
import NavMenu from "./NavMenu"
import logo from "src/assets/treeicon.png"
import searchIcon from "src/assets/search.png"
import cart from "src/assets/cart.png"

// Used as the navigation bar header for the website
// Uses hidden NavMenus -> MenuChildren
export default function NavBar() {
    const [menu, setMenu] = useState("");
    const [visible, setVisible] = useState(true)
    var lastScroll = useRef(0);
    const scrollDistanceRequired = 32;
    
    const visibleStyle = {
        top: "0px"
    }

    const invisibleStyle = {
        top: "-64px"
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            var scroll = window.scrollY;
            // console.log(lastScroll.current, " ", scroll)
            if (scroll > lastScroll.current + scrollDistanceRequired && scroll > 64 && visible) {
                // scrolling down, so remove navbar
                setVisible(false)
                // console.log("he down")
                lastScroll.current = scroll;
            }
            else if (scroll < lastScroll.current && !visible) {
                // scrolling up or at top
                setVisible(true)
                // console.log("he up")
                lastScroll.current = scroll;
            }
        }) 
    })

    function handleMouseEnter(id) {
        setMenu(id);
    }

    function handleMouseLeave() {
        setMenu("");
    }

    return (
        <div className="navbar" style={visible == true ? visibleStyle : invisibleStyle}>
            <div className="navleft">
                <Link to={'/'}>
                    <img style={{width: '48px'}} src={logo}></img>
                </Link>
                {/* Menu data */}
                {navData.map((category, index) => {
                    return (
                        <div key={index} className="menuItem" onMouseLeave={() => {handleMouseLeave()}}>
                            <Link to={category.link}>
                                <p className="category" onMouseEnter={() => {handleMouseEnter(category.title)}}>{category.title}</p>
                                </Link>
                            <NavMenu 
                            submenu={category.submenu} 
                            display={menu === category.title ? true : false}
                            onMouseEnter={() => {handleMouseEnter(category.title)}} 
                            onMouseLeave={() => {handleMouseLeave()}}
                            clickFunc={() => {handleMouseLeave()}}></NavMenu>
                        </div>
                    )
                })}
            </div>
            <div className="navright">
                <Form method="get" id="search-form">
                    <input name="search" type="text" placeholder="Search"></input>
                    <button type="submit" id="submit"><img id="submiticon" src={searchIcon}></img></button>
                </Form>
                <Link><img id="cart" src={cart}></img></Link>
            </div>
        </div>
    )
}