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
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3c08fProps, setoverall_ai_asset_registry3c08fProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825, setoverall_tab_group97825}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825Props, setoverall_tab_group97825Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723, setai_registry_tab_header5e723}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723Props, setai_registry_tab_header5e723Props}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9Props, setgen_pack_groupbebe9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885Props, setai_registry_text_group_1b5885Props}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps;
  const {export_id6fa43, setexport_id6fa43}= useContext(TotalContext) as TotalContextProps;
  const {referencec1175, setreferencec1175}= useContext(TotalContext) as TotalContextProps;
  const {asset_name78040, setasset_name78040}= useContext(TotalContext) as TotalContextProps;
  const {as_at_timestampdc220, setas_at_timestampdc220}= useContext(TotalContext) as TotalContextProps;
  const {sectionse5c2f, setsectionse5c2f}= useContext(TotalContext) as TotalContextProps;
  const {requested_by3c4aa, setrequested_by3c4aa}= useContext(TotalContext) as TotalContextProps;
  const {status6a7a5, setstatus6a7a5}= useContext(TotalContext) as TotalContextProps;
  const {view_btnfb2dd, setview_btnfb2dd}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna9e96, setedit_btna9e96}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnde0fb, setdelete_btnde0fb}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054, setaaaaaaaaaaaea054}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054Props, setaaaaaaaaaaaea054Props}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6, setbbb6cbd6}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6Props, setbbb6cbd6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f,
      codeStates['overall_ai_asset_registry3c08f'] = overall_ai_asset_registry3c08fProps,
      codeStates['setoverall_ai_asset_registry3c08f'] = setoverall_ai_asset_registry3c08fProps,
      codeStates['overall_tab_group'] = overall_tab_group97825,
      codeStates['setoverall_tab_group'] = setoverall_tab_group97825,
      codeStates['overall_tab_group97825'] = overall_tab_group97825Props,
      codeStates['setoverall_tab_group97825'] = setoverall_tab_group97825Props,
      codeStates['ai_registry_tab_header'] = ai_registry_tab_header5e723,
      codeStates['setai_registry_tab_header'] = setai_registry_tab_header5e723,
      codeStates['ai_registry_tab_header5e723'] = ai_registry_tab_header5e723Props,
      codeStates['setai_registry_tab_header5e723'] = setai_registry_tab_header5e723Props,
      codeStates['gen_pack_group'] = gen_pack_groupbebe9,
      codeStates['setgen_pack_group'] = setgen_pack_groupbebe9,
      codeStates['gen_pack_groupbebe9'] = gen_pack_groupbebe9Props,
      codeStates['setgen_pack_groupbebe9'] = setgen_pack_groupbebe9Props,
      codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885,
      codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885,
      codeStates['ai_registry_text_group_1b5885'] = ai_registry_text_group_1b5885Props,
      codeStates['setai_registry_text_group_1b5885'] = setai_registry_text_group_1b5885Props,
      codeStates['export_pack_group'] = export_pack_group738c0,
      codeStates['setexport_pack_group'] = setexport_pack_group738c0,
      codeStates['export_pack_group738c0'] = export_pack_group738c0Props,
      codeStates['setexport_pack_group738c0'] = setexport_pack_group738c0Props,
      codeStates['ai_registry_text_group'] = ai_registry_text_group1679d,
      codeStates['setai_registry_text_group'] = setai_registry_text_group1679d,
      codeStates['ai_registry_text_group1679d'] = ai_registry_text_group1679dProps,
      codeStates['setai_registry_text_group1679d'] = setai_registry_text_group1679dProps,
      codeStates['export_pack_table'] = export_pack_table4a1c2,
      codeStates['setexport_pack_table'] = setexport_pack_table4a1c2,
      codeStates['export_pack_table4a1c2'] = export_pack_table4a1c2Props,
      codeStates['setexport_pack_table4a1c2'] = setexport_pack_table4a1c2Props,
      codeStates['export_id'] = export_id6fa43,
      codeStates['setexport_id'] = setexport_id6fa43,
      codeStates['reference'] = referencec1175,
      codeStates['setreference'] = setreferencec1175,
      codeStates['asset_name'] = asset_name78040,
      codeStates['setasset_name'] = setasset_name78040,
      codeStates['as_at_timestamp'] = as_at_timestampdc220,
      codeStates['setas_at_timestamp'] = setas_at_timestampdc220,
      codeStates['sections'] = sectionse5c2f,
      codeStates['setsections'] = setsectionse5c2f,
      codeStates['requested_by'] = requested_by3c4aa,
      codeStates['setrequested_by'] = setrequested_by3c4aa,
      codeStates['status'] = status6a7a5,
      codeStates['setstatus'] = setstatus6a7a5,
      codeStates['view_btn'] = view_btnfb2dd,
      codeStates['setview_btn'] = setview_btnfb2dd,
      codeStates['edit_btn'] = edit_btna9e96,
      codeStates['setedit_btn'] = setedit_btna9e96,
      codeStates['delete_btn'] = delete_btnde0fb,
      codeStates['setdelete_btn'] = setdelete_btnde0fb,
      codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
      codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
      codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
      codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
      codeStates['bbb'] = bbb6cbd6,
      codeStates['setbbb'] = setbbb6cbd6,
      codeStates['bbb6cbd6'] = bbb6cbd6Props,
      codeStates['setbbb6cbd6'] = setbbb6cbd6Props,
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
        "831114b8513d93c4764d6add5fc4a1c2",
        "ed83ec311ee34d8db7fab4399bfde0fb"
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
      if (id === "delete_btnde0fb") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[delete_btnde0fb?.refresh])


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

 if (delete_btnde0fb?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:auditEvidence:AFVK:v1','auditevidence','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !bg-white !rounded-md !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {delete_btnde0fb?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

