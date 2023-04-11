import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export interface ProfilePost{
    id?:string,
    createdBy:string,
    creatorDisplayName:string,
    name:string,
    about:string,
    imageLink?:string,
    numberOfComments:number,
    likes:number,
    createdAt: Timestamp,
}

export type postLike={
    id:string,
    postId:string,
    Likes:number,

}
interface ProfilePostState{
    selectedPost: ProfilePost|null,
    posts:ProfilePost[],
    postLikes:postLike[]
}
const defaultPostState:ProfilePostState={
    selectedPost:null,
    posts:[],
    postLikes:[]

}
export const profilePostState=atom<ProfilePostState>({
    key:"Profile Post State",
    default: defaultPostState
})