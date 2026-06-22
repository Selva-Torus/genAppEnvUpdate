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

  const {group_delete0df4b, setgroup_delete0df4b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete0df4bProps, setgroup_delete0df4bProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textc848b, setdelete_heading_textc848b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text16bc2, setasset_name_text16bc2}= useContext(TotalContext) as TotalContextProps;
  const {asset_named51ee, setasset_named51ee}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to_text5d18d, setassigned_to_text5d18d}= useContext(TotalContext) as TotalContextProps;
  const {assigned_to51299, setassigned_to51299}= useContext(TotalContext) as TotalContextProps;
  const {assigned_at_text4a3af, setassigned_at_text4a3af}= useContext(TotalContext) as TotalContextProps;
  const {assigned_bycb5ab, setassigned_bycb5ab}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assign_text4ad2d, setcondition_at_assign_text4ad2d}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assignc35c4, setcondition_at_assignc35c4}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date_text80abb, setexpected_return_date_text80abb}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date11169, setexpected_return_date11169}= useContext(TotalContext) as TotalContextProps;
  const {confo_text66873, setconfo_text66873}= useContext(TotalContext) as TotalContextProps;
  const {assign_idf7b2f, setassign_idf7b2f}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button0c073, setcancel_button0c073}= useContext(TotalContext) as TotalContextProps;
  const {ok_buttonfa294, setok_buttonfa294}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete0df4bRef = useRef(group_delete0df4b);
  useEffect(() => {
    group_delete0df4bRef.current = group_delete0df4b;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete0df4b]);
  
  //group props in ref to access latest props value
  const group_delete0df4bPropsRef = useRef(group_delete0df4bProps);
  useEffect(() => {
    group_delete0df4bPropsRef.current = group_delete0df4bProps;
  }, [group_delete0df4bProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete0df4b,
        codeStates['setgroup_delete'] = setgroup_delete0df4b,
        codeStates['group_delete0df4b'] = group_delete0df4bProps,
        codeStates['setgroup_delete0df4b'] = setgroup_delete0df4bProps,
        codeStates['delete_heading_text'] = delete_heading_textc848b,
        codeStates['setdelete_heading_text'] = setdelete_heading_textc848b,
        codeStates['asset_name_text'] = asset_name_text16bc2,
        codeStates['setasset_name_text'] = setasset_name_text16bc2,
        codeStates['asset_name'] = asset_named51ee,
        codeStates['setasset_name'] = setasset_named51ee,
        codeStates['assigned_to_text'] = assigned_to_text5d18d,
        codeStates['setassigned_to_text'] = setassigned_to_text5d18d,
        codeStates['assigned_to'] = assigned_to51299,
        codeStates['setassigned_to'] = setassigned_to51299,
        codeStates['assigned_at_text'] = assigned_at_text4a3af,
        codeStates['setassigned_at_text'] = setassigned_at_text4a3af,
        codeStates['assigned_by'] = assigned_bycb5ab,
        codeStates['setassigned_by'] = setassigned_bycb5ab,
        codeStates['condition_at_assign_text'] = condition_at_assign_text4ad2d,
        codeStates['setcondition_at_assign_text'] = setcondition_at_assign_text4ad2d,
        codeStates['condition_at_assign'] = condition_at_assignc35c4,
        codeStates['setcondition_at_assign'] = setcondition_at_assignc35c4,
        codeStates['expected_return_date_text'] = expected_return_date_text80abb,
        codeStates['setexpected_return_date_text'] = setexpected_return_date_text80abb,
        codeStates['expected_return_date'] = expected_return_date11169,
        codeStates['setexpected_return_date'] = setexpected_return_date11169,
        codeStates['confo_text'] = confo_text66873,
        codeStates['setconfo_text'] = setconfo_text66873,
        codeStates['assign_id'] = assign_idf7b2f,
        codeStates['setassign_id'] = setassign_idf7b2f,
        codeStates['cancel_button'] = cancel_button0c073,
        codeStates['setcancel_button'] = setcancel_button0c073,
        codeStates['ok_button'] = ok_buttonfa294,
        codeStates['setok_button'] = setok_buttonfa294,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assignassetdelete_v1, setassignassetdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete0df4bRef.current};
      let parentRowSpan = 52;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "9e8addb372fc9347531f4bc53780df4b",
        "a7a2d7cbf478b4a099cfb6545810c073"
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
      if (id === "cancel_button0c073") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "a7a2d7cbf478b4a099cfb6545810c073") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button0c073");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button0c073?.trigger) return;
      if(cancel_button0c073?.trigger){
      setcancel_button0c073((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button0c073?.trigger])

  useEffect(()=>{
    if(cancel_button0c073?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button0c073?.refresh])

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
        setgroup_delete0df4b((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'assignassetdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete0df4b((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete0df4b((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button0c073?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `42 / 48`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button0c073?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

