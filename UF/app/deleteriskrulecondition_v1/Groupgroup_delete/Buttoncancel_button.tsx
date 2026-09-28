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
 

const Buttoncancel_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {group_delete8f763, setgroup_delete8f763}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8f763Props, setgroup_delete8f763Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_texta0ff5, setdelete_heading_texta0ff5}= useContext(TotalContext) as TotalContextProps;
  const {divider_s5e9e7, setdivider_s5e9e7}= useContext(TotalContext) as TotalContextProps;
  const {del_risk_rule__id8a1a8, setdel_risk_rule__id8a1a8}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_idb7f80, setrisk_rule_idb7f80}= useContext(TotalContext) as TotalContextProps;
  const {del_attribute_nameea67e, setdel_attribute_nameea67e}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name38f26, setattribute_name38f26}= useContext(TotalContext) as TotalContextProps;
  const {del_operator_codefe788, setdel_operator_codefe788}= useContext(TotalContext) as TotalContextProps;
  const {operator_code0e759, setoperator_code0e759}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no_del5f79d, setsequence_no_del5f79d}= useContext(TotalContext) as TotalContextProps;
  const {sequence_nofc431, setsequence_nofc431}= useContext(TotalContext) as TotalContextProps;
  const {active_type5f80e, setactive_type5f80e}= useContext(TotalContext) as TotalContextProps;
  const {is_active4eecd, setis_active4eecd}= useContext(TotalContext) as TotalContextProps;
  const {confo_text2ede6, setconfo_text2ede6}= useContext(TotalContext) as TotalContextProps;
  const {divider40ded, setdivider40ded}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button620c9, setcancel_button620c9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonfd2d0, setok_buttonfd2d0}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete8f763Ref = useRef(group_delete8f763);
  useEffect(() => {
    group_delete8f763Ref.current = group_delete8f763;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete8f763]);
  
  //group props in ref to access latest props value
  const group_delete8f763PropsRef = useRef(group_delete8f763Props);
  useEffect(() => {
    group_delete8f763PropsRef.current = group_delete8f763Props;
  }, [group_delete8f763Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete8f763,
        codeStates['setgroup_delete'] = setgroup_delete8f763,
        codeStates['group_delete8f763'] = group_delete8f763Props,
        codeStates['setgroup_delete8f763'] = setgroup_delete8f763Props,
        codeStates['delete_heading_text'] = delete_heading_texta0ff5,
        codeStates['setdelete_heading_text'] = setdelete_heading_texta0ff5,
        codeStates['divider_s'] = divider_s5e9e7,
        codeStates['setdivider_s'] = setdivider_s5e9e7,
        codeStates['del_risk_rule__id'] = del_risk_rule__id8a1a8,
        codeStates['setdel_risk_rule__id'] = setdel_risk_rule__id8a1a8,
        codeStates['risk_rule_id'] = risk_rule_idb7f80,
        codeStates['setrisk_rule_id'] = setrisk_rule_idb7f80,
        codeStates['del_attribute_name'] = del_attribute_nameea67e,
        codeStates['setdel_attribute_name'] = setdel_attribute_nameea67e,
        codeStates['attribute_name'] = attribute_name38f26,
        codeStates['setattribute_name'] = setattribute_name38f26,
        codeStates['del_operator_code'] = del_operator_codefe788,
        codeStates['setdel_operator_code'] = setdel_operator_codefe788,
        codeStates['operator_code'] = operator_code0e759,
        codeStates['setoperator_code'] = setoperator_code0e759,
        codeStates['sequence_no_del'] = sequence_no_del5f79d,
        codeStates['setsequence_no_del'] = setsequence_no_del5f79d,
        codeStates['sequence_no'] = sequence_nofc431,
        codeStates['setsequence_no'] = setsequence_nofc431,
        codeStates['active_type'] = active_type5f80e,
        codeStates['setactive_type'] = setactive_type5f80e,
        codeStates['is_active'] = is_active4eecd,
        codeStates['setis_active'] = setis_active4eecd,
        codeStates['confo_text'] = confo_text2ede6,
        codeStates['setconfo_text'] = setconfo_text2ede6,
        codeStates['divider'] = divider40ded,
        codeStates['setdivider'] = setdivider40ded,
        codeStates['cancel_button'] = cancel_button620c9,
        codeStates['setcancel_button'] = setcancel_button620c9,
        codeStates['ok_button'] = ok_buttonfd2d0,
        codeStates['setok_button'] = setok_buttonfd2d0,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deleteriskrulecondition_v1, setdeleteriskrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...group_delete8f763Ref.current,...data};
      let parentRowSpan = 70;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "2040cb2d2a638e62738d3ce99e68f763",
        "edf315d8f882e5de0bf1895eb21620c9"
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
      if (id === "cancel_button620c9") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "edf315d8f882e5de0bf1895eb21620c9") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button620c9");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button620c9?.trigger) return;
      if(cancel_button620c9?.trigger){
      setcancel_button620c9((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button620c9?.trigger])

  useEffect(()=>{
    if(cancel_button620c9?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button620c9?.refresh])
  

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
        setgroup_delete8f763((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deleteriskrulecondition');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete8f763((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgroup_delete8f763((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button620c9?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `59 / 65`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button620c9?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineCancel"
          iconDisplay='Start with Icon'
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

