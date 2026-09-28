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
import PageAgentdeletepage4 from '@/app/agentdelete_v1/agentdelete_v1page';
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
 

const Buttondelete_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_ai_data_class672d4, setoverall_ai_data_class672d4}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class672d4Props, setoverall_ai_data_class672d4Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_group538c9, setai_control_group538c9}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_group538c9Props, setai_control_group538c9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8cbab, setai_registry_text_group8cbab}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group8cbabProps, setai_registry_text_group8cbabProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_table8126f, setai_control_table8126f}= useContext(TotalContext) as TotalContextProps;
  const {ai_control_table8126fProps, setai_control_table8126fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idb7f77, setai_asset_idb7f77}= useContext(TotalContext) as TotalContextProps;
  const {asset_name06439, setasset_name06439}= useContext(TotalContext) as TotalContextProps;
  const {agent_control_id0dd2d, setagent_control_id0dd2d}= useContext(TotalContext) as TotalContextProps;
  const {agent_identity_refc4c89, setagent_identity_refc4c89}= useContext(TotalContext) as TotalContextProps;
  const {identity_provider4076a, setidentity_provider4076a}= useContext(TotalContext) as TotalContextProps;
  const {authority_level_codea4eeb, setauthority_level_codea4eeb}= useContext(TotalContext) as TotalContextProps;
  const {kill_switch_state_code78d44, setkill_switch_state_code78d44}= useContext(TotalContext) as TotalContextProps;
  const {edit_btab9fa, setedit_btab9fa}= useContext(TotalContext) as TotalContextProps;
  const {delete_bteda7a, setdelete_bteda7a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9b94a, setdel_group9b94a}= useContext(TotalContext) as TotalContextProps;
  const {del_group9b94aProps, setdel_group9b94aProps}= useContext(TotalContext) as TotalContextProps;
  const {agentdelete_v1Props, setagentdelete_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_data_class'] = overall_ai_data_class672d4,
      codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class672d4,
      codeStates['overall_ai_data_class672d4'] = overall_ai_data_class672d4Props,
      codeStates['setoverall_ai_data_class672d4'] = setoverall_ai_data_class672d4Props,
      codeStates['ai_control_group'] = ai_control_group538c9,
      codeStates['setai_control_group'] = setai_control_group538c9,
      codeStates['ai_control_group538c9'] = ai_control_group538c9Props,
      codeStates['setai_control_group538c9'] = setai_control_group538c9Props,
      codeStates['ai_registry_text_group'] = ai_registry_text_group8cbab,
      codeStates['setai_registry_text_group'] = setai_registry_text_group8cbab,
      codeStates['ai_registry_text_group8cbab'] = ai_registry_text_group8cbabProps,
      codeStates['setai_registry_text_group8cbab'] = setai_registry_text_group8cbabProps,
      codeStates['ai_control_table'] = ai_control_table8126f,
      codeStates['setai_control_table'] = setai_control_table8126f,
      codeStates['ai_control_table8126f'] = ai_control_table8126fProps,
      codeStates['setai_control_table8126f'] = setai_control_table8126fProps,
      codeStates['ai_asset_id'] = ai_asset_idb7f77,
      codeStates['setai_asset_id'] = setai_asset_idb7f77,
      codeStates['asset_name'] = asset_name06439,
      codeStates['setasset_name'] = setasset_name06439,
      codeStates['agent_control_id'] = agent_control_id0dd2d,
      codeStates['setagent_control_id'] = setagent_control_id0dd2d,
      codeStates['agent_identity_ref'] = agent_identity_refc4c89,
      codeStates['setagent_identity_ref'] = setagent_identity_refc4c89,
      codeStates['identity_provider'] = identity_provider4076a,
      codeStates['setidentity_provider'] = setidentity_provider4076a,
      codeStates['authority_level_code'] = authority_level_codea4eeb,
      codeStates['setauthority_level_code'] = setauthority_level_codea4eeb,
      codeStates['kill_switch_state_code'] = kill_switch_state_code78d44,
      codeStates['setkill_switch_state_code'] = setkill_switch_state_code78d44,
      codeStates['edit_bt'] = edit_btab9fa,
      codeStates['setedit_bt'] = setedit_btab9fa,
      codeStates['delete_bt'] = delete_bteda7a,
      codeStates['setdelete_bt'] = setdelete_bteda7a,
      codeStates['del_group'] = del_group9b94a,
      codeStates['setdel_group'] = setdel_group9b94a,
      codeStates['del_group9b94a'] = del_group9b94aProps,
      codeStates['setdel_group9b94a'] = setdel_group9b94aProps,
      codeStates['agentdelete_v1'] = agentdelete_v1Props,
      codeStates['setagentdelete_v1'] = setagentdelete_v1Props,
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
        "f5f29f052a967c8eb254e29b6a48126f",
        "6681deff01db3efc91b7b768e80eda7a"
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
      if (id === "delete_bteda7a") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[delete_bteda7a?.refresh])


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
    let bindData2 = filterByKeys(mainData,del_group9b94aProps?.controls);
    setdel_group9b94a(bindData2||{})
    setdel_group9b94aProps({...del_group9b94aProps,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "bf86732b75cee6055ed5446113c4cc7d",
        "object": {
          "properties.agent_control_id": "2788c42ff8fa2ffd6c885d453ff0dd2d"
        }
      }
    ]
  }
];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setagentdelete_v1Props([...filterData4 ]);
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

 if (delete_bteda7a?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIAgentControl:AFVK:v1','aiagentcontrol','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Delete Control"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "agentdelete"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAgentdeletepage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {delete_bteda7a?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_bt

