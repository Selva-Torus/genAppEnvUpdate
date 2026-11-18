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
import PageApprovetoolgrantpage8 from '@/app/approvetoolgrant_v1/approvetoolgrant_v1page';
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
 

const Buttonapprove_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {group90bf1, setgroup90bf1}= useContext(TotalContext) as TotalContextProps;
  const {group90bf1Props, setgroup90bf1Props}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88, setassets_group37c88}= useContext(TotalContext) as TotalContextProps;
  const {assets_group37c88Props, setassets_group37c88Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5, settool_grant_tabled00d5}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_tabled00d5Props, settool_grant_tabled00d5Props}= useContext(TotalContext) as TotalContextProps;
  const {tool_grant_id1ec60, settool_grant_id1ec60}= useContext(TotalContext) as TotalContextProps;
  const {asset_namee85c6, setasset_namee85c6}= useContext(TotalContext) as TotalContextProps;
  const {tool_operation2654f, settool_operation2654f}= useContext(TotalContext) as TotalContextProps;
  const {access_modef5311, setaccess_modef5311}= useContext(TotalContext) as TotalContextProps;
  const {approve_btnbe988, setapprove_btnbe988}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnff93a, setedit_btnff93a}= useContext(TotalContext) as TotalContextProps;
  const {del_btn7b4fb, setdel_btn7b4fb}= useContext(TotalContext) as TotalContextProps;
  const {valid_from190ab, setvalid_from190ab}= useContext(TotalContext) as TotalContextProps;
  const {valid_toa85e2, setvalid_toa85e2}= useContext(TotalContext) as TotalContextProps;
  const {statusd2db5, setstatusd2db5}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2, setgroup8f0c2}= useContext(TotalContext) as TotalContextProps;
  const {group8f0c2Props, setgroup8f0c2Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7, settemplate_detail_group410a7}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_group410a7Props, settemplate_detail_group410a7Props}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790, setgroupsae790}= useContext(TotalContext) as TotalContextProps;
  const {groupsae790Props, setgroupsae790Props}= useContext(TotalContext) as TotalContextProps;
  const {approvetoolgrant_v1Props, setapprovetoolgrant_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['group'] = group90bf1,
      codeStates['setgroup'] = setgroup90bf1,
      codeStates['group90bf1'] = group90bf1Props,
      codeStates['setgroup90bf1'] = setgroup90bf1Props,
      codeStates['assets_group'] = assets_group37c88,
      codeStates['setassets_group'] = setassets_group37c88,
      codeStates['assets_group37c88'] = assets_group37c88Props,
      codeStates['setassets_group37c88'] = setassets_group37c88Props,
      codeStates['tool_grant_table'] = tool_grant_tabled00d5,
      codeStates['settool_grant_table'] = settool_grant_tabled00d5,
      codeStates['tool_grant_tabled00d5'] = tool_grant_tabled00d5Props,
      codeStates['settool_grant_tabled00d5'] = settool_grant_tabled00d5Props,
      codeStates['tool_grant_id'] = tool_grant_id1ec60,
      codeStates['settool_grant_id'] = settool_grant_id1ec60,
      codeStates['asset_name'] = asset_namee85c6,
      codeStates['setasset_name'] = setasset_namee85c6,
      codeStates['tool_operation'] = tool_operation2654f,
      codeStates['settool_operation'] = settool_operation2654f,
      codeStates['access_mode'] = access_modef5311,
      codeStates['setaccess_mode'] = setaccess_modef5311,
      codeStates['approve_btn'] = approve_btnbe988,
      codeStates['setapprove_btn'] = setapprove_btnbe988,
      codeStates['edit_btn'] = edit_btnff93a,
      codeStates['setedit_btn'] = setedit_btnff93a,
      codeStates['del_btn'] = del_btn7b4fb,
      codeStates['setdel_btn'] = setdel_btn7b4fb,
      codeStates['valid_from'] = valid_from190ab,
      codeStates['setvalid_from'] = setvalid_from190ab,
      codeStates['valid_to'] = valid_toa85e2,
      codeStates['setvalid_to'] = setvalid_toa85e2,
      codeStates['status'] = statusd2db5,
      codeStates['setstatus'] = setstatusd2db5,
      codeStates['group'] = group8f0c2,
      codeStates['setgroup'] = setgroup8f0c2,
      codeStates['group8f0c2'] = group8f0c2Props,
      codeStates['setgroup8f0c2'] = setgroup8f0c2Props,
      codeStates['template_detail_group'] = template_detail_group410a7,
      codeStates['settemplate_detail_group'] = settemplate_detail_group410a7,
      codeStates['template_detail_group410a7'] = template_detail_group410a7Props,
      codeStates['settemplate_detail_group410a7'] = settemplate_detail_group410a7Props,
      codeStates['groups'] = groupsae790,
      codeStates['setgroups'] = setgroupsae790,
      codeStates['groupsae790'] = groupsae790Props,
      codeStates['setgroupsae790'] = setgroupsae790Props,
      codeStates['approvetoolgrant_v1'] = approvetoolgrant_v1Props,
      codeStates['setapprovetoolgrant_v1'] = setapprovetoolgrant_v1Props,
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
        "abfbf12d125d476e2fc2167c19bd00d5",
        "555e02de9e2c77c9e6397beb28dbe988"
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
      if (id === "approve_btnbe988") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen8(false)
  },[approve_btnbe988?.refresh])


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
    let bindData2 = filterByKeys(mainData,group8f0c2Props?.controls);
    setgroup8f0c2(bindData2||{})
    setgroup8f0c2Props({...group8f0c2Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,template_detail_group410a7Props?.controls);
    settemplate_detail_group410a7(bindData4||{})
    settemplate_detail_group410a7Props({...template_detail_group410a7Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,groupsae790Props?.controls);
    setgroupsae790(bindData6||{})
    setgroupsae790Props({...groupsae790Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps8:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "96b5e4ba6f7b49dbb865de476747f3fe",
        "object": {
          "properties.tool_grant_id": "cc64ecfb4288437f8334d8becda1ec60"
        }
      }
    ]
  }
];
    let filterData8 = await getFilterProps(filterProps8,mainData);
    setapprovetoolgrant_v1Props([...filterData8 ]);
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

 if (approve_btnbe988?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:toolGrant:AFVK:v1','toolgrant','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen8} 
        onClose={() => {
          setShowProfileAsModalOpen8(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "approvetoolgrant"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageApprovetoolgrantpage8  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {approve_btnbe988?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Approve")}
        </Button>}
      </div>
    
  )
}

export default Buttonapprove_btn

