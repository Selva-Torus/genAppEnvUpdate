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
import PageReturninitiatereaonpopuppage2 from '@/app/returninitiatereaonpopup_v1/returninitiatereaonpopup_v1page';
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
 

const Buttonbtn_initiate = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {grp_overall_tran_list10bd5, setgrp_overall_tran_list10bd5}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_list10bd5Props, setgrp_overall_tran_list10bd5Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list858ed, settbl_tran_list858ed}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list858edProps, settbl_tran_list858edProps}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_mole4029, setcol_emp_mole4029}= useContext(TotalContext) as TotalContextProps;
  const {col_emp_name32c92, setcol_emp_name32c92}= useContext(TotalContext) as TotalContextProps;
  const {col_cr_acc_no42627, setcol_cr_acc_no42627}= useContext(TotalContext) as TotalContextProps;
  const {col_fixed_amntd6d44, setcol_fixed_amntd6d44}= useContext(TotalContext) as TotalContextProps;
  const {col_var_amnt53ea2, setcol_var_amnt53ea2}= useContext(TotalContext) as TotalContextProps;
  const {col_tot_tran_amnta3392, setcol_tot_tran_amnta3392}= useContext(TotalContext) as TotalContextProps;
  const {col_created_dateea4ac, setcol_created_dateea4ac}= useContext(TotalContext) as TotalContextProps;
  const {col_sf_file_name36fc1, setcol_sf_file_name36fc1}= useContext(TotalContext) as TotalContextProps;
  const {col_rsn_codef367b, setcol_rsn_codef367b}= useContext(TotalContext) as TotalContextProps;
  const {btn_initiate71727, setbtn_initiate71727}= useContext(TotalContext) as TotalContextProps;
  const {col_uuida83f1, setcol_uuida83f1}= useContext(TotalContext) as TotalContextProps;
  const {btn_authorizefce56, setbtn_authorizefce56}= useContext(TotalContext) as TotalContextProps;
  const {btn_back16e28, setbtn_back16e28}= useContext(TotalContext) as TotalContextProps;
  const {returninitiatereaonpopup_v1Props, setreturninitiatereaonpopup_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group2e463, setgroup2e463}= useContext(TotalContext) as TotalContextProps;
  const {group2e463Props, setgroup2e463Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_overall_tran_list'] = grp_overall_tran_list10bd5,
      codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_list10bd5,
      codeStates['grp_overall_tran_list10bd5'] = grp_overall_tran_list10bd5Props,
      codeStates['setgrp_overall_tran_list10bd5'] = setgrp_overall_tran_list10bd5Props,
      codeStates['tbl_tran_list'] = tbl_tran_list858ed,
      codeStates['settbl_tran_list'] = settbl_tran_list858ed,
      codeStates['tbl_tran_list858ed'] = tbl_tran_list858edProps,
      codeStates['settbl_tran_list858ed'] = settbl_tran_list858edProps,
      codeStates['col_emp_mol'] = col_emp_mole4029,
      codeStates['setcol_emp_mol'] = setcol_emp_mole4029,
      codeStates['col_emp_name'] = col_emp_name32c92,
      codeStates['setcol_emp_name'] = setcol_emp_name32c92,
      codeStates['col_cr_acc_no'] = col_cr_acc_no42627,
      codeStates['setcol_cr_acc_no'] = setcol_cr_acc_no42627,
      codeStates['col_fixed_amnt'] = col_fixed_amntd6d44,
      codeStates['setcol_fixed_amnt'] = setcol_fixed_amntd6d44,
      codeStates['col_var_amnt'] = col_var_amnt53ea2,
      codeStates['setcol_var_amnt'] = setcol_var_amnt53ea2,
      codeStates['col_tot_tran_amnt'] = col_tot_tran_amnta3392,
      codeStates['setcol_tot_tran_amnt'] = setcol_tot_tran_amnta3392,
      codeStates['col_created_date'] = col_created_dateea4ac,
      codeStates['setcol_created_date'] = setcol_created_dateea4ac,
      codeStates['col_sf_file_name'] = col_sf_file_name36fc1,
      codeStates['setcol_sf_file_name'] = setcol_sf_file_name36fc1,
      codeStates['col_rsn_code'] = col_rsn_codef367b,
      codeStates['setcol_rsn_code'] = setcol_rsn_codef367b,
      codeStates['btn_initiate'] = btn_initiate71727,
      codeStates['setbtn_initiate'] = setbtn_initiate71727,
      codeStates['col_uuid'] = col_uuida83f1,
      codeStates['setcol_uuid'] = setcol_uuida83f1,
      codeStates['btn_authorize'] = btn_authorizefce56,
      codeStates['setbtn_authorize'] = setbtn_authorizefce56,
      codeStates['btn_back'] = btn_back16e28,
      codeStates['setbtn_back'] = setbtn_back16e28,
      codeStates['returninitiatereaonpopup_v1'] = returninitiatereaonpopup_v1Props,
      codeStates['setreturninitiatereaonpopup_v1'] = setreturninitiatereaonpopup_v1Props,
      codeStates['group'] = group2e463,
      codeStates['setgroup'] = setgroup2e463,
      codeStates['group2e463'] = group2e463Props,
      codeStates['setgroup2e463'] = setgroup2e463Props,
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
        "782254cfca8991b29321cfb1b4e858ed",
        "07423679a00a4867be73bb9933e71727"
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
      if (id === "btn_initiate71727") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[btn_initiate71727?.refresh])


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
    setreturninitiatereaonpopup_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    // copyFormData
    // For group
    setgroup2e463((pre:any)=>({...pre,...mainData}));
    setgroup2e463Props({...group2e463Props,presetValues:mainData,tableName:tableName});
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

 if (btn_initiate71727?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnTransactionList:AFVK:v1','returntransactionlist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Reason Code"
        ready={assetDataReady}
        showOverlay = {false}
        position = {"center"}
        modalName = "returninitiatereaonpopup"
        className='w-[500px] h-[] bg-gray-50 overflow-auto'
      >
        <PageReturninitiatereaonpopuppage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_initiate71727?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Initiate")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_initiate

