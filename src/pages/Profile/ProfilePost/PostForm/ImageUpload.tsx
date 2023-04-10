import { Button, Flex, Stack,Image } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?:string,
    onSelctedImage:(event:React.ChangeEvent<HTMLInputElement>)=>void,
    setSelectedTab:(value:string)=>void
    setSelectedFile:(value:string)=>void

    
};

const ImageUpload:React.FC<ImageUploadProps> = ({setSelectedFile,onSelctedImage,setSelectedTab,selectedFile}) => {
    const selectdImageRef=useRef<HTMLInputElement>(null)
    return(
        <Flex direction="column" justify="center" align="center" width="100%">
        {selectedFile ? (
          <>
            <Image
              src={selectedFile as string}
              maxWidth="400px"
              maxHeight="400px"
            />
            <Stack direction="row" mt={4}>
              <Button height="28px" onClick={() => setSelectedTab("Post")}>
                Back to Post
              </Button>
              <Button
                variant="outline"
                height="28px"
                onClick={() => setSelectedFile("")}
              >
                Remove
              </Button>
            </Stack>
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
              onClick={() => selectdImageRef.current?.click()}
            >
              Upload
            </Button>
            <input
              id="file"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              hidden
              ref={selectdImageRef}
              onChange={ onSelctedImage}
            />
          </Flex>
        )}
      </Flex>
    )
}
export default ImageUpload;