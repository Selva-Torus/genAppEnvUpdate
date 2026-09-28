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
 

const Buttondel_cancel_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {del_group81804, setdel_group81804}= useContext(TotalContext) as TotalContextProps;
  const {del_group81804Props, setdel_group81804Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt0ed43, setdelete_heading_txt0ed43}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_10a88e, setdel_divider_10a88e}= useContext(TotalContext) as TotalContextProps;
  const {del_code_value_id_text78165, setdel_code_value_id_text78165}= useContext(TotalContext) as TotalContextProps;
  const {code_value_id92302, setcode_value_id92302}= useContext(TotalContext) as TotalContextProps;
  const {code_textee61f, setcode_textee61f}= useContext(TotalContext) as TotalContextProps;
  const {code95034, setcode95034}= useContext(TotalContext) as TotalContextProps;
  const {display_name_text27447, setdisplay_name_text27447}= useContext(TotalContext) as TotalContextProps;
  const {display_name8365e, setdisplay_name8365e}= useContext(TotalContext) as TotalContextProps;
  const {description_text492cc, setdescription_text492cc}= useContext(TotalContext) as TotalContextProps;
  const {descriptionabf40, setdescriptionabf40}= useContext(TotalContext) as TotalContextProps;
  const {status_text4b485, setstatus_text4b485}= useContext(TotalContext) as TotalContextProps;
  const {is_active80b66, setis_active80b66}= useContext(TotalContext) as TotalContextProps;
  const {text5fad6, settext5fad6}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2eb63b, setdel_divider_2eb63b}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnb85db, setdel_cancel_btnb85db}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn7369c, setdel_okl_btn7369c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group81804Ref = useRef(del_group81804);
  useEffect(() => {
    del_group81804Ref.current = del_group81804;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group81804]);
  
  //group props in ref to access latest props value
  const del_group81804PropsRef = useRef(del_group81804Props);
  useEffect(() => {
    del_group81804PropsRef.current = del_group81804Props;
  }, [del_group81804Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group81804,
        codeStates['setdel_group'] = setdel_group81804,
        codeStates['del_group81804'] = del_group81804Props,
        codeStates['setdel_group81804'] = setdel_group81804Props,
        codeStates['delete_heading_txt'] = delete_heading_txt0ed43,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt0ed43,
        codeStates['del_divider_1'] = del_divider_10a88e,
        codeStates['setdel_divider_1'] = setdel_divider_10a88e,
        codeStates['del_code_value_id_text'] = del_code_value_id_text78165,
        codeStates['setdel_code_value_id_text'] = setdel_code_value_id_text78165,
        codeStates['code_value_id'] = code_value_id92302,
        codeStates['setcode_value_id'] = setcode_value_id92302,
        codeStates['code_text'] = code_textee61f,
        codeStates['setcode_text'] = setcode_textee61f,
        codeStates['code'] = code95034,
        codeStates['setcode'] = setcode95034,
        codeStates['display_name_text'] = display_name_text27447,
        codeStates['setdisplay_name_text'] = setdisplay_name_text27447,
        codeStates['display_name'] = display_name8365e,
        codeStates['setdisplay_name'] = setdisplay_name8365e,
        codeStates['description_text'] = description_text492cc,
        codeStates['setdescription_text'] = setdescription_text492cc,
        codeStates['description'] = descriptionabf40,
        codeStates['setdescription'] = setdescriptionabf40,
        codeStates['status_text'] = status_text4b485,
        codeStates['setstatus_text'] = setstatus_text4b485,
        codeStates['is_active'] = is_active80b66,
        codeStates['setis_active'] = setis_active80b66,
        codeStates['text'] = text5fad6,
        codeStates['settext'] = settext5fad6,
        codeStates['del_divider_2'] = del_divider_2eb63b,
        codeStates['setdel_divider_2'] = setdel_divider_2eb63b,
        codeStates['del_cancel_btn'] = del_cancel_btnb85db,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnb85db,
        codeStates['del_okl_btn'] = del_okl_btn7369c,
        codeStates['setdel_okl_btn'] = setdel_okl_btn7369c,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletecodevalue_v1, setdeletecodevalue_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group81804Ref.current,...data};
      let parentRowSpan = 61;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "77b6ff2206c342dbbc8d20421cf81804",
        "8b7ab6a59f214ae7a6c7d6f0870b85db"
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
      if (id === "del_cancel_btnb85db") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "8b7ab6a59f214ae7a6c7d6f0870b85db") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btnb85db");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!del_cancel_btnb85db?.trigger) return;
      if(del_cancel_btnb85db?.trigger){
      setdel_cancel_btnb85db((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[del_cancel_btnb85db?.trigger])

  useEffect(()=>{
    if(del_cancel_btnb85db?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btnb85db?.refresh])
  

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
        setdel_group81804((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletecodevalue');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group81804((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group81804((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

 if (del_cancel_btnb85db?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `12 / 19`,gridRow: `51 / 57`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {del_cancel_btnb85db?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdCancel"
          iconDisplay='Start with Icon'
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttondel_cancel_btn

