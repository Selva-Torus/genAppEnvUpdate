'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
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
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageAddreviewscreenpage4 from '@/app/addreviewscreen_v1/addreviewscreen_v1page';
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
 

const Buttonapprove_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
  const { token } = useGlobal();
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
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
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
  const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_groupd5c13, setoverall_groupd5c13}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupd5c13Props, setoverall_groupd5c13Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group5cbf6, setai_asset_version_table_group5cbf6}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group5cbf6Props, setai_asset_version_table_group5cbf6Props}= useContext(TotalContext) as TotalContextProps;
  const {group32bca, setgroup32bca}= useContext(TotalContext) as TotalContextProps;
  const {group32bcaProps, setgroup32bcaProps}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82, setstages_table01d82}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82Props, setstages_table01d82Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idf4e4a, setcert_stage_idf4e4a}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence77cb4, setstage_sequence77cb4}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_codeaba16, setstage_type_codeaba16}= useContext(TotalContext) as TotalContextProps;
  const {stage_name6f01e, setstage_name6f01e}= useContext(TotalContext) as TotalContextProps;
  const {stage_status_code53e7b, setstage_status_code53e7b}= useContext(TotalContext) as TotalContextProps;
  const {initiated_by_user_id9e7cb, setinitiated_by_user_id9e7cb}= useContext(TotalContext) as TotalContextProps;
  const {initiated_onde819, setinitiated_onde819}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_name96056, setassigned_login_name96056}= useContext(TotalContext) as TotalContextProps;
  const {expiry_datea44d5, setexpiry_datea44d5}= useContext(TotalContext) as TotalContextProps;
  const {approve_btn67764, setapprove_btn67764}= useContext(TotalContext) as TotalContextProps;
  const {condition_btn335e4, setcondition_btn335e4}= useContext(TotalContext) as TotalContextProps;
  const {view_attach_btnd4d21, setview_attach_btnd4d21}= useContext(TotalContext) as TotalContextProps;
  const {view_evidence_btna42e5, setview_evidence_btna42e5}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6, setadd_rule_condition_headerf18e6}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition_headerf18e6Props, setadd_rule_condition_headerf18e6Props}= useContext(TotalContext) as TotalContextProps;
  const {addreviewscreen_v1Props, setaddreviewscreen_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52e, setadd_groupac52e}= useContext(TotalContext) as TotalContextProps;
  const {add_groupac52eProps, setadd_groupac52eProps}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45, setadd_rule_condition96c45}= useContext(TotalContext) as TotalContextProps;
  const {add_rule_condition96c45Props, setadd_rule_condition96c45Props}= useContext(TotalContext) as TotalContextProps;
  const {group73b09, setgroup73b09}= useContext(TotalContext) as TotalContextProps;
  const {group73b09Props, setgroup73b09Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0bee, setschedule_groupc0bee}= useContext(TotalContext) as TotalContextProps;
  const {schedule_groupc0beeProps, setschedule_groupc0beeProps}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9, setstatus_groupc59b9}= useContext(TotalContext) as TotalContextProps;
  const {status_groupc59b9Props, setstatus_groupc59b9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_groupd5c13,
      codeStates['setoverall_group'] = setoverall_groupd5c13,
      codeStates['overall_groupd5c13'] = overall_groupd5c13Props,
      codeStates['setoverall_groupd5c13'] = setoverall_groupd5c13Props,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group5cbf6,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group5cbf6,
      codeStates['ai_asset_version_table_group5cbf6'] = ai_asset_version_table_group5cbf6Props,
      codeStates['setai_asset_version_table_group5cbf6'] = setai_asset_version_table_group5cbf6Props,
      codeStates['group'] = group32bca,
      codeStates['setgroup'] = setgroup32bca,
      codeStates['group32bca'] = group32bcaProps,
      codeStates['setgroup32bca'] = setgroup32bcaProps,
      codeStates['stages_table'] = stages_table01d82,
      codeStates['setstages_table'] = setstages_table01d82,
      codeStates['stages_table01d82'] = stages_table01d82Props,
      codeStates['setstages_table01d82'] = setstages_table01d82Props,
      codeStates['cert_stage_id'] = cert_stage_idf4e4a,
      codeStates['setcert_stage_id'] = setcert_stage_idf4e4a,
      codeStates['stage_sequence'] = stage_sequence77cb4,
      codeStates['setstage_sequence'] = setstage_sequence77cb4,
      codeStates['stage_type_code'] = stage_type_codeaba16,
      codeStates['setstage_type_code'] = setstage_type_codeaba16,
      codeStates['stage_name'] = stage_name6f01e,
      codeStates['setstage_name'] = setstage_name6f01e,
      codeStates['stage_status_code'] = stage_status_code53e7b,
      codeStates['setstage_status_code'] = setstage_status_code53e7b,
      codeStates['initiated_by_user_id'] = initiated_by_user_id9e7cb,
      codeStates['setinitiated_by_user_id'] = setinitiated_by_user_id9e7cb,
      codeStates['initiated_on'] = initiated_onde819,
      codeStates['setinitiated_on'] = setinitiated_onde819,
      codeStates['assigned_login_name'] = assigned_login_name96056,
      codeStates['setassigned_login_name'] = setassigned_login_name96056,
      codeStates['expiry_date'] = expiry_datea44d5,
      codeStates['setexpiry_date'] = setexpiry_datea44d5,
      codeStates['approve_btn'] = approve_btn67764,
      codeStates['setapprove_btn'] = setapprove_btn67764,
      codeStates['condition_btn'] = condition_btn335e4,
      codeStates['setcondition_btn'] = setcondition_btn335e4,
      codeStates['view_attach_btn'] = view_attach_btnd4d21,
      codeStates['setview_attach_btn'] = setview_attach_btnd4d21,
      codeStates['view_evidence_btn'] = view_evidence_btna42e5,
      codeStates['setview_evidence_btn'] = setview_evidence_btna42e5,
      codeStates['add_rule_condition_header'] = add_rule_condition_headerf18e6,
      codeStates['setadd_rule_condition_header'] = setadd_rule_condition_headerf18e6,
      codeStates['add_rule_condition_headerf18e6'] = add_rule_condition_headerf18e6Props,
      codeStates['setadd_rule_condition_headerf18e6'] = setadd_rule_condition_headerf18e6Props,
      codeStates['addreviewscreen_v1'] = addreviewscreen_v1Props,
      codeStates['setaddreviewscreen_v1'] = setaddreviewscreen_v1Props,
      codeStates['add_group'] = add_groupac52e,
      codeStates['setadd_group'] = setadd_groupac52e,
      codeStates['add_groupac52e'] = add_groupac52eProps,
      codeStates['setadd_groupac52e'] = setadd_groupac52eProps,
      codeStates['add_rule_condition'] = add_rule_condition96c45,
      codeStates['setadd_rule_condition'] = setadd_rule_condition96c45,
      codeStates['add_rule_condition96c45'] = add_rule_condition96c45Props,
      codeStates['setadd_rule_condition96c45'] = setadd_rule_condition96c45Props,
      codeStates['group'] = group73b09,
      codeStates['setgroup'] = setgroup73b09,
      codeStates['group73b09'] = group73b09Props,
      codeStates['setgroup73b09'] = setgroup73b09Props,
      codeStates['schedule_group'] = schedule_groupc0bee,
      codeStates['setschedule_group'] = setschedule_groupc0bee,
      codeStates['schedule_groupc0bee'] = schedule_groupc0beeProps,
      codeStates['setschedule_groupc0bee'] = setschedule_groupc0beeProps,
      codeStates['status_group'] = status_groupc59b9,
      codeStates['setstatus_group'] = setstatus_groupc59b9,
      codeStates['status_groupc59b9'] = status_groupc59b9Props,
      codeStates['setstatus_groupc59b9'] = setstatus_groupc59b9Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "a389afe9f961345264193b1318501d82",
        "faf2b31986d6429a9c85413fe8c67764"
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
      if (id === "approve_btn67764") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[approve_btn67764?.refresh])


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
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    //bindTran
    // For group or table
    let bindData2 = filterByKeys(mainData,add_rule_condition_headerf18e6Props?.controls);
    setadd_rule_condition_headerf18e6(bindData2||{})
    setadd_rule_condition_headerf18e6Props({...add_rule_condition_headerf18e6Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setaddreviewscreen_v1Props([...filterData4 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen4(true);
    //bindTran
    // For group or table
    setadd_groupac52e(mainData||{})
    setadd_groupac52eProps({...add_groupac52eProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,add_rule_condition96c45Props?.controls);
    setadd_rule_condition96c45(bindData8||{})
    setadd_rule_condition96c45Props({...add_rule_condition96c45Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,group73b09Props?.controls);
    setgroup73b09(bindData10||{})
    setgroup73b09Props({...group73b09Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,schedule_groupc0beeProps?.controls);
    setschedule_groupc0bee(bindData12||{})
    setschedule_groupc0beeProps({...schedule_groupc0beeProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,status_groupc59b9Props?.controls);
    setstatus_groupc59b9(bindData14||{})
    setstatus_groupc59b9Props({...status_groupc59b9Props,presetValues:{...(mainData||{})}})
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
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

 if (approve_btn67764?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ListStagesByLoginId:AFVK:v1','liststagesbyloginid','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Review Stages"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addreviewscreen"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddreviewscreenpage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {approve_btn67764?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Review")}
        </Button>}
      </div>
    
  )
}

export default Buttonapprove_btn

