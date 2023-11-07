import React from 'react'
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import '../utils/quize-index/index.css';

const Quize = (props) => {
    const questions = [
		{
			questionText: '3 x 2',
			answerOptions: [
				{ answerText: '3', isCorrect: false },
				{ answerText: '9', isCorrect: false },
				{ answerText: '6', isCorrect: true },
				{ answerText: '12', isCorrect: false },
			],
		},
		{
			questionText: '3 x 3',
			answerOptions: [
				{ answerText: '6', isCorrect: false },
				{ answerText: '9', isCorrect: true },
				{ answerText: '12', isCorrect: false },
				{ answerText: '18', isCorrect: false },
			],
		},
		{
			questionText: '3 x 5',
			answerOptions: [
				{ answerText: '15', isCorrect: true },
				{ answerText: '24', isCorrect: false },
				{ answerText: '9', isCorrect: false },
				{ answerText: '21', isCorrect: false },
			],
		},
		{
			questionText: '3 x 6',
			answerOptions: [
				{ answerText: '24', isCorrect: false },
				{ answerText: '15', isCorrect: false },
				{ answerText: '27', isCorrect: false },
				{ answerText: '18', isCorrect: true },
			],
		},
        {
			questionText: '3 x 7',
			answerOptions: [
				{ answerText: '24', isCorrect: false },
				{ answerText: '21', isCorrect: true },
				{ answerText: '27', isCorrect: false },
				{ answerText: '18', isCorrect: false },
			],
		},
        {
			questionText: '3 x 8',
			answerOptions: [
				{ answerText: '24', isCorrect: true },
				{ answerText: '15', isCorrect: false },
				{ answerText: '27', isCorrect: false },
				{ answerText: '18', isCorrect: false },
			],
		},
        {
			questionText: '3 x 9',
			answerOptions: [
				{ answerText: '24', isCorrect: false },
				{ answerText: '15', isCorrect: false },
				{ answerText: '27', isCorrect: true },
				{ answerText: '18', isCorrect: false },
			],
		},
        {
			questionText: '3 x 10',
			answerOptions: [
				{ answerText: '24', isCorrect: false },
				{ answerText: '15', isCorrect: false },
				{ answerText: '27', isCorrect: false },
				{ answerText: '30', isCorrect: true },
			],
		},
        {
			questionText: '3 x 11',
			answerOptions: [
				{ answerText: '24', isCorrect: false },
				{ answerText: '33', isCorrect: true },
				{ answerText: '27', isCorrect: false },
				{ answerText: '36', isCorrect: false },
			],
		},
        {
			questionText: '3 x 12',
			answerOptions: [
				{ answerText: '36', isCorrect: true },
				{ answerText: '30', isCorrect: false },
				{ answerText: '27', isCorrect: false },
				{ answerText: '33', isCorrect: false },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [openDialog, setOpenDalog] = useState(props.open);


          useEffect(() => {
           setOpenDalog(props.open);
         }, [props.open])



	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
            const nextQuestion = currentQuestion + 1;
			setScore(score + 1);
            setOpenDalog(false);
            props.getIsAnswered(openDialog);

            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            }
            else{

                setCurrentQuestion(0);
            }
		}


	};

  return (

      <Dialog open={openDialog}>
        <div className='app'>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText} ?</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button className='mybutton' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}  >{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
      </Dialog>

  );
}

export default Quize