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
import { getPublicEnv } from "@/app/components/public-env";
import PageAddcredentialrefpage2 from '@/app/addcredentialref_v1/addcredentialref_v1page';
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
 

const Buttonedit_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_ai_asset_registry28d63, setoverall_ai_asset_registry28d63}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry28d63Props, setoverall_ai_asset_registry28d63Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101, setai_registry_groupd4101}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupd4101Props, setai_registry_groupd4101Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1e, setai_registry_text_group0da1e}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group0da1eProps, setai_registry_text_group0da1eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906, setai_registry_table8e906}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table8e906Props, setai_registry_table8e906Props}= useContext(TotalContext) as TotalContextProps;
  const {credential_ref_id17f16, setcredential_ref_id17f16}= useContext(TotalContext) as TotalContextProps;
  const {ref_name1b5fb, setref_name1b5fb}= useContext(TotalContext) as TotalContextProps;
  const {vault_pathf74b7, setvault_pathf74b7}= useContext(TotalContext) as TotalContextProps;
  const {credential_type326de, setcredential_type326de}= useContext(TotalContext) as TotalContextProps;
  const {expires_at58538, setexpires_at58538}= useContext(TotalContext) as TotalContextProps;
  const {statusda86f, setstatusda86f}= useContext(TotalContext) as TotalContextProps;
  const {edit_bt61e0c, setedit_bt61e0c}= useContext(TotalContext) as TotalContextProps;
  const {delete_bt7a326, setdelete_bt7a326}= useContext(TotalContext) as TotalContextProps;
  const {addcredentialref_v1Props, setaddcredentialref_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btca9ea, setupdate_btca9ea}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03, setdynamicactions9ea03}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9ea03Props, setdynamicactions9ea03Props}= useContext(TotalContext) as TotalContextProps;
  const {save_bta58ad, setsave_bta58ad}= useContext(TotalContext) as TotalContextProps;
  const {overall_group28e6a, setoverall_group28e6a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group28e6aProps, setoverall_group28e6aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206, setaction_details_group24206}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group24206Props, setaction_details_group24206Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383de, setaction_detail_group383de}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group383deProps, setaction_detail_group383deProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07, setrisk_conf_group5fe07}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_group5fe07Props, setrisk_conf_group5fe07Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry28d63,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry28d63,
      codeStates['overall_ai_asset_registry28d63'] = overall_ai_asset_registry28d63Props,
      codeStates['setoverall_ai_asset_registry28d63'] = setoverall_ai_asset_registry28d63Props,
      codeStates['ai_registry_group'] = ai_registry_groupd4101,
      codeStates['setai_registry_group'] = setai_registry_groupd4101,
      codeStates['ai_registry_groupd4101'] = ai_registry_groupd4101Props,
      codeStates['setai_registry_groupd4101'] = setai_registry_groupd4101Props,
      codeStates['ai_registry_text_group'] = ai_registry_text_group0da1e,
      codeStates['setai_registry_text_group'] = setai_registry_text_group0da1e,
      codeStates['ai_registry_text_group0da1e'] = ai_registry_text_group0da1eProps,
      codeStates['setai_registry_text_group0da1e'] = setai_registry_text_group0da1eProps,
      codeStates['ai_registry_table'] = ai_registry_table8e906,
      codeStates['setai_registry_table'] = setai_registry_table8e906,
      codeStates['ai_registry_table8e906'] = ai_registry_table8e906Props,
      codeStates['setai_registry_table8e906'] = setai_registry_table8e906Props,
      codeStates['credential_ref_id'] = credential_ref_id17f16,
      codeStates['setcredential_ref_id'] = setcredential_ref_id17f16,
      codeStates['ref_name'] = ref_name1b5fb,
      codeStates['setref_name'] = setref_name1b5fb,
      codeStates['vault_path'] = vault_pathf74b7,
      codeStates['setvault_path'] = setvault_pathf74b7,
      codeStates['credential_type'] = credential_type326de,
      codeStates['setcredential_type'] = setcredential_type326de,
      codeStates['expires_at'] = expires_at58538,
      codeStates['setexpires_at'] = setexpires_at58538,
      codeStates['status'] = statusda86f,
      codeStates['setstatus'] = setstatusda86f,
      codeStates['edit_bt'] = edit_bt61e0c,
      codeStates['setedit_bt'] = setedit_bt61e0c,
      codeStates['delete_bt'] = delete_bt7a326,
      codeStates['setdelete_bt'] = setdelete_bt7a326,
      codeStates['addcredentialref_v1'] = addcredentialref_v1Props,
      codeStates['setaddcredentialref_v1'] = setaddcredentialref_v1Props,
      codeStates['update_bt'] = update_btca9ea,
      codeStates['setupdate_bt'] = setupdate_btca9ea,
      codeStates['dynamicactions'] = dynamicactions9ea03,
      codeStates['setdynamicactions'] = setdynamicactions9ea03,
      codeStates['dynamicactions9ea03'] = dynamicactions9ea03Props,
      codeStates['setdynamicactions9ea03'] = setdynamicactions9ea03Props,
      codeStates['save_bt'] = save_bta58ad,
      codeStates['setsave_bt'] = setsave_bta58ad,
      codeStates['overall_group'] = overall_group28e6a,
      codeStates['setoverall_group'] = setoverall_group28e6a,
      codeStates['overall_group28e6a'] = overall_group28e6aProps,
      codeStates['setoverall_group28e6a'] = setoverall_group28e6aProps,
      codeStates['action_details_group'] = action_details_group24206,
      codeStates['setaction_details_group'] = setaction_details_group24206,
      codeStates['action_details_group24206'] = action_details_group24206Props,
      codeStates['setaction_details_group24206'] = setaction_details_group24206Props,
      codeStates['action_detail_group'] = action_detail_group383de,
      codeStates['setaction_detail_group'] = setaction_detail_group383de,
      codeStates['action_detail_group383de'] = action_detail_group383deProps,
      codeStates['setaction_detail_group383de'] = setaction_detail_group383deProps,
      codeStates['risk_conf_group'] = risk_conf_group5fe07,
      codeStates['setrisk_conf_group'] = setrisk_conf_group5fe07,
      codeStates['risk_conf_group5fe07'] = risk_conf_group5fe07Props,
      codeStates['setrisk_conf_group5fe07'] = setrisk_conf_group5fe07Props,
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
        "6be36c49d50723739042d8c2d7b8e906",
        "dfa33b97d0285f2957dd4d3767b61e0c"
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
      if (id === "edit_bt61e0c") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_bt61e0c?.refresh])


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
    setaddcredentialref_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //enableElement
    setupdate_btca9ea((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_bta58ad((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    setoverall_group28e6a(mainData||{})
    setoverall_group28e6aProps({...overall_group28e6aProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,action_details_group24206Props?.controls);
    setaction_details_group24206(bindData10||{})
    setaction_details_group24206Props({...action_details_group24206Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,action_details_group24206Props?.controls);
    setaction_details_group24206(bindData12||{})
    setaction_details_group24206Props({...action_details_group24206Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,action_detail_group383deProps?.controls);
    setaction_detail_group383de(bindData14||{})
    setaction_detail_group383deProps({...action_detail_group383deProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,risk_conf_group5fe07Props?.controls);
    setrisk_conf_group5fe07(bindData16||{})
    setrisk_conf_group5fe07Props({...risk_conf_group5fe07Props,presetValues:{...(mainData||{})}})
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

 if (edit_bt61e0c?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:credentialReferenceList:AFVK:v1','credentialreferencelist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
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
        modalName = "addcredentialref"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddcredentialrefpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_bt61e0c?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_bt

