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
import PageAddpolicyrulepage14 from '@/app/addpolicyrule_v1/addpolicyrule_v1page';
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
  const [showProfileAsModalOpen14, setShowProfileAsModalOpen14] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_group18db5, setoverall_group18db5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group18db5Props, setoverall_group18db5Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0d, setai_asset_dependency_group5fc0d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0dProps, setai_asset_dependency_group5fc0dProps}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5, setpolicy_rule_table7fde5}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5Props, setpolicy_rule_table7fde5Props}= useContext(TotalContext) as TotalContextProps;
  const {policy_ide22f4, setpolicy_ide22f4}= useContext(TotalContext) as TotalContextProps;
  const {policy_code2bda1, setpolicy_code2bda1}= useContext(TotalContext) as TotalContextProps;
  const {policy_namee53b7, setpolicy_namee53b7}= useContext(TotalContext) as TotalContextProps;
  const {policy_typea7044, setpolicy_typea7044}= useContext(TotalContext) as TotalContextProps;
  const {version_label4cb20, setversion_label4cb20}= useContext(TotalContext) as TotalContextProps;
  const {status09db0, setstatus09db0}= useContext(TotalContext) as TotalContextProps;
  const {test_statusdb5db, settest_statusdb5db}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn778af, setedit_btn778af}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn31d12, setdelete_btn31d12}= useContext(TotalContext) as TotalContextProps;
  const {update_btn8ac76, setupdate_btn8ac76}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btn736ea, setsave_btn736ea}= useContext(TotalContext) as TotalContextProps;
  const {info_group321cd, setinfo_group321cd}= useContext(TotalContext) as TotalContextProps;
  const {info_group321cdProps, setinfo_group321cdProps}= useContext(TotalContext) as TotalContextProps;
  const {group51f33, setgroup51f33}= useContext(TotalContext) as TotalContextProps;
  const {group51f33Props, setgroup51f33Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62a, setrule_config_group8a62a}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group8a62aProps, setrule_config_group8a62aProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0, setrule_config_groupab2fc0}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupab2fc0Props, setrule_config_groupab2fc0Props}= useContext(TotalContext) as TotalContextProps;
  const {addpolicyrule_v1Props, setaddpolicyrule_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group18db5,
      codeStates['setoverall_group'] = setoverall_group18db5,
      codeStates['overall_group18db5'] = overall_group18db5Props,
      codeStates['setoverall_group18db5'] = setoverall_group18db5Props,
      codeStates['ai_asset_dependency_group'] = ai_asset_dependency_group5fc0d,
      codeStates['setai_asset_dependency_group'] = setai_asset_dependency_group5fc0d,
      codeStates['ai_asset_dependency_group5fc0d'] = ai_asset_dependency_group5fc0dProps,
      codeStates['setai_asset_dependency_group5fc0d'] = setai_asset_dependency_group5fc0dProps,
      codeStates['policy_rule_table'] = policy_rule_table7fde5,
      codeStates['setpolicy_rule_table'] = setpolicy_rule_table7fde5,
      codeStates['policy_rule_table7fde5'] = policy_rule_table7fde5Props,
      codeStates['setpolicy_rule_table7fde5'] = setpolicy_rule_table7fde5Props,
      codeStates['policy_id'] = policy_ide22f4,
      codeStates['setpolicy_id'] = setpolicy_ide22f4,
      codeStates['policy_code'] = policy_code2bda1,
      codeStates['setpolicy_code'] = setpolicy_code2bda1,
      codeStates['policy_name'] = policy_namee53b7,
      codeStates['setpolicy_name'] = setpolicy_namee53b7,
      codeStates['policy_type'] = policy_typea7044,
      codeStates['setpolicy_type'] = setpolicy_typea7044,
      codeStates['version_label'] = version_label4cb20,
      codeStates['setversion_label'] = setversion_label4cb20,
      codeStates['status'] = status09db0,
      codeStates['setstatus'] = setstatus09db0,
      codeStates['test_status'] = test_statusdb5db,
      codeStates['settest_status'] = settest_statusdb5db,
      codeStates['edit_btn'] = edit_btn778af,
      codeStates['setedit_btn'] = setedit_btn778af,
      codeStates['delete_btn'] = delete_btn31d12,
      codeStates['setdelete_btn'] = setdelete_btn31d12,
      codeStates['update_btn'] = update_btn8ac76,
      codeStates['setupdate_btn'] = setupdate_btn8ac76,
      codeStates['dynamicactions'] = dynamicactions57d44,
      codeStates['setdynamicactions'] = setdynamicactions57d44,
      codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
      codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
      codeStates['save_btn'] = save_btn736ea,
      codeStates['setsave_btn'] = setsave_btn736ea,
      codeStates['info_group'] = info_group321cd,
      codeStates['setinfo_group'] = setinfo_group321cd,
      codeStates['info_group321cd'] = info_group321cdProps,
      codeStates['setinfo_group321cd'] = setinfo_group321cdProps,
      codeStates['group'] = group51f33,
      codeStates['setgroup'] = setgroup51f33,
      codeStates['group51f33'] = group51f33Props,
      codeStates['setgroup51f33'] = setgroup51f33Props,
      codeStates['rule_config_group'] = rule_config_group8a62a,
      codeStates['setrule_config_group'] = setrule_config_group8a62a,
      codeStates['rule_config_group8a62a'] = rule_config_group8a62aProps,
      codeStates['setrule_config_group8a62a'] = setrule_config_group8a62aProps,
      codeStates['rule_config_groupa'] = rule_config_groupab2fc0,
      codeStates['setrule_config_groupa'] = setrule_config_groupab2fc0,
      codeStates['rule_config_groupab2fc0'] = rule_config_groupab2fc0Props,
      codeStates['setrule_config_groupab2fc0'] = setrule_config_groupab2fc0Props,
      codeStates['addpolicyrule_v1'] = addpolicyrule_v1Props,
      codeStates['setaddpolicyrule_v1'] = setaddpolicyrule_v1Props,
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
        "23714957d9dde7f2f2876ef71d47fde5",
        "7a836cf54c1d524ff3c076ed43c778af"
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
      if (id === "edit_btn778af") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen14(false)
  },[edit_btn778af?.refresh])


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

    //enableElement
    setupdate_btn8ac76((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_btn736ea((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,info_group321cdProps?.controls);
    setinfo_group321cd(bindData6||{})
    setinfo_group321cdProps({...info_group321cdProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,group51f33Props?.controls);
    setgroup51f33(bindData8||{})
    setgroup51f33Props({...group51f33Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,rule_config_group8a62aProps?.controls);
    setrule_config_group8a62a(bindData10||{})
    setrule_config_group8a62aProps({...rule_config_group8a62aProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,rule_config_groupab2fc0Props?.controls);
    setrule_config_groupab2fc0(bindData12||{})
    setrule_config_groupab2fc0Props({...rule_config_groupab2fc0Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps14:any =  [];
    let filterData14 = await getFilterProps(filterProps14,mainData);
    setaddpolicyrule_v1Props([...filterData14 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen14(true);
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

 if (edit_btn778af?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1','policyrulelist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen14} 
        onClose={() => {
          setShowProfileAsModalOpen14(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Policy Rule"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addpolicyrule"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddpolicyrulepage14  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn778af?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

