import { Post, postState } from '@/atoms/postAtom';
import { fireStore, storage } from '@/Firebase/clientapp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';


const usePost= () => {
    const [postStateValue,setPostStateValue]=useRecoilState(postState)
    const onVote=async()=>{}
    const OnSelectPost=()=>{}
    const onDeletePost=async(post:Post):Promise<boolean>=>{
        try {
            if(post.imageUrl){
                const imageRef=ref(storage,`posts/${post.id}/images`)
                await deleteObject(imageRef)
            }
            const postDoc=doc(fireStore,'posts',post.id!)
         
            await deleteDoc(postDoc)
            setPostStateValue(prev=>({
                ...prev,
                posts:prev.posts.filter(item=>item.id!==post.id)
            }))
            console.log("deleted")
            return true
         
            
        } catch (error:any) {
            console.log(error.message)
            return false
            
        }
        

    }
    
    return{
        postStateValue,
        setPostStateValue,
        onVote,
        OnSelectPost,
        onDeletePost,
    }
}
export default usePost;