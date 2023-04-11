import { Button, Flex, Stack,Image} from '@chakra-ui/react';
import React,{useRef} from 'react';

type ProfilePostImageProps = {
    selectedFile?:string,
    onSelctedImage:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    setSelectedTab:(value:string)=>void
    setSelectedFile:(value:string)=>void

};

const ProfilePostImage:React.FC<ProfilePostImageProps> = ({setSelectedFile,onSelctedImage,setSelectedTab,selectedFile}) => {
    const selectedFileReferance=useRef<HTMLInputElement>(null)
    
    return(
        <Flex direction="column" justify="center" align="center" width="100%">
        {selectedFile ? (
          <>
            <Image
              src={selectedFile as string}
              maxWidth="400px"
              maxHeight="400px"
            />
            <Flex p={3} >
              <Button height="28px" onClick={() => setSelectedTab("Profile-Post")}>
                Back to Post
              </Button>
              <Button
                variant="outline"
                height="28px"
                onClick={() => setSelectedFile("")}
                ml={3}
              >
                Remove
              </Button>
            </Flex>
          </>
        ) : (
          <Flex
            justify="center"
            align="center"
            p={20}
            border="1px dashed"
            borderColor="gray.200"
            borderRadius={4}
            width="100%"
          >
            <Button
              variant="outline"
              height="28px"
              onClick={() => selectedFileReferance.current?.click()}
            >
              Upload
            </Button>
            <input
              id="file-upload"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              hidden
              ref={selectedFileReferance}
              onChange={ onSelctedImage}
            />
          </Flex>
        )}
      </Flex>
    )
}
export default ProfilePostImage;