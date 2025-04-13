import React from 'react'
import styled from 'styled-components';


import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';

const Container =styled.div`
height:100%;
overflow-y:scroll;
background :${({theme})=>theme.bg}
padding-bottom:50px;
display:flex;
flex-direction:column;
align-items:center;
gap:20px;
@media (max-width:768px){
padding:6px 10px;
}
`;

const Headline=styled.div`
font-size:34px;
font-weight:500;
color:${({theme})=>theme.text_primary};
display:flex;
flex-direction:column;
align-items:center;

@media (max-width:600px){
font-size:22px;
}
`;

const Span=styled.div`
font-size:30px;
font-weight:500;
color:${({theme})=>theme.secondary};
@media (max-width:600px){
font-size:20px;
}
`;

const Wrapper=styled.div`
width:100%;
max-width:1400px;
padding:32px 0px;
display:flex;
justify-content:center;
`;

const CardWrapper =styled.div`
display:grid;
gap:20px;
@media (min-width:1200px){
grid-template-columns:repeat(4,1fr);
}
@media (min-width:640px) and (max-width:1200px){
grid-template-columns:repeat(3,1fr);
}
@media (max-width:639px){
grid-template-columns:repeat(2,1fr);
}

`;

const Home =()=> {
    const item={
        photo:"https://media.istockphoto.com/id/1322104312/photo/freedom-chains-that-transform-into-birds-charge-concept.jpg?s=612x612&w=0&k=20&c=e2XUx498GotTLJn_62tPmsqj6vU48ZEkf0auXi6Ywh0=",
        author:"shashinda",
        prompt:"hello",
    }
  return <Container>
    <Headline>Explore popular posts in the Community!
        <Span>⦿ Generated with AI ⦿</Span>
    </Headline>
    <SearchBar/>
    <Wrapper>
<CardWrapper>

   <ImageCard item={item}/>
   <ImageCard item={item}/>
   <ImageCard item={item}/>
   <ImageCard item={item}/>
   <ImageCard item={item}/>
   <ImageCard item={item}/>
   <ImageCard item={item}/>

    
</CardWrapper>
    </Wrapper>
  </Container>;
     
  
};
export default Home;
