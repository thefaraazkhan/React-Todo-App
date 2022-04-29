import React from "react";

const showErrorMsg = (msg) => (
    <div className="alert alert-danger" role="alert">
        {msg}
    </div>
)

const showSuccessMsg = (msg) => (
    <div className="alert alert-success" role="alert">
        {msg}
    </div>
)

export {showErrorMsg, showSuccessMsg};