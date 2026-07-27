'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import PageLeavemanagedocdeletepage2 from '@/app/leavemanagedocdelete_v1/leavemanagedocdelete_v1page';
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
 

const Buttonbt_delete = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
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
    
 /////////////
   //another screen

  const {doc_attached_groupe2bd6, setdoc_attached_groupe2bd6}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupe2bd6Props, setdoc_attached_groupe2bd6Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5, settable_groupf34e5}= useContext(TotalContext) as TotalContextProps;
  const {table_groupf34e5Props, settable_groupf34e5Props}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189, setrequest_doc_tabled1189}= useContext(TotalContext) as TotalContextProps;
  const {request_doc_tabled1189Props, setrequest_doc_tabled1189Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id4aa49, setattachment_id4aa49}= useContext(TotalContext) as TotalContextProps;
  const {doc_group8a432, setdoc_group8a432}= useContext(TotalContext) as TotalContextProps;
  const {doc_name95718, setdoc_name95718}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date19c75, settrs_created_date19c75}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_byeb1ff, settrs_created_byeb1ff}= useContext(TotalContext) as TotalContextProps;
  const {bt_deletebfa7e, setbt_deletebfa7e}= useContext(TotalContext) as TotalContextProps;
  const {leavemanagedocdelete_v1Props, setleavemanagedocdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete617ef, setgroup_delete617ef}= useContext(TotalContext) as TotalContextProps;
  const {group_delete617efProps, setgroup_delete617efProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['doc_attached_group'] = doc_attached_groupe2bd6,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupe2bd6,
      codeStates['doc_attached_groupe2bd6'] = doc_attached_groupe2bd6Props,
      codeStates['setdoc_attached_groupe2bd6'] = setdoc_attached_groupe2bd6Props,
      codeStates['table_group'] = table_groupf34e5,
      codeStates['settable_group'] = settable_groupf34e5,
      codeStates['table_groupf34e5'] = table_groupf34e5Props,
      codeStates['settable_groupf34e5'] = settable_groupf34e5Props,
      codeStates['request_doc_table'] = request_doc_tabled1189,
      codeStates['setrequest_doc_table'] = setrequest_doc_tabled1189,
      codeStates['request_doc_tabled1189'] = request_doc_tabled1189Props,
      codeStates['setrequest_doc_tabled1189'] = setrequest_doc_tabled1189Props,
      codeStates['attachment_id'] = attachment_id4aa49,
      codeStates['setattachment_id'] = setattachment_id4aa49,
      codeStates['doc_group'] = doc_group8a432,
      codeStates['setdoc_group'] = setdoc_group8a432,
      codeStates['doc_name'] = doc_name95718,
      codeStates['setdoc_name'] = setdoc_name95718,
      codeStates['trs_created_date'] = trs_created_date19c75,
      codeStates['settrs_created_date'] = settrs_created_date19c75,
      codeStates['trs_created_by'] = trs_created_byeb1ff,
      codeStates['settrs_created_by'] = settrs_created_byeb1ff,
      codeStates['bt_delete'] = bt_deletebfa7e,
      codeStates['setbt_delete'] = setbt_deletebfa7e,
      codeStates['leavemanagedocdelete_v1'] = leavemanagedocdelete_v1Props,
      codeStates['setleavemanagedocdelete_v1'] = setleavemanagedocdelete_v1Props,
      codeStates['group_delete'] = group_delete617ef,
      codeStates['setgroup_delete'] = setgroup_delete617ef,
      codeStates['group_delete617ef'] = group_delete617efProps,
      codeStates['setgroup_delete617ef'] = setgroup_delete617efProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "537d96f852345700a710b349837d1189",
        "c1e983ac306eb5d1f25b9f86d4cbfa7e"
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
      if (id === "bt_deletebfa7e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_deletebfa7e?.refresh])


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
      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leaveManageDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "d374c56e50cccd04389e9f3f640996f2",
        "object": {
          "properties.attachment_id": "e69ec06f58c51cb3f38b983e9c74aa49"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setleavemanagedocdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_delete617efProps?.controls);
    setgroup_delete617ef(bindData4||{})
    setgroup_delete617efProps({...group_delete617efProps,presetValues:mainData||{}})  
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

 if (bt_deletebfa7e?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveManagementDocument:AFVK:v1','leavemanagementdocument','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Delete Leave Document"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "leavemanagedocdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageLeavemanagedocdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-2xl"
          onClick={handleClick}
          view='flat-contrast'
          disabled= {bt_deletebfa7e?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdDeleteForever"
          iconDisplay='Icon only'
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_delete

