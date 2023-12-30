import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";




import { Videos, Loader,Quize,Exam, AudioStudy,QuizSiglePage } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {

  const [videoDetail, setVideoDetail] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const [play, setPlay] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const MINUTE_MS = 60000;
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const formatDuration = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${hours}:${minutes}:${seconds}`;
  };

    const handleDuration = (d) => {
      setDuration(d);
    };

    // const handleProgress = (state) => {
    //   if (duration) {
    //     setPlayed(state.played);
    //   }
    // };
    const handleProgress = (state) => {
      if (!state.seeking) {
        setPlayed(state.played);
        setRemainingTime((duration - state.played * duration) || 0);
      }
    };

    const handleSeekChange = (e) => {
      setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseDown = () => {
      // Pause the video while seeking
      // You may want to add additional logic based on your requirements
    };

    const handleSeekMouseUp = (e) => {
      // Seek to the selected position when the mouse is released
      const newPosition = parseFloat(e.target.value);
      setPlayed(newPosition);
      // Seek to the new position in the video
      if (duration) {
        // ReactPlayer seekTo function expects a value between 0 and 1
        const seekTime = newPosition * duration;
        // Seek to the new position
        // You may want to use the ref attribute of ReactPlayer to get the player instance
        // and then call seekTo on it. Example: playerRef.current.seekTo(seekTime);
      }
    };




  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  function getIsAnswered(isAnswered)
  {
    setPlay(isAnswered);
  }




useEffect(() => {
  // if(play)
  // {
  // const interval = setInterval(() => {
  //   setPlay(false);
  // }, MINUTE_MS);
  // return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }
  // else{
  //   setPlay(!play);
  //   setAudioEnded(false);
  // }
  console.log("audio ended:",audioEnded);
  console.log("play:",play);

  if(play)
  {
  const interval = setInterval(() => {
    setPlay(false);
    setAudioEnded(false);
  }, MINUTE_MS);
  return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }


  if(audioEnded)
  {
    setAudioEnded(false);
    setPlay(true);

  }

}, [audioEnded,play]);

  if(!videoDetail?.snippet) return <Loader />;
  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;



  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>

          {/* {play?
            <Quize open ={!play}  setPlay={setPlay} getIsAnswered={getIsAnswered} setAudioEnded={setAudioEnded}/>
            :<Quize open={!play}  setPlay={setPlay} getIsAnswered={getIsAnswered} setAudioEnded={setAudioEnded}/>
             } */}
             {play?
            <Quize open ={!play}  setPlay={setPlay} getIsAnswered={getIsAnswered} setAudioEnded={setAudioEnded}/>
            :<Quize open={!play}  setPlay={setPlay} getIsAnswered={getIsAnswered} setAudioEnded={setAudioEnded}/>
             }


            {play?
            <div>
              <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  className="react-player"
                  controls={false}
                  playing={play}
                  onDuration={handleDuration}
                  onProgress={handleProgress}
              />
                <div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={played}
                    style={{ width: '100%' }}
                    onChange={handleSeekChange}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={handleSeekMouseUp}
                  />
                <div>
                Duration: {formatDuration(duration)} | Remaining: {formatDuration(remainingTime)}
                </div>
                </div>
              </div>
            :<ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-player"
            controls={true}
            playing={play}
            />
            }


            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>





        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;