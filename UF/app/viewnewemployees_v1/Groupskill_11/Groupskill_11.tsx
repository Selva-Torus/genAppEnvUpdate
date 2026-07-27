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
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {viewnewemployees_v1, setviewnewemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1',
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
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "7cba9e840637995c1112c096726d0dba");
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
    setskilld0dbaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("skill_name")){
        setskill_name649e5((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(skill_name649e5?.isDisabled==null)
      {
        setskill_name649e5((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("skill_category")){
        setskill_category7ff29((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(skill_category7ff29?.isDisabled==null)
      {
        setskill_category7ff29((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("proficiency_level")){
        setproficiency_levelf783d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(proficiency_levelf783d?.isDisabled==null)
      {
        setproficiency_levelf783d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("years_of_experience")){
        setyears_of_experience5d72c((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(years_of_experience5d72c?.isDisabled==null)
      {
        setyears_of_experience5d72c((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
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

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
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
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const skilld0dba_11Ref = useRef<any>(null);
  const handleClearSearch = () => {
    skilld0dba_11Ref.current?.setSearchParams();
    skilld0dba_11Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(skilld0dba_11) && Object.keys(skilld0dba_11)?.length>0)
      {
        setskilld0dba_11({})
      }
    }else 
      prevRefreshRef.current= true
  }, [skilld0dba_11Props?.refresh,token])


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
          setviewnewemployees_v1((pre:any)=>({...pre,_selectedGroup_:"skill"}))
        }}
    >
        {allowedControls.includes("skill_name") ?<TextInputskill_name   /* 649e5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("skill_category") ?<TextInputskill_category   /* 7ff29 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("proficiency_level") ?<TextInputproficiency_level   /* f783d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("years_of_experience") ?<TextInputyears_of_experience   /* 5d72c */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupskill
