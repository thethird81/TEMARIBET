import React, { useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import '../utils/quize-index/index.css';
import {questions} from '../utils/quize-index/quize-questions';

const Quize = (props) => {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [openDialog, setOpenDialog] = useState(props.open);





          useEffect(() => {
           setOpenDialog(props.open);
		   var elem = document.fullscreenElement;
		   if(elem!=null)
		   {
			if (document.exitFullscreen) {
			  document.exitFullscreen();
			} else if (document.webkitExitFullscreen) { /* Safari */
			  document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) { /* IE11 */
			  document.msExitFullscreen();
			}
		  }

         }, [props.open])



	const handleAnswerOptionClick = (isCorrect) => {

		const nextQuestion = Math.floor(Math.random() * questions.length - 0 + 1) + 0;

		if (isCorrect) {


            setOpenDialog(false);
            props.getIsAnswered(openDialog);


            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            }
            else{

                setCurrentQuestion(0);
            }
		}
		else{
			if(nextQuestion < questions.length )
			setCurrentQuestion(nextQuestion);
			else
			setCurrentQuestion(0);

		}


	};

  return (


      <Dialog open={openDialog} className='dialogStyle'  >
        		<div className='app'>

					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText} ?</div>
					</div>
					<div className='answer-section'>
						<div>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className='mybutton' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}  >{answerOption.answerText}</button>
						))}
						</div>

					</div>
				</div>

      </Dialog>

  );
}

export default Quize