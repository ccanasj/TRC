import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();
    const [state, setState] = useState({ x: 0, y: 0 })

    const handleMouseMove = e => {
        e.persist()
        setState(state => ({ ...state, x: e.clientX, y: e.clientY }))
    }

    function click(e) {
        navigate("/")
    }

    return (
        <div onMouseMove={handleMouseMove} onClick={click}>
            <h1 style={{
                color: "#011718",
                fontSize: "15em",
                textAlign: "center",
                textShadow: "-5px 5px 0px rgba(0,0,0,0.7), -10px 10px 0px rgba(0,0,0,0.4), -15px 15px 0px rgba(0,0,0,0.2)",
                fontFamily: "monospace",
                fontWeight: "bold"
            }}>404</h1>
            <h3 style={{
                color: "black",
                marginLeft: "30px",
                fontSize: "2em",
                marginTop: "-40px",
                fontFamily: "monospace",
                fontWeight: "bold"
            }}>Uy estare ciego o la pagina no existe, quien sabe</h3>
            <div style={{
                margin: "-100px 0 0 -100px",
                width: "200px",
                height: "200px",
                display: "block",
                boxShadow: "0 0 0 9999em #000000f7",
                opacity: 1,
                borderRadius: "50%",
                position: "fixed",
                background: "rgba(0,0,0,0.4)",
                top: state.y,
                left: state.x
            }}>
                <div style={{
                    display: "block",
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    top: "0px",
                    left: "0px",
                    boxShadow: "inset 0 0 40px 2px #000, 0 0 20px 4px rgba(13,13,10,0.2)"
                }}></div></div>
            <div className="secret">yb</div>
        </div >
    );
}

export default NotFound;