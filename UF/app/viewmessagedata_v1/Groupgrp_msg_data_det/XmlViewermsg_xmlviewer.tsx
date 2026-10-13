'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
//////////
import XMLViewer from '@/components/XMLViewer';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';


const XmlViewermsg_xmlviewer = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing}:any) => {  
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  const actionDetails :any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": [],
  "dfdKey": "undefined:"
}
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>(""); 
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'msg_xmlviewer',type:"text"});
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {grp_msg_daatab68d6, setgrp_msg_daatab68d6}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_daatab68d6Props, setgrp_msg_daatab68d6Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_data_det0b014, setgrp_msg_data_det0b014}= useContext(TotalContext) as TotalContextProps;
  const {grp_msg_data_det0b014Props, setgrp_msg_data_det0b014Props}= useContext(TotalContext) as TotalContextProps;
  const {hdr_infoed594, sethdr_infoed594}= useContext(TotalContext) as TotalContextProps;
  const {msg_xmlviewera94fb, setmsg_xmlviewera94fb}= useContext(TotalContext) as TotalContextProps;
  const {divider37feba, setdivider37feba}= useContext(TotalContext) as TotalContextProps;
  const {btn_okay0c912, setbtn_okay0c912}= useContext(TotalContext) as TotalContextProps;

  if (msg_xmlviewera94fb?.isHidden) {
    return <></>
  }
  
  return (   
    <div 
      style={{
        gridColumn: `1 / 25`,
        gridRow: `13 / 79`, 
        gap:``, 
        height: `100%`, 
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <XMLViewer
        className=""
        // label={keyset("")}
        data={grp_msg_data_det0b014?.msg_xmlviewer||""}
        
      />
    </div>
        
  )
}

export default XmlViewermsg_xmlviewer
