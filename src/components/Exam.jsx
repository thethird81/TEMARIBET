
import '../utils/quize-index/index.css';
import React, { useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import '../utils/quize-index/exam.css';
//import {questions} from '../utils/quize-index/quize-questions';
import {getDocs,collection,doc,setDoc,addDoc, QuerySnapshot} from 'firebase/firestore';
import {db} from '../utils/quize-index/firebase';
const Exam = (props) => {

    const [openDialog, setOpenDialog] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [wrongAnswer, setWrongAnswer] = useState(false);
	const [seconds, setSeconds] = useState(15);

    // const questions = [
	// 	{
	// 		questionText: 'What is the capital of France?',
	// 		answerOptions: [
	// 			{ answerText: 'New York', isCorrect: false },
	// 			{ answerText: 'London', isCorrect: false },
	// 			{ answerText: 'Paris', isCorrect: true },
	// 			{ answerText: 'Dublin', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'Who is CEO of Tesla?',
	// 		answerOptions: [
	// 			{ answerText: 'Jeff Bezos', isCorrect: false },
	// 			{ answerText: 'Elon Musk', isCorrect: true },
	// 			{ answerText: 'Bill Gates', isCorrect: false },
	// 			{ answerText: 'Tony Stark', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'The iPhone was created by which company?',
	// 		answerOptions: [
	// 			{ answerText: 'Apple', isCorrect: true },
	// 			{ answerText: 'Intel', isCorrect: false },
	// 			{ answerText: 'Amazon', isCorrect: false },
	// 			{ answerText: 'Microsoft', isCorrect: false },
	// 		],
	// 	},
	// 	{
	// 		questionText: 'How many Harry Potter books are there?',
	// 		answerOptions: [
	// 			{ answerText: '1', isCorrect: false },
	// 			{ answerText: '4', isCorrect: false },
	// 			{ answerText: '6', isCorrect: false },
	// 			{ answerText: '7', isCorrect: true },
	// 		],
	// 	},
	// ];



	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    useEffect(() => {

        const getQuestions = async () => {
            try {
              const querySnapshot = await getDocs(collection(db, '/evs')); // replace 'your-collection' with your actual collection name
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

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
    if (loading) {
		return <Dialog open = {true}>loading firebase data...</Dialog>;
	  }
	return (
		<Dialog open={true} >
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
						<div className='question-text'>{questions[currentQuestion].question}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].options.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.text}</button>
						))}
					</div>
				</>
			)}
		</Dialog>
	);
}

export default Exam