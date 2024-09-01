import React from "react";

interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <p className="error">
            <span>🚫</span>
            {message}
        </p>
    );
}

export default ErrorMessage;
