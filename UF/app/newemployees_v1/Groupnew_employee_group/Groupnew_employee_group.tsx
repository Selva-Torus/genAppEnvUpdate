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
import Groupdynamicactions  from "../Groupdynamicactions/Groupdynamicactions";
import Groupbasic_details_group  from "../Groupbasic_details_group/Groupbasic_details_group";
import Groupcontact_details_group  from "../Groupcontact_details_group/Groupcontact_details_group";
import Groupaddress_details_group  from "../Groupaddress_details_group/Groupaddress_details_group";
import Groupidentity_details_group  from "../Groupidentity_details_group/Groupidentity_details_group";
import Groupemployment_details_group  from "../Groupemployment_details_group/Groupemployment_details_group";
import Groupcompensation_details_group  from "../Groupcompensation_details_group/Groupcompensation_details_group";
import Groupbank_details  from "../Groupbank_details/Groupbank_details";
import Groupemergency_contact_group  from "../Groupemergency_contact_group/Groupemergency_contact_group";
import Groupskills_education_group  from "../Groupskills_education_group/Groupskills_education_group";
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
import Textnew_emp  from "./Textnew_emp";
import Dividerbasic_divider  from "./Dividerbasic_divider";
import Dividercontact_details_divider  from "./Dividercontact_details_divider";
import Divideradd_divider  from "./Divideradd_divider";
import Dividercomp_divider  from "./Dividercomp_divider";
import Divideremergency_divider  from "./Divideremergency_divider";
import Dividerskill_divider  from "./Dividerskill_divider";
import Dividersearch_divider  from "./Dividersearch_divider";
import Textemployee_id  from "./Textemployee_id";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupnew_employee_group = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
      "new_emp",
      "basic_divider",
      "contact_details_divider",
      "add_divider",
      "comp_divider",
      "emergency_divider",
      "skill_divider",
      "search_divider",
      "employee_id"
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
  const {new_employee_group42d78, setnew_employee_group42d78}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_group42d78Props, setnew_employee_group42d78Props}= useContext(TotalContext) as TotalContextProps;
  const {new_empe0326, setnew_empe0326}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358, setdynamicactionsa8358}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358Props, setdynamicactionsa8358Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_divider2a0e2, setbasic_divider2a0e2}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fd, setbasic_details_groupd39fd}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fdProps, setbasic_details_groupd39fdProps}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911, setcontact_details_groupa1911}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911Props, setcontact_details_groupa1911Props}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_divider70e71, setcontact_details_divider70e71}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4, setaddress_details_groupb72f4}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4Props, setaddress_details_groupb72f4Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6fe, setidentity_details_group6a6fe}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6feProps, setidentity_details_group6a6feProps}= useContext(TotalContext) as TotalContextProps;
  const {add_dividerea333, setadd_dividerea333}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6, setemployment_details_group89cd6}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6Props, setemployment_details_group89cd6Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1, setcompensation_details_groupf9ef1}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1Props, setcompensation_details_groupf9ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {comp_divider6b1fb, setcomp_divider6b1fb}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cd, setbank_details820cd}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cdProps, setbank_details820cdProps}= useContext(TotalContext) as TotalContextProps;
  const {emergency_divider6af77, setemergency_divider6af77}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988, setemergency_contact_group73988}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988Props, setemergency_contact_group73988Props}= useContext(TotalContext) as TotalContextProps;
  const {skill_divider2aaad, setskill_divider2aaad}= useContext(TotalContext) as TotalContextProps;
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
  const {family_detail_group800b7, setfamily_detail_group800b7}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7Props, setfamily_detail_group800b7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps;
  const {search_divider2e6c7, setsearch_divider2e6c7}= useContext(TotalContext) as TotalContextProps;
  const {employee_idb808d, setemployee_idb808d}= useContext(TotalContext) as TotalContextProps;
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
    'GroupNewEmployeeGroup',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "21c70c39846f4c8e99343bf56e542d78");
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
    setnew_employee_group42d78Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("new_emp")){
        setnew_empe0326((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(new_empe0326?.isDisabled==null)
      {
        setnew_empe0326((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("dynamicactions")){
        setdynamicactionsa8358((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(dynamicactionsa8358?.isDisabled==null)
      {
        setdynamicactionsa8358((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("basic_divider")){
        setbasic_divider2a0e2((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(basic_divider2a0e2?.isDisabled==null)
      {
        setbasic_divider2a0e2((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("basic_details_group")){
        setbasic_details_groupd39fd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(basic_details_groupd39fd?.isDisabled==null)
      {
        setbasic_details_groupd39fd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("contact_details_group")){
        setcontact_details_groupa1911((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(contact_details_groupa1911?.isDisabled==null)
      {
        setcontact_details_groupa1911((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("contact_details_divider")){
        setcontact_details_divider70e71((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(contact_details_divider70e71?.isDisabled==null)
      {
        setcontact_details_divider70e71((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("address_details_group")){
        setaddress_details_groupb72f4((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(address_details_groupb72f4?.isDisabled==null)
      {
        setaddress_details_groupb72f4((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("identity_details_group")){
        setidentity_details_group6a6fe((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(identity_details_group6a6fe?.isDisabled==null)
      {
        setidentity_details_group6a6fe((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("add_divider")){
        setadd_dividerea333((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(add_dividerea333?.isDisabled==null)
      {
        setadd_dividerea333((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employment_details_group")){
        setemployment_details_group89cd6((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employment_details_group89cd6?.isDisabled==null)
      {
        setemployment_details_group89cd6((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("compensation_details_group")){
        setcompensation_details_groupf9ef1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(compensation_details_groupf9ef1?.isDisabled==null)
      {
        setcompensation_details_groupf9ef1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("comp_divider")){
        setcomp_divider6b1fb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(comp_divider6b1fb?.isDisabled==null)
      {
        setcomp_divider6b1fb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("bank_details")){
        setbank_details820cd((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(bank_details820cd?.isDisabled==null)
      {
        setbank_details820cd((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("emergency_divider")){
        setemergency_divider6af77((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emergency_divider6af77?.isDisabled==null)
      {
        setemergency_divider6af77((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("emergency_contact_group")){
        setemergency_contact_group73988((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(emergency_contact_group73988?.isDisabled==null)
      {
        setemergency_contact_group73988((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("skill_divider")){
        setskill_divider2aaad((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(skill_divider2aaad?.isDisabled==null)
      {
        setskill_divider2aaad((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("skills_education_group")){
        setskills_education_groupcb53a((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(skills_education_groupcb53a?.isDisabled==null)
      {
        setskills_education_groupcb53a((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("search_divider")){
        setsearch_divider2e6c7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(search_divider2e6c7?.isDisabled==null)
      {
        setsearch_divider2e6c7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("employee_id")){
        setemployee_idb808d((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(employee_idb808d?.isDisabled==null)
      {
        setemployee_idb808d((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_employee_group'] = new_employee_group42d78,
        codeStates['setnew_employee_group'] = setnew_employee_group42d78,
        codeStates['new_employee_group42d78'] = new_employee_group42d78Props,
        codeStates['setnew_employee_group42d78'] = setnew_employee_group42d78Props,
        codeStates['new_emp'] = new_empe0326,
        codeStates['setnew_emp'] = setnew_empe0326,
        codeStates['dynamicactions'] = dynamicactionsa8358,
        codeStates['setdynamicactions'] = setdynamicactionsa8358,
        codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
        codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
        codeStates['basic_divider'] = basic_divider2a0e2,
        codeStates['setbasic_divider'] = setbasic_divider2a0e2,
        codeStates['basic_details_group'] = basic_details_groupd39fd,
        codeStates['setbasic_details_group'] = setbasic_details_groupd39fd,
        codeStates['basic_details_groupd39fd'] = basic_details_groupd39fdProps,
        codeStates['setbasic_details_groupd39fd'] = setbasic_details_groupd39fdProps,
        codeStates['contact_details_group'] = contact_details_groupa1911,
        codeStates['setcontact_details_group'] = setcontact_details_groupa1911,
        codeStates['contact_details_groupa1911'] = contact_details_groupa1911Props,
        codeStates['setcontact_details_groupa1911'] = setcontact_details_groupa1911Props,
        codeStates['contact_details_divider'] = contact_details_divider70e71,
        codeStates['setcontact_details_divider'] = setcontact_details_divider70e71,
        codeStates['address_details_group'] = address_details_groupb72f4,
        codeStates['setaddress_details_group'] = setaddress_details_groupb72f4,
        codeStates['address_details_groupb72f4'] = address_details_groupb72f4Props,
        codeStates['setaddress_details_groupb72f4'] = setaddress_details_groupb72f4Props,
        codeStates['identity_details_group'] = identity_details_group6a6fe,
        codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
        codeStates['identity_details_group6a6fe'] = identity_details_group6a6feProps,
        codeStates['setidentity_details_group6a6fe'] = setidentity_details_group6a6feProps,
        codeStates['add_divider'] = add_dividerea333,
        codeStates['setadd_divider'] = setadd_dividerea333,
        codeStates['employment_details_group'] = employment_details_group89cd6,
        codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
        codeStates['employment_details_group89cd6'] = employment_details_group89cd6Props,
        codeStates['setemployment_details_group89cd6'] = setemployment_details_group89cd6Props,
        codeStates['compensation_details_group'] = compensation_details_groupf9ef1,
        codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
        codeStates['compensation_details_groupf9ef1'] = compensation_details_groupf9ef1Props,
        codeStates['setcompensation_details_groupf9ef1'] = setcompensation_details_groupf9ef1Props,
        codeStates['comp_divider'] = comp_divider6b1fb,
        codeStates['setcomp_divider'] = setcomp_divider6b1fb,
        codeStates['bank_details'] = bank_details820cd,
        codeStates['setbank_details'] = setbank_details820cd,
        codeStates['bank_details820cd'] = bank_details820cdProps,
        codeStates['setbank_details820cd'] = setbank_details820cdProps,
        codeStates['emergency_divider'] = emergency_divider6af77,
        codeStates['setemergency_divider'] = setemergency_divider6af77,
        codeStates['emergency_contact_group'] = emergency_contact_group73988,
        codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
        codeStates['emergency_contact_group73988'] = emergency_contact_group73988Props,
        codeStates['setemergency_contact_group73988'] = setemergency_contact_group73988Props,
        codeStates['skill_divider'] = skill_divider2aaad,
        codeStates['setskill_divider'] = setskill_divider2aaad,
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
        codeStates['search_divider'] = search_divider2e6c7,
        codeStates['setsearch_divider'] = setsearch_divider2e6c7,
        codeStates['employee_id'] = employee_idb808d,
        codeStates['setemployee_id'] = setemployee_idb808d,

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
        codeStates['new_employee_group'] = new_employee_group42d78,
        codeStates['setnew_employee_group'] = setnew_employee_group42d78,
        codeStates['new_employee_group42d78'] = new_employee_group42d78Props,
        codeStates['setnew_employee_group42d78'] = setnew_employee_group42d78Props,
        codeStates['new_emp'] = new_empe0326,
        codeStates['setnew_emp'] = setnew_empe0326,
        codeStates['dynamicactions'] = dynamicactionsa8358,
        codeStates['setdynamicactions'] = setdynamicactionsa8358,
        codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
        codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
        codeStates['basic_divider'] = basic_divider2a0e2,
        codeStates['setbasic_divider'] = setbasic_divider2a0e2,
        codeStates['basic_details_group'] = basic_details_groupd39fd,
        codeStates['setbasic_details_group'] = setbasic_details_groupd39fd,
        codeStates['basic_details_groupd39fd'] = basic_details_groupd39fdProps,
        codeStates['setbasic_details_groupd39fd'] = setbasic_details_groupd39fdProps,
        codeStates['contact_details_group'] = contact_details_groupa1911,
        codeStates['setcontact_details_group'] = setcontact_details_groupa1911,
        codeStates['contact_details_groupa1911'] = contact_details_groupa1911Props,
        codeStates['setcontact_details_groupa1911'] = setcontact_details_groupa1911Props,
        codeStates['contact_details_divider'] = contact_details_divider70e71,
        codeStates['setcontact_details_divider'] = setcontact_details_divider70e71,
        codeStates['address_details_group'] = address_details_groupb72f4,
        codeStates['setaddress_details_group'] = setaddress_details_groupb72f4,
        codeStates['address_details_groupb72f4'] = address_details_groupb72f4Props,
        codeStates['setaddress_details_groupb72f4'] = setaddress_details_groupb72f4Props,
        codeStates['identity_details_group'] = identity_details_group6a6fe,
        codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
        codeStates['identity_details_group6a6fe'] = identity_details_group6a6feProps,
        codeStates['setidentity_details_group6a6fe'] = setidentity_details_group6a6feProps,
        codeStates['add_divider'] = add_dividerea333,
        codeStates['setadd_divider'] = setadd_dividerea333,
        codeStates['employment_details_group'] = employment_details_group89cd6,
        codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
        codeStates['employment_details_group89cd6'] = employment_details_group89cd6Props,
        codeStates['setemployment_details_group89cd6'] = setemployment_details_group89cd6Props,
        codeStates['compensation_details_group'] = compensation_details_groupf9ef1,
        codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
        codeStates['compensation_details_groupf9ef1'] = compensation_details_groupf9ef1Props,
        codeStates['setcompensation_details_groupf9ef1'] = setcompensation_details_groupf9ef1Props,
        codeStates['comp_divider'] = comp_divider6b1fb,
        codeStates['setcomp_divider'] = setcomp_divider6b1fb,
        codeStates['bank_details'] = bank_details820cd,
        codeStates['setbank_details'] = setbank_details820cd,
        codeStates['bank_details820cd'] = bank_details820cdProps,
        codeStates['setbank_details820cd'] = setbank_details820cdProps,
        codeStates['emergency_divider'] = emergency_divider6af77,
        codeStates['setemergency_divider'] = setemergency_divider6af77,
        codeStates['emergency_contact_group'] = emergency_contact_group73988,
        codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
        codeStates['emergency_contact_group73988'] = emergency_contact_group73988Props,
        codeStates['setemergency_contact_group73988'] = setemergency_contact_group73988Props,
        codeStates['skill_divider'] = skill_divider2aaad,
        codeStates['setskill_divider'] = setskill_divider2aaad,
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
        codeStates['search_divider'] = search_divider2e6c7,
        codeStates['setsearch_divider'] = setsearch_divider2e6c7,
        codeStates['employee_id'] = employee_idb808d,
        codeStates['setemployee_id'] = setemployee_idb808d,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const new_employee_group42d78Ref = useRef<any>(null);
  const handleClearSearch = () => {
    new_employee_group42d78Ref.current?.setSearchParams();
    new_employee_group42d78Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(new_employee_group42d78) && Object.keys(new_employee_group42d78)?.length>0)
      {
        setnew_employee_group42d78({})
      }
    }else 
      prevRefreshRef.current= true
  }, [new_employee_group42d78Props?.refresh,token])


  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 332',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '6px',
        backgroundColor:'#ffffff',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md p-7 ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setnewemployees_v1((pre:any)=>({...pre,_selectedGroup_:"new_employee_group"}))
        }}
    >
        {allowedComponent.includes("dynamicactions")  &&<Groupdynamicactions  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("basic_details_group")  &&<Groupbasic_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("contact_details_group")  &&<Groupcontact_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("address_details_group")  &&<Groupaddress_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("identity_details_group")  &&<Groupidentity_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("employment_details_group")  &&<Groupemployment_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("compensation_details_group")  &&<Groupcompensation_details_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("bank_details")  &&<Groupbank_details  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("emergency_contact_group")  &&<Groupemergency_contact_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
        {allowedComponent.includes("skills_education_group")  &&<Groupskills_education_group  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          tableData={tableData}
          setTableData={setTableData}
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          groupData={groupData}
          controlData={controlData}        />}
          {allowedControls.includes("new_emp") ?<Textnew_emp   /* e0326 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("basic_divider") ?<Dividerbasic_divider   /* 2a0e2 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("contact_details_divider") ?<Dividercontact_details_divider   /* 70e71 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("add_divider") ?<Divideradd_divider   /* ea333 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("comp_divider") ?<Dividercomp_divider   /* 6b1fb */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("emergency_divider") ?<Divideremergency_divider   /* 6af77 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("skill_divider") ?<Dividerskill_divider   /* 2aaad */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("search_divider") ?<Dividersearch_divider   /* 2e6c7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
          {allowedControls.includes("employee_id") ?<Textemployee_id   /* b808d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupnew_employee_group
