import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon,Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '@/atoms/postAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { fireStore, storage } from '@/Firebase/clientapp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Poll from '../Poll/Poll';
import PostLink from './PostForm/PostLink';
import useSelectFile from '../hooks/useSelectFile';
import FormTabItem from './FormTabItem';


type NewPostFormProps = {
  user:User,
  teamImageUrl?:string
    
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
      {
        title: "Poll",
        icon: BiPoll,
      },
   
]
const NewPostForm:React.FC<NewPostFormProps> = ({user,teamImageUrl}) => {
  const router=useRouter()
  const {teamId}=router.query
  
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [customError,setCustomError]=useState<string>("")
    const [textInputs,selectedTextInputs]=useState({
      title:"",
      body:"",
      url:""
    })
   const { selectedFile,
    setSelectedFile,
    onSelectFile,} =useSelectFile()
    const [loading,setLoading]=useState<boolean>(false)
    const handleCreatePost=async()=>{
      const newPost:Post={
        teamId: teamId as string,
        teamImageUrl:teamImageUrl || " ",
        creatorId: user.uid,
        creatorDisplayName: user.email!.split('@')[0],
        title: textInputs.title,
        body: textInputs.body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
       
      }

if(newPost.title.length<=0){
 throw new Error("Post cannot be null, atleast provide  little hint about your idea")
}

else{
  setLoading(true)
  try {
   

    const postDocRef=await addDoc(collection(fireStore,"posts"),newPost)
    if(postDocRef){
      await updateDoc(postDocRef,{
        postId:postDocRef.id
      })
    }
    if(selectedFile){
      const imageRef=ref(storage,`posts/${postDocRef.id}/images`)
      await uploadString(imageRef,selectedFile,'data_url')
      const downLoadUrl=await getDownloadURL(imageRef)
      await updateDoc(postDocRef,{
        imageUrl:downLoadUrl
      })
    }
   else if(textInputs.url){
  
      await updateDoc(postDocRef,{
        linkUrl:textInputs.url
      })
    }
} catch (error:any) {
  setCustomError(error.message)

  console.log(error.message)
  
}

}

setLoading(false)
router.back()

    }

    const onTextChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const {target:{name,value}}=event
      selectedTextInputs(prev=>({
        ...prev,[name]:value
      }))
    }
    
    
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%" key={Math.random()%100} >
                {formTabs.map((item)=>(
                      <FormTabItem item={item} selected={item.title===selectedTab} setSelectedTab={setSelectedTab} />
                )
                 
                )}

            </Flex>
            
               <Flex p={4}>
               {selectedTab==="Post"&&
                 <TextInput textInputs={textInputs} handleCreatePost={handleCreatePost} onChange={onTextChange} loading={loading}  /> 
               }
            
               {selectedTab==="Images & Video" &&
               <ImageUpload selectedFile={selectedFile} onSelctedImage={onSelectFile} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile}   />
               }
                 {selectedTab==="Poll" && 
             <Poll user={user} />
               }
               {selectedTab==="Link" &&
               <PostLink onChange={onTextChange} textInputs={textInputs} loading={loading} setSelectedTab={setSelectedTab}/>
               }
             
              
              </Flex>
              {customError &&
              <Alert status='error'>
              <AlertIcon />
              <AlertTitle>{customError}</AlertTitle>
          
            </Alert>
              }
            
           
        </Flex>
    )
}
export default NewPostForm;