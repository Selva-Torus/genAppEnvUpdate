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
import PageAiregistrysearchpage2 from '@/app/airegistrysearch_v1/airegistrysearch_v1page';
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_ai_asset_registry24714, setoverall_ai_asset_registry24714}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry24714Props, setoverall_ai_asset_registry24714Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8, setai_registry_group15bd8}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8Props, setai_registry_group15bd8Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565, setai_registry_text_groupc3565}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565Props, setai_registry_text_groupc3565Props}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button0d91f, setrefresh_button0d91f}= useContext(TotalContext) as TotalContextProps;
  const {searchf8f37, setsearchf8f37}= useContext(TotalContext) as TotalContextProps;
  const {add_ai_registry439c5, setadd_ai_registry439c5}= useContext(TotalContext) as TotalContextProps;
  const {edit_ai_registrya3497, setedit_ai_registrya3497}= useContext(TotalContext) as TotalContextProps;
  const {delete_ai_registry1de8b, setdelete_ai_registry1de8b}= useContext(TotalContext) as TotalContextProps;
  const {customwidget30142, setcustomwidget30142}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3, setai_registry_tablec54a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3Props, setai_registry_tablec54a3Props}= useContext(TotalContext) as TotalContextProps;
  const {airegistrysearch_v1Props, setairegistrysearch_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_registry_group15bd8Ref = useRef(ai_registry_group15bd8);
  useEffect(() => {
    ai_registry_group15bd8Ref.current = ai_registry_group15bd8;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_registry_group15bd8]);
  
  //group props in ref to access latest props value
  const ai_registry_group15bd8PropsRef = useRef(ai_registry_group15bd8Props);
  useEffect(() => {
    ai_registry_group15bd8PropsRef.current = ai_registry_group15bd8Props;
  }, [ai_registry_group15bd8Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry24714,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry24714,
        codeStates['overall_ai_asset_registry24714'] = overall_ai_asset_registry24714Props,
        codeStates['setoverall_ai_asset_registry24714'] = setoverall_ai_asset_registry24714Props,
        codeStates['ai_registry_group'] = ai_registry_group15bd8,
        codeStates['setai_registry_group'] = setai_registry_group15bd8,
        codeStates['ai_registry_group15bd8'] = ai_registry_group15bd8Props,
        codeStates['setai_registry_group15bd8'] = setai_registry_group15bd8Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_groupc3565,
        codeStates['setai_registry_text_group'] = setai_registry_text_groupc3565,
        codeStates['ai_registry_text_groupc3565'] = ai_registry_text_groupc3565Props,
        codeStates['setai_registry_text_groupc3565'] = setai_registry_text_groupc3565Props,
        codeStates['refresh_button'] = refresh_button0d91f,
        codeStates['setrefresh_button'] = setrefresh_button0d91f,
        codeStates['search'] = searchf8f37,
        codeStates['setsearch'] = setsearchf8f37,
        codeStates['add_ai_registry'] = add_ai_registry439c5,
        codeStates['setadd_ai_registry'] = setadd_ai_registry439c5,
        codeStates['edit_ai_registry'] = edit_ai_registrya3497,
        codeStates['setedit_ai_registry'] = setedit_ai_registrya3497,
        codeStates['delete_ai_registry'] = delete_ai_registry1de8b,
        codeStates['setdelete_ai_registry'] = setdelete_ai_registry1de8b,
        codeStates['customwidget'] = customwidget30142,
        codeStates['setcustomwidget'] = setcustomwidget30142,
        codeStates['ai_registry_table'] = ai_registry_tablec54a3,
        codeStates['setai_registry_table'] = setai_registry_tablec54a3,
        codeStates['ai_registry_tablec54a3'] = ai_registry_tablec54a3Props,
        codeStates['setai_registry_tablec54a3'] = setai_registry_tablec54a3Props,
        codeStates['airegistrysearch_v1'] = airegistrysearch_v1Props,
        codeStates['setairegistrysearch_v1'] = setairegistrysearch_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {airegistry_v1, setairegistry_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_registry_group15bd8Ref.current,...data};
      let parentRowSpan = 150;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ed61ef1dd08b4e4f82e7f3a603e15bd8",
        "7ec772be4e1547f5b85a3f88b51f8f37"
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
      if (id === "searchf8f37") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "7ec772be4e1547f5b85a3f88b51f8f37") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "searchf8f37");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!searchf8f37?.trigger) return;
      if(searchf8f37?.trigger){
      setsearchf8f37((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[searchf8f37?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(searchf8f37?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[searchf8f37?.refresh])
  

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
        setai_registry_group15bd8((prev: any) => ({ ...prev, search: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_ai_asset_registry24714,...ai_registry_text_groupc3565,...ai_registry_group15bd8});
    setairegistrysearch_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_registry_group15bd8((prev: any) => ({ ...prev, search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setai_registry_group15bd8((prev: any) => ({ ...prev, search: false }));
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

 if (searchf8f37?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `17 / 19`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAiregistrysearchpage2 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="AI Registry"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"top-right"}
        modalName = "airegistrysearch"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAiregistrysearchpage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {searchf8f37?.isDisabled ? true : false}
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

