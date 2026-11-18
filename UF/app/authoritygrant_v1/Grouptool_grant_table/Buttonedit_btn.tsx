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
import PageAddauthgrantpage2 from '@/app/addauthgrant_v1/addauthgrant_v1page';
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {group7b86a, setgroup7b86a}= useContext(TotalContext) as TotalContextProps;
  const {group7b86aProps, setgroup7b86aProps}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0, setassets_group5eaf0}= useContext(TotalContext) as TotalContextProps;
  const {assets_group5eaf0Props, setassets_group5eaf0Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5b, settool_grant_tabledbd5b}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabledbd5bProps, settool_grant_tabledbd5bProps}= useContext(TotalContext) as TotalContextProps;
  const {authority_grant_idbe507, setauthority_grant_idbe507}= useContext(TotalContext) as TotalContextProps;
  const {grant_codee405e, setgrant_codee405e}= useContext(TotalContext) as TotalContextProps;
  const {action_typefc208, setaction_typefc208}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn753a0, setedit_btn753a0}= useContext(TotalContext) as TotalContextProps;
  const {del_btn78f99, setdel_btn78f99}= useContext(TotalContext) as TotalContextProps;
  const {valid_from276c5, setvalid_from276c5}= useContext(TotalContext) as TotalContextProps;
  const {valid_to26443, setvalid_to26443}= useContext(TotalContext) as TotalContextProps;
  const {statusc284c, setstatusc284c}= useContext(TotalContext) as TotalContextProps;
  const {addauthgrant_v1Props, setaddauthgrant_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_bt8ce7b, setupdate_bt8ce7b}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9, setdynamicactions401a9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions401a9Props, setdynamicactions401a9Props}= useContext(TotalContext) as TotalContextProps;
  const {save_bt923fc, setsave_bt923fc}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23f, setoverall_auth_grant_grpba23f}= useContext(TotalContext) as TotalContextProps;
  const {overall_auth_grant_grpba23fProps, setoverall_auth_grant_grpba23fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037f, setrevocat_info_group2037f}= useContext(TotalContext) as TotalContextProps;
  const {revocat_info_group2037fProps, setrevocat_info_group2037fProps}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026c, setauth_grant_details_groupd026c}= useContext(TotalContext) as TotalContextProps;
  const {auth_grant_details_groupd026cProps, setauth_grant_details_groupd026cProps}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585c, setfinacial_transaction__group6585c}= useContext(TotalContext) as TotalContextProps;
  const {finacial_transaction__group6585cProps, setfinacial_transaction__group6585cProps}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45f, setcondition_validity_group3e45f}= useContext(TotalContext) as TotalContextProps;
  const {condition_validity_group3e45fProps, setcondition_validity_group3e45fProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfd, setcertification_group91bfd}= useContext(TotalContext) as TotalContextProps;
  const {certification_group91bfdProps, setcertification_group91bfdProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['group'] = group7b86a,
      codeStates['setgroup'] = setgroup7b86a,
      codeStates['group7b86a'] = group7b86aProps,
      codeStates['setgroup7b86a'] = setgroup7b86aProps,
      codeStates['assets_group'] = assets_group5eaf0,
      codeStates['setassets_group'] = setassets_group5eaf0,
      codeStates['assets_group5eaf0'] = assets_group5eaf0Props,
      codeStates['setassets_group5eaf0'] = setassets_group5eaf0Props,
      codeStates['tool_grant_table'] = tool_grant_tabledbd5b,
      codeStates['settool_grant_table'] = settool_grant_tabledbd5b,
      codeStates['tool_grant_tabledbd5b'] = tool_grant_tabledbd5bProps,
      codeStates['settool_grant_tabledbd5b'] = settool_grant_tabledbd5bProps,
      codeStates['authority_grant_id'] = authority_grant_idbe507,
      codeStates['setauthority_grant_id'] = setauthority_grant_idbe507,
      codeStates['grant_code'] = grant_codee405e,
      codeStates['setgrant_code'] = setgrant_codee405e,
      codeStates['action_type'] = action_typefc208,
      codeStates['setaction_type'] = setaction_typefc208,
      codeStates['edit_btn'] = edit_btn753a0,
      codeStates['setedit_btn'] = setedit_btn753a0,
      codeStates['del_btn'] = del_btn78f99,
      codeStates['setdel_btn'] = setdel_btn78f99,
      codeStates['valid_from'] = valid_from276c5,
      codeStates['setvalid_from'] = setvalid_from276c5,
      codeStates['valid_to'] = valid_to26443,
      codeStates['setvalid_to'] = setvalid_to26443,
      codeStates['status'] = statusc284c,
      codeStates['setstatus'] = setstatusc284c,
      codeStates['addauthgrant_v1'] = addauthgrant_v1Props,
      codeStates['setaddauthgrant_v1'] = setaddauthgrant_v1Props,
      codeStates['update_bt'] = update_bt8ce7b,
      codeStates['setupdate_bt'] = setupdate_bt8ce7b,
      codeStates['dynamicactions'] = dynamicactions401a9,
      codeStates['setdynamicactions'] = setdynamicactions401a9,
      codeStates['dynamicactions401a9'] = dynamicactions401a9Props,
      codeStates['setdynamicactions401a9'] = setdynamicactions401a9Props,
      codeStates['save_bt'] = save_bt923fc,
      codeStates['setsave_bt'] = setsave_bt923fc,
      codeStates['overall_auth_grant_grp'] = overall_auth_grant_grpba23f,
      codeStates['setoverall_auth_grant_grp'] = setoverall_auth_grant_grpba23f,
      codeStates['overall_auth_grant_grpba23f'] = overall_auth_grant_grpba23fProps,
      codeStates['setoverall_auth_grant_grpba23f'] = setoverall_auth_grant_grpba23fProps,
      codeStates['revocat_info_group'] = revocat_info_group2037f,
      codeStates['setrevocat_info_group'] = setrevocat_info_group2037f,
      codeStates['revocat_info_group2037f'] = revocat_info_group2037fProps,
      codeStates['setrevocat_info_group2037f'] = setrevocat_info_group2037fProps,
      codeStates['auth_grant_details_group'] = auth_grant_details_groupd026c,
      codeStates['setauth_grant_details_group'] = setauth_grant_details_groupd026c,
      codeStates['auth_grant_details_groupd026c'] = auth_grant_details_groupd026cProps,
      codeStates['setauth_grant_details_groupd026c'] = setauth_grant_details_groupd026cProps,
      codeStates['finacial_transaction__group'] = finacial_transaction__group6585c,
      codeStates['setfinacial_transaction__group'] = setfinacial_transaction__group6585c,
      codeStates['finacial_transaction__group6585c'] = finacial_transaction__group6585cProps,
      codeStates['setfinacial_transaction__group6585c'] = setfinacial_transaction__group6585cProps,
      codeStates['condition_validity_group'] = condition_validity_group3e45f,
      codeStates['setcondition_validity_group'] = setcondition_validity_group3e45f,
      codeStates['condition_validity_group3e45f'] = condition_validity_group3e45fProps,
      codeStates['setcondition_validity_group3e45f'] = setcondition_validity_group3e45fProps,
      codeStates['certification_group'] = certification_group91bfd,
      codeStates['setcertification_group'] = setcertification_group91bfd,
      codeStates['certification_group91bfd'] = certification_group91bfdProps,
      codeStates['setcertification_group91bfd'] = setcertification_group91bfdProps,
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
        "64e0f9e737d9118076edff96807dbd5b",
        "3ff3b20b61fb13ea113e59c26af753a0"
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
      if (id === "edit_btn753a0") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_btn753a0?.refresh])


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
    setaddauthgrant_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //enableElement
    setupdate_bt8ce7b((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_bt923fc((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    setoverall_auth_grant_grpba23f(mainData||{})
    setoverall_auth_grant_grpba23fProps({...overall_auth_grant_grpba23fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,revocat_info_group2037fProps?.controls);
    setrevocat_info_group2037f(bindData10||{})
    setrevocat_info_group2037fProps({...revocat_info_group2037fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,auth_grant_details_groupd026cProps?.controls);
    setauth_grant_details_groupd026c(bindData12||{})
    setauth_grant_details_groupd026cProps({...auth_grant_details_groupd026cProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,finacial_transaction__group6585cProps?.controls);
    setfinacial_transaction__group6585c(bindData14||{})
    setfinacial_transaction__group6585cProps({...finacial_transaction__group6585cProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,condition_validity_group3e45fProps?.controls);
    setcondition_validity_group3e45f(bindData16||{})
    setcondition_validity_group3e45fProps({...condition_validity_group3e45fProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,certification_group91bfdProps?.controls);
    setcertification_group91bfd(bindData18||{})
    setcertification_group91bfdProps({...certification_group91bfdProps,presetValues:{...(mainData||{})}})
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

 if (edit_btn753a0?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:authorityGrant:AFVK:v1','authoritygrant','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addauthgrant"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddauthgrantpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn753a0?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

