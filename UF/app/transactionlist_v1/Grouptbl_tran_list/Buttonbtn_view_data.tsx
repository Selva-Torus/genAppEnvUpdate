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
import PageViewmessagedatapage2 from '@/app/viewmessagedata_v1/viewmessagedata_v1page';
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {grp_overall_tran_list52636, setgrp_overall_tran_list52636}= useContext(TotalContext) as TotalContextProps;
  const {grp_overall_tran_list52636Props, setgrp_overall_tran_list52636Props}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list8df93, settbl_tran_list8df93}= useContext(TotalContext) as TotalContextProps;
  const {tbl_tran_list8df93Props, settbl_tran_list8df93Props}= useContext(TotalContext) as TotalContextProps;
  const {col_file_name06356, setcol_file_name06356}= useContext(TotalContext) as TotalContextProps;
  const {col_tran_iddff78, setcol_tran_iddff78}= useContext(TotalContext) as TotalContextProps;
  const {col_sal_file_namee8195, setcol_sal_file_namee8195}= useContext(TotalContext) as TotalContextProps;
  const {col_file_type43a43, setcol_file_type43a43}= useContext(TotalContext) as TotalContextProps;
  const {col_created_date8dd2c, setcol_created_date8dd2c}= useContext(TotalContext) as TotalContextProps;
  const {btn_view_data6dcf1, setbtn_view_data6dcf1}= useContext(TotalContext) as TotalContextProps;
  const {col_vgphe_id3cf81, setcol_vgphe_id3cf81}= useContext(TotalContext) as TotalContextProps;
  const {btn_back80553, setbtn_back80553}= useContext(TotalContext) as TotalContextProps;
  const {viewmessagedata_v1Props, setviewmessagedata_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details0b014, setgrp_emp_details0b014}= useContext(TotalContext) as TotalContextProps;
  const {grp_emp_details0b014Props, setgrp_emp_details0b014Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['grp_overall_tran_list'] = grp_overall_tran_list52636,
      codeStates['setgrp_overall_tran_list'] = setgrp_overall_tran_list52636,
      codeStates['grp_overall_tran_list52636'] = grp_overall_tran_list52636Props,
      codeStates['setgrp_overall_tran_list52636'] = setgrp_overall_tran_list52636Props,
      codeStates['tbl_tran_list'] = tbl_tran_list8df93,
      codeStates['settbl_tran_list'] = settbl_tran_list8df93,
      codeStates['tbl_tran_list8df93'] = tbl_tran_list8df93Props,
      codeStates['settbl_tran_list8df93'] = settbl_tran_list8df93Props,
      codeStates['col_file_name'] = col_file_name06356,
      codeStates['setcol_file_name'] = setcol_file_name06356,
      codeStates['col_tran_id'] = col_tran_iddff78,
      codeStates['setcol_tran_id'] = setcol_tran_iddff78,
      codeStates['col_sal_file_name'] = col_sal_file_namee8195,
      codeStates['setcol_sal_file_name'] = setcol_sal_file_namee8195,
      codeStates['col_file_type'] = col_file_type43a43,
      codeStates['setcol_file_type'] = setcol_file_type43a43,
      codeStates['col_created_date'] = col_created_date8dd2c,
      codeStates['setcol_created_date'] = setcol_created_date8dd2c,
      codeStates['btn_view_data'] = btn_view_data6dcf1,
      codeStates['setbtn_view_data'] = setbtn_view_data6dcf1,
      codeStates['col_vgphe_id'] = col_vgphe_id3cf81,
      codeStates['setcol_vgphe_id'] = setcol_vgphe_id3cf81,
      codeStates['btn_back'] = btn_back80553,
      codeStates['setbtn_back'] = setbtn_back80553,
      codeStates['viewmessagedata_v1'] = viewmessagedata_v1Props,
      codeStates['setviewmessagedata_v1'] = setviewmessagedata_v1Props,
      codeStates['grp_emp_details'] = grp_emp_details0b014,
      codeStates['setgrp_emp_details'] = setgrp_emp_details0b014,
      codeStates['grp_emp_details0b014'] = grp_emp_details0b014Props,
      codeStates['setgrp_emp_details0b014'] = setgrp_emp_details0b014Props,
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
        "c4fa0588b9682751974b6db6f098df93",
        "bcd7d3780e9991d483dbb5223ec6dcf1"
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
      if (id === "btn_view_data6dcf1") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[btn_view_data6dcf1?.refresh])


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
    setviewmessagedata_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,grp_emp_details0b014Props?.controls);
    setgrp_emp_details0b014(bindData4||{})
    setgrp_emp_details0b014Props({...grp_emp_details0b014Props,presetValues:{...(mainData||{})},tableName:tableName})
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

 if (btn_view_data6dcf1?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionList:AFVK:v1','transactionlist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
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
        showOverlay = {false}
        position = {"center"}
        modalName = "viewmessagedata"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewmessagedatapage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {btn_view_data6dcf1?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View Data")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_view_data

