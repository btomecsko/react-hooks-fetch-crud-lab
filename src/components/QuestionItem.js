import React from "react";

function QuestionItem({ question, onDelete, answerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteClick(){
    onDelete(id);
  }

  function changeAnswer(e){
    answerChange(id, parseInt(e.target.value));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={changeAnswer}>{options}</select>
      </label>
      <button onClick={deleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
