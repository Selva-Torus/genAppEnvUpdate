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

  const {group_delete9bbe1, setgroup_delete9bbe1}= useContext(TotalContext) as TotalContextProps;
  const {group_delete9bbe1Props, setgroup_delete9bbe1Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_text7380b, setdelete_heading_text7380b}= useContext(TotalContext) as TotalContextProps;
  const {divider_s1a15b, setdivider_s1a15b}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type_idea039, setdel_code_type_idea039}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id8fe6f, setcode_type_id8fe6f}= useContext(TotalContext) as TotalContextProps;
  const {del_code_type3ce03, setdel_code_type3ce03}= useContext(TotalContext) as TotalContextProps;
  const {code_typedf5a3, setcode_typedf5a3}= useContext(TotalContext) as TotalContextProps;
  const {description_typef91cb, setdescription_typef91cb}= useContext(TotalContext) as TotalContextProps;
  const {description32634, setdescription32634}= useContext(TotalContext) as TotalContextProps;
  const {system_code_type9d603, setsystem_code_type9d603}= useContext(TotalContext) as TotalContextProps;
  const {is_systemc0200, setis_systemc0200}= useContext(TotalContext) as TotalContextProps;
  const {is_active6bc58, setis_active6bc58}= useContext(TotalContext) as TotalContextProps;
  const {active_type0da2f, setactive_type0da2f}= useContext(TotalContext) as TotalContextProps;
  const {confo_textcb476, setconfo_textcb476}= useContext(TotalContext) as TotalContextProps;
  const {dividerca7df, setdividerca7df}= useContext(TotalContext) as TotalContextProps;
  const {cancel_buttona9054, setcancel_buttona9054}= useContext(TotalContext) as TotalContextProps;
  const {ok_button8e870, setok_button8e870}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const group_delete9bbe1Ref = useRef(group_delete9bbe1);
  useEffect(() => {
    group_delete9bbe1Ref.current = group_delete9bbe1;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group_delete9bbe1]);
  
  //group props in ref to access latest props value
  const group_delete9bbe1PropsRef = useRef(group_delete9bbe1Props);
  useEffect(() => {
    group_delete9bbe1PropsRef.current = group_delete9bbe1Props;
  }, [group_delete9bbe1Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group_delete'] = group_delete9bbe1,
        codeStates['setgroup_delete'] = setgroup_delete9bbe1,
        codeStates['group_delete9bbe1'] = group_delete9bbe1Props,
        codeStates['setgroup_delete9bbe1'] = setgroup_delete9bbe1Props,
        codeStates['delete_heading_text'] = delete_heading_text7380b,
        codeStates['setdelete_heading_text'] = setdelete_heading_text7380b,
        codeStates['divider_s'] = divider_s1a15b,
        codeStates['setdivider_s'] = setdivider_s1a15b,
        codeStates['del_code_type_id'] = del_code_type_idea039,
        codeStates['setdel_code_type_id'] = setdel_code_type_idea039,
        codeStates['code_type_id'] = code_type_id8fe6f,
        codeStates['setcode_type_id'] = setcode_type_id8fe6f,
        codeStates['del_code_type'] = del_code_type3ce03,
        codeStates['setdel_code_type'] = setdel_code_type3ce03,
        codeStates['code_type'] = code_typedf5a3,
        codeStates['setcode_type'] = setcode_typedf5a3,
        codeStates['description_type'] = description_typef91cb,
        codeStates['setdescription_type'] = setdescription_typef91cb,
        codeStates['description'] = description32634,
        codeStates['setdescription'] = setdescription32634,
        codeStates['system_code_type'] = system_code_type9d603,
        codeStates['setsystem_code_type'] = setsystem_code_type9d603,
        codeStates['is_system'] = is_systemc0200,
        codeStates['setis_system'] = setis_systemc0200,
        codeStates['is_active'] = is_active6bc58,
        codeStates['setis_active'] = setis_active6bc58,
        codeStates['active_type'] = active_type0da2f,
        codeStates['setactive_type'] = setactive_type0da2f,
        codeStates['confo_text'] = confo_textcb476,
        codeStates['setconfo_text'] = setconfo_textcb476,
        codeStates['divider'] = dividerca7df,
        codeStates['setdivider'] = setdividerca7df,
        codeStates['cancel_button'] = cancel_buttona9054,
        codeStates['setcancel_button'] = setcancel_buttona9054,
        codeStates['ok_button'] = ok_button8e870,
        codeStates['setok_button'] = setok_button8e870,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletecodetype_v1, setdeletecodetype_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...group_delete9bbe1Ref.current,...data};
      let parentRowSpan = 72;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d098857dfa7545c1bd60db681f89bbe1",
        "03ce7820cb4246c592ac8ac0e0da9054"
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
      if (id === "cancel_buttona9054") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "03ce7820cb4246c592ac8ac0e0da9054") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_buttona9054");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_buttona9054?.trigger) return;
      if(cancel_buttona9054?.trigger){
      setcancel_buttona9054((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_buttona9054?.trigger])

  useEffect(()=>{
    if(cancel_buttona9054?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_buttona9054?.refresh])
  

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
        setgroup_delete9bbe1((prev: any) => ({ ...prev, cancel_button: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletecodetype');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup_delete9bbe1((prev: any) => ({ ...prev, cancel_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgroup_delete9bbe1((prev: any) => ({ ...prev, cancel_button: false }));
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

 if (cancel_buttona9054?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `60 / 66`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {cancel_buttona9054?.isDisabled ? true : false}
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

