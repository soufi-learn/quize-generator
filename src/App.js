import React, { useEffect, useState } from "react";
import axios from "axios";
import FlashCardList from "./components/flashCardList";
import { deCodeString } from "./helper/functions";
import Header from "./components/header";

const App = () => {
  const [flashCards, setFlashCards] = useState([]);

  // GET 10 INITIAL DATA FROM DATABASE WHEN PAGE IS READY
  // (DECODESTRING FUNCTION CONVERT TEXT INTO HTML TEXT AND RETURN IT)
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashCards(
        res.data.results.map((questionitem, index) => {
          return {
            id: `${index}-${Date.now()}`,
            question: deCodeString(questionitem.question),
            answer: deCodeString(questionitem.correct_answer),
            options: [
              ...questionitem.incorrect_answers.map((a) => {
                return deCodeString(a);
              }),
              questionitem.correct_answer,
            ],
          };
        })
      );
    });
  }, []);

  return (
    <>
      <Header setFlashCards={setFlashCards} />
      {/* IT SHOWS LOADING WHEN DATA NOT ARRIVED */}
      {!flashCards.length ? (
        <h2 className="loading-text">Loading...</h2>
      ) : (
        <FlashCardList flashCards={flashCards} />
      )}
    </>
  );
};

export default App;
