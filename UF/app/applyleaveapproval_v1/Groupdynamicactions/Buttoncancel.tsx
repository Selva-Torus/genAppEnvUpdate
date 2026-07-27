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
 

const Buttoncancel = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {new_access_groupc501f, setnew_access_groupc501f}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc501fProps, setnew_access_groupc501fProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49, setaccess_req__group7ac49}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49Props, setaccess_req__group7ac49Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178, setemp_avail_group11178}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178Props, setemp_avail_group11178Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23, setleave_balance_group98e23}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23Props, setleave_balance_group98e23Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1b, setapp_det_groupe2c1b}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1bProps, setapp_det_groupe2c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086e, setapprove_group4086e}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086eProps, setapprove_group4086eProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fd, setaudit_group087fd}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fdProps, setaudit_group087fdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15, setdynamicactionsafd15}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15Props, setdynamicactionsafd15Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel5617b, setcancel5617b}= useContext(TotalContext) as TotalContextProps;
  const {approve_bt60190, setapprove_bt60190}= useContext(TotalContext) as TotalContextProps;
  const {reject_bt8ac85, setreject_bt8ac85}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactionsafd15Ref = useRef(dynamicactionsafd15);
  useEffect(() => {
    dynamicactionsafd15Ref.current = dynamicactionsafd15;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactionsafd15]);
  
  //group props in ref to access latest props value
  const dynamicactionsafd15PropsRef = useRef(dynamicactionsafd15Props);
  useEffect(() => {
    dynamicactionsafd15PropsRef.current = dynamicactionsafd15Props;
  }, [dynamicactionsafd15Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['new_access_group'] = new_access_groupc501f,
        codeStates['setnew_access_group'] = setnew_access_groupc501f,
        codeStates['new_access_groupc501f'] = new_access_groupc501fProps,
        codeStates['setnew_access_groupc501f'] = setnew_access_groupc501fProps,
        codeStates['access_req__group'] = access_req__group7ac49,
        codeStates['setaccess_req__group'] = setaccess_req__group7ac49,
        codeStates['access_req__group7ac49'] = access_req__group7ac49Props,
        codeStates['setaccess_req__group7ac49'] = setaccess_req__group7ac49Props,
        codeStates['emp_avail_group'] = emp_avail_group11178,
        codeStates['setemp_avail_group'] = setemp_avail_group11178,
        codeStates['emp_avail_group11178'] = emp_avail_group11178Props,
        codeStates['setemp_avail_group11178'] = setemp_avail_group11178Props,
        codeStates['leave_balance_group'] = leave_balance_group98e23,
        codeStates['setleave_balance_group'] = setleave_balance_group98e23,
        codeStates['leave_balance_group98e23'] = leave_balance_group98e23Props,
        codeStates['setleave_balance_group98e23'] = setleave_balance_group98e23Props,
        codeStates['app_det_group'] = app_det_groupe2c1b,
        codeStates['setapp_det_group'] = setapp_det_groupe2c1b,
        codeStates['app_det_groupe2c1b'] = app_det_groupe2c1bProps,
        codeStates['setapp_det_groupe2c1b'] = setapp_det_groupe2c1bProps,
        codeStates['approve_group'] = approve_group4086e,
        codeStates['setapprove_group'] = setapprove_group4086e,
        codeStates['approve_group4086e'] = approve_group4086eProps,
        codeStates['setapprove_group4086e'] = setapprove_group4086eProps,
        codeStates['audit_group'] = audit_group087fd,
        codeStates['setaudit_group'] = setaudit_group087fd,
        codeStates['audit_group087fd'] = audit_group087fdProps,
        codeStates['setaudit_group087fd'] = setaudit_group087fdProps,
        codeStates['dynamicactions'] = dynamicactionsafd15,
        codeStates['setdynamicactions'] = setdynamicactionsafd15,
        codeStates['dynamicactionsafd15'] = dynamicactionsafd15Props,
        codeStates['setdynamicactionsafd15'] = setdynamicactionsafd15Props,
        codeStates['cancel'] = cancel5617b,
        codeStates['setcancel'] = setcancel5617b,
        codeStates['approve_bt'] = approve_bt60190,
        codeStates['setapprove_bt'] = setapprove_bt60190,
        codeStates['reject_bt'] = reject_bt8ac85,
        codeStates['setreject_bt'] = setreject_bt8ac85,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {applyleaveapproval_v1, setapplyleaveapproval_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...dynamicactionsafd15Ref.current};
      let parentRowSpan = 7;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f69e987fef325fc31a092b06868afd15",
        "6e2881d2e7e849cd6f907ba242d5617b"
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
    if(orchestrationData?.data?.rule?.nodes?.length > 0){
      setRulseData(orchestrationData?.data?.rule.nodes)
      let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj,session:decodedTokenObj,...data,...memoryVariables});
      // schemaFlag =schemaFlag.output;
      let order:number = Number(schemaFlag.order);

      // Update grid position based on order number
      
      if (order && typeof order === 'number') {
        const position : any = getGridPositionFromOrder(order,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      } else if( "start" in schemaFlag && "end" in schemaFlag)
      {
        const position : any = getGridPositionFromOrder(schemaFlag,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      }
      else{
        setStyleSate({ pointerEvents: 'auto'})
      } 

      if (schemaFlag.output !== "true") {
        setShowFlag(false);
      }else{
        setShowFlag(true)
      }
    }else if(dynamicactionsafd15Props?.isHaveRule==true){
      if("cancel" in dynamicactionsafd15Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactionsafd15Props?.dynamicActionRule?.cancel,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("cancel" in applyleaveapproval_v1?.dynamicactions && applyleaveapproval_v1?.dynamicactions["cancel"]?.itsHaveArtifact== true)
      {
        setShowFlag(applyleaveapproval_v1?.dynamicactions["cancel"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(applyleaveapproval_v1?.dynamicactions?.cancel?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }else{
        setShowFlag(false)
      }
    }
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "cancel5617b") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "6e2881d2e7e849cd6f907ba242d5617b") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel5617b");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel5617b?.trigger) return;
      if(cancel5617b?.trigger){
      setcancel5617b((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel5617b?.trigger])

  useEffect(()=>{
    if(cancel5617b?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel5617b?.refresh])
  

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
        setdynamicactionsafd15((prev: any) => ({ ...prev, cancel: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'applyleaveapproval');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactionsafd15((prev: any) => ({ ...prev, cancel: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setdynamicactionsafd15((prev: any) => ({ ...prev, cancel: false }));
    }
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

    useEffect(() => {
    let forGetFormDataPointedData = {
      };
      handleMapper(forGetFormDataPointedData);

  }, [applyleaveapproval_v1?.dynamicactions?.cancel,dynamicactionsafd15Props?.dynamicActionRule?.cancel,])

 if (cancel5617b?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#F4F5FA] hover:!bg-[#E5E7EB] !text-[#374151] !rounded-lg !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {cancel5617b?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel

