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
import PageAssignassetdeletepage2 from '@/app/assignassetdelete_v1/assignassetdelete_v1page';
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

  const {overall_assignments_group04cba, setoverall_assignments_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_assignments_group04cbaProps, setoverall_assignments_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {group9ad63, setgroup9ad63}= useContext(TotalContext) as TotalContextProps;
  const {group9ad63Props, setgroup9ad63Props}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5d, setassignments_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {assignments_table75a5dProps, setassignments_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {assign_idac541, setassign_idac541}= useContext(TotalContext) as TotalContextProps;
  const {asset_namedaa81, setasset_namedaa81}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toba6cd, setassigned_toba6cd}= useContext(TotalContext) as TotalContextProps;
  const {assigned_byba0b9, setassigned_byba0b9}= useContext(TotalContext) as TotalContextProps;
  const {assigned_atc4b88, setassigned_atc4b88}= useContext(TotalContext) as TotalContextProps;
  const {expected_return_date910b8, setexpected_return_date910b8}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_assigne0685, setcondition_at_assigne0685}= useContext(TotalContext) as TotalContextProps;
  const {status7fb4b, setstatus7fb4b}= useContext(TotalContext) as TotalContextProps;
  const {bt_view6b7cc, setbt_view6b7cc}= useContext(TotalContext) as TotalContextProps;
  const {bt_editad624, setbt_editad624}= useContext(TotalContext) as TotalContextProps;
  const {bt_deletefaec8, setbt_deletefaec8}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docf5447, setbt_add_docf5447}= useContext(TotalContext) as TotalContextProps;
  const {assignassetdelete_v1Props, setassignassetdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete0df4b, setgroup_delete0df4b}= useContext(TotalContext) as TotalContextProps;
  const {group_delete0df4bProps, setgroup_delete0df4bProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_assignments_group'] = overall_assignments_group04cba,
      codeStates['setoverall_assignments_group'] = setoverall_assignments_group04cba,
      codeStates['overall_assignments_group04cba'] = overall_assignments_group04cbaProps,
      codeStates['setoverall_assignments_group04cba'] = setoverall_assignments_group04cbaProps,
      codeStates['group'] = group9ad63,
      codeStates['setgroup'] = setgroup9ad63,
      codeStates['group9ad63'] = group9ad63Props,
      codeStates['setgroup9ad63'] = setgroup9ad63Props,
      codeStates['assignments_table'] = assignments_table75a5d,
      codeStates['setassignments_table'] = setassignments_table75a5d,
      codeStates['assignments_table75a5d'] = assignments_table75a5dProps,
      codeStates['setassignments_table75a5d'] = setassignments_table75a5dProps,
      codeStates['assign_id'] = assign_idac541,
      codeStates['setassign_id'] = setassign_idac541,
      codeStates['asset_name'] = asset_namedaa81,
      codeStates['setasset_name'] = setasset_namedaa81,
      codeStates['assigned_to'] = assigned_toba6cd,
      codeStates['setassigned_to'] = setassigned_toba6cd,
      codeStates['assigned_by'] = assigned_byba0b9,
      codeStates['setassigned_by'] = setassigned_byba0b9,
      codeStates['assigned_at'] = assigned_atc4b88,
      codeStates['setassigned_at'] = setassigned_atc4b88,
      codeStates['expected_return_date'] = expected_return_date910b8,
      codeStates['setexpected_return_date'] = setexpected_return_date910b8,
      codeStates['condition_at_assign'] = condition_at_assigne0685,
      codeStates['setcondition_at_assign'] = setcondition_at_assigne0685,
      codeStates['status'] = status7fb4b,
      codeStates['setstatus'] = setstatus7fb4b,
      codeStates['bt_view'] = bt_view6b7cc,
      codeStates['setbt_view'] = setbt_view6b7cc,
      codeStates['bt_edit'] = bt_editad624,
      codeStates['setbt_edit'] = setbt_editad624,
      codeStates['bt_delete'] = bt_deletefaec8,
      codeStates['setbt_delete'] = setbt_deletefaec8,
      codeStates['bt_add_doc'] = bt_add_docf5447,
      codeStates['setbt_add_doc'] = setbt_add_docf5447,
      codeStates['assignassetdelete_v1'] = assignassetdelete_v1Props,
      codeStates['setassignassetdelete_v1'] = setassignassetdelete_v1Props,
      codeStates['group_delete'] = group_delete0df4b,
      codeStates['setgroup_delete'] = setgroup_delete0df4b,
      codeStates['group_delete0df4b'] = group_delete0df4bProps,
      codeStates['setgroup_delete0df4b'] = setgroup_delete0df4bProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "356fd7ddf8ed4df7909d896283975a5d",
        "e78b6ed74e42407b98c15788cb5faec8"
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
      if (id === "bt_deletefaec8") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_deletefaec8?.refresh])

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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b50b5e3a7b314f70bda35687ca3e035e",
        "object": {
          "properties.assign_id": "b1c6ebfb3d644522b867d0cc689ac541"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setassignassetdelete_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,group_delete0df4bProps?.controls);
    setgroup_delete0df4b(bindData4||{})
    setgroup_delete0df4bProps({...group_delete0df4bProps,presetValues:mainData||{}})  
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

 if (bt_deletefaec8?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetAssignments:AFVK:v1','assetassignments','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Confirm Deletion"
        showOverlay = {true}
        position = {"center"}
        modalName = "assignassetdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAssignassetdeletepage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_deletefaec8?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_delete

