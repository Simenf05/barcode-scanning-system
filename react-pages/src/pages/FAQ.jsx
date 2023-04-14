import React from "react"
import { QuestionsAndAnswers } from "../components/QuestionsAndAnswers/QuestionsAndAnswers";

export const FAQ = () => {

    const questionsAndAnswer = [
        ["What kind of privileges does this login have?", "Now you are logged in with and admin user."],
        ["What does Lending page do?", "The Lending page is for lending out equipment to students."],
        ["What does Return page do?", "The Return page is for returning equipment to the storage."]
    ]

    return (
        <div className="flex flex-col items-center">
            <h1>FAQ</h1>
            <QuestionsAndAnswers qanda={questionsAndAnswer} />
        </div>
    )
}