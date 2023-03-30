import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Icon,Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from './TabItem';
import TextInput from './PostForm/TextInput';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '@/atoms/postAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { fireStore, storage } from '@/Firebase/clientapp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Poll from './PostForm/Poll';
import PostLink from './PostForm/PostLink';


type NewPostFormProps = {
  user:User
    
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
export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
  };
const NewPostForm:React.FC<NewPostFormProps> = ({user}) => {
  const router=useRouter()
  const {teamId}=router.query
  
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [customError,setCustomError]=useState<string>("")
    const [textInputs,selectedTextInputs]=useState({
      title:"",
      body:"",
      url:""
    })
    const [selectedFile,setSelectedFile]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false)
    const handleCreatePost=async()=>{
      const newPost:Post={
        teamId: teamId as string,
        creatorId: user.uid,
        creatorDisplayName: user.email!.split('@')[0],
        title: textInputs.title,
        body: textInputs.body,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
       
      }

if(newPost.title.length<=0){
  setCustomError("Post cannot be null, atleast provide  little hint about your idea");return;
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
    if(textInputs.url){
  
      await updateDoc(postDocRef,{
        linkUrl:textInputs.url
      })
    }
} catch (error:any) {

  console.log(error.message)
  
}

}

setLoading(false)
router.back()

    }
    const onSelectedImage=(event:React.ChangeEvent<HTMLInputElement>)=>{
      const reder=new FileReader()
      if(event.target.files?.[0]){
        reder.readAsDataURL(event.target.files[0])
      }
      reder.onload=(rederEvent)=>{
        if(rederEvent.target?.result){
          setSelectedFile(rederEvent.target.result as string)
        }
      }
    }
    const onTextChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const {target:{name,value}}=event
      selectedTextInputs(prev=>({
        ...prev,[name]:value
      }))
    }
    
    
    return (
        <Flex direction="column" bg="whit" borderRadius={4} mt={2}>
            <Flex width="100%" key={Math.random()} >
                {formTabs.map((item)=>(
                      <TabItem  item={item} selected={item.title===selectedTab} setSelectedTab={setSelectedTab} />
                )
                 
                )}

            </Flex>
            
               <Flex p={4}>
               {selectedTab==="Post"&&
                 <TextInput textInputs={textInputs} handleCreatePost={handleCreatePost} onChange={onTextChange} loading={loading}  /> 
               }
            
               {selectedTab==="Images & Video" &&
               <ImageUpload selectedFile={selectedFile} onSelctedImage={onSelectedImage} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile}   />
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