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
import PageAidataclasspage6 from '@/app/aidataclass_v1/aidataclass_v1page';
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
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_ai_data_class7e3b7, setoverall_ai_data_class7e3b7}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class7e3b7Props, setoverall_ai_data_class7e3b7Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854, setai_dataclass_group81854}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group81854Props, setai_dataclass_group81854Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68, setai_registry_text_group57c68}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group57c68Props, setai_registry_text_group57c68Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39c, setai_dataclass_tabledf39c}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabledf39cProps, setai_dataclass_tabledf39cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id1bcd7, setai_asset_id1bcd7}= useContext(TotalContext) as TotalContextProps;
  const {asset_name1380a, setasset_name1380a}= useContext(TotalContext) as TotalContextProps;
  const {asset_data_class_ida0858, setasset_data_class_ida0858}= useContext(TotalContext) as TotalContextProps;
  const {data_class_code213e9, setdata_class_code213e9}= useContext(TotalContext) as TotalContextProps;
  const {is_primaryeda2a, setis_primaryeda2a}= useContext(TotalContext) as TotalContextProps;
  const {notes6537d, setnotes6537d}= useContext(TotalContext) as TotalContextProps;
  const {edit_btc0562, setedit_btc0562}= useContext(TotalContext) as TotalContextProps;
  const {delete_bt1aa61, setdelete_bt1aa61}= useContext(TotalContext) as TotalContextProps;
  const {update_bt845af, setupdate_bt845af}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938, setdynamicactions92938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions92938Props, setdynamicactions92938Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btd6946, setsave_btd6946}= useContext(TotalContext) as TotalContextProps;
  const {aidataclass_v1Props, setaidataclass_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421, setasset_identity_groupfe421}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_groupfe421Props, setasset_identity_groupfe421Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_data_class'] = overall_ai_data_class7e3b7,
      codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class7e3b7,
      codeStates['overall_ai_data_class7e3b7'] = overall_ai_data_class7e3b7Props,
      codeStates['setoverall_ai_data_class7e3b7'] = setoverall_ai_data_class7e3b7Props,
      codeStates['ai_dataclass_group'] = ai_dataclass_group81854,
      codeStates['setai_dataclass_group'] = setai_dataclass_group81854,
      codeStates['ai_dataclass_group81854'] = ai_dataclass_group81854Props,
      codeStates['setai_dataclass_group81854'] = setai_dataclass_group81854Props,
      codeStates['ai_registry_text_group'] = ai_registry_text_group57c68,
      codeStates['setai_registry_text_group'] = setai_registry_text_group57c68,
      codeStates['ai_registry_text_group57c68'] = ai_registry_text_group57c68Props,
      codeStates['setai_registry_text_group57c68'] = setai_registry_text_group57c68Props,
      codeStates['ai_dataclass_table'] = ai_dataclass_tabledf39c,
      codeStates['setai_dataclass_table'] = setai_dataclass_tabledf39c,
      codeStates['ai_dataclass_tabledf39c'] = ai_dataclass_tabledf39cProps,
      codeStates['setai_dataclass_tabledf39c'] = setai_dataclass_tabledf39cProps,
      codeStates['ai_asset_id'] = ai_asset_id1bcd7,
      codeStates['setai_asset_id'] = setai_asset_id1bcd7,
      codeStates['asset_name'] = asset_name1380a,
      codeStates['setasset_name'] = setasset_name1380a,
      codeStates['asset_data_class_id'] = asset_data_class_ida0858,
      codeStates['setasset_data_class_id'] = setasset_data_class_ida0858,
      codeStates['data_class_code'] = data_class_code213e9,
      codeStates['setdata_class_code'] = setdata_class_code213e9,
      codeStates['is_primary'] = is_primaryeda2a,
      codeStates['setis_primary'] = setis_primaryeda2a,
      codeStates['notes'] = notes6537d,
      codeStates['setnotes'] = setnotes6537d,
      codeStates['edit_bt'] = edit_btc0562,
      codeStates['setedit_bt'] = setedit_btc0562,
      codeStates['delete_bt'] = delete_bt1aa61,
      codeStates['setdelete_bt'] = setdelete_bt1aa61,
      codeStates['update_bt'] = update_bt845af,
      codeStates['setupdate_bt'] = setupdate_bt845af,
      codeStates['dynamicactions'] = dynamicactions92938,
      codeStates['setdynamicactions'] = setdynamicactions92938,
      codeStates['dynamicactions92938'] = dynamicactions92938Props,
      codeStates['setdynamicactions92938'] = setdynamicactions92938Props,
      codeStates['save_bt'] = save_btd6946,
      codeStates['setsave_bt'] = setsave_btd6946,
      codeStates['aidataclass_v1'] = aidataclass_v1Props,
      codeStates['setaidataclass_v1'] = setaidataclass_v1Props,
      codeStates['asset_identity_group'] = asset_identity_groupfe421,
      codeStates['setasset_identity_group'] = setasset_identity_groupfe421,
      codeStates['asset_identity_groupfe421'] = asset_identity_groupfe421Props,
      codeStates['setasset_identity_groupfe421'] = setasset_identity_groupfe421Props,
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
        "750c090ad61dd201ef10624ca73df39c",
        "9afae696675348d4b39ddf181acc0562"
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
      if (id === "edit_btc0562") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
  },[edit_btc0562?.refresh])


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
    setupdate_bt845af((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_btd6946((prev: any) => ({ ...prev, isDisabled: true }));
    // showArtifactAsModal
    let filterProps6:any =  [];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setaidataclass_v1Props([...filterData6 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen6(true);
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,asset_identity_groupfe421Props?.controls);
    setasset_identity_groupfe421(bindData8||{})
    setasset_identity_groupfe421Props({...asset_identity_groupfe421Props,presetValues:{...(mainData||{})}})
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

 if (edit_btc0562?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIDataClassList:AFVK:v1','aidataclasslist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen6} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Data Class"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "aidataclass"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageAidataclasspage6  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btc0562?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_bt

