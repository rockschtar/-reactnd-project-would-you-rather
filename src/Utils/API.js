import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA'

export function getInitialData () {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  )
}

export function saveQuestion (question) {
  return _saveQuestion(question)
}

export function saveQuestionAnswer (authedUser, questionId, answer) {
  return _saveQuestionAnswer({ authedUser, qid: questionId, answer })
}
