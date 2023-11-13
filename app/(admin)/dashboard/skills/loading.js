import React from "react";

const loading = () => {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default loading;
