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
import PageAssigndocdeletepage2 from '@/app/assigndocdelete_v1/assigndocdelete_v1page';
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
  const savedData=useRef<Record<string, any>>({})
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

  const {doc_attached_groupbc2cf, setdoc_attached_groupbc2cf}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupbc2cfProps, setdoc_attached_groupbc2cfProps}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5e, settable_group75a5e}= useContext(TotalContext) as TotalContextProps;
  const {table_group75a5eProps, settable_group75a5eProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0, setdoc_table392d0}= useContext(TotalContext) as TotalContextProps;
  const {doc_table392d0Props, setdoc_table392d0Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id0c7b6, setattachment_id0c7b6}= useContext(TotalContext) as TotalContextProps;
  const {doc_group8e81a, setdoc_group8e81a}= useContext(TotalContext) as TotalContextProps;
  const {doc_nameb994a, setdoc_nameb994a}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date26a21, settrs_created_date26a21}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by95da2, settrs_created_by95da2}= useContext(TotalContext) as TotalContextProps;
  const {bt_deletea6263, setbt_deletea6263}= useContext(TotalContext) as TotalContextProps;
  const {assigndocdelete_v1Props, setassigndocdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8ee3b, setgroup_delete8ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete8ee3bProps, setgroup_delete8ee3bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['doc_attached_group'] = doc_attached_groupbc2cf,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupbc2cf,
      codeStates['doc_attached_groupbc2cf'] = doc_attached_groupbc2cfProps,
      codeStates['setdoc_attached_groupbc2cf'] = setdoc_attached_groupbc2cfProps,
      codeStates['table_group'] = table_group75a5e,
      codeStates['settable_group'] = settable_group75a5e,
      codeStates['table_group75a5e'] = table_group75a5eProps,
      codeStates['settable_group75a5e'] = settable_group75a5eProps,
      codeStates['doc_table'] = doc_table392d0,
      codeStates['setdoc_table'] = setdoc_table392d0,
      codeStates['doc_table392d0'] = doc_table392d0Props,
      codeStates['setdoc_table392d0'] = setdoc_table392d0Props,
      codeStates['attachment_id'] = attachment_id0c7b6,
      codeStates['setattachment_id'] = setattachment_id0c7b6,
      codeStates['doc_group'] = doc_group8e81a,
      codeStates['setdoc_group'] = setdoc_group8e81a,
      codeStates['doc_name'] = doc_nameb994a,
      codeStates['setdoc_name'] = setdoc_nameb994a,
      codeStates['trs_created_date'] = trs_created_date26a21,
      codeStates['settrs_created_date'] = settrs_created_date26a21,
      codeStates['trs_created_by'] = trs_created_by95da2,
      codeStates['settrs_created_by'] = settrs_created_by95da2,
      codeStates['bt_delete'] = bt_deletea6263,
      codeStates['setbt_delete'] = setbt_deletea6263,
      codeStates['assigndocdelete_v1'] = assigndocdelete_v1Props,
      codeStates['setassigndocdelete_v1'] = setassigndocdelete_v1Props,
      codeStates['group_delete'] = group_delete8ee3b,
      codeStates['setgroup_delete'] = setgroup_delete8ee3b,
      codeStates['group_delete8ee3b'] = group_delete8ee3bProps,
      codeStates['setgroup_delete8ee3b'] = setgroup_delete8ee3bProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1cff839b6eae7947a9fa183da14392d0",
        "0d2e3feb936ee2a00efdfdd39f2a6263"
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
      if (id === "bt_deletea6263") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_deletea6263?.refresh])

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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assignDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "02ab6e31192949cd8f95401bcce4e927",
        "object": {
          "properties.attachment_id": "0b1917325de8dd06a5cbdf40a120c7b6"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setassigndocdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_delete8ee3bProps?.controls);
    setgroup_delete8ee3b(bindData4||{})
    setgroup_delete8ee3bProps({...group_delete8ee3bProps,presetValues:mainData||{}})  
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

 if (bt_deletea6263?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:addAssignmentDocument:AFVK:v1','addassignmentdocument','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Confirm Deletion"
        showOverlay = {true}
        position = {"center"}
        modalName = "assigndocdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAssigndocdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-2xl"
          onClick={handleClick}
          view='flat-contrast'
          disabled= {bt_deletea6263?.isDisabled ? true : false}
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

