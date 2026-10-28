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
import { Rangerscan, Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { v4 as uuidv4 } from 'uuid';
import { clampTransactionIndex, getTransactionAt, getTransactionNames, removeTransaction } from '@/app/utils/scanQueue';
import { getPublicEnv } from "@/app/components/public-env";
import PageRequestScreenOffsitepage2 from '@/app/request_screen_offsite_v1/request_screen_offsite_v1page';
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
 

const Buttonoffsite_add = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const allState:any= useContext(TotalContext) as TotalContextProps;
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

  const {user_grpd6690, setuser_grpd6690}= useContext(TotalContext) as TotalContextProps;
  const {user_grpd6690Props, setuser_grpd6690Props}= useContext(TotalContext) as TotalContextProps;
  const {approvedcardc5971, setapprovedcardc5971}= useContext(TotalContext) as TotalContextProps;
  const {rejectedcardefafa, setrejectedcardefafa}= useContext(TotalContext) as TotalContextProps;
  const {pendingcardee3c0, setpendingcardee3c0}= useContext(TotalContext) as TotalContextProps;
  const {dailyexpenses798bd, setdailyexpenses798bd}= useContext(TotalContext) as TotalContextProps;
  const {offsiteexpensescd925, setoffsiteexpensescd925}= useContext(TotalContext) as TotalContextProps;
  const {addd126f, setaddd126f}= useContext(TotalContext) as TotalContextProps;
  const {offsite_add1ab15, setoffsite_add1ab15}= useContext(TotalContext) as TotalContextProps;
  const {daily_expa1e3b, setdaily_expa1e3b}= useContext(TotalContext) as TotalContextProps;
  const {offsite_exp949f2, setoffsite_exp949f2}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758, setdaily_expense_table13758}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense_table13758Props, setdaily_expense_table13758Props}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6, setoffsite_expense_table4ffd6}= useContext(TotalContext) as TotalContextProps;
  const {offsite_expense_table4ffd6Props, setoffsite_expense_table4ffd6Props}= useContext(TotalContext) as TotalContextProps;
  const {request_screen_offsite_v1Props, setrequest_screen_offsite_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {comments65b18, setcomments65b18}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cb, setrequest_offsite_group429cb}= useContext(TotalContext) as TotalContextProps;
  const {request_offsite_group429cbProps, setrequest_offsite_group429cbProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const user_grpd6690Ref = useRef(user_grpd6690);
  useEffect(() => {
    user_grpd6690Ref.current = user_grpd6690;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [user_grpd6690]);
  
  //group props in ref to access latest props value
  const user_grpd6690PropsRef = useRef(user_grpd6690Props);
  useEffect(() => {
    user_grpd6690PropsRef.current = user_grpd6690Props;
  }, [user_grpd6690Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['user_grp'] = user_grpd6690,
        codeStates['setuser_grp'] = setuser_grpd6690,
        codeStates['user_grpd6690'] = user_grpd6690Props,
        codeStates['setuser_grpd6690'] = setuser_grpd6690Props,
        codeStates['approvedcard'] = approvedcardc5971,
        codeStates['setapprovedcard'] = setapprovedcardc5971,
        codeStates['rejectedcard'] = rejectedcardefafa,
        codeStates['setrejectedcard'] = setrejectedcardefafa,
        codeStates['pendingcard'] = pendingcardee3c0,
        codeStates['setpendingcard'] = setpendingcardee3c0,
        codeStates['dailyexpenses'] = dailyexpenses798bd,
        codeStates['setdailyexpenses'] = setdailyexpenses798bd,
        codeStates['offsiteexpenses'] = offsiteexpensescd925,
        codeStates['setoffsiteexpenses'] = setoffsiteexpensescd925,
        codeStates['add'] = addd126f,
        codeStates['setadd'] = setaddd126f,
        codeStates['offsite_add'] = offsite_add1ab15,
        codeStates['setoffsite_add'] = setoffsite_add1ab15,
        codeStates['daily_exp'] = daily_expa1e3b,
        codeStates['setdaily_exp'] = setdaily_expa1e3b,
        codeStates['offsite_exp'] = offsite_exp949f2,
        codeStates['setoffsite_exp'] = setoffsite_exp949f2,
        codeStates['daily_expense_table'] = daily_expense_table13758,
        codeStates['setdaily_expense_table'] = setdaily_expense_table13758,
        codeStates['daily_expense_table13758'] = daily_expense_table13758Props,
        codeStates['setdaily_expense_table13758'] = setdaily_expense_table13758Props,
        codeStates['offsite_expense_table'] = offsite_expense_table4ffd6,
        codeStates['setoffsite_expense_table'] = setoffsite_expense_table4ffd6,
        codeStates['offsite_expense_table4ffd6'] = offsite_expense_table4ffd6Props,
        codeStates['setoffsite_expense_table4ffd6'] = setoffsite_expense_table4ffd6Props,
        codeStates['request_screen_offsite_v1'] = request_screen_offsite_v1Props,
        codeStates['setrequest_screen_offsite_v1'] = setrequest_screen_offsite_v1Props,
        codeStates['comments'] = comments65b18,
        codeStates['setcomments'] = setcomments65b18,
        codeStates['request_offsite_group'] = request_offsite_group429cb,
        codeStates['setrequest_offsite_group'] = setrequest_offsite_group429cb,
        codeStates['request_offsite_group429cb'] = request_offsite_group429cbProps,
        codeStates['setrequest_offsite_group429cb'] = setrequest_offsite_group429cbProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {dashboard_for_user_v1, setdashboard_for_user_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...user_grpd6690Ref.current,...data};
      let parentRowSpan = 214;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "0dd5e93ebe734a2da4503278cd0d6690",
        "6bc0fbaa83924bb29c69e3c9aea1ab15"
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
      if (id === "offsite_add1ab15") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "6bc0fbaa83924bb29c69e3c9aea1ab15") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "offsite_add1ab15");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (offsite_add1ab15?.trigger) 
    {
      handleClick()
      setoffsite_add1ab15((prev:any) => ({...prev, trigger: false}));
    }
  },[offsite_add1ab15?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(offsite_add1ab15?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[offsite_add1ab15?.refresh])
  

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

  useEffect(() => {
    return () => {
      // Leaving the screen → wipe validation results and the Save counter
      setValidate((pre: any) => ({ ...pre, Dashboard_For_User_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setuser_grpd6690((prev: any) => ({ ...prev, offsite_add: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...user_grpd6690});
    setrequest_screen_offsite_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
    //disableElement
    setcomments65b18((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setuser_grpd6690((prev: any) => ({ ...prev, offsite_add: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setuser_grpd6690((prev: any) => ({ ...prev, offsite_add: false }));
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

  if (offsite_add1ab15?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `23 / 25`,gridRow: `47 / 57`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageRequestScreenOffsitepage2 onReady={handleAssetPageReady}/>
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
        ready={assetDataReady}
        showOverlay = {false}
        position = {"center"}
        modalName = "request_screen_offsite"
        className='w-[900px] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageRequestScreenOffsitepage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className=""
          onClick={handleClick}
          view='outlined-success'
          disabled= {offsite_add1ab15?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Add")}
        </Button>}
      </div>
    
  )
}

export default Buttonoffsite_add

