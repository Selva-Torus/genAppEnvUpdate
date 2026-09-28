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

  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_bt113a2, setcancel_bt113a2}= useContext(TotalContext) as TotalContextProps;
  const {update_bt2a5c4, setupdate_bt2a5c4}= useContext(TotalContext) as TotalContextProps;
  const {save_bt445a1, setsave_bt445a1}= useContext(TotalContext) as TotalContextProps;
  const {aimodeldetails_v1Props, setaimodeldetails_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions16b90Ref = useRef(dynamicactions16b90);
  useEffect(() => {
    dynamicactions16b90Ref.current = dynamicactions16b90;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions16b90]);
  
  //group props in ref to access latest props value
  const dynamicactions16b90PropsRef = useRef(dynamicactions16b90Props);
  useEffect(() => {
    dynamicactions16b90PropsRef.current = dynamicactions16b90Props;
  }, [dynamicactions16b90Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
        codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
        codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
        codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
        codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
        codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
        codeStates['model_info_group'] = model_info_group905fc,
        codeStates['setmodel_info_group'] = setmodel_info_group905fc,
        codeStates['model_info_group905fc'] = model_info_group905fcProps,
        codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
        codeStates['grounding_group'] = grounding_group4df86,
        codeStates['setgrounding_group'] = setgrounding_group4df86,
        codeStates['grounding_group4df86'] = grounding_group4df86Props,
        codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
        codeStates['validation_group'] = validation_group50e82,
        codeStates['setvalidation_group'] = setvalidation_group50e82,
        codeStates['validation_group50e82'] = validation_group50e82Props,
        codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
        codeStates['dynamicactions'] = dynamicactions16b90,
        codeStates['setdynamicactions'] = setdynamicactions16b90,
        codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
        codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
        codeStates['cancel_bt'] = cancel_bt113a2,
        codeStates['setcancel_bt'] = setcancel_bt113a2,
        codeStates['update_bt'] = update_bt2a5c4,
        codeStates['setupdate_bt'] = setupdate_bt2a5c4,
        codeStates['save_bt'] = save_bt445a1,
        codeStates['setsave_bt'] = setsave_bt445a1,
        codeStates['aimodeldetails_v1'] = aimodeldetails_v1Props,
        codeStates['setaimodeldetails_v1'] = setaimodeldetails_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {addaimodels_v1, setaddaimodels_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...dynamicactions16b90Ref.current,...data};
      let parentRowSpan = 7;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "5b2818c88a2e2c8f8837f17a72716b90",
        "68d18ddd8131aebdf90a87cfd46113a2"
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
    }else if(dynamicactions16b90Props?.isHaveRule==true){
      if("cancel_bt" in dynamicactions16b90Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions16b90Props?.dynamicActionRule?.cancel_bt,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("cancel_bt" in addaimodels_v1?.dynamicactions && addaimodels_v1?.dynamicactions["cancel_bt"]?.itsHaveArtifact== true)
      {
        setShowFlag(addaimodels_v1?.dynamicactions["cancel_bt"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(addaimodels_v1?.dynamicactions?.cancel_bt?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "cancel_bt113a2") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "68d18ddd8131aebdf90a87cfd46113a2") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_bt113a2");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_bt113a2?.trigger) return;
      if(cancel_bt113a2?.trigger){
      setcancel_bt113a2((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_bt113a2?.trigger])

  useEffect(()=>{
    if(cancel_bt113a2?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_bt113a2?.refresh])
  

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
        setdynamicactions16b90((prev: any) => ({ ...prev, cancel_bt: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_ai_asset_registry61215,...register_ai_asset_group1b724,...model_info_group905fc,...grounding_group4df86,...validation_group50e82,...dynamicactions16b90});
    setaimodeldetails_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIModelDetails:AFVK:v1', 'aimodeldetails_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions16b90((prev: any) => ({ ...prev, cancel_bt: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdynamicactions16b90((prev: any) => ({ ...prev, cancel_bt: false }));
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

  }, [addaimodels_v1?.dynamicactions?.cancel_bt,dynamicactions16b90Props?.dynamicActionRule?.cancel_bt,])

 if (cancel_bt113a2?.isHidden) {
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
          disabled= {cancel_bt113a2?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_bt

