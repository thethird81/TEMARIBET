import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed,
  Navbar, Feed, QuestionForm,AudioFileList,FirebaseAudio,
  QuizSiglePage,QuizeList } from './components';




const App = () =>  (
    <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>

      <Routes>
        <Route path='/' element={<QuizeList/>}/>
        <Route exact path='/feed' element={<Feed/>}/>
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
        <Route path='/QuestionForm' element={<QuestionForm />}  />
        <Route path='/GoogleDrive/AudioFileList' element={<AudioFileList/>}/>
        <Route path='/QuizSiglePage/:subjectName' element={<QuizSiglePage/>}/>

      </Routes>
    </Box>
  </BrowserRouter>
  );




export default App