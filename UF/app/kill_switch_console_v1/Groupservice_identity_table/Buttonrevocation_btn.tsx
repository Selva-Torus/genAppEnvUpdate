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
import PageAddrevocationreceiptpage2 from '@/app/addrevocationreceipt_v1/addrevocationreceipt_v1page';
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
 

const Buttonrevocation_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_group8bfb3, setoverall_group8bfb3}= useContext(TotalContext) as TotalContextProps;
  const {overall_group8bfb3Props, setoverall_group8bfb3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40, setai_asset_dependency_groupeee40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40Props, setai_asset_dependency_groupeee40Props}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0, setservice_identity_table953a0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0Props, setservice_identity_table953a0Props}= useContext(TotalContext) as TotalContextProps;
  const {kill_action_id39aeb, setkill_action_id39aeb}= useContext(TotalContext) as TotalContextProps;
  const {action_no0df63, setaction_no0df63}= useContext(TotalContext) as TotalContextProps;
  const {asset_namea08a1, setasset_namea08a1}= useContext(TotalContext) as TotalContextProps;
  const {trigger_typebbde7, settrigger_typebbde7}= useContext(TotalContext) as TotalContextProps;
  const {trigger_ref436b3, settrigger_ref436b3}= useContext(TotalContext) as TotalContextProps;
  const {scope53c1d, setscope53c1d}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date9079a, settrs_created_date9079a}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn0e125, setedit_btn0e125}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn2b180, setdelete_btn2b180}= useContext(TotalContext) as TotalContextProps;
  const {containment_status1fd13, setcontainment_status1fd13}= useContext(TotalContext) as TotalContextProps;
  const {released_atc1a1f, setreleased_atc1a1f}= useContext(TotalContext) as TotalContextProps;
  const {revocation_btn170a3, setrevocation_btn170a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024, setai_asset_dependency_group_1ed024}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024Props, setai_asset_dependency_group_1ed024Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8, setgroupb1db8}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8Props, setgroupb1db8Props}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204, setrevocation_table5b204}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204Props, setrevocation_table5b204Props}= useContext(TotalContext) as TotalContextProps;
  const {addrevocationreceipt_v1Props, setaddrevocationreceipt_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps;
  const {enforcement_pointe970a, setenforcement_pointe970a}= useContext(TotalContext) as TotalContextProps;
  const {commandf580f, setcommandf580f}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group8bfb3,
      codeStates['setoverall_group'] = setoverall_group8bfb3,
      codeStates['overall_group8bfb3'] = overall_group8bfb3Props,
      codeStates['setoverall_group8bfb3'] = setoverall_group8bfb3Props,
      codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupeee40,
      codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupeee40,
      codeStates['ai_asset_dependency_groupeee40'] = ai_asset_dependency_groupeee40Props,
      codeStates['setai_asset_dependency_groupeee40'] = setai_asset_dependency_groupeee40Props,
      codeStates['service_identity_table'] = service_identity_table953a0,
      codeStates['setservice_identity_table'] = setservice_identity_table953a0,
      codeStates['service_identity_table953a0'] = service_identity_table953a0Props,
      codeStates['setservice_identity_table953a0'] = setservice_identity_table953a0Props,
      codeStates['kill_action_id'] = kill_action_id39aeb,
      codeStates['setkill_action_id'] = setkill_action_id39aeb,
      codeStates['action_no'] = action_no0df63,
      codeStates['setaction_no'] = setaction_no0df63,
      codeStates['asset_name'] = asset_namea08a1,
      codeStates['setasset_name'] = setasset_namea08a1,
      codeStates['trigger_type'] = trigger_typebbde7,
      codeStates['settrigger_type'] = settrigger_typebbde7,
      codeStates['trigger_ref'] = trigger_ref436b3,
      codeStates['settrigger_ref'] = settrigger_ref436b3,
      codeStates['scope'] = scope53c1d,
      codeStates['setscope'] = setscope53c1d,
      codeStates['trs_created_date'] = trs_created_date9079a,
      codeStates['settrs_created_date'] = settrs_created_date9079a,
      codeStates['edit_btn'] = edit_btn0e125,
      codeStates['setedit_btn'] = setedit_btn0e125,
      codeStates['delete_btn'] = delete_btn2b180,
      codeStates['setdelete_btn'] = setdelete_btn2b180,
      codeStates['containment_status'] = containment_status1fd13,
      codeStates['setcontainment_status'] = setcontainment_status1fd13,
      codeStates['released_at'] = released_atc1a1f,
      codeStates['setreleased_at'] = setreleased_atc1a1f,
      codeStates['revocation_btn'] = revocation_btn170a3,
      codeStates['setrevocation_btn'] = setrevocation_btn170a3,
      codeStates['ai_asset_dependency_group_1'] = ai_asset_dependency_group_1ed024,
      codeStates['setai_asset_dependency_group_1'] = setai_asset_dependency_group_1ed024,
      codeStates['ai_asset_dependency_group_1ed024'] = ai_asset_dependency_group_1ed024Props,
      codeStates['setai_asset_dependency_group_1ed024'] = setai_asset_dependency_group_1ed024Props,
      codeStates['group'] = groupb1db8,
      codeStates['setgroup'] = setgroupb1db8,
      codeStates['groupb1db8'] = groupb1db8Props,
      codeStates['setgroupb1db8'] = setgroupb1db8Props,
      codeStates['revocation_table'] = revocation_table5b204,
      codeStates['setrevocation_table'] = setrevocation_table5b204,
      codeStates['revocation_table5b204'] = revocation_table5b204Props,
      codeStates['setrevocation_table5b204'] = setrevocation_table5b204Props,
      codeStates['addrevocationreceipt_v1'] = addrevocationreceipt_v1Props,
      codeStates['setaddrevocationreceipt_v1'] = setaddrevocationreceipt_v1Props,
      codeStates['action_detail_group'] = action_detail_group71892,
      codeStates['setaction_detail_group'] = setaction_detail_group71892,
      codeStates['action_detail_group71892'] = action_detail_group71892Props,
      codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
      codeStates['enforcement_point'] = enforcement_pointe970a,
      codeStates['setenforcement_point'] = setenforcement_pointe970a,
      codeStates['command'] = commandf580f,
      codeStates['setcommand'] = setcommandf580f,
      codeStates['action_details_group'] = action_details_group8c83a,
      codeStates['setaction_details_group'] = setaction_details_group8c83a,
      codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
      codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
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
        "595c58db453a9b400de99534275953a0",
        "283964b9b6ea4aacb4e6e474138170a3"
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
      if (id === "revocation_btn170a3") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[revocation_btn170a3?.refresh])


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
    setaddrevocationreceipt_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,action_detail_group71892Props?.controls);
    setaction_detail_group71892(bindData4||{})
    setaction_detail_group71892Props({...action_detail_group71892Props,presetValues:{...(mainData||{})}})
    // clearHandler riseListen
    // for controller
    setaction_detail_group71892((pre:any)=>({...pre,[UOmapperData['0b8916e13342ed3ff20a77cdda2e970a']['source']]:"",['enforcement_pointe970a']:""}));
    // clearHandler riseListen
    // for controller
    setaction_detail_group71892((pre:any)=>({...pre,[UOmapperData['4f3c42c789434ec6b45969c9ec9f580f']['source']]:"",['commandf580f']:""}));
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,action_details_group8c83aProps?.controls);
    setaction_details_group8c83a(bindData10||{})
    setaction_details_group8c83aProps({...action_details_group8c83aProps,presetValues:{...(mainData||{})}})
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

 if (revocation_btn170a3?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:killSwitchActionList:AFVK:v1','killswitchactionlist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Add Revocation Receipt"
        variant="subheader-3"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addrevocationreceipt"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddrevocationreceiptpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {revocation_btn170a3?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Revocation")}
        </Button>}
      </div>
    
  )
}

export default Buttonrevocation_btn

