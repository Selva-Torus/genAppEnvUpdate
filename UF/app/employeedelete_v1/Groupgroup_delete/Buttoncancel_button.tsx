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

  const {group_delete68104, setgroup_delete68104}= useContext(TotalContext) as TotalContextProps;
  const {group_delete68104Props, setgroup_delete68104Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_textf472f, setdelete_heading_textf472f}= useContext(TotalContext) as TotalContextProps;
  const {divider_se84d1, setdivider_se84d1}= useContext(TotalContext) as TotalContextProps;
  const {employee_code_textd7eed, setemployee_code_textd7eed}= useContext(TotalContext) as TotalContextProps;
  const {employee_code89740, setemployee_code89740}= useContext(TotalContext) as TotalContextProps;
  const {full_name_text4a492, setfull_name_text4a492}= useContext(TotalContext) as TotalContextProps;
  const {full_name89c4f, setfull_name89c4f}= useContext(TotalContext) as TotalContextProps;
  const {work_email_text10688, setwork_email_text10688}= useContext(TotalContext) as TotalContextProps;
  const {work_email16f90, setwork_email16f90}= useContext(TotalContext) as TotalContextProps;
  const {employment_type_textc33f9, setemployment_type_textc33f9}= useContext(TotalContext) as TotalContextProps;
  const {employment_type48765, setemployment_type48765}= useContext(TotalContext) as TotalContextProps;
  const {employee_status_textef64f, setemployee_status_textef64f}= useContext(TotalContext) as TotalContextProps;
  const {employee_status8c982, setemployee_status8c982}= useContext(TotalContext) as TotalContextProps;
  const {confo_text730b1, setconfo_text730b1}= useContext(TotalContext) as TotalContextProps;
  const {divider0b449, setdivider0b449}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttonccddf, setcancel_buttonccddf}= useContext(TotalContext) as TotalContextProps;
  const {ok_button3d34b, setok_button3d34b}= useContext(TotalContext) as TotalContextProps;
  const {employee_id7e621, setemployee_id7e621}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete68104Ref = useRef(group_delete68104);
  useEffect(() => {
    group_delete68104Ref.current = group_delete68104;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete68104]);
  
  //group props in ref to access latest props value
  const group_delete68104PropsRef = useRef(group_delete68104Props);
  useEffect(() => {
    group_delete68104PropsRef.current = group_delete68104Props;
  }, [group_delete68104Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete68104,
        codeStates['setgroup_delete'] = setgroup_delete68104,
        codeStates['group_delete68104'] = group_delete68104Props,
        codeStates['setgroup_delete68104'] = setgroup_delete68104Props,
        codeStates['delete_heading_text'] = delete_heading_textf472f,
        codeStates['setdelete_heading_text'] = setdelete_heading_textf472f,
        codeStates['divider_s'] = divider_se84d1,
        codeStates['setdivider_s'] = setdivider_se84d1,
        codeStates['employee_code_text'] = employee_code_textd7eed,
        codeStates['setemployee_code_text'] = setemployee_code_textd7eed,
        codeStates['employee_code'] = employee_code89740,
        codeStates['setemployee_code'] = setemployee_code89740,
        codeStates['full_name_text'] = full_name_text4a492,
        codeStates['setfull_name_text'] = setfull_name_text4a492,
        codeStates['full_name'] = full_name89c4f,
        codeStates['setfull_name'] = setfull_name89c4f,
        codeStates['work_email_text'] = work_email_text10688,
        codeStates['setwork_email_text'] = setwork_email_text10688,
        codeStates['work_email'] = work_email16f90,
        codeStates['setwork_email'] = setwork_email16f90,
        codeStates['employment_type_text'] = employment_type_textc33f9,
        codeStates['setemployment_type_text'] = setemployment_type_textc33f9,
        codeStates['employment_type'] = employment_type48765,
        codeStates['setemployment_type'] = setemployment_type48765,
        codeStates['employee_status_text'] = employee_status_textef64f,
        codeStates['setemployee_status_text'] = setemployee_status_textef64f,
        codeStates['employee_status'] = employee_status8c982,
        codeStates['setemployee_status'] = setemployee_status8c982,
        codeStates['confo_text'] = confo_text730b1,
        codeStates['setconfo_text'] = setconfo_text730b1,
        codeStates['divider'] = divider0b449,
        codeStates['setdivider'] = setdivider0b449,
        codeStates['cancel_button'] = cancel_buttonccddf,
        codeStates['setcancel_button'] = setcancel_buttonccddf,
        codeStates['ok_button'] = ok_button3d34b,
        codeStates['setok_button'] = setok_button3d34b,
        codeStates['employee_id'] = employee_id7e621,
        codeStates['setemployee_id'] = setemployee_id7e621,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {employeedelete_v1, setemployeedelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete68104Ref.current};
      let parentRowSpan = 63;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "0ec1c18b873f7c0c40220bce6a068104",
        "217bc8d51394489daf72b235be0ccddf"
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
      if (id === "cancel_buttonccddf") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "217bc8d51394489daf72b235be0ccddf") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttonccddf");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttonccddf?.trigger) return;
      if(cancel_buttonccddf?.trigger){
      setcancel_buttonccddf((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttonccddf?.trigger])

  useEffect(()=>{
    if(cancel_buttonccddf?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttonccddf?.refresh])
  

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
        setgroup_delete68104((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'employeedelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete68104((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete68104((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttonccddf?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `50 / 56`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_buttonccddf?.isDisabled ? true : false}
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

