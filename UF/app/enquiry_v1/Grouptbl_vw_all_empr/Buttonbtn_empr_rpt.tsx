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
 

const Buttonbtn_empr_rpt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {grp_wpsfa727, setgrp_wpsfa727}= useContext(TotalContext) as TotalContextProps;
  const {grp_wpsfa727Props, setgrp_wpsfa727Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfac, setgrp_eob8dfac}= useContext(TotalContext) as TotalContextProps;
  const {grp_eob8dfacProps, setgrp_eob8dfacProps}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2a, setgrp_enquiryd2b2a}= useContext(TotalContext) as TotalContextProps;
  const {grp_enquiryd2b2aProps, setgrp_enquiryd2b2aProps}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511db, settabgroup_return_refund511db}= useContext(TotalContext) as TotalContextProps;
  const {tabgroup_return_refund511dbProps, settabgroup_return_refund511dbProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45, settab_header_view_all_emp58f45}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_view_all_emp58f45Props, settab_header_view_all_emp58f45Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2, setgrp_retun_ref230e2}= useContext(TotalContext) as TotalContextProps;
  const {grp_retun_ref230e2Props, setgrp_retun_ref230e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9, settbl_vw_all_empr8a2a9}= useContext(TotalContext) as TotalContextProps;
  const {tbl_vw_all_empr8a2a9Props, settbl_vw_all_empr8a2a9Props}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_mold12cb, setcol_cor_mold12cb}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_namw4bb17, setcol_cor_namw4bb17}= useContext(TotalContext) as TotalContextProps;
  const {btn_get_reg_emprb999a, setbtn_get_reg_emprb999a}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_reg_idf2c18, setcol_cor_reg_idf2c18}= useContext(TotalContext) as TotalContextProps;
  const {col_cor_eidcba45, setcol_cor_eidcba45}= useContext(TotalContext) as TotalContextProps;
  const {col_mh_sts9087c, setcol_mh_sts9087c}= useContext(TotalContext) as TotalContextProps;
  const {btn_empr_rpt13ff7, setbtn_empr_rpt13ff7}= useContext(TotalContext) as TotalContextProps;
  const {btn_empr_status5b036, setbtn_empr_status5b036}= useContext(TotalContext) as TotalContextProps;
  const {btn_getemployes2c08a, setbtn_getemployes2c08a}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773, settab_headerview_all_tranaa773}= useContext(TotalContext) as TotalContextProps;
  const {tab_headerview_all_tranaa773Props, settab_headerview_all_tranaa773Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82e, setgrp_reqforref4f82e}= useContext(TotalContext) as TotalContextProps;
  const {grp_reqforref4f82eProps, setgrp_reqforref4f82eProps}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49d, settbl_view_all_tran1b49d}= useContext(TotalContext) as TotalContextProps;
  const {tbl_view_all_tran1b49dProps, settbl_view_all_tran1b49dProps}= useContext(TotalContext) as TotalContextProps;
  const {enquiryempsalrpt_v1Props, setenquiryempsalrpt_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_wps'] = grp_wpsfa727,
      codeStates['setgrp_wps'] = setgrp_wpsfa727,
      codeStates['grp_wpsfa727'] = grp_wpsfa727Props,
      codeStates['setgrp_wpsfa727'] = setgrp_wpsfa727Props,
      codeStates['grp_eob'] = grp_eob8dfac,
      codeStates['setgrp_eob'] = setgrp_eob8dfac,
      codeStates['grp_eob8dfac'] = grp_eob8dfacProps,
      codeStates['setgrp_eob8dfac'] = setgrp_eob8dfacProps,
      codeStates['grp_enquiry'] = grp_enquiryd2b2a,
      codeStates['setgrp_enquiry'] = setgrp_enquiryd2b2a,
      codeStates['grp_enquiryd2b2a'] = grp_enquiryd2b2aProps,
      codeStates['setgrp_enquiryd2b2a'] = setgrp_enquiryd2b2aProps,
      codeStates['tabgroup_return_refund'] = tabgroup_return_refund511db,
      codeStates['settabgroup_return_refund'] = settabgroup_return_refund511db,
      codeStates['tabgroup_return_refund511db'] = tabgroup_return_refund511dbProps,
      codeStates['settabgroup_return_refund511db'] = settabgroup_return_refund511dbProps,
      codeStates['tab_header_view_all_emp'] = tab_header_view_all_emp58f45,
      codeStates['settab_header_view_all_emp'] = settab_header_view_all_emp58f45,
      codeStates['tab_header_view_all_emp58f45'] = tab_header_view_all_emp58f45Props,
      codeStates['settab_header_view_all_emp58f45'] = settab_header_view_all_emp58f45Props,
      codeStates['grp_retun_ref'] = grp_retun_ref230e2,
      codeStates['setgrp_retun_ref'] = setgrp_retun_ref230e2,
      codeStates['grp_retun_ref230e2'] = grp_retun_ref230e2Props,
      codeStates['setgrp_retun_ref230e2'] = setgrp_retun_ref230e2Props,
      codeStates['tbl_vw_all_empr'] = tbl_vw_all_empr8a2a9,
      codeStates['settbl_vw_all_empr'] = settbl_vw_all_empr8a2a9,
      codeStates['tbl_vw_all_empr8a2a9'] = tbl_vw_all_empr8a2a9Props,
      codeStates['settbl_vw_all_empr8a2a9'] = settbl_vw_all_empr8a2a9Props,
      codeStates['col_cor_mol'] = col_cor_mold12cb,
      codeStates['setcol_cor_mol'] = setcol_cor_mold12cb,
      codeStates['col_cor_namw'] = col_cor_namw4bb17,
      codeStates['setcol_cor_namw'] = setcol_cor_namw4bb17,
      codeStates['btn_get_reg_empr'] = btn_get_reg_emprb999a,
      codeStates['setbtn_get_reg_empr'] = setbtn_get_reg_emprb999a,
      codeStates['col_cor_reg_id'] = col_cor_reg_idf2c18,
      codeStates['setcol_cor_reg_id'] = setcol_cor_reg_idf2c18,
      codeStates['col_cor_eid'] = col_cor_eidcba45,
      codeStates['setcol_cor_eid'] = setcol_cor_eidcba45,
      codeStates['col_mh_sts'] = col_mh_sts9087c,
      codeStates['setcol_mh_sts'] = setcol_mh_sts9087c,
      codeStates['btn_empr_rpt'] = btn_empr_rpt13ff7,
      codeStates['setbtn_empr_rpt'] = setbtn_empr_rpt13ff7,
      codeStates['btn_empr_status'] = btn_empr_status5b036,
      codeStates['setbtn_empr_status'] = setbtn_empr_status5b036,
      codeStates['btn_getemployes'] = btn_getemployes2c08a,
      codeStates['setbtn_getemployes'] = setbtn_getemployes2c08a,
      codeStates['tab_headerview_all_tran'] = tab_headerview_all_tranaa773,
      codeStates['settab_headerview_all_tran'] = settab_headerview_all_tranaa773,
      codeStates['tab_headerview_all_tranaa773'] = tab_headerview_all_tranaa773Props,
      codeStates['settab_headerview_all_tranaa773'] = settab_headerview_all_tranaa773Props,
      codeStates['grp_reqforref'] = grp_reqforref4f82e,
      codeStates['setgrp_reqforref'] = setgrp_reqforref4f82e,
      codeStates['grp_reqforref4f82e'] = grp_reqforref4f82eProps,
      codeStates['setgrp_reqforref4f82e'] = setgrp_reqforref4f82eProps,
      codeStates['tbl_view_all_tran'] = tbl_view_all_tran1b49d,
      codeStates['settbl_view_all_tran'] = settbl_view_all_tran1b49d,
      codeStates['tbl_view_all_tran1b49d'] = tbl_view_all_tran1b49dProps,
      codeStates['settbl_view_all_tran1b49d'] = settbl_view_all_tran1b49dProps,
      codeStates['enquiryempsalrpt_v1'] = enquiryempsalrpt_v1Props,
      codeStates['setenquiryempsalrpt_v1'] = setenquiryempsalrpt_v1Props,
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
        "f9ffa799ea4e8d68d735cc6ad0c8a2a9",
        "fc5e1599cfa741109b1dab64e5813ff7"
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
      if (id === "btn_empr_rpt13ff7") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_empr_rpt13ff7?.refresh])


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
    let filterProps2: any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:WPS:AFK:enquiryEmployerSalaryRPT:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "c31ba7e5326d30ceaa76661bbcf6e08b",
        "object": {
          "properties.employer_mol_number": "1e4da0f2d3c275f0c2d02f57f66d12cb"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setenquiryempsalrpt_v1Props([...filterData2 ]);
    if (skipUnlockRef) skipUnlockRef.current = true
    routes.push(getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryEmpSalRPT:AFVK:v1', 'enquiryempsalrpt_v1'));
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

 if (btn_empr_rpt13ff7?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1','enquiry','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_empr_rpt13ff7?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Employer RPT")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_empr_rpt

