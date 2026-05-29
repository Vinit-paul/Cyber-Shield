import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert("Login Failed");

        }

    };

    return (

        <div
            style={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                height:"100vh"
            }}
        >

            <form
                onSubmit={handleSubmit}
                style={{
                    background:"#1e293b",
                    padding:"30px",
                    borderRadius:"10px",
                    width:"300px"
                }}
            >

                <h2>CyberShield Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    style={{
                        width:"100%",
                        padding:"10px",
                        marginBottom:"15px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width:"100%",
                        padding:"10px",
                        background:"cyan",
                        border:"none",
                        cursor:"pointer"
                    }}
                >
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;