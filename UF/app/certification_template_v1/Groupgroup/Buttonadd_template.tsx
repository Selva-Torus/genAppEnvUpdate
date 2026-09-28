'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
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
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageAddcertificatetemplatepage6 from '@/app/addcertificatetemplate_v1/addcertificatetemplate_v1page';
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
 

const Buttonadd_template = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({})
  const validateRef = useRef<any>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const [styleSate, setStyleSate] = useState<any>({})
  const lockMode:any = lockedData.lockMode;
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
    const [hiddenModalForTrigger, setHiddenModalForTrigger] = React.useState<boolean>(false);  
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {group12090, setgroup12090}= useContext(TotalContext) as TotalContextProps;
  const {group12090Props, setgroup12090Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_headingab3bd, setcert_template_headingab3bd}= useContext(TotalContext) as TotalContextProps;
  const {refresh_btn8fd10, setrefresh_btn8fd10}= useContext(TotalContext) as TotalContextProps;
  const {search_btn0ba97, setsearch_btn0ba97}= useContext(TotalContext) as TotalContextProps;
  const {add_template995c3, setadd_template995c3}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fde, setcertificate_group22fde}= useContext(TotalContext) as TotalContextProps;
  const {certificate_group22fdeProps, setcertificate_group22fdeProps}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058, setstructed_cert_groupe6058}= useContext(TotalContext) as TotalContextProps;
  const {structed_cert_groupe6058Props, setstructed_cert_groupe6058Props}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17, setlight_weight_group15e17}= useContext(TotalContext) as TotalContextProps;
  const {light_weight_group15e17Props, setlight_weight_group15e17Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349, setcert_template_table75349}= useContext(TotalContext) as TotalContextProps;
  const {cert_template_table75349Props, setcert_template_table75349Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btnd7e8a, setupdate_btnd7e8a}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465f, setdynamicactionb465f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionb465fProps, setdynamicactionb465fProps}= useContext(TotalContext) as TotalContextProps;
  const {save_btn7ae94, setsave_btn7ae94}= useContext(TotalContext) as TotalContextProps;
  const {addcertificatetemplate_v1Props, setaddcertificatetemplate_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16d, settemplate_detail_groupec16d}= useContext(TotalContext) as TotalContextProps;
  const {template_detail_groupec16dProps, settemplate_detail_groupec16dProps}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860, setadditional_info_group23860}= useContext(TotalContext) as TotalContextProps;
  const {additional_info_group23860Props, setadditional_info_group23860Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const group12090Ref = useRef(group12090);
  useEffect(() => {
    group12090Ref.current = group12090;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group12090]);
  
  //group props in ref to access latest props value
  const group12090PropsRef = useRef(group12090Props);
  useEffect(() => {
    group12090PropsRef.current = group12090Props;
  }, [group12090Props]);
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
        codeStates['cert_template_heading'] = cert_template_headingab3bd,
        codeStates['setcert_template_heading'] = setcert_template_headingab3bd,
        codeStates['refresh_btn'] = refresh_btn8fd10,
        codeStates['setrefresh_btn'] = setrefresh_btn8fd10,
        codeStates['search_btn'] = search_btn0ba97,
        codeStates['setsearch_btn'] = setsearch_btn0ba97,
        codeStates['add_template'] = add_template995c3,
        codeStates['setadd_template'] = setadd_template995c3,
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
        codeStates['update_btn'] = update_btnd7e8a,
        codeStates['setupdate_btn'] = setupdate_btnd7e8a,
        codeStates['dynamicaction'] = dynamicactionb465f,
        codeStates['setdynamicaction'] = setdynamicactionb465f,
        codeStates['dynamicactionb465f'] = dynamicactionb465fProps,
        codeStates['setdynamicactionb465f'] = setdynamicactionb465fProps,
        codeStates['save_btn'] = save_btn7ae94,
        codeStates['setsave_btn'] = setsave_btn7ae94,
        codeStates['addcertificatetemplate_v1'] = addcertificatetemplate_v1Props,
        codeStates['setaddcertificatetemplate_v1'] = setaddcertificatetemplate_v1Props,
        codeStates['template_detail_group'] = template_detail_groupec16d,
        codeStates['settemplate_detail_group'] = settemplate_detail_groupec16d,
        codeStates['template_detail_groupec16d'] = template_detail_groupec16dProps,
        codeStates['settemplate_detail_groupec16d'] = settemplate_detail_groupec16dProps,
        codeStates['additional_info_group'] = additional_info_group23860,
        codeStates['setadditional_info_group'] = setadditional_info_group23860,
        codeStates['additional_info_group23860'] = additional_info_group23860Props,
        codeStates['setadditional_info_group23860'] = setadditional_info_group23860Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {certificatetemplate_v1, setcertificatetemplate_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...group12090Ref.current,...data};
      let parentRowSpan = 145;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4e68ca067e2d4f93937e0aa1e7f12090",
        "ef9c0cd1d89c4bbfba438bd07d5995c3"
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

    /////////
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "add_template995c3") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "ef9c0cd1d89c4bbfba438bd07d5995c3") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "add_template995c3");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!add_template995c3?.trigger) return;
      if(add_template995c3?.trigger){
      setadd_template995c3((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[add_template995c3?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
    if(add_template995c3?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[add_template995c3?.refresh])
  

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

  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setgroup12090((prev: any) => ({ ...prev, add_template: true }));
        //onClick

    //disableElement
    setupdate_btnd7e8a((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setsave_btn7ae94((prev: any) => ({ ...prev, isDisabled: false }));
    // showArtifactAsModal
    let filterProps6:any =  [];
      let filterData6 = await getFilterProps(filterProps6,{...certificate_group22fde,...structed_cert_groupe6058,...light_weight_group15e17,...group12090});
    setaddcertificatetemplate_v1Props([...filterData6 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen6(true);
    //bindTran
    // For group or table
    settemplate_detail_groupec16d({...template_detail_groupec16d,...group12090||{}})
    settemplate_detail_groupec16dProps({...template_detail_groupec16dProps,presetValues:group12090||{}})  
    //bindTran
    // For group or table
    setadditional_info_group23860({...additional_info_group23860,...group12090||{}})
    setadditional_info_group23860Props({...additional_info_group23860Props,presetValues:group12090||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup12090((prev: any) => ({ ...prev, add_template: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setgroup12090((prev: any) => ({ ...prev, add_template: false }));
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

 if (add_template995c3?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `21 / 24`,gridRow: `2 / 9`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen6 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddcertificatetemplatepage6 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen6 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setHiddenModalForTrigger(false)
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
        {!hiddenModalForTrigger && <PageAddcertificatetemplatepage6  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {add_template995c3?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Add Template")}
        </Button>}
      </div>
    
  )
}

export default Buttonadd_template

