import { saveQuestion, saveQuestionAnswer } from '../Utils/API'
import { hideLoading, showLoading } from 'react-redux-loading'
import { addAnsweredQuestionToUser, addQuestionToUser } from './Users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

function answerQuestion (authedUser, questionId, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    questionId,
    answer
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return dispatch => {
    dispatch(showLoading())

    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question))
        dispatch(addQuestionToUser(question.id, author))
        dispatch(hideLoading())
      }
    )
  }
}

export function handleAnswerQuestion (authedUser, questionId, answer) {
  return dispatch => {
    dispatch(showLoading())

    return saveQuestionAnswer(authedUser, questionId, answer).then(
      () => {
        dispatch(answerQuestion(authedUser, questionId, answer))
        dispatch(addAnsweredQuestionToUser(questionId, authedUser, answer))
        dispatch(hideLoading())
      }
    )
  }
}
