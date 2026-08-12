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
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
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
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import PageDocumentviewerpage2 from '@/app/documentviewer_v1/documentviewer_v1page';
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
 

const Buttonview_button = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
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
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {add_case_groupbe1de, setadd_case_groupbe1de}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupbe1deProps, setadd_case_groupbe1deProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587e, setheader_groupc587e}= useContext(TotalContext) as TotalContextProps;
  const {header_groupc587eProps, setheader_groupc587eProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022, setrequired_dociument_main_group6f022}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group6f022Props, setrequired_dociument_main_group6f022Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1, setdoc_table8bfa1}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8bfa1Props, setdoc_table8bfa1Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id394f7, setattachment_id394f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_namef31ac, setdoc_namef31ac}= useContext(TotalContext) as TotalContextProps;
  const {view_button04be7, setview_button04be7}= useContext(TotalContext) as TotalContextProps;
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
  const {documentviewer_v1Props, setdocumentviewer_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {document_viewer_groupe4249, setdocument_viewer_groupe4249}= useContext(TotalContext) as TotalContextProps;
  const {document_viewer_groupe4249Props, setdocument_viewer_groupe4249Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


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
      codeStates['required_dociument_main_group'] = required_dociument_main_group6f022,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group6f022,
      codeStates['required_dociument_main_group6f022'] = required_dociument_main_group6f022Props,
      codeStates['setrequired_dociument_main_group6f022'] = setrequired_dociument_main_group6f022Props,
      codeStates['doc_table'] = doc_table8bfa1,
      codeStates['setdoc_table'] = setdoc_table8bfa1,
      codeStates['doc_table8bfa1'] = doc_table8bfa1Props,
      codeStates['setdoc_table8bfa1'] = setdoc_table8bfa1Props,
      codeStates['attachment_id'] = attachment_id394f7,
      codeStates['setattachment_id'] = setattachment_id394f7,
      codeStates['doc_name'] = doc_namef31ac,
      codeStates['setdoc_name'] = setdoc_namef31ac,
      codeStates['view_button'] = view_button04be7,
      codeStates['setview_button'] = setview_button04be7,
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
      codeStates['documentviewer_v1'] = documentviewer_v1Props,
      codeStates['setdocumentviewer_v1'] = setdocumentviewer_v1Props,
      codeStates['document_viewer_group'] = document_viewer_groupe4249,
      codeStates['setdocument_viewer_group'] = setdocument_viewer_groupe4249,
      codeStates['document_viewer_groupe4249'] = document_viewer_groupe4249Props,
      codeStates['setdocument_viewer_groupe4249'] = setdocument_viewer_groupe4249Props,
      codeStates['response']  = savedData.current;
      codeStates['mainData'] = mainData,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "3c62b53b67123edde99bdc3fa168bfa1",
        "a61cc4d8f26b496aba817d899e004be7"
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
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view_button04be7") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_button04be7?.refresh])


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

  const handleClick=async()=>{
    try{  
      if (onSelectLock && rowIndex !== undefined) {
        try {
          await onSelectLock([mainData[lockedData?.primaryColumn]]);
        } catch {
          return;
        }
      }

      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setdocumentviewer_v1Props([...filterData2 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,document_viewer_groupe4249Props?.controls);
    setdocument_viewer_groupe4249(bindData4||{})
    setdocument_viewer_groupe4249Props({...document_viewer_groupe4249Props,presetValues:{...(mainData||{})},tableName:tableName})
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
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

 if (view_button04be7?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCase:AFVK:v1','viewamrcase','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Document Viewer"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "documentviewer"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageDocumentviewerpage2  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='normal'
          disabled= {view_button04be7?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Icon only'
        >
          {keyset("")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_button

