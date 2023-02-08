import React, { useState, useRef, useEffect } from "react"
import axios from 'axios';

// STYLES
import '../styles/header.css';

// HELPER COMPONENTS
import { deCodeString } from "../helper/functions";

const Header = ({ setFlashCards }) => {
    const [categories, setCategories] = useState([]);

    // REF ELEMENTS
    const categoryEl = useRef();
    const amountEl = useRef();

    // USE EFFECT TO GET LIST OF CATEGORY FROM DATABASE
    useEffect(() => {
        axios.get("https://opentdb.com/api_category.php").then((res) => {
            setCategories(res.data.trivia_categories);
        });
    }, []);

    // HANDLE SUBMIT CALL'S WHEN HEADER FORM SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        // SET DYNAMIC VLUE TO API URL
        axios
            .get("https://opentdb.com/api.php", {
                params: {
                    amount: amountEl.current.value,
                    category: categoryEl.current.value,
                },
            })
            .then((res) => {
                //   CHANGE API DETAILS AND SET IT INTO THE CATEGORIES STATE
                // (DECODESTRING FUNCTION CONVERT TEXT INTO HTML TEXT AND RETURN IT)
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
    };

    return (
        <header className="header-container">
            <form onSubmit={handleSubmit} className="header-form">
                <div className="form-group category-list-wrapper">
                    <label htmlFor="category">Category:</label>
                    <select
                        className="category-select-wrapper"
                        id="category"
                        ref={categoryEl}
                    >
                        {categories.map((category) => {
                            return (
                                <option value={category.id} key={`${category.id}`}>
                                    {category.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Number of questions:</label>
                    <input
                        type="number"
                        className="question-input"
                        id="amount"
                        min="1"
                        step="1"
                        defaultValue={10}
                        ref={amountEl}
                    />
                </div>

                <div className="form-group">
                    <button className="generate-btn">Generate</button>
                </div>
            </form>
        </header>
    )
}

export default Header;