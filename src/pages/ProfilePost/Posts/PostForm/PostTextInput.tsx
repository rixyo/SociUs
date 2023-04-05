import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type TextInputProps = {
  textInputs:{
    postTitle:string,
      postBody:string,
      postUrl?:string,
  },
  onChange:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void,
    handleCreatePost:()=>void,
    loading:boolean
};

const TextInput:React.FC<TextInputProps> = ({textInputs,onChange,handleCreatePost,loading}) => {
    
    return(
        <Stack spacing={3} width="100%">
            <Input
            name="postTitle"
            value={textInputs.postTitle}
            onChange={onChange}
           
             _placeholder={{ color: "gray.500" }}
             _focus={{
               outline: "none",
               bg: "white",
               border: "1px solid",
               borderColor: "black",
             }}
             fontSize="10pt"
             borderRadius={4}
             placeholder="Title"
            />
            <Textarea
            name="postBody"
            value={textInputs.postBody}
            onChange={onChange}
            
              fontSize="10pt"
              placeholder="Text (optional)"
              _placeholder={{ color: "gray.500" }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "1px solid",
                borderColor: "black",
              }}
              height="100px"
            />
            <Flex justify="flex-end">
            <Button
             height="34px"
             padding="0px 30px"
            onClick={handleCreatePost}
            isLoading={loading}
            >Post</Button>
                
            </Flex>
            

        </Stack>
    )
}
export default TextInput;