
'use client'
import React, {useEffect, useContext,useState } from 'react' 
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { Progress } from '@/components/Progress';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';

const Progressfinal_rating_progress = ({encryptionFlagCompData, isDynamic, index, item,setIsProcessing,controlData}:any) => { 
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
  /////////////
  //another screen
  const {new_access_groupc5a99, setnew_access_groupc5a99}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_groupc5a99Props, setnew_access_groupc5a99Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group002d0, setaccess_req__group002d0}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__group002d0Props, setaccess_req__group002d0Props}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group3a8ab, setvalid_group3a8ab}= useContext(TotalContext) as TotalContextProps;  
  const {valid_group3a8abProps, setvalid_group3a8abProps}= useContext(TotalContext) as TotalContextProps;  
  const {ratingsa108f, setratingsa108f}= useContext(TotalContext) as TotalContextProps;  
  const {self_ratingc8c53, setself_ratingc8c53}= useContext(TotalContext) as TotalContextProps;  
  const {self_rating_progressd31b7, setself_rating_progressd31b7}= useContext(TotalContext) as TotalContextProps;  
  const {manager_rating7a9e7, setmanager_rating7a9e7}= useContext(TotalContext) as TotalContextProps;  
  const {manager_rating_progress0b73b, setmanager_rating_progress0b73b}= useContext(TotalContext) as TotalContextProps;  
  const {final_ratingc093c, setfinal_ratingc093c}= useContext(TotalContext) as TotalContextProps;  
  const {final_rating_progressfca5f, setfinal_rating_progressfca5f}= useContext(TotalContext) as TotalContextProps;  
  const {addt__group6ba4f, setaddt__group6ba4f}= useContext(TotalContext) as TotalContextProps;  
  const {addt__group6ba4fProps, setaddt__group6ba4fProps}= useContext(TotalContext) as TotalContextProps;  
  const {addt__dts_group613d2, setaddt__dts_group613d2}= useContext(TotalContext) as TotalContextProps;  
  const {addt__dts_group613d2Props, setaddt__dts_group613d2Props}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsb315b, setdynamicactionsb315b}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactionsb315bProps, setdynamicactionsb315bProps}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "e81d77a7d98781c111b9d4b0b613a8ab",
        "c25119fd75add23b9a59a1457d1fca5f"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
    let temp:any=""
    handleCustomCode()
  }


  const handleCustomCode=async () => {
    let customCode:any=''
    let code :any = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupc5a99,
        codeStates['setnew_access_group'] = setnew_access_groupc5a99,
        codeStates['new_access_groupc5a99'] = new_access_groupc5a99Props,
        codeStates['setnew_access_groupc5a99'] = setnew_access_groupc5a99Props,
        codeStates['access_req__group'] = access_req__group002d0,
        codeStates['setaccess_req__group'] = setaccess_req__group002d0,
        codeStates['access_req__group002d0'] = access_req__group002d0Props,
        codeStates['setaccess_req__group002d0'] = setaccess_req__group002d0Props,
        codeStates['valid_group'] = valid_group3a8ab,
        codeStates['setvalid_group'] = setvalid_group3a8ab,
        codeStates['valid_group3a8ab'] = valid_group3a8abProps,
        codeStates['setvalid_group3a8ab'] = setvalid_group3a8abProps,
        codeStates['ratings'] = ratingsa108f,
        codeStates['setratings'] = setratingsa108f,
        codeStates['self_rating'] = self_ratingc8c53,
        codeStates['setself_rating'] = setself_ratingc8c53,
        codeStates['self_rating_progress'] = self_rating_progressd31b7,
        codeStates['setself_rating_progress'] = setself_rating_progressd31b7,
        codeStates['manager_rating'] = manager_rating7a9e7,
        codeStates['setmanager_rating'] = setmanager_rating7a9e7,
        codeStates['manager_rating_progress'] = manager_rating_progress0b73b,
        codeStates['setmanager_rating_progress'] = setmanager_rating_progress0b73b,
        codeStates['final_rating'] = final_ratingc093c,
        codeStates['setfinal_rating'] = setfinal_ratingc093c,
        codeStates['final_rating_progress'] = final_rating_progressfca5f,
        codeStates['setfinal_rating_progress'] = setfinal_rating_progressfca5f,
        codeStates['addt__group'] = addt__group6ba4f,
        codeStates['setaddt__group'] = setaddt__group6ba4f,
        codeStates['addt__group6ba4f'] = addt__group6ba4fProps,
        codeStates['setaddt__group6ba4f'] = setaddt__group6ba4fProps,
        codeStates['addt__dts_group'] = addt__dts_group613d2,
        codeStates['setaddt__dts_group'] = setaddt__dts_group613d2,
        codeStates['addt__dts_group613d2'] = addt__dts_group613d2Props,
        codeStates['setaddt__dts_group613d2'] = setaddt__dts_group613d2Props,
        codeStates['dynamicactions'] = dynamicactionsb315b,
        codeStates['setdynamicactions'] = setdynamicactionsb315b,
        codeStates['dynamicactionsb315b'] = dynamicactionsb315bProps,
        codeStates['setdynamicactionsb315b'] = setdynamicactionsb315bProps,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[final_rating_progressfca5f?.refresh])

  if (final_rating_progressfca5f?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `7 / 24`,gridRow: `24 / 31`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className=""
        theme = {'success'}
        value = {8}
    />
  </div>
  )
}

export default Progressfinal_rating_progress
