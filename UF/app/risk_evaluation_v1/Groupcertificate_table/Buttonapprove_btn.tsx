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
import PageViewruleevaluationpage4 from '@/app/viewruleevaluation_v1/viewruleevaluation_v1page';
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
  const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {overall_group1b28a, setoverall_group1b28a}= useContext(TotalContext) as TotalContextProps;
  const {overall_group1b28aProps, setoverall_group1b28aProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group2d2ec, setai_asset_version_table_group2d2ec}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group2d2ecProps, setai_asset_version_table_group2d2ecProps}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table8c61c, setcertificate_table8c61c}= useContext(TotalContext) as TotalContextProps;
  const {certificate_table8c61cProps, setcertificate_table8c61cProps}= useContext(TotalContext) as TotalContextProps;
  const {tier_assessment_id04b97, settier_assessment_id04b97}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idcc640, setai_asset_idcc640}= useContext(TotalContext) as TotalContextProps;
  const {asset_code7c217, setasset_code7c217}= useContext(TotalContext) as TotalContextProps;
  const {asset_name4926c, setasset_name4926c}= useContext(TotalContext) as TotalContextProps;
  const {previous_tier_code9e9a1, setprevious_tier_code9e9a1}= useContext(TotalContext) as TotalContextProps;
  const {assessed_tier_coded5fd2, setassessed_tier_coded5fd2}= useContext(TotalContext) as TotalContextProps;
  const {approve_btn770e7, setapprove_btn770e7}= useContext(TotalContext) as TotalContextProps;
  const {assessment_type67085, setassessment_type67085}= useContext(TotalContext) as TotalContextProps;
  const {assessed_byc6b93, setassessed_byc6b93}= useContext(TotalContext) as TotalContextProps;
  const {assessed_on8f41f, setassessed_on8f41f}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5d, setai_registry_groupdee5d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_groupdee5dProps, setai_registry_groupdee5dProps}= useContext(TotalContext) as TotalContextProps;
  const {viewruleevaluation_v1Props, setviewruleevaluation_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc00ea, setoverall_ai_asset_registryc00ea}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registryc00eaProps, setoverall_ai_asset_registryc00eaProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_group1b28a,
      codeStates['setoverall_group'] = setoverall_group1b28a,
      codeStates['overall_group1b28a'] = overall_group1b28aProps,
      codeStates['setoverall_group1b28a'] = setoverall_group1b28aProps,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group2d2ec,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group2d2ec,
      codeStates['ai_asset_version_table_group2d2ec'] = ai_asset_version_table_group2d2ecProps,
      codeStates['setai_asset_version_table_group2d2ec'] = setai_asset_version_table_group2d2ecProps,
      codeStates['certificate_table'] = certificate_table8c61c,
      codeStates['setcertificate_table'] = setcertificate_table8c61c,
      codeStates['certificate_table8c61c'] = certificate_table8c61cProps,
      codeStates['setcertificate_table8c61c'] = setcertificate_table8c61cProps,
      codeStates['tier_assessment_id'] = tier_assessment_id04b97,
      codeStates['settier_assessment_id'] = settier_assessment_id04b97,
      codeStates['ai_asset_id'] = ai_asset_idcc640,
      codeStates['setai_asset_id'] = setai_asset_idcc640,
      codeStates['asset_code'] = asset_code7c217,
      codeStates['setasset_code'] = setasset_code7c217,
      codeStates['asset_name'] = asset_name4926c,
      codeStates['setasset_name'] = setasset_name4926c,
      codeStates['previous_tier_code'] = previous_tier_code9e9a1,
      codeStates['setprevious_tier_code'] = setprevious_tier_code9e9a1,
      codeStates['assessed_tier_code'] = assessed_tier_coded5fd2,
      codeStates['setassessed_tier_code'] = setassessed_tier_coded5fd2,
      codeStates['approve_btn'] = approve_btn770e7,
      codeStates['setapprove_btn'] = setapprove_btn770e7,
      codeStates['assessment_type'] = assessment_type67085,
      codeStates['setassessment_type'] = setassessment_type67085,
      codeStates['assessed_by'] = assessed_byc6b93,
      codeStates['setassessed_by'] = setassessed_byc6b93,
      codeStates['assessed_on'] = assessed_on8f41f,
      codeStates['setassessed_on'] = setassessed_on8f41f,
      codeStates['ai_registry_group'] = ai_registry_groupdee5d,
      codeStates['setai_registry_group'] = setai_registry_groupdee5d,
      codeStates['ai_registry_groupdee5d'] = ai_registry_groupdee5dProps,
      codeStates['setai_registry_groupdee5d'] = setai_registry_groupdee5dProps,
      codeStates['viewruleevaluation_v1'] = viewruleevaluation_v1Props,
      codeStates['setviewruleevaluation_v1'] = setviewruleevaluation_v1Props,
      codeStates['overall_ai_asset_registry'] = overall_ai_asset_registryc00ea,
      codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registryc00ea,
      codeStates['overall_ai_asset_registryc00ea'] = overall_ai_asset_registryc00eaProps,
      codeStates['setoverall_ai_asset_registryc00ea'] = setoverall_ai_asset_registryc00eaProps,
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
        "e733d72b49362ebaeef14cd386c8c61c",
        "7ef89903af66318aa5f5535582e770e7"
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
      if (id === "approve_btn770e7") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[approve_btn770e7?.refresh])


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
    let bindData2 = filterByKeys(mainData,ai_registry_groupdee5dProps?.controls);
    setai_registry_groupdee5d(bindData2||{})
    setai_registry_groupdee5dProps({...ai_registry_groupdee5dProps,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:myApprovalRisk:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "f716d63de89862730abb93cc9400327d",
        "object": {
          "properties.ai_asset_id": "4f862f3b67ac3e5fa25446edeb9cc640"
        }
      }
    ]
  }
];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setviewruleevaluation_v1Props([...filterData4 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen4(true);
    //bindTran
    // For group or table
    setoverall_ai_asset_registryc00ea(mainData||{})
    setoverall_ai_asset_registryc00eaProps({...overall_ai_asset_registryc00eaProps,presetValues:{...(mainData||{})}})
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

 if (approve_btn770e7?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:riskAssetList:AFVK:v1','riskassetlist','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen4} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "viewruleevaluation"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewruleevaluationpage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {approve_btn770e7?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Approve Change Tier")}
        </Button>}
      </div>
    
  )
}

export default Buttonapprove_btn

