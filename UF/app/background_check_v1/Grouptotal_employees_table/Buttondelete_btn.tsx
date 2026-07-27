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
import PageBackgroundcheckdocumentpage2 from '@/app/backgroundcheckdocument_v1/backgroundcheckdocument_v1page';
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
 

const Buttondelete_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {total_employees_group455f5, settotal_employees_group455f5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group455f5Props, settotal_employees_group455f5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7, setemp_groupe44b7}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7Props, setemp_groupe44b7Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379da, settotal_employees_table379da}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379daProps, settotal_employees_table379daProps}= useContext(TotalContext) as TotalContextProps;
  const {check_idc0499, setcheck_idc0499}= useContext(TotalContext) as TotalContextProps;
  const {full_name8459f, setfull_name8459f}= useContext(TotalContext) as TotalContextProps;
  const {check_type67f55, setcheck_type67f55}= useContext(TotalContext) as TotalContextProps;
  const {initiated_dated326f, setinitiated_dated326f}= useContext(TotalContext) as TotalContextProps;
  const {completed_dateb46ea, setcompleted_dateb46ea}= useContext(TotalContext) as TotalContextProps;
  const {result428b3, setresult428b3}= useContext(TotalContext) as TotalContextProps;
  const {verification_status34423, setverification_status34423}= useContext(TotalContext) as TotalContextProps;
  const {view_btn75e2e, setview_btn75e2e}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd5238, setedit_btnd5238}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnd268c, setdelete_btnd268c}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doc1691b, setbt_add_doc1691b}= useContext(TotalContext) as TotalContextProps;
  const {backgroundcheckdocument_v1Props, setbackgroundcheckdocument_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb4f40, setdoc_attached_groupb4f40}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb4f40Props, setdoc_attached_groupb4f40Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9, settable_groupb0ef9}= useContext(TotalContext) as TotalContextProps;
  const {table_groupb0ef9Props, settable_groupb0ef9Props}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2f, setemployee_doc_table78f2f}= useContext(TotalContext) as TotalContextProps;
  const {employee_doc_table78f2fProps, setemployee_doc_table78f2fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_group455f5,
      codeStates['settotal_employees_group'] = settotal_employees_group455f5,
      codeStates['total_employees_group455f5'] = total_employees_group455f5Props,
      codeStates['settotal_employees_group455f5'] = settotal_employees_group455f5Props,
      codeStates['emp_group'] = emp_groupe44b7,
      codeStates['setemp_group'] = setemp_groupe44b7,
      codeStates['emp_groupe44b7'] = emp_groupe44b7Props,
      codeStates['setemp_groupe44b7'] = setemp_groupe44b7Props,
      codeStates['total_employees_table'] = total_employees_table379da,
      codeStates['settotal_employees_table'] = settotal_employees_table379da,
      codeStates['total_employees_table379da'] = total_employees_table379daProps,
      codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,
      codeStates['check_id'] = check_idc0499,
      codeStates['setcheck_id'] = setcheck_idc0499,
      codeStates['full_name'] = full_name8459f,
      codeStates['setfull_name'] = setfull_name8459f,
      codeStates['check_type'] = check_type67f55,
      codeStates['setcheck_type'] = setcheck_type67f55,
      codeStates['initiated_date'] = initiated_dated326f,
      codeStates['setinitiated_date'] = setinitiated_dated326f,
      codeStates['completed_date'] = completed_dateb46ea,
      codeStates['setcompleted_date'] = setcompleted_dateb46ea,
      codeStates['result'] = result428b3,
      codeStates['setresult'] = setresult428b3,
      codeStates['verification_status'] = verification_status34423,
      codeStates['setverification_status'] = setverification_status34423,
      codeStates['view_btn'] = view_btn75e2e,
      codeStates['setview_btn'] = setview_btn75e2e,
      codeStates['edit_btn'] = edit_btnd5238,
      codeStates['setedit_btn'] = setedit_btnd5238,
      codeStates['delete_btn'] = delete_btnd268c,
      codeStates['setdelete_btn'] = setdelete_btnd268c,
      codeStates['bt_add_doc'] = bt_add_doc1691b,
      codeStates['setbt_add_doc'] = setbt_add_doc1691b,
      codeStates['backgroundcheckdocument_v1'] = backgroundcheckdocument_v1Props,
      codeStates['setbackgroundcheckdocument_v1'] = setbackgroundcheckdocument_v1Props,
      codeStates['doc_attached_group'] = doc_attached_groupb4f40,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupb4f40,
      codeStates['doc_attached_groupb4f40'] = doc_attached_groupb4f40Props,
      codeStates['setdoc_attached_groupb4f40'] = setdoc_attached_groupb4f40Props,
      codeStates['table_group'] = table_groupb0ef9,
      codeStates['settable_group'] = settable_groupb0ef9,
      codeStates['table_groupb0ef9'] = table_groupb0ef9Props,
      codeStates['settable_groupb0ef9'] = settable_groupb0ef9Props,
      codeStates['employee_doc_table'] = employee_doc_table78f2f,
      codeStates['setemployee_doc_table'] = setemployee_doc_table78f2f,
      codeStates['employee_doc_table78f2f'] = employee_doc_table78f2fProps,
      codeStates['setemployee_doc_table78f2f'] = setemployee_doc_table78f2fProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "33564afe78fbb2cdfc338e23720379da",
        "de8051952b33ac408123eaa46c8d268c"
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
      if (id === "delete_btnd268c") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[delete_btnd268c?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:backgroundCheckDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4173981b5ab3fa9e4dc1d2ac4c1d5977",
        "object": {
          "properties.check_id": "460b0720818bd3d4011aab9e130c0499"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setbackgroundcheckdocument_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,doc_attached_groupb4f40Props?.controls);
    setdoc_attached_groupb4f40(bindData4||{})
    setdoc_attached_groupb4f40Props({...doc_attached_groupb4f40Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,table_groupb0ef9Props?.controls);
    settable_groupb0ef9(bindData6||{})
    settable_groupb0ef9Props({...table_groupb0ef9Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,employee_doc_table78f2fProps?.controls);
    setemployee_doc_table78f2f(bindData8||{})
    setemployee_doc_table78f2fProps({...employee_doc_table78f2fProps,presetValues:mainData||{}})  
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

 if (delete_btnd268c?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1','backgroundcheck','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Delete Background Check"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "backgroundcheckdocument"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageBackgroundcheckdocumentpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {delete_btnd268c?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdDeleteOutline"
          iconDisplay='Start with Icon'
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

