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
 

const Buttonnew_employee_button = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
    
 /////////////
   //another screen

  const {total_employees_group75b01, settotal_employees_group75b01}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group75b01Props, settotal_employees_group75b01Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13c, setemp_groupdf13c}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupdf13cProps, setemp_groupdf13cProps}= useContext(TotalContext) as TotalContextProps;
  const {bt_searcha400f, setbt_searcha400f}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_buttonb11f1, setnew_employee_buttonb11f1}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694e, settotal_employees_tablee694e}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_tablee694eProps, settotal_employees_tablee694eProps}= useContext(TotalContext) as TotalContextProps;
  const {newemployees_v1Props, setnewemployees_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {savec5b7c, setsavec5b7c}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358, setdynamicactionsa8358}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358Props, setdynamicactionsa8358Props}= useContext(TotalContext) as TotalContextProps;
  const {button_updated6240, setbutton_updated6240}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const total_employees_group75b01Ref = useRef(total_employees_group75b01);
  useEffect(() => {
    total_employees_group75b01Ref.current = total_employees_group75b01;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [total_employees_group75b01]);
  
  //group props in ref to access latest props value
  const total_employees_group75b01PropsRef = useRef(total_employees_group75b01Props);
  useEffect(() => {
    total_employees_group75b01PropsRef.current = total_employees_group75b01Props;
  }, [total_employees_group75b01Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['total_employees_group'] = total_employees_group75b01,
        codeStates['settotal_employees_group'] = settotal_employees_group75b01,
        codeStates['total_employees_group75b01'] = total_employees_group75b01Props,
        codeStates['settotal_employees_group75b01'] = settotal_employees_group75b01Props,
        codeStates['emp_group'] = emp_groupdf13c,
        codeStates['setemp_group'] = setemp_groupdf13c,
        codeStates['emp_groupdf13c'] = emp_groupdf13cProps,
        codeStates['setemp_groupdf13c'] = setemp_groupdf13cProps,
        codeStates['bt_search'] = bt_searcha400f,
        codeStates['setbt_search'] = setbt_searcha400f,
        codeStates['new_employee_button'] = new_employee_buttonb11f1,
        codeStates['setnew_employee_button'] = setnew_employee_buttonb11f1,
        codeStates['total_employees_table'] = total_employees_tablee694e,
        codeStates['settotal_employees_table'] = settotal_employees_tablee694e,
        codeStates['total_employees_tablee694e'] = total_employees_tablee694eProps,
        codeStates['settotal_employees_tablee694e'] = settotal_employees_tablee694eProps,
        codeStates['newemployees_v1'] = newemployees_v1Props,
        codeStates['setnewemployees_v1'] = setnewemployees_v1Props,
        codeStates['save'] = savec5b7c,
        codeStates['setsave'] = setsavec5b7c,
        codeStates['dynamicactions'] = dynamicactionsa8358,
        codeStates['setdynamicactions'] = setdynamicactionsa8358,
        codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
        codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
        codeStates['button_update'] = button_updated6240,
        codeStates['setbutton_update'] = setbutton_updated6240,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {employees_v1, setemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...total_employees_group75b01Ref.current};
      let parentRowSpan = 179;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "0a5a3d8a38dd4b1abf707a4faf275b01",
        "e2e2cd16722945268e86b89e62bb11f1"
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
      if (id === "new_employee_buttonb11f1") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "e2e2cd16722945268e86b89e62bb11f1") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "new_employee_buttonb11f1");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!new_employee_buttonb11f1?.trigger) return;
      if(new_employee_buttonb11f1?.trigger){
      setnew_employee_buttonb11f1((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[new_employee_buttonb11f1?.trigger])

  useEffect(()=>{
    if(new_employee_buttonb11f1?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[new_employee_buttonb11f1?.refresh])
  

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
        settotal_employees_group75b01((prev: any) => ({ ...prev, new_employee_button: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...emp_groupdf13c,...total_employees_group75b01});
    setnewemployees_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1', 'newemployees_v1'));
    //enableElement
    setsavec5b7c((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setbutton_updated6240((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        settotal_employees_group75b01((prev: any) => ({ ...prev, new_employee_button: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        settotal_employees_group75b01((prev: any) => ({ ...prev, new_employee_button: false }));
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

 if (new_employee_buttonb11f1?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-[#108DDA] hover:!bg-[#38BDF8] !text-white !rounded-lg !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {new_employee_buttonb11f1?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("New Employee")}
        </Button>}
      </div>
    
  )
}

export default Buttonnew_employee_button

