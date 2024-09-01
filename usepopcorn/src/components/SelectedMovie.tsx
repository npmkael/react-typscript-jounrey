import React from "react";

interface Props {
    selectedId: string;
    onCloseMovie: () => void;
}

const SelectedMovie = ({ selectedId, onCloseMovie }: Props) => {
    return (
        <div className="details">
            <button className="btn-back" onClick={onCloseMovie}>
                &larr;
            </button>
            {selectedId}
        </div>
    );
};

export default SelectedMovie;
