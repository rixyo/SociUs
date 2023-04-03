import { Box, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { User } from 'firebase/auth';
import TabItem from './TabItem';
import TextInput from './PostForm/PostTextInput';
type indexProps = {
    user: User
};
export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
  };
const formTabs:TabItem[]=[
    {
        title: "Post",
        icon: IoDocumentText,
      },
      {
        title: "Images & Video",
        icon: IoImageOutline,
      },
      {
        title: "Link",
        icon: BsLink45Deg,
      },
      
   
]

const index:React.FC<indexProps> = () => {
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={4} >
      
            <Flex width="50%" key={Math.random()} ml={20} >
               {formTabs.map(item=>(
                <TabItem item={item}  setSelectedTab={setSelectedTab}  selected={item.title===selectedTab} />
               ))}
            </Flex>
            <Flex p={4} width="50%" ml={50} >
            {selectedTab==="Post"&&
                 <TextInput   /> 
               }

            </Flex>
        </Flex>
    )
}
export default index;