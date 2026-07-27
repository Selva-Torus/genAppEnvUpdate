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

const TextInputcertification_id = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:certifyJson:AFVK:v1|dcf2ab0ce86249d59782805341cb8b09|properties.certifications_json.items.properties.certification_id"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1|981857295fec44a6a863f123e83c7d06|aafc95a55e384a2aa9d22765fda70e9e"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:certifyJson:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "text",
    "x-expression": "c ->> 'certification_id'"
  }
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_certifyjson_v1Props, setdfd_certifyjson_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'certification_id',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {certificationc7d06_0, setcertificationc7d06_0}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_0Props, setcertificationc7d06_0Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_1, setcertificationc7d06_1}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_1Props, setcertificationc7d06_1Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_2, setcertificationc7d06_2}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_2Props, setcertificationc7d06_2Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_3, setcertificationc7d06_3}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_3Props, setcertificationc7d06_3Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_4, setcertificationc7d06_4}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_4Props, setcertificationc7d06_4Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_5, setcertificationc7d06_5}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_5Props, setcertificationc7d06_5Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_6, setcertificationc7d06_6}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_6Props, setcertificationc7d06_6Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_7, setcertificationc7d06_7}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_7Props, setcertificationc7d06_7Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_8, setcertificationc7d06_8}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_8Props, setcertificationc7d06_8Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_9, setcertificationc7d06_9}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_9Props, setcertificationc7d06_9Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_10, setcertificationc7d06_10}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_10Props, setcertificationc7d06_10Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_11, setcertificationc7d06_11}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_11Props, setcertificationc7d06_11Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_12, setcertificationc7d06_12}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_12Props, setcertificationc7d06_12Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_13, setcertificationc7d06_13}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_13Props, setcertificationc7d06_13Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_14, setcertificationc7d06_14}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06_14Props, setcertificationc7d06_14Props}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_group42d78, setnew_employee_group42d78}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_group42d78Props, setnew_employee_group42d78Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358, setdynamicactionsa8358}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358Props, setdynamicactionsa8358Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fd, setbasic_details_groupd39fd}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fdProps, setbasic_details_groupd39fdProps}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911, setcontact_details_groupa1911}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911Props, setcontact_details_groupa1911Props}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4, setaddress_details_groupb72f4}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4Props, setaddress_details_groupb72f4Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6fe, setidentity_details_group6a6fe}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6feProps, setidentity_details_group6a6feProps}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6, setemployment_details_group89cd6}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6Props, setemployment_details_group89cd6Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1, setcompensation_details_groupf9ef1}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1Props, setcompensation_details_groupf9ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cd, setbank_details820cd}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cdProps, setbank_details820cdProps}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988, setemergency_contact_group73988}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988Props, setemergency_contact_group73988Props}= useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupcb53a, setskills_education_groupcb53a}= useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupcb53aProps, setskills_education_groupcb53aProps}= useContext(TotalContext) as TotalContextProps;
  const {skills_group36679, setskills_group36679}= useContext(TotalContext) as TotalContextProps;
  const {skills_group36679Props, setskills_group36679Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a, setskill9f89a}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89aProps, setskill9f89aProps}= useContext(TotalContext) as TotalContextProps;
  const {education_group70757, seteducation_group70757}= useContext(TotalContext) as TotalContextProps;
  const {education_group70757Props, seteducation_group70757Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a, seteducation2393a}= useContext(TotalContext) as TotalContextProps;
  const {education2393aProps, seteducation2393aProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63, setcert_groupedb63}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63Props, setcert_groupedb63Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06, setcertificationc7d06}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06Props, setcertificationc7d06Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_name26561, setcertification_name26561}= useContext(TotalContext) as TotalContextProps;
  const {certification_provider33172, setcertification_provider33172}= useContext(TotalContext) as TotalContextProps;
  const {certification_id70e9e, setcertification_id70e9e}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7, setfamily_detail_group800b7}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7Props, setfamily_detail_group800b7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,certification_id:undefined}}));
    if(dynamicStateandType.type=="number"){
    setcertificationc7d06_5((prev: any) => ({ ...prev, certification_id: +e.target.value }));
    }
    else{
    setcertificationc7d06_5((prev: any) => ({ ...prev, certification_id: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['certificationc7'] = certificationc7d06_0,
        codeStates['setcertificationc7'] = setcertificationc7d06_0,
        codeStates['certificationc7d06_0'] = certificationc7d06_0Props,
        codeStates['setcertificationc7d06_0'] = setcertificationc7d06_0Props,
        codeStates['certificationc7'] = certificationc7d06_1,
        codeStates['setcertificationc7'] = setcertificationc7d06_1,
        codeStates['certificationc7d06_1'] = certificationc7d06_1Props,
        codeStates['setcertificationc7d06_1'] = setcertificationc7d06_1Props,
        codeStates['certificationc7'] = certificationc7d06_2,
        codeStates['setcertificationc7'] = setcertificationc7d06_2,
        codeStates['certificationc7d06_2'] = certificationc7d06_2Props,
        codeStates['setcertificationc7d06_2'] = setcertificationc7d06_2Props,
        codeStates['certificationc7'] = certificationc7d06_3,
        codeStates['setcertificationc7'] = setcertificationc7d06_3,
        codeStates['certificationc7d06_3'] = certificationc7d06_3Props,
        codeStates['setcertificationc7d06_3'] = setcertificationc7d06_3Props,
        codeStates['certificationc7'] = certificationc7d06_4,
        codeStates['setcertificationc7'] = setcertificationc7d06_4,
        codeStates['certificationc7d06_4'] = certificationc7d06_4Props,
        codeStates['setcertificationc7d06_4'] = setcertificationc7d06_4Props,
        codeStates['certificationc7'] = certificationc7d06_5,
        codeStates['setcertificationc7'] = setcertificationc7d06_5,
        codeStates['certificationc7d06_5'] = certificationc7d06_5Props,
        codeStates['setcertificationc7d06_5'] = setcertificationc7d06_5Props,
        codeStates['certificationc7'] = certificationc7d06_6,
        codeStates['setcertificationc7'] = setcertificationc7d06_6,
        codeStates['certificationc7d06_6'] = certificationc7d06_6Props,
        codeStates['setcertificationc7d06_6'] = setcertificationc7d06_6Props,
        codeStates['certificationc7'] = certificationc7d06_7,
        codeStates['setcertificationc7'] = setcertificationc7d06_7,
        codeStates['certificationc7d06_7'] = certificationc7d06_7Props,
        codeStates['setcertificationc7d06_7'] = setcertificationc7d06_7Props,
        codeStates['certificationc7'] = certificationc7d06_8,
        codeStates['setcertificationc7'] = setcertificationc7d06_8,
        codeStates['certificationc7d06_8'] = certificationc7d06_8Props,
        codeStates['setcertificationc7d06_8'] = setcertificationc7d06_8Props,
        codeStates['certificationc7'] = certificationc7d06_9,
        codeStates['setcertificationc7'] = setcertificationc7d06_9,
        codeStates['certificationc7d06_9'] = certificationc7d06_9Props,
        codeStates['setcertificationc7d06_9'] = setcertificationc7d06_9Props,
        codeStates['certificationc7d'] = certificationc7d06_10,
        codeStates['setcertificationc7d'] = setcertificationc7d06_10,
        codeStates['certificationc7d06_10'] = certificationc7d06_10Props,
        codeStates['setcertificationc7d06_10'] = setcertificationc7d06_10Props,
        codeStates['certificationc7d'] = certificationc7d06_11,
        codeStates['setcertificationc7d'] = setcertificationc7d06_11,
        codeStates['certificationc7d06_11'] = certificationc7d06_11Props,
        codeStates['setcertificationc7d06_11'] = setcertificationc7d06_11Props,
        codeStates['certificationc7d'] = certificationc7d06_12,
        codeStates['setcertificationc7d'] = setcertificationc7d06_12,
        codeStates['certificationc7d06_12'] = certificationc7d06_12Props,
        codeStates['setcertificationc7d06_12'] = setcertificationc7d06_12Props,
        codeStates['certificationc7d'] = certificationc7d06_13,
        codeStates['setcertificationc7d'] = setcertificationc7d06_13,
        codeStates['certificationc7d06_13'] = certificationc7d06_13Props,
        codeStates['setcertificationc7d06_13'] = setcertificationc7d06_13Props,
        codeStates['certificationc7d'] = certificationc7d06_14,
        codeStates['setcertificationc7d'] = setcertificationc7d06_14,
        codeStates['certificationc7d06_14'] = certificationc7d06_14Props,
        codeStates['setcertificationc7d06_14'] = setcertificationc7d06_14Props,
        codeStates['new_employee_group'] = new_employee_group42d78,
        codeStates['setnew_employee_group'] = setnew_employee_group42d78,
        codeStates['new_employee_group42d78'] = new_employee_group42d78Props,
        codeStates['setnew_employee_group42d78'] = setnew_employee_group42d78Props,
        codeStates['dynamicactions'] = dynamicactionsa8358,
        codeStates['setdynamicactions'] = setdynamicactionsa8358,
        codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
        codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
        codeStates['basic_details_group'] = basic_details_groupd39fd,
        codeStates['setbasic_details_group'] = setbasic_details_groupd39fd,
        codeStates['basic_details_groupd39fd'] = basic_details_groupd39fdProps,
        codeStates['setbasic_details_groupd39fd'] = setbasic_details_groupd39fdProps,
        codeStates['contact_details_group'] = contact_details_groupa1911,
        codeStates['setcontact_details_group'] = setcontact_details_groupa1911,
        codeStates['contact_details_groupa1911'] = contact_details_groupa1911Props,
        codeStates['setcontact_details_groupa1911'] = setcontact_details_groupa1911Props,
        codeStates['address_details_group'] = address_details_groupb72f4,
        codeStates['setaddress_details_group'] = setaddress_details_groupb72f4,
        codeStates['address_details_groupb72f4'] = address_details_groupb72f4Props,
        codeStates['setaddress_details_groupb72f4'] = setaddress_details_groupb72f4Props,
        codeStates['identity_details_group'] = identity_details_group6a6fe,
        codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
        codeStates['identity_details_group6a6fe'] = identity_details_group6a6feProps,
        codeStates['setidentity_details_group6a6fe'] = setidentity_details_group6a6feProps,
        codeStates['employment_details_group'] = employment_details_group89cd6,
        codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
        codeStates['employment_details_group89cd6'] = employment_details_group89cd6Props,
        codeStates['setemployment_details_group89cd6'] = setemployment_details_group89cd6Props,
        codeStates['compensation_details_group'] = compensation_details_groupf9ef1,
        codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
        codeStates['compensation_details_groupf9ef1'] = compensation_details_groupf9ef1Props,
        codeStates['setcompensation_details_groupf9ef1'] = setcompensation_details_groupf9ef1Props,
        codeStates['bank_details'] = bank_details820cd,
        codeStates['setbank_details'] = setbank_details820cd,
        codeStates['bank_details820cd'] = bank_details820cdProps,
        codeStates['setbank_details820cd'] = setbank_details820cdProps,
        codeStates['emergency_contact_group'] = emergency_contact_group73988,
        codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
        codeStates['emergency_contact_group73988'] = emergency_contact_group73988Props,
        codeStates['setemergency_contact_group73988'] = setemergency_contact_group73988Props,
        codeStates['skills_education_group'] = skills_education_groupcb53a,
        codeStates['setskills_education_group'] = setskills_education_groupcb53a,
        codeStates['skills_education_groupcb53a'] = skills_education_groupcb53aProps,
        codeStates['setskills_education_groupcb53a'] = setskills_education_groupcb53aProps,
        codeStates['skills_group'] = skills_group36679,
        codeStates['setskills_group'] = setskills_group36679,
        codeStates['skills_group36679'] = skills_group36679Props,
        codeStates['setskills_group36679'] = setskills_group36679Props,
        codeStates['skill'] = skill9f89a,
        codeStates['setskill'] = setskill9f89a,
        codeStates['skill9f89a'] = skill9f89aProps,
        codeStates['setskill9f89a'] = setskill9f89aProps,
        codeStates['education_group'] = education_group70757,
        codeStates['seteducation_group'] = seteducation_group70757,
        codeStates['education_group70757'] = education_group70757Props,
        codeStates['seteducation_group70757'] = seteducation_group70757Props,
        codeStates['education'] = education2393a,
        codeStates['seteducation'] = seteducation2393a,
        codeStates['education2393a'] = education2393aProps,
        codeStates['seteducation2393a'] = seteducation2393aProps,
        codeStates['cert_group'] = cert_groupedb63,
        codeStates['setcert_group'] = setcert_groupedb63,
        codeStates['cert_groupedb63'] = cert_groupedb63Props,
        codeStates['setcert_groupedb63'] = setcert_groupedb63Props,
        codeStates['certification'] = certificationc7d06,
        codeStates['setcertification'] = setcertificationc7d06,
        codeStates['certificationc7d06'] = certificationc7d06Props,
        codeStates['setcertificationc7d06'] = setcertificationc7d06Props,
        codeStates['certification_name'] = certification_name26561,
        codeStates['setcertification_name'] = setcertification_name26561,
        codeStates['certification_provider'] = certification_provider33172,
        codeStates['setcertification_provider'] = setcertification_provider33172,
        codeStates['certification_id'] = certification_id70e9e,
        codeStates['setcertification_id'] = setcertification_id70e9e,
        codeStates['family_detail_group'] = family_detail_group800b7,
        codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
        codeStates['family_detail_group800b7'] = family_detail_group800b7Props,
        codeStates['setfamily_detail_group800b7'] = setfamily_detail_group800b7Props,
        codeStates['famly_details'] = famly_detailsb06ea,
        codeStates['setfamly_details'] = setfamly_detailsb06ea,
        codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
        codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,
        codeStates['certification_0'] = certificationc7d06_0,
        codeStates['setcertification_0'] = setcertificationc7d06_0,
        codeStates['certification_1'] = certificationc7d06_1,
        codeStates['setcertification_1'] = setcertificationc7d06_1,
        codeStates['certification_2'] = certificationc7d06_2,
        codeStates['setcertification_2'] = setcertificationc7d06_2,
        codeStates['certification_3'] = certificationc7d06_3,
        codeStates['setcertification_3'] = setcertificationc7d06_3,
        codeStates['certification_4'] = certificationc7d06_4,
        codeStates['setcertification_4'] = setcertificationc7d06_4,
        codeStates['certification_5'] = certificationc7d06_5,
        codeStates['setcertification_5'] = setcertificationc7d06_5,
        codeStates['certification_6'] = certificationc7d06_6,
        codeStates['setcertification_6'] = setcertificationc7d06_6,
        codeStates['certification_7'] = certificationc7d06_7,
        codeStates['setcertification_7'] = setcertificationc7d06_7,
        codeStates['certification_8'] = certificationc7d06_8,
        codeStates['setcertification_8'] = setcertificationc7d06_8,
        codeStates['certification_9'] = certificationc7d06_9,
        codeStates['setcertification_9'] = setcertificationc7d06_9,
        codeStates['certification_10'] = certificationc7d06_10,
        codeStates['setcertification_10'] = setcertificationc7d06_10,
        codeStates['certification_11'] = certificationc7d06_11,
        codeStates['setcertification_11'] = setcertificationc7d06_11,
        codeStates['certification_12'] = certificationc7d06_12,
        codeStates['setcertification_12'] = setcertificationc7d06_12,
        codeStates['certification_13'] = certificationc7d06_13,
        codeStates['setcertification_13'] = setcertificationc7d06_13,
        codeStates['certification_14'] = certificationc7d06_14,
        codeStates['setcertification_14'] = setcertificationc7d06_14,
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
        "981857295fec44a6a863f123e83c7d06",
        "aafc95a55e384a2aa9d22765fda70e9e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1",
      //     componentId: "981857295fec44a6a863f123e83c7d06",
      //     controlId: "aafc95a55e384a2aa9d22765fda70e9e",
      //     isTable: false,
      //     from:"TextInputcertification_id",
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
        setDynamicStateandType({name:'certification_id', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'certification_id',type:'text'};
      //   type={
      //     name:'certification_id',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.certification_id.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.certification_id.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.certification_id.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'certification_id',type:'text'};
      //   type={
      //     name:'certification_id',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.certification_id.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.certification_id.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.certification_id.type
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
  const certificationc7d06_5Ref = useRef<any>(certificationc7d06_5);
  useEffect(() => { certificationc7d06_5Ref.current = certificationc7d06_5; }, [certificationc7d06_5]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "aafc95a55e384a2aa9d22765fda70e9e") {
        handleChange({target:{value:certificationc7d06_5Ref?.current?.certification_id||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "aafc95a55e384a2aa9d22765fda70e9e") {
        handleBlur({target:{value:certificationc7d06_5Ref?.current?.certification_id||""}});
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
      setcertificationc7d06_5((pre:any)=>({...pre,certification_id:dfd_certifyjson_v1Props.data[0]?.certification_id}));
    }
  }
  },[dfd_certifyjson_v1Props?.setSearchFilters])
  if (certification_id70e9e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `1 / 15`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={certificationc7d06_5?.certification_id||""}
         disabled= {certification_id70e9e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='AWS-123456'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Certification ID"
      errorMessage={error}
        validationState={validate?.newEmployees_v1?.certification_id ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcertification_id
