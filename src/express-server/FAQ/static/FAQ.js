const boxEl = document.querySelector("#box")

const questions = ["Why cant i log in?", "What tech is used for this website?", "Who made this website?"]

const answers = ["You need a user with admin privileges.", "Express.js is used for this website.", "Simen Fritsvold made this website."]

for (let i = 0; i < questions.length; i++) {

    const newDiv = document.createElement("div")

    const questionEl = document.createElement("p")
    questionEl.innerText = questions[i]
    questionEl.className = "question"
    newDiv.appendChild(questionEl)

    const answerEl = document.createElement("p")
    answerEl.innerText = answers[i]
    answerEl.className = "answer"
    newDiv.appendChild(answerEl)

    boxEl.appendChild(newDiv)

}


