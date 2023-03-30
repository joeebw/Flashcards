import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

function InputForm({options ,setFlashCards}) {
  const selectOption = useRef();
  const quantityQuestions = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setFlashCards([]);
    axios.get(`https://opentdb.com/api.php`, {
      params: {
        amount: quantityQuestions.current.value,
        category: selectOption.current.value
      }
    })
    .then(res => {
      res.data.results.map(item => {
        const question = item.question;
        const answer = item.correct_answer;
        const options = [answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5);
        setFlashCards(prevFlashcards => [...prevFlashcards, {
          id: uuidv4(),
          question: question,
          answer: answer,
          options: options
        }])
      })
    })
  }

  return (
    <div className='bg-[#79c2d0] py-6'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center gap-6'>
        <div className='flex flex-col'>
          <label htmlFor='select'>Category</label>
          <select name="Select" id='select'
            className='select select-bordered select-sm sm:w-96 bg-white' 
            ref={selectOption}
          >
            {options.map(option => <option value={`${option.id}`} key={uuidv4()}>{option.name}</option>)}
          </select>
        </div>
        <div className='relative sm:right-11 flex flex-col sm:w-72'>
          <label htmlFor="quantity">Number of Questions</label>
          <input type="number" 
            id='quantity' 
            name='quantity' 
            className='input input-bordered input-xs text-base bg-white' 
            min={1} 
            max={10} 
            ref={quantityQuestions}
          />
        </div>
          <button 
            type='submit' 
            className='relative bottom-14 left-32 sm:left-40  btn btn-info btn-sm bg-[#bbe4e9]'
          >
            submit
          </button>
      </form>
    </div>
  )
}

export default InputForm
