import { saveQuestion } from '../Utils/API';
import { hideLoading, showLoading } from 'react-redux-loading';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';


export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    };
}


export function handleAddQuestion(optionOneText, optionTwoText, author) {


    return dispatch => {

        dispatch(showLoading())

        return saveQuestion({ optionOneText, optionTwoText, author }).then(
          question => {
              dispatch(addQuestion(question));

              dispatch(hideLoading())
          }
        );
    };
}



