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
import PageAddaimodelspage2 from '@/app/addaimodels_v1/addaimodels_v1page';
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

  const {overall_ai_data_class16ac0, setoverall_ai_data_class16ac0}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_data_class16ac0Props, setoverall_ai_data_class16ac0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bb, setai_dataclass_group790bb}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_group790bbProps, setai_dataclass_group790bbProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028b, setai_registry_text_groupd028b}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupd028bProps, setai_registry_text_groupd028bProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37dd, setai_dataclass_tabled37dd}= useContext(TotalContext) as TotalContextProps;
  const {ai_dataclass_tabled37ddProps, setai_dataclass_tabled37ddProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id3f4b8, setai_asset_id3f4b8}= useContext(TotalContext) as TotalContextProps;
  const {asset_name35f88, setasset_name35f88}= useContext(TotalContext) as TotalContextProps;
  const {asset_model_id8c2e4, setasset_model_id8c2e4}= useContext(TotalContext) as TotalContextProps;
  const {model_namecfc6c, setmodel_namecfc6c}= useContext(TotalContext) as TotalContextProps;
  const {model_version97b34, setmodel_version97b34}= useContext(TotalContext) as TotalContextProps;
  const {model_family_code06ae7, setmodel_family_code06ae7}= useContext(TotalContext) as TotalContextProps;
  const {model_providerccc4e, setmodel_providerccc4e}= useContext(TotalContext) as TotalContextProps;
  const {edit_bt11fef, setedit_bt11fef}= useContext(TotalContext) as TotalContextProps;
  const {delete_bt7b348, setdelete_bt7b348}= useContext(TotalContext) as TotalContextProps;
  const {addaimodels_v1Props, setaddaimodels_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_bt2a5c4, setupdate_bt2a5c4}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90, setdynamicactions16b90}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions16b90Props, setdynamicactions16b90Props}= useContext(TotalContext) as TotalContextProps;
  const {save_bt445a1, setsave_bt445a1}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215, setoverall_ai_asset_registry61215}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry61215Props, setoverall_ai_asset_registry61215Props}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724, setregister_ai_asset_group1b724}= useContext(TotalContext) as TotalContextProps;
  const {register_ai_asset_group1b724Props, setregister_ai_asset_group1b724Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fc, setmodel_info_group905fc}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group905fcProps, setmodel_info_group905fcProps}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86, setgrounding_group4df86}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group4df86Props, setgrounding_group4df86Props}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82, setvalidation_group50e82}= useContext(TotalContext) as TotalContextProps;
  const {validation_group50e82Props, setvalidation_group50e82Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_data_class'] = overall_ai_data_class16ac0,
      codeStates['setoverall_ai_data_class'] = setoverall_ai_data_class16ac0,
      codeStates['overall_ai_data_class16ac0'] = overall_ai_data_class16ac0Props,
      codeStates['setoverall_ai_data_class16ac0'] = setoverall_ai_data_class16ac0Props,
      codeStates['ai_dataclass_group'] = ai_dataclass_group790bb,
      codeStates['setai_dataclass_group'] = setai_dataclass_group790bb,
      codeStates['ai_dataclass_group790bb'] = ai_dataclass_group790bbProps,
      codeStates['setai_dataclass_group790bb'] = setai_dataclass_group790bbProps,
      codeStates['ai_registry_text_group'] = ai_registry_text_groupd028b,
      codeStates['setai_registry_text_group'] = setai_registry_text_groupd028b,
      codeStates['ai_registry_text_groupd028b'] = ai_registry_text_groupd028bProps,
      codeStates['setai_registry_text_groupd028b'] = setai_registry_text_groupd028bProps,
      codeStates['ai_dataclass_table'] = ai_dataclass_tabled37dd,
      codeStates['setai_dataclass_table'] = setai_dataclass_tabled37dd,
      codeStates['ai_dataclass_tabled37dd'] = ai_dataclass_tabled37ddProps,
      codeStates['setai_dataclass_tabled37dd'] = setai_dataclass_tabled37ddProps,
      codeStates['ai_asset_id'] = ai_asset_id3f4b8,
      codeStates['setai_asset_id'] = setai_asset_id3f4b8,
      codeStates['asset_name'] = asset_name35f88,
      codeStates['setasset_name'] = setasset_name35f88,
      codeStates['asset_model_id'] = asset_model_id8c2e4,
      codeStates['setasset_model_id'] = setasset_model_id8c2e4,
      codeStates['model_name'] = model_namecfc6c,
      codeStates['setmodel_name'] = setmodel_namecfc6c,
      codeStates['model_version'] = model_version97b34,
      codeStates['setmodel_version'] = setmodel_version97b34,
      codeStates['model_family_code'] = model_family_code06ae7,
      codeStates['setmodel_family_code'] = setmodel_family_code06ae7,
      codeStates['model_provider'] = model_providerccc4e,
      codeStates['setmodel_provider'] = setmodel_providerccc4e,
      codeStates['edit_bt'] = edit_bt11fef,
      codeStates['setedit_bt'] = setedit_bt11fef,
      codeStates['delete_bt'] = delete_bt7b348,
      codeStates['setdelete_bt'] = setdelete_bt7b348,
      codeStates['addaimodels_v1'] = addaimodels_v1Props,
      codeStates['setaddaimodels_v1'] = setaddaimodels_v1Props,
      codeStates['update_bt'] = update_bt2a5c4,
      codeStates['setupdate_bt'] = setupdate_bt2a5c4,
      codeStates['dynamicactions'] = dynamicactions16b90,
      codeStates['setdynamicactions'] = setdynamicactions16b90,
      codeStates['dynamicactions16b90'] = dynamicactions16b90Props,
      codeStates['setdynamicactions16b90'] = setdynamicactions16b90Props,
      codeStates['save_bt'] = save_bt445a1,
      codeStates['setsave_bt'] = setsave_bt445a1,
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry61215,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry61215,
      codeStates['overall_ai_asset_registry61215'] = overall_ai_asset_registry61215Props,
      codeStates['setoverall_ai_asset_registry61215'] = setoverall_ai_asset_registry61215Props,
      codeStates['register_ai_asset_group'] = register_ai_asset_group1b724,
      codeStates['setregister_ai_asset_group'] = setregister_ai_asset_group1b724,
      codeStates['register_ai_asset_group1b724'] = register_ai_asset_group1b724Props,
      codeStates['setregister_ai_asset_group1b724'] = setregister_ai_asset_group1b724Props,
      codeStates['model_info_group'] = model_info_group905fc,
      codeStates['setmodel_info_group'] = setmodel_info_group905fc,
      codeStates['model_info_group905fc'] = model_info_group905fcProps,
      codeStates['setmodel_info_group905fc'] = setmodel_info_group905fcProps,
      codeStates['grounding_group'] = grounding_group4df86,
      codeStates['setgrounding_group'] = setgrounding_group4df86,
      codeStates['grounding_group4df86'] = grounding_group4df86Props,
      codeStates['setgrounding_group4df86'] = setgrounding_group4df86Props,
      codeStates['validation_group'] = validation_group50e82,
      codeStates['setvalidation_group'] = setvalidation_group50e82,
      codeStates['validation_group50e82'] = validation_group50e82Props,
      codeStates['setvalidation_group50e82'] = setvalidation_group50e82Props,
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
        "fce76b7c8cb3746f1eb713e9fafd37dd",
        "8977787cd1cef8bf003a38a7d1311fef"
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
      if (id === "edit_bt11fef") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_bt11fef?.refresh])


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
    setaddaimodels_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //enableElement
    setupdate_bt2a5c4((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_bt445a1((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,overall_ai_asset_registry61215Props?.controls);
    setoverall_ai_asset_registry61215(bindData8||{})
    setoverall_ai_asset_registry61215Props({...overall_ai_asset_registry61215Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,register_ai_asset_group1b724Props?.controls);
    setregister_ai_asset_group1b724(bindData10||{})
    setregister_ai_asset_group1b724Props({...register_ai_asset_group1b724Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,model_info_group905fcProps?.controls);
    setmodel_info_group905fc(bindData12||{})
    setmodel_info_group905fcProps({...model_info_group905fcProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,grounding_group4df86Props?.controls);
    setgrounding_group4df86(bindData14||{})
    setgrounding_group4df86Props({...grounding_group4df86Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,validation_group50e82Props?.controls);
    setvalidation_group50e82(bindData16||{})
    setvalidation_group50e82Props({...validation_group50e82Props,presetValues:{...(mainData||{})}})
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

 if (edit_bt11fef?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIModelDetails:AFVK:v1','aimodeldetails','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Model"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addaimodels"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddaimodelspage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_bt11fef?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_bt

