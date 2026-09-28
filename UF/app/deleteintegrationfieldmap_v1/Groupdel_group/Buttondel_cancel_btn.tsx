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

  const {del_group0e789, setdel_group0e789}= useContext(TotalContext) as TotalContextProps;
  const {del_group0e789Props, setdel_group0e789Props}= useContext(TotalContext) as TotalContextProps;
  const {delete_heading_txtc115c, setdelete_heading_txtc115c}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_19e216, setdel_divider_19e216}= useContext(TotalContext) as TotalContextProps;
  const {del_field_map_id42f08, setdel_field_map_id42f08}= useContext(TotalContext) as TotalContextProps;
  const {field_map_id7529d, setfield_map_id7529d}= useContext(TotalContext) as TotalContextProps;
  const {del_integration_source_text3544e, setdel_integration_source_text3544e}= useContext(TotalContext) as TotalContextProps;
  const {source_name6c577, setsource_name6c577}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path_textdb42b, setsource_field_path_textdb42b}= useContext(TotalContext) as TotalContextProps;
  const {source_field_path92e47, setsource_field_path92e47}= useContext(TotalContext) as TotalContextProps;
  const {targe_tentity__text6b5d0, settarge_tentity__text6b5d0}= useContext(TotalContext) as TotalContextProps;
  const {target_entity6f0f5, settarget_entity6f0f5}= useContext(TotalContext) as TotalContextProps;
  const {target_attribute_txtf878b, settarget_attribute_txtf878b}= useContext(TotalContext) as TotalContextProps;
  const {target_attributedce21, settarget_attributedce21}= useContext(TotalContext) as TotalContextProps;
  const {is_active_txt7b746, setis_active_txt7b746}= useContext(TotalContext) as TotalContextProps;
  const {is_active9655f, setis_active9655f}= useContext(TotalContext) as TotalContextProps;
  const {textb50e5, settextb50e5}= useContext(TotalContext) as TotalContextProps;
  const {del_divider_231d84, setdel_divider_231d84}= useContext(TotalContext) as TotalContextProps;
  const {del_cancel_btn4ada6, setdel_cancel_btn4ada6}= useContext(TotalContext) as TotalContextProps;
  const {del_okl_btnb2163, setdel_okl_btnb2163}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const del_group0e789Ref = useRef(del_group0e789);
  useEffect(() => {
    del_group0e789Ref.current = del_group0e789;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [del_group0e789]);
  
  //group props in ref to access latest props value
  const del_group0e789PropsRef = useRef(del_group0e789Props);
  useEffect(() => {
    del_group0e789PropsRef.current = del_group0e789Props;
  }, [del_group0e789Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['del_group'] = del_group0e789,
        codeStates['setdel_group'] = setdel_group0e789,
        codeStates['del_group0e789'] = del_group0e789Props,
        codeStates['setdel_group0e789'] = setdel_group0e789Props,
        codeStates['delete_heading_txt'] = delete_heading_txtc115c,
        codeStates['setdelete_heading_txt'] = setdelete_heading_txtc115c,
        codeStates['del_divider_1'] = del_divider_19e216,
        codeStates['setdel_divider_1'] = setdel_divider_19e216,
        codeStates['del_field_map_id'] = del_field_map_id42f08,
        codeStates['setdel_field_map_id'] = setdel_field_map_id42f08,
        codeStates['field_map_id'] = field_map_id7529d,
        codeStates['setfield_map_id'] = setfield_map_id7529d,
        codeStates['del_integration_source_text'] = del_integration_source_text3544e,
        codeStates['setdel_integration_source_text'] = setdel_integration_source_text3544e,
        codeStates['source_name'] = source_name6c577,
        codeStates['setsource_name'] = setsource_name6c577,
        codeStates['source_field_path_text'] = source_field_path_textdb42b,
        codeStates['setsource_field_path_text'] = setsource_field_path_textdb42b,
        codeStates['source_field_path'] = source_field_path92e47,
        codeStates['setsource_field_path'] = setsource_field_path92e47,
        codeStates['targe_tentity__text'] = targe_tentity__text6b5d0,
        codeStates['settarge_tentity__text'] = settarge_tentity__text6b5d0,
        codeStates['target_entity'] = target_entity6f0f5,
        codeStates['settarget_entity'] = settarget_entity6f0f5,
        codeStates['target_attribute_txt'] = target_attribute_txtf878b,
        codeStates['settarget_attribute_txt'] = settarget_attribute_txtf878b,
        codeStates['target_attribute'] = target_attributedce21,
        codeStates['settarget_attribute'] = settarget_attributedce21,
        codeStates['is_active_txt'] = is_active_txt7b746,
        codeStates['setis_active_txt'] = setis_active_txt7b746,
        codeStates['is_active'] = is_active9655f,
        codeStates['setis_active'] = setis_active9655f,
        codeStates['text'] = textb50e5,
        codeStates['settext'] = settextb50e5,
        codeStates['del_divider_2'] = del_divider_231d84,
        codeStates['setdel_divider_2'] = setdel_divider_231d84,
        codeStates['del_cancel_btn'] = del_cancel_btn4ada6,
        codeStates['setdel_cancel_btn'] = setdel_cancel_btn4ada6,
        codeStates['del_okl_btn'] = del_okl_btnb2163,
        codeStates['setdel_okl_btn'] = setdel_okl_btnb2163,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deleteintegrationfieldmap_v1, setdeleteintegrationfieldmap_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...del_group0e789Ref.current,...data};
      let parentRowSpan = 66;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f67b42decab0e7c44d9497474aa0e789",
        "fcdb8eb589cb94eca7a46125f724ada6"
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
      if (id === "del_cancel_btn4ada6") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "fcdb8eb589cb94eca7a46125f724ada6") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "del_cancel_btn4ada6");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!del_cancel_btn4ada6?.trigger) return;
      if(del_cancel_btn4ada6?.trigger){
      setdel_cancel_btn4ada6((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[del_cancel_btn4ada6?.trigger])

  useEffect(()=>{
    if(del_cancel_btn4ada6?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[del_cancel_btn4ada6?.refresh])
  

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
        setdel_group0e789((prev: any) => ({ ...prev, del_cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deleteintegrationfieldmap');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdel_group0e789((prev: any) => ({ ...prev, del_cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setdel_group0e789((prev: any) => ({ ...prev, del_cancel_btn: false }));
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

 if (del_cancel_btn4ada6?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `12 / 19`,gridRow: `56 / 62`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {del_cancel_btn4ada6?.isDisabled ? true : false}
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

