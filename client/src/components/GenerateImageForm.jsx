import React from 'react';
import styled from 'styled-components';
import  Button  from './button';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';

const Form =styled.div`
flex:1;
padding:16px 20px;
display:flex;
flex-direction:column;
gap:9%;
justify-Content:center;
`;

const Top =styled.div`
display:flex;
flex-direction:column;
gap:6px;
`;

const Tittle =styled.div`
font-size:28px;
font-weight:500;
color:${({theme})=>theme.text_primary};
`;

const Desc =styled.div`
font-size:17px;
font-weight:400;
color:${({theme})=>theme.text_secondary};
`;

const Body =styled.div`
display:flex;
flex-direction:column;
gap:18px;
font-size:12px;
font-weight:400;
color:${({theme})=>theme.text_secondary};
`;

const Action =styled.div`
flex:1;
display:flex;
gap:8px;
`;


const  GenerateImageForm= () => {
  return (
    <Form>
      <Top>
        <Tittle>Generate Image with  prompt</Tittle>
        <Desc>
            Write your  prompt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput label="Author" placeholder="Enter you name.." name="name"/>
        <TextInput label="Image Prompt" placeholder="Write a detailed prompt about the image . . ."
         name="name"
         rows="8"
         textArea
         />
      ** You post the AI Generated Image to  the Community **
      </Body>
      <Action>
       <Button text="Generate Image" flex leftIcon={<AutoAwesome/>} />
       <Button text="Post Image" flex type="secondary" leftIcon={<CreateRounded/>} />

      </Action>
    </Form>
  );
}

export default  GenerateImageForm;
