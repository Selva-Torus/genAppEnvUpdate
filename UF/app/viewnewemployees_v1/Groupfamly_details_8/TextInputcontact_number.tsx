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

const TextInputcontact_number = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:familyJson:AFVK:v1|c4aa677c03bb47c88fbb0a7f37a48045|properties.family_details_json.items.properties.contact_number"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1|951803869bda3c5307631ba51c6b4eb8|5a1c681acb346f857fc15aae224316cb"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:familyJson:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "text",
    "x-expression": "f ->> 'contact_number'"
  }
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_familyjson_v1Props, setdfd_familyjson_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'contact_number',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {famly_detailsb4eb8_0, setfamly_detailsb4eb8_0}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_0Props, setfamly_detailsb4eb8_0Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_1, setfamly_detailsb4eb8_1}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_1Props, setfamly_detailsb4eb8_1Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_2, setfamly_detailsb4eb8_2}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_2Props, setfamly_detailsb4eb8_2Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_3, setfamly_detailsb4eb8_3}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_3Props, setfamly_detailsb4eb8_3Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_4, setfamly_detailsb4eb8_4}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_4Props, setfamly_detailsb4eb8_4Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_5, setfamly_detailsb4eb8_5}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_5Props, setfamly_detailsb4eb8_5Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_6, setfamly_detailsb4eb8_6}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_6Props, setfamly_detailsb4eb8_6Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_7, setfamly_detailsb4eb8_7}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_7Props, setfamly_detailsb4eb8_7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_8, setfamly_detailsb4eb8_8}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_8Props, setfamly_detailsb4eb8_8Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_9, setfamly_detailsb4eb8_9}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_9Props, setfamly_detailsb4eb8_9Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_10, setfamly_detailsb4eb8_10}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8_10Props, setfamly_detailsb4eb8_10Props}= useContext(TotalContext) as TotalContextProps;
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
  const {family_detail_group496b3, setfamily_detail_group496b3}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group496b3Props, setfamily_detail_group496b3Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8, setfamly_detailsb4eb8}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb4eb8Props, setfamly_detailsb4eb8Props}= useContext(TotalContext) as TotalContextProps;
  const {family_member_namedb442, setfamily_member_namedb442}= useContext(TotalContext) as TotalContextProps;
  const {relationship01fb3, setrelationship01fb3}= useContext(TotalContext) as TotalContextProps;
  const {occupationc7375, setoccupationc7375}= useContext(TotalContext) as TotalContextProps;
  const {contact_number316cb, setcontact_number316cb}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,viewNewEmployees_v1:{...pre?.viewNewEmployees_v1,contact_number:undefined}}));
    if(dynamicStateandType.type=="number"){
    setfamly_detailsb4eb8_8((prev: any) => ({ ...prev, contact_number: +e.target.value }));
    }
    else{
    setfamly_detailsb4eb8_8((prev: any) => ({ ...prev, contact_number: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_0,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_0,
        codeStates['famly_detailsb4eb8_0'] = famly_detailsb4eb8_0Props,
        codeStates['setfamly_detailsb4eb8_0'] = setfamly_detailsb4eb8_0Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_1,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_1,
        codeStates['famly_detailsb4eb8_1'] = famly_detailsb4eb8_1Props,
        codeStates['setfamly_detailsb4eb8_1'] = setfamly_detailsb4eb8_1Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_2,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_2,
        codeStates['famly_detailsb4eb8_2'] = famly_detailsb4eb8_2Props,
        codeStates['setfamly_detailsb4eb8_2'] = setfamly_detailsb4eb8_2Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_3,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_3,
        codeStates['famly_detailsb4eb8_3'] = famly_detailsb4eb8_3Props,
        codeStates['setfamly_detailsb4eb8_3'] = setfamly_detailsb4eb8_3Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_4,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_4,
        codeStates['famly_detailsb4eb8_4'] = famly_detailsb4eb8_4Props,
        codeStates['setfamly_detailsb4eb8_4'] = setfamly_detailsb4eb8_4Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_5,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_5,
        codeStates['famly_detailsb4eb8_5'] = famly_detailsb4eb8_5Props,
        codeStates['setfamly_detailsb4eb8_5'] = setfamly_detailsb4eb8_5Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_6,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_6,
        codeStates['famly_detailsb4eb8_6'] = famly_detailsb4eb8_6Props,
        codeStates['setfamly_detailsb4eb8_6'] = setfamly_detailsb4eb8_6Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_7,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_7,
        codeStates['famly_detailsb4eb8_7'] = famly_detailsb4eb8_7Props,
        codeStates['setfamly_detailsb4eb8_7'] = setfamly_detailsb4eb8_7Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_8,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_8,
        codeStates['famly_detailsb4eb8_8'] = famly_detailsb4eb8_8Props,
        codeStates['setfamly_detailsb4eb8_8'] = setfamly_detailsb4eb8_8Props,
        codeStates['famly_detailsb4'] = famly_detailsb4eb8_9,
        codeStates['setfamly_detailsb4'] = setfamly_detailsb4eb8_9,
        codeStates['famly_detailsb4eb8_9'] = famly_detailsb4eb8_9Props,
        codeStates['setfamly_detailsb4eb8_9'] = setfamly_detailsb4eb8_9Props,
        codeStates['famly_detailsb4e'] = famly_detailsb4eb8_10,
        codeStates['setfamly_detailsb4e'] = setfamly_detailsb4eb8_10,
        codeStates['famly_detailsb4eb8_10'] = famly_detailsb4eb8_10Props,
        codeStates['setfamly_detailsb4eb8_10'] = setfamly_detailsb4eb8_10Props,
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
        codeStates['family_detail_group'] = family_detail_group496b3,
        codeStates['setfamily_detail_group'] = setfamily_detail_group496b3,
        codeStates['family_detail_group496b3'] = family_detail_group496b3Props,
        codeStates['setfamily_detail_group496b3'] = setfamily_detail_group496b3Props,
        codeStates['famly_details'] = famly_detailsb4eb8,
        codeStates['setfamly_details'] = setfamly_detailsb4eb8,
        codeStates['famly_detailsb4eb8'] = famly_detailsb4eb8Props,
        codeStates['setfamly_detailsb4eb8'] = setfamly_detailsb4eb8Props,
        codeStates['family_member_name'] = family_member_namedb442,
        codeStates['setfamily_member_name'] = setfamily_member_namedb442,
        codeStates['relationship'] = relationship01fb3,
        codeStates['setrelationship'] = setrelationship01fb3,
        codeStates['occupation'] = occupationc7375,
        codeStates['setoccupation'] = setoccupationc7375,
        codeStates['contact_number'] = contact_number316cb,
        codeStates['setcontact_number'] = setcontact_number316cb,
        codeStates['famly_details_0'] = famly_detailsb4eb8_0,
        codeStates['setfamly_details_0'] = setfamly_detailsb4eb8_0,
        codeStates['famly_details_1'] = famly_detailsb4eb8_1,
        codeStates['setfamly_details_1'] = setfamly_detailsb4eb8_1,
        codeStates['famly_details_2'] = famly_detailsb4eb8_2,
        codeStates['setfamly_details_2'] = setfamly_detailsb4eb8_2,
        codeStates['famly_details_3'] = famly_detailsb4eb8_3,
        codeStates['setfamly_details_3'] = setfamly_detailsb4eb8_3,
        codeStates['famly_details_4'] = famly_detailsb4eb8_4,
        codeStates['setfamly_details_4'] = setfamly_detailsb4eb8_4,
        codeStates['famly_details_5'] = famly_detailsb4eb8_5,
        codeStates['setfamly_details_5'] = setfamly_detailsb4eb8_5,
        codeStates['famly_details_6'] = famly_detailsb4eb8_6,
        codeStates['setfamly_details_6'] = setfamly_detailsb4eb8_6,
        codeStates['famly_details_7'] = famly_detailsb4eb8_7,
        codeStates['setfamly_details_7'] = setfamly_detailsb4eb8_7,
        codeStates['famly_details_8'] = famly_detailsb4eb8_8,
        codeStates['setfamly_details_8'] = setfamly_detailsb4eb8_8,
        codeStates['famly_details_9'] = famly_detailsb4eb8_9,
        codeStates['setfamly_details_9'] = setfamly_detailsb4eb8_9,
        codeStates['famly_details_10'] = famly_detailsb4eb8_10,
        codeStates['setfamly_details_10'] = setfamly_detailsb4eb8_10,
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
        "951803869bda3c5307631ba51c6b4eb8",
        "5a1c681acb346f857fc15aae224316cb"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1",
      //     componentId: "951803869bda3c5307631ba51c6b4eb8",
      //     controlId: "5a1c681acb346f857fc15aae224316cb",
      //     isTable: false,
      //     from:"TextInputcontact_number",
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
        setDynamicStateandType({name:'contact_number', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'contact_number',type:'text'};
      //   type={
      //     name:'contact_number',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.contact_number.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.contact_number.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.contact_number.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'contact_number',type:'text'};
      //   type={
      //     name:'contact_number',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.contact_number.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.contact_number.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.contact_number.type
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
  const famly_detailsb4eb8_8Ref = useRef<any>(famly_detailsb4eb8_8);
  useEffect(() => { famly_detailsb4eb8_8Ref.current = famly_detailsb4eb8_8; }, [famly_detailsb4eb8_8]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "5a1c681acb346f857fc15aae224316cb") {
        handleChange({target:{value:famly_detailsb4eb8_8Ref?.current?.contact_number||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "5a1c681acb346f857fc15aae224316cb") {
        handleBlur({target:{value:famly_detailsb4eb8_8Ref?.current?.contact_number||""}});
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
  if(dfd_familyjson_v1Props?.setSearchFilters && dfd_familyjson_v1Props?.data)
  {
    if(Array.isArray(dfd_familyjson_v1Props.data) && dfd_familyjson_v1Props.data.length > 0){
      setfamly_detailsb4eb8_8((pre:any)=>({...pre,contact_number:dfd_familyjson_v1Props.data[0]?.contact_number}));
    }
  }
  },[dfd_familyjson_v1Props?.setSearchFilters])
  if (contact_number316cb?.isHidden) {
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
        value={famly_detailsb4eb8_8?.contact_number||""}
         disabled= {contact_number316cb?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='65443244252'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Contact Number"
      errorMessage={error}
        validationState={validate?.viewNewEmployees_v1?.contact_number ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcontact_number
