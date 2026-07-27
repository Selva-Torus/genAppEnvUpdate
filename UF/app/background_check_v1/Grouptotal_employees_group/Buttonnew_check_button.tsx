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
import PageNewbackgroundcheckpage2 from '@/app/newbackgroundcheck_v1/newbackgroundcheck_v1page';
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
 

const Buttonnew_check_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {total_employees_group455f5, settotal_employees_group455f5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group455f5Props, settotal_employees_group455f5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7, setemp_groupe44b7}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7Props, setemp_groupe44b7Props}= useContext(TotalContext) as TotalContextProps;
  const {bt_searchfeae1, setbt_searchfeae1}= useContext(TotalContext) as TotalContextProps;
  const {new_check_button0edbf, setnew_check_button0edbf}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379da, settotal_employees_table379da}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379daProps, settotal_employees_table379daProps}= useContext(TotalContext) as TotalContextProps;
  const {newbackgroundcheck_v1Props, setnewbackgroundcheck_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {savedd5e0, setsavedd5e0}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7f, setdynamicactions2fc7f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions2fc7fProps, setdynamicactions2fc7fProps}= useContext(TotalContext) as TotalContextProps;
  const {button_update4d9e0, setbutton_update4d9e0}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const total_employees_group455f5Ref = useRef(total_employees_group455f5);
  useEffect(() => {
    total_employees_group455f5Ref.current = total_employees_group455f5;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [total_employees_group455f5]);
  
  //group props in ref to access latest props value
  const total_employees_group455f5PropsRef = useRef(total_employees_group455f5Props);
  useEffect(() => {
    total_employees_group455f5PropsRef.current = total_employees_group455f5Props;
  }, [total_employees_group455f5Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['total_employees_group'] = total_employees_group455f5,
        codeStates['settotal_employees_group'] = settotal_employees_group455f5,
        codeStates['total_employees_group455f5'] = total_employees_group455f5Props,
        codeStates['settotal_employees_group455f5'] = settotal_employees_group455f5Props,
        codeStates['emp_group'] = emp_groupe44b7,
        codeStates['setemp_group'] = setemp_groupe44b7,
        codeStates['emp_groupe44b7'] = emp_groupe44b7Props,
        codeStates['setemp_groupe44b7'] = setemp_groupe44b7Props,
        codeStates['bt_search'] = bt_searchfeae1,
        codeStates['setbt_search'] = setbt_searchfeae1,
        codeStates['new_check_button'] = new_check_button0edbf,
        codeStates['setnew_check_button'] = setnew_check_button0edbf,
        codeStates['total_employees_table'] = total_employees_table379da,
        codeStates['settotal_employees_table'] = settotal_employees_table379da,
        codeStates['total_employees_table379da'] = total_employees_table379daProps,
        codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,
        codeStates['newbackgroundcheck_v1'] = newbackgroundcheck_v1Props,
        codeStates['setnewbackgroundcheck_v1'] = setnewbackgroundcheck_v1Props,
        codeStates['save'] = savedd5e0,
        codeStates['setsave'] = setsavedd5e0,
        codeStates['dynamicactions'] = dynamicactions2fc7f,
        codeStates['setdynamicactions'] = setdynamicactions2fc7f,
        codeStates['dynamicactions2fc7f'] = dynamicactions2fc7fProps,
        codeStates['setdynamicactions2fc7f'] = setdynamicactions2fc7fProps,
        codeStates['button_update'] = button_update4d9e0,
        codeStates['setbutton_update'] = setbutton_update4d9e0,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {backgroundcheck_v1, setbackgroundcheck_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...total_employees_group455f5Ref.current};
      let parentRowSpan = 138;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "a3e97cefbc5e061cdf58db82fe5455f5",
        "fa8a56f61dc837909d1b083b6f90edbf"
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
      if (id === "new_check_button0edbf") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "fa8a56f61dc837909d1b083b6f90edbf") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "new_check_button0edbf");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!new_check_button0edbf?.trigger) return;
      if(new_check_button0edbf?.trigger){
      setnew_check_button0edbf((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[new_check_button0edbf?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(new_check_button0edbf?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[new_check_button0edbf?.refresh])
  

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
        settotal_employees_group455f5((prev: any) => ({ ...prev, new_check_button: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...emp_groupe44b7,...total_employees_group455f5});
    setnewbackgroundcheck_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //enableElement
    setsavedd5e0((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setbutton_update4d9e0((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        settotal_employees_group455f5((prev: any) => ({ ...prev, new_check_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        settotal_employees_group455f5((prev: any) => ({ ...prev, new_check_button: false }));
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

 if (new_check_button0edbf?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageNewbackgroundcheckpage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="Add Background Check"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "newbackgroundcheck"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageNewbackgroundcheckpage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {new_check_button0edbf?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("Initiate Check")}
        </Button>}
      </div>
    
  )
}

export default Buttonnew_check_button

