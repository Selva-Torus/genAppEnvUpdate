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
import PageWpstranjourneydetailspage6 from '@/app/wpstranjourneydetails_v1/wpstranjourneydetails_v1page';
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
 

const Buttonbtn_view_data = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {grp_overall_tran_jrny_list67aa9, setgrp_overall_tran_jrny_list67aa9}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_jrny_list67aa9Props, setgrp_overall_tran_jrny_list67aa9Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_jrny_list6d62f, settbl_tran_jrny_list6d62f}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_jrny_list6d62fProps, settbl_tran_jrny_list6d62fProps}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_file1c7b1, setcol_sal_file1c7b1}= useContext(TotalContext) as TotalContextProps;
  const {col_source_name34913, setcol_source_name34913}= useContext(TotalContext) as TotalContextProps;
  const {col_process_name31fa1, setcol_process_name31fa1}= useContext(TotalContext) as TotalContextProps;
  const {col_process3a817, setcol_process3a817}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date35d64, setcol_created_date35d64}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_data0ca2b, setbtn_view_data0ca2b}= useContext(TotalContext) as TotalContextProps;
  const {col_stepee23d, setcol_stepee23d}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_uuidce7f9, setcol_tran_uuidce7f9}= useContext(TotalContext) as TotalContextProps;
  const {col_status4cffe, setcol_status4cffe}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_journeydb055, setbtn_view_journeydb055}= useContext(TotalContext) as TotalContextProps;
  const {grp_req_res_details9db08, setgrp_req_res_details9db08}= useContext(TotalContext) as TotalContextProps;
  const {grp_req_res_details9db08Props, setgrp_req_res_details9db08Props}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7, setjourney_details_group764b7}= useContext(TotalContext) as TotalContextProps;
  const {journey_details_group764b7Props, setjourney_details_group764b7Props}= useContext(TotalContext) as TotalContextProps;
  const {wpstranjourneydetails_v1Props, setwpstranjourneydetails_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_overall_tran_jrny_list'] = grp_overall_tran_jrny_list67aa9,
      codeStates['setgrp_overall_tran_jrny_list'] = setgrp_overall_tran_jrny_list67aa9,
      codeStates['grp_overall_tran_jrny_list67aa9'] = grp_overall_tran_jrny_list67aa9Props,
      codeStates['setgrp_overall_tran_jrny_list67aa9'] = setgrp_overall_tran_jrny_list67aa9Props,
      codeStates['tbl_tran_jrny_list'] = tbl_tran_jrny_list6d62f,
      codeStates['settbl_tran_jrny_list'] = settbl_tran_jrny_list6d62f,
      codeStates['tbl_tran_jrny_list6d62f'] = tbl_tran_jrny_list6d62fProps,
      codeStates['settbl_tran_jrny_list6d62f'] = settbl_tran_jrny_list6d62fProps,
      codeStates['col_sal_file'] = col_sal_file1c7b1,
      codeStates['setcol_sal_file'] = setcol_sal_file1c7b1,
      codeStates['col_source_name'] = col_source_name34913,
      codeStates['setcol_source_name'] = setcol_source_name34913,
      codeStates['col_process_name'] = col_process_name31fa1,
      codeStates['setcol_process_name'] = setcol_process_name31fa1,
      codeStates['col_process'] = col_process3a817,
      codeStates['setcol_process'] = setcol_process3a817,
      codeStates['col_created_date'] = col_created_date35d64,
      codeStates['setcol_created_date'] = setcol_created_date35d64,
      codeStates['btn_view_data'] = btn_view_data0ca2b,
      codeStates['setbtn_view_data'] = setbtn_view_data0ca2b,
      codeStates['col_step'] = col_stepee23d,
      codeStates['setcol_step'] = setcol_stepee23d,
      codeStates['col_tran_uuid'] = col_tran_uuidce7f9,
      codeStates['setcol_tran_uuid'] = setcol_tran_uuidce7f9,
      codeStates['col_status'] = col_status4cffe,
      codeStates['setcol_status'] = setcol_status4cffe,
      codeStates['btn_view_journey'] = btn_view_journeydb055,
      codeStates['setbtn_view_journey'] = setbtn_view_journeydb055,
      codeStates['grp_req_res_details'] = grp_req_res_details9db08,
      codeStates['setgrp_req_res_details'] = setgrp_req_res_details9db08,
      codeStates['grp_req_res_details9db08'] = grp_req_res_details9db08Props,
      codeStates['setgrp_req_res_details9db08'] = setgrp_req_res_details9db08Props,
      codeStates['journey_details_group'] = journey_details_group764b7,
      codeStates['setjourney_details_group'] = setjourney_details_group764b7,
      codeStates['journey_details_group764b7'] = journey_details_group764b7Props,
      codeStates['setjourney_details_group764b7'] = setjourney_details_group764b7Props,
      codeStates['wpstranjourneydetails_v1'] = wpstranjourneydetails_v1Props,
      codeStates['setwpstranjourneydetails_v1'] = setwpstranjourneydetails_v1Props,
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
        "8a5e4bc9b06d6e40fb5d2cb34b86d62f",
        "125fc2e84e3de991856493c18a50ca2b"
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
      if (id === "btn_view_data0ca2b") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
  },[btn_view_data0ca2b?.refresh])


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

    //bindTran
    // For group or table
    setgrp_req_res_details9db08(mainData||{})
    setgrp_req_res_details9db08Props({...grp_req_res_details9db08Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    setjourney_details_group764b7(mainData||{})
    setjourney_details_group764b7Props({...journey_details_group764b7Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps6:any =  [];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setwpstranjourneydetails_v1Props([...filterData6 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen6(true);
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

 if (btn_view_data0ca2b?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionListWithJourney:AFVK:v1','transactionlistwithjourney','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen6} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {false}
        position = {"center"}
        modalName = "wpstranjourneydetails"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageWpstranjourneydetailspage6  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_view_data0ca2b?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Data")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_view_data

