'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Scan } from '@/app/utils/scanService';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonbutton = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const [styleSate, setStyleSate] = useState<any>({})
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
    
 /////////////
   //another screen

  const {header_groupf778a, setheader_groupf778a}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf778aProps, setheader_groupf778aProps}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cb, sethrm_dashboard_group4d6cb}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_group4d6cbProps, sethrm_dashboard_group4d6cbProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9, settotal_employees_group69aa9}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69aa9Props, settotal_employees_group69aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4, setpending_access_req_groupb5bd4}= useContext(TotalContext) as TotalContextProps;
  const {pending_access_req_groupb5bd4Props, setpending_access_req_groupb5bd4Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5, setleave_requests_group4beb5}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_group4beb5Props, setleave_requests_group4beb5Props}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580d, setonboarding_group2580d}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group2580dProps, setonboarding_group2580dProps}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6f, settable_groupe0a6f}= useContext(TotalContext) as TotalContextProps;
  const {table_groupe0a6fProps, settable_groupe0a6fProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010, setsubscreen1c010}= useContext(TotalContext) as TotalContextProps;
  const {subscreen1c010Props, setsubscreen1c010Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps, setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008, setemployee_table_group55008}= useContext(TotalContext) as TotalContextProps;
  const {employee_table_group55008Props, setemployee_table_group55008Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40b, setemp_group5e40b}= useContext(TotalContext) as TotalContextProps;
  const {emp_group5e40bProps, setemp_group5e40bProps}= useContext(TotalContext) as TotalContextProps;
  const {button48432, setbutton48432}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9d, settotal_employee_tablee4e9d}= useContext(TotalContext) as TotalContextProps;
  const {total_employee_tablee4e9dProps, settotal_employee_tablee4e9dProps}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps, setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258, setaccess_req_groupb1258}= useContext(TotalContext) as TotalContextProps;
  const {access_req_groupb1258Props, setaccess_req_groupb1258Props}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167, setacc_group3b167}= useContext(TotalContext) as TotalContextProps;
  const {acc_group3b167Props, setacc_group3b167Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aac, setaccess_req_tablec5aac}= useContext(TotalContext) as TotalContextProps;
  const {access_req_tablec5aacProps, setaccess_req_tablec5aacProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const employee_table_group55008Ref = useRef(employee_table_group55008);
  useEffect(() => {
    employee_table_group55008Ref.current = employee_table_group55008;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [employee_table_group55008]);
  
  //group props in ref to access latest props value
  const employee_table_group55008PropsRef = useRef(employee_table_group55008Props);
  useEffect(() => {
    employee_table_group55008PropsRef.current = employee_table_group55008Props;
  }, [employee_table_group55008Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['header_group'] = header_groupf778a,
        codeStates['setheader_group'] = setheader_groupf778a,
        codeStates['header_groupf778a'] = header_groupf778aProps,
        codeStates['setheader_groupf778a'] = setheader_groupf778aProps,
        codeStates['hrm_dashboard_group'] = hrm_dashboard_group4d6cb,
        codeStates['sethrm_dashboard_group'] = sethrm_dashboard_group4d6cb,
        codeStates['hrm_dashboard_group4d6cb'] = hrm_dashboard_group4d6cbProps,
        codeStates['sethrm_dashboard_group4d6cb'] = sethrm_dashboard_group4d6cbProps,
        codeStates['total_employees_group'] = total_employees_group69aa9,
        codeStates['settotal_employees_group'] = settotal_employees_group69aa9,
        codeStates['total_employees_group69aa9'] = total_employees_group69aa9Props,
        codeStates['settotal_employees_group69aa9'] = settotal_employees_group69aa9Props,
        codeStates['pending_access_req_group'] = pending_access_req_groupb5bd4,
        codeStates['setpending_access_req_group'] = setpending_access_req_groupb5bd4,
        codeStates['pending_access_req_groupb5bd4'] = pending_access_req_groupb5bd4Props,
        codeStates['setpending_access_req_groupb5bd4'] = setpending_access_req_groupb5bd4Props,
        codeStates['leave_requests_group'] = leave_requests_group4beb5,
        codeStates['setleave_requests_group'] = setleave_requests_group4beb5,
        codeStates['leave_requests_group4beb5'] = leave_requests_group4beb5Props,
        codeStates['setleave_requests_group4beb5'] = setleave_requests_group4beb5Props,
        codeStates['onboarding_group'] = onboarding_group2580d,
        codeStates['setonboarding_group'] = setonboarding_group2580d,
        codeStates['onboarding_group2580d'] = onboarding_group2580dProps,
        codeStates['setonboarding_group2580d'] = setonboarding_group2580dProps,
        codeStates['table_group'] = table_groupe0a6f,
        codeStates['settable_group'] = settable_groupe0a6f,
        codeStates['table_groupe0a6f'] = table_groupe0a6fProps,
        codeStates['settable_groupe0a6f'] = settable_groupe0a6fProps,
        codeStates['subscreen'] = subscreen1c010,
        codeStates['setsubscreen'] = setsubscreen1c010,
        codeStates['subscreen1c010'] = subscreen1c010Props,
        codeStates['setsubscreen1c010'] = setsubscreen1c010Props,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f,
        codeStates['ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = ct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547f'] = setct006_af_uf_ufws_ecp_hrm_totalemployees_v1f547fProps,
        codeStates['employee_table_group'] = employee_table_group55008,
        codeStates['setemployee_table_group'] = setemployee_table_group55008,
        codeStates['employee_table_group55008'] = employee_table_group55008Props,
        codeStates['setemployee_table_group55008'] = setemployee_table_group55008Props,
        codeStates['emp_group'] = emp_group5e40b,
        codeStates['setemp_group'] = setemp_group5e40b,
        codeStates['emp_group5e40b'] = emp_group5e40bProps,
        codeStates['setemp_group5e40b'] = setemp_group5e40bProps,
        codeStates['button'] = button48432,
        codeStates['setbutton'] = setbutton48432,
        codeStates['total_employee_table'] = total_employee_tablee4e9d,
        codeStates['settotal_employee_table'] = settotal_employee_tablee4e9d,
        codeStates['total_employee_tablee4e9d'] = total_employee_tablee4e9dProps,
        codeStates['settotal_employee_tablee4e9d'] = settotal_employee_tablee4e9dProps,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe,
        codeStates['ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = ct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfe'] = setct006_af_uf_ufws_ecp_hrm_pendingaccessrequest_v1adcfeProps,
        codeStates['access_req_group'] = access_req_groupb1258,
        codeStates['setaccess_req_group'] = setaccess_req_groupb1258,
        codeStates['access_req_groupb1258'] = access_req_groupb1258Props,
        codeStates['setaccess_req_groupb1258'] = setaccess_req_groupb1258Props,
        codeStates['acc_group'] = acc_group3b167,
        codeStates['setacc_group'] = setacc_group3b167,
        codeStates['acc_group3b167'] = acc_group3b167Props,
        codeStates['setacc_group3b167'] = setacc_group3b167Props,
        codeStates['access_req_table'] = access_req_tablec5aac,
        codeStates['setaccess_req_table'] = setaccess_req_tablec5aac,
        codeStates['access_req_tablec5aac'] = access_req_tablec5aacProps,
        codeStates['setaccess_req_tablec5aac'] = setaccess_req_tablec5aacProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {hrmdashboard_v1, sethrmdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...employee_table_group55008Ref.current};
      let parentRowSpan = 108;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1159bed8870343229c7ee5a629a55008",
        "6abc672b2b69407d92490fd139a48432"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))

    /////////
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "button48432") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "6abc672b2b69407d92490fd139a48432") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button48432");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button48432?.trigger) return;
      if(button48432?.trigger){
      setbutton48432((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button48432?.trigger])

  useEffect(()=>{
    if(button48432?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button48432?.refresh])
  

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

  const handleClick=async(showModal: boolean = true)=>{
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setemployee_table_group55008((prev: any) => ({ ...prev, button: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setemployee_table_group55008((prev: any) => ({ ...prev, button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setemployee_table_group55008((prev: any) => ({ ...prev, button: false }));
    }
  }

 if (button48432?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `21 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {button48432?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineSearch"
          iconDisplay='Start with Icon'
        >
          {keyset("Search")}
        </Button>}
      </div>
    
  )
}

export default Buttonbutton

