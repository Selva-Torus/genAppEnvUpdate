'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import TextInputskill_name  from "./TextInputskill_name";
import TextInputskill_category  from "./TextInputskill_category";
import TextInputproficiency_level  from "./TextInputproficiency_level";
import TextInputyears_of_experience  from "./TextInputyears_of_experience";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupskill = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
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
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
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
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {newemployees_v1, setnewemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1',
    [user],
    'GroupSkill',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "77b5700fc0f34498a59bda374939f89a");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setskill9f89aProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("skill_name")){
        setskill_name26421((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(skill_name26421?.isDisabled==null)
      {
        setskill_name26421((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("skill_category")){
        setskill_category6fca1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(skill_category6fca1?.isDisabled==null)
      {
        setskill_category6fca1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("proficiency_level")){
        setproficiency_levelfea56((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(proficiency_levelfea56?.isDisabled==null)
      {
        setproficiency_levelfea56((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("years_of_experience")){
        setyears_of_experiencee0aba((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(years_of_experiencee0aba?.isDisabled==null)
      {
        setyears_of_experiencee0aba((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['skill9f'] = skill9f89a_0,
        codeStates['setskill9f'] = setskill9f89a_0,
        codeStates['skill9f89a_0'] = skill9f89a_0Props,
        codeStates['setskill9f89a_0'] = setskill9f89a_0Props,
        codeStates['skill9f'] = skill9f89a_1,
        codeStates['setskill9f'] = setskill9f89a_1,
        codeStates['skill9f89a_1'] = skill9f89a_1Props,
        codeStates['setskill9f89a_1'] = setskill9f89a_1Props,
        codeStates['skill9f'] = skill9f89a_2,
        codeStates['setskill9f'] = setskill9f89a_2,
        codeStates['skill9f89a_2'] = skill9f89a_2Props,
        codeStates['setskill9f89a_2'] = setskill9f89a_2Props,
        codeStates['skill9f'] = skill9f89a_3,
        codeStates['setskill9f'] = setskill9f89a_3,
        codeStates['skill9f89a_3'] = skill9f89a_3Props,
        codeStates['setskill9f89a_3'] = setskill9f89a_3Props,
        codeStates['skill9f'] = skill9f89a_4,
        codeStates['setskill9f'] = setskill9f89a_4,
        codeStates['skill9f89a_4'] = skill9f89a_4Props,
        codeStates['setskill9f89a_4'] = setskill9f89a_4Props,
        codeStates['skill9f'] = skill9f89a_5,
        codeStates['setskill9f'] = setskill9f89a_5,
        codeStates['skill9f89a_5'] = skill9f89a_5Props,
        codeStates['setskill9f89a_5'] = setskill9f89a_5Props,
        codeStates['skill9f'] = skill9f89a_6,
        codeStates['setskill9f'] = setskill9f89a_6,
        codeStates['skill9f89a_6'] = skill9f89a_6Props,
        codeStates['setskill9f89a_6'] = setskill9f89a_6Props,
        codeStates['skill9f'] = skill9f89a_7,
        codeStates['setskill9f'] = setskill9f89a_7,
        codeStates['skill9f89a_7'] = skill9f89a_7Props,
        codeStates['setskill9f89a_7'] = setskill9f89a_7Props,
        codeStates['skill9f'] = skill9f89a_8,
        codeStates['setskill9f'] = setskill9f89a_8,
        codeStates['skill9f89a_8'] = skill9f89a_8Props,
        codeStates['setskill9f89a_8'] = setskill9f89a_8Props,
        codeStates['skill9f'] = skill9f89a_9,
        codeStates['setskill9f'] = setskill9f89a_9,
        codeStates['skill9f89a_9'] = skill9f89a_9Props,
        codeStates['setskill9f89a_9'] = setskill9f89a_9Props,
        codeStates['skill9f8'] = skill9f89a_10,
        codeStates['setskill9f8'] = setskill9f89a_10,
        codeStates['skill9f89a_10'] = skill9f89a_10Props,
        codeStates['setskill9f89a_10'] = setskill9f89a_10Props,
        codeStates['skill9f8'] = skill9f89a_11,
        codeStates['setskill9f8'] = setskill9f89a_11,
        codeStates['skill9f89a_11'] = skill9f89a_11Props,
        codeStates['setskill9f89a_11'] = setskill9f89a_11Props,
        codeStates['skill9f8'] = skill9f89a_12,
        codeStates['setskill9f8'] = setskill9f89a_12,
        codeStates['skill9f89a_12'] = skill9f89a_12Props,
        codeStates['setskill9f89a_12'] = setskill9f89a_12Props,
        codeStates['skill9f8'] = skill9f89a_13,
        codeStates['setskill9f8'] = setskill9f89a_13,
        codeStates['skill9f89a_13'] = skill9f89a_13Props,
        codeStates['setskill9f89a_13'] = setskill9f89a_13Props,
        codeStates['skill9f8'] = skill9f89a_14,
        codeStates['setskill9f8'] = setskill9f89a_14,
        codeStates['skill9f89a_14'] = skill9f89a_14Props,
        codeStates['setskill9f89a_14'] = setskill9f89a_14Props,
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
        codeStates['skill_name'] = skill_name26421,
        codeStates['setskill_name'] = setskill_name26421,
        codeStates['skill_category'] = skill_category6fca1,
        codeStates['setskill_category'] = setskill_category6fca1,
        codeStates['proficiency_level'] = proficiency_levelfea56,
        codeStates['setproficiency_level'] = setproficiency_levelfea56,
        codeStates['years_of_experience'] = years_of_experiencee0aba,
        codeStates['setyears_of_experience'] = setyears_of_experiencee0aba,
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
        codeStates['family_detail_group'] = family_detail_group800b7,
        codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
        codeStates['family_detail_group800b7'] = family_detail_group800b7Props,
        codeStates['setfamily_detail_group800b7'] = setfamily_detail_group800b7Props,
        codeStates['famly_details'] = famly_detailsb06ea,
        codeStates['setfamly_details'] = setfamly_detailsb06ea,
        codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
        codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{
      // copyFormData for group
           setdynamicactionsa8358((prev:any) => ({ ...prev, ...skill9f89a }));

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['skill9f'] = skill9f89a_0,
        codeStates['setskill9f'] = setskill9f89a_0,
        codeStates['skill9f89a_0'] = skill9f89a_0Props,
        codeStates['setskill9f89a_0'] = setskill9f89a_0Props,
        codeStates['skill9f'] = skill9f89a_1,
        codeStates['setskill9f'] = setskill9f89a_1,
        codeStates['skill9f89a_1'] = skill9f89a_1Props,
        codeStates['setskill9f89a_1'] = setskill9f89a_1Props,
        codeStates['skill9f'] = skill9f89a_2,
        codeStates['setskill9f'] = setskill9f89a_2,
        codeStates['skill9f89a_2'] = skill9f89a_2Props,
        codeStates['setskill9f89a_2'] = setskill9f89a_2Props,
        codeStates['skill9f'] = skill9f89a_3,
        codeStates['setskill9f'] = setskill9f89a_3,
        codeStates['skill9f89a_3'] = skill9f89a_3Props,
        codeStates['setskill9f89a_3'] = setskill9f89a_3Props,
        codeStates['skill9f'] = skill9f89a_4,
        codeStates['setskill9f'] = setskill9f89a_4,
        codeStates['skill9f89a_4'] = skill9f89a_4Props,
        codeStates['setskill9f89a_4'] = setskill9f89a_4Props,
        codeStates['skill9f'] = skill9f89a_5,
        codeStates['setskill9f'] = setskill9f89a_5,
        codeStates['skill9f89a_5'] = skill9f89a_5Props,
        codeStates['setskill9f89a_5'] = setskill9f89a_5Props,
        codeStates['skill9f'] = skill9f89a_6,
        codeStates['setskill9f'] = setskill9f89a_6,
        codeStates['skill9f89a_6'] = skill9f89a_6Props,
        codeStates['setskill9f89a_6'] = setskill9f89a_6Props,
        codeStates['skill9f'] = skill9f89a_7,
        codeStates['setskill9f'] = setskill9f89a_7,
        codeStates['skill9f89a_7'] = skill9f89a_7Props,
        codeStates['setskill9f89a_7'] = setskill9f89a_7Props,
        codeStates['skill9f'] = skill9f89a_8,
        codeStates['setskill9f'] = setskill9f89a_8,
        codeStates['skill9f89a_8'] = skill9f89a_8Props,
        codeStates['setskill9f89a_8'] = setskill9f89a_8Props,
        codeStates['skill9f'] = skill9f89a_9,
        codeStates['setskill9f'] = setskill9f89a_9,
        codeStates['skill9f89a_9'] = skill9f89a_9Props,
        codeStates['setskill9f89a_9'] = setskill9f89a_9Props,
        codeStates['skill9f8'] = skill9f89a_10,
        codeStates['setskill9f8'] = setskill9f89a_10,
        codeStates['skill9f89a_10'] = skill9f89a_10Props,
        codeStates['setskill9f89a_10'] = setskill9f89a_10Props,
        codeStates['skill9f8'] = skill9f89a_11,
        codeStates['setskill9f8'] = setskill9f89a_11,
        codeStates['skill9f89a_11'] = skill9f89a_11Props,
        codeStates['setskill9f89a_11'] = setskill9f89a_11Props,
        codeStates['skill9f8'] = skill9f89a_12,
        codeStates['setskill9f8'] = setskill9f89a_12,
        codeStates['skill9f89a_12'] = skill9f89a_12Props,
        codeStates['setskill9f89a_12'] = setskill9f89a_12Props,
        codeStates['skill9f8'] = skill9f89a_13,
        codeStates['setskill9f8'] = setskill9f89a_13,
        codeStates['skill9f89a_13'] = skill9f89a_13Props,
        codeStates['setskill9f89a_13'] = setskill9f89a_13Props,
        codeStates['skill9f8'] = skill9f89a_14,
        codeStates['setskill9f8'] = setskill9f89a_14,
        codeStates['skill9f89a_14'] = skill9f89a_14Props,
        codeStates['setskill9f89a_14'] = setskill9f89a_14Props,
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
        codeStates['skill_name'] = skill_name26421,
        codeStates['setskill_name'] = setskill_name26421,
        codeStates['skill_category'] = skill_category6fca1,
        codeStates['setskill_category'] = setskill_category6fca1,
        codeStates['proficiency_level'] = proficiency_levelfea56,
        codeStates['setproficiency_level'] = setproficiency_levelfea56,
        codeStates['years_of_experience'] = years_of_experiencee0aba,
        codeStates['setyears_of_experience'] = setyears_of_experiencee0aba,
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
        codeStates['family_detail_group'] = family_detail_group800b7,
        codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
        codeStates['family_detail_group800b7'] = family_detail_group800b7Props,
        codeStates['setfamily_detail_group800b7'] = setfamily_detail_group800b7Props,
        codeStates['famly_details'] = famly_detailsb06ea,
        codeStates['setfamly_details'] = setfamly_detailsb06ea,
        codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
        codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const skill9f89a_9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    skill9f89a_9Ref.current?.setSearchParams();
    skill9f89a_9Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(skill9f89a_9) && Object.keys(skill9f89a_9)?.length>0)
      {
        setskill9f89a_9({})
      }
    }else 
      prevRefreshRef.current= true
  }, [skill9f89a_9Props?.refresh,token])

  useEffect(() => {      
    handleOnload()
    handleOnChange()
  }, [skill9f89a])

  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridRow: 'span 41', 
        gridColumn: 'span 24',  
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '7px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-1 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnewemployees_v1((pre:any)=>({...pre,_selectedGroup_:"skill"}))
        }}
    >
        {allowedControls.includes("skill_name") ?<TextInputskill_name   /* 26421 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("skill_category") ?<TextInputskill_category   /* 6fca1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("proficiency_level") ?<TextInputproficiency_level   /* fea56 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("years_of_experience") ?<TextInputyears_of_experience   /* e0aba */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupskill
