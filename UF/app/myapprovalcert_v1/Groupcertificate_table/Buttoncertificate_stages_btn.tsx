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
import PageListstagesbyloginidpage6 from '@/app/liststagesbyloginid_v1/liststagesbyloginid_v1page';
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

  const {overall_group6cd49, setoverall_group6cd49}= useContext(TotalContext) as TotalContextProps;
  const {overall_group6cd49Props, setoverall_group6cd49Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48d, setai_asset_version_table_group1b48d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group1b48dProps, setai_asset_version_table_group1b48dProps}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3, setgroupa86a3}= useContext(TotalContext) as TotalContextProps;
  const {groupa86a3Props, setgroupa86a3Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8, setcertificate_table48fb8}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table48fb8Props, setcertificate_table48fb8Props}= useContext(TotalContext) as TotalContextProps;
  const {certification_idc2134, setcertification_idc2134}= useContext(TotalContext) as TotalContextProps;
  const {cert_code3089c, setcert_code3089c}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codeee516, setrisk_tier_codeee516}= useContext(TotalContext) as TotalContextProps;
  const {template_name84746, settemplate_name84746}= useContext(TotalContext) as TotalContextProps;
  const {initiated_one0200, setinitiated_one0200}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_name3c111, setbusiness_unit_name3c111}= useContext(TotalContext) as TotalContextProps;
  const {certificate_stages_btnb2668, setcertificate_stages_btnb2668}= useContext(TotalContext) as TotalContextProps;
  const {show_stages4c364, setshow_stages4c364}= useContext(TotalContext) as TotalContextProps;
  const {group32bca, setgroup32bca}= useContext(TotalContext) as TotalContextProps;
  const {group32bcaProps, setgroup32bcaProps}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82, setstages_table01d82}= useContext(TotalContext) as TotalContextProps;
  const {stages_table01d82Props, setstages_table01d82Props}= useContext(TotalContext) as TotalContextProps;
  const {liststagesbyloginid_v1Props, setliststagesbyloginid_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group6cd49,
      codeStates['setoverall_group'] = setoverall_group6cd49,
      codeStates['overall_group6cd49'] = overall_group6cd49Props,
      codeStates['setoverall_group6cd49'] = setoverall_group6cd49Props,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group1b48d,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group1b48d,
      codeStates['ai_asset_version_table_group1b48d'] = ai_asset_version_table_group1b48dProps,
      codeStates['setai_asset_version_table_group1b48d'] = setai_asset_version_table_group1b48dProps,
      codeStates['group'] = groupa86a3,
      codeStates['setgroup'] = setgroupa86a3,
      codeStates['groupa86a3'] = groupa86a3Props,
      codeStates['setgroupa86a3'] = setgroupa86a3Props,
      codeStates['certificate_table'] = certificate_table48fb8,
      codeStates['setcertificate_table'] = setcertificate_table48fb8,
      codeStates['certificate_table48fb8'] = certificate_table48fb8Props,
      codeStates['setcertificate_table48fb8'] = setcertificate_table48fb8Props,
      codeStates['certification_id'] = certification_idc2134,
      codeStates['setcertification_id'] = setcertification_idc2134,
      codeStates['cert_code'] = cert_code3089c,
      codeStates['setcert_code'] = setcert_code3089c,
      codeStates['risk_tier_code'] = risk_tier_codeee516,
      codeStates['setrisk_tier_code'] = setrisk_tier_codeee516,
      codeStates['template_name'] = template_name84746,
      codeStates['settemplate_name'] = settemplate_name84746,
      codeStates['initiated_on'] = initiated_one0200,
      codeStates['setinitiated_on'] = setinitiated_one0200,
      codeStates['business_unit_name'] = business_unit_name3c111,
      codeStates['setbusiness_unit_name'] = setbusiness_unit_name3c111,
      codeStates['certificate_stages_btn'] = certificate_stages_btnb2668,
      codeStates['setcertificate_stages_btn'] = setcertificate_stages_btnb2668,
      codeStates['show_stages'] = show_stages4c364,
      codeStates['setshow_stages'] = setshow_stages4c364,
      codeStates['group'] = group32bca,
      codeStates['setgroup'] = setgroup32bca,
      codeStates['group32bca'] = group32bcaProps,
      codeStates['setgroup32bca'] = setgroup32bcaProps,
      codeStates['stages_table'] = stages_table01d82,
      codeStates['setstages_table'] = setstages_table01d82,
      codeStates['stages_table01d82'] = stages_table01d82Props,
      codeStates['setstages_table01d82'] = setstages_table01d82Props,
      codeStates['liststagesbyloginid_v1'] = liststagesbyloginid_v1Props,
      codeStates['setliststagesbyloginid_v1'] = setliststagesbyloginid_v1Props,
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
        "96fbffd3d21cb2c50afdc6e27bf48fb8",
        "54fe120bdfbb2f9d486f159423fb2668"
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
      if (id === "certificate_stages_btnb2668") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
  },[certificate_stages_btnb2668?.refresh])


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
    let bindData2 = filterByKeys(mainData,group32bcaProps?.controls);
    setgroup32bca(bindData2||{})
    setgroup32bcaProps({...group32bcaProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,stages_table01d82Props?.controls);
    setstages_table01d82(bindData4||{})
    setstages_table01d82Props({...stages_table01d82Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps6:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:listallShowStages:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "02bc55aa51f4e8f88c7a8e90609af157",
        "object": {
          "properties.certification_id": "2f87b331246c560b4cf00b30b29c2134"
        }
      }
    ]
  }
];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setliststagesbyloginid_v1Props([...filterData6 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen6(true);
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

 if (certificate_stages_btnb2668?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:myapprovalCert:AFVK:v1','myapprovalcert','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen6} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="My Approval - Buckets"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "liststagesbyloginid"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageListstagesbyloginidpage6  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {certificate_stages_btnb2668?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("My Stages")}
        </Button>}
      </div>
    
  )
}

export default Buttoncertificate_stages_btn

