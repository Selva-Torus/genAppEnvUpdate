'use client'






import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
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
import { Rangerscan, Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { v4 as uuidv4 } from 'uuid';
import { clampTransactionIndex, getTransactionAt, getTransactionNames, removeTransaction } from '@/app/utils/scanQueue';
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
 

const Buttoncancel_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const { token } = useGlobal();
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
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
  const handleDfdRefresh = useHandleDfdRefresh();

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const allState:any= useContext(TotalContext) as TotalContextProps;
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
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps;
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1, setdynamicactions62ac1}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions62ac1Props, setdynamicactions62ac1Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnca54e, setcancel_btnca54e}= useContext(TotalContext) as TotalContextProps;
  const {reject_btn37dc6, setreject_btn37dc6}= useContext(TotalContext) as TotalContextProps;
  const {approved_btn6dec4, setapproved_btn6dec4}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions62ac1Ref = useRef(dynamicactions62ac1);
  useEffect(() => {
    dynamicactions62ac1Ref.current = dynamicactions62ac1;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions62ac1]);
  
  //group props in ref to access latest props value
  const dynamicactions62ac1PropsRef = useRef(dynamicactions62ac1Props);
  useEffect(() => {
    dynamicactions62ac1PropsRef.current = dynamicactions62ac1Props;
  }, [dynamicactions62ac1Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['add_group'] = add_groupac52e,
        codeStates['setadd_group'] = setadd_groupac52e,
        codeStates['add_groupac52e'] = add_groupac52eProps,
        codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
        codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
        codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
        codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
        codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
        codeStates['group'] = group73b09,
        codeStates['setgroup'] = setgroup73b09,
        codeStates['group73b09'] = group73b09Props,
        codeStates['setgroup73b09'] = setgroup73b09Props,
        codeStates['schedule_group'] = schedule_groupc0bee,
        codeStates['setschedule_group'] = setschedule_groupc0bee,
        codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
        codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
        codeStates['status_group'] = status_groupc59b9,
        codeStates['setstatus_group'] = setstatus_groupc59b9,
        codeStates['status_groupc59b9'] = status_groupc59b9Props,
        codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
        codeStates['add_rule_condition'] = add_rule_condition96c45,
        codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
        codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
        codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
        codeStates['dynamicactions'] = dynamicactions62ac1,
        codeStates['setdynamicactions'] = setdynamicactions62ac1,
        codeStates['dynamicactions62ac1'] = dynamicactions62ac1Props,
        codeStates['setdynamicactions62ac1'] = setdynamicactions62ac1Props,
        codeStates['cancel_btn'] = cancel_btnca54e,
        codeStates['setcancel_btn'] = setcancel_btnca54e,
        codeStates['reject_btn'] = reject_btn37dc6,
        codeStates['setreject_btn'] = setreject_btn37dc6,
        codeStates['approved_btn'] = approved_btn6dec4,
        codeStates['setapproved_btn'] = setapproved_btn6dec4,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {addreviewscreen_v1, setaddreviewscreen_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...dynamicactions62ac1Ref.current,...data};
      let parentRowSpan = 7;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "931cb10a22fe2c6a8f1771251ee62ac1",
        "20099255157eaa15c84d2dbb0c0ca54e"
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
    }else if(dynamicactions62ac1Props?.isHaveRule==true){
      if("cancel_btn" in dynamicactions62ac1Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions62ac1Props?.dynamicActionRule?.cancel_btn,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("cancel_btn" in addreviewscreen_v1?.dynamicactions && addreviewscreen_v1?.dynamicactions["cancel_btn"]?.itsHaveArtifact== true)
      {
        setShowFlag(addreviewscreen_v1?.dynamicactions["cancel_btn"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(addreviewscreen_v1?.dynamicactions?.cancel_btn?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "cancel_btnca54e") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "20099255157eaa15c84d2dbb0c0ca54e") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_btnca54e");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_btnca54e?.trigger) return;
      if(cancel_btnca54e?.trigger){
      setcancel_btnca54e((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_btnca54e?.trigger])

  useEffect(()=>{
    if(cancel_btnca54e?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_btnca54e?.refresh])
  

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

  useEffect(() => {
    return () => {
      // Leaving the screen → wipe validation results and the Save counter
      setValidate((pre: any) => ({ ...pre, addReviewScreen_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setdynamicactions62ac1((prev: any) => ({ ...prev, cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'addreviewscreen');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions62ac1((prev: any) => ({ ...prev, cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdynamicactions62ac1((prev: any) => ({ ...prev, cancel_btn: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
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

  }, [addreviewscreen_v1?.dynamicactions?.cancel_btn,dynamicactions62ac1Props?.dynamicActionRule?.cancel_btn,])
 if (cancel_btnca54e?.isHidden) {
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
          view='action'
          disabled= {cancel_btnca54e?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_btn

