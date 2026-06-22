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

  const {group_delete3c02f, setgroup_delete3c02f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c02fProps, setgroup_delete3c02fProps}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text766e5, setdelete_heading_text766e5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text2a279, setasset_name_text2a279}= useContext(TotalContext) as TotalContextProps;
  const {asset_named7764, setasset_named7764}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag_text6db8e, setasset_tag_text6db8e}= useContext(TotalContext) as TotalContextProps;
  const {asset_tag5b0ef, setasset_tag5b0ef}= useContext(TotalContext) as TotalContextProps;
  const {category_name_text6b1b6, setcategory_name_text6b1b6}= useContext(TotalContext) as TotalContextProps;
  const {category_nameb3bdb, setcategory_nameb3bdb}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_textbf4bc, setasset_type_textbf4bc}= useContext(TotalContext) as TotalContextProps;
  const {asset_typebe078, setasset_typebe078}= useContext(TotalContext) as TotalContextProps;
  const {location_text55088, setlocation_text55088}= useContext(TotalContext) as TotalContextProps;
  const {location0b4e4, setlocation0b4e4}= useContext(TotalContext) as TotalContextProps;
  const {confo_textad78a, setconfo_textad78a}= useContext(TotalContext) as TotalContextProps;
  const {cancel_button24a33, setcancel_button24a33}= useContext(TotalContext) as TotalContextProps;
  const {ok_button58a95, setok_button58a95}= useContext(TotalContext) as TotalContextProps;
  const {asset_id4d81b, setasset_id4d81b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete3c02fRef = useRef(group_delete3c02f);
  useEffect(() => {
    group_delete3c02fRef.current = group_delete3c02f;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete3c02f]);
  
  //group props in ref to access latest props value
  const group_delete3c02fPropsRef = useRef(group_delete3c02fProps);
  useEffect(() => {
    group_delete3c02fPropsRef.current = group_delete3c02fProps;
  }, [group_delete3c02fProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete3c02f,
        codeStates['setgroup_delete'] = setgroup_delete3c02f,
        codeStates['group_delete3c02f'] = group_delete3c02fProps,
        codeStates['setgroup_delete3c02f'] = setgroup_delete3c02fProps,
        codeStates['delete_heading_text'] = delete_heading_text766e5,
        codeStates['setdelete_heading_text'] = setdelete_heading_text766e5,
        codeStates['asset_name_text'] = asset_name_text2a279,
        codeStates['setasset_name_text'] = setasset_name_text2a279,
        codeStates['asset_name'] = asset_named7764,
        codeStates['setasset_name'] = setasset_named7764,
        codeStates['asset_tag_text'] = asset_tag_text6db8e,
        codeStates['setasset_tag_text'] = setasset_tag_text6db8e,
        codeStates['asset_tag'] = asset_tag5b0ef,
        codeStates['setasset_tag'] = setasset_tag5b0ef,
        codeStates['category_name_text'] = category_name_text6b1b6,
        codeStates['setcategory_name_text'] = setcategory_name_text6b1b6,
        codeStates['category_name'] = category_nameb3bdb,
        codeStates['setcategory_name'] = setcategory_nameb3bdb,
        codeStates['asset_type_text'] = asset_type_textbf4bc,
        codeStates['setasset_type_text'] = setasset_type_textbf4bc,
        codeStates['asset_type'] = asset_typebe078,
        codeStates['setasset_type'] = setasset_typebe078,
        codeStates['location_text'] = location_text55088,
        codeStates['setlocation_text'] = setlocation_text55088,
        codeStates['location'] = location0b4e4,
        codeStates['setlocation'] = setlocation0b4e4,
        codeStates['confo_text'] = confo_textad78a,
        codeStates['setconfo_text'] = setconfo_textad78a,
        codeStates['cancel_button'] = cancel_button24a33,
        codeStates['setcancel_button'] = setcancel_button24a33,
        codeStates['ok_button'] = ok_button58a95,
        codeStates['setok_button'] = setok_button58a95,
        codeStates['asset_id'] = asset_id4d81b,
        codeStates['setasset_id'] = setasset_id4d81b,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletescreen_v1, setdeletescreen_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group_delete3c02fRef.current};
      let parentRowSpan = 53;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "58a9b96c02f241298beab7b73d03c02f",
        "bd5e3fb660a14632aadefc5d26f24a33"
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
      if (id === "cancel_button24a33") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "bd5e3fb660a14632aadefc5d26f24a33") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_button24a33");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_button24a33?.trigger) return;
      if(cancel_button24a33?.trigger){
      setcancel_button24a33((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_button24a33?.trigger])

  useEffect(()=>{
    if(cancel_button24a33?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_button24a33?.refresh])

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
        setgroup_delete3c02f((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletescreen');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete3c02f((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setgroup_delete3c02f((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_button24a33?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `15 / 20`,gridRow: `42 / 49`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="   "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_button24a33?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_button

