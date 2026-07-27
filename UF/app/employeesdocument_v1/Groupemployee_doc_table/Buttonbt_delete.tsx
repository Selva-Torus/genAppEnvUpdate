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
import PageEmployeedocdeletepage2 from '@/app/employeedocdelete_v1/employeedocdelete_v1page';
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

  const {doc_attached_groupac2a0, setdoc_attached_groupac2a0}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupac2a0Props, setdoc_attached_groupac2a0Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1, settable_group034b1}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1Props, settable_group034b1Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3, setemployee_doc_tableb42f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3Props, setemployee_doc_tableb42f3Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id5eb1e, setattachment_id5eb1e}= useContext(TotalContext) as TotalContextProps;
  const {doc_group83956, setdoc_group83956}= useContext(TotalContext) as TotalContextProps;
  const {doc_name5febb, setdoc_name5febb}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date09f2c, settrs_created_date09f2c}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_by3e3a0, settrs_created_by3e3a0}= useContext(TotalContext) as TotalContextProps;
  const {bt_deletea60c4, setbt_deletea60c4}= useContext(TotalContext) as TotalContextProps;
  const {employeedocdelete_v1Props, setemployeedocdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete6f37f, setgroup_delete6f37f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete6f37fProps, setgroup_delete6f37fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['doc_attached_group'] = doc_attached_groupac2a0,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupac2a0,
      codeStates['doc_attached_groupac2a0'] = doc_attached_groupac2a0Props,
      codeStates['setdoc_attached_groupac2a0'] = setdoc_attached_groupac2a0Props,
      codeStates['table_group'] = table_group034b1,
      codeStates['settable_group'] = settable_group034b1,
      codeStates['table_group034b1'] = table_group034b1Props,
      codeStates['settable_group034b1'] = settable_group034b1Props,
      codeStates['employee_doc_table'] = employee_doc_tableb42f3,
      codeStates['setemployee_doc_table'] = setemployee_doc_tableb42f3,
      codeStates['employee_doc_tableb42f3'] = employee_doc_tableb42f3Props,
      codeStates['setemployee_doc_tableb42f3'] = setemployee_doc_tableb42f3Props,
      codeStates['attachment_id'] = attachment_id5eb1e,
      codeStates['setattachment_id'] = setattachment_id5eb1e,
      codeStates['doc_group'] = doc_group83956,
      codeStates['setdoc_group'] = setdoc_group83956,
      codeStates['doc_name'] = doc_name5febb,
      codeStates['setdoc_name'] = setdoc_name5febb,
      codeStates['trs_created_date'] = trs_created_date09f2c,
      codeStates['settrs_created_date'] = settrs_created_date09f2c,
      codeStates['trs_created_by'] = trs_created_by3e3a0,
      codeStates['settrs_created_by'] = settrs_created_by3e3a0,
      codeStates['bt_delete'] = bt_deletea60c4,
      codeStates['setbt_delete'] = setbt_deletea60c4,
      codeStates['employeedocdelete_v1'] = employeedocdelete_v1Props,
      codeStates['setemployeedocdelete_v1'] = setemployeedocdelete_v1Props,
      codeStates['group_delete'] = group_delete6f37f,
      codeStates['setgroup_delete'] = setgroup_delete6f37f,
      codeStates['group_delete6f37f'] = group_delete6f37fProps,
      codeStates['setgroup_delete6f37f'] = setgroup_delete6f37fProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f56c544fe9d33cadb4368d9ad2bb42f3",
        "02eab4b2684e78630e497414eaea60c4"
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
      if (id === "bt_deletea60c4") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_deletea60c4?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "27c1bbd647684532a08851f39d5b83f0",
        "object": {
          "properties.attachment_id": "064302e165aea74442d8cbc07385eb1e"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setemployeedocdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_delete6f37fProps?.controls);
    setgroup_delete6f37f(bindData4||{})
    setgroup_delete6f37fProps({...group_delete6f37fProps,presetValues:mainData||{}})  
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

 if (bt_deletea60c4?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeesDocument:AFVK:v1','employeesdocument','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Confirm Deletion"
        showOverlay = {true}
        position = {"center"}
        modalName = "employeedocdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageEmployeedocdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-2xl"
          onClick={handleClick}
          view='flat-contrast'
          disabled= {bt_deletea60c4?.isDisabled ? true : false}
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

