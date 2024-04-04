
import MenuChildren from "./MenuChildren"

export default function NavMenu({submenu, display, clickFunc}) {
    let style = {display: "none"}
    if (display) {
        style = {display: "flex"}
    }
    return (
        <div className="submenu" style={style}>
            {submenu.map((category, index) => {
                return (
                    <div key={index} className="section">
                        <h3>{category.heading}</h3>
                        <MenuChildren clickFunc={clickFunc} children={category.children}></MenuChildren>
                    </div>
                )
            })}
        </div>
    )
}