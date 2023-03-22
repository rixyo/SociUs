import {atom} from "recoil"
export interface JoinModalState{
    open:boolean,
    view:"join"| ""

}
const defaultModalState:JoinModalState={
    open:false,
    view:'join'

}
export const joinModalState=atom<JoinModalState>({
    key:"joinModalState",
    default:defaultModalState,
    
})
