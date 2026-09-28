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
import PageDeleteintegrationsourcepage5 from '@/app/deleteintegrationsource_v1/deleteintegrationsource_v1page';
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
  const [showProfileAsModalOpen5, setShowProfileAsModalOpen5] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_ai_asset_registry0f921, setoverall_ai_asset_registry0f921}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry0f921Props, setoverall_ai_asset_registry0f921Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_groupdc7c7, setintegration_groupdc7c7}= useContext(TotalContext) as TotalContextProps;
  const {integration_groupdc7c7Props, setintegration_groupdc7c7Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5, setintegration_source1fae5}= useContext(TotalContext) as TotalContextProps;
  const {integration_source1fae5Props, setintegration_source1fae5Props}= useContext(TotalContext) as TotalContextProps;
  const {integration_source_id1c758, setintegration_source_id1c758}= useContext(TotalContext) as TotalContextProps;
  const {source_codedb33c, setsource_codedb33c}= useContext(TotalContext) as TotalContextProps;
  const {source_name66c25, setsource_name66c25}= useContext(TotalContext) as TotalContextProps;
  const {source_category_code45f6b, setsource_category_code45f6b}= useContext(TotalContext) as TotalContextProps;
  const {connector_type_code2f1c8, setconnector_type_code2f1c8}= useContext(TotalContext) as TotalContextProps;
  const {auth_method_codeea17b, setauth_method_codeea17b}= useContext(TotalContext) as TotalContextProps;
  const {last_run_at01576, setlast_run_at01576}= useContext(TotalContext) as TotalContextProps;
  const {view_btn345d8, setview_btn345d8}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd114a, setedit_btnd114a}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnc6dc1, setdelete_btnc6dc1}= useContext(TotalContext) as TotalContextProps;
  const {last_run_statusb04da, setlast_run_statusb04da}= useContext(TotalContext) as TotalContextProps;
  const {group79c03, setgroup79c03}= useContext(TotalContext) as TotalContextProps;
  const {group79c03Props, setgroup79c03Props}= useContext(TotalContext) as TotalContextProps;
  const {deleteintegrationsource_v1Props, setdeleteintegrationsource_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry0f921,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry0f921,
      codeStates['overall_ai_asset_registry0f921'] = overall_ai_asset_registry0f921Props,
      codeStates['setoverall_ai_asset_registry0f921'] = setoverall_ai_asset_registry0f921Props,
      codeStates['integration_group'] = integration_groupdc7c7,
      codeStates['setintegration_group'] = setintegration_groupdc7c7,
      codeStates['integration_groupdc7c7'] = integration_groupdc7c7Props,
      codeStates['setintegration_groupdc7c7'] = setintegration_groupdc7c7Props,
      codeStates['integration_source'] = integration_source1fae5,
      codeStates['setintegration_source'] = setintegration_source1fae5,
      codeStates['integration_source1fae5'] = integration_source1fae5Props,
      codeStates['setintegration_source1fae5'] = setintegration_source1fae5Props,
      codeStates['integration_source_id'] = integration_source_id1c758,
      codeStates['setintegration_source_id'] = setintegration_source_id1c758,
      codeStates['source_code'] = source_codedb33c,
      codeStates['setsource_code'] = setsource_codedb33c,
      codeStates['source_name'] = source_name66c25,
      codeStates['setsource_name'] = setsource_name66c25,
      codeStates['source_category_code'] = source_category_code45f6b,
      codeStates['setsource_category_code'] = setsource_category_code45f6b,
      codeStates['connector_type_code'] = connector_type_code2f1c8,
      codeStates['setconnector_type_code'] = setconnector_type_code2f1c8,
      codeStates['auth_method_code'] = auth_method_codeea17b,
      codeStates['setauth_method_code'] = setauth_method_codeea17b,
      codeStates['last_run_at'] = last_run_at01576,
      codeStates['setlast_run_at'] = setlast_run_at01576,
      codeStates['view_btn'] = view_btn345d8,
      codeStates['setview_btn'] = setview_btn345d8,
      codeStates['edit_btn'] = edit_btnd114a,
      codeStates['setedit_btn'] = setedit_btnd114a,
      codeStates['delete_btn'] = delete_btnc6dc1,
      codeStates['setdelete_btn'] = setdelete_btnc6dc1,
      codeStates['last_run_status'] = last_run_statusb04da,
      codeStates['setlast_run_status'] = setlast_run_statusb04da,
      codeStates['group'] = group79c03,
      codeStates['setgroup'] = setgroup79c03,
      codeStates['group79c03'] = group79c03Props,
      codeStates['setgroup79c03'] = setgroup79c03Props,
      codeStates['deleteintegrationsource_v1'] = deleteintegrationsource_v1Props,
      codeStates['setdeleteintegrationsource_v1'] = setdeleteintegrationsource_v1Props,
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
        "a696d81507e88f293fe369b29901fae5",
        "6006435573d3f1426bbcea9e7c7c6dc1"
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
      if (id === "delete_btnc6dc1") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen5(false)
  },[delete_btnc6dc1?.refresh])


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
    setgroup79c03(mainData||{})
    setgroup79c03Props({...group79c03Props,presetValues:{...(mainData||{})}})
    // closeHandler
    eventBus.emit('closeModal', 'integrationsource');
    // showArtifactAsModal
    let filterProps5:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1",
    "nodeBasedData": []
  }
];
    let filterData5 = await getFilterProps(filterProps5,mainData);
    setdeleteintegrationsource_v1Props([...filterData5 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen5(true);
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

 if (delete_btnc6dc1?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:integrationSource:AFVK:v1','integrationsource','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen5} 
        onClose={() => {
          setShowProfileAsModalOpen5(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "deleteintegrationsource"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageDeleteintegrationsourcepage5  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {delete_btnc6dc1?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

