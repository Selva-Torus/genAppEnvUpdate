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
      "targetKey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:AG001:AFGK:A001:AFK:Request_Screen_Offsite:AFVK:v1|4d39522ee30443598090fe9ac0c429cb|eac132e01f294da69ea2fb60153e603b"
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
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense39c39, setoffsite_expense39c39}= useContext(TotalContext) as TotalContextProps;
  const {claim_expense_type51f6e, setclaim_expense_type51f6e}= useContext(TotalContext) as TotalContextProps;
  const {expense_namebf755, setexpense_namebf755}= useContext(TotalContext) as TotalContextProps;
  const {from_date6f9c3, setfrom_date6f9c3}= useContext(TotalContext) as TotalContextProps;
  const {to_date6db82, setto_date6db82}= useContext(TotalContext) as TotalContextProps;
  const {claim_categorya4a14, setclaim_categorya4a14}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amounte603b, setcategory_total_amounte603b}= useContext(TotalContext) as TotalContextProps;
  const {attachmentc9c51, setattachmentc9c51}= useContext(TotalContext) as TotalContextProps;
  const {receipt_imageafe30, setreceipt_imageafe30}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {enableeff29, setenableeff29}= useContext(TotalContext) as TotalContextProps;
  const {is_comment_enabled5ca5f, setis_comment_enabled5ca5f}= useContext(TotalContext) as TotalContextProps;
  const {clear2b3e6, setclear2b3e6}= useContext(TotalContext) as TotalContextProps;
  const {add5cae4, setadd5cae4}= useContext(TotalContext) as TotalContextProps;
  const {claims_detail_tablef8143, setclaims_detail_tablef8143}= useContext(TotalContext) as TotalContextProps;
  const {claims_detail_tablef8143Props, setclaims_detail_tablef8143Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
  const handleChange = async(e: any) => {
     const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=``;
     if (code != '') {
      let codeStates: any = {};
      codeStates['request_offsite_group']  = {...request_offsite_group429cb,category_total_amount:newInputValue},
      codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
      codeStates['claims_detail_table']  = {...claims_detail_tablef8143,category_total_amount:newInputValue},
      codeStates['setclaims_detail_table'] = setclaims_detail_tablef8143,
    codeExecution(code,codeStates);
    }  
    setError('');
    setValidate((pre:any)=>({...pre,category_total_amount:undefined}));
    if(dynamicStateandType.type=="number"){
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, category_total_amount: +e.target.value }));
    }
    else{
    setrequest_offsite_group429cb((prev: any) => ({ ...prev, category_total_amount: e.target.value }));
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
      setrequest_offsite_group429cb((pre:any)=>({...pre,category_total_amount:dfd_claims_v1Props.data[0]?.category_total_amount}));
    }
  }
  },[dfd_claims_v1Props?.setSearchFilters])
  if (category_total_amounte603b?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `5 / 20`,gridRow: `87 / 105`, gap:``, height: `100%`, overflow: 'auto'}} >
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type={dynamicStateandType.type}
        value={request_offsite_group429cb?.category_total_amount||""}
         disabled= {category_total_amounte603b?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        readOnly={true}
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
