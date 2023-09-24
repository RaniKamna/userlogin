import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const Login = ({ onLogin, onSuccess }) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        mobilenumber: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const loginTime = new Date().getTime();
            const name = credentials.name;
            const email = credentials.email;
            const mobilenumber = credentials.mobilenumber;
            const password = credentials.password;
            const userData = {
                name,
                email,
                password,
                mobilenumber,
                loginTime,
                isLoggedIn: true,
            };

            console.log(userData)

            const authToken = localStorage.getItem("authToken");
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${authToken}`,
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                }
            );

            const json = await response.json();

            if (!json.success) {
                alert("login failed");
            }
            if (json.success) {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("loggedInUser", JSON.stringify(userData))
                localStorage.setItem("authToken", json.authToken);
                setIsSubmitted(true);
                onLogin(userData);
                onSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isSubmitted) {
        return <Navigate to="/home" />;
    }


    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name='name'
                        value={credentials.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        name='mobilenumber'
                        value={credentials.mobilenumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};
