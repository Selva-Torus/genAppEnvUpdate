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
import ExportOptionsModal from '../../utils/ExportOptionsModal';
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
 

const Buttonedit_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen10, setShowProfileAsModalOpen10] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {group089a5, setgroup089a5}= useContext(TotalContext) as TotalContextProps;
  const {group089a5Props, setgroup089a5Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02, setintegration_run8ef02}= useContext(TotalContext) as TotalContextProps;
  const {integration_run8ef02Props, setintegration_run8ef02Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_ide9a61, setintegration_ide9a61}= useContext(TotalContext) as TotalContextProps;
  const {run_trigger_code5637f, setrun_trigger_code5637f}= useContext(TotalContext) as TotalContextProps;
  const {started_onb93fa, setstarted_onb93fa}= useContext(TotalContext) as TotalContextProps;
  const {ended_onc29ee, setended_onc29ee}= useContext(TotalContext) as TotalContextProps;
  const {run_status_code1137e, setrun_status_code1137e}= useContext(TotalContext) as TotalContextProps;
  const {records_readb1c9b, setrecords_readb1c9b}= useContext(TotalContext) as TotalContextProps;
  const {records_rejectedfb2e8, setrecords_rejectedfb2e8}= useContext(TotalContext) as TotalContextProps;
  const {view_btn7c798, setview_btn7c798}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn74fa8, setedit_btn74fa8}= useContext(TotalContext) as TotalContextProps;
  const {delete_btndcd7c, setdelete_btndcd7c}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1, setrun_information_group519a1}= useContext(TotalContext) as TotalContextProps;
  const {run_information_group519a1Props, setrun_information_group519a1Props}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90, settimeandstatus_group9ec90}= useContext(TotalContext) as TotalContextProps;
  const {timeandstatus_group9ec90Props, settimeandstatus_group9ec90Props}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32, setrecord_groupa6d32}= useContext(TotalContext) as TotalContextProps;
  const {record_groupa6d32Props, setrecord_groupa6d32Props}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2, seterror_group193e2}= useContext(TotalContext) as TotalContextProps;
  const {error_group193e2Props, seterror_group193e2Props}= useContext(TotalContext) as TotalContextProps;
  const {addintegrationrun_v1Props, setaddintegrationrun_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btnda220, setsave_btnda220}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ce, setdynamicactions669ce}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions669ceProps, setdynamicactions669ceProps}= useContext(TotalContext) as TotalContextProps;
  const {update_btn23a6d, setupdate_btn23a6d}= useContext(TotalContext) as TotalContextProps;
  //////////////


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
      codeStates['integration_run'] = integration_run8ef02,
      codeStates['setintegration_run'] = setintegration_run8ef02,
      codeStates['integration_run8ef02'] = integration_run8ef02Props,
      codeStates['setintegration_run8ef02'] = setintegration_run8ef02Props,
      codeStates['integration_id'] = integration_ide9a61,
      codeStates['setintegration_id'] = setintegration_ide9a61,
      codeStates['run_trigger_code'] = run_trigger_code5637f,
      codeStates['setrun_trigger_code'] = setrun_trigger_code5637f,
      codeStates['started_on'] = started_onb93fa,
      codeStates['setstarted_on'] = setstarted_onb93fa,
      codeStates['ended_on'] = ended_onc29ee,
      codeStates['setended_on'] = setended_onc29ee,
      codeStates['run_status_code'] = run_status_code1137e,
      codeStates['setrun_status_code'] = setrun_status_code1137e,
      codeStates['records_read'] = records_readb1c9b,
      codeStates['setrecords_read'] = setrecords_readb1c9b,
      codeStates['records_rejected'] = records_rejectedfb2e8,
      codeStates['setrecords_rejected'] = setrecords_rejectedfb2e8,
      codeStates['view_btn'] = view_btn7c798,
      codeStates['setview_btn'] = setview_btn7c798,
      codeStates['edit_btn'] = edit_btn74fa8,
      codeStates['setedit_btn'] = setedit_btn74fa8,
      codeStates['delete_btn'] = delete_btndcd7c,
      codeStates['setdelete_btn'] = setdelete_btndcd7c,
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
      codeStates['save_btn'] = save_btnda220,
      codeStates['setsave_btn'] = setsave_btnda220,
      codeStates['dynamicactions'] = dynamicactions669ce,
      codeStates['setdynamicactions'] = setdynamicactions669ce,
      codeStates['dynamicactions669ce'] = dynamicactions669ceProps,
      codeStates['setdynamicactions669ce'] = setdynamicactions669ceProps,
      codeStates['update_btn'] = update_btn23a6d,
      codeStates['setupdate_btn'] = setupdate_btn23a6d,
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
        "a2ef4363e74442759a518b4c6c58ef02",
        "6c64da46730e49ceb701e53f94974fa8"
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
      if (id === "edit_btn74fa8") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen10(false)
  },[edit_btn74fa8?.refresh])


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

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,run_information_group519a1Props?.controls);
    setrun_information_group519a1(bindData2||{})
    setrun_information_group519a1Props({...run_information_group519a1Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,timeandstatus_group9ec90Props?.controls);
    settimeandstatus_group9ec90(bindData4||{})
    settimeandstatus_group9ec90Props({...timeandstatus_group9ec90Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,record_groupa6d32Props?.controls);
    setrecord_groupa6d32(bindData6||{})
    setrecord_groupa6d32Props({...record_groupa6d32Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,error_group193e2Props?.controls);
    seterror_group193e2(bindData8||{})
    seterror_group193e2Props({...error_group193e2Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps10:any =  [];
    let filterData10 = await getFilterProps(filterProps10,mainData);
    setaddintegrationrun_v1Props([...filterData10 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen10(true);
    //disableElement
    setsave_btnda220((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setupdate_btn23a6d((prev: any) => ({ ...prev, isDisabled: false }));
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

 if (edit_btn74fa8?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationRun:AFVK:v1','integrationrun','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen10} 
        onClose={() => {
          setShowProfileAsModalOpen10(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addintegrationrun"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddintegrationrunpage10  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {edit_btn74fa8?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

