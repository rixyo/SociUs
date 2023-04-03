
import { IconType } from "react-icons"
import { TiGroup } from "react-icons/ti"
import {atom} from "recoil"
export type  DirectoryMenuItem={
    displayName:string,
    link:string,
    imageUrl?:string,
    icon:IconType,
    iconColor:string,


}
interface DirectoryMenuState{
    isOpen:boolean,
    selectedMenuIteam:DirectoryMenuItem,

}
export const defaultManuItem:DirectoryMenuItem={
    displayName:"Team",
    link:"/",
    icon:TiGroup,
    iconColor:"black"

}
export const defaultMenuState:DirectoryMenuState={
    isOpen:false,
    selectedMenuIteam:defaultManuItem
}
export const directoryMenuState=atom<DirectoryMenuState>({
    key:"directoryManuState",
    default:defaultMenuState,
})