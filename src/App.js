import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box ,Stack} from '@mui/material';
import { ChannelDetail, VideoDetail, SearchFeed,
  Navbar, Feed, QuestionForm,AudioFileList,FirebaseAudio,
  QuizSiglePage,QuizeList } from './components';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { AlignHorizontalCenter } from "@mui/icons-material";





const App = () =>  (
    <BrowserRouter>
    <Stack>
    <Navbar/>
      <Box sx={{ backgroundColor: '#000' }}>
        <Routes>
        <Route exact path='/' element={<Feed/>}/>
        <Route path='/video/:id' element={<VideoDetail />} />
        <Route path='/channel/:id' element={<ChannelDetail />} />
        <Route path='/search/:searchTerm' element={<SearchFeed />} />
        <Route path='/QuestionForm' element={<QuestionForm />}  />
        <Route path='/GoogleDrive/AudioFileList' element={<AudioFileList/>}/>
        <Route path='/QuizSiglePage/:subjectName' element={<QuizSiglePage/>}/>
        <Route path='/QuizeList' element={<QuizeList />} />


      </Routes>
      </Box>
    </Stack>
  </BrowserRouter>
  );




export default App