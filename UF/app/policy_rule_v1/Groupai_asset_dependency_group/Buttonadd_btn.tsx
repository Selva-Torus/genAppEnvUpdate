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
import PageAddpolicyrulepage2 from '@/app/addpolicyrule_v1/addpolicyrule_v1page';
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

  const {overall_group18db5, setoverall_group18db5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group18db5Props, setoverall_group18db5Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0d, setai_asset_dependency_group5fc0d}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group5fc0dProps, setai_asset_dependency_group5fc0dProps}= useContext(TotalContext) as TotalContextProps;
  const {texte6aba, settexte6aba}= useContext(TotalContext) as TotalContextProps;
  const {refresh_button56c95, setrefresh_button56c95}= useContext(TotalContext) as TotalContextProps;
  const {search94dd6, setsearch94dd6}= useContext(TotalContext) as TotalContextProps;
  const {add_btn09e47, setadd_btn09e47}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5, setpolicy_rule_table7fde5}= useContext(TotalContext) as TotalContextProps;
  const {policy_rule_table7fde5Props, setpolicy_rule_table7fde5Props}= useContext(TotalContext) as TotalContextProps;
  const {addpolicyrule_v1Props, setaddpolicyrule_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btn736ea, setsave_btn736ea}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44, setdynamicactions57d44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions57d44Props, setdynamicactions57d44Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btn8ac76, setupdate_btn8ac76}= useContext(TotalContext) as TotalContextProps;
  //////////////
  // DocumentUploader marks new files uploadPending = true; after upload it is set to false and the key kept in file.uploadedKey
  // so every button sharing the file reuses the key instead of uploading again.
  const getUploadedKey = (files: any[]) =>
    files.length && files.every((f: any) => f?.uploadPending === false && f?.uploadedKey !== undefined) ? files[0].uploadedKey : undefined;
  const markUploaded = (files: any[], key: any) => files.forEach((f: any) => { if (f) { f.uploadPending = false; f.uploadedKey = key; } });
  const pendingAutoSearch = useRef(false);
  const preloadDone = useRef(false);
  // keep update group state in ref to access latest state value
  const ai_asset_dependency_group5fc0dRef = useRef(ai_asset_dependency_group5fc0d);
  useEffect(() => {
    ai_asset_dependency_group5fc0dRef.current = ai_asset_dependency_group5fc0d;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [ai_asset_dependency_group5fc0d]);
  
  //group props in ref to access latest props value
  const ai_asset_dependency_group5fc0dPropsRef = useRef(ai_asset_dependency_group5fc0dProps);
  useEffect(() => {
    ai_asset_dependency_group5fc0dPropsRef.current = ai_asset_dependency_group5fc0dProps;
  }, [ai_asset_dependency_group5fc0dProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_group'] = overall_group18db5,
        codeStates['setoverall_group'] = setoverall_group18db5,
        codeStates['overall_group18db5'] = overall_group18db5Props,
        codeStates['setoverall_group18db5'] = setoverall_group18db5Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_group5fc0d,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_group5fc0d,
        codeStates['ai_asset_dependency_group5fc0d'] = ai_asset_dependency_group5fc0dProps,
        codeStates['setai_asset_dependency_group5fc0d'] = setai_asset_dependency_group5fc0dProps,
        codeStates['text'] = texte6aba,
        codeStates['settext'] = settexte6aba,
        codeStates['refresh_button'] = refresh_button56c95,
        codeStates['setrefresh_button'] = setrefresh_button56c95,
        codeStates['search'] = search94dd6,
        codeStates['setsearch'] = setsearch94dd6,
        codeStates['add_btn'] = add_btn09e47,
        codeStates['setadd_btn'] = setadd_btn09e47,
        codeStates['policy_rule_table'] = policy_rule_table7fde5,
        codeStates['setpolicy_rule_table'] = setpolicy_rule_table7fde5,
        codeStates['policy_rule_table7fde5'] = policy_rule_table7fde5Props,
        codeStates['setpolicy_rule_table7fde5'] = setpolicy_rule_table7fde5Props,
        codeStates['addpolicyrule_v1'] = addpolicyrule_v1Props,
        codeStates['setaddpolicyrule_v1'] = setaddpolicyrule_v1Props,
        codeStates['save_btn'] = save_btn736ea,
        codeStates['setsave_btn'] = setsave_btn736ea,
        codeStates['dynamicactions'] = dynamicactions57d44,
        codeStates['setdynamicactions'] = setdynamicactions57d44,
        codeStates['dynamicactions57d44'] = dynamicactions57d44Props,
        codeStates['setdynamicactions57d44'] = setdynamicactions57d44Props,
        codeStates['update_btn'] = update_btn8ac76,
        codeStates['setupdate_btn'] = setupdate_btn8ac76,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {policyrulelist_v1, setpolicyrulelist_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...ai_asset_dependency_group5fc0dRef.current,...data};
      let parentRowSpan = 127;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "f8e3e11717928951aa20a88c01a5fc0d",
        "1545ed5392163fcc9ee3c1e2dd309e47"
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
      if (id === "add_btn09e47") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "1545ed5392163fcc9ee3c1e2dd309e47") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "add_btn09e47");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);
   useEffect(()=>{
    if (add_btn09e47?.trigger) 
    {
      handleClick()
      setadd_btn09e47((prev:any) => ({...prev, trigger: false}));
    }
  },[add_btn09e47?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(add_btn09e47?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[add_btn09e47?.refresh])
  

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
      setValidate((pre: any) => ({ ...pre, policyRuleList_v1: {} }));
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
        setai_asset_dependency_group5fc0d((prev: any) => ({ ...prev, add_btn: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...overall_group18db5,...ai_asset_dependency_group5fc0d});
    setaddpolicyrule_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);

    //enableElement
    setsave_btn736ea((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setupdate_btn8ac76((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setai_asset_dependency_group5fc0d((prev: any) => ({ ...prev, add_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else if(err instanceof Error)
        toast(err.message, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setai_asset_dependency_group5fc0d((prev: any) => ({ ...prev, add_btn: false }));
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

  if (add_btn09e47?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddpolicyrulepage2 onReady={handleAssetPageReady}/>
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
        title="Add Policy Rule"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addpolicyrule"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddpolicyrulepage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#635BFF] hover:!bg-[#635BFF] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='action'
          disabled= {add_btn09e47?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Add Policy")}
        </Button>}
      </div>
    
  )
}

export default Buttonadd_btn

