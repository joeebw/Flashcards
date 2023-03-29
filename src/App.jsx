import { useEffect, useState } from 'react'
import FlashcardList from './FlashcardList'
import './App.css'
import axios from 'axios'
import InputForm from './Form';

function App() {
  const [flashcards, setFlashCards] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      const categories = res.data.trivia_categories.map(category => {
        return {
          name: category.name,
          id: category.id
        }
      });
      setOptions(categories);
    })
  }, [])


  return (
    <>
      <InputForm options={options} setFlashCards={setFlashCards}/>
      <FlashcardList flashcards={flashcards}/>   
    </>
  )
}

export default App
