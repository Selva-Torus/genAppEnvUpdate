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
import PageAddemployeejobgradepage2 from '@/app/addemployeejobgrade_v1/addemployeejobgrade_v1page';
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
 

const Buttonbutton_add = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {total_employees_groupf0de6, settotal_employees_groupf0de6}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_groupf0de6Props, settotal_employees_groupf0de6Props}= useContext(TotalContext) as TotalContextProps;
  const {grade_text095b2, setgrade_text095b2}= useContext(TotalContext) as TotalContextProps;
  const {bt_search14c76, setbt_search14c76}= useContext(TotalContext) as TotalContextProps;
  const {button_adde5754, setbutton_adde5754}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094, settotal_employees_table9c094}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table9c094Props, settotal_employees_table9c094Props}= useContext(TotalContext) as TotalContextProps;
  const {addemployeejobgrade_v1Props, setaddemployeejobgrade_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_grade5f754, setbt_add_grade5f754}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7, setdynamicactions7e8c7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions7e8c7Props, setdynamicactions7e8c7Props}= useContext(TotalContext) as TotalContextProps;
  const {button_update4ce10, setbutton_update4ce10}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const total_employees_groupf0de6Ref = useRef(total_employees_groupf0de6);
  useEffect(() => {
    total_employees_groupf0de6Ref.current = total_employees_groupf0de6;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [total_employees_groupf0de6]);
  
  //group props in ref to access latest props value
  const total_employees_groupf0de6PropsRef = useRef(total_employees_groupf0de6Props);
  useEffect(() => {
    total_employees_groupf0de6PropsRef.current = total_employees_groupf0de6Props;
  }, [total_employees_groupf0de6Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['total_employees_group'] = total_employees_groupf0de6,
        codeStates['settotal_employees_group'] = settotal_employees_groupf0de6,
        codeStates['total_employees_groupf0de6'] = total_employees_groupf0de6Props,
        codeStates['settotal_employees_groupf0de6'] = settotal_employees_groupf0de6Props,
        codeStates['grade_text'] = grade_text095b2,
        codeStates['setgrade_text'] = setgrade_text095b2,
        codeStates['bt_search'] = bt_search14c76,
        codeStates['setbt_search'] = setbt_search14c76,
        codeStates['button_add'] = button_adde5754,
        codeStates['setbutton_add'] = setbutton_adde5754,
        codeStates['total_employees_table'] = total_employees_table9c094,
        codeStates['settotal_employees_table'] = settotal_employees_table9c094,
        codeStates['total_employees_table9c094'] = total_employees_table9c094Props,
        codeStates['settotal_employees_table9c094'] = settotal_employees_table9c094Props,
        codeStates['addemployeejobgrade_v1'] = addemployeejobgrade_v1Props,
        codeStates['setaddemployeejobgrade_v1'] = setaddemployeejobgrade_v1Props,
        codeStates['bt_add_grade'] = bt_add_grade5f754,
        codeStates['setbt_add_grade'] = setbt_add_grade5f754,
        codeStates['dynamicactions'] = dynamicactions7e8c7,
        codeStates['setdynamicactions'] = setdynamicactions7e8c7,
        codeStates['dynamicactions7e8c7'] = dynamicactions7e8c7Props,
        codeStates['setdynamicactions7e8c7'] = setdynamicactions7e8c7Props,
        codeStates['button_update'] = button_update4ce10,
        codeStates['setbutton_update'] = setbutton_update4ce10,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {employeejobgrades_v1, setemployeejobgrades_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...total_employees_groupf0de6Ref.current};
      let parentRowSpan = 149;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "1ab39691f6fb8fa8afe46fc9c1ef0de6",
        "0d99ec2d7b3765af495db26d480e5754"
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
      if (id === "button_adde5754") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "0d99ec2d7b3765af495db26d480e5754") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button_adde5754");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button_adde5754?.trigger) return;
      if(button_adde5754?.trigger){
      setbutton_adde5754((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button_adde5754?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(button_adde5754?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button_adde5754?.refresh])
  

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
        settotal_employees_groupf0de6((prev: any) => ({ ...prev, button_add: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...total_employees_groupf0de6});
    setaddemployeejobgrade_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //enableElement
    setbt_add_grade5f754((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setbutton_update4ce10((prev: any) => ({ ...prev, isDisabled: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        settotal_employees_groupf0de6((prev: any) => ({ ...prev, button_add: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        settotal_employees_groupf0de6((prev: any) => ({ ...prev, button_add: false }));
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

 if (button_adde5754?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `22 / 25`,gridRow: `1 / 11`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAddemployeejobgradepage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        showOverlay = {true}
        position = {"center"}
        modalName = "addemployeejobgrade"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAddemployeejobgradepage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-blue-500 rounded-xl text-white  !font-bold"
          onClick={handleClick}
          view='normal'
          disabled= {button_adde5754?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdAdd"
          iconDisplay='Start with Icon'
        >
          {keyset("New Grade")}
        </Button>}
      </div>
    
  )
}

export default Buttonbutton_add

