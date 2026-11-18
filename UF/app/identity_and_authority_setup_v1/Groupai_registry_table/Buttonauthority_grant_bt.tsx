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
import PageAuthoritygrantpage2 from '@/app/authoritygrant_v1/authoritygrant_v1page';
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
 

const Buttonauthority_grant_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_ai_asset_registry29963, setoverall_ai_asset_registry29963}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry29963Props, setoverall_ai_asset_registry29963Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupc1c9c, setai_registry_groupc1c9c}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupc1c9cProps, setai_registry_groupc1c9cProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupf3cfd, setai_registry_text_groupf3cfd}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupf3cfdProps, setai_registry_text_groupf3cfdProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table5bf51, setai_registry_table5bf51}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_table5bf51Props, setai_registry_table5bf51Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_ide345c, setai_asset_ide345c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code86cfd, setasset_code86cfd}= useContext(TotalContext) as TotalContextProps;
  const {asset_name9a125, setasset_name9a125}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code12cde, setasset_type_code12cde}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code82583, setrisk_tier_code82583}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name26cdd, setbusiness_unit_name26cdd}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_namec4d4e, setbusiness_owner_namec4d4e}= useContext(TotalContext) as TotalContextProps;
  const {technical_owner_name789b8, settechnical_owner_name789b8}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date12b03, settrs_created_date12b03}= useContext(TotalContext) as TotalContextProps;
  const {trs_tenant_id08378, settrs_tenant_id08378}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code9b028, setdiscovery_source_code9b028}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code6f1d0, setlifecycle_status_code6f1d0}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_btdc8de, settool_grant_btdc8de}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_bt175e0, setauthority_grant_bt175e0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_btab5f0, setservice_identity_btab5f0}= useContext(TotalContext) as TotalContextProps;
  const {authoritygrant_v1Props, setauthoritygrant_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5b, settool_grant_tabledbd5b}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5bProps, settool_grant_tabledbd5bProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0, setassets_group5eaf0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0Props, setassets_group5eaf0Props}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry29963,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry29963,
      codeStates['overall_ai_asset_registry29963'] = overall_ai_asset_registry29963Props,
      codeStates['setoverall_ai_asset_registry29963'] = setoverall_ai_asset_registry29963Props,
      codeStates['ai_registry_group'] = ai_registry_groupc1c9c,
      codeStates['setai_registry_group'] = setai_registry_groupc1c9c,
      codeStates['ai_registry_groupc1c9c'] = ai_registry_groupc1c9cProps,
      codeStates['setai_registry_groupc1c9c'] = setai_registry_groupc1c9cProps,
      codeStates['ai_registry_text_group'] = ai_registry_text_groupf3cfd,
      codeStates['setai_registry_text_group'] = setai_registry_text_groupf3cfd,
      codeStates['ai_registry_text_groupf3cfd'] = ai_registry_text_groupf3cfdProps,
      codeStates['setai_registry_text_groupf3cfd'] = setai_registry_text_groupf3cfdProps,
      codeStates['ai_registry_table'] = ai_registry_table5bf51,
      codeStates['setai_registry_table'] = setai_registry_table5bf51,
      codeStates['ai_registry_table5bf51'] = ai_registry_table5bf51Props,
      codeStates['setai_registry_table5bf51'] = setai_registry_table5bf51Props,
      codeStates['ai_asset_id'] = ai_asset_ide345c,
      codeStates['setai_asset_id'] = setai_asset_ide345c,
      codeStates['asset_code'] = asset_code86cfd,
      codeStates['setasset_code'] = setasset_code86cfd,
      codeStates['asset_name'] = asset_name9a125,
      codeStates['setasset_name'] = setasset_name9a125,
      codeStates['asset_type_code'] = asset_type_code12cde,
      codeStates['setasset_type_code'] = setasset_type_code12cde,
      codeStates['risk_tier_code'] = risk_tier_code82583,
      codeStates['setrisk_tier_code'] = setrisk_tier_code82583,
      codeStates['business_unit_name'] = business_unit_name26cdd,
      codeStates['setbusiness_unit_name'] = setbusiness_unit_name26cdd,
      codeStates['business_owner_name'] = business_owner_namec4d4e,
      codeStates['setbusiness_owner_name'] = setbusiness_owner_namec4d4e,
      codeStates['technical_owner_name'] = technical_owner_name789b8,
      codeStates['settechnical_owner_name'] = settechnical_owner_name789b8,
      codeStates['trs_created_date'] = trs_created_date12b03,
      codeStates['settrs_created_date'] = settrs_created_date12b03,
      codeStates['trs_tenant_id'] = trs_tenant_id08378,
      codeStates['settrs_tenant_id'] = settrs_tenant_id08378,
      codeStates['discovery_source_code'] = discovery_source_code9b028,
      codeStates['setdiscovery_source_code'] = setdiscovery_source_code9b028,
      codeStates['lifecycle_status_code'] = lifecycle_status_code6f1d0,
      codeStates['setlifecycle_status_code'] = setlifecycle_status_code6f1d0,
      codeStates['tool_grant_bt'] = tool_grant_btdc8de,
      codeStates['settool_grant_bt'] = settool_grant_btdc8de,
      codeStates['authority_grant_bt'] = authority_grant_bt175e0,
      codeStates['setauthority_grant_bt'] = setauthority_grant_bt175e0,
      codeStates['service_identity_bt'] = service_identity_btab5f0,
      codeStates['setservice_identity_bt'] = setservice_identity_btab5f0,
      codeStates['authoritygrant_v1'] = authoritygrant_v1Props,
      codeStates['setauthoritygrant_v1'] = setauthoritygrant_v1Props,
      codeStates['tool_grant_table'] = tool_grant_tabledbd5b,
      codeStates['settool_grant_table'] = settool_grant_tabledbd5b,
      codeStates['tool_grant_tabledbd5b'] = tool_grant_tabledbd5bProps,
      codeStates['settool_grant_tabledbd5b'] = settool_grant_tabledbd5bProps,
      codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
      codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
      codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
      codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
      codeStates['assets_group'] = assets_group5eaf0,
      codeStates['setassets_group'] = setassets_group5eaf0,
      codeStates['assets_group5eaf0'] = assets_group5eaf0Props,
      codeStates['setassets_group5eaf0'] = setassets_group5eaf0Props,
      codeStates['revocat_info_group'] = revocat_info_group2037f,
      codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
      codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
      codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
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
        "e886420737d63d98cf19dad635c5bf51",
        "7b83d5c92fb7a6e0cd258b094e1175e0"
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
      if (id === "authority_grant_bt175e0") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[authority_grant_bt175e0?.refresh])


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
    let filterProps2:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "6e50e09938834ce3bd0789f0d56b8f57",
        "object": {
          "properties.ai_asset_id": "42aaf35c90e22b36beed56126bbe345c"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setauthoritygrant_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,tool_grant_tabledbd5bProps?.controls);
    settool_grant_tabledbd5b(bindData4||{})
    settool_grant_tabledbd5bProps({...tool_grant_tabledbd5bProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,overall_auth_grant_grpba23fProps?.controls);
    setoverall_auth_grant_grpba23f(bindData6||{})
    setoverall_auth_grant_grpba23fProps({...overall_auth_grant_grpba23fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,assets_group5eaf0Props?.controls);
    setassets_group5eaf0(bindData8||{})
    setassets_group5eaf0Props({...assets_group5eaf0Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,revocat_info_group2037fProps?.controls);
    setrevocat_info_group2037f(bindData10||{})
    setrevocat_info_group2037fProps({...revocat_info_group2037fProps,presetValues:{...(mainData||{})}})
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

 if (authority_grant_bt175e0?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:identitySetup:AFVK:v1','identitysetup','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="authorityGrant"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "authoritygrant"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAuthoritygrantpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {authority_grant_bt175e0?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Authority Grant")}
        </Button>}
      </div>
    
  )
}

export default Buttonauthority_grant_bt

