export function isAnswered(question, user) {
    return question.optionOne.votes.includes(user) ||
    question.optionTwo.votes.includes(user);
}