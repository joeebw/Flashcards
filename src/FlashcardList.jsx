import Flashcard from "./Flashcard"

function FlashcardList({flashcards}) {
  return (
    <div className="card-grid gap-8 p-7">
      {flashcards.map(flashcard => {
        return <Flashcard flashcard = {flashcard} key={flashcard.id}/>
      })}
    </div>
  )
}

export default FlashcardList
