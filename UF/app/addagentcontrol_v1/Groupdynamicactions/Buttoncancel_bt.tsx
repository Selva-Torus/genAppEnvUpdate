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
import { Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
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
 

const Buttoncancel_bt = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {overall_ai_asset_registryfa224, setoverall_ai_asset_registryfa224}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryfa224Props, setoverall_ai_asset_registryfa224Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43f, setregister_ai_asset_group9d43f}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group9d43fProps, setregister_ai_asset_group9d43fProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641, setmodel_info_group5b641}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group5b641Props, setmodel_info_group5b641Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6f, setgrounding_groupb1b6f}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupb1b6fProps, setgrounding_groupb1b6fProps}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206, setvalidation_group4d206}= useContext(TotalContext) as TotalContextProps;
  const {validation_group4d206Props, setvalidation_group4d206Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5, setdynamicactions78fa5}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions78fa5Props, setdynamicactions78fa5Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_bt65b7b, setcancel_bt65b7b}= useContext(TotalContext) as TotalContextProps;
  const {update_btb6a02, setupdate_btb6a02}= useContext(TotalContext) as TotalContextProps;
  const {save_btb8eab, setsave_btb8eab}= useContext(TotalContext) as TotalContextProps;
  const {aiagentcontrol_v1Props, setaiagentcontrol_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions78fa5Ref = useRef(dynamicactions78fa5);
  useEffect(() => {
    dynamicactions78fa5Ref.current = dynamicactions78fa5;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions78fa5]);
  
  //group props in ref to access latest props value
  const dynamicactions78fa5PropsRef = useRef(dynamicactions78fa5Props);
  useEffect(() => {
    dynamicactions78fa5PropsRef.current = dynamicactions78fa5Props;
  }, [dynamicactions78fa5Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryfa224,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryfa224,
        codeStates['overall_ai_asset_registryfa224'] = overall_ai_asset_registryfa224Props,
        codeStates['setoverall_ai_asset_registryfa224'] = setoverall_ai_asset_registryfa224Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group9d43f,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group9d43f,
        codeStates['register_ai_asset_group9d43f'] = register_ai_asset_group9d43fProps,
        codeStates['setregister_ai_asset_group9d43f'] = setregister_ai_asset_group9d43fProps,
        codeStates['model_info_group'] = model_info_group5b641,
        codeStates['setmodel_info_group'] = setmodel_info_group5b641,
        codeStates['model_info_group5b641'] = model_info_group5b641Props,
        codeStates['setmodel_info_group5b641'] = setmodel_info_group5b641Props,
        codeStates['grounding_group'] = grounding_groupb1b6f,
        codeStates['setgrounding_group'] = setgrounding_groupb1b6f,
        codeStates['grounding_groupb1b6f'] = grounding_groupb1b6fProps,
        codeStates['setgrounding_groupb1b6f'] = setgrounding_groupb1b6fProps,
        codeStates['validation_group'] = validation_group4d206,
        codeStates['setvalidation_group'] = setvalidation_group4d206,
        codeStates['validation_group4d206'] = validation_group4d206Props,
        codeStates['setvalidation_group4d206'] = setvalidation_group4d206Props,
        codeStates['dynamicactions'] = dynamicactions78fa5,
        codeStates['setdynamicactions'] = setdynamicactions78fa5,
        codeStates['dynamicactions78fa5'] = dynamicactions78fa5Props,
        codeStates['setdynamicactions78fa5'] = setdynamicactions78fa5Props,
        codeStates['cancel_bt'] = cancel_bt65b7b,
        codeStates['setcancel_bt'] = setcancel_bt65b7b,
        codeStates['update_bt'] = update_btb6a02,
        codeStates['setupdate_bt'] = setupdate_btb6a02,
        codeStates['save_bt'] = save_btb8eab,
        codeStates['setsave_bt'] = setsave_btb8eab,
        codeStates['aiagentcontrol_v1'] = aiagentcontrol_v1Props,
        codeStates['setaiagentcontrol_v1'] = setaiagentcontrol_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {addagentcontrol_v1, setaddagentcontrol_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...dynamicactions78fa5Ref.current,...data};
      let parentRowSpan = 7;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d7e434bb861ed357518bea4388b78fa5",
        "741cad87fab0ac5ea40bd1be08765b7b"
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
    }else if(dynamicactions78fa5Props?.isHaveRule==true){
      if("cancel_bt" in dynamicactions78fa5Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions78fa5Props?.dynamicActionRule?.cancel_bt,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("cancel_bt" in addagentcontrol_v1?.dynamicactions && addagentcontrol_v1?.dynamicactions["cancel_bt"]?.itsHaveArtifact== true)
      {
        setShowFlag(addagentcontrol_v1?.dynamicactions["cancel_bt"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(addagentcontrol_v1?.dynamicactions?.cancel_bt?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "cancel_bt65b7b") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "741cad87fab0ac5ea40bd1be08765b7b") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_bt65b7b");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_bt65b7b?.trigger) return;
      if(cancel_bt65b7b?.trigger){
      setcancel_bt65b7b((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_bt65b7b?.trigger])

  useEffect(()=>{
    if(cancel_bt65b7b?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_bt65b7b?.refresh])
  

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
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setdynamicactions78fa5((prev: any) => ({ ...prev, cancel_bt: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_ai_asset_registryfa224,...register_ai_asset_group9d43f,...model_info_group5b641,...grounding_groupb1b6f,...validation_group4d206,...dynamicactions78fa5});
    setaiagentcontrol_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1', 'aiagentcontrol_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions78fa5((prev: any) => ({ ...prev, cancel_bt: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdynamicactions78fa5((prev: any) => ({ ...prev, cancel_bt: false }));
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

  }, [addagentcontrol_v1?.dynamicactions?.cancel_bt,dynamicactions78fa5Props?.dynamicActionRule?.cancel_bt,])

 if (cancel_bt65b7b?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#F4F5FA] hover:!bg-[#E5E7EB] !text-[#374151] !border !border-[#D1D5DB] !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {cancel_bt65b7b?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_bt

