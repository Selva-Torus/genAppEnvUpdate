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
 

const Buttonsearch = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {overall_ai_data_class7e3b7, setoverall_ai_data_class7e3b7}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class7e3b7Props, setoverall_ai_data_class7e3b7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854, setai_dataclass_group81854}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854Props, setai_dataclass_group81854Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68, setai_registry_text_group57c68}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68Props, setai_registry_text_group57c68Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button98127, setrefresh_button98127}= useContext(TotalContext) as TotalContextProps;
  const {search6a089, setsearch6a089}= useContext(TotalContext) as TotalContextProps;
  const {add_asset_dataclass50191, setadd_asset_dataclass50191}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39c, setai_dataclass_tabledf39c}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39cProps, setai_dataclass_tabledf39cProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_dataclass_group81854Ref = useRef(ai_dataclass_group81854);
  useEffect(() => {
    ai_dataclass_group81854Ref.current = ai_dataclass_group81854;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_dataclass_group81854]);
  
  //group props in ref to access latest props value
  const ai_dataclass_group81854PropsRef = useRef(ai_dataclass_group81854Props);
  useEffect(() => {
    ai_dataclass_group81854PropsRef.current = ai_dataclass_group81854Props;
  }, [ai_dataclass_group81854Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_ai_data_class'] = overall_ai_data_class7e3b7,
        codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class7e3b7,
        codeStates['overall_ai_data_class7e3b7'] = overall_ai_data_class7e3b7Props,
        codeStates['setoverall_ai_data_class7e3b7'] = setoverall_ai_data_class7e3b7Props,
        codeStates['ai_dataclass_group'] = ai_dataclass_group81854,
        codeStates['setai_dataclass_group'] = setai_dataclass_group81854,
        codeStates['ai_dataclass_group81854'] = ai_dataclass_group81854Props,
        codeStates['setai_dataclass_group81854'] = setai_dataclass_group81854Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group57c68,
        codeStates['setai_registry_text_group'] = setai_registry_text_group57c68,
        codeStates['ai_registry_text_group57c68'] = ai_registry_text_group57c68Props,
        codeStates['setai_registry_text_group57c68'] = setai_registry_text_group57c68Props,
        codeStates['refresh_button'] = refresh_button98127,
        codeStates['setrefresh_button'] = setrefresh_button98127,
        codeStates['search'] = search6a089,
        codeStates['setsearch'] = setsearch6a089,
        codeStates['add_asset_dataclass'] = add_asset_dataclass50191,
        codeStates['setadd_asset_dataclass'] = setadd_asset_dataclass50191,
        codeStates['ai_dataclass_table'] = ai_dataclass_tabledf39c,
        codeStates['setai_dataclass_table'] = setai_dataclass_tabledf39c,
        codeStates['ai_dataclass_tabledf39c'] = ai_dataclass_tabledf39cProps,
        codeStates['setai_dataclass_tabledf39c'] = setai_dataclass_tabledf39cProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {aidataclasslist_v1, setaidataclasslist_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_dataclass_group81854Ref.current,...data};
      let parentRowSpan = 150;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "c566206ad50bb6f783c2724572b81854",
        "64b94108132c197f08d21e26f956a089"
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
      if (id === "search6a089") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "64b94108132c197f08d21e26f956a089") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search6a089");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!search6a089?.trigger) return;
      if(search6a089?.trigger){
      setsearch6a089((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search6a089?.trigger])

  useEffect(()=>{
    if(search6a089?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search6a089?.refresh])
  

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
        setai_dataclass_group81854((prev: any) => ({ ...prev, search: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_dataclass_group81854((prev: any) => ({ ...prev, search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setai_dataclass_group81854((prev: any) => ({ ...prev, search: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }

 if (search6a089?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `19 / 22`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {search6a089?.isDisabled ? true : false}
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

export default Buttonsearch

