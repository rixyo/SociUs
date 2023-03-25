import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
export interface Post{
    id:string,
    teamId:string,
    creatorId:string,
    creatorDisplayName:string,

    title:string,
    body:string,
    imageUrl?:string,
    numberOfComments:number,
    voteStatus:number,
   teamImageUrl?:string,
    createdAt: Timestamp

}
interface PostState{
    selectedPost: Post|null,
    posts:Post[]
}
const defaultPostState:PostState={
    selectedPost:null,
    posts:[]

}
export const postState=atom<PostState>({
    key:"Post State",
    default: defaultPostState
})