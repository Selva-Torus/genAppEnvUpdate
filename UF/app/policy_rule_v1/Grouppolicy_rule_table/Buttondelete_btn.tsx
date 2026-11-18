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
import PageDeletepolicyrulepage4 from '@/app/deletepolicyrule_v1/deletepolicyrule_v1page';
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
  const {del_group56243, setdel_group56243}= useContext(TotalContext) as TotalContextProps;
  const {del_group56243Props, setdel_group56243Props}= useContext(TotalContext) as TotalContextProps;
  const {deletepolicyrule_v1Props, setdeletepolicyrule_v1Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['del_group'] = del_group56243,
      codeStates['setdel_group'] = setdel_group56243,
      codeStates['del_group56243'] = del_group56243Props,
      codeStates['setdel_group56243'] = setdel_group56243Props,
      codeStates['deletepolicyrule_v1'] = deletepolicyrule_v1Props,
      codeStates['setdeletepolicyrule_v1'] = setdeletepolicyrule_v1Props,
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
        "dba33902a3e3da1b9a3923fb8c431d12"
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
      if (id === "delete_btn31d12") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[delete_btn31d12?.refresh])


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
    let bindData2 = filterByKeys(mainData,del_group56243Props?.controls);
    setdel_group56243(bindData2||{})
    setdel_group56243Props({...del_group56243Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setdeletepolicyrule_v1Props([...filterData4 ]);
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

 if (delete_btn31d12?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:policyRuleList:AFVK:v1','policyrulelist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Delete Policy Rule"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "deletepolicyrule"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageDeletepolicyrulepage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {delete_btn31d12?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

