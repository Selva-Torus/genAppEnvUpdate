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
import PageAddintegrationrunpage10 from '@/app/addintegrationrun_v1/addintegrationrun_v1page';
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
 

const Buttonnew_run_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen10, setShowProfileAsModalOpen10] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {group089a5, setgroup089a5}= useContext(TotalContext) as TotalContextProps;
  const {group089a5Props, setgroup089a5Props}= useContext(TotalContext) as TotalContextProps;
  const {integrationrun_text846c5, setintegrationrun_text846c5}= useContext(TotalContext) as TotalContextProps;
  const {ref_btn14f17, setref_btn14f17}= useContext(TotalContext) as TotalContextProps;
  const {search_btn323c8, setsearch_btn323c8}= useContext(TotalContext) as TotalContextProps;
  const {new_run_btn3082c, setnew_run_btn3082c}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02, setintegration_run8ef02}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02Props, setintegration_run8ef02Props}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps;
  const {addintegrationrun_v1Props, setaddintegrationrun_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btn23a6d, setupdate_btn23a6d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps;
  const {save_btnda220, setsave_btnda220}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const group089a5Ref = useRef(group089a5);
  useEffect(() => {
    group089a5Ref.current = group089a5;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group089a5]);
  
  //group props in ref to access latest props value
  const group089a5PropsRef = useRef(group089a5Props);
  useEffect(() => {
    group089a5PropsRef.current = group089a5Props;
  }, [group089a5Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group'] = group089a5,
        codeStates['setgroup'] = setgroup089a5,
        codeStates['group089a5'] = group089a5Props,
        codeStates['setgroup089a5'] = setgroup089a5Props,
        codeStates['integrationrun_text'] = integrationrun_text846c5,
        codeStates['setintegrationrun_text'] = setintegrationrun_text846c5,
        codeStates['ref_btn'] = ref_btn14f17,
        codeStates['setref_btn'] = setref_btn14f17,
        codeStates['search_btn'] = search_btn323c8,
        codeStates['setsearch_btn'] = setsearch_btn323c8,
        codeStates['new_run_btn'] = new_run_btn3082c,
        codeStates['setnew_run_btn'] = setnew_run_btn3082c,
        codeStates['integration_run'] = integration_run8ef02,
        codeStates['setintegration_run'] = setintegration_run8ef02,
        codeStates['integration_run8ef02'] = integration_run8ef02Props,
        codeStates['setintegration_run8ef02'] = setintegration_run8ef02Props,
        codeStates['run_information_group'] = run_information_group519a1,
        codeStates['setrun_information_group'] = setrun_information_group519a1,
        codeStates['run_information_group519a1'] = run_information_group519a1Props,
        codeStates['setrun_information_group519a1'] = setrun_information_group519a1Props,
        codeStates['timeandstatus_group'] = timeandstatus_group9ec90,
        codeStates['settimeandstatus_group'] = settimeandstatus_group9ec90,
        codeStates['timeandstatus_group9ec90'] = timeandstatus_group9ec90Props,
        codeStates['settimeandstatus_group9ec90'] = settimeandstatus_group9ec90Props,
        codeStates['record_group'] = record_groupa6d32,
        codeStates['setrecord_group'] = setrecord_groupa6d32,
        codeStates['record_groupa6d32'] = record_groupa6d32Props,
        codeStates['setrecord_groupa6d32'] = setrecord_groupa6d32Props,
        codeStates['error_group'] = error_group193e2,
        codeStates['seterror_group'] = seterror_group193e2,
        codeStates['error_group193e2'] = error_group193e2Props,
        codeStates['seterror_group193e2'] = seterror_group193e2Props,
        codeStates['addintegrationrun_v1'] = addintegrationrun_v1Props,
        codeStates['setaddintegrationrun_v1'] = setaddintegrationrun_v1Props,
        codeStates['update_btn'] = update_btn23a6d,
        codeStates['setupdate_btn'] = setupdate_btn23a6d,
        codeStates['dynamicactions'] = dynamicactions669ce,
        codeStates['setdynamicactions'] = setdynamicactions669ce,
        codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
        codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,
        codeStates['save_btn'] = save_btnda220,
        codeStates['setsave_btn'] = setsave_btnda220,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {integrationrun_v1, setintegrationrun_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...group089a5Ref.current,...data};
      let parentRowSpan = 120;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f7b773f04e894eb1a40dba46ed5089a5",
        "1be293a4ac9d4f679819cd5ec783082c"
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
      if (id === "new_run_btn3082c") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "1be293a4ac9d4f679819cd5ec783082c") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "new_run_btn3082c");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!new_run_btn3082c?.trigger) return;
      if(new_run_btn3082c?.trigger){
      setnew_run_btn3082c((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[new_run_btn3082c?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen10(false)
    if(new_run_btn3082c?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[new_run_btn3082c?.refresh])
  

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
        setgroup089a5((prev: any) => ({ ...prev, new_run_btn: true }));
        //onClick

    //bindTran
    // For group or table
    setrun_information_group519a1({...run_information_group519a1,...group089a5||{}})
    setrun_information_group519a1Props({...run_information_group519a1Props,presetValues:group089a5||{}})  
    //bindTran
    // For group or table
    settimeandstatus_group9ec90({...timeandstatus_group9ec90,...group089a5||{}})
    settimeandstatus_group9ec90Props({...timeandstatus_group9ec90Props,presetValues:group089a5||{}})  
    //bindTran
    // For group or table
    setrecord_groupa6d32({...record_groupa6d32,...group089a5||{}})
    setrecord_groupa6d32Props({...record_groupa6d32Props,presetValues:group089a5||{}})  
    //bindTran
    // For group or table
    seterror_group193e2({...error_group193e2,...group089a5||{}})
    seterror_group193e2Props({...error_group193e2Props,presetValues:group089a5||{}})  
    // showArtifactAsModal
    let filterProps10:any =  [];
      let filterData10 = await getFilterProps(filterProps10,{...group089a5});
    setaddintegrationrun_v1Props([...filterData10 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen10(true);
    //disableElement
    setupdate_btn23a6d((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setsave_btnda220((prev: any) => ({ ...prev, isDisabled: false }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup089a5((prev: any) => ({ ...prev, new_run_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setgroup089a5((prev: any) => ({ ...prev, new_run_btn: false }));
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

 if (new_run_btn3082c?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 9`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen10 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddintegrationrunpage10 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen10 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen10(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Add Integration Run"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addintegrationrun"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddintegrationrunpage10  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {new_run_btn3082c?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("+ New Run")}
        </Button>}
      </div>
    
  )
}

export default Buttonnew_run_btn

