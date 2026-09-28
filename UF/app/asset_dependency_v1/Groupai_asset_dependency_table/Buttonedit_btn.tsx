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
import PageAddaiassetdependencypage12 from '@/app/addaiassetdependency_v1/addaiassetdependency_v1page';
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

  const {overall_group5e5f7, setoverall_group5e5f7}= useContext(TotalContext) as TotalContextProps;
  const {overall_group5e5f7Props, setoverall_group5e5f7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcec, setai_asset_dependency_groupdbcec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupdbcecProps, setai_asset_dependency_groupdbcecProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8, setai_asset_dependency_table789c8}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_table789c8Props, setai_asset_dependency_table789c8Props}= useContext(TotalContext) as TotalContextProps;
  const {dependency_idb7ed1, setdependency_idb7ed1}= useContext(TotalContext) as TotalContextProps;
  const {asset_namef9271, setasset_namef9271}= useContext(TotalContext) as TotalContextProps;
  const {dependency_named9050, setdependency_named9050}= useContext(TotalContext) as TotalContextProps;
  const {dependency_type_code8b20c, setdependency_type_code8b20c}= useContext(TotalContext) as TotalContextProps;
  const {directionffe79, setdirectionffe79}= useContext(TotalContext) as TotalContextProps;
  const {is_criticala4198, setis_criticala4198}= useContext(TotalContext) as TotalContextProps;
  const {is_activea8dd7, setis_activea8dd7}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn09b48, setedit_btn09b48}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn5c752, setdelete_btn5c752}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group3e7e8, setaction_details_group3e7e8}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group3e7e8Props, setaction_details_group3e7e8Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupa24ba, setaction_detail_groupa24ba}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_groupa24baProps, setaction_detail_groupa24baProps}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupfa4d5, setrisk_conf_groupfa4d5}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupfa4d5Props, setrisk_conf_groupfa4d5Props}= useContext(TotalContext) as TotalContextProps;
  const {save_bt74cb7, setsave_bt74cb7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9a, setdynamicactionsf9e9a}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsf9e9aProps, setdynamicactionsf9e9aProps}= useContext(TotalContext) as TotalContextProps;
  const {update_bt5d7fd, setupdate_bt5d7fd}= useContext(TotalContext) as TotalContextProps;
  const {addaiassetdependency_v1Props, setaddaiassetdependency_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group5e5f7,
      codeStates['setoverall_group'] = setoverall_group5e5f7,
      codeStates['overall_group5e5f7'] = overall_group5e5f7Props,
      codeStates['setoverall_group5e5f7'] = setoverall_group5e5f7Props,
      codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupdbcec,
      codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupdbcec,
      codeStates['ai_asset_dependency_groupdbcec'] = ai_asset_dependency_groupdbcecProps,
      codeStates['setai_asset_dependency_groupdbcec'] = setai_asset_dependency_groupdbcecProps,
      codeStates['ai_asset_dependency_table'] = ai_asset_dependency_table789c8,
      codeStates['setai_asset_dependency_table'] = setai_asset_dependency_table789c8,
      codeStates['ai_asset_dependency_table789c8'] = ai_asset_dependency_table789c8Props,
      codeStates['setai_asset_dependency_table789c8'] = setai_asset_dependency_table789c8Props,
      codeStates['dependency_id'] = dependency_idb7ed1,
      codeStates['setdependency_id'] = setdependency_idb7ed1,
      codeStates['asset_name'] = asset_namef9271,
      codeStates['setasset_name'] = setasset_namef9271,
      codeStates['dependency_name'] = dependency_named9050,
      codeStates['setdependency_name'] = setdependency_named9050,
      codeStates['dependency_type_code'] = dependency_type_code8b20c,
      codeStates['setdependency_type_code'] = setdependency_type_code8b20c,
      codeStates['direction'] = directionffe79,
      codeStates['setdirection'] = setdirectionffe79,
      codeStates['is_critical'] = is_criticala4198,
      codeStates['setis_critical'] = setis_criticala4198,
      codeStates['is_active'] = is_activea8dd7,
      codeStates['setis_active'] = setis_activea8dd7,
      codeStates['edit_btn'] = edit_btn09b48,
      codeStates['setedit_btn'] = setedit_btn09b48,
      codeStates['delete_btn'] = delete_btn5c752,
      codeStates['setdelete_btn'] = setdelete_btn5c752,
      codeStates['action_details_group'] = action_details_group3e7e8,
      codeStates['setaction_details_group'] = setaction_details_group3e7e8,
      codeStates['action_details_group3e7e8'] = action_details_group3e7e8Props,
      codeStates['setaction_details_group3e7e8'] = setaction_details_group3e7e8Props,
      codeStates['action_detail_group'] = action_detail_groupa24ba,
      codeStates['setaction_detail_group'] = setaction_detail_groupa24ba,
      codeStates['action_detail_groupa24ba'] = action_detail_groupa24baProps,
      codeStates['setaction_detail_groupa24ba'] = setaction_detail_groupa24baProps,
      codeStates['risk_conf_group'] = risk_conf_groupfa4d5,
      codeStates['setrisk_conf_group'] = setrisk_conf_groupfa4d5,
      codeStates['risk_conf_groupfa4d5'] = risk_conf_groupfa4d5Props,
      codeStates['setrisk_conf_groupfa4d5'] = setrisk_conf_groupfa4d5Props,
      codeStates['save_bt'] = save_bt74cb7,
      codeStates['setsave_bt'] = setsave_bt74cb7,
      codeStates['dynamicactions'] = dynamicactionsf9e9a,
      codeStates['setdynamicactions'] = setdynamicactionsf9e9a,
      codeStates['dynamicactionsf9e9a'] = dynamicactionsf9e9aProps,
      codeStates['setdynamicactionsf9e9a'] = setdynamicactionsf9e9aProps,
      codeStates['update_bt'] = update_bt5d7fd,
      codeStates['setupdate_bt'] = setupdate_bt5d7fd,
      codeStates['addaiassetdependency_v1'] = addaiassetdependency_v1Props,
      codeStates['setaddaiassetdependency_v1'] = setaddaiassetdependency_v1Props,
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
        "0383193d5dc15c369dd0ede393a789c8",
        "85aee7cf2a7a4730745fe74038009b48"
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
      if (id === "edit_btn09b48") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen12(false)
  },[edit_btn09b48?.refresh])


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
    let bindData2 = filterByKeys(mainData,action_details_group3e7e8Props?.controls);
    setaction_details_group3e7e8(bindData2||{})
    setaction_details_group3e7e8Props({...action_details_group3e7e8Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,action_detail_groupa24baProps?.controls);
    setaction_detail_groupa24ba(bindData4||{})
    setaction_detail_groupa24baProps({...action_detail_groupa24baProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,risk_conf_groupfa4d5Props?.controls);
    setrisk_conf_groupfa4d5(bindData6||{})
    setrisk_conf_groupfa4d5Props({...risk_conf_groupfa4d5Props,presetValues:{...(mainData||{})}})
    //disableElement
    setsave_bt74cb7((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setupdate_bt5d7fd((prev: any) => ({ ...prev, isDisabled: false }));
    // showArtifactAsModal
    let filterProps12:any =  [];
    let filterData12 = await getFilterProps(filterProps12,mainData);
    setaddaiassetdependency_v1Props([...filterData12 ]);
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

 if (edit_btn09b48?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AiAssetDependency:AFVK:v1','aiassetdependency','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen12} 
        onClose={() => {
          setShowProfileAsModalOpen12(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Asset Dependency"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addaiassetdependency"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddaiassetdependencypage12  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn09b48?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

