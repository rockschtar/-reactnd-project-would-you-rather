export function isAnswered (question, user) {
  return question.optionOne.votes.includes(user) ||
    question.optionTwo.votes.includes(user)
}

export function getUserScore (user) {
  const answers = Object.values(user.answers)

  return {
    id: user.id,
    name: user.name,
    avatarURL: user.avatarURL,
    countAnswers: answers.length,
    countQuestions: user.questions.length,
    score: answers.length + user.questions.length
  }
}