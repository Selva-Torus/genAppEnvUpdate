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
import PageAddassetversionpage12 from '@/app/addassetversion_v1/addassetversion_v1page';
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
 

const Buttonedit_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen12, setShowProfileAsModalOpen12] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_group75f3d, setoverall_group75f3d}= useContext(TotalContext) as TotalContextProps;
  const {overall_group75f3dProps, setoverall_group75f3dProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group9cca8, setai_asset_version_table_group9cca8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group9cca8Props, setai_asset_version_table_group9cca8Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40, setai_asset_version_table4bc40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table4bc40Props, setai_asset_version_table4bc40Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_id3d7e4, setasset_version_id3d7e4}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0a773, setasset_name0a773}= useContext(TotalContext) as TotalContextProps;
  const {version_no635f0, setversion_no635f0}= useContext(TotalContext) as TotalContextProps;
  const {change_type_codecfabb, setchange_type_codecfabb}= useContext(TotalContext) as TotalContextProps;
  const {change_reason9d3b0, setchange_reason9d3b0}= useContext(TotalContext) as TotalContextProps;
  const {valid_fromcd4ab, setvalid_fromcd4ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_tob2b1d, setvalid_tob2b1d}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna1487, setedit_btna1487}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn8d8c9, setdelete_btn8d8c9}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6, setaction_details_group51bc6}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group51bc6Props, setaction_details_group51bc6Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126, setaction_detail_group32126}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group32126Props, setaction_detail_group32126Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7c, setrisk_conf_group60f7c}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group60f7cProps, setrisk_conf_group60f7cProps}= useContext(TotalContext) as TotalContextProps;
  const {update_bt0d4af, setupdate_bt0d4af}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385, setdynamicactionsae385}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsae385Props, setdynamicactionsae385Props}= useContext(TotalContext) as TotalContextProps;
  const {save_bt95953, setsave_bt95953}= useContext(TotalContext) as TotalContextProps;
  const {addassetversion_v1Props, setaddassetversion_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group75f3d,
      codeStates['setoverall_group'] = setoverall_group75f3d,
      codeStates['overall_group75f3d'] = overall_group75f3dProps,
      codeStates['setoverall_group75f3d'] = setoverall_group75f3dProps,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group9cca8,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group9cca8,
      codeStates['ai_asset_version_table_group9cca8'] = ai_asset_version_table_group9cca8Props,
      codeStates['setai_asset_version_table_group9cca8'] = setai_asset_version_table_group9cca8Props,
      codeStates['ai_asset_version_table'] = ai_asset_version_table4bc40,
      codeStates['setai_asset_version_table'] = setai_asset_version_table4bc40,
      codeStates['ai_asset_version_table4bc40'] = ai_asset_version_table4bc40Props,
      codeStates['setai_asset_version_table4bc40'] = setai_asset_version_table4bc40Props,
      codeStates['asset_version_id'] = asset_version_id3d7e4,
      codeStates['setasset_version_id'] = setasset_version_id3d7e4,
      codeStates['asset_name'] = asset_name0a773,
      codeStates['setasset_name'] = setasset_name0a773,
      codeStates['version_no'] = version_no635f0,
      codeStates['setversion_no'] = setversion_no635f0,
      codeStates['change_type_code'] = change_type_codecfabb,
      codeStates['setchange_type_code'] = setchange_type_codecfabb,
      codeStates['change_reason'] = change_reason9d3b0,
      codeStates['setchange_reason'] = setchange_reason9d3b0,
      codeStates['valid_from'] = valid_fromcd4ab,
      codeStates['setvalid_from'] = setvalid_fromcd4ab,
      codeStates['valid_to'] = valid_tob2b1d,
      codeStates['setvalid_to'] = setvalid_tob2b1d,
      codeStates['edit_btn'] = edit_btna1487,
      codeStates['setedit_btn'] = setedit_btna1487,
      codeStates['delete_btn'] = delete_btn8d8c9,
      codeStates['setdelete_btn'] = setdelete_btn8d8c9,
      codeStates['action_details_group'] = action_details_group51bc6,
      codeStates['setaction_details_group'] = setaction_details_group51bc6,
      codeStates['action_details_group51bc6'] = action_details_group51bc6Props,
      codeStates['setaction_details_group51bc6'] = setaction_details_group51bc6Props,
      codeStates['action_detail_group'] = action_detail_group32126,
      codeStates['setaction_detail_group'] = setaction_detail_group32126,
      codeStates['action_detail_group32126'] = action_detail_group32126Props,
      codeStates['setaction_detail_group32126'] = setaction_detail_group32126Props,
      codeStates['risk_conf_group'] = risk_conf_group60f7c,
      codeStates['setrisk_conf_group'] = setrisk_conf_group60f7c,
      codeStates['risk_conf_group60f7c'] = risk_conf_group60f7cProps,
      codeStates['setrisk_conf_group60f7c'] = setrisk_conf_group60f7cProps,
      codeStates['update_bt'] = update_bt0d4af,
      codeStates['setupdate_bt'] = setupdate_bt0d4af,
      codeStates['dynamicactions'] = dynamicactionsae385,
      codeStates['setdynamicactions'] = setdynamicactionsae385,
      codeStates['dynamicactionsae385'] = dynamicactionsae385Props,
      codeStates['setdynamicactionsae385'] = setdynamicactionsae385Props,
      codeStates['save_bt'] = save_bt95953,
      codeStates['setsave_bt'] = setsave_bt95953,
      codeStates['addassetversion_v1'] = addassetversion_v1Props,
      codeStates['setaddassetversion_v1'] = setaddassetversion_v1Props,
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
        "9f2748f034c4094d3e1dce2fe6f4bc40",
        "1ce3d046e3a849c2ae10529113fa1487"
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
      if (id === "edit_btna1487") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen12(false)
  },[edit_btna1487?.refresh])


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
    let bindData2 = filterByKeys(mainData,action_details_group51bc6Props?.controls);
    setaction_details_group51bc6(bindData2||{})
    setaction_details_group51bc6Props({...action_details_group51bc6Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,action_detail_group32126Props?.controls);
    setaction_detail_group32126(bindData4||{})
    setaction_detail_group32126Props({...action_detail_group32126Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,risk_conf_group60f7cProps?.controls);
    setrisk_conf_group60f7c(bindData6||{})
    setrisk_conf_group60f7cProps({...risk_conf_group60f7cProps,presetValues:{...(mainData||{})}})
    //enableElement
    setupdate_bt0d4af((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_bt95953((prev: any) => ({ ...prev, isDisabled: true }));
    // showArtifactAsModal
    let filterProps12:any =  [];
    let filterData12 = await getFilterProps(filterProps12,mainData);
    setaddassetversion_v1Props([...filterData12 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen12(true);
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

 if (edit_btna1487?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetVersion:AFVK:v1','aiassetversion','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen12} 
        onClose={() => {
          setShowProfileAsModalOpen12(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Add Asset Version"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addassetversion"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddassetversionpage12  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btna1487?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

