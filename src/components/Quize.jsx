import React, { useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import '../utils/quize-index/index.css';
import {questions} from '../utils/quize-index/quize-questions';
import {getDocs,collection,doc,setDoc,addDoc, QuerySnapshot} from 'firebase/firestore';
import {db} from '../utils/quize-index/firebase';


const Quize = (props) => {

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [openDialog, setOpenDialog] = useState(props.open);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [wrongAnswer, setWrongAnswer] = useState(false);
	const [seconds, setSeconds] = useState(15);




useEffect(() => {

	const intervalId = setInterval(() => {
		if (seconds >= 0)
		setSeconds((prevSeconds) => prevSeconds - 1);
		else
		setSeconds(15);
	  }, 1000);

	const MINUTE_MS = 15000;

	const interval = setInterval(() => {

				setWrongAnswer(false);
	   }, MINUTE_MS);

	   return () => clearInterval(interval,intervalId); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
},[wrongAnswer]);

useEffect(() => {

	const getQuestions = async () => {
		try {
		  const querySnapshot = await getDocs(collection(db, '/questions/maths/addition  and subtraction')); // replace 'your-collection' with your actual collection name
		  const dataArray = [];

		  querySnapshot.forEach((doc) => {
			dataArray.push({
			  id: doc.id,
			  ...doc.data(),
			});
			setQuestions(dataArray);
			setLoading(false);
		  });


		  return dataArray;
		} catch (error) {
		  console.error('Error fetching data:', error.message);
		  return [];
		}
	  };
	  getQuestions();
	  console.log('Data as array: '+ loading , questions);

},[loading]);


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

		// if (isCorrect) {
		// 	setScore(score + 1);
		// }

		// const nextQuestion = currentQuestion + 1;
		// if (nextQuestion < questions.length) {
		// 	setCurrentQuestion(nextQuestion);
		// } else {
		// 	setShowScore(true);
		// }

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
			setWrongAnswer(true);
			// if(nextQuestion < questions.length )
			// setCurrentQuestion(nextQuestion);
			// else
			// setCurrentQuestion(0);

		}


	};

	if (loading) {
		return <Dialog open = {true}>loading firebase data...</Dialog>;
	  }

  return (

	// <div className='app'>
	// 		{showScore ? (
	// 			<div className='score-section'>
	// 				You scored {score} out of {questions.length}
	// 			</div>
	// 		) : (
	// 			<>
	// 				<div className='question-section'>
	// 					<div className='question-count'>
	// 						<span>Question {currentQuestion + 1}</span>/{questions.length}
	// 					</div>
	// 					<div className='question-text'>{questions[currentQuestion].question}</div>
	// 				</div>
	// 				<div className='answer-section'>
	// 					{questions[currentQuestion].options?.map((answerOption) => (
	// 						<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.text}</button>
	// 					))}
	// 				</div>
	// 			</>
	// 		)}
	// 	</div>


      <Dialog open={openDialog} className='dialogStyle'>
        		<div className='app'>
				{

					wrongAnswer?<h1>wrong <br></br>please wait...{seconds}</h1>
					:<h1>you can try now</h1>


				}
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].question} ?</div>
					</div>
					<div className='answer-section'>
						<div>
						{questions[currentQuestion].options?.map((answerOption) => (
							<button className='mybutton' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} disabled = {wrongAnswer} >{answerOption.text}</button>
						))}
						</div>

					</div>
				</div>

      </Dialog>

  );
}

export default Quize