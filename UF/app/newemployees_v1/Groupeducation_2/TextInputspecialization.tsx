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

const TextInputspecialization = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:educationJson:AFVK:v1|172c23b4894e4d33a2784d2bd3e0c409|properties.education_history_json.items.properties.specialization"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1|5f0c193ec40a41e8af544856fd52393a|69d4edf7441d42bb9d6595e230ecd52e"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:educationJson:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "text",
    "x-expression": "ed ->> 'specialization'"
  }
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_educationjson_v1Props, setdfd_educationjson_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'specialization',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {education2393a_0, seteducation2393a_0}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_0Props, seteducation2393a_0Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_1, seteducation2393a_1}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_1Props, seteducation2393a_1Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_2, seteducation2393a_2}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_2Props, seteducation2393a_2Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_3, seteducation2393a_3}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_3Props, seteducation2393a_3Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_4, seteducation2393a_4}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_4Props, seteducation2393a_4Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_5, seteducation2393a_5}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_5Props, seteducation2393a_5Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_6, seteducation2393a_6}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_6Props, seteducation2393a_6Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_7, seteducation2393a_7}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_7Props, seteducation2393a_7Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_8, seteducation2393a_8}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_8Props, seteducation2393a_8Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_9, seteducation2393a_9}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_9Props, seteducation2393a_9Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_10, seteducation2393a_10}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_10Props, seteducation2393a_10Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_11, seteducation2393a_11}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_11Props, seteducation2393a_11Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_12, seteducation2393a_12}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_12Props, seteducation2393a_12Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_13, seteducation2393a_13}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_13Props, seteducation2393a_13Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_14, seteducation2393a_14}= useContext(TotalContext) as TotalContextProps;
  const {education2393a_14Props, seteducation2393a_14Props}= useContext(TotalContext) as TotalContextProps;
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
  const {degree0bb4f, setdegree0bb4f}= useContext(TotalContext) as TotalContextProps;
  const {specializationcd52e, setspecializationcd52e}= useContext(TotalContext) as TotalContextProps;
  const {institution_named7544, setinstitution_named7544}= useContext(TotalContext) as TotalContextProps;
  const {cgpadb57b, setcgpadb57b}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63, setcert_groupedb63}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63Props, setcert_groupedb63Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06, setcertificationc7d06}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06Props, setcertificationc7d06Props}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,specialization:undefined}}));
    if(dynamicStateandType.type=="number"){
    seteducation2393a_2((prev: any) => ({ ...prev, specialization: +e.target.value }));
    }
    else{
    seteducation2393a_2((prev: any) => ({ ...prev, specialization: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['education23'] = education2393a_0,
        codeStates['seteducation23'] = seteducation2393a_0,
        codeStates['education2393a_0'] = education2393a_0Props,
        codeStates['seteducation2393a_0'] = seteducation2393a_0Props,
        codeStates['education23'] = education2393a_1,
        codeStates['seteducation23'] = seteducation2393a_1,
        codeStates['education2393a_1'] = education2393a_1Props,
        codeStates['seteducation2393a_1'] = seteducation2393a_1Props,
        codeStates['education23'] = education2393a_2,
        codeStates['seteducation23'] = seteducation2393a_2,
        codeStates['education2393a_2'] = education2393a_2Props,
        codeStates['seteducation2393a_2'] = seteducation2393a_2Props,
        codeStates['education23'] = education2393a_3,
        codeStates['seteducation23'] = seteducation2393a_3,
        codeStates['education2393a_3'] = education2393a_3Props,
        codeStates['seteducation2393a_3'] = seteducation2393a_3Props,
        codeStates['education23'] = education2393a_4,
        codeStates['seteducation23'] = seteducation2393a_4,
        codeStates['education2393a_4'] = education2393a_4Props,
        codeStates['seteducation2393a_4'] = seteducation2393a_4Props,
        codeStates['education23'] = education2393a_5,
        codeStates['seteducation23'] = seteducation2393a_5,
        codeStates['education2393a_5'] = education2393a_5Props,
        codeStates['seteducation2393a_5'] = seteducation2393a_5Props,
        codeStates['education23'] = education2393a_6,
        codeStates['seteducation23'] = seteducation2393a_6,
        codeStates['education2393a_6'] = education2393a_6Props,
        codeStates['seteducation2393a_6'] = seteducation2393a_6Props,
        codeStates['education23'] = education2393a_7,
        codeStates['seteducation23'] = seteducation2393a_7,
        codeStates['education2393a_7'] = education2393a_7Props,
        codeStates['seteducation2393a_7'] = seteducation2393a_7Props,
        codeStates['education23'] = education2393a_8,
        codeStates['seteducation23'] = seteducation2393a_8,
        codeStates['education2393a_8'] = education2393a_8Props,
        codeStates['seteducation2393a_8'] = seteducation2393a_8Props,
        codeStates['education23'] = education2393a_9,
        codeStates['seteducation23'] = seteducation2393a_9,
        codeStates['education2393a_9'] = education2393a_9Props,
        codeStates['seteducation2393a_9'] = seteducation2393a_9Props,
        codeStates['education239'] = education2393a_10,
        codeStates['seteducation239'] = seteducation2393a_10,
        codeStates['education2393a_10'] = education2393a_10Props,
        codeStates['seteducation2393a_10'] = seteducation2393a_10Props,
        codeStates['education239'] = education2393a_11,
        codeStates['seteducation239'] = seteducation2393a_11,
        codeStates['education2393a_11'] = education2393a_11Props,
        codeStates['seteducation2393a_11'] = seteducation2393a_11Props,
        codeStates['education239'] = education2393a_12,
        codeStates['seteducation239'] = seteducation2393a_12,
        codeStates['education2393a_12'] = education2393a_12Props,
        codeStates['seteducation2393a_12'] = seteducation2393a_12Props,
        codeStates['education239'] = education2393a_13,
        codeStates['seteducation239'] = seteducation2393a_13,
        codeStates['education2393a_13'] = education2393a_13Props,
        codeStates['seteducation2393a_13'] = seteducation2393a_13Props,
        codeStates['education239'] = education2393a_14,
        codeStates['seteducation239'] = seteducation2393a_14,
        codeStates['education2393a_14'] = education2393a_14Props,
        codeStates['seteducation2393a_14'] = seteducation2393a_14Props,
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
        codeStates['degree'] = degree0bb4f,
        codeStates['setdegree'] = setdegree0bb4f,
        codeStates['specialization'] = specializationcd52e,
        codeStates['setspecialization'] = setspecializationcd52e,
        codeStates['institution_name'] = institution_named7544,
        codeStates['setinstitution_name'] = setinstitution_named7544,
        codeStates['cgpa'] = cgpadb57b,
        codeStates['setcgpa'] = setcgpadb57b,
        codeStates['cert_group'] = cert_groupedb63,
        codeStates['setcert_group'] = setcert_groupedb63,
        codeStates['cert_groupedb63'] = cert_groupedb63Props,
        codeStates['setcert_groupedb63'] = setcert_groupedb63Props,
        codeStates['certification'] = certificationc7d06,
        codeStates['setcertification'] = setcertificationc7d06,
        codeStates['certificationc7d06'] = certificationc7d06Props,
        codeStates['setcertificationc7d06'] = setcertificationc7d06Props,
        codeStates['family_detail_group'] = family_detail_group800b7,
        codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
        codeStates['family_detail_group800b7'] = family_detail_group800b7Props,
        codeStates['setfamily_detail_group800b7'] = setfamily_detail_group800b7Props,
        codeStates['famly_details'] = famly_detailsb06ea,
        codeStates['setfamly_details'] = setfamly_detailsb06ea,
        codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
        codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,
        codeStates['education_0'] = education2393a_0,
        codeStates['seteducation_0'] = seteducation2393a_0,
        codeStates['education_1'] = education2393a_1,
        codeStates['seteducation_1'] = seteducation2393a_1,
        codeStates['education_2'] = education2393a_2,
        codeStates['seteducation_2'] = seteducation2393a_2,
        codeStates['education_3'] = education2393a_3,
        codeStates['seteducation_3'] = seteducation2393a_3,
        codeStates['education_4'] = education2393a_4,
        codeStates['seteducation_4'] = seteducation2393a_4,
        codeStates['education_5'] = education2393a_5,
        codeStates['seteducation_5'] = seteducation2393a_5,
        codeStates['education_6'] = education2393a_6,
        codeStates['seteducation_6'] = seteducation2393a_6,
        codeStates['education_7'] = education2393a_7,
        codeStates['seteducation_7'] = seteducation2393a_7,
        codeStates['education_8'] = education2393a_8,
        codeStates['seteducation_8'] = seteducation2393a_8,
        codeStates['education_9'] = education2393a_9,
        codeStates['seteducation_9'] = seteducation2393a_9,
        codeStates['education_10'] = education2393a_10,
        codeStates['seteducation_10'] = seteducation2393a_10,
        codeStates['education_11'] = education2393a_11,
        codeStates['seteducation_11'] = seteducation2393a_11,
        codeStates['education_12'] = education2393a_12,
        codeStates['seteducation_12'] = seteducation2393a_12,
        codeStates['education_13'] = education2393a_13,
        codeStates['seteducation_13'] = seteducation2393a_13,
        codeStates['education_14'] = education2393a_14,
        codeStates['seteducation_14'] = seteducation2393a_14,
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
        "5f0c193ec40a41e8af544856fd52393a",
        "69d4edf7441d42bb9d6595e230ecd52e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1",
      //     componentId: "5f0c193ec40a41e8af544856fd52393a",
      //     controlId: "69d4edf7441d42bb9d6595e230ecd52e",
      //     isTable: false,
      //     from:"TextInputspecialization",
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
        setDynamicStateandType({name:'specialization', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'specialization',type:'text'};
      //   type={
      //     name:'specialization',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.specialization.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.specialization.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.specialization.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'specialization',type:'text'};
      //   type={
      //     name:'specialization',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.specialization.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.specialization.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.specialization.type
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
  const education2393a_2Ref = useRef<any>(education2393a_2);
  useEffect(() => { education2393a_2Ref.current = education2393a_2; }, [education2393a_2]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "69d4edf7441d42bb9d6595e230ecd52e") {
        handleChange({target:{value:education2393a_2Ref?.current?.specialization||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "69d4edf7441d42bb9d6595e230ecd52e") {
        handleBlur({target:{value:education2393a_2Ref?.current?.specialization||""}});
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
  if(dfd_educationjson_v1Props?.setSearchFilters && dfd_educationjson_v1Props?.data)
  {
    if(Array.isArray(dfd_educationjson_v1Props.data) && dfd_educationjson_v1Props.data.length > 0){
      seteducation2393a_2((pre:any)=>({...pre,specialization:dfd_educationjson_v1Props.data[0]?.specialization}));
    }
  }
  },[dfd_educationjson_v1Props?.setSearchFilters])
  if (specializationcd52e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `7 / 13`,gridRow: `1 / 13`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={education2393a_2?.specialization||""}
         disabled= {specializationcd52e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='Computer Science'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Specialization"
      errorMessage={error}
        validationState={validate?.newEmployees_v1?.specialization ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputspecialization
