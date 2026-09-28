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

  const {del_group7e857, setdel_group7e857}= useContext(TotalContext) as TotalContextProps;
  const {del_group7e857Props, setdel_group7e857Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txt4a602, setdelete_heading_txt4a602}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_17957b, setdel_divider_17957b}= useContext(TotalContext) as TotalContextProps;
  const {asset_name_text7377f, setasset_name_text7377f}= useContext(TotalContext) as TotalContextProps;
  const {asset_nameae58e, setasset_nameae58e}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code_text87efb, setdata_class_code_text87efb}= useContext(TotalContext) as TotalContextProps;
  const {data_class_codee6763, setdata_class_codee6763}= useContext(TotalContext) as TotalContextProps;
  const {text3364f, settext3364f}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_2725fd, setdel_divider_2725fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_id9ae60, setasset_data_class_id9ae60}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btnd5bbd, setdel_cancel_btnd5bbd}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btn25863, setdel_okl_btn25863}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group7e857Ref = useRef(del_group7e857);
  useEffect(() => {
    del_group7e857Ref.current = del_group7e857;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group7e857]);
  
  //group props in ref to access latest props value
  const del_group7e857PropsRef = useRef(del_group7e857Props);
  useEffect(() => {
    del_group7e857PropsRef.current = del_group7e857Props;
  }, [del_group7e857Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group7e857,
        codeStates['setdel_group'] = setdel_group7e857,
        codeStates['del_group7e857'] = del_group7e857Props,
        codeStates['setdel_group7e857'] = setdel_group7e857Props,
        codeStates['delete_heading_txt'] = delete_heading_txt4a602,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txt4a602,
        codeStates['del_divider_1'] = del_divider_17957b,
        codeStates['setdel_divider_1'] = setdel_divider_17957b,
        codeStates['asset_name_text'] = asset_name_text7377f,
        codeStates['setasset_name_text'] = setasset_name_text7377f,
        codeStates['asset_name'] = asset_nameae58e,
        codeStates['setasset_name'] = setasset_nameae58e,
        codeStates['data_class_code_text'] = data_class_code_text87efb,
        codeStates['setdata_class_code_text'] = setdata_class_code_text87efb,
        codeStates['data_class_code'] = data_class_codee6763,
        codeStates['setdata_class_code'] = setdata_class_codee6763,
        codeStates['text'] = text3364f,
        codeStates['settext'] = settext3364f,
        codeStates['del_divider_2'] = del_divider_2725fd,
        codeStates['setdel_divider_2'] = setdel_divider_2725fd,
        codeStates['asset_data_class_id'] = asset_data_class_id9ae60,
        codeStates['setasset_data_class_id'] = setasset_data_class_id9ae60,
        codeStates['del_cancel_btn'] = del_cancel_btnd5bbd,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btnd5bbd,
        codeStates['del_okl_btn'] = del_okl_btn25863,
        codeStates['setdel_okl_btn'] = setdel_okl_btn25863,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {dataclassdelete_v1, setdataclassdelete_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group7e857Ref.current,...data};
      let parentRowSpan = 43;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "dcc3aa8f1ec9217ad784fd6b7b07e857",
        "794395ec6de1935e4406d9226c6d5bbd"
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
      if (id === "del_cancel_btnd5bbd") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "794395ec6de1935e4406d9226c6d5bbd") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btnd5bbd");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!del_cancel_btnd5bbd?.trigger) return;
      if(del_cancel_btnd5bbd?.trigger){
      setdel_cancel_btnd5bbd((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[del_cancel_btnd5bbd?.trigger])

  useEffect(()=>{
    if(del_cancel_btnd5bbd?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btnd5bbd?.refresh])
  

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
        setdel_group7e857((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'dataclassdelete');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group7e857((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group7e857((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

 if (del_cancel_btnd5bbd?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `32 / 38`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {del_cancel_btnd5bbd?.isDisabled ? true : false}
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

