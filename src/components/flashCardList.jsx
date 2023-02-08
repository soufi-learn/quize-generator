
import { FlashCardContext } from '../App';
import FlashCard from './flashCard';
import '../styles/flashcard.css';

const FlashCardList = ({ flashCards }) => {

    return (<div className='flashcard-container'>
        {
            flashCards.map(flashCard => (
                <FlashCard
                    key={flashCard.id}
                    flashCard={flashCard}
                />

            ))
        }
    </div>);
}

export default FlashCardList;