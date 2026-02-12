'use client'


import React, { useState,useContext,useEffect } from 'react';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { Modal } from "@/components/Modal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';

const TextInputcategory_total_amount = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const toast : Function =useInfoMsg()
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
  "mapper": [
    {
      "sourceKey": [
        "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:AG001:AFGK:A001:AFK:claims:AFVK:v1|d4d9550eca7f46129886b6c11168e6b5|items.properties.category_total_amount"
      ],
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Daily:AFVK:v1|483e1dce061b49cebe0c9e46b0844e40|5b2a0e15a449477ea364ef896739782f"
    }
  ],
  "schemaData": {
    "type": "string"
  }
}
  const {dfd_claims_v1Props, setdfd_claims_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const keyset:any=i18n.keyset("language"); 
  let schemaArray :string[] =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'category_total_amount',type:"text"})
  const routes : AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;

  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
  /////////////
   //another screen
  const {request_daily_group44e40, setrequest_daily_group44e40}= useContext(TotalContext) as TotalContextProps;
  const {request_daily_group44e40Props, setrequest_daily_group44e40Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expensefb8cc, setdaily_expensefb8cc}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type22d67, setclaim_expense_type22d67}= useContext(TotalContext) as TotalContextProps;
  const {expense_name5f562, setexpense_name5f562}= useContext(TotalContext) as TotalContextProps;
  const {expense_date5f45e, setexpense_date5f45e}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryc7c5e, setclaim_categoryc7c5e}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount9782f, setcategory_total_amount9782f}= useContext(TotalContext) as TotalContextProps;
  const {attachment04414, setattachment04414}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image6afe2, setreceipt_image6afe2}= useContext(TotalContext) as TotalContextProps;
  const {commentsf2394, setcommentsf2394}= useContext(TotalContext) as TotalContextProps;
  const {enabletextb4878, setenabletextb4878}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled7244d, setis_comment_enabled7244d}= useContext(TotalContext) as TotalContextProps;
  const {clear14ae7, setclear14ae7}= useContext(TotalContext) as TotalContextProps;
  const {saved507e, setsaved507e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
  const handleChange = async(e: any) => {
     const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=``;
     if (code != '') {
      let codeStates: any = {};
      codeStates['request_daily_group']  = {...request_daily_group44e40,category_total_amount:newInputValue},
      codeStates['setrequest_daily_group'] = setrequest_daily_group44e40,
    codeExecution(code,codeStates);
    }  
    setError('');
    setValidate((pre:any)=>({...pre,category_total_amount:undefined}));
    if(dynamicStateandType.type=="number"){
    setrequest_daily_group44e40((prev: any) => ({ ...prev, category_total_amount: +e.target.value }));
    }
    else{
    setrequest_daily_group44e40((prev: any) => ({ ...prev, category_total_amount: e.target.value }));
    }
  }
  const handleBlur=async () => {
    
  }

  useEffect(()=>{
      handleBlur();
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_claims_v1Props?.setSearchFilters && dfd_claims_v1Props?.data)
  {
    if(Array.isArray(dfd_claims_v1Props.data) && dfd_claims_v1Props.data.length > 0){
      setrequest_daily_group44e40((pre:any)=>({...pre,category_total_amount:dfd_claims_v1Props.data[0]?.category_total_amount}));
    }
  }
  },[dfd_claims_v1Props?.setSearchFilters])
  if (category_total_amount9782f?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `5 / 20`,gridRow: `79 / 95`, gap:``, height: `100%`, overflow: 'auto'}} >
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={request_daily_group44e40?.category_total_amount||""}
         disabled= {category_total_amount9782f?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Amount"
        validationState={validate?.category_total_amount ? "invalid" : undefined}
        errorMessage={error}
      />
    </div> 
  )
}

export default TextInputcategory_total_amount
