import { Button, Flex, Input, Textarea } from '@chakra-ui/react';
import React from 'react';

type PostLinkProps = {
  textInputs:{
    url?:string
},
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading:boolean,
  setSelectedTab:(value:string)=>void
    
};

const PostLink:React.FC<PostLinkProps> = ({onChange,textInputs,setSelectedTab,loading}) => {
    
    return(
        <Flex border="1px solid" bg="white" borderColor="gray.300" borderRadius={4} _hover={{borderColor:'gray.500'}} cursor="pointer" width="100%" justify="center"  align="center" paddingY={5}>
         <Flex width="90%" direction="column" gap={3}>
        
            <Input
            name="url"
            type="url"
           value={textInputs.url}
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
             placeholder="url"
            />
            <Flex justify="flex-end">
            <Button
             height="34px"
             padding="0px 30px"
            isLoading={loading}
            onClick={() => setSelectedTab("Post")}
            >Back To Post</Button>
                
            </Flex>
            



            </Flex>   
        </Flex>
    )
}
export default PostLink;