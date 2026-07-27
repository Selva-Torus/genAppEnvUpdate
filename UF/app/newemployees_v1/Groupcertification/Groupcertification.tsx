





'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
    
import Groupcertification_0  from "../Groupcertification_0/Groupcertification_0";
    
import Groupcertification_1  from "../Groupcertification_1/Groupcertification_1";
    
import Groupcertification_2  from "../Groupcertification_2/Groupcertification_2";
    
import Groupcertification_3  from "../Groupcertification_3/Groupcertification_3";
    
import Groupcertification_4  from "../Groupcertification_4/Groupcertification_4";
    
import Groupcertification_5  from "../Groupcertification_5/Groupcertification_5";
    
import Groupcertification_6  from "../Groupcertification_6/Groupcertification_6";
    
import Groupcertification_7  from "../Groupcertification_7/Groupcertification_7";
    
import Groupcertification_8  from "../Groupcertification_8/Groupcertification_8";
    
import Groupcertification_9  from "../Groupcertification_9/Groupcertification_9";
    
import Groupcertification_10  from "../Groupcertification_10/Groupcertification_10";
    
import Groupcertification_11  from "../Groupcertification_11/Groupcertification_11";
    
import Groupcertification_12  from "../Groupcertification_12/Groupcertification_12";
    
import Groupcertification_13  from "../Groupcertification_13/Groupcertification_13";
    
import Groupcertification_14  from "../Groupcertification_14/Groupcertification_14";
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';


