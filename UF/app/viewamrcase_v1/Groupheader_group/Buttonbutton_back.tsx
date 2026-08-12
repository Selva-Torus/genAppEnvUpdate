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

  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps;
  const {button_back1a912, setbutton_back1a912}= useContext(TotalContext) as TotalContextProps;
  const {craete_header_texte958c, setcraete_header_texte958c}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1b, setcase_information_groupe3c1b}= useContext(TotalContext) as TotalContextProps;
  const {case_information_groupe3c1bProps, setcase_information_groupe3c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83, setcard_group7fa83}= useContext(TotalContext) as TotalContextProps;
  const {card_group7fa83Props, setcard_group7fa83Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6dd, setprincipal_groupde6dd}= useContext(TotalContext) as TotalContextProps;
  const {principal_groupde6ddProps, setprincipal_groupde6ddProps}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4d, setintrest_group44b4d}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group44b4dProps, setintrest_group44b4dProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523, setfees_groupee523}= useContext(TotalContext) as TotalContextProps;
  const {fees_groupee523Props, setfees_groupee523Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06, settotal_groupd3e06}= useContext(TotalContext) as TotalContextProps;
  const {total_groupd3e06Props, settotal_groupd3e06Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734, setvenue_details_group1d734}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group1d734Props, setvenue_details_group1d734Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240, setchecklist_main_group32240}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group32240Props, setchecklist_main_group32240Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7dea, setchecklist_tablee7dea}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablee7deaProps, setchecklist_tablee7deaProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22ab, setspecial_rules_groupf22ab}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_groupf22abProps, setspecial_rules_groupf22abProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aec, setspecial_rules96aec}= useContext(TotalContext) as TotalContextProps;
  const {special_rules96aecProps, setspecial_rules96aecProps}= useContext(TotalContext) as TotalContextProps;
  const {amrqueuetable_v1Props, setamrqueuetable_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const pendingAutoSearch = useRef(false);
  // keep update group state in ref to access latest state value
  const header_groupc587eRef = useRef(header_groupc587e);
  useEffect(() => {
    header_groupc587eRef.current = header_groupc587e;
    if (!pendingAutoSearch.current) return;
      pendingAutoSearch.current = false;
      handleClick(false);
  }, [header_groupc587e]);
  
  //group props in ref to access latest props value
  const header_groupc587ePropsRef = useRef(header_groupc587eProps);
  useEffect(() => {
    header_groupc587ePropsRef.current = header_groupc587eProps;
  }, [header_groupc587eProps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
        codeStates['add_case_group'] = add_case_groupbe1de,
        codeStates['setadd_case_group'] = setadd_case_groupbe1de,
        codeStates['add_case_groupbe1de'] = add_case_groupbe1deProps,
        codeStates['setadd_case_groupbe1de'] = setadd_case_groupbe1deProps,
        codeStates['header_group'] = header_groupc587e,
        codeStates['setheader_group'] = setheader_groupc587e,
        codeStates['header_groupc587e'] = header_groupc587eProps,
        codeStates['setheader_groupc587e'] = setheader_groupc587eProps,
        codeStates['button_back'] = button_back1a912,
        codeStates['setbutton_back'] = setbutton_back1a912,
        codeStates['craete_header_text'] = craete_header_texte958c,
        codeStates['setcraete_header_text'] = setcraete_header_texte958c,
        codeStates['required_dociument_main_group'] = required_dociument_main_group6f022,
        codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group6f022,
        codeStates['required_dociument_main_group6f022'] = required_dociument_main_group6f022Props,
        codeStates['setrequired_dociument_main_group6f022'] = setrequired_dociument_main_group6f022Props,
        codeStates['doc_table'] = doc_table8bfa1,
        codeStates['setdoc_table'] = setdoc_table8bfa1,
        codeStates['doc_table8bfa1'] = doc_table8bfa1Props,
        codeStates['setdoc_table8bfa1'] = setdoc_table8bfa1Props,
        codeStates['case_information_group'] = case_information_groupe3c1b,
        codeStates['setcase_information_group'] = setcase_information_groupe3c1b,
        codeStates['case_information_groupe3c1b'] = case_information_groupe3c1bProps,
        codeStates['setcase_information_groupe3c1b'] = setcase_information_groupe3c1bProps,
        codeStates['card_group'] = card_group7fa83,
        codeStates['setcard_group'] = setcard_group7fa83,
        codeStates['card_group7fa83'] = card_group7fa83Props,
        codeStates['setcard_group7fa83'] = setcard_group7fa83Props,
        codeStates['principal_group'] = principal_groupde6dd,
        codeStates['setprincipal_group'] = setprincipal_groupde6dd,
        codeStates['principal_groupde6dd'] = principal_groupde6ddProps,
        codeStates['setprincipal_groupde6dd'] = setprincipal_groupde6ddProps,
        codeStates['intrest_group'] = intrest_group44b4d,
        codeStates['setintrest_group'] = setintrest_group44b4d,
        codeStates['intrest_group44b4d'] = intrest_group44b4dProps,
        codeStates['setintrest_group44b4d'] = setintrest_group44b4dProps,
        codeStates['fees_group'] = fees_groupee523,
        codeStates['setfees_group'] = setfees_groupee523,
        codeStates['fees_groupee523'] = fees_groupee523Props,
        codeStates['setfees_groupee523'] = setfees_groupee523Props,
        codeStates['total_group'] = total_groupd3e06,
        codeStates['settotal_group'] = settotal_groupd3e06,
        codeStates['total_groupd3e06'] = total_groupd3e06Props,
        codeStates['settotal_groupd3e06'] = settotal_groupd3e06Props,
        codeStates['venue_details_group'] = venue_details_group1d734,
        codeStates['setvenue_details_group'] = setvenue_details_group1d734,
        codeStates['venue_details_group1d734'] = venue_details_group1d734Props,
        codeStates['setvenue_details_group1d734'] = setvenue_details_group1d734Props,
        codeStates['checklist_main_group'] = checklist_main_group32240,
        codeStates['setchecklist_main_group'] = setchecklist_main_group32240,
        codeStates['checklist_main_group32240'] = checklist_main_group32240Props,
        codeStates['setchecklist_main_group32240'] = setchecklist_main_group32240Props,
        codeStates['checklist_table'] = checklist_tablee7dea,
        codeStates['setchecklist_table'] = setchecklist_tablee7dea,
        codeStates['checklist_tablee7dea'] = checklist_tablee7deaProps,
        codeStates['setchecklist_tablee7dea'] = setchecklist_tablee7deaProps,
        codeStates['special_rules_group'] = special_rules_groupf22ab,
        codeStates['setspecial_rules_group'] = setspecial_rules_groupf22ab,
        codeStates['special_rules_groupf22ab'] = special_rules_groupf22abProps,
        codeStates['setspecial_rules_groupf22ab'] = setspecial_rules_groupf22abProps,
        codeStates['special_rules'] = special_rules96aec,
        codeStates['setspecial_rules'] = setspecial_rules96aec,
        codeStates['special_rules96aec'] = special_rules96aecProps,
        codeStates['setspecial_rules96aec'] = setspecial_rules96aecProps,
        codeStates['amrqueuetable_v1'] = amrqueuetable_v1Props,
        codeStates['setamrqueuetable_v1'] = setamrqueuetable_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const {viewamrcase_v1, setviewamrcase_v1} = useContext(TotalContext) as TotalContextProps;
  const handleMapper=async (data?:any) => {
    try{     
      data = {...data,...header_groupc587eRef.current};
      let parentRowSpan = 10;
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6579af9497d034811b9314c80cbc587e",
        "d06a319cb6d94be489324285bdc1a912"
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
      if (id === "button_back1a912") {
        handleClick(false);
      }
    };
    const triggerElementHandler = async (id:any) => {
      if (id === "d06a319cb6d94be489324285bdc1a912") {
        handleClick(false);
      }
    };
    eventBus.on("triggerButton", handler);
    eventBus.on("triggerElement|onClick", triggerElementHandler);
    eventBus.emit("buttonReady", "button_back1a912");
    return () => {
      eventBus.off("triggerButton", handler);
      eventBus.off("triggerElement|onClick", triggerElementHandler);
    };
  },[currentToken,memoryVariables])

  useEffect(() => {
    validateRef.current = validate;  
  }, [validate]);



  useEffect(()=>{
    if (!button_back1a912?.trigger) return;
      if(button_back1a912?.trigger){
      setbutton_back1a912((prev:any) => ({...prev, trigger: !prev?.trigger}));
      (async()=>{
        await handleMapper();
        pendingAutoSearch.current = true;
      })();
    }
  },[button_back1a912?.trigger])

  useEffect(()=>{
    if(button_back1a912?.refresh){
    (async()=>{
      await handleMapper();
      pendingAutoSearch.current = true;
    })();
    }
  },[button_back1a912?.refresh])
  

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
        setheader_groupc587e((prev: any) => ({ ...prev, button_back: true }));
        //onClick

    // showArtifact
    let filterProps2: any =  [];
      let filterData2 = await getFilterProps(filterProps2,{...add_case_groupbe1de,...required_dociument_main_group6f022,...case_information_groupe3c1b,...card_group7fa83,...principal_groupde6dd,...intrest_group44b4d,...fees_groupee523,...total_groupd3e06,...venue_details_group1d734,...checklist_main_group32240,...special_rules_groupf22ab,...special_rules96aec,...header_groupc587e});
    setamrqueuetable_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:AMRQueueTable:AFVK:v1', 'amrqueuetable_v1'));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
        setheader_groupc587e((prev: any) => ({ ...prev, button_back: false }));
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
        setIsProcessing(false);
        setheader_groupc587e((prev: any) => ({ ...prev, button_back: false }));
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

 if (button_back1a912?.isHidden) {
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
          disabled= {button_back1a912?.isDisabled ? true : false}
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

