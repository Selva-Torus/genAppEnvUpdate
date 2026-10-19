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
import PageChangetierpage2 from '@/app/changetier_v1/changetier_v1page';
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
 

const Buttonchange_tier_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_ai_asset_registry1e42b, setoverall_ai_asset_registry1e42b}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry1e42bProps, setoverall_ai_asset_registry1e42bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42, setai_registry_groupb6b42}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupb6b42Props, setai_registry_groupb6b42Props}= useContext(TotalContext) as TotalContextProps;
  const {group675e8, setgroup675e8}= useContext(TotalContext) as TotalContextProps;
  const {group675e8Props, setgroup675e8Props}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73a, setdesc_groupda73a}= useContext(TotalContext) as TotalContextProps;
  const {desc_groupda73aProps, setdesc_groupda73aProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0, setrule_group83db0}= useContext(TotalContext) as TotalContextProps;
  const {rule_group83db0Props, setrule_group83db0Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865, setrule_evaluation_table9e865}= useContext(TotalContext) as TotalContextProps;
  const {rule_evaluation_table9e865Props, setrule_evaluation_table9e865Props}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id76935, settier_assessment_id76935}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id97328, setai_asset_id97328}= useContext(TotalContext) as TotalContextProps;
  const {previous_tier_codeb04e7, setprevious_tier_codeb04e7}= useContext(TotalContext) as TotalContextProps;
  const {rule_code8774e, setrule_code8774e}= useContext(TotalContext) as TotalContextProps;
  const {rule_name68434, setrule_name68434}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_codec45d4, setassessed_tier_codec45d4}= useContext(TotalContext) as TotalContextProps;
  const {change_tier_btn642f8, setchange_tier_btn642f8}= useContext(TotalContext) as TotalContextProps;
  const {changetier_v1Props, setchangetier_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {code_value_groupa2e67, setcode_value_groupa2e67}= useContext(TotalContext) as TotalContextProps;
  const {code_value_groupa2e67Props, setcode_value_groupa2e67Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry1e42b,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry1e42b,
      codeStates['overall_ai_asset_registry1e42b'] = overall_ai_asset_registry1e42bProps,
      codeStates['setoverall_ai_asset_registry1e42b'] = setoverall_ai_asset_registry1e42bProps,
      codeStates['ai_registry_group'] = ai_registry_groupb6b42,
      codeStates['setai_registry_group'] = setai_registry_groupb6b42,
      codeStates['ai_registry_groupb6b42'] = ai_registry_groupb6b42Props,
      codeStates['setai_registry_groupb6b42'] = setai_registry_groupb6b42Props,
      codeStates['group'] = group675e8,
      codeStates['setgroup'] = setgroup675e8,
      codeStates['group675e8'] = group675e8Props,
      codeStates['setgroup675e8'] = setgroup675e8Props,
      codeStates['desc_group'] = desc_groupda73a,
      codeStates['setdesc_group'] = setdesc_groupda73a,
      codeStates['desc_groupda73a'] = desc_groupda73aProps,
      codeStates['setdesc_groupda73a'] = setdesc_groupda73aProps,
      codeStates['rule_group'] = rule_group83db0,
      codeStates['setrule_group'] = setrule_group83db0,
      codeStates['rule_group83db0'] = rule_group83db0Props,
      codeStates['setrule_group83db0'] = setrule_group83db0Props,
      codeStates['rule_evaluation_table'] = rule_evaluation_table9e865,
      codeStates['setrule_evaluation_table'] = setrule_evaluation_table9e865,
      codeStates['rule_evaluation_table9e865'] = rule_evaluation_table9e865Props,
      codeStates['setrule_evaluation_table9e865'] = setrule_evaluation_table9e865Props,
      codeStates['tier_assessment_id'] = tier_assessment_id76935,
      codeStates['settier_assessment_id'] = settier_assessment_id76935,
      codeStates['ai_asset_id'] = ai_asset_id97328,
      codeStates['setai_asset_id'] = setai_asset_id97328,
      codeStates['previous_tier_code'] = previous_tier_codeb04e7,
      codeStates['setprevious_tier_code'] = setprevious_tier_codeb04e7,
      codeStates['rule_code'] = rule_code8774e,
      codeStates['setrule_code'] = setrule_code8774e,
      codeStates['rule_name'] = rule_name68434,
      codeStates['setrule_name'] = setrule_name68434,
      codeStates['assessed_tier_code'] = assessed_tier_codec45d4,
      codeStates['setassessed_tier_code'] = setassessed_tier_codec45d4,
      codeStates['change_tier_btn'] = change_tier_btn642f8,
      codeStates['setchange_tier_btn'] = setchange_tier_btn642f8,
      codeStates['changetier_v1'] = changetier_v1Props,
      codeStates['setchangetier_v1'] = setchangetier_v1Props,
      codeStates['code_value_group'] = code_value_groupa2e67,
      codeStates['setcode_value_group'] = setcode_value_groupa2e67,
      codeStates['code_value_groupa2e67'] = code_value_groupa2e67Props,
      codeStates['setcode_value_groupa2e67'] = setcode_value_groupa2e67Props,
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
        "3ebb4db546144797b9dd1be70639e865",
        "b574e2b1d0ea4f1dab0220e1af8642f8"
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
      if (id === "change_tier_btn642f8") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[change_tier_btn642f8?.refresh])


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

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setchangetier_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    setcode_value_groupa2e67(mainData||{})
    setcode_value_groupa2e67Props({...code_value_groupa2e67Props,presetValues:{...(mainData||{})}})
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

 if (change_tier_btn642f8?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleEvaluation:AFVK:v1','ruleevaluation','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "changetier"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageChangetierpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {change_tier_btn642f8?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Change Tier")}
        </Button>}
      </div>
    
  )
}

export default Buttonchange_tier_btn

