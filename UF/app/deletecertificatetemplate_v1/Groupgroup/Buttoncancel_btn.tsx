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

  const {group84d30, setgroup84d30}= useContext(TotalContext) as TotalContextProps;
  const {group84d30Props, setgroup84d30Props}= useContext(TotalContext) as TotalContextProps;
  const {del_heading_text10f67, setdel_heading_text10f67}= useContext(TotalContext) as TotalContextProps;
  const {divider_16c710, setdivider_16c710}= useContext(TotalContext) as TotalContextProps;
  const {del_template_code7b871, setdel_template_code7b871}= useContext(TotalContext) as TotalContextProps;
  const {template_codeb7abe, settemplate_codeb7abe}= useContext(TotalContext) as TotalContextProps;
  const {del_template_name73ab9, setdel_template_name73ab9}= useContext(TotalContext) as TotalContextProps;
  const {template_name5bed7, settemplate_name5bed7}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_tier_code247d5, setdel_applies_tier_code247d5}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_coded4d29, setapplies_tier_coded4d29}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_use_casef094c, setdel_applies_use_casef094c}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_casef037b, setapplies_use_casef037b}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typea5e3d, setapplies_asset_typea5e3d}= useContext(TotalContext) as TotalContextProps;
  const {del_applies_asset_typeabda2, setdel_applies_asset_typeabda2}= useContext(TotalContext) as TotalContextProps;
  const {validity_monthsc0c5a, setvalidity_monthsc0c5a}= useContext(TotalContext) as TotalContextProps;
  const {del_validity_monthsf911c, setdel_validity_monthsf911c}= useContext(TotalContext) as TotalContextProps;
  const {template_version21972, settemplate_version21972}= useContext(TotalContext) as TotalContextProps;
  const {del_template_version5c803, setdel_template_version5c803}= useContext(TotalContext) as TotalContextProps;
  const {is_active8dede, setis_active8dede}= useContext(TotalContext) as TotalContextProps;
  const {del_is_active7a7ba, setdel_is_active7a7ba}= useContext(TotalContext) as TotalContextProps;
  const {text58d63, settext58d63}= useContext(TotalContext) as TotalContextProps;
  const {divider_2d3d61, setdivider_2d3d61}= useContext(TotalContext) as TotalContextProps;
  const {cancel_btnc7ae2, setcancel_btnc7ae2}= useContext(TotalContext) as TotalContextProps;
  const {ok_btnce26e, setok_btnce26e}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_idd4429, setcert_template_idd4429}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const group84d30Ref = useRef(group84d30);
  useEffect(() => {
    group84d30Ref.current = group84d30;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group84d30]);
  
  //group props in ref to access latest props value
  const group84d30PropsRef = useRef(group84d30Props);
  useEffect(() => {
    group84d30PropsRef.current = group84d30Props;
  }, [group84d30Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['group'] = group84d30,
        codeStates['setgroup'] = setgroup84d30,
        codeStates['group84d30'] = group84d30Props,
        codeStates['setgroup84d30'] = setgroup84d30Props,
        codeStates['del_heading_text'] = del_heading_text10f67,
        codeStates['setdel_heading_text'] = setdel_heading_text10f67,
        codeStates['divider_1'] = divider_16c710,
        codeStates['setdivider_1'] = setdivider_16c710,
        codeStates['del_template_code'] = del_template_code7b871,
        codeStates['setdel_template_code'] = setdel_template_code7b871,
        codeStates['template_code'] = template_codeb7abe,
        codeStates['settemplate_code'] = settemplate_codeb7abe,
        codeStates['del_template_name'] = del_template_name73ab9,
        codeStates['setdel_template_name'] = setdel_template_name73ab9,
        codeStates['template_name'] = template_name5bed7,
        codeStates['settemplate_name'] = settemplate_name5bed7,
        codeStates['del_applies_tier_code'] = del_applies_tier_code247d5,
        codeStates['setdel_applies_tier_code'] = setdel_applies_tier_code247d5,
        codeStates['applies_tier_code'] = applies_tier_coded4d29,
        codeStates['setapplies_tier_code'] = setapplies_tier_coded4d29,
        codeStates['del_applies_use_case'] = del_applies_use_casef094c,
        codeStates['setdel_applies_use_case'] = setdel_applies_use_casef094c,
        codeStates['applies_use_case'] = applies_use_casef037b,
        codeStates['setapplies_use_case'] = setapplies_use_casef037b,
        codeStates['applies_asset_type'] = applies_asset_typea5e3d,
        codeStates['setapplies_asset_type'] = setapplies_asset_typea5e3d,
        codeStates['del_applies_asset_type'] = del_applies_asset_typeabda2,
        codeStates['setdel_applies_asset_type'] = setdel_applies_asset_typeabda2,
        codeStates['validity_months'] = validity_monthsc0c5a,
        codeStates['setvalidity_months'] = setvalidity_monthsc0c5a,
        codeStates['del_validity_months'] = del_validity_monthsf911c,
        codeStates['setdel_validity_months'] = setdel_validity_monthsf911c,
        codeStates['template_version'] = template_version21972,
        codeStates['settemplate_version'] = settemplate_version21972,
        codeStates['del_template_version'] = del_template_version5c803,
        codeStates['setdel_template_version'] = setdel_template_version5c803,
        codeStates['is_active'] = is_active8dede,
        codeStates['setis_active'] = setis_active8dede,
        codeStates['del_is_active'] = del_is_active7a7ba,
        codeStates['setdel_is_active'] = setdel_is_active7a7ba,
        codeStates['text'] = text58d63,
        codeStates['settext'] = settext58d63,
        codeStates['divider_2'] = divider_2d3d61,
        codeStates['setdivider_2'] = setdivider_2d3d61,
        codeStates['cancel_btn'] = cancel_btnc7ae2,
        codeStates['setcancel_btn'] = setcancel_btnc7ae2,
        codeStates['ok_btn'] = ok_btnce26e,
        codeStates['setok_btn'] = setok_btnce26e,
        codeStates['cert_template_id'] = cert_template_idd4429,
        codeStates['setcert_template_id'] = setcert_template_idd4429,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {deletecertificatetemplate_v1, setdeletecertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...group84d30Ref.current,...data};
      let parentRowSpan = 81;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "96551d565eaf40d5adc4bbd8ea684d30",
        "5224dbc68eb543f5955edf2f751c7ae2"
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
      if (id === "cancel_btnc7ae2") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "5224dbc68eb543f5955edf2f751c7ae2") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cancel_btnc7ae2");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!cancel_btnc7ae2?.trigger) return;
      if(cancel_btnc7ae2?.trigger){
      setcancel_btnc7ae2((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[cancel_btnc7ae2?.trigger])

  useEffect(()=>{
    if(cancel_btnc7ae2?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cancel_btnc7ae2?.refresh])
  

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
        setgroup84d30((prev: any) => ({ ...prev, cancel_btn: true }));
        //onClick

    // closeHandler   
    eventBus.emit('closeModal', 'deletecertificatetemplate');
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup84d30((prev: any) => ({ ...prev, cancel_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setgroup84d30((prev: any) => ({ ...prev, cancel_btn: false }));
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

 if (cancel_btnc7ae2?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `13 / 19`,gridRow: `73 / 79`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#6B7280] hover:!bg-[#4B5563] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {cancel_btnc7ae2?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Cancel")}
        </Button>}
      </div>
    
  )
}

export default Buttoncancel_btn

