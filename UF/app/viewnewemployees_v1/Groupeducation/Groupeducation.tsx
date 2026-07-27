





'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
    
import Groupeducation_0  from "../Groupeducation_0/Groupeducation_0";
    
import Groupeducation_1  from "../Groupeducation_1/Groupeducation_1";
    
import Groupeducation_2  from "../Groupeducation_2/Groupeducation_2";
    
import Groupeducation_3  from "../Groupeducation_3/Groupeducation_3";
    
import Groupeducation_4  from "../Groupeducation_4/Groupeducation_4";
    
import Groupeducation_5  from "../Groupeducation_5/Groupeducation_5";
    
import Groupeducation_6  from "../Groupeducation_6/Groupeducation_6";
    
import Groupeducation_7  from "../Groupeducation_7/Groupeducation_7";
    
import Groupeducation_8  from "../Groupeducation_8/Groupeducation_8";
    
import Groupeducation_9  from "../Groupeducation_9/Groupeducation_9";
    
import Groupeducation_10  from "../Groupeducation_10/Groupeducation_10";
    
import Groupeducation_11  from "../Groupeducation_11/Groupeducation_11";
    
import Groupeducation_12  from "../Groupeducation_12/Groupeducation_12";
    
import Groupeducation_13  from "../Groupeducation_13/Groupeducation_13";
    
import Groupeducation_14  from "../Groupeducation_14/Groupeducation_14";
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


const Groupeducation = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false, setIsProcessing=()=>{}, groupData={}, controlData={}}:any)=> {
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
      "degree",
      "specialization",
      "institution_name",
      "cgpa"
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
  //////////////
  const [open, setOpen] = React.useState(false);
  const groupNames: any = ["education_0","education_1","education_2","education_3","education_4","education_5","education_6","education_7","education_8","education_9","education_10","education_11","education_12","education_13","education_14",];
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = 15;
;
  const containerRef = useRef<any>(null);

  const goToPage = (page: number) => {
    const next = Math.max(0, Math.min(totalPages - 1, page));
    setCurrentPage(next);
  };

  
  async function securityCheck() {
  const orchestrationData = getGroupOrchestrationData(groupData, "b0ce34f22c49cc7e38365c0ce5828de7");
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
    if(orchestrationData?.data?.readableControls.includes("degree")){
      setdegree9b174({...degree9b174,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("specialization")){
      setspecialization7935b({...specialization7935b,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("institution_name")){
      setinstitution_namee6f0c({...institution_namee6f0c,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("cgpa")){
      setcgpa48344({...cgpa48344,isDisabled:true});
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
  const education28de7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    education28de7Ref.current?.setSearchParams();
    education28de7Ref.current?.handleSearch({});
  };
""
    useEffect(() => {
        seteducation28de7({education:[education28de7_0,education28de7_1,education28de7_2,education28de7_3,education28de7_4,education28de7_5,education28de7_6,education28de7_7,education28de7_8,education28de7_9,education28de7_10,education28de7_11,education28de7_12,education28de7_13,education28de7_14]})
    },[education28de7_0,education28de7_1,education28de7_2,education28de7_3,education28de7_4,education28de7_5,education28de7_6,education28de7_7,education28de7_8,education28de7_9,education28de7_10,education28de7_11,education28de7_12,education28de7_13,education28de7_14])


  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(education28de7) && Object.keys(education28de7)?.length>0)
      {
        seteducation28de7({})
        seteducation28de7_0({})
        seteducation28de7_1({})
        seteducation28de7_2({})
        seteducation28de7_3({})
        seteducation28de7_4({})
        seteducation28de7_5({})
        seteducation28de7_6({})
        seteducation28de7_7({})
        seteducation28de7_8({})
        seteducation28de7_9({})
        seteducation28de7_10({})
        seteducation28de7_11({})
        seteducation28de7_12({})
        seteducation28de7_13({})
        seteducation28de7_14({})
      }
    }else 
      prevRefreshRef.current= true
  }, [education28de7Props?.refresh,token])

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
    <Groupeducation_0  key={0} {...commonProps} />,
    <Groupeducation_1  key={1} {...commonProps} />,
    <Groupeducation_2  key={2} {...commonProps} />,
    <Groupeducation_3  key={3} {...commonProps} />,
    <Groupeducation_4  key={4} {...commonProps} />,
    <Groupeducation_5  key={5} {...commonProps} />,
    <Groupeducation_6  key={6} {...commonProps} />,
    <Groupeducation_7  key={7} {...commonProps} />,
    <Groupeducation_8  key={8} {...commonProps} />,
    <Groupeducation_9  key={9} {...commonProps} />,
    <Groupeducation_10  key={10} {...commonProps} />,
    <Groupeducation_11  key={11} {...commonProps} />,
    <Groupeducation_12  key={12} {...commonProps} />,
    <Groupeducation_13  key={13} {...commonProps} />,
    <Groupeducation_14  key={14} {...commonProps} />,
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

export default Groupeducation
