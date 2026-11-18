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
import PageAddserviceidentitypage10 from '@/app/addserviceidentity_v1/addserviceidentity_v1page';
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
  const [showProfileAsModalOpen10, setShowProfileAsModalOpen10] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_group56939, setoverall_group56939}= useContext(TotalContext) as TotalContextProps;
  const {overall_group56939Props, setoverall_group56939Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5adee, setai_asset_dependency_group5adee}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5adeeProps, setai_asset_dependency_group5adeeProps}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_tableff4a5, setservice_identity_tableff4a5}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_tableff4a5Props, setservice_identity_tableff4a5Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_id5366e, setidentity_id5366e}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec3f43, setasset_namec3f43}= useContext(TotalContext) as TotalContextProps;
  const {principal_id9e0d3, setprincipal_id9e0d3}= useContext(TotalContext) as TotalContextProps;
  const {principal_typebbe1e, setprincipal_typebbe1e}= useContext(TotalContext) as TotalContextProps;
  const {identity_providerff76d, setidentity_providerff76d}= useContext(TotalContext) as TotalContextProps;
  const {last_access_review_at63d3c, setlast_access_review_at63d3c}= useContext(TotalContext) as TotalContextProps;
  const {statusee5ce, setstatusee5ce}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnf36c2, setedit_btnf36c2}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnbb7db, setdelete_btnbb7db}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912, setinfo_group9d912}= useContext(TotalContext) as TotalContextProps;
  const {info_group9d912Props, setinfo_group9d912Props}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728, setgroupe6728}= useContext(TotalContext) as TotalContextProps;
  const {groupe6728Props, setgroupe6728Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53e, setrule_config_groupa7e53e}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa7e53eProps, setrule_config_groupa7e53eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282, setrule_config_group98282}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_group98282Props, setrule_config_group98282Props}= useContext(TotalContext) as TotalContextProps;
  const {addserviceidentity_v1Props, setaddserviceidentity_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btn6ff8e, setupdate_btn6ff8e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796b, setdynamicactions5796b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions5796bProps, setdynamicactions5796bProps}= useContext(TotalContext) as TotalContextProps;
  const {save_btnc97f8, setsave_btnc97f8}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group56939,
      codeStates['setoverall_group'] = setoverall_group56939,
      codeStates['overall_group56939'] = overall_group56939Props,
      codeStates['setoverall_group56939'] = setoverall_group56939Props,
      codeStates['ai_asset_dependency_group'] = ai_asset_dependency_group5adee,
      codeStates['setai_asset_dependency_group'] = setai_asset_dependency_group5adee,
      codeStates['ai_asset_dependency_group5adee'] = ai_asset_dependency_group5adeeProps,
      codeStates['setai_asset_dependency_group5adee'] = setai_asset_dependency_group5adeeProps,
      codeStates['service_identity_table'] = service_identity_tableff4a5,
      codeStates['setservice_identity_table'] = setservice_identity_tableff4a5,
      codeStates['service_identity_tableff4a5'] = service_identity_tableff4a5Props,
      codeStates['setservice_identity_tableff4a5'] = setservice_identity_tableff4a5Props,
      codeStates['identity_id'] = identity_id5366e,
      codeStates['setidentity_id'] = setidentity_id5366e,
      codeStates['asset_name'] = asset_namec3f43,
      codeStates['setasset_name'] = setasset_namec3f43,
      codeStates['principal_id'] = principal_id9e0d3,
      codeStates['setprincipal_id'] = setprincipal_id9e0d3,
      codeStates['principal_type'] = principal_typebbe1e,
      codeStates['setprincipal_type'] = setprincipal_typebbe1e,
      codeStates['identity_provider'] = identity_providerff76d,
      codeStates['setidentity_provider'] = setidentity_providerff76d,
      codeStates['last_access_review_at'] = last_access_review_at63d3c,
      codeStates['setlast_access_review_at'] = setlast_access_review_at63d3c,
      codeStates['status'] = statusee5ce,
      codeStates['setstatus'] = setstatusee5ce,
      codeStates['edit_btn'] = edit_btnf36c2,
      codeStates['setedit_btn'] = setedit_btnf36c2,
      codeStates['delete_btn'] = delete_btnbb7db,
      codeStates['setdelete_btn'] = setdelete_btnbb7db,
      codeStates['info_group'] = info_group9d912,
      codeStates['setinfo_group'] = setinfo_group9d912,
      codeStates['info_group9d912'] = info_group9d912Props,
      codeStates['setinfo_group9d912'] = setinfo_group9d912Props,
      codeStates['group'] = groupe6728,
      codeStates['setgroup'] = setgroupe6728,
      codeStates['groupe6728'] = groupe6728Props,
      codeStates['setgroupe6728'] = setgroupe6728Props,
      codeStates['rule_config_groupa'] = rule_config_groupa7e53e,
      codeStates['setrule_config_groupa'] = setrule_config_groupa7e53e,
      codeStates['rule_config_groupa7e53e'] = rule_config_groupa7e53eProps,
      codeStates['setrule_config_groupa7e53e'] = setrule_config_groupa7e53eProps,
      codeStates['rule_config_group'] = rule_config_group98282,
      codeStates['setrule_config_group'] = setrule_config_group98282,
      codeStates['rule_config_group98282'] = rule_config_group98282Props,
      codeStates['setrule_config_group98282'] = setrule_config_group98282Props,
      codeStates['addserviceidentity_v1'] = addserviceidentity_v1Props,
      codeStates['setaddserviceidentity_v1'] = setaddserviceidentity_v1Props,
      codeStates['update_btn'] = update_btn6ff8e,
      codeStates['setupdate_btn'] = setupdate_btn6ff8e,
      codeStates['dynamicactions'] = dynamicactions5796b,
      codeStates['setdynamicactions'] = setdynamicactions5796b,
      codeStates['dynamicactions5796b'] = dynamicactions5796bProps,
      codeStates['setdynamicactions5796b'] = setdynamicactions5796bProps,
      codeStates['save_btn'] = save_btnc97f8,
      codeStates['setsave_btn'] = setsave_btnc97f8,
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
        "6617aca6c56e513e89e6a741927ff4a5",
        "ab8b51214f7a13795f054dc9bc2f36c2"
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
      if (id === "edit_btnf36c2") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen10(false)
  },[edit_btnf36c2?.refresh])


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
    let bindData2 = filterByKeys(mainData,info_group9d912Props?.controls);
    setinfo_group9d912(bindData2||{})
    setinfo_group9d912Props({...info_group9d912Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,groupe6728Props?.controls);
    setgroupe6728(bindData4||{})
    setgroupe6728Props({...groupe6728Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,rule_config_groupa7e53eProps?.controls);
    setrule_config_groupa7e53e(bindData6||{})
    setrule_config_groupa7e53eProps({...rule_config_groupa7e53eProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,rule_config_group98282Props?.controls);
    setrule_config_group98282(bindData8||{})
    setrule_config_group98282Props({...rule_config_group98282Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps10:any =  [];
    let filterData10 = await getFilterProps(filterProps10,mainData);
    setaddserviceidentity_v1Props([...filterData10 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen10(true);
    //enableElement
    setupdate_btn6ff8e((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_btnc97f8((prev: any) => ({ ...prev, isDisabled: true }));
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

 if (edit_btnf36c2?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:serviceIdentityList:AFVK:v1','serviceidentitylist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen10} 
        onClose={() => {
          setShowProfileAsModalOpen10(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Identity"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addserviceidentity"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddserviceidentitypage10  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btnf36c2?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

