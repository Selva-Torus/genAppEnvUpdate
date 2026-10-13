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
import PageTogglepopuppage2 from '@/app/togglepopup_v1/togglepopup_v1page';
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
 

const Buttonbtn_toggle = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {salary_file_overall_group144dd, setsalary_file_overall_group144dd}= useContext(TotalContext) as TotalContextProps;
  const {salary_file_overall_group144ddProps, setsalary_file_overall_group144ddProps}= useContext(TotalContext) as TotalContextProps;
  const {tab_group12ca0, settab_group12ca0}= useContext(TotalContext) as TotalContextProps;
  const {tab_group12ca0Props, settab_group12ca0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicatione8e04, setdynamicatione8e04}= useContext(TotalContext) as TotalContextProps;
  const {dynamicatione8e04Props, setdynamicatione8e04Props}= useContext(TotalContext) as TotalContextProps;
  const {btn_toggle12af0, setbtn_toggle12af0}= useContext(TotalContext) as TotalContextProps;
  const {btn_reg_mohd6fce, setbtn_reg_mohd6fce}= useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_search8289f, setreg_emplr_search8289f}= useContext(TotalContext) as TotalContextProps;
  const {search_btn1b8b6, setsearch_btn1b8b6}= useContext(TotalContext) as TotalContextProps;
  const {update_reg_employr_tab78f7d, setupdate_reg_employr_tab78f7d}= useContext(TotalContext) as TotalContextProps;
  const {update_reg_employr_tab78f7dProps, setupdate_reg_employr_tab78f7dProps}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_group25c38, setupd_reg_group25c38}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_group25c38Props, setupd_reg_group25c38Props}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_emplr_listd336e, setupd_reg_emplr_listd336e}= useContext(TotalContext) as TotalContextProps;
  const {upd_reg_emplr_listd336eProps, setupd_reg_emplr_listd336eProps}= useContext(TotalContext) as TotalContextProps;
  const {reg_empr_tabb472c, setreg_empr_tabb472c}= useContext(TotalContext) as TotalContextProps;
  const {reg_empr_tabb472cProps, setreg_empr_tabb472cProps}= useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_group1073d, setreg_emplr_group1073d}= useContext(TotalContext) as TotalContextProps;
  const {reg_emplr_group1073dProps, setreg_emplr_group1073dProps}= useContext(TotalContext) as TotalContextProps;
  const {emplr_list0e076, setemplr_list0e076}= useContext(TotalContext) as TotalContextProps;
  const {emplr_list0e076Props, setemplr_list0e076Props}= useContext(TotalContext) as TotalContextProps;
  const {togglepopup_v1Props, settogglepopup_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const dynamicatione8e04Ref = useRef(dynamicatione8e04);
  useEffect(() => {
    dynamicatione8e04Ref.current = dynamicatione8e04;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [dynamicatione8e04]);
  
  //group props in ref to access latest props value
  const dynamicatione8e04PropsRef = useRef(dynamicatione8e04Props);
  useEffect(() => {
    dynamicatione8e04PropsRef.current = dynamicatione8e04Props;
  }, [dynamicatione8e04Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['salary_file_overall_group'] = salary_file_overall_group144dd,
        codeStates['setsalary_file_overall_group'] = setsalary_file_overall_group144dd,
        codeStates['salary_file_overall_group144dd'] = salary_file_overall_group144ddProps,
        codeStates['setsalary_file_overall_group144dd'] = setsalary_file_overall_group144ddProps,
        codeStates['tab_group'] = tab_group12ca0,
        codeStates['settab_group'] = settab_group12ca0,
        codeStates['tab_group12ca0'] = tab_group12ca0Props,
        codeStates['settab_group12ca0'] = settab_group12ca0Props,
        codeStates['dynamication'] = dynamicatione8e04,
        codeStates['setdynamication'] = setdynamicatione8e04,
        codeStates['dynamicatione8e04'] = dynamicatione8e04Props,
        codeStates['setdynamicatione8e04'] = setdynamicatione8e04Props,
        codeStates['btn_toggle'] = btn_toggle12af0,
        codeStates['setbtn_toggle'] = setbtn_toggle12af0,
        codeStates['btn_reg_moh'] = btn_reg_mohd6fce,
        codeStates['setbtn_reg_moh'] = setbtn_reg_mohd6fce,
        codeStates['reg_emplr_search'] = reg_emplr_search8289f,
        codeStates['setreg_emplr_search'] = setreg_emplr_search8289f,
        codeStates['search_btn'] = search_btn1b8b6,
        codeStates['setsearch_btn'] = setsearch_btn1b8b6,
        codeStates['update_reg_employr_tab'] = update_reg_employr_tab78f7d,
        codeStates['setupdate_reg_employr_tab'] = setupdate_reg_employr_tab78f7d,
        codeStates['update_reg_employr_tab78f7d'] = update_reg_employr_tab78f7dProps,
        codeStates['setupdate_reg_employr_tab78f7d'] = setupdate_reg_employr_tab78f7dProps,
        codeStates['upd_reg_group'] = upd_reg_group25c38,
        codeStates['setupd_reg_group'] = setupd_reg_group25c38,
        codeStates['upd_reg_group25c38'] = upd_reg_group25c38Props,
        codeStates['setupd_reg_group25c38'] = setupd_reg_group25c38Props,
        codeStates['upd_reg_emplr_list'] = upd_reg_emplr_listd336e,
        codeStates['setupd_reg_emplr_list'] = setupd_reg_emplr_listd336e,
        codeStates['upd_reg_emplr_listd336e'] = upd_reg_emplr_listd336eProps,
        codeStates['setupd_reg_emplr_listd336e'] = setupd_reg_emplr_listd336eProps,
        codeStates['reg_empr_tab'] = reg_empr_tabb472c,
        codeStates['setreg_empr_tab'] = setreg_empr_tabb472c,
        codeStates['reg_empr_tabb472c'] = reg_empr_tabb472cProps,
        codeStates['setreg_empr_tabb472c'] = setreg_empr_tabb472cProps,
        codeStates['reg_emplr_group'] = reg_emplr_group1073d,
        codeStates['setreg_emplr_group'] = setreg_emplr_group1073d,
        codeStates['reg_emplr_group1073d'] = reg_emplr_group1073dProps,
        codeStates['setreg_emplr_group1073d'] = setreg_emplr_group1073dProps,
        codeStates['emplr_list'] = emplr_list0e076,
        codeStates['setemplr_list'] = setemplr_list0e076,
        codeStates['emplr_list0e076'] = emplr_list0e076Props,
        codeStates['setemplr_list0e076'] = setemplr_list0e076Props,
        codeStates['togglepopup_v1'] = togglepopup_v1Props,
        codeStates['settogglepopup_v1'] = settogglepopup_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {registration_v1, setregistration_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...dynamicatione8e04Ref.current,...data};
      let parentRowSpan = 10;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f3bd690a64e6c22c17bef34246ce8e04",
        "e208c555a7e64e22bede0c300c812af0"
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
    if(orchestrationData?.data?.rule?.nodes?.length > 0){
      setRulseData(orchestrationData?.data?.rule.nodes)
      let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj,session:decodedTokenObj,...data,...memoryVariables});
      // schemaFlag =schemaFlag.output;
      let order:number = Number(schemaFlag.order);

      // Update grid position based on order number
      
      if (order && typeof order === 'number') {
        const position : any = getGridPositionFromOrder(order,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      } else if( "start" in schemaFlag && "end" in schemaFlag)
      {
        const position : any = getGridPositionFromOrder(schemaFlag,parentRowSpan);
        setGridPosition(position);
        setStyleSate({gridColumn: position.gridColumn, gridRow: position.gridRow, gap:`12px`, height: `100%`, overflow: 'auto', pointerEvents: schemaFlag.output ? 'auto' : 'none'})
      }
      else{
        setStyleSate({ pointerEvents: 'auto'})
      } 

      if (schemaFlag.output !== "true") {
        setShowFlag(false);
      }else{
        setShowFlag(true)
      }
    }else if(dynamicatione8e04Props?.isHaveRule==true){
      if("btn_toggle" in dynamicatione8e04Props?.dynamicActionRule){
        setShowFlag(true)
        setStyleSate({...getGridPositionFromOrder(dynamicatione8e04Props?.dynamicActionRule?.btn_toggle,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }
      else
      {
        setShowFlag(false)   
      }
    }
    else {
      if("btn_toggle" in registration_v1?.dynamication && registration_v1?.dynamication["btn_toggle"]?.itsHaveArtifact== true)
      {
        setShowFlag(registration_v1?.dynamication["btn_toggle"]?.show||false)
        
        setStyleSate({...getGridPositionFromOrder(registration_v1?.dynamication?.btn_toggle?.order,parentRowSpan)||{}, gap:`12px`, height: `100%`, overflow: 'auto'})
      }else{
        setShowFlag(false)
      }
    }
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    const handler = async (id:any) => {
      if (id === "btn_toggle12af0") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "e208c555a7e64e22bede0c300c812af0") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "btn_toggle12af0");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!btn_toggle12af0?.trigger) return;
      if(btn_toggle12af0?.trigger){
      setbtn_toggle12af0((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[btn_toggle12af0?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(btn_toggle12af0?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[btn_toggle12af0?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, registration_v1: {} }));
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
        setdynamicatione8e04((prev: any) => ({ ...prev, btn_toggle: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...salary_file_overall_group144dd,...tab_group12ca0,...update_reg_employr_tab78f7d,...upd_reg_group25c38,...reg_empr_tabb472c,...reg_emplr_group1073d,...dynamicatione8e04});
    settogglepopup_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setdynamicatione8e04((prev: any) => ({ ...prev, btn_toggle: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setdynamicatione8e04((prev: any) => ({ ...prev, btn_toggle: false }));
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

    useEffect(() => {
    let forGetFormDataPointedData = {
      };
      handleMapper(forGetFormDataPointedData);

  }, [registration_v1?.dynamication?.btn_toggle,dynamicatione8e04Props?.dynamicActionRule?.btn_toggle,])
 if (btn_toggle12af0?.isHidden) {
    return <></>
  }

  return (
    <div
      style={styleSate}
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageTogglepopuppage2 onReady={handleAssetPageReady}/>
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
        title="Toggle"
        variant="subheader-3"
        ready={assetDataReady}
        showOverlay = {false}
        position = {"center"}
        modalName = "togglepopup"
        className='w-[500px] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageTogglepopuppage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!rounded-md !text-black"
          onClick={handleClick}
          view='normal-contrast'
          disabled= {btn_toggle12af0?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Toggle")}
        </Button>}
      </div>
    
  )
}

export default Buttonbtn_toggle

