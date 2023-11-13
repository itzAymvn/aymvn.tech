"use client";
import axios from "axios";
import { useState, useRef } from "react";

const page = () => {
    const [enableRegister, setEnableRegister] = useState(false);
    const passwordRef = useRef(null);
    const eyeRef = useRef(null);
    const [data, setData] = useState(null);

    // toggle password visibility
    function togglePassword() {
        const password = passwordRef.current;
        if (password.type === "password") {
            password.type = "text";
            eyeRef.current.classList.remove("fa-eye");
            eyeRef.current.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            eyeRef.current.classList.remove("fa-eye-slash");
            eyeRef.current.classList.add("fa-eye");
        }
    }

    // handle submit
    async function handleSubmit(event) {
        event.preventDefault(); // Prevents the form from submitting and refreshing the page

        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        // validate
        if (!name || !email || !password) {
            setData("Please fill in all fields");
            return;
        }

        // validate password
        if (password.length < 6) {
            setData("Password should be at least 6 characters long");
            return;
        }

        // send data to server
        try {
            const response = await axios.post("/api/auth/register", {
                name,
                email,
                password,
            });
            setData(response.data.message);
        } catch (error) {
            setData(error.response.data.message);
        }
    }

    return (
        // bootstrap form
        <main className="container m-5">
            {enableRegister ? (
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">
                        <i className="fas fa-user-plus"></i> Register
                    </h1>
                    <div className="form-group my-3">
                        <label htmlFor="name" className="form-label">
                            name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter name"
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                ref={passwordRef}
                                name="password"
                                aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary border-left-0 rounded-right"
                                    onClick={togglePassword}
                                    type="button"
                                >
                                    <i className="fas fa-eye" ref={eyeRef}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">
                        Submit
                    </button>
                </form>
            ) : (
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Registration disabled</h4>
                    <p>
                        Registration is disabled. Please contact the
                        administrator.
                    </p>
                </div>
            )}
            {data && <div className="alert alert-danger -2">{data}</div>}
        </main>
    );
};

export default page;
