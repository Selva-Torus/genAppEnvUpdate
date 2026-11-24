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
import { getPublicEnv } from "@/app/components/public-env";
import PageBeneficiarylistpopuppage2 from '@/app/beneficiarylistpopup_v1/beneficiarylistpopup_v1page';
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
 

const Buttoncr_benif_action = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {creditor_info_label_text02833, setcreditor_info_label_text02833}= useContext(TotalContext) as TotalContextProps;
  const {ben_checkbox780b4, setben_checkbox780b4}= useContext(TotalContext) as TotalContextProps;
  const {cr_account3b649, setcr_account3b649}= useContext(TotalContext) as TotalContextProps;
  const {cr_namee0835, setcr_namee0835}= useContext(TotalContext) as TotalContextProps;
  const {cr_street_name21bab, setcr_street_name21bab}= useContext(TotalContext) as TotalContextProps;
  const {cr_benif_action9998d, setcr_benif_action9998d}= useContext(TotalContext) as TotalContextProps;
  const {cr_building_namea6ac7, setcr_building_namea6ac7}= useContext(TotalContext) as TotalContextProps;
  const {cr_floor44bed, setcr_floor44bed}= useContext(TotalContext) as TotalContextProps;
  const {cr_post_codef645b, setcr_post_codef645b}= useContext(TotalContext) as TotalContextProps;
  const {cr_town_nameed852, setcr_town_nameed852}= useContext(TotalContext) as TotalContextProps;
  const {cr_country38218, setcr_country38218}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencyb2ebe, setcr_currencyb2ebe}= useContext(TotalContext) as TotalContextProps;
  const {exchange_rate86282, setexchange_rate86282}= useContext(TotalContext) as TotalContextProps;
  const {cr_amountbd2bf, setcr_amountbd2bf}= useContext(TotalContext) as TotalContextProps;
  const {cr_bank_code76d12, setcr_bank_code76d12}= useContext(TotalContext) as TotalContextProps;
  const {cr_clr_code4387d, setcr_clr_code4387d}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  const {beneficiarylistpopup_v1Props, setbeneficiarylistpopup_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const cr_info_groupb01e8Ref = useRef(cr_info_groupb01e8);
  useEffect(() => {
    cr_info_groupb01e8Ref.current = cr_info_groupb01e8;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [cr_info_groupb01e8]);
  
  //group props in ref to access latest props value
  const cr_info_groupb01e8PropsRef = useRef(cr_info_groupb01e8Props);
  useEffect(() => {
    cr_info_groupb01e8PropsRef.current = cr_info_groupb01e8Props;
  }, [cr_info_groupb01e8Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['creditor_info_label_text'] = creditor_info_label_text02833,
        codeStates['setcreditor_info_label_text'] = setcreditor_info_label_text02833,
        codeStates['ben_checkbox'] = ben_checkbox780b4,
        codeStates['setben_checkbox'] = setben_checkbox780b4,
        codeStates['cr_account'] = cr_account3b649,
        codeStates['setcr_account'] = setcr_account3b649,
        codeStates['cr_name'] = cr_namee0835,
        codeStates['setcr_name'] = setcr_namee0835,
        codeStates['cr_street_name'] = cr_street_name21bab,
        codeStates['setcr_street_name'] = setcr_street_name21bab,
        codeStates['cr_benif_action'] = cr_benif_action9998d,
        codeStates['setcr_benif_action'] = setcr_benif_action9998d,
        codeStates['cr_building_name'] = cr_building_namea6ac7,
        codeStates['setcr_building_name'] = setcr_building_namea6ac7,
        codeStates['cr_floor'] = cr_floor44bed,
        codeStates['setcr_floor'] = setcr_floor44bed,
        codeStates['cr_post_code'] = cr_post_codef645b,
        codeStates['setcr_post_code'] = setcr_post_codef645b,
        codeStates['cr_town_name'] = cr_town_nameed852,
        codeStates['setcr_town_name'] = setcr_town_nameed852,
        codeStates['cr_country'] = cr_country38218,
        codeStates['setcr_country'] = setcr_country38218,
        codeStates['cr_currency'] = cr_currencyb2ebe,
        codeStates['setcr_currency'] = setcr_currencyb2ebe,
        codeStates['exchange_rate'] = exchange_rate86282,
        codeStates['setexchange_rate'] = setexchange_rate86282,
        codeStates['cr_amount'] = cr_amountbd2bf,
        codeStates['setcr_amount'] = setcr_amountbd2bf,
        codeStates['cr_bank_code'] = cr_bank_code76d12,
        codeStates['setcr_bank_code'] = setcr_bank_code76d12,
        codeStates['cr_clr_code'] = cr_clr_code4387d,
        codeStates['setcr_clr_code'] = setcr_clr_code4387d,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
        codeStates['beneficiarylistpopup_v1'] = beneficiarylistpopup_v1Props,
        codeStates['setbeneficiarylistpopup_v1'] = setbeneficiarylistpopup_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {paymentinfo_v1, setpaymentinfo_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...cr_info_groupb01e8Ref.current,...data};
      let parentRowSpan = 88;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "18502770a2a84feb968a3817c35b01e8",
        "f489f79e864a438385203b6d52e9998d"
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
      if (id === "cr_benif_action9998d") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "f489f79e864a438385203b6d52e9998d") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "cr_benif_action9998d");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (cr_benif_action9998d?.trigger) 
    {
      handleClick()
      setcr_benif_action9998d((prev:any) => ({...prev, trigger: false}));
    }
  },[cr_benif_action9998d?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(cr_benif_action9998d?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[cr_benif_action9998d?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, paymentInfo_v1: {} }));
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
        setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_benif_action: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT005:FNGK:AF:FNK:DF-DFD:CATK:GSS:AFGK:SMX:AFK:beneficiaryListQuery:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "add2082db87f4245b261c1142eee6df0",
        "object": {
          "properties.account": "298fc2aaf9484e5296600d189e3a8f91"
        }
      }
    ]
  }
];
      let filterData2 = await getFilterProps(filterProps2,{...payment_info_group1bac9,...midynamicactions3b39d,...general_info_groupc83e6,...dbtr_info_group4e8ea,...chrg_info_group76ab0,...add_info_groupe8dc6,...cr_info_groupb01e8});
    setbeneficiarylistpopup_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);

      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_benif_action: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setcr_info_groupb01e8((prev: any) => ({ ...prev, cr_benif_action: false }));
    }
  }
   const handleAssetPageReady = () => {
    setAssetDataReady(true);
    setIsProcessing(false);
  }
   let itsHaveSaveSessionData:any= false
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

  if (cr_benif_action9998d?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `8 / 9`,gridRow: `13 / 22`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageBeneficiarylistpopuppage2 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => {
          setShowProfileAsModalOpen2(false);
          setHiddenModalForTrigger(false)
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "beneficiarylistpopup"
        className='w-[800px] h-[550px] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageBeneficiarylistpopuppage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!text-black"
          onClick={handleClick}
          view='flat'
          disabled= {cr_benif_action9998d?.isDisabled ? true : false}
          pin='clear-clear'
          contentAlign={"left"}
          icon="MdInput"
          iconDisplay='Icon only'
        >
          {keyset("")}
        </Button>}
      </div>
    
  )
}

export default Buttoncr_benif_action

