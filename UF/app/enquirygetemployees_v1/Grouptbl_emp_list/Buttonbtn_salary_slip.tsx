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
 

const Buttonbtn_salary_slip = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {grp_overall_employee_list1c655, setgrp_overall_employee_list1c655}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_employee_list1c655Props, setgrp_overall_employee_list1c655Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_list2fa62, settbl_emp_list2fa62}= useContext(TotalContext) as TotalContextProps;
  const {tbl_emp_list2fa62Props, settbl_emp_list2fa62Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_emp_rptf4b9a, setbtn_emp_rptf4b9a}= useContext(TotalContext) as TotalContextProps;
  const {btn_get_empdd09a, setbtn_get_empdd09a}= useContext(TotalContext) as TotalContextProps;
  const {col_card_numberbec8c, setcol_card_numberbec8c}= useContext(TotalContext) as TotalContextProps;
  const {col_uni_numd76ee, setcol_uni_numd76ee}= useContext(TotalContext) as TotalContextProps;
  const {col_emr_idd3a1f, setcol_emr_idd3a1f}= useContext(TotalContext) as TotalContextProps;
  const {col_sts_dated58fa4, setcol_sts_dated58fa4}= useContext(TotalContext) as TotalContextProps;
  const {col_is_actived0527, setcol_is_actived0527}= useContext(TotalContext) as TotalContextProps;
  const {col_pass_nume4031, setcol_pass_nume4031}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_sale3e91, setcol_tot_sale3e91}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_namefa4c3, setcol_emp_namefa4c3}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name_ar02a3b, setcol_emp_name_ar02a3b}= useContext(TotalContext) as TotalContextProps;
  const {col_prsn_code83655, setcol_prsn_code83655}= useContext(TotalContext) as TotalContextProps;
  const {btn_salary_slipb31d5, setbtn_salary_slipb31d5}= useContext(TotalContext) as TotalContextProps;
  const {col_empr_num3d80d, setcol_empr_num3d80d}= useContext(TotalContext) as TotalContextProps;
  const {enquiryempsalrpt_v1Props, setenquiryempsalrpt_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_overall_employee_list'] = grp_overall_employee_list1c655,
      codeStates['setgrp_overall_employee_list'] = setgrp_overall_employee_list1c655,
      codeStates['grp_overall_employee_list1c655'] = grp_overall_employee_list1c655Props,
      codeStates['setgrp_overall_employee_list1c655'] = setgrp_overall_employee_list1c655Props,
      codeStates['tbl_emp_list'] = tbl_emp_list2fa62,
      codeStates['settbl_emp_list'] = settbl_emp_list2fa62,
      codeStates['tbl_emp_list2fa62'] = tbl_emp_list2fa62Props,
      codeStates['settbl_emp_list2fa62'] = settbl_emp_list2fa62Props,
      codeStates['btn_emp_rpt'] = btn_emp_rptf4b9a,
      codeStates['setbtn_emp_rpt'] = setbtn_emp_rptf4b9a,
      codeStates['btn_get_emp'] = btn_get_empdd09a,
      codeStates['setbtn_get_emp'] = setbtn_get_empdd09a,
      codeStates['col_card_number'] = col_card_numberbec8c,
      codeStates['setcol_card_number'] = setcol_card_numberbec8c,
      codeStates['col_uni_num'] = col_uni_numd76ee,
      codeStates['setcol_uni_num'] = setcol_uni_numd76ee,
      codeStates['col_emr_id'] = col_emr_idd3a1f,
      codeStates['setcol_emr_id'] = setcol_emr_idd3a1f,
      codeStates['col_sts_dated'] = col_sts_dated58fa4,
      codeStates['setcol_sts_dated'] = setcol_sts_dated58fa4,
      codeStates['col_is_active'] = col_is_actived0527,
      codeStates['setcol_is_active'] = setcol_is_actived0527,
      codeStates['col_pass_num'] = col_pass_nume4031,
      codeStates['setcol_pass_num'] = setcol_pass_nume4031,
      codeStates['col_tot_sal'] = col_tot_sale3e91,
      codeStates['setcol_tot_sal'] = setcol_tot_sale3e91,
      codeStates['col_emp_name'] = col_emp_namefa4c3,
      codeStates['setcol_emp_name'] = setcol_emp_namefa4c3,
      codeStates['col_emp_name_ar'] = col_emp_name_ar02a3b,
      codeStates['setcol_emp_name_ar'] = setcol_emp_name_ar02a3b,
      codeStates['col_prsn_code'] = col_prsn_code83655,
      codeStates['setcol_prsn_code'] = setcol_prsn_code83655,
      codeStates['btn_salary_slip'] = btn_salary_slipb31d5,
      codeStates['setbtn_salary_slip'] = setbtn_salary_slipb31d5,
      codeStates['col_empr_num'] = col_empr_num3d80d,
      codeStates['setcol_empr_num'] = setcol_empr_num3d80d,
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
        "02fe082d28295c1ce4be4dc38962fa62",
        "1c902f29aa1943c6b575d4783d1b31d5"
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
      if (id === "btn_salary_slipb31d5") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[btn_salary_slipb31d5?.refresh])


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
          "properties.employer_mol_number": "7fbd625888d7413aafcd84841ab3d80d"
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

 if (btn_salary_slipb31d5?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiryGetEmployees:AFVK:v1','enquirygetemployees','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_salary_slipb31d5?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Salary Slip")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_salary_slip

