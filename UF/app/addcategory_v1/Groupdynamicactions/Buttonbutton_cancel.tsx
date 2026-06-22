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
 

const Buttonbutton_cancel = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {category_groupe3ebd, setcategory_groupe3ebd}= useContext(TotalContext) as TotalContextProps;
  const {category_groupe3ebdProps, setcategory_groupe3ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68a, setcategory_information_groupfb68a}= useContext(TotalContext) as TotalContextProps;
  const {category_information_groupfb68aProps, setcategory_information_groupfb68aProps}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6af, setcategory_configuration_group5d6af}= useContext(TotalContext) as TotalContextProps;
  const {category_configuration_group5d6afProps, setcategory_configuration_group5d6afProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884, setdynamicactions13884}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions13884Props, setdynamicactions13884Props}= useContext(TotalContext) as TotalContextProps;
  const {button_cancel847fd, setbutton_cancel847fd}= useContext(TotalContext) as TotalContextProps;
  const {button_update74a1f, setbutton_update74a1f}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_category240df, setbt_add_category240df}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions13884Ref = useRef(dynamicactions13884);
  useEffect(() => {
    dynamicactions13884Ref.current = dynamicactions13884;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions13884]);
  
  //group props in ref to access latest props value
  const dynamicactions13884PropsRef = useRef(dynamicactions13884Props);
  useEffect(() => {
    dynamicactions13884PropsRef.current = dynamicactions13884Props;
  }, [dynamicactions13884Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['category_group'] = category_groupe3ebd,
        codeStates['setcategory_group'] = setcategory_groupe3ebd,
        codeStates['category_groupe3ebd'] = category_groupe3ebdProps,
        codeStates['setcategory_groupe3ebd'] = setcategory_groupe3ebdProps,
        codeStates['category_information_group'] = category_information_groupfb68a,
        codeStates['setcategory_information_group'] = setcategory_information_groupfb68a,
        codeStates['category_information_groupfb68a'] = category_information_groupfb68aProps,
        codeStates['setcategory_information_groupfb68a'] = setcategory_information_groupfb68aProps,
        codeStates['category_configuration_group'] = category_configuration_group5d6af,
        codeStates['setcategory_configuration_group'] = setcategory_configuration_group5d6af,
        codeStates['category_configuration_group5d6af'] = category_configuration_group5d6afProps,
        codeStates['setcategory_configuration_group5d6af'] = setcategory_configuration_group5d6afProps,
        codeStates['dynamicactions'] = dynamicactions13884,
        codeStates['setdynamicactions'] = setdynamicactions13884,
        codeStates['dynamicactions13884'] = dynamicactions13884Props,
        codeStates['setdynamicactions13884'] = setdynamicactions13884Props,
        codeStates['button_cancel'] = button_cancel847fd,
        codeStates['setbutton_cancel'] = setbutton_cancel847fd,
        codeStates['button_update'] = button_update74a1f,
        codeStates['setbutton_update'] = setbutton_update74a1f,
        codeStates['bt_add_category'] = bt_add_category240df,
        codeStates['setbt_add_category'] = setbt_add_category240df,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {addcategory_v1, setaddcategory_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...dynamicactions13884Ref.current};
      let parentRowSpan = 8;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1e732150ff2740f495eee7f741a13884",
        "a92160bdca994b94bfa596d6429847fd"
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
    }else if(dynamicactions13884Props?.isHaveRule==true){
      if("button_cancel" in dynamicactions13884Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions13884Props?.dynamicActionRule?.button_cancel,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("button_cancel" in addcategory_v1?.dynamicactions && addcategory_v1?.dynamicactions["button_cancel"]?.itsHaveArtifact== true)
      {
        setShowFlag(addcategory_v1?.dynamicactions["button_cancel"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(addcategory_v1?.dynamicactions?.button_cancel?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "button_cancel847fd") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "a92160bdca994b94bfa596d6429847fd") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button_cancel847fd");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button_cancel847fd?.trigger) return;
      if(button_cancel847fd?.trigger){
      setbutton_cancel847fd((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button_cancel847fd?.trigger])

  useEffect(()=>{
    if(button_cancel847fd?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button_cancel847fd?.refresh])

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
        setdynamicactions13884((prev: any) => ({ ...prev, button_cancel: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'addcategory');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions13884((prev: any) => ({ ...prev, button_cancel: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setdynamicactions13884((prev: any) => ({ ...prev, button_cancel: false }));
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

  }, [addcategory_v1?.dynamicactions?.button_cancel,dynamicactions13884Props?.dynamicActionRule?.button_cancel,])

 if (button_cancel847fd?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className=" p-1  !rounded-lg"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {button_cancel847fd?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttonbutton_cancel

