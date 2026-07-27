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
import PageEmployeejobgradedeletepage2 from '@/app/employeejobgradedelete_v1/employeejobgradedelete_v1page';
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

  const {total_employees_groupf0de6, settotal_employees_groupf0de6}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_groupf0de6Props, settotal_employees_groupf0de6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094, settotal_employees_table9c094}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094Props, settotal_employees_table9c094Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_id09291, setgrade_id09291}= useContext(TotalContext) as TotalContextProps;
  const {grade_code1f507, setgrade_code1f507}= useContext(TotalContext) as TotalContextProps;
  const {grade_named440c, setgrade_named440c}= useContext(TotalContext) as TotalContextProps;
  const {grade_leveld01e1, setgrade_leveld01e1}= useContext(TotalContext) as TotalContextProps;
  const {salary_range7d11a, setsalary_range7d11a}= useContext(TotalContext) as TotalContextProps;
  const {promotion_eligiblec98f8, setpromotion_eligiblec98f8}= useContext(TotalContext) as TotalContextProps;
  const {overtime_eligibleff5a4, setovertime_eligibleff5a4}= useContext(TotalContext) as TotalContextProps;
  const {view_btn40a48, setview_btn40a48}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn1d2da, setedit_btn1d2da}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn88b28, setdelete_btn88b28}= useContext(TotalContext) as TotalContextProps;
  const {ad_doc396b4, setad_doc396b4}= useContext(TotalContext) as TotalContextProps;
  const {employeejobgradedelete_v1Props, setemployeejobgradedelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_deletea1de0, setgroup_deletea1de0}= useContext(TotalContext) as TotalContextProps;
  const {group_deletea1de0Props, setgroup_deletea1de0Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_groupf0de6,
      codeStates['settotal_employees_group'] = settotal_employees_groupf0de6,
      codeStates['total_employees_groupf0de6'] = total_employees_groupf0de6Props,
      codeStates['settotal_employees_groupf0de6'] = settotal_employees_groupf0de6Props,
      codeStates['total_employees_table'] = total_employees_table9c094,
      codeStates['settotal_employees_table'] = settotal_employees_table9c094,
      codeStates['total_employees_table9c094'] = total_employees_table9c094Props,
      codeStates['settotal_employees_table9c094'] = settotal_employees_table9c094Props,
      codeStates['grade_id'] = grade_id09291,
      codeStates['setgrade_id'] = setgrade_id09291,
      codeStates['grade_code'] = grade_code1f507,
      codeStates['setgrade_code'] = setgrade_code1f507,
      codeStates['grade_name'] = grade_named440c,
      codeStates['setgrade_name'] = setgrade_named440c,
      codeStates['grade_level'] = grade_leveld01e1,
      codeStates['setgrade_level'] = setgrade_leveld01e1,
      codeStates['salary_range'] = salary_range7d11a,
      codeStates['setsalary_range'] = setsalary_range7d11a,
      codeStates['promotion_eligible'] = promotion_eligiblec98f8,
      codeStates['setpromotion_eligible'] = setpromotion_eligiblec98f8,
      codeStates['overtime_eligible'] = overtime_eligibleff5a4,
      codeStates['setovertime_eligible'] = setovertime_eligibleff5a4,
      codeStates['view_btn'] = view_btn40a48,
      codeStates['setview_btn'] = setview_btn40a48,
      codeStates['edit_btn'] = edit_btn1d2da,
      codeStates['setedit_btn'] = setedit_btn1d2da,
      codeStates['delete_btn'] = delete_btn88b28,
      codeStates['setdelete_btn'] = setdelete_btn88b28,
      codeStates['ad_doc'] = ad_doc396b4,
      codeStates['setad_doc'] = setad_doc396b4,
      codeStates['employeejobgradedelete_v1'] = employeejobgradedelete_v1Props,
      codeStates['setemployeejobgradedelete_v1'] = setemployeejobgradedelete_v1Props,
      codeStates['group_delete'] = group_deletea1de0,
      codeStates['setgroup_delete'] = setgroup_deletea1de0,
      codeStates['group_deletea1de0'] = group_deletea1de0Props,
      codeStates['setgroup_deletea1de0'] = setgroup_deletea1de0Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ff40997343dd428ae50a99eca449c094",
        "f893fbe2407b458fdd8cc67742788b28"
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
      if (id === "delete_btn88b28") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[delete_btn88b28?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobGrade:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "c496957cdcf54d02b06872f0f45f2a70",
        "object": {
          "properties.grade_id": "c5cb2e14ecc8c205ac3f0ec0e5f09291"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setemployeejobgradedelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    setgroup_deletea1de0(mainData||{})
    setgroup_deletea1de0Props({...group_deletea1de0Props,presetValues:mainData||{}})  
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

 if (delete_btn88b28?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1','employeejobgrades','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Confirm Deletion"
        showOverlay = {true}
        position = {"center"}
        modalName = "employeejobgradedelete"
        className='w-[50%] h-[] bg-gray-50 overflow-auto'
      >
        <PageEmployeejobgradedeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='outlined'
          disabled= {delete_btn88b28?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

