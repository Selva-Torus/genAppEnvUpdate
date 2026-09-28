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
import PageAddcertificatetemplatepage2 from '@/app/addcertificatetemplate_v1/addcertificatetemplate_v1page';
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

  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fde, setcertificate_group22fde}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fdeProps, setcertificate_group22fdeProps}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349, setcert_template_table75349}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349Props, setcert_template_table75349Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_ide73a9, setcert_template_ide73a9}= useContext(TotalContext) as TotalContextProps;
  const {template_codee3093, settemplate_codee3093}= useContext(TotalContext) as TotalContextProps;
  const {template_name9efc0, settemplate_name9efc0}= useContext(TotalContext) as TotalContextProps;
  const {applies_tier_code868b4, setapplies_tier_code868b4}= useContext(TotalContext) as TotalContextProps;
  const {applies_use_case027eb, setapplies_use_case027eb}= useContext(TotalContext) as TotalContextProps;
  const {applies_asset_typedf4bf, setapplies_asset_typedf4bf}= useContext(TotalContext) as TotalContextProps;
  const {validity_months2ae89, setvalidity_months2ae89}= useContext(TotalContext) as TotalContextProps;
  const {template_versionfb750, settemplate_versionfb750}= useContext(TotalContext) as TotalContextProps;
  const {is_active62f0c, setis_active62f0c}= useContext(TotalContext) as TotalContextProps;
  const {view_btnf8a06, setview_btnf8a06}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn6f608, setedit_btn6f608}= useContext(TotalContext) as TotalContextProps;
  const {del_btn55486, setdel_btn55486}= useContext(TotalContext) as TotalContextProps;
  const {addcertificatetemplate_v1Props, setaddcertificatetemplate_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btnd7e8a, setupdate_btnd7e8a}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  const {save_btn7ae94, setsave_btn7ae94}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['group'] = group12090,
      codeStates['setgroup'] = setgroup12090,
      codeStates['group12090'] = group12090Props,
      codeStates['setgroup12090'] = setgroup12090Props,
      codeStates['certificate_group'] = certificate_group22fde,
      codeStates['setcertificate_group'] = setcertificate_group22fde,
      codeStates['certificate_group22fde'] = certificate_group22fdeProps,
      codeStates['setcertificate_group22fde'] = setcertificate_group22fdeProps,
      codeStates['structed_cert_group'] = structed_cert_groupe6058,
      codeStates['setstructed_cert_group'] = setstructed_cert_groupe6058,
      codeStates['structed_cert_groupe6058'] = structed_cert_groupe6058Props,
      codeStates['setstructed_cert_groupe6058'] = setstructed_cert_groupe6058Props,
      codeStates['light_weight_group'] = light_weight_group15e17,
      codeStates['setlight_weight_group'] = setlight_weight_group15e17,
      codeStates['light_weight_group15e17'] = light_weight_group15e17Props,
      codeStates['setlight_weight_group15e17'] = setlight_weight_group15e17Props,
      codeStates['cert_template_table'] = cert_template_table75349,
      codeStates['setcert_template_table'] = setcert_template_table75349,
      codeStates['cert_template_table75349'] = cert_template_table75349Props,
      codeStates['setcert_template_table75349'] = setcert_template_table75349Props,
      codeStates['cert_template_id'] = cert_template_ide73a9,
      codeStates['setcert_template_id'] = setcert_template_ide73a9,
      codeStates['template_code'] = template_codee3093,
      codeStates['settemplate_code'] = settemplate_codee3093,
      codeStates['template_name'] = template_name9efc0,
      codeStates['settemplate_name'] = settemplate_name9efc0,
      codeStates['applies_tier_code'] = applies_tier_code868b4,
      codeStates['setapplies_tier_code'] = setapplies_tier_code868b4,
      codeStates['applies_use_case'] = applies_use_case027eb,
      codeStates['setapplies_use_case'] = setapplies_use_case027eb,
      codeStates['applies_asset_type'] = applies_asset_typedf4bf,
      codeStates['setapplies_asset_type'] = setapplies_asset_typedf4bf,
      codeStates['validity_months'] = validity_months2ae89,
      codeStates['setvalidity_months'] = setvalidity_months2ae89,
      codeStates['template_version'] = template_versionfb750,
      codeStates['settemplate_version'] = settemplate_versionfb750,
      codeStates['is_active'] = is_active62f0c,
      codeStates['setis_active'] = setis_active62f0c,
      codeStates['view_btn'] = view_btnf8a06,
      codeStates['setview_btn'] = setview_btnf8a06,
      codeStates['edit_btn'] = edit_btn6f608,
      codeStates['setedit_btn'] = setedit_btn6f608,
      codeStates['del_btn'] = del_btn55486,
      codeStates['setdel_btn'] = setdel_btn55486,
      codeStates['addcertificatetemplate_v1'] = addcertificatetemplate_v1Props,
      codeStates['setaddcertificatetemplate_v1'] = setaddcertificatetemplate_v1Props,
      codeStates['update_btn'] = update_btnd7e8a,
      codeStates['setupdate_btn'] = setupdate_btnd7e8a,
      codeStates['dynamicaction'] = dynamicactionb465f,
      codeStates['setdynamicaction'] = setdynamicactionb465f,
      codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
      codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
      codeStates['save_btn'] = save_btn7ae94,
      codeStates['setsave_btn'] = setsave_btn7ae94,
      codeStates['template_detail_group'] = template_detail_groupec16d,
      codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
      codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
      codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
      codeStates['additional_info_group'] = additional_info_group23860,
      codeStates['setadditional_info_group'] = setadditional_info_group23860,
      codeStates['additional_info_group23860'] = additional_info_group23860Props,
      codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
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
        "761369011c04450ab6ee02076f475349",
        "117b31873b5845c18f7b09f00f16f608"
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
      if (id === "edit_btn6f608") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_btn6f608?.refresh])


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
    setaddcertificatetemplate_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //enableElement
    setupdate_btnd7e8a((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_btn7ae94((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,template_detail_groupec16dProps?.controls);
    settemplate_detail_groupec16d(bindData8||{})
    settemplate_detail_groupec16dProps({...template_detail_groupec16dProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,additional_info_group23860Props?.controls);
    setadditional_info_group23860(bindData10||{})
    setadditional_info_group23860Props({...additional_info_group23860Props,presetValues:{...(mainData||{})}})
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

 if (edit_btn6f608?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateTemplate:AFVK:v1','certificatetemplate','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Add Certification Template"
        variant="subheader-3"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addcertificatetemplate"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddcertificatetemplatepage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {edit_btn6f608?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

