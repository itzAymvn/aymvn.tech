"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const page = () => {
    const router = useRouter();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [buttonContent, setButtonContent] = useState("Login");
    // handle submit
    async function handleSubmit(event) {
        event.preventDefault();

        // reset message and error
        setMessage(null);
        setError(null);

        // get form data
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        // validate
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        // when everything is ok, change the content of the button to "Loading..."
        setButtonContent("Loading...");

        // send data to server
        try {
            const data = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (data.error !== null) {
                setError(data.error);
                setButtonContent("Login");
                return;
            }

            // if success, redirect to dashboard
        } catch (error) {
            return;
        }

        router.push("/dashboard");
    }
    return (
        // bootstrap form
        <main className="container d-flex flex-column justify-content-center mt-5">
            <div className="login">
                <h1 className=" mb-3 fw-normal">
                    <i className="fas fa-sign-in-alt"></i>
                    <span className="mx-2">Login to the dashboard</span>
                </h1>

                <form className="form container" onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="email" className="form-label">
                            <i className="fas fa-envelope"></i>
                            <span className="mx-2">Email address</span>
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
                            <i className="fas fa-lock"></i>
                            <span className="mx-2">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            id="password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">
                        <i className="fas fa-sign-in-alt"></i>
                        <span className="mx-2">{buttonContent}</span>
                    </button>
                </form>
            </div>
            {/* if error, show error */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span className="mx-2">{error}</span>
                </div>
            )}

            {/* if message, show message */}
            {message && (
                <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle"></i>
                    <span className="mx-2">{message}</span>
                </div>
            )}
        </main>
    );
};

export default page;
