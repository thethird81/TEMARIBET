
import React, { useState,useEffect } from 'react';

import '../utils/quize-index/QuestionForm.css'; // Import the CSS file
import {db} from '../utils/quize-index/firebase';
import {getDocs,collection,doc,setDoc,addDoc} from 'firebase/firestore';
import { Select, MenuItem, FormControl, InputLabel,Typography, Stack,Box } from '@mui/material';


// const QuestionForm = () => {
//   const [questions, setQuestions] = useState([]);
//   const value = collection(db, 'questions');

//   const setData = async() => {
//     const questionsRef = collection(db, "questions");
//     await setDoc(doc(questionsRef, "question3"), {
//       questionText: 'how old are u',
//       options: [
//     { id: 'A', answerText: '', isCorrect: false },
//     { id: 'B', answerText: '', isCorrect: false },
//     { id: 'C', answerText: '', isCorrect: false },
//     { id: 'D', answerText: '', isCorrect: false },
//   ],
//     });

//   }


//   useEffect(() => {



//     const getData = async() => {
//       const querySnapshot = await getDocs(collection(db, "questions"));
//       querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

//     }
//
//     getData();


// 	  }, []); // Empty dependency array to run the effect once when the component mounts


//   const [formData, setFormData] = useState({
//     question: '',
//     options: [
//       { id: 'A', text: '', isCorrect: false },
//       { id: 'B', text: '', isCorrect: false },
//       { id: 'C', text: '', isCorrect: false },
//       { id: 'D', text: '', isCorrect: false },
//     ],
//   });

//   const handleOptionChange = (optionId, value) => {
//     const newOptions = formData.options.map((option) =>
//       option.id === optionId ? { ...option, text: value } : option
//     );
//     setFormData({
//       ...formData,
//       options: newOptions,
//     });
//   };

//   const handleCorrectAnswerChange = (optionId) => {
//     const newOptions = formData.options.map((option) => ({
//       ...option,
//       isCorrect: option.id === optionId,
//     }));
//     setFormData({
//       ...formData,
//       options: newOptions,
//     });
//   };

//   const handleAddOption = () => {
//     const nextOptionId = String.fromCharCode(formData.options.length + 65); // A, B, C, ...
//     const newOptions = [
//       ...formData.options,
//       { id: nextOptionId, text: '', isCorrect: false },
//     ];
//     setFormData({
//       ...formData,
//       options: newOptions,
//     });
//   };

//   const handleRemoveOption = (optionId) => {
//     const newOptions = formData.options.filter((option) => option.id !== optionId);
//     setFormData({
//       ...formData,
//       options: newOptions,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     /*const database = getDatabase(firebase);
//     const questionRef = ref(database, 'questions');
//     const newQuestionKey = push(questionRef).key;
// */
//     const newQuestion = {
//       question: formData.question,
//       options: [...formData.options],
//     };

//     console.log(newQuestion);

//     const updates = {};
//     //updates[`/questions/${newQuestionKey}`] = newQuestion;

//     //await database.ref().update(updates);

//     //await addQuestion(newQuestion);

//     // Clear the form after adding the question
//     setFormData({
//       question: '',
//       options: [
//         { id: 'A', text: '', isCorrect: false },
//         { id: 'B', text: '', isCorrect: false },
//         { id: 'C', text: '', isCorrect: false },
//         { id: 'D', text: '', isCorrect: false },
//       ],
//     });
//   };

//   return (
//     <div className="form-container">
//       <label>Add Question</label>
//       <form onSubmit={handleFormSubmit}>
//         <label>
//           Question:
//           </label>
//           <textarea className='inputtext'
//             type="text"
//             value={formData.question}
//             onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//             required
//           />


//         <label>
//           <div width='500px' align-items='space-evenly'>
//           Options:
//           {formData.options.map((option) => (
//             <div key={option.id} >
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={option.isCorrect}
//                   onChange={() => handleCorrectAnswerChange(option.id)}
//                 />
//                 {option.id}
//               </label>
//               <input
//                 type="text"
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(option.id, e.target.value)}
//                 required
//               />

//               <button type="button" onClick={() => handleRemoveOption(option.id)}>
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={handleAddOption}>
//             Add Option
//           </button>
//           </div>
//         </label>

//         <button type="submit">Add Question</button>
//       </form>
//     </div>
//   );
// };

