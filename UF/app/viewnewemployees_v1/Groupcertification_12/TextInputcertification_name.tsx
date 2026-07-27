'use client'




import React, { useState,useContext,useEffect, useRef } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const TextInputcertification_name = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allState:any = useContext(TotalContext) as TotalContextProps
  const actionDetails : any = {
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:certifyJson:AFVK:v1|dcf2ab0ce86249d59782805341cb8b09|properties.certifications_json.items.properties.certification_name"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1|4b33772a57a21ae60ade6f0e5dd02740|731a89929c4aaa1c3a57ef9b565a8b69"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:certifyJson:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "text",
    "x-expression": "c ->> 'certification_name'"
  }
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certifyjson_v1Props, setdfd_certifyjson_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'certification_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {certification02740_0, setcertification02740_0}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_0Props, setcertification02740_0Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_1, setcertification02740_1}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_1Props, setcertification02740_1Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_2, setcertification02740_2}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_2Props, setcertification02740_2Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_3, setcertification02740_3}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_3Props, setcertification02740_3Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_4, setcertification02740_4}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_4Props, setcertification02740_4Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_5, setcertification02740_5}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_5Props, setcertification02740_5Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_6, setcertification02740_6}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_6Props, setcertification02740_6Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_7, setcertification02740_7}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_7Props, setcertification02740_7Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_8, setcertification02740_8}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_8Props, setcertification02740_8Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_9, setcertification02740_9}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_9Props, setcertification02740_9Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_10, setcertification02740_10}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_10Props, setcertification02740_10Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_11, setcertification02740_11}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_11Props, setcertification02740_11Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_12, setcertification02740_12}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_12Props, setcertification02740_12Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_13, setcertification02740_13}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_13Props, setcertification02740_13Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_14, setcertification02740_14}= useContext(TotalContext) as TotalContextProps;
  const {certification02740_14Props, setcertification02740_14Props}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_groupdf01f, setnew_employee_groupdf01f}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_groupdf01fProps, setnew_employee_groupdf01fProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupe03ea, setbasic_details_groupe03ea}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupe03eaProps, setbasic_details_groupe03eaProps}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_group3ff3d, setcontact_details_group3ff3d}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_group3ff3dProps, setcontact_details_group3ff3dProps}= useContext(TotalContext) as TotalContextProps;
  const {address_details_group75e08, setaddress_details_group75e08}= useContext(TotalContext) as TotalContextProps;
  const {address_details_group75e08Props, setaddress_details_group75e08Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group20918, setidentity_details_group20918}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group20918Props, setidentity_details_group20918Props}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group2c703, setemployment_details_group2c703}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group2c703Props, setemployment_details_group2c703Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_group83106, setcompensation_details_group83106}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_group83106Props, setcompensation_details_group83106Props}= useContext(TotalContext) as TotalContextProps;
  const {bank_detailsf21b7, setbank_detailsf21b7}= useContext(TotalContext) as TotalContextProps;
  const {bank_detailsf21b7Props, setbank_detailsf21b7Props}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_groupd1907, setemergency_contact_groupd1907}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_groupd1907Props, setemergency_contact_groupd1907Props}= useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupd1667, setskills_education_groupd1667}= useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupd1667Props, setskills_education_groupd1667Props}= useContext(TotalContext) as TotalContextProps;
  const {skills_group92cc8, setskills_group92cc8}= useContext(TotalContext) as TotalContextProps;
  const {skills_group92cc8Props, setskills_group92cc8Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba, setskilld0dba}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dbaProps, setskilld0dbaProps}= useContext(TotalContext) as TotalContextProps;
  const {education_groupcd288, seteducation_groupcd288}= useContext(TotalContext) as TotalContextProps;
  const {education_groupcd288Props, seteducation_groupcd288Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7, seteducation28de7}= useContext(TotalContext) as TotalContextProps;
  const {education28de7Props, seteducation28de7Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_group3be86, setcert_group3be86}= useContext(TotalContext) as TotalContextProps;
  const {cert_group3be86Props, setcert_group3be86Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740, setcertification02740}= useContext(TotalContext) as TotalContextProps;
  const {certification02740Props, setcertification02740Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_namea8b69, setcertification_namea8b69}= useContext(TotalContext) as TotalContextProps;
  const {certification_provider427b4, setcertification_provider427b4}= useContext(TotalContext) as TotalContextProps;
  const {certification_ida2576, setcertification_ida2576}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group496b3, setfamily_detail_group496b3}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group496b3Props, setfamily_detail_group496b3Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8, setfamly_detailsb4eb8}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8Props, setfamly_detailsb4eb8Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
    function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans : any[] = [];
    let id : string = "";
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }
  const handleChange = async(e: any) => {
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,viewNewEmployees_v1:{...pre?.viewNewEmployees_v1,certification_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcertification02740_12((prev: any) => ({ ...prev, certification_name: +e.target.value }));
    }
    else{
    setcertification02740_12((prev: any) => ({ ...prev, certification_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['certification02'] = certification02740_0,
        codeStates['setcertification02'] = setcertification02740_0,
        codeStates['certification02740_0'] = certification02740_0Props,
        codeStates['setcertification02740_0'] = setcertification02740_0Props,
        codeStates['certification02'] = certification02740_1,
        codeStates['setcertification02'] = setcertification02740_1,
        codeStates['certification02740_1'] = certification02740_1Props,
        codeStates['setcertification02740_1'] = setcertification02740_1Props,
        codeStates['certification02'] = certification02740_2,
        codeStates['setcertification02'] = setcertification02740_2,
        codeStates['certification02740_2'] = certification02740_2Props,
        codeStates['setcertification02740_2'] = setcertification02740_2Props,
        codeStates['certification02'] = certification02740_3,
        codeStates['setcertification02'] = setcertification02740_3,
        codeStates['certification02740_3'] = certification02740_3Props,
        codeStates['setcertification02740_3'] = setcertification02740_3Props,
        codeStates['certification02'] = certification02740_4,
        codeStates['setcertification02'] = setcertification02740_4,
        codeStates['certification02740_4'] = certification02740_4Props,
        codeStates['setcertification02740_4'] = setcertification02740_4Props,
        codeStates['certification02'] = certification02740_5,
        codeStates['setcertification02'] = setcertification02740_5,
        codeStates['certification02740_5'] = certification02740_5Props,
        codeStates['setcertification02740_5'] = setcertification02740_5Props,
        codeStates['certification02'] = certification02740_6,
        codeStates['setcertification02'] = setcertification02740_6,
        codeStates['certification02740_6'] = certification02740_6Props,
        codeStates['setcertification02740_6'] = setcertification02740_6Props,
        codeStates['certification02'] = certification02740_7,
        codeStates['setcertification02'] = setcertification02740_7,
        codeStates['certification02740_7'] = certification02740_7Props,
        codeStates['setcertification02740_7'] = setcertification02740_7Props,
        codeStates['certification02'] = certification02740_8,
        codeStates['setcertification02'] = setcertification02740_8,
        codeStates['certification02740_8'] = certification02740_8Props,
        codeStates['setcertification02740_8'] = setcertification02740_8Props,
        codeStates['certification02'] = certification02740_9,
        codeStates['setcertification02'] = setcertification02740_9,
        codeStates['certification02740_9'] = certification02740_9Props,
        codeStates['setcertification02740_9'] = setcertification02740_9Props,
        codeStates['certification027'] = certification02740_10,
        codeStates['setcertification027'] = setcertification02740_10,
        codeStates['certification02740_10'] = certification02740_10Props,
        codeStates['setcertification02740_10'] = setcertification02740_10Props,
        codeStates['certification027'] = certification02740_11,
        codeStates['setcertification027'] = setcertification02740_11,
        codeStates['certification02740_11'] = certification02740_11Props,
        codeStates['setcertification02740_11'] = setcertification02740_11Props,
        codeStates['certification027'] = certification02740_12,
        codeStates['setcertification027'] = setcertification02740_12,
        codeStates['certification02740_12'] = certification02740_12Props,
        codeStates['setcertification02740_12'] = setcertification02740_12Props,
        codeStates['certification027'] = certification02740_13,
        codeStates['setcertification027'] = setcertification02740_13,
        codeStates['certification02740_13'] = certification02740_13Props,
        codeStates['setcertification02740_13'] = setcertification02740_13Props,
        codeStates['certification027'] = certification02740_14,
        codeStates['setcertification027'] = setcertification02740_14,
        codeStates['certification02740_14'] = certification02740_14Props,
        codeStates['setcertification02740_14'] = setcertification02740_14Props,
        codeStates['new_employee_group'] = new_employee_groupdf01f,
        codeStates['setnew_employee_group'] = setnew_employee_groupdf01f,
        codeStates['new_employee_groupdf01f'] = new_employee_groupdf01fProps,
        codeStates['setnew_employee_groupdf01f'] = setnew_employee_groupdf01fProps,
        codeStates['basic_details_group'] = basic_details_groupe03ea,
        codeStates['setbasic_details_group'] = setbasic_details_groupe03ea,
        codeStates['basic_details_groupe03ea'] = basic_details_groupe03eaProps,
        codeStates['setbasic_details_groupe03ea'] = setbasic_details_groupe03eaProps,
        codeStates['contact_details_group'] = contact_details_group3ff3d,
        codeStates['setcontact_details_group'] = setcontact_details_group3ff3d,
        codeStates['contact_details_group3ff3d'] = contact_details_group3ff3dProps,
        codeStates['setcontact_details_group3ff3d'] = setcontact_details_group3ff3dProps,
        codeStates['address_details_group'] = address_details_group75e08,
        codeStates['setaddress_details_group'] = setaddress_details_group75e08,
        codeStates['address_details_group75e08'] = address_details_group75e08Props,
        codeStates['setaddress_details_group75e08'] = setaddress_details_group75e08Props,
        codeStates['identity_details_group'] = identity_details_group20918,
        codeStates['setidentity_details_group'] = setidentity_details_group20918,
        codeStates['identity_details_group20918'] = identity_details_group20918Props,
        codeStates['setidentity_details_group20918'] = setidentity_details_group20918Props,
        codeStates['employment_details_group'] = employment_details_group2c703,
        codeStates['setemployment_details_group'] = setemployment_details_group2c703,
        codeStates['employment_details_group2c703'] = employment_details_group2c703Props,
        codeStates['setemployment_details_group2c703'] = setemployment_details_group2c703Props,
        codeStates['compensation_details_group'] = compensation_details_group83106,
        codeStates['setcompensation_details_group'] = setcompensation_details_group83106,
        codeStates['compensation_details_group83106'] = compensation_details_group83106Props,
        codeStates['setcompensation_details_group83106'] = setcompensation_details_group83106Props,
        codeStates['bank_details'] = bank_detailsf21b7,
        codeStates['setbank_details'] = setbank_detailsf21b7,
        codeStates['bank_detailsf21b7'] = bank_detailsf21b7Props,
        codeStates['setbank_detailsf21b7'] = setbank_detailsf21b7Props,
        codeStates['emergency_contact_group'] = emergency_contact_groupd1907,
        codeStates['setemergency_contact_group'] = setemergency_contact_groupd1907,
        codeStates['emergency_contact_groupd1907'] = emergency_contact_groupd1907Props,
        codeStates['setemergency_contact_groupd1907'] = setemergency_contact_groupd1907Props,
        codeStates['skills_education_group'] = skills_education_groupd1667,
        codeStates['setskills_education_group'] = setskills_education_groupd1667,
        codeStates['skills_education_groupd1667'] = skills_education_groupd1667Props,
        codeStates['setskills_education_groupd1667'] = setskills_education_groupd1667Props,
        codeStates['skills_group'] = skills_group92cc8,
        codeStates['setskills_group'] = setskills_group92cc8,
        codeStates['skills_group92cc8'] = skills_group92cc8Props,
        codeStates['setskills_group92cc8'] = setskills_group92cc8Props,
        codeStates['skill'] = skilld0dba,
        codeStates['setskill'] = setskilld0dba,
        codeStates['skilld0dba'] = skilld0dbaProps,
        codeStates['setskilld0dba'] = setskilld0dbaProps,
        codeStates['education_group'] = education_groupcd288,
        codeStates['seteducation_group'] = seteducation_groupcd288,
        codeStates['education_groupcd288'] = education_groupcd288Props,
        codeStates['seteducation_groupcd288'] = seteducation_groupcd288Props,
        codeStates['education'] = education28de7,
        codeStates['seteducation'] = seteducation28de7,
        codeStates['education28de7'] = education28de7Props,
        codeStates['seteducation28de7'] = seteducation28de7Props,
        codeStates['cert_group'] = cert_group3be86,
        codeStates['setcert_group'] = setcert_group3be86,
        codeStates['cert_group3be86'] = cert_group3be86Props,
        codeStates['setcert_group3be86'] = setcert_group3be86Props,
        codeStates['certification'] = certification02740,
        codeStates['setcertification'] = setcertification02740,
        codeStates['certification02740'] = certification02740Props,
        codeStates['setcertification02740'] = setcertification02740Props,
        codeStates['certification_name'] = certification_namea8b69,
        codeStates['setcertification_name'] = setcertification_namea8b69,
        codeStates['certification_provider'] = certification_provider427b4,
        codeStates['setcertification_provider'] = setcertification_provider427b4,
        codeStates['certification_id'] = certification_ida2576,
        codeStates['setcertification_id'] = setcertification_ida2576,
        codeStates['family_detail_group'] = family_detail_group496b3,
        codeStates['setfamily_detail_group'] = setfamily_detail_group496b3,
        codeStates['family_detail_group496b3'] = family_detail_group496b3Props,
        codeStates['setfamily_detail_group496b3'] = setfamily_detail_group496b3Props,
        codeStates['famly_details'] = famly_detailsb4eb8,
        codeStates['setfamly_details'] = setfamly_detailsb4eb8,
        codeStates['famly_detailsb4eb8'] = famly_detailsb4eb8Props,
        codeStates['setfamly_detailsb4eb8'] = setfamly_detailsb4eb8Props,
        codeStates['certification_0'] = certification02740_0,
        codeStates['setcertification_0'] = setcertification02740_0,
        codeStates['certification_1'] = certification02740_1,
        codeStates['setcertification_1'] = setcertification02740_1,
        codeStates['certification_2'] = certification02740_2,
        codeStates['setcertification_2'] = setcertification02740_2,
        codeStates['certification_3'] = certification02740_3,
        codeStates['setcertification_3'] = setcertification02740_3,
        codeStates['certification_4'] = certification02740_4,
        codeStates['setcertification_4'] = setcertification02740_4,
        codeStates['certification_5'] = certification02740_5,
        codeStates['setcertification_5'] = setcertification02740_5,
        codeStates['certification_6'] = certification02740_6,
        codeStates['setcertification_6'] = setcertification02740_6,
        codeStates['certification_7'] = certification02740_7,
        codeStates['setcertification_7'] = setcertification02740_7,
        codeStates['certification_8'] = certification02740_8,
        codeStates['setcertification_8'] = setcertification02740_8,
        codeStates['certification_9'] = certification02740_9,
        codeStates['setcertification_9'] = setcertification02740_9,
        codeStates['certification_10'] = certification02740_10,
        codeStates['setcertification_10'] = setcertification02740_10,
        codeStates['certification_11'] = certification02740_11,
        codeStates['setcertification_11'] = setcertification02740_11,
        codeStates['certification_12'] = certification02740_12,
        codeStates['setcertification_12'] = setcertification02740_12,
        codeStates['certification_13'] = certification02740_13,
        codeStates['setcertification_13'] = setcertification02740_13,
        codeStates['certification_14'] = certification02740_14,
        codeStates['setcertification_14'] = setcertification02740_14,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleBlur=async (e?:any) => {
      let validate:any

    try{
      setIsProcessing(true);
        let copyFormhandlerData :any = {}

    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "4b33772a57a21ae60ade6f0e5dd02740",
        "731a89929c4aaa1c3a57ef9b565a8b69"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1",
      //     componentId: "4b33772a57a21ae60ade6f0e5dd02740",
      //     controlId: "731a89929c4aaa1c3a57ef9b565a8b69",
      //     isTable: false,
      //     from:"TextInputcertification_name",
      //     accessProfile:accessProfile
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      // if(orchestrationData?.data?.error == true){
       
      //   return
      // }
      setAllCode(orchestrationData?.data?.code);
      if (orchestrationData?.data?.dataType ==='integer' || orchestrationData?.data?.dataType ==='number') {
        setDynamicStateandType({name:'certification_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'certification_name',type:'text'};
      //   type={
      //     name:'certification_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.certification_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.certification_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.certification_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'certification_name',type:'text'};
      //   type={
      //     name:'certification_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.certification_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.certification_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.certification_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const certification02740_12Ref = useRef<any>(certification02740_12);
  useEffect(() => { certification02740_12Ref.current = certification02740_12; }, [certification02740_12]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "731a89929c4aaa1c3a57ef9b565a8b69") {
        handleChange({target:{value:certification02740_12Ref?.current?.certification_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "731a89929c4aaa1c3a57ef9b565a8b69") {
        handleBlur({target:{value:certification02740_12Ref?.current?.certification_name||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_certifyjson_v1Props?.setSearchFilters && dfd_certifyjson_v1Props?.data)
  {
    if(Array.isArray(dfd_certifyjson_v1Props.data) && dfd_certifyjson_v1Props.data.length > 0){
      setcertification02740_12((pre:any)=>({...pre,certification_name:dfd_certifyjson_v1Props.data[0]?.certification_name}));
    }
  }
  },[dfd_certifyjson_v1Props?.setSearchFilters])
  if (certification_namea8b69?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 9`,gridRow: `1 / 15`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={certification02740_12?.certification_name||""}
         disabled= {certification_namea8b69?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='AWS Certified Developer'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Certification Name"
      errorMessage={error}
        validationState={validate?.viewNewEmployees_v1?.certification_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcertification_name
