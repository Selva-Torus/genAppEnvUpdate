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
 

const Buttonbutton_back = ({ lockedData, setLockedData, tableData, setTableData, primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { lockedData:any,setLockedData:any,tableData:any,setTableData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {add_case_group4945a, setadd_case_group4945a}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group4945aProps, setadd_case_group4945aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {button_back811f3, setbutton_back811f3}= useContext(TotalContext) as TotalContextProps;
  const {craete_header_textc6061, setcraete_header_textc6061}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaaf, setrequired_dociument_main_groupdfaaf}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaafProps, setrequired_dociument_main_groupdfaafProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6, setcase_information_group40df6}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group40df6Props, setcase_information_group40df6Props}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3, setcard_group00ce3}= useContext(TotalContext) as TotalContextProps;
  const {card_group00ce3Props, setcard_group00ce3Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510ca, setprincipal_group510ca}= useContext(TotalContext) as TotalContextProps;
  const {principal_group510caProps, setprincipal_group510caProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85, setintrest_group1ba85}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group1ba85Props, setintrest_group1ba85Props}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4a, setfees_groupbee4a}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupbee4aProps, setfees_groupbee4aProps}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6, settotal_group197f6}= useContext(TotalContext) as TotalContextProps;
  const {total_group197f6Props, settotal_group197f6Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664, setvenue_details_group5f664}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group5f664Props, setvenue_details_group5f664Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71b, setchecklist_main_group2d71b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2d71bProps, setchecklist_main_group2d71bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934, setchecklist_tablec0934}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablec0934Props, setchecklist_tablec0934Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47bec, setspecial_rules_group47bec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group47becProps, setspecial_rules_group47becProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582, setspecial_rules3c582}= useContext(TotalContext) as TotalContextProps;
  const {special_rules3c582Props, setspecial_rules3c582Props}= useContext(TotalContext) as TotalContextProps;
  const {amrqueuetable_v1Props, setamrqueuetable_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const header_groupf55cbRef = useRef(header_groupf55cb);
  useEffect(() => {
    header_groupf55cbRef.current = header_groupf55cb;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [header_groupf55cb]);
  
  //group props in ref to access latest props value
  const header_groupf55cbPropsRef = useRef(header_groupf55cbProps);
  useEffect(() => {
    header_groupf55cbPropsRef.current = header_groupf55cbProps;
  }, [header_groupf55cbProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['add_case_group'] = add_case_group4945a,
        codeStates['setadd_case_group'] = setadd_case_group4945a,
        codeStates['add_case_group4945a'] = add_case_group4945aProps,
        codeStates['setadd_case_group4945a'] = setadd_case_group4945aProps,
        codeStates['header_group'] = header_groupf55cb,
        codeStates['setheader_group'] = setheader_groupf55cb,
        codeStates['header_groupf55cb'] = header_groupf55cbProps,
        codeStates['setheader_groupf55cb'] = setheader_groupf55cbProps,
        codeStates['button_back'] = button_back811f3,
        codeStates['setbutton_back'] = setbutton_back811f3,
        codeStates['craete_header_text'] = craete_header_textc6061,
        codeStates['setcraete_header_text'] = setcraete_header_textc6061,
        codeStates['required_dociument_main_group'] = required_dociument_main_groupdfaaf,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_groupdfaaf,
        codeStates['required_dociument_main_groupdfaaf'] = required_dociument_main_groupdfaafProps,
        codeStates['setrequired_dociument_main_groupdfaaf'] = setrequired_dociument_main_groupdfaafProps,
        codeStates['doc_table'] = doc_table8af83,
        codeStates['setdoc_table'] = setdoc_table8af83,
        codeStates['doc_table8af83'] = doc_table8af83Props,
        codeStates['setdoc_table8af83'] = setdoc_table8af83Props,
        codeStates['case_information_group'] = case_information_group40df6,
        codeStates['setcase_information_group'] = setcase_information_group40df6,
        codeStates['case_information_group40df6'] = case_information_group40df6Props,
        codeStates['setcase_information_group40df6'] = setcase_information_group40df6Props,
        codeStates['card_group'] = card_group00ce3,
        codeStates['setcard_group'] = setcard_group00ce3,
        codeStates['card_group00ce3'] = card_group00ce3Props,
        codeStates['setcard_group00ce3'] = setcard_group00ce3Props,
        codeStates['principal_group'] = principal_group510ca,
        codeStates['setprincipal_group'] = setprincipal_group510ca,
        codeStates['principal_group510ca'] = principal_group510caProps,
        codeStates['setprincipal_group510ca'] = setprincipal_group510caProps,
        codeStates['intrest_group'] = intrest_group1ba85,
        codeStates['setintrest_group'] = setintrest_group1ba85,
        codeStates['intrest_group1ba85'] = intrest_group1ba85Props,
        codeStates['setintrest_group1ba85'] = setintrest_group1ba85Props,
        codeStates['fees_group'] = fees_groupbee4a,
        codeStates['setfees_group'] = setfees_groupbee4a,
        codeStates['fees_groupbee4a'] = fees_groupbee4aProps,
        codeStates['setfees_groupbee4a'] = setfees_groupbee4aProps,
        codeStates['total_group'] = total_group197f6,
        codeStates['settotal_group'] = settotal_group197f6,
        codeStates['total_group197f6'] = total_group197f6Props,
        codeStates['settotal_group197f6'] = settotal_group197f6Props,
        codeStates['venue_details_group'] = venue_details_group5f664,
        codeStates['setvenue_details_group'] = setvenue_details_group5f664,
        codeStates['venue_details_group5f664'] = venue_details_group5f664Props,
        codeStates['setvenue_details_group5f664'] = setvenue_details_group5f664Props,
        codeStates['checklist_main_group'] = checklist_main_group2d71b,
        codeStates['setchecklist_main_group'] = setchecklist_main_group2d71b,
        codeStates['checklist_main_group2d71b'] = checklist_main_group2d71bProps,
        codeStates['setchecklist_main_group2d71b'] = setchecklist_main_group2d71bProps,
        codeStates['checklist_table'] = checklist_tablec0934,
        codeStates['setchecklist_table'] = setchecklist_tablec0934,
        codeStates['checklist_tablec0934'] = checklist_tablec0934Props,
        codeStates['setchecklist_tablec0934'] = setchecklist_tablec0934Props,
        codeStates['special_rules_group'] = special_rules_group47bec,
        codeStates['setspecial_rules_group'] = setspecial_rules_group47bec,
        codeStates['special_rules_group47bec'] = special_rules_group47becProps,
        codeStates['setspecial_rules_group47bec'] = setspecial_rules_group47becProps,
        codeStates['special_rules'] = special_rules3c582,
        codeStates['setspecial_rules'] = setspecial_rules3c582,
        codeStates['special_rules3c582'] = special_rules3c582Props,
        codeStates['setspecial_rules3c582'] = setspecial_rules3c582Props,
        codeStates['amrqueuetable_v1'] = amrqueuetable_v1Props,
        codeStates['setamrqueuetable_v1'] = setamrqueuetable_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {viewamrpggraph_v1, setviewamrpggraph_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...header_groupf55cbRef.current};
      let parentRowSpan = 10;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "8cdb8ae1f5d7d21f8a10e92ef0cf55cb",
        "f5a6e55995408cca4f15bc3b466811f3"
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
      if (id === "button_back811f3") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "f5a6e55995408cca4f15bc3b466811f3") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button_back811f3");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button_back811f3?.trigger) return;
      if(button_back811f3?.trigger){
      setbutton_back811f3((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button_back811f3?.trigger])

  useEffect(()=>{
    if(button_back811f3?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button_back811f3?.refresh])
  

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
        setheader_groupf55cb((prev: any) => ({ ...prev, button_back: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...add_case_group4945a,...required_dociument_main_groupdfaaf,...case_information_group40df6,...card_group00ce3,...principal_group510ca,...intrest_group1ba85,...fees_groupbee4a,...total_group197f6,...venue_details_group5f664,...checklist_main_group2d71b,...special_rules_group47bec,...special_rules3c582,...header_groupf55cb});
    setamrqueuetable_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRQueueTable:AFVK:v1', 'amrqueuetable_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setheader_groupf55cb((prev: any) => ({ ...prev, button_back: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setheader_groupf55cb((prev: any) => ({ ...prev, button_back: false }));
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

 if (button_back811f3?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{gridColumn: `1 / 3`,gridRow: `1 / 8`, gap:``, height: `100%`, overflow: 'auto'}} 
      >
        {showFlag && <Button 
          ref={buttonRef}
          className="!bg-white !rounded-lg !border !border-[#c4c4c4]"
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {button_back811f3?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdArrowBack"
          iconDisplay='Icon only'
        >
          {keyset("")}
        </Button>}
      </div>
    
  )
}

export default Buttonbutton_back

