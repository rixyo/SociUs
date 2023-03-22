import { Button, Flex } from "@chakra-ui/react";
import AuthButton from "./AuthButton";
import AuthModal from "../../Modal/Auth/AuthModal"
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from "@/Firebase/clientapp";
import { User } from "firebase/auth";
import ActionIcons from "./Icon";
import UserMenu from "../UserMenu";

type RightContentProps = {
    User?:User | null
};

const RightContent:React.FC<RightContentProps> = ({User}) => {
  
    
    return(
        <>
       <AuthModal/>
<Flex justify="center" align="center">
    {User?<ActionIcons/> : <AuthButton /> }
    <UserMenu User={User}/>
  
            
        </Flex>
      
        </>
    )
}
export default RightContent;