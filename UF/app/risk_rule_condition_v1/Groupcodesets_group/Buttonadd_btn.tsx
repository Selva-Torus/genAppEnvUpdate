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
import PageAddriskruleconditionpage6 from '@/app/addriskrulecondition_v1/addriskrulecondition_v1page';
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
 

const Buttonadd_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {codesets_group1c519, setcodesets_group1c519}= useContext(TotalContext) as TotalContextProps;
  const {codesets_group1c519Props, setcodesets_group1c519Props}= useContext(TotalContext) as TotalContextProps;
  const {textbc13a, settextbc13a}= useContext(TotalContext) as TotalContextProps;
  const {ref_btnf4142, setref_btnf4142}= useContext(TotalContext) as TotalContextProps;
  const {search_btn05bb6, setsearch_btn05bb6}= useContext(TotalContext) as TotalContextProps;
  const {add_btn6f87e, setadd_btn6f87e}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41f, setrule_condition_table7b41f}= useContext(TotalContext) as TotalContextProps;
  const {rule_condition_table7b41fProps, setrule_condition_table7b41fProps}= useContext(TotalContext) as TotalContextProps;
  const {update_btn0e469, setupdate_btn0e469}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461, setdynamicactions0c461}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions0c461Props, setdynamicactions0c461Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btn86246, setsave_btn86246}= useContext(TotalContext) as TotalContextProps;
  const {addriskrulecondition_v1Props, setaddriskrulecondition_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const codesets_group1c519Ref = useRef(codesets_group1c519);
  useEffect(() => {
    codesets_group1c519Ref.current = codesets_group1c519;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [codesets_group1c519]);
  
  //group props in ref to access latest props value
  const codesets_group1c519PropsRef = useRef(codesets_group1c519Props);
  useEffect(() => {
    codesets_group1c519PropsRef.current = codesets_group1c519Props;
  }, [codesets_group1c519Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['codesets_group'] = codesets_group1c519,
        codeStates['setcodesets_group'] = setcodesets_group1c519,
        codeStates['codesets_group1c519'] = codesets_group1c519Props,
        codeStates['setcodesets_group1c519'] = setcodesets_group1c519Props,
        codeStates['text'] = textbc13a,
        codeStates['settext'] = settextbc13a,
        codeStates['ref_btn'] = ref_btnf4142,
        codeStates['setref_btn'] = setref_btnf4142,
        codeStates['search_btn'] = search_btn05bb6,
        codeStates['setsearch_btn'] = setsearch_btn05bb6,
        codeStates['add_btn'] = add_btn6f87e,
        codeStates['setadd_btn'] = setadd_btn6f87e,
        codeStates['rule_condition_table'] = rule_condition_table7b41f,
        codeStates['setrule_condition_table'] = setrule_condition_table7b41f,
        codeStates['rule_condition_table7b41f'] = rule_condition_table7b41fProps,
        codeStates['setrule_condition_table7b41f'] = setrule_condition_table7b41fProps,
        codeStates['update_btn'] = update_btn0e469,
        codeStates['setupdate_btn'] = setupdate_btn0e469,
        codeStates['dynamicactions'] = dynamicactions0c461,
        codeStates['setdynamicactions'] = setdynamicactions0c461,
        codeStates['dynamicactions0c461'] = dynamicactions0c461Props,
        codeStates['setdynamicactions0c461'] = setdynamicactions0c461Props,
        codeStates['save_btn'] = save_btn86246,
        codeStates['setsave_btn'] = setsave_btn86246,
        codeStates['addriskrulecondition_v1'] = addriskrulecondition_v1Props,
        codeStates['setaddriskrulecondition_v1'] = setaddriskrulecondition_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {rulecondition_v1, setrulecondition_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...codesets_group1c519Ref.current,...data};
      let parentRowSpan = 141;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "ceb0260ac310f5640f2af3c83341c519",
        "e66b8722e400ff8c917fe67a9f46f87e"
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
      if (id === "add_btn6f87e") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "e66b8722e400ff8c917fe67a9f46f87e") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "add_btn6f87e");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!add_btn6f87e?.trigger) return;
      if(add_btn6f87e?.trigger){
      setadd_btn6f87e((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[add_btn6f87e?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
    if(add_btn6f87e?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[add_btn6f87e?.refresh])
  

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
        setcodesets_group1c519((prev: any) => ({ ...prev, add_btn: true }));
        //onClick

    //disableElement
    setupdate_btn0e469((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setsave_btn86246((prev: any) => ({ ...prev, isDisabled: false }));
    // showArtifactAsModal
    let filterProps6:any =  [];
      let filterData6 = await getFilterProps(filterProps6,{...codesets_group1c519});
    setaddriskrulecondition_v1Props([...filterData6 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen6(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setcodesets_group1c519((prev: any) => ({ ...prev, add_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setcodesets_group1c519((prev: any) => ({ ...prev, add_btn: false }));
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

 if (add_btn6f87e?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `21 / 25`,gridRow: `2 / 9`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen6 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddriskruleconditionpage6 onReady={handleAssetPageReady}/>
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
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addriskrulecondition"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddriskruleconditionpage6  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {add_btn6f87e?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Add Condition")}
        </Button>}
      </div>
    
  )
}

export default Buttonadd_btn

