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
import PageAgentcertificatespage6 from '@/app/agentcertificates_v1/agentcertificates_v1page';
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
 

const Buttoncertificate_stages_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_groupedc31, setoverall_groupedc31}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupedc31Props, setoverall_groupedc31Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0, setai_asset_version_table_groupc80e0}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupc80e0Props, setai_asset_version_table_groupc80e0Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941, setcertificate_tableaa941}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tableaa941Props, setcertificate_tableaa941Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_version_id74d58, setasset_version_id74d58}= useContext(TotalContext) as TotalContextProps;
  const {asset_code42c4f, setasset_code42c4f}= useContext(TotalContext) as TotalContextProps;
  const {asset_name527a0, setasset_name527a0}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code42ada, setasset_type_code42ada}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code78b3a, setrisk_tier_code78b3a}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name76651, setbusiness_unit_name76651}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_name7cdf2, setbusiness_owner_name7cdf2}= useContext(TotalContext) as TotalContextProps;
  const {certificate_stages_btnf28b5, setcertificate_stages_btnf28b5}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_coded16a4, setdiscovery_source_coded16a4}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_codeddfc4, setlifecycle_status_codeddfc4}= useContext(TotalContext) as TotalContextProps;
  const {groupf74cc, setgroupf74cc}= useContext(TotalContext) as TotalContextProps;
  const {groupf74ccProps, setgroupf74ccProps}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32ae, setcertificate_tablea32ae}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32aeProps, setcertificate_tablea32aeProps}= useContext(TotalContext) as TotalContextProps;
  const {agentcertificates_v1Props, setagentcertificates_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_groupedc31,
      codeStates['setoverall_group'] = setoverall_groupedc31,
      codeStates['overall_groupedc31'] = overall_groupedc31Props,
      codeStates['setoverall_groupedc31'] = setoverall_groupedc31Props,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupc80e0,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupc80e0,
      codeStates['ai_asset_version_table_groupc80e0'] = ai_asset_version_table_groupc80e0Props,
      codeStates['setai_asset_version_table_groupc80e0'] = setai_asset_version_table_groupc80e0Props,
      codeStates['certificate_table'] = certificate_tableaa941,
      codeStates['setcertificate_table'] = setcertificate_tableaa941,
      codeStates['certificate_tableaa941'] = certificate_tableaa941Props,
      codeStates['setcertificate_tableaa941'] = setcertificate_tableaa941Props,
      codeStates['asset_version_id'] = asset_version_id74d58,
      codeStates['setasset_version_id'] = setasset_version_id74d58,
      codeStates['asset_code'] = asset_code42c4f,
      codeStates['setasset_code'] = setasset_code42c4f,
      codeStates['asset_name'] = asset_name527a0,
      codeStates['setasset_name'] = setasset_name527a0,
      codeStates['asset_type_code'] = asset_type_code42ada,
      codeStates['setasset_type_code'] = setasset_type_code42ada,
      codeStates['risk_tier_code'] = risk_tier_code78b3a,
      codeStates['setrisk_tier_code'] = setrisk_tier_code78b3a,
      codeStates['business_unit_name'] = business_unit_name76651,
      codeStates['setbusiness_unit_name'] = setbusiness_unit_name76651,
      codeStates['business_owner_name'] = business_owner_name7cdf2,
      codeStates['setbusiness_owner_name'] = setbusiness_owner_name7cdf2,
      codeStates['certificate_stages_btn'] = certificate_stages_btnf28b5,
      codeStates['setcertificate_stages_btn'] = setcertificate_stages_btnf28b5,
      codeStates['discovery_source_code'] = discovery_source_coded16a4,
      codeStates['setdiscovery_source_code'] = setdiscovery_source_coded16a4,
      codeStates['lifecycle_status_code'] = lifecycle_status_codeddfc4,
      codeStates['setlifecycle_status_code'] = setlifecycle_status_codeddfc4,
      codeStates['group'] = groupf74cc,
      codeStates['setgroup'] = setgroupf74cc,
      codeStates['groupf74cc'] = groupf74ccProps,
      codeStates['setgroupf74cc'] = setgroupf74ccProps,
      codeStates['certificate_table'] = certificate_tablea32ae,
      codeStates['setcertificate_table'] = setcertificate_tablea32ae,
      codeStates['certificate_tablea32ae'] = certificate_tablea32aeProps,
      codeStates['setcertificate_tablea32ae'] = setcertificate_tablea32aeProps,
      codeStates['agentcertificates_v1'] = agentcertificates_v1Props,
      codeStates['setagentcertificates_v1'] = setagentcertificates_v1Props,
      codeStates['model_info_group'] = model_info_group425e9,
      codeStates['setmodel_info_group'] = setmodel_info_group425e9,
      codeStates['model_info_group425e9'] = model_info_group425e9Props,
      codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
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
        "2178aeed8e5be8124bb2f196f35aa941",
        "ba0d7950ae98ea3f94b1fd6f8d8f28b5"
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
      if (id === "certificate_stages_btnf28b5") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
  },[certificate_stages_btnf28b5?.refresh])


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
    let bindData2 = filterByKeys(mainData,groupf74ccProps?.controls);
    setgroupf74cc(bindData2||{})
    setgroupf74ccProps({...groupf74ccProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,certificate_tablea32aeProps?.controls);
    setcertificate_tablea32ae(bindData4||{})
    setcertificate_tablea32aeProps({...certificate_tablea32aeProps,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps6:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:agentCertificateTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "0b7acec48525b5006b6645962e2dfe0f",
        "object": {
          "properties.ai_asset_id": "7fdd941d50bd696ed4bcc607a4e74d58"
        }
      }
    ]
  }
];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setagentcertificates_v1Props([...filterData6 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen6(true);
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,model_info_group425e9Props?.controls);
    setmodel_info_group425e9(bindData8||{})
    setmodel_info_group425e9Props({...model_info_group425e9Props,presetValues:{...(mainData||{})}})
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

 if (certificate_stages_btnf28b5?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certification:AFVK:v1','certification','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen6} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Asset - Certificates"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "agentcertificates"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAgentcertificatespage6  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {certificate_stages_btnf28b5?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Certificates")}
        </Button>}
      </div>
    
  )
}

export default Buttoncertificate_stages_btn