// export default QuestionForm;
const QuestionForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: [
      { id: 'A', text: '', isCorrect: false },
      { id: 'B', text: '', isCorrect: false },
      { id: 'C', text: '', isCorrect: false },
      { id: 'D', text: '', isCorrect: false },
    ],
  });

  const [selectedOption, setSelectedOption] = useState('Maths');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  const subjects = [
    { id: 1, name: 'Maths' },
    { id: 2, name: 'evs' },
    { id: 3, name: 'አካባቢ ሳይንስ' },
    { id: 4, name: 'አማርኛ' },
    { id: 5, name: 'English' },
    { id: 6, name: 'Spoken' },
    { id: 7, name: 'ግብረ ገብ' },
    { id: 8, name: 'Music' },
    { id: 9, name: 'HPE' },
    { id: 10, name: 'ሒሳብ' },
    { id: 11, name: 'Computer'},
    { id: 12, name: 'questions/maths/multiplication'  },
    // Add more subjects as needed
  ];


  const handleOptionChange = (optionId, value) => {
    const newOptions = formData.options.map((option) =>
      option.id === optionId ? { ...option, text: value } : option
    );
    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  const handleCorrectAnswerChange = (optionId) => {
    const newOptions = formData.options.map((option) => ({
      ...option,
      isCorrect: option.id === optionId,
    }));
    setFormData({
      ...formData,
      options: newOptions,
    });
  };
  const handleAddOption = () => {
        const nextOptionId = String.fromCharCode(formData.options.length + 65); // A, B, C, ...
        const newOptions = [
          ...formData.options,
          { id: nextOptionId, text: '', isCorrect: false },
        ];
        setFormData({
          ...formData,
          options: newOptions,
        });
      };

      const handleRemoveOption = (optionId) => {
        const newOptions = formData.options.filter((option) => option.id !== optionId);
        setFormData({
          ...formData,
          options: newOptions,
        });
      };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const questionsCollection = collection(db, `/${selectedOption}` );

    const newQuestion = {
      question: formData.question,
      options: [...formData.options],
    };

    try {
      // Use addDoc to add a new document to the 'questions' collection
      await addDoc(questionsCollection, newQuestion,"question100");

      // Clear the form after adding the question
      setFormData({
        question: '',
        options: [
          { id: 'A', text: '', isCorrect: false },
          { id: 'B', text: '', isCorrect: false },
          { id: 'C', text: '', isCorrect: false },
          { id: 'D', text: '', isCorrect: false },
        ],
      });

      console.log('Question added successfully!');
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  };

  return (


    <Box bgcolor={'skyblue'}  display={'flex'} justifyContent={'center'} padding={4}>
      <FormControl >
      <InputLabel id="dropdown-label" >Select an option</InputLabel>
     <Select
       labelId="dropdown-label"
       id="dropdown"
       value={selectedOption}
       label="Select an option"
       onChange={handleChange}
       sx={{ color: "black",fontWeight:"bold" }} // set the text color to red
    >
      {subjects.map((subjects) => (
        <MenuItem
          key={subjects.id}
          value={subjects.name}
        >
          {subjects.name}
        </MenuItem>
      ))}
    </Select>
    </FormControl>


      <FormControl onSubmit={handleFormSubmit}>
         <label >
           New Question:
           </label>
           <textarea className='inputtext'
             type="text"
             value={formData.question}
             onChange={(e) => setFormData({ ...formData, question: e.target.value })}
             required
           />


         <label>
           <Stack>
           Options:
           {formData.options.map((option) => (
             <Stack key={option.id} direction={'row'} spacing={2} padding={2}>
               <label>
                 <input
                   type="checkbox"
                   checked={option.isCorrect}
                   onChange={() => handleCorrectAnswerChange(option.id)}
                 />
                 {option.id}
               </label>
               <input className='inputtext'
                 type="text"
                 value={option.text}
                 onChange={(e) => handleOptionChange(option.id, e.target.value)}
                 required
               />

               <button type="button" onClick={() => handleRemoveOption(option.id)}>
                 Remove
               </button>
             </Stack>
           ))}

           </Stack>
         </label>
         <Stack  direction={'row'} spacing={2} padding={2}>
         <button type="button" onClick={handleAddOption}>
             Add Option
           </button>
         <button type="submit">Add Question</button>
         </Stack>
       </FormControl>
    </Box>
  );
};

export default QuestionForm;

