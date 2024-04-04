import { Link } from "react-router-dom"

export default function MenuChildren({children, clickFunc}) {
    return (
        <>
            {children.map((child, index) => {
                return (
                    <Link key={index} to={child.link}>
                        <p onClick={() => {
                            setTimeout(clickFunc, 250);
                        }}
                            >{child.title}</p>
                    </Link>
                )}
            )}
        </>
    )
}