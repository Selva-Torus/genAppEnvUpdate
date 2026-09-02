'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import PageViewapiconsentlogpage2 from '@/app/viewapiconsentlog_v1/viewapiconsentlog_v1page';
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
 

const Buttonview_logs = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const handleDfdRefresh = useHandleDfdRefresh();
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
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
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {vob_api_info_group5fc53, setvob_api_info_group5fc53}= useContext(TotalContext) as TotalContextProps;
  const {vob_api_info_group5fc53Props, setvob_api_info_group5fc53Props}= useContext(TotalContext) as TotalContextProps;
  const {group1f4ba, setgroup1f4ba}= useContext(TotalContext) as TotalContextProps;
  const {group1f4baProps, setgroup1f4baProps}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41, setapi_info_group6ad41}= useContext(TotalContext) as TotalContextProps;
  const {api_info_group6ad41Props, setapi_info_group6ad41Props}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982, settotal_calls_group76982}= useContext(TotalContext) as TotalContextProps;
  const {total_calls_group76982Props, settotal_calls_group76982Props}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598, setsuccess_rate_groupb6598}= useContext(TotalContext) as TotalContextProps;
  const {success_rate_groupb6598Props, setsuccess_rate_groupb6598Props}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1, seterror_rate_group773d1}= useContext(TotalContext) as TotalContextProps;
  const {error_rate_group773d1Props, seterror_rate_group773d1Props}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678, setob_group76678}= useContext(TotalContext) as TotalContextProps;
  const {ob_group76678Props, setob_group76678Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0, setapi_process_log_group192b0}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_group192b0Props, setapi_process_log_group192b0Props}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904e, setapi_process_log_table5904e}= useContext(TotalContext) as TotalContextProps;
  const {api_process_log_table5904eProps, setapi_process_log_table5904eProps}= useContext(TotalContext) as TotalContextProps;
  const {timestampc53f0, settimestampc53f0}= useContext(TotalContext) as TotalContextProps;
  const {requestc5c44, setrequestc5c44}= useContext(TotalContext) as TotalContextProps;
  const {response5db6d, setresponse5db6d}= useContext(TotalContext) as TotalContextProps;
  const {tob_consent_requestid32916, settob_consent_requestid32916}= useContext(TotalContext) as TotalContextProps;
  const {view_logs8b253, setview_logs8b253}= useContext(TotalContext) as TotalContextProps;
  const {viewapiconsentlog_v1Props, setviewapiconsentlog_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['vob_api_info_group'] = vob_api_info_group5fc53,
      codeStates['setvob_api_info_group'] = setvob_api_info_group5fc53,
      codeStates['vob_api_info_group5fc53'] = vob_api_info_group5fc53Props,
      codeStates['setvob_api_info_group5fc53'] = setvob_api_info_group5fc53Props,
      codeStates['group'] = group1f4ba,
      codeStates['setgroup'] = setgroup1f4ba,
      codeStates['group1f4ba'] = group1f4baProps,
      codeStates['setgroup1f4ba'] = setgroup1f4baProps,
      codeStates['api_info_group'] = api_info_group6ad41,
      codeStates['setapi_info_group'] = setapi_info_group6ad41,
      codeStates['api_info_group6ad41'] = api_info_group6ad41Props,
      codeStates['setapi_info_group6ad41'] = setapi_info_group6ad41Props,
      codeStates['total_calls_group'] = total_calls_group76982,
      codeStates['settotal_calls_group'] = settotal_calls_group76982,
      codeStates['total_calls_group76982'] = total_calls_group76982Props,
      codeStates['settotal_calls_group76982'] = settotal_calls_group76982Props,
      codeStates['success_rate_group'] = success_rate_groupb6598,
      codeStates['setsuccess_rate_group'] = setsuccess_rate_groupb6598,
      codeStates['success_rate_groupb6598'] = success_rate_groupb6598Props,
      codeStates['setsuccess_rate_groupb6598'] = setsuccess_rate_groupb6598Props,
      codeStates['error_rate_group'] = error_rate_group773d1,
      codeStates['seterror_rate_group'] = seterror_rate_group773d1,
      codeStates['error_rate_group773d1'] = error_rate_group773d1Props,
      codeStates['seterror_rate_group773d1'] = seterror_rate_group773d1Props,
      codeStates['ob_group'] = ob_group76678,
      codeStates['setob_group'] = setob_group76678,
      codeStates['ob_group76678'] = ob_group76678Props,
      codeStates['setob_group76678'] = setob_group76678Props,
      codeStates['api_process_log_group'] = api_process_log_group192b0,
      codeStates['setapi_process_log_group'] = setapi_process_log_group192b0,
      codeStates['api_process_log_group192b0'] = api_process_log_group192b0Props,
      codeStates['setapi_process_log_group192b0'] = setapi_process_log_group192b0Props,
      codeStates['api_process_log_table'] = api_process_log_table5904e,
      codeStates['setapi_process_log_table'] = setapi_process_log_table5904e,
      codeStates['api_process_log_table5904e'] = api_process_log_table5904eProps,
      codeStates['setapi_process_log_table5904e'] = setapi_process_log_table5904eProps,
      codeStates['timestamp'] = timestampc53f0,
      codeStates['settimestamp'] = settimestampc53f0,
      codeStates['request'] = requestc5c44,
      codeStates['setrequest'] = setrequestc5c44,
      codeStates['response'] = response5db6d,
      codeStates['setresponse'] = setresponse5db6d,
      codeStates['tob_consent_requestid'] = tob_consent_requestid32916,
      codeStates['settob_consent_requestid'] = settob_consent_requestid32916,
      codeStates['view_logs'] = view_logs8b253,
      codeStates['setview_logs'] = setview_logs8b253,
      codeStates['viewapiconsentlog_v1'] = viewapiconsentlog_v1Props,
      codeStates['setviewapiconsentlog_v1'] = setviewapiconsentlog_v1Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "dd993ad9274048958160a475a895904e",
        "3b5886f910fb42fb97d654fbe1f8b253"
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
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view_logs8b253") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_logs8b253?.refresh])


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

  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setviewapiconsentlog_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
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

 if (view_logs8b253?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:Trs:AFGK:TOB:AFK:viewApiInfo:AFVK:v1','viewapiinfo','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {false}
        position = {"center"}
        modalName = "viewapiconsentlog"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewapiconsentlogpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='raised'
          disabled= {view_logs8b253?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdLogin"
          iconDisplay='End with Icon'
        >
          {keyset("Consent Log")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_logs

