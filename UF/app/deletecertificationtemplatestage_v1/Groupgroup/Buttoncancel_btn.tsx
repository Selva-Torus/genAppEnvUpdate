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
 

const Buttoncancel_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {groupb40f5, setgroupb40f5}= useContext(TotalContext) as TotalContextProps;
  const {groupb40f5Props, setgroupb40f5Props}= useContext(TotalContext) as TotalContextProps;
  const {del_headibg_textff66f, setdel_headibg_textff66f}= useContext(TotalContext) as TotalContextProps;
  const {divider_103b38, setdivider_103b38}= useContext(TotalContext) as TotalContextProps;
  const {del_template_stage_id9994c, setdel_template_stage_id9994c}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_id33d37, settemplate_stage_id33d37}= useContext(TotalContext) as TotalContextProps;
  const {del_cert_template_id08b25, setdel_cert_template_id08b25}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id54cca, setcert_template_id54cca}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_namef6a12, setdel_stage_namef6a12}= useContext(TotalContext) as TotalContextProps;
  const {stage_name6920f, setstage_name6920f}= useContext(TotalContext) as TotalContextProps;
  const {del_stage_type_codeb7ed2, setdel_stage_type_codeb7ed2}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code0d58a, setstage_type_code0d58a}= useContext(TotalContext) as TotalContextProps;
  const {del_sla_days4f73f, setdel_sla_days4f73f}= useContext(TotalContext) as TotalContextProps;
  const {sla_days7b386, setsla_days7b386}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active9e4c4, setdel_is_active9e4c4}= useContext(TotalContext) as TotalContextProps;
  const {is_active312fd, setis_active312fd}= useContext(TotalContext) as TotalContextProps;
  const {combo_text1c6ae, setcombo_text1c6ae}= useContext(TotalContext) as TotalContextProps;
  const {divider_2a3264, setdivider_2a3264}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btneba2d, setcancel_btneba2d}= useContext(TotalContext) as TotalContextProps;
  const {ok_btn01d91, setok_btn01d91}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_idtexte686f, settemplate_stage_idtexte686f}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const groupb40f5Ref = useRef(groupb40f5);
  useEffect(() => {
    groupb40f5Ref.current = groupb40f5;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [groupb40f5]);
  
  //group props in ref to access latest props value
  const groupb40f5PropsRef = useRef(groupb40f5Props);
  useEffect(() => {
    groupb40f5PropsRef.current = groupb40f5Props;
  }, [groupb40f5Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group'] = groupb40f5,
        codeStates['setgroup'] = setgroupb40f5,
        codeStates['groupb40f5'] = groupb40f5Props,
        codeStates['setgroupb40f5'] = setgroupb40f5Props,
        codeStates['del_headibg_text'] = del_headibg_textff66f,
        codeStates['setdel_headibg_text'] = setdel_headibg_textff66f,
        codeStates['divider_1'] = divider_103b38,
        codeStates['setdivider_1'] = setdivider_103b38,
        codeStates['del_template_stage_id'] = del_template_stage_id9994c,
        codeStates['setdel_template_stage_id'] = setdel_template_stage_id9994c,
        codeStates['template_stage_id'] = template_stage_id33d37,
        codeStates['settemplate_stage_id'] = settemplate_stage_id33d37,
        codeStates['del_cert_template_id'] = del_cert_template_id08b25,
        codeStates['setdel_cert_template_id'] = setdel_cert_template_id08b25,
        codeStates['cert_template_id'] = cert_template_id54cca,
        codeStates['setcert_template_id'] = setcert_template_id54cca,
        codeStates['del_stage_name'] = del_stage_namef6a12,
        codeStates['setdel_stage_name'] = setdel_stage_namef6a12,
        codeStates['stage_name'] = stage_name6920f,
        codeStates['setstage_name'] = setstage_name6920f,
        codeStates['del_stage_type_code'] = del_stage_type_codeb7ed2,
        codeStates['setdel_stage_type_code'] = setdel_stage_type_codeb7ed2,
        codeStates['stage_type_code'] = stage_type_code0d58a,
        codeStates['setstage_type_code'] = setstage_type_code0d58a,
        codeStates['del_sla_days'] = del_sla_days4f73f,
        codeStates['setdel_sla_days'] = setdel_sla_days4f73f,
        codeStates['sla_days'] = sla_days7b386,
        codeStates['setsla_days'] = setsla_days7b386,
        codeStates['del_is_active'] = del_is_active9e4c4,
        codeStates['setdel_is_active'] = setdel_is_active9e4c4,
        codeStates['is_active'] = is_active312fd,
        codeStates['setis_active'] = setis_active312fd,
        codeStates['combo_text'] = combo_text1c6ae,
        codeStates['setcombo_text'] = setcombo_text1c6ae,
        codeStates['divider_2'] = divider_2a3264,
        codeStates['setdivider_2'] = setdivider_2a3264,
        codeStates['cancel_btn'] = cancel_btneba2d,
        codeStates['setcancel_btn'] = setcancel_btneba2d,
        codeStates['ok_btn'] = ok_btn01d91,
        codeStates['setok_btn'] = setok_btn01d91,
        codeStates['template_stage_idtext'] = template_stage_idtexte686f,
        codeStates['settemplate_stage_idtext'] = settemplate_stage_idtexte686f,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletecertificationtemplatestage_v1, setdeletecertificationtemplatestage_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...groupb40f5Ref.current,...data};
      let parentRowSpan = 75;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "aa4bfe45293344718e81d6d290fb40f5",
        "c5c9984afeb748da97426c6da97eba2d"
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
      if (id === "cancel_btneba2d") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "c5c9984afeb748da97426c6da97eba2d") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_btneba2d");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_btneba2d?.trigger) return;
      if(cancel_btneba2d?.trigger){
      setcancel_btneba2d((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_btneba2d?.trigger])

  useEffect(()=>{
    if(cancel_btneba2d?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_btneba2d?.refresh])
  

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
        setgroupb40f5((prev: any) => ({ ...prev, cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletecertificationtemplatestage');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroupb40f5((prev: any) => ({ ...prev, cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgroupb40f5((prev: any) => ({ ...prev, cancel_btn: false }));
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

 if (cancel_btneba2d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `66 / 72`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {cancel_btneba2d?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_btn

