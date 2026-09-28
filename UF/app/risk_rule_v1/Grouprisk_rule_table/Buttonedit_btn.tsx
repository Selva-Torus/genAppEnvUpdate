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
import PageAddriskrulepage12 from '@/app/addriskrule_v1/addriskrule_v1page';
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

  const {groupf5307, setgroupf5307}= useContext(TotalContext) as TotalContextProps;
  const {groupf5307Props, setgroupf5307Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6, setrisk_rule_table159f6}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_table159f6Props, setrisk_rule_table159f6Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_code0aa8a, setrule_code0aa8a}= useContext(TotalContext) as TotalContextProps;
  const {rule_name9f319, setrule_name9f319}= useContext(TotalContext) as TotalContextProps;
  const {result_tier_codeca7bb, setresult_tier_codeca7bb}= useContext(TotalContext) as TotalContextProps;
  const {priority_orderd6801, setpriority_orderd6801}= useContext(TotalContext) as TotalContextProps;
  const {is_active21ce9, setis_active21ce9}= useContext(TotalContext) as TotalContextProps;
  const {view_btn6c086, setview_btn6c086}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn46940, setedit_btn46940}= useContext(TotalContext) as TotalContextProps;
  const {del_btnadc5a, setdel_btnadc5a}= useContext(TotalContext) as TotalContextProps;
  const {save_btn1a97d, setsave_btn1a97d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618ef, setdynamicactions618ef}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions618efProps, setdynamicactions618efProps}= useContext(TotalContext) as TotalContextProps;
  const {update_btn64f3f, setupdate_btn64f3f}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49, setinfo_group69a49}= useContext(TotalContext) as TotalContextProps;
  const {info_group69a49Props, setinfo_group69a49Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8e, setgroupc3f8e}= useContext(TotalContext) as TotalContextProps;
  const {groupc3f8eProps, setgroupc3f8eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38fa, setrule_config_groupa38fa}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa38faProps, setrule_config_groupa38faProps}= useContext(TotalContext) as TotalContextProps;
  const {addriskrule_v1Props, setaddriskrule_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['group'] = groupf5307,
      codeStates['setgroup'] = setgroupf5307,
      codeStates['groupf5307'] = groupf5307Props,
      codeStates['setgroupf5307'] = setgroupf5307Props,
      codeStates['risk_rule_table'] = risk_rule_table159f6,
      codeStates['setrisk_rule_table'] = setrisk_rule_table159f6,
      codeStates['risk_rule_table159f6'] = risk_rule_table159f6Props,
      codeStates['setrisk_rule_table159f6'] = setrisk_rule_table159f6Props,
      codeStates['rule_code'] = rule_code0aa8a,
      codeStates['setrule_code'] = setrule_code0aa8a,
      codeStates['rule_name'] = rule_name9f319,
      codeStates['setrule_name'] = setrule_name9f319,
      codeStates['result_tier_code'] = result_tier_codeca7bb,
      codeStates['setresult_tier_code'] = setresult_tier_codeca7bb,
      codeStates['priority_order'] = priority_orderd6801,
      codeStates['setpriority_order'] = setpriority_orderd6801,
      codeStates['is_active'] = is_active21ce9,
      codeStates['setis_active'] = setis_active21ce9,
      codeStates['view_btn'] = view_btn6c086,
      codeStates['setview_btn'] = setview_btn6c086,
      codeStates['edit_btn'] = edit_btn46940,
      codeStates['setedit_btn'] = setedit_btn46940,
      codeStates['del_btn'] = del_btnadc5a,
      codeStates['setdel_btn'] = setdel_btnadc5a,
      codeStates['save_btn'] = save_btn1a97d,
      codeStates['setsave_btn'] = setsave_btn1a97d,
      codeStates['dynamicactions'] = dynamicactions618ef,
      codeStates['setdynamicactions'] = setdynamicactions618ef,
      codeStates['dynamicactions618ef'] = dynamicactions618efProps,
      codeStates['setdynamicactions618ef'] = setdynamicactions618efProps,
      codeStates['update_btn'] = update_btn64f3f,
      codeStates['setupdate_btn'] = setupdate_btn64f3f,
      codeStates['info_group'] = info_group69a49,
      codeStates['setinfo_group'] = setinfo_group69a49,
      codeStates['info_group69a49'] = info_group69a49Props,
      codeStates['setinfo_group69a49'] = setinfo_group69a49Props,
      codeStates['group'] = groupc3f8e,
      codeStates['setgroup'] = setgroupc3f8e,
      codeStates['groupc3f8e'] = groupc3f8eProps,
      codeStates['setgroupc3f8e'] = setgroupc3f8eProps,
      codeStates['rule_config_group'] = rule_config_groupa38fa,
      codeStates['setrule_config_group'] = setrule_config_groupa38fa,
      codeStates['rule_config_groupa38fa'] = rule_config_groupa38faProps,
      codeStates['setrule_config_groupa38fa'] = setrule_config_groupa38faProps,
      codeStates['addriskrule_v1'] = addriskrule_v1Props,
      codeStates['setaddriskrule_v1'] = setaddriskrule_v1Props,
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
        "a29ca67334d046458bf34f78510159f6",
        "f27e134e5789415aa8e61666ef146940"
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
      if (id === "edit_btn46940") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen12(false)
  },[edit_btn46940?.refresh])


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

    //disableElement
    setsave_btn1a97d((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setupdate_btn64f3f((prev: any) => ({ ...prev, isDisabled: false }));
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,info_group69a49Props?.controls);
    setinfo_group69a49(bindData6||{})
    setinfo_group69a49Props({...info_group69a49Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,groupc3f8eProps?.controls);
    setgroupc3f8e(bindData8||{})
    setgroupc3f8eProps({...groupc3f8eProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,rule_config_groupa38faProps?.controls);
    setrule_config_groupa38fa(bindData10||{})
    setrule_config_groupa38faProps({...rule_config_groupa38faProps,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps12:any =  [];
    let filterData12 = await getFilterProps(filterProps12,mainData);
    setaddriskrule_v1Props([...filterData12 ]);
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

 if (edit_btn46940?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskRule:AFVK:v1','riskrule','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen12} 
        onClose={() => {
          setShowProfileAsModalOpen12(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Risk Rule"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addriskrule"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddriskrulepage12  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn46940?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

