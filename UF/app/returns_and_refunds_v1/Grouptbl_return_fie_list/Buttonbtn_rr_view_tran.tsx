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
 

const Buttonbtn_rr_view_tran = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {grp_wpsb96c6, setgrp_wpsb96c6}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsb96c6Props, setgrp_wpsb96c6Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127, setgrp_eobed127}= useContext(TotalContext) as TotalContextProps;
  const {grp_eobed127Props, setgrp_eobed127Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03, setgrp_return_refundc4a03}= useContext(TotalContext) as TotalContextProps;
  const {grp_return_refundc4a03Props, setgrp_return_refundc4a03Props}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7, settabgroup_return_refund4e9b7}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund4e9b7Props, settabgroup_return_refund4e9b7Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327, settab_header_return_frm_agent2d327}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_return_frm_agent2d327Props, settab_header_return_frm_agent2d327Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6, setgrp_retun_ref3e6e6}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref3e6e6Props, setgrp_retun_ref3e6e6Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636, settbl_return_fie_list8f636}= useContext(TotalContext) as TotalContextProps;
  const {tbl_return_fie_list8f636Props, settbl_return_fie_list8f636Props}= useContext(TotalContext) as TotalContextProps;
  const {col_src_namee7c6a, setcol_src_namee7c6a}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_count3ad7d, setcol_tran_count3ad7d}= useContext(TotalContext) as TotalContextProps;
  const {btn_rr_view_tran772a2, setbtn_rr_view_tran772a2}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amnt007c9, setcol_fixed_amnt007c9}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amntdff09, setcol_var_amntdff09}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_file_amnt9fdc3, setcol_tot_file_amnt9fdc3}= useContext(TotalContext) as TotalContextProps;
  const {col_created_datef8d57, setcol_created_datef8d57}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_name809f4, setcol_sf_file_name809f4}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2, settab_header_req_for_refundeadd2}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_req_for_refundeadd2Props, settab_header_req_for_refundeadd2Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362d, setgrp_rr_retun_ref5362d}= useContext(TotalContext) as TotalContextProps;
  const {grp_rr_retun_ref5362dProps, setgrp_rr_retun_ref5362dProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9a, settbl_rr_req_for_refunde2c9a}= useContext(TotalContext) as TotalContextProps;
  const {tbl_rr_req_for_refunde2c9aProps, settbl_rr_req_for_refunde2c9aProps}= useContext(TotalContext) as TotalContextProps;
  const {returntransactionlist_v1Props, setreturntransactionlist_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list858ed, settbl_tran_list858ed}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list858edProps, settbl_tran_list858edProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_wps'] = grp_wpsb96c6,
      codeStates['setgrp_wps'] = setgrp_wpsb96c6,
      codeStates['grp_wpsb96c6'] = grp_wpsb96c6Props,
      codeStates['setgrp_wpsb96c6'] = setgrp_wpsb96c6Props,
      codeStates['grp_eob'] = grp_eobed127,
      codeStates['setgrp_eob'] = setgrp_eobed127,
      codeStates['grp_eobed127'] = grp_eobed127Props,
      codeStates['setgrp_eobed127'] = setgrp_eobed127Props,
      codeStates['grp_return_refund'] = grp_return_refundc4a03,
      codeStates['setgrp_return_refund'] = setgrp_return_refundc4a03,
      codeStates['grp_return_refundc4a03'] = grp_return_refundc4a03Props,
      codeStates['setgrp_return_refundc4a03'] = setgrp_return_refundc4a03Props,
      codeStates['tabgroup_return_refund'] = tabgroup_return_refund4e9b7,
      codeStates['settabgroup_return_refund'] = settabgroup_return_refund4e9b7,
      codeStates['tabgroup_return_refund4e9b7'] = tabgroup_return_refund4e9b7Props,
      codeStates['settabgroup_return_refund4e9b7'] = settabgroup_return_refund4e9b7Props,
      codeStates['tab_header_return_frm_agent'] = tab_header_return_frm_agent2d327,
      codeStates['settab_header_return_frm_agent'] = settab_header_return_frm_agent2d327,
      codeStates['tab_header_return_frm_agent2d327'] = tab_header_return_frm_agent2d327Props,
      codeStates['settab_header_return_frm_agent2d327'] = settab_header_return_frm_agent2d327Props,
      codeStates['grp_retun_ref'] = grp_retun_ref3e6e6,
      codeStates['setgrp_retun_ref'] = setgrp_retun_ref3e6e6,
      codeStates['grp_retun_ref3e6e6'] = grp_retun_ref3e6e6Props,
      codeStates['setgrp_retun_ref3e6e6'] = setgrp_retun_ref3e6e6Props,
      codeStates['tbl_return_fie_list'] = tbl_return_fie_list8f636,
      codeStates['settbl_return_fie_list'] = settbl_return_fie_list8f636,
      codeStates['tbl_return_fie_list8f636'] = tbl_return_fie_list8f636Props,
      codeStates['settbl_return_fie_list8f636'] = settbl_return_fie_list8f636Props,
      codeStates['col_src_name'] = col_src_namee7c6a,
      codeStates['setcol_src_name'] = setcol_src_namee7c6a,
      codeStates['col_tran_count'] = col_tran_count3ad7d,
      codeStates['setcol_tran_count'] = setcol_tran_count3ad7d,
      codeStates['btn_rr_view_tran'] = btn_rr_view_tran772a2,
      codeStates['setbtn_rr_view_tran'] = setbtn_rr_view_tran772a2,
      codeStates['col_fixed_amnt'] = col_fixed_amnt007c9,
      codeStates['setcol_fixed_amnt'] = setcol_fixed_amnt007c9,
      codeStates['col_var_amnt'] = col_var_amntdff09,
      codeStates['setcol_var_amnt'] = setcol_var_amntdff09,
      codeStates['col_tot_file_amnt'] = col_tot_file_amnt9fdc3,
      codeStates['setcol_tot_file_amnt'] = setcol_tot_file_amnt9fdc3,
      codeStates['col_created_date'] = col_created_datef8d57,
      codeStates['setcol_created_date'] = setcol_created_datef8d57,
      codeStates['col_sf_file_name'] = col_sf_file_name809f4,
      codeStates['setcol_sf_file_name'] = setcol_sf_file_name809f4,
      codeStates['tab_header_req_for_refund'] = tab_header_req_for_refundeadd2,
      codeStates['settab_header_req_for_refund'] = settab_header_req_for_refundeadd2,
      codeStates['tab_header_req_for_refundeadd2'] = tab_header_req_for_refundeadd2Props,
      codeStates['settab_header_req_for_refundeadd2'] = settab_header_req_for_refundeadd2Props,
      codeStates['grp_rr_retun_ref'] = grp_rr_retun_ref5362d,
      codeStates['setgrp_rr_retun_ref'] = setgrp_rr_retun_ref5362d,
      codeStates['grp_rr_retun_ref5362d'] = grp_rr_retun_ref5362dProps,
      codeStates['setgrp_rr_retun_ref5362d'] = setgrp_rr_retun_ref5362dProps,
      codeStates['tbl_rr_req_for_refund'] = tbl_rr_req_for_refunde2c9a,
      codeStates['settbl_rr_req_for_refund'] = settbl_rr_req_for_refunde2c9a,
      codeStates['tbl_rr_req_for_refunde2c9a'] = tbl_rr_req_for_refunde2c9aProps,
      codeStates['settbl_rr_req_for_refunde2c9a'] = settbl_rr_req_for_refunde2c9aProps,
      codeStates['returntransactionlist_v1'] = returntransactionlist_v1Props,
      codeStates['setreturntransactionlist_v1'] = setreturntransactionlist_v1Props,
      codeStates['tbl_tran_list'] = tbl_tran_list858ed,
      codeStates['settbl_tran_list'] = settbl_tran_list858ed,
      codeStates['tbl_tran_list858ed'] = tbl_tran_list858edProps,
      codeStates['settbl_tran_list858ed'] = settbl_tran_list858edProps,
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
        "096e0d000b1845519b0f79759518f636",
        "44f31b66c289b82ba5d22f38ee8772a2"
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
      if (id === "btn_rr_view_tran772a2") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_rr_view_tran772a2?.refresh])


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

    // showArtifact
    let filterProps2: any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setreturntransactionlist_v1Props([...filterData2 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnTransactionList:AFVK:v1', 'returntransactionlist_v1'));
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,tbl_tran_list858edProps?.controls);
    settbl_tran_list858ed(bindData4||{})
    settbl_tran_list858edProps({...tbl_tran_list858edProps,presetValues:{...(mainData||{})},tableName:tableName})
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
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

 if (btn_rr_view_tran772a2?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1','returnsrefund','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_rr_view_tran772a2?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Transaction")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_rr_view_tran

