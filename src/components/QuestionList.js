import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((questions) => {
      setQuestions(questions);
    });
  }, []);

  function deleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions = questions.filter((quest) => quest.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function answerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((quest) => {
          if (quest.id === updatedQuestion.id) return updatedQuestion;
          return quest;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItem = questions.map((quest) => (
    <QuestionItem
      key={quest.id}
      question={quest}
      onDelete={deleteClick}
      answerChange={answerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItem}</ul>
    </section>
  );
}

export default QuestionList;
