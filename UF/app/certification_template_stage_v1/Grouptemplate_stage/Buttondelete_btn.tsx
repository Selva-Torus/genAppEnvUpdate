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
import PageDeletecertificationtemplatestagepage4 from '@/app/deletecertificationtemplatestage_v1/deletecertificationtemplatestage_v1page';
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
  const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {groupd2d37, setgroupd2d37}= useContext(TotalContext) as TotalContextProps;
  const {groupd2d37Props, setgroupd2d37Props}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933, settemplate_stage1d933}= useContext(TotalContext) as TotalContextProps;
  const {template_stage1d933Props, settemplate_stage1d933Props}= useContext(TotalContext) as TotalContextProps;
  const {template_stage_idddf46, settemplate_stage_idddf46}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_id6353c, setcert_template_id6353c}= useContext(TotalContext) as TotalContextProps;
  const {stage_sequence526fa, setstage_sequence526fa}= useContext(TotalContext) as TotalContextProps;
  const {stage_type_code40ed7, setstage_type_code40ed7}= useContext(TotalContext) as TotalContextProps;
  const {stage_namee4558, setstage_namee4558}= useContext(TotalContext) as TotalContextProps;
  const {approver_role_id8ceef, setapprover_role_id8ceef}= useContext(TotalContext) as TotalContextProps;
  const {is_mandatory27a2c, setis_mandatory27a2c}= useContext(TotalContext) as TotalContextProps;
  const {evidence_required40499, setevidence_required40499}= useContext(TotalContext) as TotalContextProps;
  const {sla_daysec694, setsla_daysec694}= useContext(TotalContext) as TotalContextProps;
  const {is_active13499, setis_active13499}= useContext(TotalContext) as TotalContextProps;
  const {view_btncb6d5, setview_btncb6d5}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna9f72, setedit_btna9f72}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnb6708, setdelete_btnb6708}= useContext(TotalContext) as TotalContextProps;
  const {groupb40f5, setgroupb40f5}= useContext(TotalContext) as TotalContextProps;
  const {groupb40f5Props, setgroupb40f5Props}= useContext(TotalContext) as TotalContextProps;
  const {deletecertificationtemplatestage_v1Props, setdeletecertificationtemplatestage_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['group'] = groupd2d37,
      codeStates['setgroup'] = setgroupd2d37,
      codeStates['groupd2d37'] = groupd2d37Props,
      codeStates['setgroupd2d37'] = setgroupd2d37Props,
      codeStates['template_stage'] = template_stage1d933,
      codeStates['settemplate_stage'] = settemplate_stage1d933,
      codeStates['template_stage1d933'] = template_stage1d933Props,
      codeStates['settemplate_stage1d933'] = settemplate_stage1d933Props,
      codeStates['template_stage_id'] = template_stage_idddf46,
      codeStates['settemplate_stage_id'] = settemplate_stage_idddf46,
      codeStates['cert_template_id'] = cert_template_id6353c,
      codeStates['setcert_template_id'] = setcert_template_id6353c,
      codeStates['stage_sequence'] = stage_sequence526fa,
      codeStates['setstage_sequence'] = setstage_sequence526fa,
      codeStates['stage_type_code'] = stage_type_code40ed7,
      codeStates['setstage_type_code'] = setstage_type_code40ed7,
      codeStates['stage_name'] = stage_namee4558,
      codeStates['setstage_name'] = setstage_namee4558,
      codeStates['approver_role_id'] = approver_role_id8ceef,
      codeStates['setapprover_role_id'] = setapprover_role_id8ceef,
      codeStates['is_mandatory'] = is_mandatory27a2c,
      codeStates['setis_mandatory'] = setis_mandatory27a2c,
      codeStates['evidence_required'] = evidence_required40499,
      codeStates['setevidence_required'] = setevidence_required40499,
      codeStates['sla_days'] = sla_daysec694,
      codeStates['setsla_days'] = setsla_daysec694,
      codeStates['is_active'] = is_active13499,
      codeStates['setis_active'] = setis_active13499,
      codeStates['view_btn'] = view_btncb6d5,
      codeStates['setview_btn'] = setview_btncb6d5,
      codeStates['edit_btn'] = edit_btna9f72,
      codeStates['setedit_btn'] = setedit_btna9f72,
      codeStates['delete_btn'] = delete_btnb6708,
      codeStates['setdelete_btn'] = setdelete_btnb6708,
      codeStates['group'] = groupb40f5,
      codeStates['setgroup'] = setgroupb40f5,
      codeStates['groupb40f5'] = groupb40f5Props,
      codeStates['setgroupb40f5'] = setgroupb40f5Props,
      codeStates['deletecertificationtemplatestage_v1'] = deletecertificationtemplatestage_v1Props,
      codeStates['setdeletecertificationtemplatestage_v1'] = setdeletecertificationtemplatestage_v1Props,
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
        "1061ea261fd04604ac6921956531d933",
        "4d03dd427e454c6f811a7d330abb6708"
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
      if (id === "delete_btnb6708") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
  },[delete_btnb6708?.refresh])


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
    let bindData2 = filterByKeys(mainData,groupb40f5Props?.controls);
    setgroupb40f5(bindData2||{})
    setgroupb40f5Props({...groupb40f5Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps4:any =  [];
    let filterData4 = await getFilterProps(filterProps4,mainData);
    setdeletecertificationtemplatestage_v1Props([...filterData4 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen4(true);
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

 if (delete_btnb6708?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificationTemplateStage:AFVK:v1','certificationtemplatestage','needstopPropagate')=='not in assembler'?e.stopPropagation():null
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
        modalName = "deletecertificationtemplatestage"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageDeletecertificationtemplatestagepage4  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {delete_btnb6708?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttondelete_btn

