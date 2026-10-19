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
import PageViewattachmentpage6 from '@/app/viewattachment_v1/viewattachment_v1page';
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
 

const Buttonview_evidence_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  const {overall_groupde19e, setoverall_groupde19e}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupde19eProps, setoverall_groupde19eProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group4a015, setai_asset_version_table_group4a015}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group4a015Props, setai_asset_version_table_group4a015Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablefb096, setcertificate_tablefb096}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablefb096Props, setcertificate_tablefb096Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_idb993c, setai_asset_idb993c}= useContext(TotalContext) as TotalContextProps;
  const {asset_code2b472, setasset_code2b472}= useContext(TotalContext) as TotalContextProps;
  const {asset_namec5c0e, setasset_namec5c0e}= useContext(TotalContext) as TotalContextProps;
  const {asset_type_code838c5, setasset_type_code838c5}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_code9cbc7, setrisk_tier_code9cbc7}= useContext(TotalContext) as TotalContextProps;
  const {approve_btnfafc6, setapprove_btnfafc6}= useContext(TotalContext) as TotalContextProps;
  const {view_evidence_btn5373f, setview_evidence_btn5373f}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958a, setevidence_tablef958a}= useContext(TotalContext) as TotalContextProps;
  const {evidence_tablef958aProps, setevidence_tablef958aProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355e, setasset_information_groupa355e}= useContext(TotalContext) as TotalContextProps;
  const {asset_information_groupa355eProps, setasset_information_groupa355eProps}= useContext(TotalContext) as TotalContextProps;
  const {viewattachment_v1Props, setviewattachment_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_groupde19e,
      codeStates['setoverall_group'] = setoverall_groupde19e,
      codeStates['overall_groupde19e'] = overall_groupde19eProps,
      codeStates['setoverall_groupde19e'] = setoverall_groupde19eProps,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group4a015,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group4a015,
      codeStates['ai_asset_version_table_group4a015'] = ai_asset_version_table_group4a015Props,
      codeStates['setai_asset_version_table_group4a015'] = setai_asset_version_table_group4a015Props,
      codeStates['certificate_table'] = certificate_tablefb096,
      codeStates['setcertificate_table'] = setcertificate_tablefb096,
      codeStates['certificate_tablefb096'] = certificate_tablefb096Props,
      codeStates['setcertificate_tablefb096'] = setcertificate_tablefb096Props,
      codeStates['ai_asset_id'] = ai_asset_idb993c,
      codeStates['setai_asset_id'] = setai_asset_idb993c,
      codeStates['asset_code'] = asset_code2b472,
      codeStates['setasset_code'] = setasset_code2b472,
      codeStates['asset_name'] = asset_namec5c0e,
      codeStates['setasset_name'] = setasset_namec5c0e,
      codeStates['asset_type_code'] = asset_type_code838c5,
      codeStates['setasset_type_code'] = setasset_type_code838c5,
      codeStates['risk_tier_code'] = risk_tier_code9cbc7,
      codeStates['setrisk_tier_code'] = setrisk_tier_code9cbc7,
      codeStates['approve_btn'] = approve_btnfafc6,
      codeStates['setapprove_btn'] = setapprove_btnfafc6,
      codeStates['view_evidence_btn'] = view_evidence_btn5373f,
      codeStates['setview_evidence_btn'] = setview_evidence_btn5373f,
      codeStates['evidence_table'] = evidence_tablef958a,
      codeStates['setevidence_table'] = setevidence_tablef958a,
      codeStates['evidence_tablef958a'] = evidence_tablef958aProps,
      codeStates['setevidence_tablef958a'] = setevidence_tablef958aProps,
      codeStates['asset_information_group'] = asset_information_groupa355e,
      codeStates['setasset_information_group'] = setasset_information_groupa355e,
      codeStates['asset_information_groupa355e'] = asset_information_groupa355eProps,
      codeStates['setasset_information_groupa355e'] = setasset_information_groupa355eProps,
      codeStates['viewattachment_v1'] = viewattachment_v1Props,
      codeStates['setviewattachment_v1'] = setviewattachment_v1Props,
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
        "2dcd0e2f9f7719aaf7ad25eb365fb096",
        "993ac527b3f23d1f4c7005df8755373f"
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
      if (id === "view_evidence_btn5373f") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
  },[view_evidence_btn5373f?.refresh])


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
    let bindData2 = filterByKeys(mainData,evidence_tablef958aProps?.controls);
    setevidence_tablef958a(bindData2||{})
    setevidence_tablef958aProps({...evidence_tablef958aProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,asset_information_groupa355eProps?.controls);
    setasset_information_groupa355e(bindData4||{})
    setasset_information_groupa355eProps({...asset_information_groupa355eProps,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps6:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:AttachEvidence:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "49b405c43b13428ba121c784ad0bb565",
        "object": {
          "properties.ai_asset_id": "a8a061cbe8efb11d7e84c32fbc6b993c"
        }
      }
    ]
  }
];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setviewattachment_v1Props([...filterData6 ]);
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

 if (view_evidence_btn5373f?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:assetApproval:AFVK:v1','assetapproval','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen6} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Attachment - Asset"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "viewattachment"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewattachmentpage6  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {view_evidence_btn5373f?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("View Evidences")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_evidence_btn

