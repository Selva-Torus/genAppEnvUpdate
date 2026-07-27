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
import PagePerformancereviewdeletepage2 from '@/app/performancereviewdelete_v1/performancereviewdelete_v1page';
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

  const {total_employees_group5fd1a, settotal_employees_group5fd1a}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group5fd1aProps, settotal_employees_group5fd1aProps}= useContext(TotalContext) as TotalContextProps;
  const {emp_group2ed27, setemp_group2ed27}= useContext(TotalContext) as TotalContextProps;
  const {emp_group2ed27Props, setemp_group2ed27Props}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table1d11f, setperf_cycle_table1d11f}= useContext(TotalContext) as TotalContextProps;
  const {perf_cycle_table1d11fProps, setperf_cycle_table1d11fProps}= useContext(TotalContext) as TotalContextProps;
  const {review_id14901, setreview_id14901}= useContext(TotalContext) as TotalContextProps;
  const {review_numbere1dc8, setreview_numbere1dc8}= useContext(TotalContext) as TotalContextProps;
  const {full_namebe804, setfull_namebe804}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name718ff, setcycle_name718ff}= useContext(TotalContext) as TotalContextProps;
  const {review_type1bdf9, setreview_type1bdf9}= useContext(TotalContext) as TotalContextProps;
  const {review_status2b312, setreview_status2b312}= useContext(TotalContext) as TotalContextProps;
  const {view_btna5669, setview_btna5669}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn37795, setedit_btn37795}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn0952e, setdelete_btn0952e}= useContext(TotalContext) as TotalContextProps;
  const {final_rating81ca1, setfinal_rating81ca1}= useContext(TotalContext) as TotalContextProps;
  const {attachmentsd466c, setattachmentsd466c}= useContext(TotalContext) as TotalContextProps;
  const {performancereviewdelete_v1Props, setperformancereviewdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3ee3b, setgroup_delete3ee3b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3ee3bProps, setgroup_delete3ee3bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_group5fd1a,
      codeStates['settotal_employees_group'] = settotal_employees_group5fd1a,
      codeStates['total_employees_group5fd1a'] = total_employees_group5fd1aProps,
      codeStates['settotal_employees_group5fd1a'] = settotal_employees_group5fd1aProps,
      codeStates['emp_group'] = emp_group2ed27,
      codeStates['setemp_group'] = setemp_group2ed27,
      codeStates['emp_group2ed27'] = emp_group2ed27Props,
      codeStates['setemp_group2ed27'] = setemp_group2ed27Props,
      codeStates['perf_cycle_table'] = perf_cycle_table1d11f,
      codeStates['setperf_cycle_table'] = setperf_cycle_table1d11f,
      codeStates['perf_cycle_table1d11f'] = perf_cycle_table1d11fProps,
      codeStates['setperf_cycle_table1d11f'] = setperf_cycle_table1d11fProps,
      codeStates['review_id'] = review_id14901,
      codeStates['setreview_id'] = setreview_id14901,
      codeStates['review_number'] = review_numbere1dc8,
      codeStates['setreview_number'] = setreview_numbere1dc8,
      codeStates['full_name'] = full_namebe804,
      codeStates['setfull_name'] = setfull_namebe804,
      codeStates['cycle_name'] = cycle_name718ff,
      codeStates['setcycle_name'] = setcycle_name718ff,
      codeStates['review_type'] = review_type1bdf9,
      codeStates['setreview_type'] = setreview_type1bdf9,
      codeStates['review_status'] = review_status2b312,
      codeStates['setreview_status'] = setreview_status2b312,
      codeStates['view_btn'] = view_btna5669,
      codeStates['setview_btn'] = setview_btna5669,
      codeStates['edit_btn'] = edit_btn37795,
      codeStates['setedit_btn'] = setedit_btn37795,
      codeStates['delete_btn'] = delete_btn0952e,
      codeStates['setdelete_btn'] = setdelete_btn0952e,
      codeStates['final_rating'] = final_rating81ca1,
      codeStates['setfinal_rating'] = setfinal_rating81ca1,
      codeStates['attachments'] = attachmentsd466c,
      codeStates['setattachments'] = setattachmentsd466c,
      codeStates['performancereviewdelete_v1'] = performancereviewdelete_v1Props,
      codeStates['setperformancereviewdelete_v1'] = setperformancereviewdelete_v1Props,
      codeStates['group_delete'] = group_delete3ee3b,
      codeStates['setgroup_delete'] = setgroup_delete3ee3b,
      codeStates['group_delete3ee3b'] = group_delete3ee3bProps,
      codeStates['setgroup_delete3ee3b'] = setgroup_delete3ee3bProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "7ad86c050521a42a5cd27edbda51d11f",
        "b929568be445931d655ed5109050952e"
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
      if (id === "delete_btn0952e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[delete_btn0952e?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceReviewModify:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b03841acebc5e140e2200403d00450fe",
        "object": {
          "properties.review_id": "c08c835f85cb53ba755cf71914214901"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setperformancereviewdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_delete3ee3bProps?.controls);
    setgroup_delete3ee3b(bindData4||{})
    setgroup_delete3ee3bProps({...group_delete3ee3bProps,presetValues:mainData||{}})  
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

 if (delete_btn0952e?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReview:AFVK:v1','performancereview','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Delete Review"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "performancereviewdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PagePerformancereviewdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {delete_btn0952e?.isDisabled ? true : false}
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

