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
import PageDeleteaiagentactionpage4 from '@/app/deleteaiagentaction_v1/deleteaiagentaction_v1page';
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
 

const Buttondelete_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_groupe3f32, setoverall_groupe3f32}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupe3f32Props, setoverall_groupe3f32Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_groupfa736, setagent_action_groupfa736}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_groupfa736Props, setagent_action_groupfa736Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_table39b50, setagent_action_table39b50}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_table39b50Props, setagent_action_table39b50Props}= useContext(TotalContext) as TotalContextProps;
  const {agent_action_id2fa37, setagent_action_id2fa37}= useContext(TotalContext) as TotalContextProps;
  const {action_name3c469, setaction_name3c469}= useContext(TotalContext) as TotalContextProps;
  const {target_systemdb907, settarget_systemdb907}= useContext(TotalContext) as TotalContextProps;
  const {tool_or_api349b3, settool_or_api349b3}= useContext(TotalContext) as TotalContextProps;
  const {is_permitted23d6f, setis_permitted23d6f}= useContext(TotalContext) as TotalContextProps;
  const {is_high_risk9c751, setis_high_risk9c751}= useContext(TotalContext) as TotalContextProps;
  const {approval_required9ccc6, setapproval_required9ccc6}= useContext(TotalContext) as TotalContextProps;
  const {is_actived82af, setis_actived82af}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn45f95, setedit_btn45f95}= useContext(TotalContext) as TotalContextProps;
  const {delete_btna1555, setdelete_btna1555}= useContext(TotalContext) as TotalContextProps;
  const {del_group87d56, setdel_group87d56}= useContext(TotalContext) as TotalContextProps;
  const {del_group87d56Props, setdel_group87d56Props}= useContext(TotalContext) as TotalContextProps;
  const {deleteaiagentaction_v1Props, setdeleteaiagentaction_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_groupe3f32,
      codeStates['setoverall_group'] = setoverall_groupe3f32,
      codeStates['overall_groupe3f32'] = overall_groupe3f32Props,
      codeStates['setoverall_groupe3f32'] = setoverall_groupe3f32Props,
      codeStates['agent_action_group'] = agent_action_groupfa736,
      codeStates['setagent_action_group'] = setagent_action_groupfa736,
      codeStates['agent_action_groupfa736'] = agent_action_groupfa736Props,
      codeStates['setagent_action_groupfa736'] = setagent_action_groupfa736Props,
      codeStates['agent_action_table'] = agent_action_table39b50,
      codeStates['setagent_action_table'] = setagent_action_table39b50,
      codeStates['agent_action_table39b50'] = agent_action_table39b50Props,
      codeStates['setagent_action_table39b50'] = setagent_action_table39b50Props,
      codeStates['agent_action_id'] = agent_action_id2fa37,
      codeStates['setagent_action_id'] = setagent_action_id2fa37,
      codeStates['action_name'] = action_name3c469,
      codeStates['setaction_name'] = setaction_name3c469,
      codeStates['target_system'] = target_systemdb907,
      codeStates['settarget_system'] = settarget_systemdb907,
      codeStates['tool_or_api'] = tool_or_api349b3,
      codeStates['settool_or_api'] = settool_or_api349b3,
      codeStates['is_permitted'] = is_permitted23d6f,
      codeStates['setis_permitted'] = setis_permitted23d6f,
      codeStates['is_high_risk'] = is_high_risk9c751,
      codeStates['setis_high_risk'] = setis_high_risk9c751,
      codeStates['approval_required'] = approval_required9ccc6,
      codeStates['setapproval_required'] = setapproval_required9ccc6,
      codeStates['is_active'] = is_actived82af,
      codeStates['setis_active'] = setis_actived82af,
      codeStates['edit_btn'] = edit_btn45f95,
      codeStates['setedit_btn'] = setedit_btn45f95,
      codeStates['delete_btn'] = delete_btna1555,
      codeStates['setdelete_btn'] = setdelete_btna1555,
      codeStates['del_group'] = del_group87d56,
      codeStates['setdel_group'] = setdel_group87d56,
      codeStates['del_group87d56'] = del_group87d56Props,
      codeStates['setdel_group87d56'] = setdel_group87d56Props,
      codeStates['deleteaiagentaction_v1'] = deleteaiagentaction_v1Props,
      codeStates['setdeleteaiagentaction_v1'] = setdeleteaiagentaction_v1Props,
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
        "7528885c1dc33cbc4802210eda139b50",
        "ae72619064de5840c847b63097aa1555"
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
      if (id === "delete_btna1555") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[delete_btna1555?.refresh])


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
    let bindData2 = filterByKeys(mainData,del_group87d56Props?.controls);
    setdel_group87d56(bindData2||{})
    setdel_group87d56Props({...del_group87d56Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setdeleteaiagentaction_v1Props([...filterData4 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen4(true);
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

 if (delete_btna1555?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentAction:AFVK:v1','aiagentaction','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Delete AI Agent Action"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "deleteaiagentaction"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageDeleteaiagentactionpage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {delete_btna1555?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

