import React, { useRef } from 'react'

import { useState, useEffect } from 'react';
import '../utils/quize-index/index.css';
import {questions} from '../utils/quize-index/quize-questions';
import {getDocs,collection,doc,setDoc,addDoc, QuerySnapshot} from 'firebase/firestore';
import {db} from '../utils/quize-index/firebase';
import { IconButton,Box, Stack, Button ,Dialog,Typography, Container} from '@mui/material';



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
if(wrongAnswer && seconds >= 0)
{

	const intervalId = setInterval(() => {

		setSeconds((prevSeconds) => prevSeconds - 1);

	  }, 1000);
	  return () => clearInterval(intervalId);


}


else{

		setWrongAnswer(false);
		setSeconds(15);
}


},[wrongAnswer,seconds]);

useEffect(() => {

	const getQuestions = async () => {
		try {
		  const querySnapshot = await getDocs(collection(db, '/questions/maths/multiplication')); // replace 'your-collection' with your actual collection name
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


		}


	};

	if (loading) {
		return <Dialog open = {true}>loading firebase data...</Dialog>;
	  }

  return (

	      <Dialog open={openDialog} >

			<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={2}
			padding={8}
			>

				{

					wrongAnswer?<Box>
						<Typography variant="h3" color='GrayText'>wrong please wait...</Typography>

						<Typography variant="h3" color='error'>{seconds}</Typography>

					</Box>
					:<Typography variant="h3"  color='primary'>you can try now</Typography>


				}

						<Typography  variant='h5' color='GrayText'>
							Question {currentQuestion + 1}/{questions.length}
						</Typography>
						<Typography variant="h1" className='question-text'>{questions[currentQuestion].question} </Typography>

					<Stack direction="row" spacing={2}>
						<Stack direction="row" spacing={2} padding={8}>
						{questions[currentQuestion].options?.map((answerOption) => (
							<Button variant="contained" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} disabled = {wrongAnswer} >
								<Typography variant='h2'>{answerOption.text}</Typography>
								</Button>
						))}
						</Stack>

					</Stack>
				</Stack>

      </Dialog>

  );
}

export default Quize