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

  const {assign_asset_groupdb5a7, setassign_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupdb5a7Props, setassign_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144, setassignment_information_group5d144}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_group5d144Props, setassignment_information_group5d144Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60d, setassignment_details_group7f60d}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group7f60dProps, setassignment_details_group7f60dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956ba, setdynamicactions956ba}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions956baProps, setdynamicactions956baProps}= useContext(TotalContext) as TotalContextProps;
  const {button_cancel83d84, setbutton_cancel83d84}= useContext(TotalContext) as TotalContextProps;
  const {button_updatedc4e0, setbutton_updatedc4e0}= useContext(TotalContext) as TotalContextProps;
  const {assign090a4, setassign090a4}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions956baRef = useRef(dynamicactions956ba);
  useEffect(() => {
    dynamicactions956baRef.current = dynamicactions956ba;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions956ba]);
  
  //group props in ref to access latest props value
  const dynamicactions956baPropsRef = useRef(dynamicactions956baProps);
  useEffect(() => {
    dynamicactions956baPropsRef.current = dynamicactions956baProps;
  }, [dynamicactions956baProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['assign_asset_group'] = assign_asset_groupdb5a7,
        codeStates['setassign_asset_group'] = setassign_asset_groupdb5a7,
        codeStates['assign_asset_groupdb5a7'] = assign_asset_groupdb5a7Props,
        codeStates['setassign_asset_groupdb5a7'] = setassign_asset_groupdb5a7Props,
        codeStates['assignment_information_group'] = assignment_information_group5d144,
        codeStates['setassignment_information_group'] = setassignment_information_group5d144,
        codeStates['assignment_information_group5d144'] = assignment_information_group5d144Props,
        codeStates['setassignment_information_group5d144'] = setassignment_information_group5d144Props,
        codeStates['assignment_details_group'] = assignment_details_group7f60d,
        codeStates['setassignment_details_group'] = setassignment_details_group7f60d,
        codeStates['assignment_details_group7f60d'] = assignment_details_group7f60dProps,
        codeStates['setassignment_details_group7f60d'] = setassignment_details_group7f60dProps,
        codeStates['dynamicactions'] = dynamicactions956ba,
        codeStates['setdynamicactions'] = setdynamicactions956ba,
        codeStates['dynamicactions956ba'] = dynamicactions956baProps,
        codeStates['setdynamicactions956ba'] = setdynamicactions956baProps,
        codeStates['button_cancel'] = button_cancel83d84,
        codeStates['setbutton_cancel'] = setbutton_cancel83d84,
        codeStates['button_update'] = button_updatedc4e0,
        codeStates['setbutton_update'] = setbutton_updatedc4e0,
        codeStates['assign'] = assign090a4,
        codeStates['setassign'] = setassign090a4,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assignasset_v1, setassignasset_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...dynamicactions956baRef.current};
      let parentRowSpan = 8;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "fc36e97cb2554510a1b8d282b5a956ba",
        "1244a28b3b2b4d95950c8ddc51c83d84"
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
    }else if(dynamicactions956baProps?.isHaveRule==true){
      if("button_cancel" in dynamicactions956baProps?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions956baProps?.dynamicActionRule?.button_cancel,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("button_cancel" in assignasset_v1?.dynamicactions && assignasset_v1?.dynamicactions["button_cancel"]?.itsHaveArtifact== true)
      {
        setShowFlag(assignasset_v1?.dynamicactions["button_cancel"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(assignasset_v1?.dynamicactions?.button_cancel?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "button_cancel83d84") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "1244a28b3b2b4d95950c8ddc51c83d84") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button_cancel83d84");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button_cancel83d84?.trigger) return;
      if(button_cancel83d84?.trigger){
      setbutton_cancel83d84((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button_cancel83d84?.trigger])

  useEffect(()=>{
    if(button_cancel83d84?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button_cancel83d84?.refresh])

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
        setdynamicactions956ba((prev: any) => ({ ...prev, button_cancel: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'assignasset');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions956ba((prev: any) => ({ ...prev, button_cancel: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setdynamicactions956ba((prev: any) => ({ ...prev, button_cancel: false }));
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

  }, [assignasset_v1?.dynamicactions?.button_cancel,dynamicactions956baProps?.dynamicActionRule?.button_cancel,])

 if (button_cancel83d84?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className=" p-1   !rounded-lg"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {button_cancel83d84?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdCancel"
          iconDisplay='Start with Icon'
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttonbutton_cancel

