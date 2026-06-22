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
import PageLogmaintenancepage2 from '@/app/logmaintenance_v1/logmaintenance_v1page';
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
 

const Buttonlog_maintenance = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {overall_maintenance_group04cba, setoverall_maintenance_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_maintenance_group04cbaProps, setoverall_maintenance_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3, seticon_groupedce3}= useContext(TotalContext) as TotalContextProps;
  const {icon_groupedce3Props, seticon_groupedce3Props}= useContext(TotalContext) as TotalContextProps;
  const {search7f293, setsearch7f293}= useContext(TotalContext) as TotalContextProps;
  const {log_maintenanced8874, setlog_maintenanced8874}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5d, setmaintenance_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_table75a5dProps, setmaintenance_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {logmaintenance_v1Props, setlogmaintenance_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {schedule133fb, setschedule133fb}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  const {button_update5cdad, setbutton_update5cdad}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const overall_maintenance_group04cbaRef = useRef(overall_maintenance_group04cba);
  useEffect(() => {
    overall_maintenance_group04cbaRef.current = overall_maintenance_group04cba;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [overall_maintenance_group04cba]);
  
  //group props in ref to access latest props value
  const overall_maintenance_group04cbaPropsRef = useRef(overall_maintenance_group04cbaProps);
  useEffect(() => {
    overall_maintenance_group04cbaPropsRef.current = overall_maintenance_group04cbaProps;
  }, [overall_maintenance_group04cbaProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['overall_maintenance_group'] = overall_maintenance_group04cba,
        codeStates['setoverall_maintenance_group'] = setoverall_maintenance_group04cba,
        codeStates['overall_maintenance_group04cba'] = overall_maintenance_group04cbaProps,
        codeStates['setoverall_maintenance_group04cba'] = setoverall_maintenance_group04cbaProps,
        codeStates['icon_group'] = icon_groupedce3,
        codeStates['seticon_group'] = seticon_groupedce3,
        codeStates['icon_groupedce3'] = icon_groupedce3Props,
        codeStates['seticon_groupedce3'] = seticon_groupedce3Props,
        codeStates['search'] = search7f293,
        codeStates['setsearch'] = setsearch7f293,
        codeStates['log_maintenance'] = log_maintenanced8874,
        codeStates['setlog_maintenance'] = setlog_maintenanced8874,
        codeStates['maintenance_table'] = maintenance_table75a5d,
        codeStates['setmaintenance_table'] = setmaintenance_table75a5d,
        codeStates['maintenance_table75a5d'] = maintenance_table75a5dProps,
        codeStates['setmaintenance_table75a5d'] = setmaintenance_table75a5dProps,
        codeStates['logmaintenance_v1'] = logmaintenance_v1Props,
        codeStates['setlogmaintenance_v1'] = setlogmaintenance_v1Props,
        codeStates['schedule'] = schedule133fb,
        codeStates['setschedule'] = setschedule133fb,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
        codeStates['button_update'] = button_update5cdad,
        codeStates['setbutton_update'] = setbutton_update5cdad,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {assetmaintenance_v1, setassetmaintenance_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...overall_maintenance_group04cbaRef.current};
      let parentRowSpan = 122;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "4305fe0dee294b65a71eb2d157e04cba",
        "8cfd57efcf5f4b509337506678ed8874"
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
      if (id === "log_maintenanced8874") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "8cfd57efcf5f4b509337506678ed8874") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "log_maintenanced8874");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!log_maintenanced8874?.trigger) return;
      if(log_maintenanced8874?.trigger){
      setlog_maintenanced8874((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[log_maintenanced8874?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(log_maintenanced8874?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[log_maintenanced8874?.refresh])

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
        setoverall_maintenance_group04cba((prev: any) => ({ ...prev, log_maintenance: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,overall_maintenance_group04cba);
    setlogmaintenance_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //enableElement
    setschedule133fb((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setbutton_update5cdad((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setoverall_maintenance_group04cba((prev: any) => ({ ...prev, log_maintenance: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        setoverall_maintenance_group04cba((prev: any) => ({ ...prev, log_maintenance: false }));
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

 if (log_maintenanced8874?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `21 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageLogmaintenancepage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="Schedule Maintenance"
        showOverlay = {true}
        position = {"center"}
        modalName = "logmaintenance"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageLogmaintenancepage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="   !bg-blue-600 !text-white !rounded-lg"
          onClick={handleClick}
          view='action'
          disabled= {log_maintenanced8874?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Log Maintenance")}
        </Button>}
      </div>
    
  )
}

export default Buttonlog_maintenance

