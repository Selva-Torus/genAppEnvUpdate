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
import PageNewleavepolicypage2 from '@/app/newleavepolicy_v1/newleavepolicy_v1page';
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
 

const Buttonedit_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const {newleavepolicy_v1Props, setnewleavepolicy_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group86c35, setnew_access_group86c35}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group86c35Props, setnew_access_group86c35Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3, setaccess_req__groupae6e3}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3Props, setaccess_req__groupae6e3Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167c, setapprove_group0167c}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167cProps, setapprove_group0167cProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57c, setvalid_group5c57c}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57cProps, setvalid_group5c57cProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebdProps, setbusiness_just__groupd6ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fca, setprovision_groupc3fca}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fcaProps, setprovision_groupc3fcaProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0Props, setleave_rule_groupf75c0Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['newleavepolicy_v1'] = newleavepolicy_v1Props,
      codeStates['setnewleavepolicy_v1'] = setnewleavepolicy_v1Props,
      codeStates['new_access_group'] = new_access_group86c35,
      codeStates['setnew_access_group'] = setnew_access_group86c35,
      codeStates['new_access_group86c35'] = new_access_group86c35Props,
      codeStates['setnew_access_group86c35'] = setnew_access_group86c35Props,
      codeStates['access_req__group'] = access_req__groupae6e3,
      codeStates['setaccess_req__group'] = setaccess_req__groupae6e3,
      codeStates['access_req__groupae6e3'] = access_req__groupae6e3Props,
      codeStates['setaccess_req__groupae6e3'] = setaccess_req__groupae6e3Props,
      codeStates['app_inf_group'] = app_inf_group60e94,
      codeStates['setapp_inf_group'] = setapp_inf_group60e94,
      codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
      codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
      codeStates['approve_group'] = approve_group0167c,
      codeStates['setapprove_group'] = setapprove_group0167c,
      codeStates['approve_group0167c'] = approve_group0167cProps,
      codeStates['setapprove_group0167c'] = setapprove_group0167cProps,
      codeStates['valid_group'] = valid_group5c57c,
      codeStates['setvalid_group'] = setvalid_group5c57c,
      codeStates['valid_group5c57c'] = valid_group5c57cProps,
      codeStates['setvalid_group5c57c'] = setvalid_group5c57cProps,
      codeStates['business_just__group'] = business_just__groupd6ebd,
      codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd,
      codeStates['business_just__groupd6ebd'] = business_just__groupd6ebdProps,
      codeStates['setbusiness_just__groupd6ebd'] = setbusiness_just__groupd6ebdProps,
      codeStates['provision_group'] = provision_groupc3fca,
      codeStates['setprovision_group'] = setprovision_groupc3fca,
      codeStates['provision_groupc3fca'] = provision_groupc3fcaProps,
      codeStates['setprovision_groupc3fca'] = setprovision_groupc3fcaProps,
      codeStates['leave_rule_group'] = leave_rule_groupf75c0,
      codeStates['setleave_rule_group'] = setleave_rule_groupf75c0,
      codeStates['leave_rule_groupf75c0'] = leave_rule_groupf75c0Props,
      codeStates['setleave_rule_groupf75c0'] = setleave_rule_groupf75c0Props,
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
        "288dd8ca4a7a8b454242d0b552c5600b"
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
      if (id === "edit_btn5600b") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_btn5600b?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "4e279f3010e947cda8cc341d6c0ac371",
        "object": {
          "properties.policy_id": "5ff551bfedc8faa9fe93e52efa959787"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setnewleavepolicy_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,new_access_group86c35Props?.controls);
    setnew_access_group86c35(bindData4||{})
    setnew_access_group86c35Props({...new_access_group86c35Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,access_req__groupae6e3Props?.controls);
    setaccess_req__groupae6e3(bindData6||{})
    setaccess_req__groupae6e3Props({...access_req__groupae6e3Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,app_inf_group60e94Props?.controls);
    setapp_inf_group60e94(bindData8||{})
    setapp_inf_group60e94Props({...app_inf_group60e94Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,approve_group0167cProps?.controls);
    setapprove_group0167c(bindData10||{})
    setapprove_group0167cProps({...approve_group0167cProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,valid_group5c57cProps?.controls);
    setvalid_group5c57c(bindData12||{})
    setvalid_group5c57cProps({...valid_group5c57cProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,business_just__groupd6ebdProps?.controls);
    setbusiness_just__groupd6ebd(bindData14||{})
    setbusiness_just__groupd6ebdProps({...business_just__groupd6ebdProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,provision_groupc3fcaProps?.controls);
    setprovision_groupc3fca(bindData16||{})
    setprovision_groupc3fcaProps({...provision_groupc3fcaProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,leave_rule_groupf75c0Props?.controls);
    setleave_rule_groupf75c0(bindData18||{})
    setleave_rule_groupf75c0Props({...leave_rule_groupf75c0Props,presetValues:mainData||{}})  
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

 if (edit_btn5600b?.isHidden) {
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
        title="Edit Leave Policy"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "newleavepolicy"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageNewleavepolicypage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn5600b?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdModeEdit"
          iconDisplay='Start with Icon'
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

