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
import PageEmployeesdocumentpage8 from '@/app/employeesdocument_v1/employeesdocument_v1page';
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
  const [showProfileAsModalOpen8, setShowProfileAsModalOpen8] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {total_employees_group75b01, settotal_employees_group75b01}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group75b01Props, settotal_employees_group75b01Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13c, setemp_groupdf13c}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13cProps, setemp_groupdf13cProps}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694e, settotal_employees_tablee694e}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694eProps, settotal_employees_tablee694eProps}= useContext(TotalContext) as TotalContextProps;
  const {employee_id4e73e, setemployee_id4e73e}= useContext(TotalContext) as TotalContextProps;
  const {employee_code47d84, setemployee_code47d84}= useContext(TotalContext) as TotalContextProps;
  const {full_nameff05a, setfull_nameff05a}= useContext(TotalContext) as TotalContextProps;
  const {employee_numberddb89, setemployee_numberddb89}= useContext(TotalContext) as TotalContextProps;
  const {work_email2a2a1, setwork_email2a2a1}= useContext(TotalContext) as TotalContextProps;
  const {gender25d32, setgender25d32}= useContext(TotalContext) as TotalContextProps;
  const {employment_typeb853c, setemployment_typeb853c}= useContext(TotalContext) as TotalContextProps;
  const {hire_date8a106, sethire_date8a106}= useContext(TotalContext) as TotalContextProps;
  const {workmode568a3, setworkmode568a3}= useContext(TotalContext) as TotalContextProps;
  const {employee_status62c4f, setemployee_status62c4f}= useContext(TotalContext) as TotalContextProps;
  const {view_btnc2391, setview_btnc2391}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnb7ae1, setedit_btnb7ae1}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn20022, setdelete_btn20022}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doce1237, setbt_add_doce1237}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1, settable_group034b1}= useContext(TotalContext) as TotalContextProps;
  const {table_group034b1Props, settable_group034b1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupac2a0, setdoc_attached_groupac2a0}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupac2a0Props, setdoc_attached_groupac2a0Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3, setemployee_doc_tableb42f3}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_tableb42f3Props, setemployee_doc_tableb42f3Props}= useContext(TotalContext) as TotalContextProps;
  const {employeesdocument_v1Props, setemployeesdocument_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_group75b01,
      codeStates['settotal_employees_group'] = settotal_employees_group75b01,
      codeStates['total_employees_group75b01'] = total_employees_group75b01Props,
      codeStates['settotal_employees_group75b01'] = settotal_employees_group75b01Props,
      codeStates['emp_group'] = emp_groupdf13c,
      codeStates['setemp_group'] = setemp_groupdf13c,
      codeStates['emp_groupdf13c'] = emp_groupdf13cProps,
      codeStates['setemp_groupdf13c'] = setemp_groupdf13cProps,
      codeStates['total_employees_table'] = total_employees_tablee694e,
      codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
      codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
      codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,
      codeStates['employee_id'] = employee_id4e73e,
      codeStates['setemployee_id'] = setemployee_id4e73e,
      codeStates['employee_code'] = employee_code47d84,
      codeStates['setemployee_code'] = setemployee_code47d84,
      codeStates['full_name'] = full_nameff05a,
      codeStates['setfull_name'] = setfull_nameff05a,
      codeStates['employee_number'] = employee_numberddb89,
      codeStates['setemployee_number'] = setemployee_numberddb89,
      codeStates['work_email'] = work_email2a2a1,
      codeStates['setwork_email'] = setwork_email2a2a1,
      codeStates['gender'] = gender25d32,
      codeStates['setgender'] = setgender25d32,
      codeStates['employment_type'] = employment_typeb853c,
      codeStates['setemployment_type'] = setemployment_typeb853c,
      codeStates['hire_date'] = hire_date8a106,
      codeStates['sethire_date'] = sethire_date8a106,
      codeStates['workmode'] = workmode568a3,
      codeStates['setworkmode'] = setworkmode568a3,
      codeStates['employee_status'] = employee_status62c4f,
      codeStates['setemployee_status'] = setemployee_status62c4f,
      codeStates['view_btn'] = view_btnc2391,
      codeStates['setview_btn'] = setview_btnc2391,
      codeStates['edit_btn'] = edit_btnb7ae1,
      codeStates['setedit_btn'] = setedit_btnb7ae1,
      codeStates['delete_btn'] = delete_btn20022,
      codeStates['setdelete_btn'] = setdelete_btn20022,
      codeStates['bt_add_doc'] = bt_add_doce1237,
      codeStates['setbt_add_doc'] = setbt_add_doce1237,
      codeStates['table_group'] = table_group034b1,
      codeStates['settable_group'] = settable_group034b1,
      codeStates['table_group034b1'] = table_group034b1Props,
      codeStates['settable_group034b1'] = settable_group034b1Props,
      codeStates['doc_attached_group'] = doc_attached_groupac2a0,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupac2a0,
      codeStates['doc_attached_groupac2a0'] = doc_attached_groupac2a0Props,
      codeStates['setdoc_attached_groupac2a0'] = setdoc_attached_groupac2a0Props,
      codeStates['employee_doc_table'] = employee_doc_tableb42f3,
      codeStates['setemployee_doc_table'] = setemployee_doc_tableb42f3,
      codeStates['employee_doc_tableb42f3'] = employee_doc_tableb42f3Props,
      codeStates['setemployee_doc_tableb42f3'] = setemployee_doc_tableb42f3Props,
      codeStates['employeesdocument_v1'] = employeesdocument_v1Props,
      codeStates['setemployeesdocument_v1'] = setemployeesdocument_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "267e1421a9f4452a8ebcf3c4183e694e",
        "8685997ae69349d9905c77290ede1237"
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
      if (id === "bt_add_doce1237") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen8(false)
  },[bt_add_doce1237?.refresh])


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

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,table_group034b1Props?.controls);
    settable_group034b1(bindData2||{})
    settable_group034b1Props({...table_group034b1Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,doc_attached_groupac2a0Props?.controls);
    setdoc_attached_groupac2a0(bindData4||{})
    setdoc_attached_groupac2a0Props({...doc_attached_groupac2a0Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,employee_doc_tableb42f3Props?.controls);
    setemployee_doc_tableb42f3(bindData6||{})
    setemployee_doc_tableb42f3Props({...employee_doc_tableb42f3Props,presetValues:mainData||{}})  
    // showArtifactAsModal
    let filterProps8:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "27c1bbd647684532a08851f39d5b83f0",
        "object": {
          "properties.employee_id": "c6d6ca42abea4d968ceee4a4e9e4e73e"
        }
      }
    ]
  }
];
    let filterData8 = await getFilterProps(filterProps8,mainData);
    setemployeesdocument_v1Props([...filterData8 ]);
    setShowProfileAsModalOpen8(true);
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

 if (bt_add_doce1237?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1','employees','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen8} 
        onClose={() => setShowProfileAsModalOpen8(false)}
        title="Attachments"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "employeesdocument"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageEmployeesdocumentpage8/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_add_doce1237?.isDisabled ? true : false}
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