const Groupcertification = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false, setIsProcessing=()=>{}, groupData={}, controlData={}}:any)=> {
  const token:string = getCookie('token'); 
  const decodedTokenObj:any = decodeToken(token);
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [ruleData,setRuleData]= useState<any>([]);
  //const [dynamicActionButtonOrder,setDynamicActionButtonOrder]= useState<any>({});
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_bloodgroupcombo_v1Props, setdfd_bloodgroupcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_maritalstatuscombo_v1Props, setdfd_maritalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employmenttypecombo_v1Props, setdfd_employmenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeestatuscombo_v1Props, setdfd_employeestatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gradecodecombo_v1Props, setdfd_gradecodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vacancystatuscombo_v1Props, setdfd_vacancystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_positioncodecombo_v1Props, setdfd_positioncodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_empworkmodecombo_v1Props, setdfd_empworkmodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gendercombo_v1Props, setdfd_gendercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_skilljson_v1Props, setdfd_skilljson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_familyjson_v1Props, setdfd_familyjson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_educationjson_v1Props, setdfd_educationjson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_certifyjson_v1Props, setdfd_certifyjson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_countrycombo_v1Props, setdfd_countrycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statecombo_v1Props, setdfd_statecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={
  "CXO": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "HR Manager": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Info Security Officer": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Employee": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "IT Manager": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Staff": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Auditor": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Operation Manager": {
    "allowedControls": [
      "certification_name",
      "certification_provider",
      "certification_id"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
      "dynamicactions",
      "basic_details_group",
      "contact_details_group",
      "address_details_group",
      "identity_details_group",
      "employment_details_group",
      "compensation_details_group",
      "bank_details",
      "emergency_contact_group",
      "skills_education_group",
      "skills_group",
      "skill",
      "education_group",
      "education",
      "cert_group",
      "certification",
      "family_detail_group",
      "famly_details"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
 /////////////
   //another screen
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
  //////////////
  const [open, setOpen] = React.useState(false);
  const groupNames: any = ["certification_0","certification_1","certification_2","certification_3","certification_4","certification_5","certification_6","certification_7","certification_8","certification_9","certification_10","certification_11","certification_12","certification_13","certification_14",];
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 15;
;
  const containerRef = useRef<any>(null);

  const goToPage = (page: number) => {
    const next = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(next);
  };

  
  async function securityCheck() {
  const orchestrationData = getGroupOrchestrationData(groupData, "981857295fec44a6a863f123e83c7d06");
  code = orchestrationData?.data?.code;
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("certification_name")){
      setcertification_name26561({...certification_name26561,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("certification_provider")){
      setcertification_provider33172({...certification_provider33172,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("certification_id")){
      setcertification_id70e9e({...certification_id70e9e,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['new_employee_group']  = new_employee_group42d78,
      codeStates['setnew_employee_group'] = setnew_employee_group42d78,
      codeStates['dynamicactions']  = dynamicactionsa8358,
      codeStates['setdynamicactions'] = setdynamicactionsa8358,
      codeStates['basic_details_group']  = basic_details_groupd39fd,
      codeStates['setbasic_details_group'] = setbasic_details_groupd39fd,
      codeStates['contact_details_group']  = contact_details_groupa1911,
      codeStates['setcontact_details_group'] = setcontact_details_groupa1911,
      codeStates['address_details_group']  = address_details_groupb72f4,
      codeStates['setaddress_details_group'] = setaddress_details_groupb72f4,
      codeStates['identity_details_group']  = identity_details_group6a6fe,
      codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
      codeStates['employment_details_group']  = employment_details_group89cd6,
      codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
      codeStates['compensation_details_group']  = compensation_details_groupf9ef1,
      codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
      codeStates['bank_details']  = bank_details820cd,
      codeStates['setbank_details'] = setbank_details820cd,
      codeStates['emergency_contact_group']  = emergency_contact_group73988,
      codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
      codeStates['skills_education_group']  = skills_education_groupcb53a,
      codeStates['setskills_education_group'] = setskills_education_groupcb53a,
      codeStates['skills_group']  = skills_group36679,
      codeStates['setskills_group'] = setskills_group36679,
      codeStates['skill']  = skill9f89a,
      codeStates['setskill'] = setskill9f89a,
      codeStates['education_group']  = education_group70757,
      codeStates['seteducation_group'] = seteducation_group70757,
      codeStates['education']  = education2393a,
      codeStates['seteducation'] = seteducation2393a,
      codeStates['cert_group']  = cert_groupedb63,
      codeStates['setcert_group'] = setcert_groupedb63,
      codeStates['certification']  = certificationc7d06,
      codeStates['setcertification'] = setcertificationc7d06,
      codeStates['family_detail_group']  = family_detail_group800b7,
      codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
      codeStates['famly_details']  = famly_detailsb06ea,
      codeStates['setfamly_details'] = setfamly_detailsb06ea,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{
      // copyFormData for group
      let _groupArrays_3:any=["certification",...dynamicactionsa8358?._groupArrays_||[]]
      _groupArrays_3 = _groupArrays_3.filter((value:any, index:any, self:any) => self.indexOf(value) === index);;
      setdynamicactionsa8358((prev:any) => ({ ...prev, ...certificationc7d06,"_groupArrays_":_groupArrays_3 }));

  }
  const certificationc7d06Ref = useRef<any>(null);
  const handleClearSearch = () => {
    certificationc7d06Ref.current?.setSearchParams();
    certificationc7d06Ref.current?.handleSearch({});
  };
[
  {
    "id": "981857295fec44a6a863f123e83c7d06",
    "name": "certification",
    "type": "group",
    "sequence": 1
  },
  {
    "id": "981857295fec44a6a863f123e83c7d06.1.1",
    "name": "onChange",
    "type": "eventNode",
    "sequence": "1.1"
  },
  {
    "id": "981857295fec44a6a863f123e83c7d06.1.1.1",
    "name": "copyFormData",
    "type": "handlerNode",
    "eventContext": "riseListen",
    "sequence": "1.1.1",
    "hlr": {
      "params": [
        {
          "name": "parentTable",
          "_type": "text",
          "value": "",
          "enabled": true
        },
        {
          "name": "primaryKey",
          "_type": "text",
          "value": "",
          "enabled": true
        },
        {
          "name": "path",
          "_type": "text",
          "value": "",
          "enabled": true
        },
        {
          "name": "setValue",
          "_type": "array",
          "items": [
            {
              "source": "",
              "target": ""
            }
          ],
          "value": "",
          "enabled": true
        }
      ]
    },
    "value": ""
  },
  {
    "id": "33f6e2420861444f9f9472b55f6a8358.1.1.1.1",
    "name": "newEmployees.v1|dynamicactions",
    "type": "screen",
    "sequence": "1.1.1.1",
    "key": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1|dynamicactions",
    "elementType": "group",
    "groupType": "dynamicactions"
  }
]
    useEffect(() => {
        setcertificationc7d06({certification:[certificationc7d06_0,certificationc7d06_1,certificationc7d06_2,certificationc7d06_3,certificationc7d06_4,certificationc7d06_5,certificationc7d06_6,certificationc7d06_7,certificationc7d06_8,certificationc7d06_9,certificationc7d06_10,certificationc7d06_11,certificationc7d06_12,certificationc7d06_13,certificationc7d06_14]})
    },[certificationc7d06_0,certificationc7d06_1,certificationc7d06_2,certificationc7d06_3,certificationc7d06_4,certificationc7d06_5,certificationc7d06_6,certificationc7d06_7,certificationc7d06_8,certificationc7d06_9,certificationc7d06_10,certificationc7d06_11,certificationc7d06_12,certificationc7d06_13,certificationc7d06_14])


  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(certificationc7d06) && Object.keys(certificationc7d06)?.length>0)
      {
        setcertificationc7d06({})
        setcertificationc7d06_0({})
        setcertificationc7d06_1({})
        setcertificationc7d06_2({})
        setcertificationc7d06_3({})
        setcertificationc7d06_4({})
        setcertificationc7d06_5({})
        setcertificationc7d06_6({})
        setcertificationc7d06_7({})
        setcertificationc7d06_8({})
        setcertificationc7d06_9({})
        setcertificationc7d06_10({})
        setcertificationc7d06_11({})
        setcertificationc7d06_12({})
        setcertificationc7d06_13({})
        setcertificationc7d06_14({})
      }
    }else 
      prevRefreshRef.current= true
  }, [certificationc7d06Props?.refresh,token])

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    handleOnChange()
  }, [certificationc7d06])
  const formNumber = String(currentPage + 1).padStart(2, '0');
  const totalPagesStr = String(totalPages).padStart(2, '0');
  const commonProps = {
    lockedData,
    setLockedData,
    primaryTableData,
    setPrimaryTableData,
    checkToAdd,
    setCheckToAdd,
    refetch,
    setRefetch,
    encryptionFlagPageData,
    paginationDetails,
    setIsProcessing,
    groupData, 
    controlData
  };

  const pages = [
    <Groupcertification_0  key={0} {...commonProps} />,
    <Groupcertification_1  key={1} {...commonProps} />,
    <Groupcertification_2  key={2} {...commonProps} />,
    <Groupcertification_3  key={3} {...commonProps} />,
    <Groupcertification_4  key={4} {...commonProps} />,
    <Groupcertification_5  key={5} {...commonProps} />,
    <Groupcertification_6  key={6} {...commonProps} />,
    <Groupcertification_7  key={7} {...commonProps} />,
    <Groupcertification_8  key={8} {...commonProps} />,
    <Groupcertification_9  key={9} {...commonProps} />,
    <Groupcertification_10  key={10} {...commonProps} />,
    <Groupcertification_11  key={11} {...commonProps} />,
    <Groupcertification_12  key={12} {...commonProps} />,
    <Groupcertification_13  key={13} {...commonProps} />,
    <Groupcertification_14  key={14} {...commonProps} />,
  ];
let groupLable:string =""

return (
    <div 
        ref={containerRef}
      style={{          
        gridColumn: '1 / 25',
        gridRow: '12 / 55',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
    >
      <div className='flex justify-between pt-2 pb-2 p-1 ml-4'>
        <span >
          <Text variant="">
            {groupLable}
          </Text>
        </span>
        <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '16px' }}>
          {groupLable} {formNumber} of {totalPagesStr}
        </span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#ffffff', margin: '0' }}>
        {pages[currentPage]}
      </div>

      <div className='flex justify-between pt-2 pb-2 p-1'>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: currentPage === 0 ? '#9ca3af' : '#3b5bdb',
            backgroundColor: currentPage === 0 ? '#f1f3f5' : '#dde3f8',
            border: 'none',
            borderRadius: '8px',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            marginLeft: '16px',
            marginBottom: '8px',
          }}
        >
          ← Previous
        </button>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 20px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ffffff',
            backgroundColor: currentPage === totalPages - 1 ? '#93c5fd' : '#1d4ed8',
            border: 'none',
            borderRadius: '6px',
            cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer',
            marginRight: '16px',
            marginBottom: '8px',
          }}
        >
          Next →
        </button>
      </div>
    </div>
 )
}

export default Groupcertification
