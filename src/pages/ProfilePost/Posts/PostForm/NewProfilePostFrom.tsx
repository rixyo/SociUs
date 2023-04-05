import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import { User } from 'firebase/auth';

import { BsLink45Deg } from 'react-icons/bs';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';

import useSelectFile from '@/components/hooks/useSelectFile';
import { ProfilePost } from '@/atoms/profilePostAtom';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { fireStore, storage } from '@/Firebase/clientapp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import TabItem from '../TabItem';
import TextInput from './PostTextInput';
import ImageUpload from './ImageUpload';
import PostLink from './PostLink';

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

const NewProfilePostForm:React.FC<indexProps> = ({user}) => {
    const { selectedFile, setSelectedFile,onSelectFile,} =useSelectFile()
    const [selectedTab,setSelectedTab]=useState(formTabs[0].title)
    const [customError,setCustomError]=useState<string>("")
    const [textInputs,selectedTextInputs]=useState({
      postTitle:"",
      postBody:"",
      postUrl:"",
    })
    const router=useRouter()
 

  
      const [loading,setLoading]=useState<boolean>(false)
      const handleCreatePost=async()=>{
        const profilePost:ProfilePost={
          title:textInputs.postTitle,
          body:textInputs.postBody,
          creatorDisplayName:user.email!.split('@')[0],
          creatorId:user.uid,
          numberOfComments:0,
          voteStatus:0,
          createdAt:serverTimestamp() as Timestamp,
         


        }
        if(profilePost.title.length<=0){
          setCustomError("Title is required")
          return
        }
        else{
          try {
            const docRef=await addDoc(collection(fireStore,"profilePosts"),profilePost)
            if(docRef){
              await updateDoc(docRef,{
                postId:docRef.id
              })
            }
            if(selectedFile){
              const imageRef=ref(storage,`profilePosts/${docRef.id}/images`)
              await uploadString(imageRef,selectedFile,"data_url")
              const downloadUrl=await getDownloadURL(imageRef)
              await updateDoc(docRef,{
                imageUrl :downloadUrl

              })
            }
            else if(textInputs.postUrl){
              await updateDoc(docRef,{
                linkUrl:textInputs.postUrl
              })
            }
            
          } catch (error) {
            console.log("profilePost",error)
            
          }
          setLoading(false)
          router.back()
        }

      }
      const onTextChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {target:{name,value}}=event
        selectedTextInputs(prev=>({
          ...prev,[name]:value
        }))
      } 
      
    
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={4}  justify="center" align="center" width="100%" >
      
            <Flex  width={{ base: "100%", md: "65%" }} key={Math.random()} ml={{base:"none",md:"20"}} justify={{base:"space-around",md:"center"}} mr={{base:"10",md:"none"}}>
               {formTabs.map(item=>(
             
                    <TabItem key={item.title} item={item}   setSelectedTab={setSelectedTab}  selected={item.title===selectedTab} />
          
                
               ))}
            </Flex>
            <Flex p={4} width={{ base: "100%", md: "65%" }} ml={{base:"none",md:"10"}}   >
            {selectedTab==="Post"&&
                 <TextInput  textInputs={textInputs} handleCreatePost={handleCreatePost} onChange={onTextChange} loading={loading}    /> 
               }
                {selectedTab==="Images & Video"&&
                 <ImageUpload  selectedFile={selectedFile} onSelctedImage={onSelectFile} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile}   />
               }
                {selectedTab==="Link"&&
                <PostLink   onChange={onTextChange} textInputs={textInputs} loading={loading} setSelectedTab={setSelectedTab}/>}
                

            </Flex>
        </Flex>
    )
}
export default NewProfilePostForm;