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
import PageAmrqueuesearchpage2 from '@/app/amrqueuesearch_v1/amrqueuesearch_v1page';
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
 

const Buttonsearch_btn = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {header_groupb1913, setheader_groupb1913}= useContext(TotalContext) as TotalContextProps;
  const {header_groupb1913Props, setheader_groupb1913Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfe, setasset_dashboard_group4bbfe}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group4bbfeProps, setasset_dashboard_group4bbfeProps}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92ca, setamr_queue_groupc92ca}= useContext(TotalContext) as TotalContextProps;
  const {amr_queue_groupc92caProps, setamr_queue_groupc92caProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32, setpending_file_groupffe32}= useContext(TotalContext) as TotalContextProps;
  const {pending_file_groupffe32Props, setpending_file_groupffe32Props}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93, setservice_pending_group7ba93}= useContext(TotalContext) as TotalContextProps;
  const {service_pending_group7ba93Props, setservice_pending_group7ba93Props}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4, setslas_at_risk_group23eb4}= useContext(TotalContext) as TotalContextProps;
  const {slas_at_risk_group23eb4Props, setslas_at_risk_group23eb4Props}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54, setcourt_rejection_groupc9d54}= useContext(TotalContext) as TotalContextProps;
  const {court_rejection_groupc9d54Props, setcourt_rejection_groupc9d54Props}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5, setcollected_mtd_group7b7b5}= useContext(TotalContext) as TotalContextProps;
  const {collected_mtd_group7b7b5Props, setcollected_mtd_group7b7b5Props}= useContext(TotalContext) as TotalContextProps;
  const {table_group112bd, settable_group112bd}= useContext(TotalContext) as TotalContextProps;
  const {table_group112bdProps, settable_group112bdProps}= useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5, setsubscreene9ab5}= useContext(TotalContext) as TotalContextProps;
  const {subscreene9ab5Props, setsubscreene9ab5Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props, setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props}= useContext(TotalContext) as TotalContextProps;
  const {group28176, setgroup28176}= useContext(TotalContext) as TotalContextProps;
  const {group28176Props, setgroup28176Props}= useContext(TotalContext) as TotalContextProps;
  const {search_btn4c2ed, setsearch_btn4c2ed}= useContext(TotalContext) as TotalContextProps;
  const {add_btn2f9d0, setadd_btn2f9d0}= useContext(TotalContext) as TotalContextProps;
  const {textc2337, settextc2337}= useContext(TotalContext) as TotalContextProps;
  const {table852e3, settable852e3}= useContext(TotalContext) as TotalContextProps;
  const {table852e3Props, settable852e3Props}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da}= useContext(TotalContext) as TotalContextProps;
  const {ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps, setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568, setpending_fillings_groupb1568}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_groupb1568Props, setpending_fillings_groupb1568Props}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279, setpending_fillings_table11279}= useContext(TotalContext) as TotalContextProps;
  const {pending_fillings_table11279Props, setpending_fillings_table11279Props}= useContext(TotalContext) as TotalContextProps;
  const {amrqueuesearch_v1Props, setamrqueuesearch_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const group28176Ref = useRef(group28176);
  useEffect(() => {
    group28176Ref.current = group28176;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [group28176]);
  
  //group props in ref to access latest props value
  const group28176PropsRef = useRef(group28176Props);
  useEffect(() => {
    group28176PropsRef.current = group28176Props;
  }, [group28176Props]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['header_group'] = header_groupb1913,
        codeStates['setheader_group'] = setheader_groupb1913,
        codeStates['header_groupb1913'] = header_groupb1913Props,
        codeStates['setheader_groupb1913'] = setheader_groupb1913Props,
        codeStates['asset_dashboard_group'] = asset_dashboard_group4bbfe,
        codeStates['setasset_dashboard_group'] = setasset_dashboard_group4bbfe,
        codeStates['asset_dashboard_group4bbfe'] = asset_dashboard_group4bbfeProps,
        codeStates['setasset_dashboard_group4bbfe'] = setasset_dashboard_group4bbfeProps,
        codeStates['amr_queue_group'] = amr_queue_groupc92ca,
        codeStates['setamr_queue_group'] = setamr_queue_groupc92ca,
        codeStates['amr_queue_groupc92ca'] = amr_queue_groupc92caProps,
        codeStates['setamr_queue_groupc92ca'] = setamr_queue_groupc92caProps,
        codeStates['pending_file_group'] = pending_file_groupffe32,
        codeStates['setpending_file_group'] = setpending_file_groupffe32,
        codeStates['pending_file_groupffe32'] = pending_file_groupffe32Props,
        codeStates['setpending_file_groupffe32'] = setpending_file_groupffe32Props,
        codeStates['service_pending_group'] = service_pending_group7ba93,
        codeStates['setservice_pending_group'] = setservice_pending_group7ba93,
        codeStates['service_pending_group7ba93'] = service_pending_group7ba93Props,
        codeStates['setservice_pending_group7ba93'] = setservice_pending_group7ba93Props,
        codeStates['slas_at_risk_group'] = slas_at_risk_group23eb4,
        codeStates['setslas_at_risk_group'] = setslas_at_risk_group23eb4,
        codeStates['slas_at_risk_group23eb4'] = slas_at_risk_group23eb4Props,
        codeStates['setslas_at_risk_group23eb4'] = setslas_at_risk_group23eb4Props,
        codeStates['court_rejection_group'] = court_rejection_groupc9d54,
        codeStates['setcourt_rejection_group'] = setcourt_rejection_groupc9d54,
        codeStates['court_rejection_groupc9d54'] = court_rejection_groupc9d54Props,
        codeStates['setcourt_rejection_groupc9d54'] = setcourt_rejection_groupc9d54Props,
        codeStates['collected_mtd_group'] = collected_mtd_group7b7b5,
        codeStates['setcollected_mtd_group'] = setcollected_mtd_group7b7b5,
        codeStates['collected_mtd_group7b7b5'] = collected_mtd_group7b7b5Props,
        codeStates['setcollected_mtd_group7b7b5'] = setcollected_mtd_group7b7b5Props,
        codeStates['table_group'] = table_group112bd,
        codeStates['settable_group'] = settable_group112bd,
        codeStates['table_group112bd'] = table_group112bdProps,
        codeStates['settable_group112bd'] = settable_group112bdProps,
        codeStates['subscreen'] = subscreene9ab5,
        codeStates['setsubscreen'] = setsubscreene9ab5,
        codeStates['subscreene9ab5'] = subscreene9ab5Props,
        codeStates['setsubscreene9ab5'] = setsubscreene9ab5Props,
        codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v1'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,
        codeStates['ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        codeStates['setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797'] = setct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797Props,
        codeStates['group'] = group28176,
        codeStates['setgroup'] = setgroup28176,
        codeStates['group28176'] = group28176Props,
        codeStates['setgroup28176'] = setgroup28176Props,
        codeStates['search_btn'] = search_btn4c2ed,
        codeStates['setsearch_btn'] = setsearch_btn4c2ed,
        codeStates['add_btn'] = add_btn2f9d0,
        codeStates['setadd_btn'] = setadd_btn2f9d0,
        codeStates['text'] = textc2337,
        codeStates['settext'] = settextc2337,
        codeStates['table'] = table852e3,
        codeStates['settable'] = settable852e3,
        codeStates['table852e3'] = table852e3Props,
        codeStates['settable852e3'] = settable852e3Props,
        codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,
        codeStates['ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        codeStates['setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da'] = setct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8daProps,
        codeStates['pending_fillings_group'] = pending_fillings_groupb1568,
        codeStates['setpending_fillings_group'] = setpending_fillings_groupb1568,
        codeStates['pending_fillings_groupb1568'] = pending_fillings_groupb1568Props,
        codeStates['setpending_fillings_groupb1568'] = setpending_fillings_groupb1568Props,
        codeStates['pending_fillings_table'] = pending_fillings_table11279,
        codeStates['setpending_fillings_table'] = setpending_fillings_table11279,
        codeStates['pending_fillings_table11279'] = pending_fillings_table11279Props,
        codeStates['setpending_fillings_table11279'] = setpending_fillings_table11279Props,
        codeStates['amrqueuesearch_v1'] = amrqueuesearch_v1Props,
        codeStates['setamrqueuesearch_v1'] = setamrqueuesearch_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {dashboard_v1, setdashboard_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...group28176Ref.current};
      let parentRowSpan = 111;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "10760b8009a647e5879cb6456d228176",
        "895057ec78324006acab534d37d4c2ed"
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
      if (id === "search_btn4c2ed") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "895057ec78324006acab534d37d4c2ed") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "search_btn4c2ed");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!search_btn4c2ed?.trigger) return;
      if(search_btn4c2ed?.trigger){
      setsearch_btn4c2ed((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[search_btn4c2ed?.trigger])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
    if(search_btn4c2ed?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[search_btn4c2ed?.refresh])
  

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
        setgroup28176((prev: any) => ({ ...prev, search_btn: true }));
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...header_groupb1913,...asset_dashboard_group4bbfe,...amr_queue_groupc92ca,...pending_file_groupffe32,...service_pending_group7ba93,...slas_at_risk_group23eb4,...court_rejection_groupc9d54,...collected_mtd_group7b7b5,...table_group112bd,...subscreene9ab5,...ct006_af_uf_ufws_lap_lap_amrqueuetable_v18a797,...ct006_af_uf_ufws_lap_lap_pendingfilingtable_v1ff8da,...pending_fillings_groupb1568,...group28176});
    setamrqueuesearch_v1Props([...filterData2 ]);
    setAssetDataReady(false);
    setShowProfileAsModalOpen2(true);
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setgroup28176((prev: any) => ({ ...prev, search_btn: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setgroup28176((prev: any) => ({ ...prev, search_btn: false }));
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

 if (search_btn4c2ed?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `20 / 23`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showProfileAsModalOpen2 && hiddenModalForTrigger && (
          <div style={{ display: 'none' }}>
            <PageAmrqueuesearchpage2 onReady={handleAssetPageReady}/>
          </div>
        )}
      <Modal 
        open={showProfileAsModalOpen2 && !hiddenModalForTrigger} 
        onClose={() => { setShowProfileAsModalOpen2(false); setHiddenModalForTrigger(false); }}
        title="AMR Queue Search"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"top-right"}
        modalName = "amrqueuesearch"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        {!hiddenModalForTrigger && <PageAmrqueuesearchpage2  onReady={handleAssetPageReady}/>}
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {search_btn4c2ed?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdSearch"
          iconDisplay='Start with Icon'
        >
          {keyset("Search")}
        </Button>}
      </div>
    
  )
}

export default Buttonsearch_btn

