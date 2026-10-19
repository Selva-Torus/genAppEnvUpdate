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
import PageCertificationstagespage2 from '@/app/certificationstages_v1/certificationstages_v1page';
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
  const {certificationstages_v1Props, setcertificationstages_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01d, setcertificate_tablebc01d}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablebc01dProps, setcertificate_tablebc01dProps}= useContext(TotalContext) as TotalContextProps;
  const {group6f907, setgroup6f907}= useContext(TotalContext) as TotalContextProps;
  const {group6f907Props, setgroup6f907Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['certificationstages_v1'] = certificationstages_v1Props,
      codeStates['setcertificationstages_v1'] = setcertificationstages_v1Props,
      codeStates['certificate_table'] = certificate_tablebc01d,
      codeStates['setcertificate_table'] = setcertificate_tablebc01d,
      codeStates['certificate_tablebc01d'] = certificate_tablebc01dProps,
      codeStates['setcertificate_tablebc01d'] = setcertificate_tablebc01dProps,
      codeStates['group'] = group6f907,
      codeStates['setgroup'] = setgroup6f907,
      codeStates['group6f907'] = group6f907Props,
      codeStates['setgroup6f907'] = setgroup6f907Props,
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
        "f53081d7f3e9df2423e2476a03bde66b"
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
      if (id === "certificate_stages_btnde66b") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[certificate_stages_btnde66b?.refresh])


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
    let filterProps2:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:TAG:AFGK:TAG:AFK:certificationStagesTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "b73ad95ed3798b7d3d7ee1c9087794ec",
        "object": {
          "properties.certification_id": "bb846062a2c3ed33c0ace74547ec1df1"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setcertificationstages_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,certificate_tablebc01dProps?.controls);
    setcertificate_tablebc01d(bindData4||{})
    setcertificate_tablebc01dProps({...certificate_tablebc01dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,group6f907Props?.controls);
    setgroup6f907(bindData6||{})
    setgroup6f907Props({...group6f907Props,presetValues:{...(mainData||{})}})
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

 if (certificate_stages_btnde66b?.isHidden) {
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
        title="Certification Stages"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "certificationstages"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageCertificationstagespage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {certificate_stages_btnde66b?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Certification Stages")}
        </Button>}
      </div>
    
  )
}

export default Buttoncertificate_stages_btn

