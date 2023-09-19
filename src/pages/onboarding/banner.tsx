import { Box, Button, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react'
import OBWizardSteps from '@/components/onboarding/OBWizardSteps';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaLongArrowAltLeft, FaUpload } from 'react-icons/fa';
import { DropzoneOptions, useDropzone } from "react-dropzone";
type FilePreview = {
    file: File;
    previewUrl: string;
};
const OnBoarding = () => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const previewUrl = URL.createObjectURL(file);
        setSelectedFile({ file, previewUrl });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });
    return (
        <Box height={'100vh'}>
            <Flex flexDirection={'column'} padding={'20px'} height={'100%'} width='100%' justifyContent={'center'} alignItems='center'>
                <Card height={'100%'} width='100%'>
                    <CardBody>
                        <Box
                            cursor={'pointer'}
                             onClick={() => router.push('/onboarding/')}
                            fontSize={{
                                base: "30px",
                                md: "30px",
                                lg: "30px",
                            }}
                        >
                            <FaLongArrowAltLeft color='gray' />
                        </Box>

                        <Box border={'1px solid'} borderRadius='10px' width={'40%'} padding='10px' paddingTop={'20px'} margin='auto' height={'100%'}>

                            <Flex {...getRootProps()} cursor={'pointer'} justifyContent={'center'} height={'200px'} width='100%' >
                                <Flex justifyContent={'center'} alignItems='center' fontSize={{
                                    base: "60px",
                                    md: "60px",
                                    lg: "100px",
                                }} borderRadius={'10px'} height={'200px'} width='100%' border={'1px solid'}>
                                    <input {...getInputProps()} />
                                    {
                                        selectedFile && (
                                            <img src={selectedFile.previewUrl} style={{ margin: '0', width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )
                                    }
                                    {
                                        !selectedFile && (
                                            <FaUpload color="grey" />
                                        )
                                    }


                                </Flex>
                            </Flex>
                            <Flex justifyContent={'center'} alignItems='center' marginTop={'10px'} width='100%' >
                                <Text as='h2'>
                                    Add banner
                                </Text>
                            </Flex>
                            <Flex justifyContent={'center'} alignItems='center' marginTop={'1px'} width='100%' >
                                <Text as='h6'>
                                    Add banner so that it will give you a highlight in your profile
                                </Text>
                            </Flex>
                            <Flex cursor={'pointer'} onClick={() => router.push('/onboarding/details')} justifyContent={'center'} alignItems='center' padding={'10px'} marginTop={'10px'} width='100%' >
                                <Button width={'lg'} colorScheme='blue'>Save banner</Button>
                            </Flex>
                            <Flex cursor={'pointer'} onClick={() => router.push('/onboarding/details')} justifyContent={'center'} alignItems='center' marginTop={'10px'} width='100%' >
                                <Text as='span'>
                                    Skip
                                </Text>
                            </Flex>
                        </Box>
                    </CardBody>
                </Card>
                <OBWizardSteps
                    changeCurrentStep={null}
                    steps={1}
                />
            </Flex>
        </Box>
    )
}


export default OnBoarding;
