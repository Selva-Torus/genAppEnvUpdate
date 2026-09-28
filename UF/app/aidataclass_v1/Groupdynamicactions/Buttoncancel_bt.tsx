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

  const {overall_ai_asset_registryb99cd, setoverall_ai_asset_registryb99cd}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryb99cdProps, setoverall_ai_asset_registryb99cdProps}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907, setregister_ai_asset_group01907}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group01907Props, setregister_ai_asset_group01907Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421, setasset_identity_groupfe421}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421Props, setasset_identity_groupfe421Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938, setdynamicactions92938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938Props, setdynamicactions92938Props}= useContext(TotalContext) as TotalContextProps;
  const {cancel_bt10c86, setcancel_bt10c86}= useContext(TotalContext) as TotalContextProps;
  const {update_bt845af, setupdate_bt845af}= useContext(TotalContext) as TotalContextProps;
  const {save_btd6946, setsave_btd6946}= useContext(TotalContext) as TotalContextProps;
  const {aidataclasslist_v1Props, setaidataclasslist_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicactions92938Ref = useRef(dynamicactions92938);
  useEffect(() => {
    dynamicactions92938Ref.current = dynamicactions92938;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicactions92938]);
  
  //group props in ref to access latest props value
  const dynamicactions92938PropsRef = useRef(dynamicactions92938Props);
  useEffect(() => {
    dynamicactions92938PropsRef.current = dynamicactions92938Props;
  }, [dynamicactions92938Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryb99cd,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryb99cd,
        codeStates['overall_ai_asset_registryb99cd'] = overall_ai_asset_registryb99cdProps,
        codeStates['setoverall_ai_asset_registryb99cd'] = setoverall_ai_asset_registryb99cdProps,
        codeStates['register_ai_asset_group'] = register_ai_asset_group01907,
        codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group01907,
        codeStates['register_ai_asset_group01907'] = register_ai_asset_group01907Props,
        codeStates['setregister_ai_asset_group01907'] = setregister_ai_asset_group01907Props,
        codeStates['asset_identity_group'] = asset_identity_groupfe421,
        codeStates['setasset_identity_group'] = setasset_identity_groupfe421,
        codeStates['asset_identity_groupfe421'] = asset_identity_groupfe421Props,
        codeStates['setasset_identity_groupfe421'] = setasset_identity_groupfe421Props,
        codeStates['dynamicactions'] = dynamicactions92938,
        codeStates['setdynamicactions'] = setdynamicactions92938,
        codeStates['dynamicactions92938'] = dynamicactions92938Props,
        codeStates['setdynamicactions92938'] = setdynamicactions92938Props,
        codeStates['cancel_bt'] = cancel_bt10c86,
        codeStates['setcancel_bt'] = setcancel_bt10c86,
        codeStates['update_bt'] = update_bt845af,
        codeStates['setupdate_bt'] = setupdate_bt845af,
        codeStates['save_bt'] = save_btd6946,
        codeStates['setsave_bt'] = setsave_btd6946,
        codeStates['aidataclasslist_v1'] = aidataclasslist_v1Props,
        codeStates['setaidataclasslist_v1'] = setaidataclasslist_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {aidataclass_v1, setaidataclass_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...dynamicactions92938Ref.current,...data};
      let parentRowSpan = 7;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4d3fb00d7c9fc1fd827d9768dc692938",
        "9b6427afa36a66d165a02b8a56710c86"
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
    }else if(dynamicactions92938Props?.isHaveRule==true){
      if("cancel_bt" in dynamicactions92938Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicactions92938Props?.dynamicActionRule?.cancel_bt,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("cancel_bt" in aidataclass_v1?.dynamicactions && aidataclass_v1?.dynamicactions["cancel_bt"]?.itsHaveArtifact== true)
      {
        setShowFlag(aidataclass_v1?.dynamicactions["cancel_bt"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(aidataclass_v1?.dynamicactions?.cancel_bt?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
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
      if (id === "cancel_bt10c86") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "9b6427afa36a66d165a02b8a56710c86") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_bt10c86");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_bt10c86?.trigger) return;
      if(cancel_bt10c86?.trigger){
      setcancel_bt10c86((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_bt10c86?.trigger])

  useEffect(()=>{
    if(cancel_bt10c86?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_bt10c86?.refresh])
  

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
        setdynamicactions92938((prev: any) => ({ ...prev, cancel_bt: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_ai_asset_registryb99cd,...register_ai_asset_group01907,...asset_identity_groupfe421,...dynamicactions92938});
    setaidataclasslist_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIDataClassList:AFVK:v1', 'aidataclasslist_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicactions92938((prev: any) => ({ ...prev, cancel_bt: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdynamicactions92938((prev: any) => ({ ...prev, cancel_bt: false }));
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

  }, [aidataclass_v1?.dynamicactions?.cancel_bt,dynamicactions92938Props?.dynamicActionRule?.cancel_bt,])

 if (cancel_bt10c86?.isHidden) {
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
          disabled= {cancel_bt10c86?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_bt

