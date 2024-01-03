// QuizSinglePage.js

import {getDocs,collection,doc,setDoc,addDoc, QuerySnapshot} from 'firebase/firestore';
import {db} from '../utils/quize-index/firebase';
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
  Box,
} from '@mui/material';

// const questions = [
//   {
//     id: 1,
//     text: 'What is the capital of France?',
//     options: [
//       { id: 'a', text: 'Berlin', isCorrect: false },
//       { id: 'b', text: 'Madrid', isCorrect: false },
//       { id: 'c', text: 'Paris', isCorrect: true },
//       { id: 'd', text: 'Rome', isCorrect: false },
//     ],
//   },
//   {
//     id: 2,
//     text: 'Which planet is known as the Red Planet?',
//     options: [
//       { id: 'a', text: 'Venus', isCorrect: false },
//       { id: 'b', text: 'Mars', isCorrect: true },
//       { id: 'c', text: 'Jupiter', isCorrect: false },
//       { id: 'd', 'text': 'Saturn', isCorrect: false },
//     ],
//   },
//   // Add more questions...
// ];


const QuizSinglePage = () => {
  const { subjectName } = useParams();
  const theme = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `/${subjectName}`)); // replace 'your-collection' with your actual collection name
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {

    if (selectedOption === questions[currentQuestion].options.find((opt) => opt.isCorrect).id) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, selectedOption]);

    setSelectedOption('');
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);

    } else {
      setShowResult(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion - 1 >= 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1] || '');
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };
  if (loading) {
		return <Dialog open = {true}>loading {subjectName} data...</Dialog>;
	  }

  return (
    <Container maxWidth='lg'  sx={{ padding: '20px',marginTop: '20px'}} style={{backgroundColor: "orange" }}>
      <Paper elevation={24} sx={{ padding: '20px'   }}>
        <Typography variant="h5" color="black" gutterBottom>
          Question {currentQuestion + 1} of {questions.length}
        </Typography>

        {showResult ? (
          <Box>
            <Typography variant="h3" color="red">Result: {score} / {questions.length}</Typography>
            {questions.map((q, index) => (
              <Box key={q.id} sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                <Typography variant="h5" color="black" sx={{ marginRight: '8px' }}>
                  {index + 1}. {q.question}
                </Typography>
                {userAnswers[index] === q.options.find((opt) => opt.isCorrect)?.id ? (
                  <Typography variant="h5" color={theme.palette.success.main}>✓</Typography>
                ) : (
                  <Typography variant="h5" color={theme.palette.error.main}>✗</Typography>
                )}
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={resetQuiz} sx={{ marginTop: '16px' }}>
              Restart Quiz
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h3" color="black">{questions[currentQuestion].question}</Typography>

            <RadioGroup value={selectedOption} onChange={handleOptionChange} sx={{ marginTop: '16px' }}>
              {questions[currentQuestion].options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.id}
                  control={<Radio />}
                  label = <Typography variant="h4" color="black">{option.text}</Typography>
                />
              ))}
            </RadioGroup>

            <Box sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                Prev
              </Button>
              <Button variant="contained" color="primary" onClick={handleNextQuestion}>
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default QuizSinglePage;
