





'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
    
import Groupskill_0  from "../Groupskill_0/Groupskill_0";
    
import Groupskill_1  from "../Groupskill_1/Groupskill_1";
    
import Groupskill_2  from "../Groupskill_2/Groupskill_2";
    
import Groupskill_3  from "../Groupskill_3/Groupskill_3";
    
import Groupskill_4  from "../Groupskill_4/Groupskill_4";
    
import Groupskill_5  from "../Groupskill_5/Groupskill_5";
    
import Groupskill_6  from "../Groupskill_6/Groupskill_6";
    
import Groupskill_7  from "../Groupskill_7/Groupskill_7";
    
import Groupskill_8  from "../Groupskill_8/Groupskill_8";
    
import Groupskill_9  from "../Groupskill_9/Groupskill_9";
    
import Groupskill_10  from "../Groupskill_10/Groupskill_10";
    
import Groupskill_11  from "../Groupskill_11/Groupskill_11";
    
import Groupskill_12  from "../Groupskill_12/Groupskill_12";
    
import Groupskill_13  from "../Groupskill_13/Groupskill_13";
    
import Groupskill_14  from "../Groupskill_14/Groupskill_14";
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


const Groupskill = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false, setIsProcessing=()=>{}, groupData={}, controlData={}}:any)=> {
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
      "skill_name",
      "skill_category",
      "proficiency_level",
      "years_of_experience"
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
  const {skill_name26421, setskill_name26421}= useContext(TotalContext) as TotalContextProps;
  const {skill_category6fca1, setskill_category6fca1}= useContext(TotalContext) as TotalContextProps;
  const {proficiency_levelfea56, setproficiency_levelfea56}= useContext(TotalContext) as TotalContextProps;
  const {years_of_experiencee0aba, setyears_of_experiencee0aba}= useContext(TotalContext) as TotalContextProps;
  const {education_group70757, seteducation_group70757}= useContext(TotalContext) as TotalContextProps;
  const {education_group70757Props, seteducation_group70757Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a, seteducation2393a}= useContext(TotalContext) as TotalContextProps;
  const {education2393aProps, seteducation2393aProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63, setcert_groupedb63}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63Props, setcert_groupedb63Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06, setcertificationc7d06}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06Props, setcertificationc7d06Props}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7, setfamily_detail_group800b7}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7Props, setfamily_detail_group800b7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_0, setskill9f89a_0}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_0Props, setskill9f89a_0Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_1, setskill9f89a_1}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_1Props, setskill9f89a_1Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_2, setskill9f89a_2}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_2Props, setskill9f89a_2Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_3, setskill9f89a_3}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_3Props, setskill9f89a_3Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_4, setskill9f89a_4}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_4Props, setskill9f89a_4Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_5, setskill9f89a_5}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_5Props, setskill9f89a_5Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_6, setskill9f89a_6}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_6Props, setskill9f89a_6Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_7, setskill9f89a_7}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_7Props, setskill9f89a_7Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_8, setskill9f89a_8}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_8Props, setskill9f89a_8Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_9, setskill9f89a_9}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_9Props, setskill9f89a_9Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_10, setskill9f89a_10}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_10Props, setskill9f89a_10Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_11, setskill9f89a_11}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_11Props, setskill9f89a_11Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_12, setskill9f89a_12}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_12Props, setskill9f89a_12Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_13, setskill9f89a_13}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_13Props, setskill9f89a_13Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_14, setskill9f89a_14}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a_14Props, setskill9f89a_14Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  const groupNames: any = ["skill_0","skill_1","skill_2","skill_3","skill_4","skill_5","skill_6","skill_7","skill_8","skill_9","skill_10","skill_11","skill_12","skill_13","skill_14",];
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 15;
;
  const containerRef = useRef<any>(null);

  const goToPage = (page: number) => {
    const next = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(next);
  };

  
  async function securityCheck() {
  const orchestrationData = getGroupOrchestrationData(groupData, "77b5700fc0f34498a59bda374939f89a");
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
    if(orchestrationData?.data?.readableControls.includes("skill_name")){
      setskill_name26421({...skill_name26421,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("skill_category")){
      setskill_category6fca1({...skill_category6fca1,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("proficiency_level")){
      setproficiency_levelfea56({...proficiency_levelfea56,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("years_of_experience")){
      setyears_of_experiencee0aba({...years_of_experiencee0aba,isDisabled:true});
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
      let _groupArrays_3:any=["skill",...dynamicactionsa8358?._groupArrays_||[]]
      _groupArrays_3 = _groupArrays_3.filter((value:any, index:any, self:any) => self.indexOf(value) === index);;
      setdynamicactionsa8358((prev:any) => ({ ...prev, ...skill9f89a,"_groupArrays_":_groupArrays_3 }));

  }
  const skill9f89aRef = useRef<any>(null);
  const handleClearSearch = () => {
    skill9f89aRef.current?.setSearchParams();
    skill9f89aRef.current?.handleSearch({});
  };
[
  {
    "id": "77b5700fc0f34498a59bda374939f89a",
    "name": "skill",
    "type": "group",
    "sequence": 1
  },
  {
    "id": "77b5700fc0f34498a59bda374939f89a.1.1",
    "name": "onChange",
    "type": "eventNode",
    "sequence": "1.1"
  },
  {
    "id": "77b5700fc0f34498a59bda374939f89a.1.1.1",
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
        setskill9f89a({skill:[skill9f89a_0,skill9f89a_1,skill9f89a_2,skill9f89a_3,skill9f89a_4,skill9f89a_5,skill9f89a_6,skill9f89a_7,skill9f89a_8,skill9f89a_9,skill9f89a_10,skill9f89a_11,skill9f89a_12,skill9f89a_13,skill9f89a_14]})
    },[skill9f89a_0,skill9f89a_1,skill9f89a_2,skill9f89a_3,skill9f89a_4,skill9f89a_5,skill9f89a_6,skill9f89a_7,skill9f89a_8,skill9f89a_9,skill9f89a_10,skill9f89a_11,skill9f89a_12,skill9f89a_13,skill9f89a_14])


  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(skill9f89a) && Object.keys(skill9f89a)?.length>0)
      {
        setskill9f89a({})
        setskill9f89a_0({})
        setskill9f89a_1({})
        setskill9f89a_2({})
        setskill9f89a_3({})
        setskill9f89a_4({})
        setskill9f89a_5({})
        setskill9f89a_6({})
        setskill9f89a_7({})
        setskill9f89a_8({})
        setskill9f89a_9({})
        setskill9f89a_10({})
        setskill9f89a_11({})
        setskill9f89a_12({})
        setskill9f89a_13({})
        setskill9f89a_14({})
      }
    }else 
      prevRefreshRef.current= true
  }, [skill9f89aProps?.refresh,token])

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    handleOnChange()
  }, [skill9f89a])
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
    <Groupskill_0  key={0} {...commonProps} />,
    <Groupskill_1  key={1} {...commonProps} />,
    <Groupskill_2  key={2} {...commonProps} />,
    <Groupskill_3  key={3} {...commonProps} />,
    <Groupskill_4  key={4} {...commonProps} />,
    <Groupskill_5  key={5} {...commonProps} />,
    <Groupskill_6  key={6} {...commonProps} />,
    <Groupskill_7  key={7} {...commonProps} />,
    <Groupskill_8  key={8} {...commonProps} />,
    <Groupskill_9  key={9} {...commonProps} />,
    <Groupskill_10  key={10} {...commonProps} />,
    <Groupskill_11  key={11} {...commonProps} />,
    <Groupskill_12  key={12} {...commonProps} />,
    <Groupskill_13  key={13} {...commonProps} />,
    <Groupskill_14  key={14} {...commonProps} />,
  ];
let groupLable:string =""

return (
    <div 
        ref={containerRef}
      style={{          
        gridColumn: '1 / 25',
        gridRow: '12 / 53',
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

export default Groupskill
