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

const TextInputcgpa = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:educationJson:AFVK:v1|172c23b4894e4d33a2784d2bd3e0c409|properties.education_history_json.items.properties.grade_cgpa_percentage"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1|b0ce34f22c49cc7e38365c0ce5828de7|2c2d099f50e20dcf659f6da5c0d48344"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:educationJson:AFVK:v1:",
  "schemaData": {
    "type": "string",
    "x-pg-type": "text",
    "x-expression": "ed ->> 'grade_cgpa_percentage'"
  }
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_educationjson_v1Props, setdfd_educationjson_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'grade_cgpa_percentage',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {education28de7_0, seteducation28de7_0}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_0Props, seteducation28de7_0Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_1, seteducation28de7_1}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_1Props, seteducation28de7_1Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_2, seteducation28de7_2}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_2Props, seteducation28de7_2Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_3, seteducation28de7_3}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_3Props, seteducation28de7_3Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_4, seteducation28de7_4}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_4Props, seteducation28de7_4Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_5, seteducation28de7_5}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_5Props, seteducation28de7_5Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_6, seteducation28de7_6}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_6Props, seteducation28de7_6Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_7, seteducation28de7_7}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_7Props, seteducation28de7_7Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_8, seteducation28de7_8}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_8Props, seteducation28de7_8Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_9, seteducation28de7_9}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_9Props, seteducation28de7_9Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_10, seteducation28de7_10}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_10Props, seteducation28de7_10Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_11, seteducation28de7_11}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_11Props, seteducation28de7_11Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_12, seteducation28de7_12}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_12Props, seteducation28de7_12Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_13, seteducation28de7_13}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_13Props, seteducation28de7_13Props}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_14, seteducation28de7_14}= useContext(TotalContext) as TotalContextProps;
  const {education28de7_14Props, seteducation28de7_14Props}= useContext(TotalContext) as TotalContextProps;
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
  const {degree9b174, setdegree9b174}= useContext(TotalContext) as TotalContextProps;
  const {specialization7935b, setspecialization7935b}= useContext(TotalContext) as TotalContextProps;
  const {institution_namee6f0c, setinstitution_namee6f0c}= useContext(TotalContext) as TotalContextProps;
  const {cgpa48344, setcgpa48344}= useContext(TotalContext) as TotalContextProps;
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
      setValidate((pre:any)=>({...pre,viewNewEmployees_v1:{...pre?.viewNewEmployees_v1,grade_cgpa_percentage:undefined}}));
    if(dynamicStateandType.type=="number"){
    seteducation28de7_5((prev: any) => ({ ...prev, grade_cgpa_percentage: +e.target.value }));
    }
    else{
    seteducation28de7_5((prev: any) => ({ ...prev, grade_cgpa_percentage: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['education28'] = education28de7_0,
        codeStates['seteducation28'] = seteducation28de7_0,
        codeStates['education28de7_0'] = education28de7_0Props,
        codeStates['seteducation28de7_0'] = seteducation28de7_0Props,
        codeStates['education28'] = education28de7_1,
        codeStates['seteducation28'] = seteducation28de7_1,
        codeStates['education28de7_1'] = education28de7_1Props,
        codeStates['seteducation28de7_1'] = seteducation28de7_1Props,
        codeStates['education28'] = education28de7_2,
        codeStates['seteducation28'] = seteducation28de7_2,
        codeStates['education28de7_2'] = education28de7_2Props,
        codeStates['seteducation28de7_2'] = seteducation28de7_2Props,
        codeStates['education28'] = education28de7_3,
        codeStates['seteducation28'] = seteducation28de7_3,
        codeStates['education28de7_3'] = education28de7_3Props,
        codeStates['seteducation28de7_3'] = seteducation28de7_3Props,
        codeStates['education28'] = education28de7_4,
        codeStates['seteducation28'] = seteducation28de7_4,
        codeStates['education28de7_4'] = education28de7_4Props,
        codeStates['seteducation28de7_4'] = seteducation28de7_4Props,
        codeStates['education28'] = education28de7_5,
        codeStates['seteducation28'] = seteducation28de7_5,
        codeStates['education28de7_5'] = education28de7_5Props,
        codeStates['seteducation28de7_5'] = seteducation28de7_5Props,
        codeStates['education28'] = education28de7_6,
        codeStates['seteducation28'] = seteducation28de7_6,
        codeStates['education28de7_6'] = education28de7_6Props,
        codeStates['seteducation28de7_6'] = seteducation28de7_6Props,
        codeStates['education28'] = education28de7_7,
        codeStates['seteducation28'] = seteducation28de7_7,
        codeStates['education28de7_7'] = education28de7_7Props,
        codeStates['seteducation28de7_7'] = seteducation28de7_7Props,
        codeStates['education28'] = education28de7_8,
        codeStates['seteducation28'] = seteducation28de7_8,
        codeStates['education28de7_8'] = education28de7_8Props,
        codeStates['seteducation28de7_8'] = seteducation28de7_8Props,
        codeStates['education28'] = education28de7_9,
        codeStates['seteducation28'] = seteducation28de7_9,
        codeStates['education28de7_9'] = education28de7_9Props,
        codeStates['seteducation28de7_9'] = seteducation28de7_9Props,
        codeStates['education28d'] = education28de7_10,
        codeStates['seteducation28d'] = seteducation28de7_10,
        codeStates['education28de7_10'] = education28de7_10Props,
        codeStates['seteducation28de7_10'] = seteducation28de7_10Props,
        codeStates['education28d'] = education28de7_11,
        codeStates['seteducation28d'] = seteducation28de7_11,
        codeStates['education28de7_11'] = education28de7_11Props,
        codeStates['seteducation28de7_11'] = seteducation28de7_11Props,
        codeStates['education28d'] = education28de7_12,
        codeStates['seteducation28d'] = seteducation28de7_12,
        codeStates['education28de7_12'] = education28de7_12Props,
        codeStates['seteducation28de7_12'] = seteducation28de7_12Props,
        codeStates['education28d'] = education28de7_13,
        codeStates['seteducation28d'] = seteducation28de7_13,
        codeStates['education28de7_13'] = education28de7_13Props,
        codeStates['seteducation28de7_13'] = seteducation28de7_13Props,
        codeStates['education28d'] = education28de7_14,
        codeStates['seteducation28d'] = seteducation28de7_14,
        codeStates['education28de7_14'] = education28de7_14Props,
        codeStates['seteducation28de7_14'] = seteducation28de7_14Props,
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
        codeStates['degree'] = degree9b174,
        codeStates['setdegree'] = setdegree9b174,
        codeStates['specialization'] = specialization7935b,
        codeStates['setspecialization'] = setspecialization7935b,
        codeStates['institution_name'] = institution_namee6f0c,
        codeStates['setinstitution_name'] = setinstitution_namee6f0c,
        codeStates['cgpa'] = cgpa48344,
        codeStates['setcgpa'] = setcgpa48344,
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
        codeStates['education_0'] = education28de7_0,
        codeStates['seteducation_0'] = seteducation28de7_0,
        codeStates['education_1'] = education28de7_1,
        codeStates['seteducation_1'] = seteducation28de7_1,
        codeStates['education_2'] = education28de7_2,
        codeStates['seteducation_2'] = seteducation28de7_2,
        codeStates['education_3'] = education28de7_3,
        codeStates['seteducation_3'] = seteducation28de7_3,
        codeStates['education_4'] = education28de7_4,
        codeStates['seteducation_4'] = seteducation28de7_4,
        codeStates['education_5'] = education28de7_5,
        codeStates['seteducation_5'] = seteducation28de7_5,
        codeStates['education_6'] = education28de7_6,
        codeStates['seteducation_6'] = seteducation28de7_6,
        codeStates['education_7'] = education28de7_7,
        codeStates['seteducation_7'] = seteducation28de7_7,
        codeStates['education_8'] = education28de7_8,
        codeStates['seteducation_8'] = seteducation28de7_8,
        codeStates['education_9'] = education28de7_9,
        codeStates['seteducation_9'] = seteducation28de7_9,
        codeStates['education_10'] = education28de7_10,
        codeStates['seteducation_10'] = seteducation28de7_10,
        codeStates['education_11'] = education28de7_11,
        codeStates['seteducation_11'] = seteducation28de7_11,
        codeStates['education_12'] = education28de7_12,
        codeStates['seteducation_12'] = seteducation28de7_12,
        codeStates['education_13'] = education28de7_13,
        codeStates['seteducation_13'] = seteducation28de7_13,
        codeStates['education_14'] = education28de7_14,
        codeStates['seteducation_14'] = seteducation28de7_14,
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
        "b0ce34f22c49cc7e38365c0ce5828de7",
        "2c2d099f50e20dcf659f6da5c0d48344"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1",
      //     componentId: "b0ce34f22c49cc7e38365c0ce5828de7",
      //     controlId: "2c2d099f50e20dcf659f6da5c0d48344",
      //     isTable: false,
      //     from:"TextInputcgpa",
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
        setDynamicStateandType({name:'grade_cgpa_percentage', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'grade_cgpa_percentage',type:'text'};
      //   type={
      //     name:'grade_cgpa_percentage',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grade_cgpa_percentage.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grade_cgpa_percentage.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.grade_cgpa_percentage.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'grade_cgpa_percentage',type:'text'};
      //   type={
      //     name:'grade_cgpa_percentage',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grade_cgpa_percentage.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grade_cgpa_percentage.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.grade_cgpa_percentage.type
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
  const education28de7_5Ref = useRef<any>(education28de7_5);
  useEffect(() => { education28de7_5Ref.current = education28de7_5; }, [education28de7_5]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "2c2d099f50e20dcf659f6da5c0d48344") {
        handleChange({target:{value:education28de7_5Ref?.current?.grade_cgpa_percentage||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "2c2d099f50e20dcf659f6da5c0d48344") {
        handleBlur({target:{value:education28de7_5Ref?.current?.grade_cgpa_percentage||""}});
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
      seteducation28de7_5((pre:any)=>({...pre,grade_cgpa_percentage:dfd_educationjson_v1Props.data[0]?.grade_cgpa_percentage}));
    }
  }
  },[dfd_educationjson_v1Props?.setSearchFilters])
  if (cgpa48344?.isHidden) {
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
        value={education28de7_5?.grade_cgpa_percentage||""}
         disabled= {cgpa48344?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='8.2 CGPA'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Grade/CGPA/Percentage"
      errorMessage={error}
        validationState={validate?.viewNewEmployees_v1?.grade_cgpa_percentage ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcgpa
