import React from "react";
import "./header.scss"

const Header =()=>{
    return(
            <h1 className="header" onClick={()=>window.scroll(0, 0)}>🎬 ENTERTAINMENT HUB 🎥</h1>
    )
}

export default Header