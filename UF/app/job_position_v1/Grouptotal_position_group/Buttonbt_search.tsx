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
import PageEmployeejobpositionssearchpage2 from '@/app/employeejobpositionssearch_v1/employeejobpositionssearch_v1page';
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
 

const Buttonbt_search = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {total_position_group79a63, settotal_position_group79a63}= useContext(TotalContext) as TotalContextProps;
  const {total_position_group79a63Props, settotal_position_group79a63Props}= useContext(TotalContext) as TotalContextProps;
  const {positions_textf724d, setpositions_textf724d}= useContext(TotalContext) as TotalContextProps;
  const {bt_search94b25, setbt_search94b25}= useContext(TotalContext) as TotalContextProps;
  const {button_add06375, setbutton_add06375}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59, settotal_positions_table22a59}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59Props, settotal_positions_table22a59Props}= useContext(TotalContext) as TotalContextProps;
  const {employeejobpositionssearch_v1Props, setemployeejobpositionssearch_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const total_position_group79a63Ref = useRef(total_position_group79a63);
  useEffect(() => {
    total_position_group79a63Ref.current = total_position_group79a63;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [total_position_group79a63]);
  
  //group props in ref to access latest props value
  const total_position_group79a63PropsRef = useRef(total_position_group79a63Props);
  useEffect(() => {
    total_position_group79a63PropsRef.current = total_position_group79a63Props;
  }, [total_position_group79a63Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['total_position_group'] = total_position_group79a63,
        codeStates['settotal_position_group'] = settotal_position_group79a63,
        codeStates['total_position_group79a63'] = total_position_group79a63Props,
        codeStates['settotal_position_group79a63'] = settotal_position_group79a63Props,
        codeStates['positions_text'] = positions_textf724d,
        codeStates['setpositions_text'] = setpositions_textf724d,
        codeStates['bt_search'] = bt_search94b25,
        codeStates['setbt_search'] = setbt_search94b25,
        codeStates['button_add'] = button_add06375,
        codeStates['setbutton_add'] = setbutton_add06375,
        codeStates['total_positions_table'] = total_positions_table22a59,
        codeStates['settotal_positions_table'] = settotal_positions_table22a59,
        codeStates['total_positions_table22a59'] = total_positions_table22a59Props,
        codeStates['settotal_positions_table22a59'] = settotal_positions_table22a59Props,
        codeStates['employeejobpositionssearch_v1'] = employeejobpositionssearch_v1Props,
        codeStates['setemployeejobpositionssearch_v1'] = setemployeejobpositionssearch_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {employeejobpositions_v1, setemployeejobpositions_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...total_position_group79a63Ref.current};
      let parentRowSpan = 148;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "d37b8acfcf921594351ff7dd02479a63",
        "a95136d16f8a0d32690ccc530fc94b25"
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
      if (id === "bt_search94b25") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "a95136d16f8a0d32690ccc530fc94b25") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "bt_search94b25");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!bt_search94b25?.trigger) return;
      if(bt_search94b25?.trigger){
      setbt_search94b25((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[bt_search94b25?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(bt_search94b25?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[bt_search94b25?.refresh])
  

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
        settotal_position_group79a63((prev: any) => ({ ...prev, bt_search: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...total_position_group79a63});
    setemployeejobpositionssearch_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        settotal_position_group79a63((prev: any) => ({ ...prev, bt_search: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
        settotal_position_group79a63((prev: any) => ({ ...prev, bt_search: false }));
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

 if (bt_search94b25?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `19 / 22`,gridRow: `1 / 11`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageEmployeejobpositionssearchpage2/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        showOverlay = {true}
        position = {"top-right"}
        modalName = "employeejobpositionssearch"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageEmployeejobpositionssearchpage2/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {bt_search94b25?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineSearch"
          iconDisplay='Start with Icon'
        >
          {keyset("Search")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_search

