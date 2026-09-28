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
import PageAddaiassetdependencypage6 from '@/app/addaiassetdependency_v1/addaiassetdependency_v1page';
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
 

const Buttonnew_source = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_group5e5f7, setoverall_group5e5f7}= useContext(TotalContext) as TotalContextProps;
  const {overall_group5e5f7Props, setoverall_group5e5f7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcec, setai_asset_dependency_groupdbcec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcecProps, setai_asset_dependency_groupdbcecProps}= useContext(TotalContext) as TotalContextProps;
  const {textde639, settextde639}= useContext(TotalContext) as TotalContextProps;
  const {refresh_buttonca25d, setrefresh_buttonca25d}= useContext(TotalContext) as TotalContextProps;
  const {search53d65, setsearch53d65}= useContext(TotalContext) as TotalContextProps;
  const {new_sourcea3d90, setnew_sourcea3d90}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8, setai_asset_dependency_table789c8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8Props, setai_asset_dependency_table789c8Props}= useContext(TotalContext) as TotalContextProps;
  const {update_bt5d7fd, setupdate_bt5d7fd}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9a, setdynamicactionsf9e9a}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9aProps, setdynamicactionsf9e9aProps}= useContext(TotalContext) as TotalContextProps;
  const {save_bt74cb7, setsave_bt74cb7}= useContext(TotalContext) as TotalContextProps;
  const {addaiassetdependency_v1Props, setaddaiassetdependency_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_asset_dependency_groupdbcecRef = useRef(ai_asset_dependency_groupdbcec);
  useEffect(() => {
    ai_asset_dependency_groupdbcecRef.current = ai_asset_dependency_groupdbcec;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_asset_dependency_groupdbcec]);
  
  //group props in ref to access latest props value
  const ai_asset_dependency_groupdbcecPropsRef = useRef(ai_asset_dependency_groupdbcecProps);
  useEffect(() => {
    ai_asset_dependency_groupdbcecPropsRef.current = ai_asset_dependency_groupdbcecProps;
  }, [ai_asset_dependency_groupdbcecProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_group'] = overall_group5e5f7,
        codeStates['setoverall_group'] = setoverall_group5e5f7,
        codeStates['overall_group5e5f7'] = overall_group5e5f7Props,
        codeStates['setoverall_group5e5f7'] = setoverall_group5e5f7Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupdbcec,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupdbcec,
        codeStates['ai_asset_dependency_groupdbcec'] = ai_asset_dependency_groupdbcecProps,
        codeStates['setai_asset_dependency_groupdbcec'] = setai_asset_dependency_groupdbcecProps,
        codeStates['text'] = textde639,
        codeStates['settext'] = settextde639,
        codeStates['refresh_button'] = refresh_buttonca25d,
        codeStates['setrefresh_button'] = setrefresh_buttonca25d,
        codeStates['search'] = search53d65,
        codeStates['setsearch'] = setsearch53d65,
        codeStates['new_source'] = new_sourcea3d90,
        codeStates['setnew_source'] = setnew_sourcea3d90,
        codeStates['ai_asset_dependency_table'] = ai_asset_dependency_table789c8,
        codeStates['setai_asset_dependency_table'] = setai_asset_dependency_table789c8,
        codeStates['ai_asset_dependency_table789c8'] = ai_asset_dependency_table789c8Props,
        codeStates['setai_asset_dependency_table789c8'] = setai_asset_dependency_table789c8Props,
        codeStates['update_bt'] = update_bt5d7fd,
        codeStates['setupdate_bt'] = setupdate_bt5d7fd,
        codeStates['dynamicactions'] = dynamicactionsf9e9a,
        codeStates['setdynamicactions'] = setdynamicactionsf9e9a,
        codeStates['dynamicactionsf9e9a'] = dynamicactionsf9e9aProps,
        codeStates['setdynamicactionsf9e9a'] = setdynamicactionsf9e9aProps,
        codeStates['save_bt'] = save_bt74cb7,
        codeStates['setsave_bt'] = setsave_bt74cb7,
        codeStates['addaiassetdependency_v1'] = addaiassetdependency_v1Props,
        codeStates['setaddaiassetdependency_v1'] = setaddaiassetdependency_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {aiassetdependency_v1, setaiassetdependency_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_asset_dependency_groupdbcecRef.current,...data};
      let parentRowSpan = 147;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6599e6665c1756893804a3fde9ddbcec",
        "af236fe01fbce4e6d879164bbd2a3d90"
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
      if (id === "new_sourcea3d90") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "af236fe01fbce4e6d879164bbd2a3d90") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "new_sourcea3d90");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!new_sourcea3d90?.trigger) return;
      if(new_sourcea3d90?.trigger){
      setnew_sourcea3d90((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[new_sourcea3d90?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
    if(new_sourcea3d90?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[new_sourcea3d90?.refresh])
  

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
        setai_asset_dependency_groupdbcec((prev: any) => ({ ...prev, new_source: true }));
        //onClick

    //disableElement
    setupdate_bt5d7fd((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setsave_bt74cb7((prev: any) => ({ ...prev, isDisabled: false }));
    // showArtifactAsModal
    let filterProps6:any =  [];
      let filterData6 = await getFilterProps(filterProps6,{...overall_group5e5f7,...ai_asset_dependency_groupdbcec});
    setaddaiassetdependency_v1Props([...filterData6 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen6(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_asset_dependency_groupdbcec((prev: any) => ({ ...prev, new_source: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setai_asset_dependency_groupdbcec((prev: any) => ({ ...prev, new_source: false }));
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

 if (new_sourcea3d90?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen6 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddaiassetdependencypage6 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen6 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Add Asset Dependency"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addaiassetdependency"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddaiassetdependencypage6  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#0736C4] hover:!bg-[#0A45E0] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {new_sourcea3d90?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Add Dependency")}
        </Button>}
      </div>
    
  )
}

export default Buttonnew_source

