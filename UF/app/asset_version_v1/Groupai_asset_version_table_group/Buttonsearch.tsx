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
import PageAiassetversionsearchpage2 from '@/app/aiassetversionsearch_v1/aiassetversionsearch_v1page';
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
  const {aiassetversionsearch_v1Props, setaiassetversionsearch_v1Props}= useContext(TotalContext) as TotalContextProps;
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
        codeStates['aiassetversionsearch_v1'] = aiassetversionsearch_v1Props,
        codeStates['setaiassetversionsearch_v1'] = setaiassetversionsearch_v1Props,
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
        "e77b31d39424594cd609e48b5350e25c"
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
      if (id === "search0e25c") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "e77b31d39424594cd609e48b5350e25c") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search0e25c");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!search0e25c?.trigger) return;
      if(search0e25c?.trigger){
      setsearch0e25c((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search0e25c?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(search0e25c?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search0e25c?.refresh])
  

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
        setai_asset_version_table_group9cca8((prev: any) => ({ ...prev, search: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_group75f3d,...ai_asset_version_table_group9cca8});
    setaiassetversionsearch_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_asset_version_table_group9cca8((prev: any) => ({ ...prev, search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setai_asset_version_table_group9cca8((prev: any) => ({ ...prev, search: false }));
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

 if (search0e25c?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `19 / 22`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAiassetversionsearchpage2 onReady={handleAssetPageReady}/>
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
        title="Search Asset Version"
        variant="subheader-3"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"top-right"}
        modalName = "aiassetversionsearch"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAiassetversionsearchpage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {search0e25c?.isDisabled ? true : false}
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

