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
 

const Buttonversions_bt = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_ai_asset_registry24714, setoverall_ai_asset_registry24714}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry24714Props, setoverall_ai_asset_registry24714Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8, setai_registry_group15bd8}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_group15bd8Props, setai_registry_group15bd8Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565, setai_registry_text_groupc3565}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_groupc3565Props, setai_registry_text_groupc3565Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3, setai_registry_tablec54a3}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tablec54a3Props, setai_registry_tablec54a3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_id9e2a6, setai_asset_id9e2a6}= useContext(TotalContext) as TotalContextProps;
  const {asset_named5e53, setasset_named5e53}= useContext(TotalContext) as TotalContextProps;
  const {asset_code9a242, setasset_code9a242}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code743b5, setasset_type_code743b5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_coded1d3a, setrisk_tier_coded1d3a}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name28b82, setbusiness_unit_name28b82}= useContext(TotalContext) as TotalContextProps;
  const {business_owner_name6f253, setbusiness_owner_name6f253}= useContext(TotalContext) as TotalContextProps;
  const {cert_expiry_date63ebc, setcert_expiry_date63ebc}= useContext(TotalContext) as TotalContextProps;
  const {discovery_source_code5e1a8, setdiscovery_source_code5e1a8}= useContext(TotalContext) as TotalContextProps;
  const {lifecycle_status_code06a86, setlifecycle_status_code06a86}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_data_class_bt1c904, setai_asset_data_class_bt1c904}= useContext(TotalContext) as TotalContextProps;
  const {model_detail_btd72a3, setmodel_detail_btd72a3}= useContext(TotalContext) as TotalContextProps;
  const {agent_controls_bt114cc, setagent_controls_bt114cc}= useContext(TotalContext) as TotalContextProps;
  const {versions_bt48f20, setversions_bt48f20}= useContext(TotalContext) as TotalContextProps;
  const {dependencies_bt70ebd, setdependencies_bt70ebd}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry24714,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry24714,
      codeStates['overall_ai_asset_registry24714'] = overall_ai_asset_registry24714Props,
      codeStates['setoverall_ai_asset_registry24714'] = setoverall_ai_asset_registry24714Props,
      codeStates['ai_registry_group'] = ai_registry_group15bd8,
      codeStates['setai_registry_group'] = setai_registry_group15bd8,
      codeStates['ai_registry_group15bd8'] = ai_registry_group15bd8Props,
      codeStates['setai_registry_group15bd8'] = setai_registry_group15bd8Props,
      codeStates['ai_registry_text_group'] = ai_registry_text_groupc3565,
      codeStates['setai_registry_text_group'] = setai_registry_text_groupc3565,
      codeStates['ai_registry_text_groupc3565'] = ai_registry_text_groupc3565Props,
      codeStates['setai_registry_text_groupc3565'] = setai_registry_text_groupc3565Props,
      codeStates['ai_registry_table'] = ai_registry_tablec54a3,
      codeStates['setai_registry_table'] = setai_registry_tablec54a3,
      codeStates['ai_registry_tablec54a3'] = ai_registry_tablec54a3Props,
      codeStates['setai_registry_tablec54a3'] = setai_registry_tablec54a3Props,
      codeStates['ai_asset_id'] = ai_asset_id9e2a6,
      codeStates['setai_asset_id'] = setai_asset_id9e2a6,
      codeStates['asset_name'] = asset_named5e53,
      codeStates['setasset_name'] = setasset_named5e53,
      codeStates['asset_code'] = asset_code9a242,
      codeStates['setasset_code'] = setasset_code9a242,
      codeStates['asset_type_code'] = asset_type_code743b5,
      codeStates['setasset_type_code'] = setasset_type_code743b5,
      codeStates['risk_tier_code'] = risk_tier_coded1d3a,
      codeStates['setrisk_tier_code'] = setrisk_tier_coded1d3a,
      codeStates['business_unit_name'] = business_unit_name28b82,
      codeStates['setbusiness_unit_name'] = setbusiness_unit_name28b82,
      codeStates['business_owner_name'] = business_owner_name6f253,
      codeStates['setbusiness_owner_name'] = setbusiness_owner_name6f253,
      codeStates['cert_expiry_date'] = cert_expiry_date63ebc,
      codeStates['setcert_expiry_date'] = setcert_expiry_date63ebc,
      codeStates['discovery_source_code'] = discovery_source_code5e1a8,
      codeStates['setdiscovery_source_code'] = setdiscovery_source_code5e1a8,
      codeStates['lifecycle_status_code'] = lifecycle_status_code06a86,
      codeStates['setlifecycle_status_code'] = setlifecycle_status_code06a86,
      codeStates['ai_asset_data_class_bt'] = ai_asset_data_class_bt1c904,
      codeStates['setai_asset_data_class_bt'] = setai_asset_data_class_bt1c904,
      codeStates['model_detail_bt'] = model_detail_btd72a3,
      codeStates['setmodel_detail_bt'] = setmodel_detail_btd72a3,
      codeStates['agent_controls_bt'] = agent_controls_bt114cc,
      codeStates['setagent_controls_bt'] = setagent_controls_bt114cc,
      codeStates['versions_bt'] = versions_bt48f20,
      codeStates['setversions_bt'] = setversions_bt48f20,
      codeStates['dependencies_bt'] = dependencies_bt70ebd,
      codeStates['setdependencies_bt'] = setdependencies_bt70ebd,
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
        "c073f1886ebd444da9d52548eddc54a3",
        "b79ade6b80254a0086cdcee39da48f20"
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
      if (id === "versions_bt48f20") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[versions_bt48f20?.refresh])


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
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }
  const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }

 if (versions_bt48f20?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:AIRegistry:AFVK:v1','airegistry','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {versions_bt48f20?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Version")}
        </Button>}
      </div>
    
  )
}

export default Buttonversions_bt

