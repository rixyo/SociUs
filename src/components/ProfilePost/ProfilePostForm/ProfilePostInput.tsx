import { Stack, Input, Textarea, Flex, Button } from '@chakra-ui/react';
import React from 'react';

type ProfilePostInputProps = {
    postInput:{
        name:string,
        about:string
    },
    onValueChange:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void,
    handleCreatePost:()=>void,
    loading:boolean  
};

const ProfilePostInput:React.FC<ProfilePostInputProps> = ({postInput,onValueChange,handleCreatePost,loading}) => {
    
    return (
        <>
        <Stack spacing={3} width="100%">
            <Input
            name="name"
            value={postInput.name}
            onChange={onValueChange}
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
            name="about"
            value={postInput.about}
            onChange={onValueChange}
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
             isLoading={loading}
             onClick={handleCreatePost}
            >Post</Button>
                
            </Flex>
            

        </Stack>
        </>
    )
}
export default ProfilePostInput;