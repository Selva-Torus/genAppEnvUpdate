
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

const Progressself_rating_progress = ({encryptionFlagCompData, isDynamic, index, item,setIsProcessing,controlData}:any) => { 
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
  /////////////
  //another screen
  const {new_access_groupfa034, setnew_access_groupfa034}= useContext(TotalContext) as TotalContextProps;  
  const {new_access_groupfa034Props, setnew_access_groupfa034Props}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupdb1de, setaccess_req__groupdb1de}= useContext(TotalContext) as TotalContextProps;  
  const {access_req__groupdb1deProps, setaccess_req__groupdb1deProps}= useContext(TotalContext) as TotalContextProps;  
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps;  
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps;  
  const {ratingsd4b55, setratingsd4b55}= useContext(TotalContext) as TotalContextProps;  
  const {self_rating6206d, setself_rating6206d}= useContext(TotalContext) as TotalContextProps;  
  const {self_rating_progressa5470, setself_rating_progressa5470}= useContext(TotalContext) as TotalContextProps;  
  const {manager_rating43456, setmanager_rating43456}= useContext(TotalContext) as TotalContextProps;  
  const {manager_rating_progressa49aa, setmanager_rating_progressa49aa}= useContext(TotalContext) as TotalContextProps;  
  const {final_ratingf159a, setfinal_ratingf159a}= useContext(TotalContext) as TotalContextProps;  
  const {final_rating_progress70ee3, setfinal_rating_progress70ee3}= useContext(TotalContext) as TotalContextProps;  
  const {addt__group82d26, setaddt__group82d26}= useContext(TotalContext) as TotalContextProps;  
  const {addt__group82d26Props, setaddt__group82d26Props}= useContext(TotalContext) as TotalContextProps;  
  const {addt__dts_group7fd81, setaddt__dts_group7fd81}= useContext(TotalContext) as TotalContextProps;  
  const {addt__dts_group7fd81Props, setaddt__dts_group7fd81Props}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions31354, setdynamicactions31354}= useContext(TotalContext) as TotalContextProps;  
  const {dynamicactions31354Props, setdynamicactions31354Props}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "c530a54cd8b0854580e4ae72117b4569",
        "0241cd2b00db4ce99638e70fb4ca5470"
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
        codeStates['new_access_group'] = new_access_groupfa034,
        codeStates['setnew_access_group'] = setnew_access_groupfa034,
        codeStates['new_access_groupfa034'] = new_access_groupfa034Props,
        codeStates['setnew_access_groupfa034'] = setnew_access_groupfa034Props,
        codeStates['access_req__group'] = access_req__groupdb1de,
        codeStates['setaccess_req__group'] = setaccess_req__groupdb1de,
        codeStates['access_req__groupdb1de'] = access_req__groupdb1deProps,
        codeStates['setaccess_req__groupdb1de'] = setaccess_req__groupdb1deProps,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
        codeStates['ratings'] = ratingsd4b55,
        codeStates['setratings'] = setratingsd4b55,
        codeStates['self_rating'] = self_rating6206d,
        codeStates['setself_rating'] = setself_rating6206d,
        codeStates['self_rating_progress'] = self_rating_progressa5470,
        codeStates['setself_rating_progress'] = setself_rating_progressa5470,
        codeStates['manager_rating'] = manager_rating43456,
        codeStates['setmanager_rating'] = setmanager_rating43456,
        codeStates['manager_rating_progress'] = manager_rating_progressa49aa,
        codeStates['setmanager_rating_progress'] = setmanager_rating_progressa49aa,
        codeStates['final_rating'] = final_ratingf159a,
        codeStates['setfinal_rating'] = setfinal_ratingf159a,
        codeStates['final_rating_progress'] = final_rating_progress70ee3,
        codeStates['setfinal_rating_progress'] = setfinal_rating_progress70ee3,
        codeStates['addt__group'] = addt__group82d26,
        codeStates['setaddt__group'] = setaddt__group82d26,
        codeStates['addt__group82d26'] = addt__group82d26Props,
        codeStates['setaddt__group82d26'] = setaddt__group82d26Props,
        codeStates['addt__dts_group'] = addt__dts_group7fd81,
        codeStates['setaddt__dts_group'] = setaddt__dts_group7fd81,
        codeStates['addt__dts_group7fd81'] = addt__dts_group7fd81Props,
        codeStates['setaddt__dts_group7fd81'] = setaddt__dts_group7fd81Props,
        codeStates['dynamicactions'] = dynamicactions31354,
        codeStates['setdynamicactions'] = setdynamicactions31354,
        codeStates['dynamicactions31354'] = dynamicactions31354Props,
        codeStates['setdynamicactions31354'] = setdynamicactions31354Props,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[self_rating_progressa5470?.refresh])

  if (self_rating_progressa5470?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `7 / 24`,gridRow: `8 / 15`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className="!rounded-xl"
        theme = {'info'}
        value = {70}
    />
  </div>
  )
}

export default Progressself_rating_progress
