'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
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
  const token:string = getCookie('token');
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
    
 /////////////
   //another screen

  const {group_deletedf5b8, setgroup_deletedf5b8}= useContext(TotalContext) as TotalContextProps;
  const {group_deletedf5b8Props, setgroup_deletedf5b8Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textb375f, setdelete_heading_textb375f}= useContext(TotalContext) as TotalContextProps;
  const {product_name_text501de, setproduct_name_text501de}= useContext(TotalContext) as TotalContextProps;
  const {product_namead2dd, setproduct_namead2dd}= useContext(TotalContext) as TotalContextProps;
  const {license_type_text3c22b, setlicense_type_text3c22b}= useContext(TotalContext) as TotalContextProps;
  const {license_typecec9e, setlicense_typecec9e}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal_textbdbd2, setauto_renewal_textbdbd2}= useContext(TotalContext) as TotalContextProps;
  const {auto_renewal8e280, setauto_renewal8e280}= useContext(TotalContext) as TotalContextProps;
  const {seats_total_texta19fe, setseats_total_texta19fe}= useContext(TotalContext) as TotalContextProps;
  const {seats_totalf37ee, setseats_totalf37ee}= useContext(TotalContext) as TotalContextProps;
  const {seats_used_textc1a25, setseats_used_textc1a25}= useContext(TotalContext) as TotalContextProps;
  const {seats_used8c8d5, setseats_used8c8d5}= useContext(TotalContext) as TotalContextProps;
  const {confo_textbc695, setconfo_textbc695}= useContext(TotalContext) as TotalContextProps;
  const {license_id027b5, setlicense_id027b5}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button3e8d9, setcancel_button3e8d9}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonf3727, setok_buttonf3727}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_deletedf5b8Ref = useRef(group_deletedf5b8);
  useEffect(() => {
    group_deletedf5b8Ref.current = group_deletedf5b8;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_deletedf5b8]);
  
  //group props in ref to access latest props value
  const group_deletedf5b8PropsRef = useRef(group_deletedf5b8Props);
  useEffect(() => {
    group_deletedf5b8PropsRef.current = group_deletedf5b8Props;
  }, [group_deletedf5b8Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_deletedf5b8,
        codeStates['setgroup_delete'] = setgroup_deletedf5b8,
        codeStates['group_deletedf5b8'] = group_deletedf5b8Props,
        codeStates['setgroup_deletedf5b8'] = setgroup_deletedf5b8Props,
        codeStates['delete_heading_text'] = delete_heading_textb375f,
        codeStates['setdelete_heading_text'] = setdelete_heading_textb375f,
        codeStates['product_name_text'] = product_name_text501de,
        codeStates['setproduct_name_text'] = setproduct_name_text501de,
        codeStates['product_name'] = product_namead2dd,
        codeStates['setproduct_name'] = setproduct_namead2dd,
        codeStates['license_type_text'] = license_type_text3c22b,
        codeStates['setlicense_type_text'] = setlicense_type_text3c22b,
        codeStates['license_type'] = license_typecec9e,
        codeStates['setlicense_type'] = setlicense_typecec9e,
        codeStates['auto_renewal_text'] = auto_renewal_textbdbd2,
        codeStates['setauto_renewal_text'] = setauto_renewal_textbdbd2,
        codeStates['auto_renewal'] = auto_renewal8e280,
        codeStates['setauto_renewal'] = setauto_renewal8e280,
        codeStates['seats_total_text'] = seats_total_texta19fe,
        codeStates['setseats_total_text'] = setseats_total_texta19fe,
        codeStates['seats_total'] = seats_totalf37ee,
        codeStates['setseats_total'] = setseats_totalf37ee,
        codeStates['seats_used_text'] = seats_used_textc1a25,
        codeStates['setseats_used_text'] = setseats_used_textc1a25,
        codeStates['seats_used'] = seats_used8c8d5,
        codeStates['setseats_used'] = setseats_used8c8d5,
        codeStates['confo_text'] = confo_textbc695,
        codeStates['setconfo_text'] = setconfo_textbc695,
        codeStates['license_id'] = license_id027b5,
        codeStates['setlicense_id'] = setlicense_id027b5,
        codeStates['cancel_button'] = cancel_button3e8d9,
        codeStates['setcancel_button'] = setcancel_button3e8d9,
        codeStates['ok_button'] = ok_buttonf3727,
        codeStates['setok_button'] = setok_buttonf3727,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {licensedelete_v1, setlicensedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_deletedf5b8Ref.current};
      let parentRowSpan = 62;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "70cd602d5b1d604a33a77213e65df5b8",
        "4670afed54da940d7a081c04fb63e8d9"
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
      if (id === "cancel_button3e8d9") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "4670afed54da940d7a081c04fb63e8d9") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button3e8d9");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button3e8d9?.trigger) return;
      if(cancel_button3e8d9?.trigger){
      setcancel_button3e8d9((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button3e8d9?.trigger])

  useEffect(()=>{
    if(cancel_button3e8d9?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button3e8d9?.refresh])

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
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setgroup_deletedf5b8((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'licensedelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_deletedf5b8((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_deletedf5b8((prev: any) => ({ ...prev, cancel_button: false }));
    }
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

 if (cancel_button3e8d9?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `51 / 58`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button3e8d9?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

