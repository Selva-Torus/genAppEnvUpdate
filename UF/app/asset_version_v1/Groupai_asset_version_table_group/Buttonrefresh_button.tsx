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
import { unlockai_asset_version_tableRecord as unlocktable4bc40Record } from '@/app/asset_version_v1/Groupai_asset_version_table/Tableai_asset_version_table';
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
 

const Buttonrefresh_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {overall_group75f3d, setoverall_group75f3d}= useContext(TotalContext) as TotalContextProps;
  const {overall_group75f3dProps, setoverall_group75f3dProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group9cca8, setai_asset_version_table_group9cca8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group9cca8Props, setai_asset_version_table_group9cca8Props}= useContext(TotalContext) as TotalContextProps;
  const {text11175, settext11175}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button59124, setrefresh_button59124}= useContext(TotalContext) as TotalContextProps;
  const {search0e25c, setsearch0e25c}= useContext(TotalContext) as TotalContextProps;
  const {new_source7e921, setnew_source7e921}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40, setai_asset_version_table4bc40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40Props, setai_asset_version_table4bc40Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_asset_version_table_group9cca8Ref = useRef(ai_asset_version_table_group9cca8);
  useEffect(() => {
    ai_asset_version_table_group9cca8Ref.current = ai_asset_version_table_group9cca8;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_asset_version_table_group9cca8]);
  
  //group props in ref to access latest props value
  const ai_asset_version_table_group9cca8PropsRef = useRef(ai_asset_version_table_group9cca8Props);
  useEffect(() => {
    ai_asset_version_table_group9cca8PropsRef.current = ai_asset_version_table_group9cca8Props;
  }, [ai_asset_version_table_group9cca8Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_group'] = overall_group75f3d,
        codeStates['setoverall_group'] = setoverall_group75f3d,
        codeStates['overall_group75f3d'] = overall_group75f3dProps,
        codeStates['setoverall_group75f3d'] = setoverall_group75f3dProps,
        codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group9cca8,
        codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group9cca8,
        codeStates['ai_asset_version_table_group9cca8'] = ai_asset_version_table_group9cca8Props,
        codeStates['setai_asset_version_table_group9cca8'] = setai_asset_version_table_group9cca8Props,
        codeStates['text'] = text11175,
        codeStates['settext'] = settext11175,
        codeStates['refresh_button'] = refresh_button59124,
        codeStates['setrefresh_button'] = setrefresh_button59124,
        codeStates['search'] = search0e25c,
        codeStates['setsearch'] = setsearch0e25c,
        codeStates['new_source'] = new_source7e921,
        codeStates['setnew_source'] = setnew_source7e921,
        codeStates['ai_asset_version_table'] = ai_asset_version_table4bc40,
        codeStates['setai_asset_version_table'] = setai_asset_version_table4bc40,
        codeStates['ai_asset_version_table4bc40'] = ai_asset_version_table4bc40Props,
        codeStates['setai_asset_version_table4bc40'] = setai_asset_version_table4bc40Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {aiassetversion_v1, setaiassetversion_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_asset_version_table_group9cca8Ref.current,...data};
      let parentRowSpan = 147;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1affe2b7d8b316bd8e36666c3389cca8",
        "06364592bc59e6eb20e1f1d4edc59124"
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
      if (id === "refresh_button59124") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "06364592bc59e6eb20e1f1d4edc59124") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "refresh_button59124");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!refresh_button59124?.trigger) return;
      if(refresh_button59124?.trigger){
      setrefresh_button59124((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[refresh_button59124?.trigger])

  useEffect(()=>{
    if(refresh_button59124?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[refresh_button59124?.refresh])
  

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
        setai_asset_version_table_group9cca8((prev: any) => ({ ...prev, refresh_button: true }));
        //onClick

    // refreshElement
    //riseListen
    // for group
    if (Array.isArray(ai_asset_version_table4bc40Props?.selectedIds) && ai_asset_version_table4bc40Props.selectedIds.length) {
      await Promise.all(
        ai_asset_version_table4bc40Props.selectedIds.map((id: number) =>
          unlocktable4bc40Record(id, token)
        )
      );
    }
    setai_asset_version_table4bc40Props((pre:any)=>({
      ...pre,
      refresh:!pre?.refresh,
      skipUnlockOnRefresh:true,
      selectedIds:[]
    }));
    setLockedData({}) //Clears lockedData and resets it in subsequent screens.
    lockedData={} //Clears lockedData; clicking the button again without a selection returns no value.
    setValidate({}); 
    setValidateRefetch({
      value:false,
      init:0
    });
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_asset_version_table_group9cca8((prev: any) => ({ ...prev, refresh_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setai_asset_version_table_group9cca8((prev: any) => ({ ...prev, refresh_button: false }));
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

 if (refresh_button59124?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `18 / 19`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-md !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {refresh_button59124?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdAutorenew"
          iconDisplay='Icon only'
        >
          {keyset("")}
        </Button>}
      </div>
    
  )
}

export default Buttonrefresh_button

