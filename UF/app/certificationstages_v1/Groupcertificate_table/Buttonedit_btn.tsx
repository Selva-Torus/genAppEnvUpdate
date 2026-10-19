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
import PageEditcertificationstagespage8 from '@/app/editcertificationstages_v1/editcertificationstages_v1page';
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

  const {overall_groupf5901, setoverall_groupf5901}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupf5901Props, setoverall_groupf5901Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682b, setai_asset_version_table_groupa682b}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_groupa682bProps, setai_asset_version_table_groupa682bProps}= useContext(TotalContext) as TotalContextProps;
  const {group6f907, setgroup6f907}= useContext(TotalContext) as TotalContextProps;
  const {group6f907Props, setgroup6f907Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01d, setcertificate_tablebc01d}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01dProps, setcertificate_tablebc01dProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_stage_idcd4f0, setcert_stage_idcd4f0}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence4c57e, setstage_sequence4c57e}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code75f70, setstage_type_code75f70}= useContext(TotalContext) as TotalContextProps;
  const {stage_name51f6d, setstage_name51f6d}= useContext(TotalContext) as TotalContextProps;
  const {assigned_login_namedfe29, setassigned_login_namedfe29}= useContext(TotalContext) as TotalContextProps;
  const {decided_onf4112, setdecided_onf4112}= useContext(TotalContext) as TotalContextProps;
  const {stage_status_codead22a, setstage_status_codead22a}= useContext(TotalContext) as TotalContextProps;
  const {edit_btne067e, setedit_btne067e}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fd, setasset_group173fd}= useContext(TotalContext) as TotalContextProps;
  const {asset_group173fdProps, setasset_group173fdProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7d, setstage_group_10fb7d}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_10fb7dProps, setstage_group_10fb7dProps}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0, setstage_group_24dcf0}= useContext(TotalContext) as TotalContextProps;
  const {stage_group_24dcf0Props, setstage_group_24dcf0Props}= useContext(TotalContext) as TotalContextProps;
  const {editcertificationstages_v1Props, seteditcertificationstages_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_groupf5901,
      codeStates['setoverall_group'] = setoverall_groupf5901,
      codeStates['overall_groupf5901'] = overall_groupf5901Props,
      codeStates['setoverall_groupf5901'] = setoverall_groupf5901Props,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_groupa682b,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_groupa682b,
      codeStates['ai_asset_version_table_groupa682b'] = ai_asset_version_table_groupa682bProps,
      codeStates['setai_asset_version_table_groupa682b'] = setai_asset_version_table_groupa682bProps,
      codeStates['group'] = group6f907,
      codeStates['setgroup'] = setgroup6f907,
      codeStates['group6f907'] = group6f907Props,
      codeStates['setgroup6f907'] = setgroup6f907Props,
      codeStates['certificate_table'] = certificate_tablebc01d,
      codeStates['setcertificate_table'] = setcertificate_tablebc01d,
      codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
      codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,
      codeStates['cert_stage_id'] = cert_stage_idcd4f0,
      codeStates['setcert_stage_id'] = setcert_stage_idcd4f0,
      codeStates['stage_sequence'] = stage_sequence4c57e,
      codeStates['setstage_sequence'] = setstage_sequence4c57e,
      codeStates['stage_type_code'] = stage_type_code75f70,
      codeStates['setstage_type_code'] = setstage_type_code75f70,
      codeStates['stage_name'] = stage_name51f6d,
      codeStates['setstage_name'] = setstage_name51f6d,
      codeStates['assigned_login_name'] = assigned_login_namedfe29,
      codeStates['setassigned_login_name'] = setassigned_login_namedfe29,
      codeStates['decided_on'] = decided_onf4112,
      codeStates['setdecided_on'] = setdecided_onf4112,
      codeStates['stage_status_code'] = stage_status_codead22a,
      codeStates['setstage_status_code'] = setstage_status_codead22a,
      codeStates['edit_btn'] = edit_btne067e,
      codeStates['setedit_btn'] = setedit_btne067e,
      codeStates['asset_group'] = asset_group173fd,
      codeStates['setasset_group'] = setasset_group173fd,
      codeStates['asset_group173fd'] = asset_group173fdProps,
      codeStates['setasset_group173fd'] = setasset_group173fdProps,
      codeStates['stage_group_1'] = stage_group_10fb7d,
      codeStates['setstage_group_1'] = setstage_group_10fb7d,
      codeStates['stage_group_10fb7d'] = stage_group_10fb7dProps,
      codeStates['setstage_group_10fb7d'] = setstage_group_10fb7dProps,
      codeStates['stage_group_2'] = stage_group_24dcf0,
      codeStates['setstage_group_2'] = setstage_group_24dcf0,
      codeStates['stage_group_24dcf0'] = stage_group_24dcf0Props,
      codeStates['setstage_group_24dcf0'] = setstage_group_24dcf0Props,
      codeStates['editcertificationstages_v1'] = editcertificationstages_v1Props,
      codeStates['seteditcertificationstages_v1'] = seteditcertificationstages_v1Props,
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
        "8f818cb76d267d3c83510489ed8bc01d",
        "be98d1d59ec1467cb68d4cdaac7e067e"
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
      if (id === "edit_btne067e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen8(false)
  },[edit_btne067e?.refresh])


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
    let bindData2 = filterByKeys(mainData,asset_group173fdProps?.controls);
    setasset_group173fd(bindData2||{})
    setasset_group173fdProps({...asset_group173fdProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,stage_group_10fb7dProps?.controls);
    setstage_group_10fb7d(bindData4||{})
    setstage_group_10fb7dProps({...stage_group_10fb7dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,stage_group_24dcf0Props?.controls);
    setstage_group_24dcf0(bindData6||{})
    setstage_group_24dcf0Props({...stage_group_24dcf0Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps8:any =  [];
    let filterData8 = await getFilterProps(filterProps8,mainData);
    seteditcertificationstages_v1Props([...filterData8 ]);
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

 if (edit_btne067e?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationStages:AFVK:v1','certificationstages','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen8} 
        onClose={() => {
          setShowProfileAsModalOpen8(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Certificate Stages"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "editcertificationstages"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageEditcertificationstagespage8  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {edit_btne067e?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

