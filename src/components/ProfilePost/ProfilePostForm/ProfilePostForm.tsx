import { ProfilePost } from '@/atoms/profilePostAtom';
import useSelectFile from '@/components/hooks/useSelectFile';
import { fireStore, storage } from '@/Firebase/clientapp';
import { Flex, Icon } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';
import { IoDocumentText } from 'react-icons/io5';
import ProfileFormTabItem from '../ProfileFormTabItem';
import ProfilePostImage from './ProfilePostImage';
import ProfilePostInput from './ProfilePostInput';

type ProfilePostFormProps = {
    user:User
};
export type Tabs={
    name:string,
    icon:typeof Icon.arguments
}
const tabs:Tabs[]=[
    {
        name:"Profile-Post",
        icon:IoDocumentText
    },
    {
        name:"Post-Image",
        icon:BsFillImageFill
    }
]
const ProfilePostForm:React.FC<ProfilePostFormProps> = ({user}) => {
    const { selectedFile,
        setSelectedFile,
        onSelectFile,} =useSelectFile()
    const [selectedTab,setSelectedTab]=useState(tabs[0].name)
    const [postInput,setPostInput]=useState({
        name:"",
        about:"",
    })
    const [loading,setLoading]=useState<boolean>(false)
    const router=useRouter()
    const [error,setError]=useState<string>("")
    const handleCreatePost=async()=>{
        const newProfilePost:ProfilePost={
            name:postInput.name,
            about:postInput.about,
            creatorDisplayName:user.displayName || user.email!.split('@')[0],
            createdBy:user.uid,
             likes:0,
             numberOfComments:0,
            createdAt:serverTimestamp() as Timestamp,
        }
        if(newProfilePost.name.length<=0){
            setError("Please enter your Title")
            return
        }
        else{
            setLoading(true)
            try {
                const docRef=await addDoc(collection(fireStore,"profilePosts"),newProfilePost)
                if(docRef){
                    await updateDoc(docRef,{
                        id:docRef.id
                    })
                }
                if(selectedFile){
                    const imageRef=ref(storage,`profilePosts/${docRef.id}/images`)
                    await uploadString(imageRef,selectedFile,'data_url')
                    const downLoadUrl=await getDownloadURL(imageRef)
                    await updateDoc(docRef,{
                        imageLink:downLoadUrl
                    })
                  }
                   
                
            } catch (error) {
                console.log("Error in creating post",error)
                
            }
            setLoading(false)
            Router.push("/Profile")
            
        }
    }
    const onValueChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {target:{name,value}}=event
        setPostInput(prev=>({
          ...prev,[name]:value
        }))
      }
    
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {tabs.map((tab,index)=>(
                    <ProfileFormTabItem tab={tab} selectedTab={tab.name===selectedTab} setSelectedTab={setSelectedTab}/>

                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab==="Profile-Post" && (
                    <ProfilePostInput postInput={postInput} loading={loading} handleCreatePost={handleCreatePost} onValueChange={onValueChange}/>
                )}
                {selectedTab==="Post-Image" &&
               <ProfilePostImage selectedFile={selectedFile} onSelctedImage={onSelectFile} setSelectedTab={setSelectedTab} setSelectedFile={setSelectedFile}   />
               }
                </Flex>
        </Flex>
    )
}
export default ProfilePostForm;