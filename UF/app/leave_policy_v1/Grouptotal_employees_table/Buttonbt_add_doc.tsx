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
import PageLeavepolicydocumentpage2 from '@/app/leavepolicydocument_v1/leavepolicydocument_v1page';
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
 

const Buttonbt_add_doc = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {total_employees_group93757, settotal_employees_group93757}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group93757Props, settotal_employees_group93757Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_group3312a, setemp_group3312a}= useContext(TotalContext) as TotalContextProps;
  const {emp_group3312aProps, setemp_group3312aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table02f51, settotal_employees_table02f51}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table02f51Props, settotal_employees_table02f51Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_id59787, setpolicy_id59787}= useContext(TotalContext) as TotalContextProps;
  const {policy_code26cc7, setpolicy_code26cc7}= useContext(TotalContext) as TotalContextProps;
  const {policy_name2dc31, setpolicy_name2dc31}= useContext(TotalContext) as TotalContextProps;
  const {leave_type6ad16, setleave_type6ad16}= useContext(TotalContext) as TotalContextProps;
  const {days_per_yearcee52, setdays_per_yearcee52}= useContext(TotalContext) as TotalContextProps;
  const {applicable_tod9dcb, setapplicable_tod9dcb}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_status42183, settrs_event_process_status42183}= useContext(TotalContext) as TotalContextProps;
  const {view_btn766f2, setview_btn766f2}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn5600b, setedit_btn5600b}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn8376d, setdelete_btn8376d}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docc7a1b, setbt_add_docc7a1b}= useContext(TotalContext) as TotalContextProps;
  const {leavepolicydocument_v1Props, setleavepolicydocument_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group1c693, setdoc_attached_group1c693}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_group1c693Props, setdoc_attached_group1c693Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0, settable_group973f0}= useContext(TotalContext) as TotalContextProps;
  const {table_group973f0Props, settable_group973f0Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23, setpolicy_doc_table06d23}= useContext(TotalContext) as TotalContextProps;
  const {policy_doc_table06d23Props, setpolicy_doc_table06d23Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_group93757,
      codeStates['settotal_employees_group'] = settotal_employees_group93757,
      codeStates['total_employees_group93757'] = total_employees_group93757Props,
      codeStates['settotal_employees_group93757'] = settotal_employees_group93757Props,
      codeStates['emp_group'] = emp_group3312a,
      codeStates['setemp_group'] = setemp_group3312a,
      codeStates['emp_group3312a'] = emp_group3312aProps,
      codeStates['setemp_group3312a'] = setemp_group3312aProps,
      codeStates['total_employees_table'] = total_employees_table02f51,
      codeStates['settotal_employees_table'] = settotal_employees_table02f51,
      codeStates['total_employees_table02f51'] = total_employees_table02f51Props,
      codeStates['settotal_employees_table02f51'] = settotal_employees_table02f51Props,
      codeStates['policy_id'] = policy_id59787,
      codeStates['setpolicy_id'] = setpolicy_id59787,
      codeStates['policy_code'] = policy_code26cc7,
      codeStates['setpolicy_code'] = setpolicy_code26cc7,
      codeStates['policy_name'] = policy_name2dc31,
      codeStates['setpolicy_name'] = setpolicy_name2dc31,
      codeStates['leave_type'] = leave_type6ad16,
      codeStates['setleave_type'] = setleave_type6ad16,
      codeStates['days_per_year'] = days_per_yearcee52,
      codeStates['setdays_per_year'] = setdays_per_yearcee52,
      codeStates['applicable_to'] = applicable_tod9dcb,
      codeStates['setapplicable_to'] = setapplicable_tod9dcb,
      codeStates['trs_event_process_status'] = trs_event_process_status42183,
      codeStates['settrs_event_process_status'] = settrs_event_process_status42183,
      codeStates['view_btn'] = view_btn766f2,
      codeStates['setview_btn'] = setview_btn766f2,
      codeStates['edit_btn'] = edit_btn5600b,
      codeStates['setedit_btn'] = setedit_btn5600b,
      codeStates['delete_btn'] = delete_btn8376d,
      codeStates['setdelete_btn'] = setdelete_btn8376d,
      codeStates['bt_add_doc'] = bt_add_docc7a1b,
      codeStates['setbt_add_doc'] = setbt_add_docc7a1b,
      codeStates['leavepolicydocument_v1'] = leavepolicydocument_v1Props,
      codeStates['setleavepolicydocument_v1'] = setleavepolicydocument_v1Props,
      codeStates['doc_attached_group'] = doc_attached_group1c693,
      codeStates['setdoc_attached_group'] = setdoc_attached_group1c693,
      codeStates['doc_attached_group1c693'] = doc_attached_group1c693Props,
      codeStates['setdoc_attached_group1c693'] = setdoc_attached_group1c693Props,
      codeStates['table_group'] = table_group973f0,
      codeStates['settable_group'] = settable_group973f0,
      codeStates['table_group973f0'] = table_group973f0Props,
      codeStates['settable_group973f0'] = settable_group973f0Props,
      codeStates['policy_doc_table'] = policy_doc_table06d23,
      codeStates['setpolicy_doc_table'] = setpolicy_doc_table06d23,
      codeStates['policy_doc_table06d23'] = policy_doc_table06d23Props,
      codeStates['setpolicy_doc_table06d23'] = setpolicy_doc_table06d23Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "9fa367ce3d1da5763dd7401922002f51",
        "c9726f7c8a1a8378eba6b750973c7a1b"
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
      if (id === "bt_add_docc7a1b") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_add_docc7a1b?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:leavePolicyDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "7053930842d1d614bed7f081e22c407d",
        "object": {
          "properties.policy_id": "5ff551bfedc8faa9fe93e52efa959787"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setleavepolicydocument_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,doc_attached_group1c693Props?.controls);
    setdoc_attached_group1c693(bindData4||{})
    setdoc_attached_group1c693Props({...doc_attached_group1c693Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,table_group973f0Props?.controls);
    settable_group973f0(bindData6||{})
    settable_group973f0Props({...table_group973f0Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,policy_doc_table06d23Props?.controls);
    setpolicy_doc_table06d23(bindData8||{})
    setpolicy_doc_table06d23Props({...policy_doc_table06d23Props,presetValues:mainData||{}})  
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

 if (bt_add_docc7a1b?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicy:AFVK:v1','leavepolicy','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Attachments"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "leavepolicydocument"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageLeavepolicydocumentpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_add_docc7a1b?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Attachments")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_add_doc

