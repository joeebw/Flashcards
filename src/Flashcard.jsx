import { useEffect, useState } from "react"
import 'animate.css'

function Flashcard({flashcard}) {
  const [flip, setFlip] = useState(true);
  const [animate, setAnimate] = useState('');
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setAnimate('animate__flipInY')
      const timeoutId = setTimeout(() => {
        setAnimate("");
      }, 600);
      
      return () => clearTimeout(timeoutId);
  }, [flip])


  return (
    <div 
      className={
        `card bg-[#79c2d0] shadow-lg hover:shadow-slate-500 h-auto cursor-pointer 
        animate__animated ${firstRender ? animate : ''} animate__faster	`
      } 
      onClick={() => {
        if (!animate) {
          setFlip(!flip)
        }
        setFirstRender(true)
      }}
    >
      <div className="card-body">
        {flip ?
        <div>
          <h3 className="mb-8 font-bold text-lg" dangerouslySetInnerHTML={{__html: flashcard.question}}></h3>
          {flashcard.options.map(option => <div key={option} dangerouslySetInnerHTML={{__html: option}}></div>)}
        </div> :
        <div 
          className="flex h-full justify-center items-center text-2xl font-semibold"
          dangerouslySetInnerHTML={{__html: flashcard.answer}}
        >
        </div>
        }
      </div>
      
    </div>
  )
}

export default Flashcard