import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DelegateRCModal = ({rerenderList,isCreate =false, selectedUser, isOpenModalEditDelegate, onCloseModalEditDelegate }: any) => {
  const [rcAmount, setrcAmount] = useState(5)
  const [urlInfo, seturlInfo] = useState<any>(null);
  const [toDelegate, settoDelegate] = useState<any>(null);
  

  const submitDelegateRC = () => {
    // show modal call function here
    // setshowModalFormDelegateRC(true)
    // onOpenDRC()
    console.log("urlinfo", urlInfo.username)
    console.log("urlInfo.referral", urlInfo.referral)
    console.log("rcAmount", rcAmount)
    if (window.hive_keychain) {
      console.log("window.hive_keychain",window.hive_keychain)
      const json = JSON.stringify(['delegate_rc', {
            from: `${urlInfo.referral}`,
            delegatees: isCreate == true?[`${toDelegate}`]:[`${urlInfo.username}`],
            max_rc: rcAmount * 1000000000,
        }]);
      
      window.hive_keychain.requestCustomJson(
        `${urlInfo.referral}`,
        "rc",
        'Posting',
        json,
        "Delegate RC",
        callbackfunctestREs
      );
  } else {
      alert("Hive Keychain is not installed!");
  }
  }

  const callbackfunctestREs = (res:any) => {
    // show modal call function here
    // setshowModalFormDelegateRC(true)
    // onOpenDRC()c
    console.log("res",res)
    rerenderList()
    onCloseModalEditDelegate()
    // onCloseDRC()
  }
  const [getCurrentRc, setgetCurrentRc] = useState<any>(0);

  const get_rc = async (accounts:any) => {
    try {
      const response = await axios.post('https://api.hive.blog', {
        jsonrpc: '2.0',
        id: 1,
        method: 'rc_api.find_rc_accounts',
        params: {
          accounts
        }
      });
      response.data.result;
      console.log("response.data.result", response.data.result);
      if (response && response.data && response.data.result && response.data.result.rc_accounts.length > 0) {
        let currentRc = response.data.result.rc_accounts[0].max_rc / 1000000000;
        currentRc = Number(currentRc.toFixed(2));
        setgetCurrentRc(currentRc);
      }
    } catch (error) {
      console.error('Error fetching RC accounts:', error);
      throw error;
    }
  };
//   useEffect(()=> {
//     get_rc([`${urlInfo?.referral}`])
//   },[])

  useEffect(()=> {
    if (selectedUser) {
        console.log("urlInfomodallll1132332423423",selectedUser)
        seturlInfo(selectedUser)
        // get_rc([`${urlInfo?.referral}`])  
    }
    
  },[selectedUser])

  useEffect(()=> {
    if (urlInfo) {
        console.log("urlInfo final",urlInfo)
        // seturlInfo(selectedUser)
        get_rc([`${urlInfo?.referral}`])  
    }
    
  },[urlInfo])
  return (
    <Modal size={'xl'} closeOnOverlayClick={false} isOpen={isOpenModalEditDelegate} onClose={onCloseModalEditDelegate}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delegate Resource Credits for {urlInfo?.username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
            <Box marginBottom={'15px'}>
            <label htmlFor="referral">From:</label><br />
            <Input variant='outline' readOnly width='80%' placeholder='username' value={urlInfo?.referral} />
            </Box>
            <Box marginBottom={'15px'}>
            <label htmlFor="referral">To:</label><br />

            {isCreate == false && (
              <Input variant='outline' width='80%' readOnly placeholder='referral username' value={urlInfo?.username} />
            )}

          {isCreate == true && (
              <Input variant='outline' width='80%'  placeholder='referral username' value={toDelegate} onChange={(e:any) => settoDelegate(e.target.value)} />
            )}
            {/* <Input variant='outline' width='80%' readOnly placeholder='referral username' value={urlInfo?.username} /> */}
            </Box>
            <Box>
            <label htmlFor="referral">RC Amount (Max available {getCurrentRc}Bn RC):</label><br />
              <Flex>
              <Input placeholder='How much do you want to delegate?' autoFocus required type={'number'} min={5} variant='outline' width='80%'   value={rcAmount} onChange={(e) => setrcAmount(parseInt(e.target.value))}  />
              <Button>Bn (BILLION)</Button>
              </Flex>
              <Box marginTop={'10px'}>
              {/* <Input   type={'range'} value={rcAmount} onChange={(e) => setrcAmount(parseInt(e.target.value))}   min={0} max={getCurrentRc}  width='50%'     /> */}
              
               <Slider defaultValue={0} value={rcAmount} max={getCurrentRc} aria-label='slider-ex-6' onChange={(val:any) => setrcAmount(parseInt(val))}>
                
               <SliderTrack>
                 <SliderFilledTrack />
               </SliderTrack>
               <SliderThumb />
             </Slider>
            
            
             
              {/* <input type="range" id="vol" name="vol" min="0" max="50"> */}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onCloseDRC}>
              Close
            </Button> */}
            <Button onClick={submitDelegateRC} isDisabled={getCurrentRc <rcAmount? true:false} colorScheme='teal'>Delegate RC Now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default DelegateRCModal