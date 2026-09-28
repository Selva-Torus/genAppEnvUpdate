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
import PageAddriskruleconditionpage8 from '@/app/addriskrulecondition_v1/addriskrulecondition_v1page';
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
  const [showProfileAsModalOpen8, setShowProfileAsModalOpen8] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {codesets_group1c519, setcodesets_group1c519}= useContext(TotalContext) as TotalContextProps;
  const {codesets_group1c519Props, setcodesets_group1c519Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41f, setrule_condition_table7b41f}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41fProps, setrule_condition_table7b41fProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_id14d5f, setrule_condition_id14d5f}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_id1c126, setrisk_rule_id1c126}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name32305, setattribute_name32305}= useContext(TotalContext) as TotalContextProps;
  const {operator_code14f9a, setoperator_code14f9a}= useContext(TotalContext) as TotalContextProps;
  const {is_active01a05, setis_active01a05}= useContext(TotalContext) as TotalContextProps;
  const {view_btn1c5a8, setview_btn1c5a8}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd6c8c, setedit_btnd6c8c}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn4c4a1, setdelete_btn4c4a1}= useContext(TotalContext) as TotalContextProps;
  const {save_btn86246, setsave_btn86246}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461, setdynamicactions0c461}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461Props, setdynamicactions0c461Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btn0e469, setupdate_btn0e469}= useContext(TotalContext) as TotalContextProps;
  const {add_group111bb, setadd_group111bb}= useContext(TotalContext) as TotalContextProps;
  const {add_group111bbProps, setadd_group111bbProps}= useContext(TotalContext) as TotalContextProps;
  const {addriskrulecondition_v1Props, setaddriskrulecondition_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['codesets_group'] = codesets_group1c519,
      codeStates['setcodesets_group'] = setcodesets_group1c519,
      codeStates['codesets_group1c519'] = codesets_group1c519Props,
      codeStates['setcodesets_group1c519'] = setcodesets_group1c519Props,
      codeStates['rule_condition_table'] = rule_condition_table7b41f,
      codeStates['setrule_condition_table'] = setrule_condition_table7b41f,
      codeStates['rule_condition_table7b41f'] = rule_condition_table7b41fProps,
      codeStates['setrule_condition_table7b41f'] = setrule_condition_table7b41fProps,
      codeStates['rule_condition_id'] = rule_condition_id14d5f,
      codeStates['setrule_condition_id'] = setrule_condition_id14d5f,
      codeStates['risk_rule_id'] = risk_rule_id1c126,
      codeStates['setrisk_rule_id'] = setrisk_rule_id1c126,
      codeStates['attribute_name'] = attribute_name32305,
      codeStates['setattribute_name'] = setattribute_name32305,
      codeStates['operator_code'] = operator_code14f9a,
      codeStates['setoperator_code'] = setoperator_code14f9a,
      codeStates['is_active'] = is_active01a05,
      codeStates['setis_active'] = setis_active01a05,
      codeStates['view_btn'] = view_btn1c5a8,
      codeStates['setview_btn'] = setview_btn1c5a8,
      codeStates['edit_btn'] = edit_btnd6c8c,
      codeStates['setedit_btn'] = setedit_btnd6c8c,
      codeStates['delete_btn'] = delete_btn4c4a1,
      codeStates['setdelete_btn'] = setdelete_btn4c4a1,
      codeStates['save_btn'] = save_btn86246,
      codeStates['setsave_btn'] = setsave_btn86246,
      codeStates['dynamicactions'] = dynamicactions0c461,
      codeStates['setdynamicactions'] = setdynamicactions0c461,
      codeStates['dynamicactions0c461'] = dynamicactions0c461Props,
      codeStates['setdynamicactions0c461'] = setdynamicactions0c461Props,
      codeStates['update_btn'] = update_btn0e469,
      codeStates['setupdate_btn'] = setupdate_btn0e469,
      codeStates['add_group'] = add_group111bb,
      codeStates['setadd_group'] = setadd_group111bb,
      codeStates['add_group111bb'] = add_group111bbProps,
      codeStates['setadd_group111bb'] = setadd_group111bbProps,
      codeStates['addriskrulecondition_v1'] = addriskrulecondition_v1Props,
      codeStates['setaddriskrulecondition_v1'] = setaddriskrulecondition_v1Props,
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
        "676bd9b073bec5cd5dc14ac6f257b41f",
        "8e8bae83196946729988f745686d6c8c"
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
      if (id === "edit_btnd6c8c") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen8(false)
  },[edit_btnd6c8c?.refresh])


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
    setsave_btn86246((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setupdate_btn0e469((prev: any) => ({ ...prev, isDisabled: false }));
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,add_group111bbProps?.controls);
    setadd_group111bb(bindData6||{})
    setadd_group111bbProps({...add_group111bbProps,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps8:any =  [];
    let filterData8 = await getFilterProps(filterProps8,mainData);
    setaddriskrulecondition_v1Props([...filterData8 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen8(true);
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

 if (edit_btnd6c8c?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:ruleCondition:AFVK:v1','rulecondition','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen8} 
        onClose={() => {
          setShowProfileAsModalOpen8(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Rule Condition"
        variant="subheader-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addriskrulecondition"
        className='w-[80%] h-[60%] bg-gray-50 overflow-auto'
      >
        <PageAddriskruleconditionpage8  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {edit_btnd6c8c?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

