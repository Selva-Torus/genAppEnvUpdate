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
import TextInputfamily_member_name  from "./TextInputfamily_member_name";
import TextInputrelationship  from "./TextInputrelationship";
import TextInputoccupation  from "./TextInputoccupation";
import TextInputcontact_number  from "./TextInputcontact_number";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupfamly_details = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
      "family_member_name",
      "relationship",
      "occupation",
      "contact_number"
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
  const {famly_detailsb06ea_0, setfamly_detailsb06ea_0}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_0Props, setfamly_detailsb06ea_0Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_1, setfamly_detailsb06ea_1}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_1Props, setfamly_detailsb06ea_1Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_2, setfamly_detailsb06ea_2}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_2Props, setfamly_detailsb06ea_2Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_3, setfamly_detailsb06ea_3}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_3Props, setfamly_detailsb06ea_3Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_4, setfamly_detailsb06ea_4}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_4Props, setfamly_detailsb06ea_4Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_5, setfamly_detailsb06ea_5}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_5Props, setfamly_detailsb06ea_5Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_6, setfamly_detailsb06ea_6}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_6Props, setfamly_detailsb06ea_6Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_7, setfamly_detailsb06ea_7}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_7Props, setfamly_detailsb06ea_7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_8, setfamly_detailsb06ea_8}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_8Props, setfamly_detailsb06ea_8Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_9, setfamly_detailsb06ea_9}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_9Props, setfamly_detailsb06ea_9Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_10, setfamly_detailsb06ea_10}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea_10Props, setfamly_detailsb06ea_10Props}= useContext(TotalContext) as TotalContextProps;
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
  const {family_detail_group800b7, setfamily_detail_group800b7}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7Props, setfamily_detail_group800b7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps;
  const {family_member_name450a1, setfamily_member_name450a1}= useContext(TotalContext) as TotalContextProps;
  const {relationshipd6894, setrelationshipd6894}= useContext(TotalContext) as TotalContextProps;
  const {occupation36ff7, setoccupation36ff7}= useContext(TotalContext) as TotalContextProps;
  const {contact_numbera4deb, setcontact_numbera4deb}= useContext(TotalContext) as TotalContextProps;
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
    'GroupFamlyDetails',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "6611a8f7add7494c88bbd137d53b06ea");
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
    setfamly_detailsb06eaProps((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("family_member_name")){
        setfamily_member_name450a1((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(family_member_name450a1?.isDisabled==null)
      {
        setfamily_member_name450a1((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("relationship")){
        setrelationshipd6894((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(relationshipd6894?.isDisabled==null)
      {
        setrelationshipd6894((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("occupation")){
        setoccupation36ff7((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(occupation36ff7?.isDisabled==null)
      {
        setoccupation36ff7((pre:any)=>({...pre,isDisabled:false}));
      }
    }
    if(orchestrationData?.data?.readableControls.includes("contact_number")){
        setcontact_numbera4deb((pre:any)=>({...pre,isDisabled:true}));

    }else
    {
      if(contact_numbera4deb?.isDisabled==null)
      {
        setcontact_numbera4deb((pre:any)=>({...pre,isDisabled:false}));
      }
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
        codeStates['famly_detailsb0'] = famly_detailsb06ea_0,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_0,
        codeStates['famly_detailsb06ea_0'] = famly_detailsb06ea_0Props,
        codeStates['setfamly_detailsb06ea_0'] = setfamly_detailsb06ea_0Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_1,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_1,
        codeStates['famly_detailsb06ea_1'] = famly_detailsb06ea_1Props,
        codeStates['setfamly_detailsb06ea_1'] = setfamly_detailsb06ea_1Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_2,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_2,
        codeStates['famly_detailsb06ea_2'] = famly_detailsb06ea_2Props,
        codeStates['setfamly_detailsb06ea_2'] = setfamly_detailsb06ea_2Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_3,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_3,
        codeStates['famly_detailsb06ea_3'] = famly_detailsb06ea_3Props,
        codeStates['setfamly_detailsb06ea_3'] = setfamly_detailsb06ea_3Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_4,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_4,
        codeStates['famly_detailsb06ea_4'] = famly_detailsb06ea_4Props,
        codeStates['setfamly_detailsb06ea_4'] = setfamly_detailsb06ea_4Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_5,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_5,
        codeStates['famly_detailsb06ea_5'] = famly_detailsb06ea_5Props,
        codeStates['setfamly_detailsb06ea_5'] = setfamly_detailsb06ea_5Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_6,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_6,
        codeStates['famly_detailsb06ea_6'] = famly_detailsb06ea_6Props,
        codeStates['setfamly_detailsb06ea_6'] = setfamly_detailsb06ea_6Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_7,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_7,
        codeStates['famly_detailsb06ea_7'] = famly_detailsb06ea_7Props,
        codeStates['setfamly_detailsb06ea_7'] = setfamly_detailsb06ea_7Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_8,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_8,
        codeStates['famly_detailsb06ea_8'] = famly_detailsb06ea_8Props,
        codeStates['setfamly_detailsb06ea_8'] = setfamly_detailsb06ea_8Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_9,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_9,
        codeStates['famly_detailsb06ea_9'] = famly_detailsb06ea_9Props,
        codeStates['setfamly_detailsb06ea_9'] = setfamly_detailsb06ea_9Props,
        codeStates['famly_detailsb06'] = famly_detailsb06ea_10,
        codeStates['setfamly_detailsb06'] = setfamly_detailsb06ea_10,
        codeStates['famly_detailsb06ea_10'] = famly_detailsb06ea_10Props,
        codeStates['setfamly_detailsb06ea_10'] = setfamly_detailsb06ea_10Props,
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
        codeStates['family_member_name'] = family_member_name450a1,
        codeStates['setfamily_member_name'] = setfamily_member_name450a1,
        codeStates['relationship'] = relationshipd6894,
        codeStates['setrelationship'] = setrelationshipd6894,
        codeStates['occupation'] = occupation36ff7,
        codeStates['setoccupation'] = setoccupation36ff7,
        codeStates['contact_number'] = contact_numbera4deb,
        codeStates['setcontact_number'] = setcontact_numbera4deb,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{
      // copyFormData for group
           setdynamicactionsa8358((prev:any) => ({ ...prev, ...famly_detailsb06ea }));

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['famly_detailsb0'] = famly_detailsb06ea_0,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_0,
        codeStates['famly_detailsb06ea_0'] = famly_detailsb06ea_0Props,
        codeStates['setfamly_detailsb06ea_0'] = setfamly_detailsb06ea_0Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_1,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_1,
        codeStates['famly_detailsb06ea_1'] = famly_detailsb06ea_1Props,
        codeStates['setfamly_detailsb06ea_1'] = setfamly_detailsb06ea_1Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_2,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_2,
        codeStates['famly_detailsb06ea_2'] = famly_detailsb06ea_2Props,
        codeStates['setfamly_detailsb06ea_2'] = setfamly_detailsb06ea_2Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_3,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_3,
        codeStates['famly_detailsb06ea_3'] = famly_detailsb06ea_3Props,
        codeStates['setfamly_detailsb06ea_3'] = setfamly_detailsb06ea_3Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_4,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_4,
        codeStates['famly_detailsb06ea_4'] = famly_detailsb06ea_4Props,
        codeStates['setfamly_detailsb06ea_4'] = setfamly_detailsb06ea_4Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_5,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_5,
        codeStates['famly_detailsb06ea_5'] = famly_detailsb06ea_5Props,
        codeStates['setfamly_detailsb06ea_5'] = setfamly_detailsb06ea_5Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_6,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_6,
        codeStates['famly_detailsb06ea_6'] = famly_detailsb06ea_6Props,
        codeStates['setfamly_detailsb06ea_6'] = setfamly_detailsb06ea_6Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_7,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_7,
        codeStates['famly_detailsb06ea_7'] = famly_detailsb06ea_7Props,
        codeStates['setfamly_detailsb06ea_7'] = setfamly_detailsb06ea_7Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_8,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_8,
        codeStates['famly_detailsb06ea_8'] = famly_detailsb06ea_8Props,
        codeStates['setfamly_detailsb06ea_8'] = setfamly_detailsb06ea_8Props,
        codeStates['famly_detailsb0'] = famly_detailsb06ea_9,
        codeStates['setfamly_detailsb0'] = setfamly_detailsb06ea_9,
        codeStates['famly_detailsb06ea_9'] = famly_detailsb06ea_9Props,
        codeStates['setfamly_detailsb06ea_9'] = setfamly_detailsb06ea_9Props,
        codeStates['famly_detailsb06'] = famly_detailsb06ea_10,
        codeStates['setfamly_detailsb06'] = setfamly_detailsb06ea_10,
        codeStates['famly_detailsb06ea_10'] = famly_detailsb06ea_10Props,
        codeStates['setfamly_detailsb06ea_10'] = setfamly_detailsb06ea_10Props,
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
        codeStates['family_member_name'] = family_member_name450a1,
        codeStates['setfamily_member_name'] = setfamily_member_name450a1,
        codeStates['relationship'] = relationshipd6894,
        codeStates['setrelationship'] = setrelationshipd6894,
        codeStates['occupation'] = occupation36ff7,
        codeStates['setoccupation'] = setoccupation36ff7,
        codeStates['contact_number'] = contact_numbera4deb,
        codeStates['setcontact_number'] = setcontact_numbera4deb,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const famly_detailsb06ea_5Ref = useRef<any>(null);
  const handleClearSearch = () => {
    famly_detailsb06ea_5Ref.current?.setSearchParams();
    famly_detailsb06ea_5Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(famly_detailsb06ea_5) && Object.keys(famly_detailsb06ea_5)?.length>0)
      {
        setfamly_detailsb06ea_5({})
      }
    }else 
      prevRefreshRef.current= true
  }, [famly_detailsb06ea_5Props?.refresh,token])

  useEffect(() => {      
    handleOnload()
    handleOnChange()
  }, [famly_detailsb06ea])

  const renderBUttons=()=>{
    return (
      <></>
    )
  }
  return (
    <div 
      style={{          
        gridRow: 'span 43', 
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
          setnewemployees_v1((pre:any)=>({...pre,_selectedGroup_:"famly_details"}))
        }}
    >
        {allowedControls.includes("family_member_name") ?<TextInputfamily_member_name   /* 450a1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("relationship") ?<TextInputrelationship   /* d6894 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("occupation") ?<TextInputoccupation   /* 36ff7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
        {allowedControls.includes("contact_number") ?<TextInputcontact_number   /* a4deb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} setIsProcessing={setIsProcessing} controlData={controlData} />: <div></div>}
    </div>
 )
}

export default Groupfamly_details
