
import React, { useRef } from 'react'
import Dialog from '@mui/material/Dialog';
import { useState, useEffect } from 'react';
import '../utils/quize-index/index.css';
import {questions} from '../utils/quize-index/quize-questions';
import {getDocs,collection,doc,setDoc,addDoc, QuerySnapshot} from 'firebase/firestore';
import {db} from '../utils/quize-index/firebase';
import AudioPlayer from './Player/AudioPlayer';

const AudioStudy = ({open,setAudioEnded,getIsAnswered,setPlay}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [openDialog, setOpenDialog] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [wrongAnswer, setWrongAnswer] = useState(false);
	const [seconds, setSeconds] = useState(16);
	const [ended, setEnded] = useState(false);


	const handleAudioEnd = () => {
		setOpenDialog(false);
		setAudioEnded(true);
		setEnded(true);
		setPlay(true);

	  };
      useEffect(() => {


        console.log("inside 2:",open);
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

      }, [open])

  return (
        <Dialog open={open} className='dialogStyle'>
            <AudioPlayer setAudioEnded={setAudioEnded}/>
        </Dialog>
  )
}

export default AudioStudy