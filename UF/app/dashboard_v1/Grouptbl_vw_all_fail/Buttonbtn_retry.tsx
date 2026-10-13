'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageInfomsgpopuppage2 from '@/app/infomsgpopup_v1/infomsgpopup_v1page';
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
 

const Buttonbtn_retry = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
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
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {grp_wpsc6e49, setgrp_wpsc6e49}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsc6e49Props, setgrp_wpsc6e49Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob07ed4, setgrp_eob07ed4}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob07ed4Props, setgrp_eob07ed4Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiry759a6, setgrp_enquiry759a6}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiry759a6Props, setgrp_enquiry759a6Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_dashboard0d387, settabgroup_dashboard0d387}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_dashboard0d387Props, settabgroup_dashboard0d387Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_failcb8d9, settab_header_view_all_failcb8d9}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_failcb8d9Props, settab_header_view_all_failcb8d9Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref84e8f, setgrp_retun_ref84e8f}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref84e8fProps, setgrp_retun_ref84e8fProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05, settbl_vw_all_failf2e05}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_failf2e05Props, settbl_vw_all_failf2e05Props}= useContext(TotalContext) as TotalContextProps;
  const {col_com_code8c08a, setcol_com_code8c08a}= useContext(TotalContext) as TotalContextProps;
  const {col_emir_id08252, setcol_emir_id08252}= useContext(TotalContext) as TotalContextProps;
  const {btn_retryb8593, setbtn_retryb8593}= useContext(TotalContext) as TotalContextProps;
  const {col_reg_no9e196, setcol_reg_no9e196}= useContext(TotalContext) as TotalContextProps;
  const {col_prcs_nameb7721, setcol_prcs_nameb7721}= useContext(TotalContext) as TotalContextProps;
  const {col_sts9c434, setcol_sts9c434}= useContext(TotalContext) as TotalContextProps;
  const {col_sif_name7de17, setcol_sif_name7de17}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_monthaa65c, setcol_sal_monthaa65c}= useContext(TotalContext) as TotalContextProps;
  const {col_created_dated290b, setcol_created_dated290b}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_req_res6cb5d, setbtn_view_req_res6cb5d}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_successdba67, settab_headerview_all_successdba67}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_successdba67Props, settab_headerview_all_successdba67Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3, setgrp_reqforref8b4e3}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref8b4e3Props, setgrp_reqforref8b4e3Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924, settbl_view_all_successbc924}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_successbc924Props, settbl_view_all_successbc924Props}= useContext(TotalContext) as TotalContextProps;
  const {infomsgpopup_v1Props, setinfomsgpopup_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_wps'] = grp_wpsc6e49,
      codeStates['setgrp_wps'] = setgrp_wpsc6e49,
      codeStates['grp_wpsc6e49'] = grp_wpsc6e49Props,
      codeStates['setgrp_wpsc6e49'] = setgrp_wpsc6e49Props,
      codeStates['grp_eob'] = grp_eob07ed4,
      codeStates['setgrp_eob'] = setgrp_eob07ed4,
      codeStates['grp_eob07ed4'] = grp_eob07ed4Props,
      codeStates['setgrp_eob07ed4'] = setgrp_eob07ed4Props,
      codeStates['grp_enquiry'] = grp_enquiry759a6,
      codeStates['setgrp_enquiry'] = setgrp_enquiry759a6,
      codeStates['grp_enquiry759a6'] = grp_enquiry759a6Props,
      codeStates['setgrp_enquiry759a6'] = setgrp_enquiry759a6Props,
      codeStates['tabgroup_dashboard'] = tabgroup_dashboard0d387,
      codeStates['settabgroup_dashboard'] = settabgroup_dashboard0d387,
      codeStates['tabgroup_dashboard0d387'] = tabgroup_dashboard0d387Props,
      codeStates['settabgroup_dashboard0d387'] = settabgroup_dashboard0d387Props,
      codeStates['tab_header_view_all_fail'] = tab_header_view_all_failcb8d9,
      codeStates['settab_header_view_all_fail'] = settab_header_view_all_failcb8d9,
      codeStates['tab_header_view_all_failcb8d9'] = tab_header_view_all_failcb8d9Props,
      codeStates['settab_header_view_all_failcb8d9'] = settab_header_view_all_failcb8d9Props,
      codeStates['grp_retun_ref'] = grp_retun_ref84e8f,
      codeStates['setgrp_retun_ref'] = setgrp_retun_ref84e8f,
      codeStates['grp_retun_ref84e8f'] = grp_retun_ref84e8fProps,
      codeStates['setgrp_retun_ref84e8f'] = setgrp_retun_ref84e8fProps,
      codeStates['tbl_vw_all_fail'] = tbl_vw_all_failf2e05,
      codeStates['settbl_vw_all_fail'] = settbl_vw_all_failf2e05,
      codeStates['tbl_vw_all_failf2e05'] = tbl_vw_all_failf2e05Props,
      codeStates['settbl_vw_all_failf2e05'] = settbl_vw_all_failf2e05Props,
      codeStates['col_com_code'] = col_com_code8c08a,
      codeStates['setcol_com_code'] = setcol_com_code8c08a,
      codeStates['col_emir_id'] = col_emir_id08252,
      codeStates['setcol_emir_id'] = setcol_emir_id08252,
      codeStates['btn_retry'] = btn_retryb8593,
      codeStates['setbtn_retry'] = setbtn_retryb8593,
      codeStates['col_reg_no'] = col_reg_no9e196,
      codeStates['setcol_reg_no'] = setcol_reg_no9e196,
      codeStates['col_prcs_name'] = col_prcs_nameb7721,
      codeStates['setcol_prcs_name'] = setcol_prcs_nameb7721,
      codeStates['col_sts'] = col_sts9c434,
      codeStates['setcol_sts'] = setcol_sts9c434,
      codeStates['col_sif_name'] = col_sif_name7de17,
      codeStates['setcol_sif_name'] = setcol_sif_name7de17,
      codeStates['col_sal_month'] = col_sal_monthaa65c,
      codeStates['setcol_sal_month'] = setcol_sal_monthaa65c,
      codeStates['col_created_date'] = col_created_dated290b,
      codeStates['setcol_created_date'] = setcol_created_dated290b,
      codeStates['btn_view_req_res'] = btn_view_req_res6cb5d,
      codeStates['setbtn_view_req_res'] = setbtn_view_req_res6cb5d,
      codeStates['tab_headerview_all_success'] = tab_headerview_all_successdba67,
      codeStates['settab_headerview_all_success'] = settab_headerview_all_successdba67,
      codeStates['tab_headerview_all_successdba67'] = tab_headerview_all_successdba67Props,
      codeStates['settab_headerview_all_successdba67'] = settab_headerview_all_successdba67Props,
      codeStates['grp_reqforref'] = grp_reqforref8b4e3,
      codeStates['setgrp_reqforref'] = setgrp_reqforref8b4e3,
      codeStates['grp_reqforref8b4e3'] = grp_reqforref8b4e3Props,
      codeStates['setgrp_reqforref8b4e3'] = setgrp_reqforref8b4e3Props,
      codeStates['tbl_view_all_success'] = tbl_view_all_successbc924,
      codeStates['settbl_view_all_success'] = settbl_view_all_successbc924,
      codeStates['tbl_view_all_successbc924'] = tbl_view_all_successbc924Props,
      codeStates['settbl_view_all_successbc924'] = settbl_view_all_successbc924Props,
      codeStates['infomsgpopup_v1'] = infomsgpopup_v1Props,
      codeStates['setinfomsgpopup_v1'] = setinfomsgpopup_v1Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ac180958a9888559fc0844ae7ebf2e05",
        "15a0216d9908f9aa5214e7918bbb8593"
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
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "btn_retryb8593") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[btn_retryb8593?.refresh])


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

  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setinfomsgpopup_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
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

 if (btn_retryb8593?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1','dashboard','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "infomsgpopup"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageInfomsgpopuppage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_retryb8593?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Retry")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_retry

