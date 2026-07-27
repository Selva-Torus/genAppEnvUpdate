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
import PageViewleaveapplypage2 from '@/app/viewleaveapply_v1/viewleaveapply_v1page';
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
 

const Buttonview_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {hrm_dashboard_groupc9b72, sethrm_dashboard_groupc9b72}= useContext(TotalContext) as TotalContextProps;
  const {hrm_dashboard_groupc9b72Props, sethrm_dashboard_groupc9b72Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415, settotal_employees_group69415}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group69415Props, settotal_employees_group69415Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aaf, setleave_requests_groupb9aaf}= useContext(TotalContext) as TotalContextProps;
  const {leave_requests_groupb9aafProps, setleave_requests_groupb9aafProps}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1e, setonboarding_group4ab1e}= useContext(TotalContext) as TotalContextProps;
  const {onboarding_group4ab1eProps, setonboarding_group4ab1eProps}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ff, setchart_groupdd9ff}= useContext(TotalContext) as TotalContextProps;
  const {chart_groupdd9ffProps, setchart_groupdd9ffProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83d, setleave_group1d83d}= useContext(TotalContext) as TotalContextProps;
  const {leave_group1d83dProps, setleave_group1d83dProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0, setleave_req_table1dfa0}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_table1dfa0Props, setleave_req_table1dfa0Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_id6149c, setleave_req_id6149c}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number962d5, setleave_request_number962d5}= useContext(TotalContext) as TotalContextProps;
  const {leave_type274e3, setleave_type274e3}= useContext(TotalContext) as TotalContextProps;
  const {start_date502ce, setstart_date502ce}= useContext(TotalContext) as TotalContextProps;
  const {end_date285f8, setend_date285f8}= useContext(TotalContext) as TotalContextProps;
  const {days_requesteda438c, setdays_requesteda438c}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_statusdd679, settrs_event_process_statusdd679}= useContext(TotalContext) as TotalContextProps;
  const {view_btb1a53, setview_btb1a53}= useContext(TotalContext) as TotalContextProps;
  const {attach_btcee90, setattach_btcee90}= useContext(TotalContext) as TotalContextProps;
  const {viewleaveapply_v1Props, setviewleaveapply_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441, setnew_access_group8a441}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group8a441Props, setnew_access_group8a441Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5, setaccess_req__group578e5}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group578e5Props, setaccess_req__group578e5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48f, setemp_avail_groupeb48f}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_groupeb48fProps, setemp_avail_groupeb48fProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0, setleave_balance_group98af0}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98af0Props, setleave_balance_group98af0Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97e, setapp_det_group5b97e}= useContext(TotalContext) as TotalContextProps;
  const {app_det_group5b97eProps, setapp_det_group5b97eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845, setapprove_group4d845}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4d845Props, setapprove_group4d845Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ff, setaudit_group2b7ff}= useContext(TotalContext) as TotalContextProps;
  const {audit_group2b7ffProps, setaudit_group2b7ffProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['hrm_dashboard_group'] = hrm_dashboard_groupc9b72,
      codeStates['sethrm_dashboard_group'] = sethrm_dashboard_groupc9b72,
      codeStates['hrm_dashboard_groupc9b72'] = hrm_dashboard_groupc9b72Props,
      codeStates['sethrm_dashboard_groupc9b72'] = sethrm_dashboard_groupc9b72Props,
      codeStates['total_employees_group'] = total_employees_group69415,
      codeStates['settotal_employees_group'] = settotal_employees_group69415,
      codeStates['total_employees_group69415'] = total_employees_group69415Props,
      codeStates['settotal_employees_group69415'] = settotal_employees_group69415Props,
      codeStates['leave_requests_group'] = leave_requests_groupb9aaf,
      codeStates['setleave_requests_group'] = setleave_requests_groupb9aaf,
      codeStates['leave_requests_groupb9aaf'] = leave_requests_groupb9aafProps,
      codeStates['setleave_requests_groupb9aaf'] = setleave_requests_groupb9aafProps,
      codeStates['onboarding_group'] = onboarding_group4ab1e,
      codeStates['setonboarding_group'] = setonboarding_group4ab1e,
      codeStates['onboarding_group4ab1e'] = onboarding_group4ab1eProps,
      codeStates['setonboarding_group4ab1e'] = setonboarding_group4ab1eProps,
      codeStates['chart_group'] = chart_groupdd9ff,
      codeStates['setchart_group'] = setchart_groupdd9ff,
      codeStates['chart_groupdd9ff'] = chart_groupdd9ffProps,
      codeStates['setchart_groupdd9ff'] = setchart_groupdd9ffProps,
      codeStates['leave_group'] = leave_group1d83d,
      codeStates['setleave_group'] = setleave_group1d83d,
      codeStates['leave_group1d83d'] = leave_group1d83dProps,
      codeStates['setleave_group1d83d'] = setleave_group1d83dProps,
      codeStates['leave_req_table'] = leave_req_table1dfa0,
      codeStates['setleave_req_table'] = setleave_req_table1dfa0,
      codeStates['leave_req_table1dfa0'] = leave_req_table1dfa0Props,
      codeStates['setleave_req_table1dfa0'] = setleave_req_table1dfa0Props,
      codeStates['leave_req_id'] = leave_req_id6149c,
      codeStates['setleave_req_id'] = setleave_req_id6149c,
      codeStates['leave_request_number'] = leave_request_number962d5,
      codeStates['setleave_request_number'] = setleave_request_number962d5,
      codeStates['leave_type'] = leave_type274e3,
      codeStates['setleave_type'] = setleave_type274e3,
      codeStates['start_date'] = start_date502ce,
      codeStates['setstart_date'] = setstart_date502ce,
      codeStates['end_date'] = end_date285f8,
      codeStates['setend_date'] = setend_date285f8,
      codeStates['days_requested'] = days_requesteda438c,
      codeStates['setdays_requested'] = setdays_requesteda438c,
      codeStates['trs_event_process_status'] = trs_event_process_statusdd679,
      codeStates['settrs_event_process_status'] = settrs_event_process_statusdd679,
      codeStates['view_bt'] = view_btb1a53,
      codeStates['setview_bt'] = setview_btb1a53,
      codeStates['attach_bt'] = attach_btcee90,
      codeStates['setattach_bt'] = setattach_btcee90,
      codeStates['viewleaveapply_v1'] = viewleaveapply_v1Props,
      codeStates['setviewleaveapply_v1'] = setviewleaveapply_v1Props,
      codeStates['new_access_group'] = new_access_group8a441,
      codeStates['setnew_access_group'] = setnew_access_group8a441,
      codeStates['new_access_group8a441'] = new_access_group8a441Props,
      codeStates['setnew_access_group8a441'] = setnew_access_group8a441Props,
      codeStates['access_req__group'] = access_req__group578e5,
      codeStates['setaccess_req__group'] = setaccess_req__group578e5,
      codeStates['access_req__group578e5'] = access_req__group578e5Props,
      codeStates['setaccess_req__group578e5'] = setaccess_req__group578e5Props,
      codeStates['emp_avail_group'] = emp_avail_groupeb48f,
      codeStates['setemp_avail_group'] = setemp_avail_groupeb48f,
      codeStates['emp_avail_groupeb48f'] = emp_avail_groupeb48fProps,
      codeStates['setemp_avail_groupeb48f'] = setemp_avail_groupeb48fProps,
      codeStates['leave_balance_group'] = leave_balance_group98af0,
      codeStates['setleave_balance_group'] = setleave_balance_group98af0,
      codeStates['leave_balance_group98af0'] = leave_balance_group98af0Props,
      codeStates['setleave_balance_group98af0'] = setleave_balance_group98af0Props,
      codeStates['app_det_group'] = app_det_group5b97e,
      codeStates['setapp_det_group'] = setapp_det_group5b97e,
      codeStates['app_det_group5b97e'] = app_det_group5b97eProps,
      codeStates['setapp_det_group5b97e'] = setapp_det_group5b97eProps,
      codeStates['approve_group'] = approve_group4d845,
      codeStates['setapprove_group'] = setapprove_group4d845,
      codeStates['approve_group4d845'] = approve_group4d845Props,
      codeStates['setapprove_group4d845'] = setapprove_group4d845Props,
      codeStates['audit_group'] = audit_group2b7ff,
      codeStates['setaudit_group'] = setaudit_group2b7ff,
      codeStates['audit_group2b7ff'] = audit_group2b7ffProps,
      codeStates['setaudit_group2b7ff'] = setaudit_group2b7ffProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6ae8b086b23d14630c1c13c329c1dfa0",
        "7c041cdec36747df9d115dfdb4ab1a53"
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
      if (id === "view_btb1a53") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_btb1a53?.refresh])


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
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setviewleaveapply_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,new_access_group8a441Props?.controls);
    setnew_access_group8a441(bindData4||{})
    setnew_access_group8a441Props({...new_access_group8a441Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,access_req__group578e5Props?.controls);
    setaccess_req__group578e5(bindData6||{})
    setaccess_req__group578e5Props({...access_req__group578e5Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,emp_avail_groupeb48fProps?.controls);
    setemp_avail_groupeb48f(bindData8||{})
    setemp_avail_groupeb48fProps({...emp_avail_groupeb48fProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,leave_balance_group98af0Props?.controls);
    setleave_balance_group98af0(bindData10||{})
    setleave_balance_group98af0Props({...leave_balance_group98af0Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,app_det_group5b97eProps?.controls);
    setapp_det_group5b97e(bindData12||{})
    setapp_det_group5b97eProps({...app_det_group5b97eProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,approve_group4d845Props?.controls);
    setapprove_group4d845(bindData14||{})
    setapprove_group4d845Props({...approve_group4d845Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,audit_group2b7ffProps?.controls);
    setaudit_group2b7ff(bindData16||{})
    setaudit_group2b7ffProps({...audit_group2b7ffProps,presetValues:mainData||{}})  
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

 if (view_btb1a53?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:IndividualLeaveManagement:AFVK:v1','individualleavemanagement','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="View Leave Application"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "viewleaveapply"
        className='w-[70%] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewleaveapplypage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view_btb1a53?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Start with Icon'
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_bt

