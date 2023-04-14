import React from "react";


export const QuestionsAndAnswers = (props) => {
    const qAndA = props.qanda
    return (
        <div className="flex flex-col">
            {qAndA.map(pair => <div className="m-3 "><p>Q: {pair[0]}</p><p>A: {pair[1]}</p></div>)}
        </div>
    );
}