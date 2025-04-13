 
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme } from './utils/Theme';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar';

const Container =styled.div`
width :100%;
height :100%;
display:flex;
background:${({theme})=>theme.bg};
color :${({theme})=>theme.text_primary};
overflow-x:hidden;
overflow-xy:hidden;
transition:all 0.2s ease;
`;

const Wrapper =styled.div`
height :100%;
position:relative;
flex-direction:column;
justify-content:space-between;
flex:3;
`;
function App() {
  return  <ThemeProvider theme={darkTheme}>
    <Container>
      <Wrapper>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} exact/>
          <Route path='/post' element={<CreatePost/>} exact/>
        </Routes>
        </BrowserRouter>
      </Wrapper>
    </Container>
    </ThemeProvider>
}

export default App;
