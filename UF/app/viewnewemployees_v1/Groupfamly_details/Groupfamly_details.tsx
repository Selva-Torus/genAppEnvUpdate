





'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
    
import Groupfamly_details_0  from "../Groupfamly_details_0/Groupfamly_details_0";
    
import Groupfamly_details_1  from "../Groupfamly_details_1/Groupfamly_details_1";
    
import Groupfamly_details_2  from "../Groupfamly_details_2/Groupfamly_details_2";
    
import Groupfamly_details_3  from "../Groupfamly_details_3/Groupfamly_details_3";
    
import Groupfamly_details_4  from "../Groupfamly_details_4/Groupfamly_details_4";
    
import Groupfamly_details_5  from "../Groupfamly_details_5/Groupfamly_details_5";
    
import Groupfamly_details_6  from "../Groupfamly_details_6/Groupfamly_details_6";
    
import Groupfamly_details_7  from "../Groupfamly_details_7/Groupfamly_details_7";
    
import Groupfamly_details_8  from "../Groupfamly_details_8/Groupfamly_details_8";
    
import Groupfamly_details_9  from "../Groupfamly_details_9/Groupfamly_details_9";
    
import Groupfamly_details_10  from "../Groupfamly_details_10/Groupfamly_details_10";
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


const Groupfamly_details = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false, setIsProcessing=()=>{}, groupData={}, controlData={}}:any)=> {
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
    ],
    "allowedGroups": [
      "canvas",
      "new_employee_group",
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
  //////////////
  const [open, setOpen] = React.useState(false);
  const groupNames: any = ["famly_details_0","famly_details_1","famly_details_2","famly_details_3","famly_details_4","famly_details_5","famly_details_6","famly_details_7","famly_details_8","famly_details_9","famly_details_10",];
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 11;
;
  const containerRef = useRef<any>(null);

  const goToPage = (page: number) => {
    const next = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(next);
  };

  
  async function securityCheck() {
  const orchestrationData = getGroupOrchestrationData(groupData, "951803869bda3c5307631ba51c6b4eb8");
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
    if(orchestrationData?.data?.readableControls.includes("family_member_name")){
      setfamily_member_namedb442({...family_member_namedb442,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("relationship")){
      setrelationship01fb3({...relationship01fb3,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("occupation")){
      setoccupationc7375({...occupationc7375,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("contact_number")){
      setcontact_number316cb({...contact_number316cb,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['new_employee_group']  = new_employee_groupdf01f,
      codeStates['setnew_employee_group'] = setnew_employee_groupdf01f,
      codeStates['basic_details_group']  = basic_details_groupe03ea,
      codeStates['setbasic_details_group'] = setbasic_details_groupe03ea,
      codeStates['contact_details_group']  = contact_details_group3ff3d,
      codeStates['setcontact_details_group'] = setcontact_details_group3ff3d,
      codeStates['address_details_group']  = address_details_group75e08,
      codeStates['setaddress_details_group'] = setaddress_details_group75e08,
      codeStates['identity_details_group']  = identity_details_group20918,
      codeStates['setidentity_details_group'] = setidentity_details_group20918,
      codeStates['employment_details_group']  = employment_details_group2c703,
      codeStates['setemployment_details_group'] = setemployment_details_group2c703,
      codeStates['compensation_details_group']  = compensation_details_group83106,
      codeStates['setcompensation_details_group'] = setcompensation_details_group83106,
      codeStates['bank_details']  = bank_detailsf21b7,
      codeStates['setbank_details'] = setbank_detailsf21b7,
      codeStates['emergency_contact_group']  = emergency_contact_groupd1907,
      codeStates['setemergency_contact_group'] = setemergency_contact_groupd1907,
      codeStates['skills_education_group']  = skills_education_groupd1667,
      codeStates['setskills_education_group'] = setskills_education_groupd1667,
      codeStates['skills_group']  = skills_group92cc8,
      codeStates['setskills_group'] = setskills_group92cc8,
      codeStates['skill']  = skilld0dba,
      codeStates['setskill'] = setskilld0dba,
      codeStates['education_group']  = education_groupcd288,
      codeStates['seteducation_group'] = seteducation_groupcd288,
      codeStates['education']  = education28de7,
      codeStates['seteducation'] = seteducation28de7,
      codeStates['cert_group']  = cert_group3be86,
      codeStates['setcert_group'] = setcert_group3be86,
      codeStates['certification']  = certification02740,
      codeStates['setcertification'] = setcertification02740,
      codeStates['family_detail_group']  = family_detail_group496b3,
      codeStates['setfamily_detail_group'] = setfamily_detail_group496b3,
      codeStates['famly_details']  = famly_detailsb4eb8,
      codeStates['setfamly_details'] = setfamly_detailsb4eb8,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const famly_detailsb4eb8Ref = useRef<any>(null);
  const handleClearSearch = () => {
    famly_detailsb4eb8Ref.current?.setSearchParams();
    famly_detailsb4eb8Ref.current?.handleSearch({});
  };
""
    useEffect(() => {
        setfamly_detailsb4eb8({famly_details:[famly_detailsb4eb8_0,famly_detailsb4eb8_1,famly_detailsb4eb8_2,famly_detailsb4eb8_3,famly_detailsb4eb8_4,famly_detailsb4eb8_5,famly_detailsb4eb8_6,famly_detailsb4eb8_7,famly_detailsb4eb8_8,famly_detailsb4eb8_9,famly_detailsb4eb8_10]})
    },[famly_detailsb4eb8_0,famly_detailsb4eb8_1,famly_detailsb4eb8_2,famly_detailsb4eb8_3,famly_detailsb4eb8_4,famly_detailsb4eb8_5,famly_detailsb4eb8_6,famly_detailsb4eb8_7,famly_detailsb4eb8_8,famly_detailsb4eb8_9,famly_detailsb4eb8_10])


  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(famly_detailsb4eb8) && Object.keys(famly_detailsb4eb8)?.length>0)
      {
        setfamly_detailsb4eb8({})
        setfamly_detailsb4eb8_0({})
        setfamly_detailsb4eb8_1({})
        setfamly_detailsb4eb8_2({})
        setfamly_detailsb4eb8_3({})
        setfamly_detailsb4eb8_4({})
        setfamly_detailsb4eb8_5({})
        setfamly_detailsb4eb8_6({})
        setfamly_detailsb4eb8_7({})
        setfamly_detailsb4eb8_8({})
        setfamly_detailsb4eb8_9({})
        setfamly_detailsb4eb8_10({})
      }
    }else 
      prevRefreshRef.current= true
  }, [famly_detailsb4eb8Props?.refresh,token])

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
    <Groupfamly_details_0  key={0} {...commonProps} />,
    <Groupfamly_details_1  key={1} {...commonProps} />,
    <Groupfamly_details_2  key={2} {...commonProps} />,
    <Groupfamly_details_3  key={3} {...commonProps} />,
    <Groupfamly_details_4  key={4} {...commonProps} />,
    <Groupfamly_details_5  key={5} {...commonProps} />,
    <Groupfamly_details_6  key={6} {...commonProps} />,
    <Groupfamly_details_7  key={7} {...commonProps} />,
    <Groupfamly_details_8  key={8} {...commonProps} />,
    <Groupfamly_details_9  key={9} {...commonProps} />,
    <Groupfamly_details_10  key={10} {...commonProps} />,
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

export default Groupfamly_details
