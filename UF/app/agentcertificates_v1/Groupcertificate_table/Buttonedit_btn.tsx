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
import PageEditcertificatepage2 from '@/app/editcertificate_v1/editcertificate_v1page';
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

  const {overall_groupae13f, setoverall_groupae13f}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae13fProps, setoverall_groupae13fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group35701, setai_asset_version_table_group35701}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group35701Props, setai_asset_version_table_group35701Props}= useContext(TotalContext) as TotalContextProps;
  const {groupf74cc, setgroupf74cc}= useContext(TotalContext) as TotalContextProps;
  const {groupf74ccProps, setgroupf74ccProps}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32ae, setcertificate_tablea32ae}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32aeProps, setcertificate_tablea32aeProps}= useContext(TotalContext) as TotalContextProps;
  const {certification_idc1df1, setcertification_idc1df1}= useContext(TotalContext) as TotalContextProps;
  const {cert_code8a33d, setcert_code8a33d}= useContext(TotalContext) as TotalContextProps;
  const {risk_tier_codeba0b3, setrisk_tier_codeba0b3}= useContext(TotalContext) as TotalContextProps;
  const {template_nameb0455, settemplate_nameb0455}= useContext(TotalContext) as TotalContextProps;
  const {initiated_onc5bb1, setinitiated_onc5bb1}= useContext(TotalContext) as TotalContextProps;
  const {business_unit_nameb5a7a, setbusiness_unit_nameb5a7a}= useContext(TotalContext) as TotalContextProps;
  const {certificate_stages_btnde66b, setcertificate_stages_btnde66b}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn02d22, setedit_btn02d22}= useContext(TotalContext) as TotalContextProps;
  const {editcertificate_v1Props, seteditcertificate_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98, setmodel_info_group45b98}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group45b98Props, setmodel_info_group45b98Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8, setgrounding_group_19abb8}= useContext(TotalContext) as TotalContextProps;
  const {grounding_group_19abb8Props, setgrounding_group_19abb8Props}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5, setgrounding_groupdf2f5}= useContext(TotalContext) as TotalContextProps;
  const {grounding_groupdf2f5Props, setgrounding_groupdf2f5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_group'] = overall_groupae13f,
      codeStates['setoverall_group'] = setoverall_groupae13f,
      codeStates['overall_groupae13f'] = overall_groupae13fProps,
      codeStates['setoverall_groupae13f'] = setoverall_groupae13fProps,
      codeStates['ai_asset_version_table_group'] = ai_asset_version_table_group35701,
      codeStates['setai_asset_version_table_group'] = setai_asset_version_table_group35701,
      codeStates['ai_asset_version_table_group35701'] = ai_asset_version_table_group35701Props,
      codeStates['setai_asset_version_table_group35701'] = setai_asset_version_table_group35701Props,
      codeStates['group'] = groupf74cc,
      codeStates['setgroup'] = setgroupf74cc,
      codeStates['groupf74cc'] = groupf74ccProps,
      codeStates['setgroupf74cc'] = setgroupf74ccProps,
      codeStates['certificate_table'] = certificate_tablea32ae,
      codeStates['setcertificate_table'] = setcertificate_tablea32ae,
      codeStates['certificate_tablea32ae'] = certificate_tablea32aeProps,
      codeStates['setcertificate_tablea32ae'] = setcertificate_tablea32aeProps,
      codeStates['certification_id'] = certification_idc1df1,
      codeStates['setcertification_id'] = setcertification_idc1df1,
      codeStates['cert_code'] = cert_code8a33d,
      codeStates['setcert_code'] = setcert_code8a33d,
      codeStates['risk_tier_code'] = risk_tier_codeba0b3,
      codeStates['setrisk_tier_code'] = setrisk_tier_codeba0b3,
      codeStates['template_name'] = template_nameb0455,
      codeStates['settemplate_name'] = settemplate_nameb0455,
      codeStates['initiated_on'] = initiated_onc5bb1,
      codeStates['setinitiated_on'] = setinitiated_onc5bb1,
      codeStates['business_unit_name'] = business_unit_nameb5a7a,
      codeStates['setbusiness_unit_name'] = setbusiness_unit_nameb5a7a,
      codeStates['certificate_stages_btn'] = certificate_stages_btnde66b,
      codeStates['setcertificate_stages_btn'] = setcertificate_stages_btnde66b,
      codeStates['edit_btn'] = edit_btn02d22,
      codeStates['setedit_btn'] = setedit_btn02d22,
      codeStates['editcertificate_v1'] = editcertificate_v1Props,
      codeStates['seteditcertificate_v1'] = seteditcertificate_v1Props,
      codeStates['model_info_group'] = model_info_group45b98,
      codeStates['setmodel_info_group'] = setmodel_info_group45b98,
      codeStates['model_info_group45b98'] = model_info_group45b98Props,
      codeStates['setmodel_info_group45b98'] = setmodel_info_group45b98Props,
      codeStates['grounding_group_1'] = grounding_group_19abb8,
      codeStates['setgrounding_group_1'] = setgrounding_group_19abb8,
      codeStates['grounding_group_19abb8'] = grounding_group_19abb8Props,
      codeStates['setgrounding_group_19abb8'] = setgrounding_group_19abb8Props,
      codeStates['grounding_group'] = grounding_groupdf2f5,
      codeStates['setgrounding_group'] = setgrounding_groupdf2f5,
      codeStates['grounding_groupdf2f5'] = grounding_groupdf2f5Props,
      codeStates['setgrounding_groupdf2f5'] = setgrounding_groupdf2f5Props,
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
        "f787e987cb3df8b477db7010418a32ae",
        "89c25faafe124ba2afc15a6230002d22"
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
      if (id === "edit_btn02d22") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_btn02d22?.refresh])


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
    seteditcertificate_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,model_info_group45b98Props?.controls);
    setmodel_info_group45b98(bindData4||{})
    setmodel_info_group45b98Props({...model_info_group45b98Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,grounding_group_19abb8Props?.controls);
    setgrounding_group_19abb8(bindData6||{})
    setgrounding_group_19abb8Props({...grounding_group_19abb8Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,grounding_groupdf2f5Props?.controls);
    setgrounding_groupdf2f5(bindData8||{})
    setgrounding_groupdf2f5Props({...grounding_groupdf2f5Props,presetValues:{...(mainData||{})}})
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

 if (edit_btn02d22?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:agentCertificates:AFVK:v1','agentcertificates','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Certificates"
        variant="subheader-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "editcertificate"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageEditcertificatepage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn02d22?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

