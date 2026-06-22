'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import { exportJsonToExcel } from '@/app/utils/jsonToExcel';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import PageInitiateassetdisposalpage2 from '@/app/initiateassetdisposal_v1/initiateassetdisposal_v1page';
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
 

const Buttoninitiate_disposal = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_disposal_group04cba, setoverall_disposal_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_disposal_group04cbaProps, setoverall_disposal_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8c, seticon_text_group23d8c}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8cProps, seticon_text_group23d8cProps}= useContext(TotalContext) as TotalContextProps;
  const {searchc5de1, setsearchc5de1}= useContext(TotalContext) as TotalContextProps;
  const {initiate_disposal27af5, setinitiate_disposal27af5}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5d, setdisposal_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5dProps, setdisposal_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {initiateassetdisposal_v1Props, setinitiateassetdisposal_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {initiate_disposal1b938, setinitiate_disposal1b938}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ff, setdynamicactions9a7ff}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions9a7ffProps, setdynamicactions9a7ffProps}= useContext(TotalContext) as TotalContextProps;
  const {update92b0c, setupdate92b0c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const overall_disposal_group04cbaRef = useRef(overall_disposal_group04cba);
  useEffect(() => {
    overall_disposal_group04cbaRef.current = overall_disposal_group04cba;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [overall_disposal_group04cba]);
  
  //group props in ref to access latest props value
  const overall_disposal_group04cbaPropsRef = useRef(overall_disposal_group04cbaProps);
  useEffect(() => {
    overall_disposal_group04cbaPropsRef.current = overall_disposal_group04cbaProps;
  }, [overall_disposal_group04cbaProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_disposal_group'] = overall_disposal_group04cba,
        codeStates['setoverall_disposal_group'] = setoverall_disposal_group04cba,
        codeStates['overall_disposal_group04cba'] = overall_disposal_group04cbaProps,
        codeStates['setoverall_disposal_group04cba'] = setoverall_disposal_group04cbaProps,
        codeStates['icon_text_group'] = icon_text_group23d8c,
        codeStates['seticon_text_group'] = seticon_text_group23d8c,
        codeStates['icon_text_group23d8c'] = icon_text_group23d8cProps,
        codeStates['seticon_text_group23d8c'] = seticon_text_group23d8cProps,
        codeStates['search'] = searchc5de1,
        codeStates['setsearch'] = setsearchc5de1,
        codeStates['initiate_disposal'] = initiate_disposal27af5,
        codeStates['setinitiate_disposal'] = setinitiate_disposal27af5,
        codeStates['disposal_table'] = disposal_table75a5d,
        codeStates['setdisposal_table'] = setdisposal_table75a5d,
        codeStates['disposal_table75a5d'] = disposal_table75a5dProps,
        codeStates['setdisposal_table75a5d'] = setdisposal_table75a5dProps,
        codeStates['initiateassetdisposal_v1'] = initiateassetdisposal_v1Props,
        codeStates['setinitiateassetdisposal_v1'] = setinitiateassetdisposal_v1Props,
        codeStates['initiate_disposal'] = initiate_disposal1b938,
        codeStates['setinitiate_disposal'] = setinitiate_disposal1b938,
        codeStates['dynamicactions'] = dynamicactions9a7ff,
        codeStates['setdynamicactions'] = setdynamicactions9a7ff,
        codeStates['dynamicactions9a7ff'] = dynamicactions9a7ffProps,
        codeStates['setdynamicactions9a7ff'] = setdynamicactions9a7ffProps,
        codeStates['update'] = update92b0c,
        codeStates['setupdate'] = setupdate92b0c,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assetdisposal_v1, setassetdisposal_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...overall_disposal_group04cbaRef.current};
      let parentRowSpan = 122;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4305fe0dee294b65a71eb2d157e04cba",
        "f35f177b480f42c494895ee9c4527af5"
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
      if (id === "initiate_disposal27af5") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "f35f177b480f42c494895ee9c4527af5") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "initiate_disposal27af5");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!initiate_disposal27af5?.trigger) return;
      if(initiate_disposal27af5?.trigger){
      setinitiate_disposal27af5((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[initiate_disposal27af5?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(initiate_disposal27af5?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[initiate_disposal27af5?.refresh])

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
    setHiddenModalForTrigger(!showModal);
    try{  
      setIsProcessing(true);
        setoverall_disposal_group04cba((prev: any) => ({ ...prev, initiate_disposal: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,overall_disposal_group04cba);
    setinitiateassetdisposal_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //enableElement
    setinitiate_disposal1b938((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setupdate92b0c((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setoverall_disposal_group04cba((prev: any) => ({ ...prev, initiate_disposal: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setoverall_disposal_group04cba((prev: any) => ({ ...prev, initiate_disposal: false }));
    }
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

 if (initiate_disposal27af5?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageInitiateassetdisposalpage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="Initiate Asset Disposal"
        showOverlay = {true}
        position = {"center"}
        modalName = "initiateassetdisposal"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageInitiateassetdisposalpage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="   !bg-blue-600 !text-white !rounded-lg"
          onClick={handleClick}
          view='action'
          disabled= {initiate_disposal27af5?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Initiate Disposal")}
        </Button>}
      </div>
    
  )
}

export default Buttoninitiate_disposal

