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
import { Rangerscan, Scan } from '@/app/utils/scanService';
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { v4 as uuidv4 } from 'uuid';
import { clampTransactionIndex, getTransactionAt, getTransactionNames, removeTransaction } from '@/app/utils/scanQueue';
import PageApplycertificationpage4 from '@/app/applycertification_v1/applycertification_v1page';
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
 

const Buttonapply_cert_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const allState:any= useContext(TotalContext) as TotalContextProps;
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
  const [showProfileAsModalOpen4, setShowProfileAsModalOpen4] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_groupae13f, setoverall_groupae13f}= useContext(TotalContext) as TotalContextProps;
  const {overall_groupae13fProps, setoverall_groupae13fProps}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group35701, setai_asset_version_table_group35701}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_version_table_group35701Props, setai_asset_version_table_group35701Props}= useContext(TotalContext) as TotalContextProps;
  const {apply_cert_btn37cfa, setapply_cert_btn37cfa}= useContext(TotalContext) as TotalContextProps;
  const {groupf74cc, setgroupf74cc}= useContext(TotalContext) as TotalContextProps;
  const {groupf74ccProps, setgroupf74ccProps}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32ae, setcertificate_tablea32ae}= useContext(TotalContext) as TotalContextProps;
  const {certificate_tablea32aeProps, setcertificate_tablea32aeProps}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9, setmodel_info_group425e9}= useContext(TotalContext) as TotalContextProps;
  const {model_info_group425e9Props, setmodel_info_group425e9Props}= useContext(TotalContext) as TotalContextProps;
  const {applycertification_v1Props, setapplycertification_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_asset_version_table_group35701Ref = useRef(ai_asset_version_table_group35701);
  useEffect(() => {
    ai_asset_version_table_group35701Ref.current = ai_asset_version_table_group35701;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_asset_version_table_group35701]);
  
  //group props in ref to access latest props value
  const ai_asset_version_table_group35701PropsRef = useRef(ai_asset_version_table_group35701Props);
  useEffect(() => {
    ai_asset_version_table_group35701PropsRef.current = ai_asset_version_table_group35701Props;
  }, [ai_asset_version_table_group35701Props]);
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
        codeStates['apply_cert_btn'] = apply_cert_btn37cfa,
        codeStates['setapply_cert_btn'] = setapply_cert_btn37cfa,
        codeStates['group'] = groupf74cc,
        codeStates['setgroup'] = setgroupf74cc,
        codeStates['groupf74cc'] = groupf74ccProps,
        codeStates['setgroupf74cc'] = setgroupf74ccProps,
        codeStates['certificate_table'] = certificate_tablea32ae,
        codeStates['setcertificate_table'] = setcertificate_tablea32ae,
        codeStates['certificate_tablea32ae'] = certificate_tablea32aeProps,
        codeStates['setcertificate_tablea32ae'] = setcertificate_tablea32aeProps,
        codeStates['model_info_group'] = model_info_group425e9,
        codeStates['setmodel_info_group'] = setmodel_info_group425e9,
        codeStates['model_info_group425e9'] = model_info_group425e9Props,
        codeStates['setmodel_info_group425e9'] = setmodel_info_group425e9Props,
        codeStates['applycertification_v1'] = applycertification_v1Props,
        codeStates['setapplycertification_v1'] = setapplycertification_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {agentcertificates_v1, setagentcertificates_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_asset_version_table_group35701Ref.current,...data};
      let parentRowSpan = 148;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "655d2e69f8c10c8a0c88a8dea2c35701",
        "2a04ffdc046149b3a273ce87c6737cfa"
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
      if (id === "apply_cert_btn37cfa") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "2a04ffdc046149b3a273ce87c6737cfa") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "apply_cert_btn37cfa");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!apply_cert_btn37cfa?.trigger) return;
      if(apply_cert_btn37cfa?.trigger){
      setapply_cert_btn37cfa((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[apply_cert_btn37cfa?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen4(false)
    if(apply_cert_btn37cfa?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[apply_cert_btn37cfa?.refresh])
  

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

  useEffect(() => {
    return () => {
      // Leaving the screen → wipe validation results and the Save counter
      setValidate((pre: any) => ({ ...pre, agentCertificates_v1: {} }));
      setValidateRefetch((pre: any) => ({ ...pre, init: 0 }));
    };
  }, []);
  const handleClick=async(showModal: boolean = true)=>{
    if (!showModal && preloadDone.current) return;
    if (!showModal) preloadDone.current = true;
    setHiddenModalForTrigger(!showModal);
    let getSelectedImageData:any ={}
    try{
      setIsProcessing(true);
        setai_asset_version_table_group35701((prev: any) => ({ ...prev, apply_cert_btn: true }));
        //onClick

    //bindTran
    // For group or table
    setmodel_info_group425e9({...model_info_group425e9,...ai_asset_version_table_group35701||{}})
    setmodel_info_group425e9Props({...model_info_group425e9Props,presetValues:ai_asset_version_table_group35701||{}})  
    // showArtifactAsModal
    let filterProps4:any =  [];
      let filterData4 = await getFilterProps(filterProps4,{...overall_groupae13f,...groupf74cc,...ai_asset_version_table_group35701});
    setapplycertification_v1Props([...filterData4 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen4(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_asset_version_table_group35701((prev: any) => ({ ...prev, apply_cert_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setai_asset_version_table_group35701((prev: any) => ({ ...prev, apply_cert_btn: false }));
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
 if (apply_cert_btn37cfa?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 9`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen4 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageApplycertificationpage4 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen4 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen4(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Apply Certificate"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "applycertification"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageApplycertificationpage4  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-md !bg-[#635BFF] hover:!bg-[#635BFF] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {apply_cert_btn37cfa?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Apply Certificate")}
        </Button>}
      </div>
    
  )
}

export default Buttonapply_cert_btn

