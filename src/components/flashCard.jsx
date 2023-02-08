import { useEffect, useRef, useState } from "react";

const FlachCard = ({ flashCard }) => {

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState(0);

    const frontRef = useRef(null);

    useEffect(() => {
        setMaxHeight();
    }, [flashCard.question, flashCard.answer, flashCard.options]);


    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight)
    }, []);

    const setMaxHeight = () => {
        const frontHeight = frontRef.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, 100));
    }

    return (
        <div
            className={`card-wrapper ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
            style={{ height: `${height}px` }}>

            <div className="front-section" ref={frontRef}>
                {flashCard.question}
                <div className="options-wrapper">
                    {flashCard.options.map((option, index) => {
                        return (<p className="option-text" key={index}>{option}</p>)
                    })}
                </div>
            </div>

            <div className="back-section">{flashCard.answer}</div>
        </div >
    );
}

export default FlachCard;