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

const TextInputyears_of_experience = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:skillJson:AFVK:v1|f2a01cd22fda4fcdae3e61b66777a17d|properties.skills_json.items.properties.years_of_experience"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1|7cba9e840637995c1112c096726d0dba|f8766ff22fac8201778f4a086a35d72c"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:skillJson:AFVK:v1:",
  "dataType": "number"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_skilljson_v1Props, setdfd_skilljson_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'years_of_experience',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {skilld0dba_0, setskilld0dba_0}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_0Props, setskilld0dba_0Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_1, setskilld0dba_1}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_1Props, setskilld0dba_1Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_2, setskilld0dba_2}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_2Props, setskilld0dba_2Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_3, setskilld0dba_3}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_3Props, setskilld0dba_3Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_4, setskilld0dba_4}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_4Props, setskilld0dba_4Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_5, setskilld0dba_5}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_5Props, setskilld0dba_5Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_6, setskilld0dba_6}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_6Props, setskilld0dba_6Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_7, setskilld0dba_7}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_7Props, setskilld0dba_7Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_8, setskilld0dba_8}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_8Props, setskilld0dba_8Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_9, setskilld0dba_9}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_9Props, setskilld0dba_9Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_10, setskilld0dba_10}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_10Props, setskilld0dba_10Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_11, setskilld0dba_11}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_11Props, setskilld0dba_11Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_12, setskilld0dba_12}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_12Props, setskilld0dba_12Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_13, setskilld0dba_13}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_13Props, setskilld0dba_13Props}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_14, setskilld0dba_14}= useContext(TotalContext) as TotalContextProps;
  const {skilld0dba_14Props, setskilld0dba_14Props}= useContext(TotalContext) as TotalContextProps;
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
  const {skill_name649e5, setskill_name649e5}= useContext(TotalContext) as TotalContextProps;
  const {skill_category7ff29, setskill_category7ff29}= useContext(TotalContext) as TotalContextProps;
  const {proficiency_levelf783d, setproficiency_levelf783d}= useContext(TotalContext) as TotalContextProps;
  const {years_of_experience5d72c, setyears_of_experience5d72c}= useContext(TotalContext) as TotalContextProps;
  const {education_groupcd288, seteducation_groupcd288}= useContext(TotalContext) as TotalContextProps;
  const {education_groupcd288Props, seteducation_groupcd288Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7, seteducation28de7}= useContext(TotalContext) as TotalContextProps;
  const {education28de7Props, seteducation28de7Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_group3be86, setcert_group3be86}= useContext(TotalContext) as TotalContextProps;
  const {cert_group3be86Props, setcert_group3be86Props}= useContext(TotalContext) as TotalContextProps;
  const {certification02740, setcertification02740}= useContext(TotalContext) as TotalContextProps;
  const {certification02740Props, setcertification02740Props}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,viewNewEmployees_v1:{...pre?.viewNewEmployees_v1,years_of_experience:undefined}}));
    if(dynamicStateandType.type=="number"){
    setskilld0dba_10((prev: any) => ({ ...prev, years_of_experience: +e.target.value }));
    }
    else{
    setskilld0dba_10((prev: any) => ({ ...prev, years_of_experience: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['skilld0'] = skilld0dba_0,
        codeStates['setskilld0'] = setskilld0dba_0,
        codeStates['skilld0dba_0'] = skilld0dba_0Props,
        codeStates['setskilld0dba_0'] = setskilld0dba_0Props,
        codeStates['skilld0'] = skilld0dba_1,
        codeStates['setskilld0'] = setskilld0dba_1,
        codeStates['skilld0dba_1'] = skilld0dba_1Props,
        codeStates['setskilld0dba_1'] = setskilld0dba_1Props,
        codeStates['skilld0'] = skilld0dba_2,
        codeStates['setskilld0'] = setskilld0dba_2,
        codeStates['skilld0dba_2'] = skilld0dba_2Props,
        codeStates['setskilld0dba_2'] = setskilld0dba_2Props,
        codeStates['skilld0'] = skilld0dba_3,
        codeStates['setskilld0'] = setskilld0dba_3,
        codeStates['skilld0dba_3'] = skilld0dba_3Props,
        codeStates['setskilld0dba_3'] = setskilld0dba_3Props,
        codeStates['skilld0'] = skilld0dba_4,
        codeStates['setskilld0'] = setskilld0dba_4,
        codeStates['skilld0dba_4'] = skilld0dba_4Props,
        codeStates['setskilld0dba_4'] = setskilld0dba_4Props,
        codeStates['skilld0'] = skilld0dba_5,
        codeStates['setskilld0'] = setskilld0dba_5,
        codeStates['skilld0dba_5'] = skilld0dba_5Props,
        codeStates['setskilld0dba_5'] = setskilld0dba_5Props,
        codeStates['skilld0'] = skilld0dba_6,
        codeStates['setskilld0'] = setskilld0dba_6,
        codeStates['skilld0dba_6'] = skilld0dba_6Props,
        codeStates['setskilld0dba_6'] = setskilld0dba_6Props,
        codeStates['skilld0'] = skilld0dba_7,
        codeStates['setskilld0'] = setskilld0dba_7,
        codeStates['skilld0dba_7'] = skilld0dba_7Props,
        codeStates['setskilld0dba_7'] = setskilld0dba_7Props,
        codeStates['skilld0'] = skilld0dba_8,
        codeStates['setskilld0'] = setskilld0dba_8,
        codeStates['skilld0dba_8'] = skilld0dba_8Props,
        codeStates['setskilld0dba_8'] = setskilld0dba_8Props,
        codeStates['skilld0'] = skilld0dba_9,
        codeStates['setskilld0'] = setskilld0dba_9,
        codeStates['skilld0dba_9'] = skilld0dba_9Props,
        codeStates['setskilld0dba_9'] = setskilld0dba_9Props,
        codeStates['skilld0d'] = skilld0dba_10,
        codeStates['setskilld0d'] = setskilld0dba_10,
        codeStates['skilld0dba_10'] = skilld0dba_10Props,
        codeStates['setskilld0dba_10'] = setskilld0dba_10Props,
        codeStates['skilld0d'] = skilld0dba_11,
        codeStates['setskilld0d'] = setskilld0dba_11,
        codeStates['skilld0dba_11'] = skilld0dba_11Props,
        codeStates['setskilld0dba_11'] = setskilld0dba_11Props,
        codeStates['skilld0d'] = skilld0dba_12,
        codeStates['setskilld0d'] = setskilld0dba_12,
        codeStates['skilld0dba_12'] = skilld0dba_12Props,
        codeStates['setskilld0dba_12'] = setskilld0dba_12Props,
        codeStates['skilld0d'] = skilld0dba_13,
        codeStates['setskilld0d'] = setskilld0dba_13,
        codeStates['skilld0dba_13'] = skilld0dba_13Props,
        codeStates['setskilld0dba_13'] = setskilld0dba_13Props,
        codeStates['skilld0d'] = skilld0dba_14,
        codeStates['setskilld0d'] = setskilld0dba_14,
        codeStates['skilld0dba_14'] = skilld0dba_14Props,
        codeStates['setskilld0dba_14'] = setskilld0dba_14Props,
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
        codeStates['skill_name'] = skill_name649e5,
        codeStates['setskill_name'] = setskill_name649e5,
        codeStates['skill_category'] = skill_category7ff29,
        codeStates['setskill_category'] = setskill_category7ff29,
        codeStates['proficiency_level'] = proficiency_levelf783d,
        codeStates['setproficiency_level'] = setproficiency_levelf783d,
        codeStates['years_of_experience'] = years_of_experience5d72c,
        codeStates['setyears_of_experience'] = setyears_of_experience5d72c,
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
        codeStates['family_detail_group'] = family_detail_group496b3,
        codeStates['setfamily_detail_group'] = setfamily_detail_group496b3,
        codeStates['family_detail_group496b3'] = family_detail_group496b3Props,
        codeStates['setfamily_detail_group496b3'] = setfamily_detail_group496b3Props,
        codeStates['famly_details'] = famly_detailsb4eb8,
        codeStates['setfamly_details'] = setfamly_detailsb4eb8,
        codeStates['famly_detailsb4eb8'] = famly_detailsb4eb8Props,
        codeStates['setfamly_detailsb4eb8'] = setfamly_detailsb4eb8Props,
        codeStates['skill_0'] = skilld0dba_0,
        codeStates['setskill_0'] = setskilld0dba_0,
        codeStates['skill_1'] = skilld0dba_1,
        codeStates['setskill_1'] = setskilld0dba_1,
        codeStates['skill_2'] = skilld0dba_2,
        codeStates['setskill_2'] = setskilld0dba_2,
        codeStates['skill_3'] = skilld0dba_3,
        codeStates['setskill_3'] = setskilld0dba_3,
        codeStates['skill_4'] = skilld0dba_4,
        codeStates['setskill_4'] = setskilld0dba_4,
        codeStates['skill_5'] = skilld0dba_5,
        codeStates['setskill_5'] = setskilld0dba_5,
        codeStates['skill_6'] = skilld0dba_6,
        codeStates['setskill_6'] = setskilld0dba_6,
        codeStates['skill_7'] = skilld0dba_7,
        codeStates['setskill_7'] = setskilld0dba_7,
        codeStates['skill_8'] = skilld0dba_8,
        codeStates['setskill_8'] = setskilld0dba_8,
        codeStates['skill_9'] = skilld0dba_9,
        codeStates['setskill_9'] = setskilld0dba_9,
        codeStates['skill_10'] = skilld0dba_10,
        codeStates['setskill_10'] = setskilld0dba_10,
        codeStates['skill_11'] = skilld0dba_11,
        codeStates['setskill_11'] = setskilld0dba_11,
        codeStates['skill_12'] = skilld0dba_12,
        codeStates['setskill_12'] = setskilld0dba_12,
        codeStates['skill_13'] = skilld0dba_13,
        codeStates['setskill_13'] = setskilld0dba_13,
        codeStates['skill_14'] = skilld0dba_14,
        codeStates['setskill_14'] = setskilld0dba_14,
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
        "7cba9e840637995c1112c096726d0dba",
        "f8766ff22fac8201778f4a086a35d72c"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1",
      //     componentId: "7cba9e840637995c1112c096726d0dba",
      //     controlId: "f8766ff22fac8201778f4a086a35d72c",
      //     isTable: false,
      //     from:"TextInputyears_of_experience",
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
        setDynamicStateandType({name:'years_of_experience', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'years_of_experience',type:'text'};
      //   type={
      //     name:'years_of_experience',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.years_of_experience.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.years_of_experience.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.years_of_experience.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'years_of_experience',type:'text'};
      //   type={
      //     name:'years_of_experience',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.years_of_experience.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.years_of_experience.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.years_of_experience.type
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
  const skilld0dba_10Ref = useRef<any>(skilld0dba_10);
  useEffect(() => { skilld0dba_10Ref.current = skilld0dba_10; }, [skilld0dba_10]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "f8766ff22fac8201778f4a086a35d72c") {
        handleChange({target:{value:skilld0dba_10Ref?.current?.years_of_experience||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "f8766ff22fac8201778f4a086a35d72c") {
        handleBlur({target:{value:skilld0dba_10Ref?.current?.years_of_experience||""}});
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
  if(dfd_skilljson_v1Props?.setSearchFilters && dfd_skilljson_v1Props?.data)
  {
    if(Array.isArray(dfd_skilljson_v1Props.data) && dfd_skilljson_v1Props.data.length > 0){
      setskilld0dba_10((pre:any)=>({...pre,years_of_experience:dfd_skilljson_v1Props.data[0]?.years_of_experience}));
    }
  }
  },[dfd_skilljson_v1Props?.setSearchFilters])
  if (years_of_experience5d72c?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `19 / 25`,gridRow: `1 / 13`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={skilld0dba_10?.years_of_experience||""}
         disabled= {years_of_experience5d72c?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='5 Years'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Years of Experience"
      errorMessage={error}
        validationState={validate?.viewNewEmployees_v1?.years_of_experience ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputyears_of_experience
