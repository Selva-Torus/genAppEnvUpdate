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

  const {add_case_group4945a, setadd_case_group4945a}= useContext(TotalContext) as TotalContextProps;
  const {add_case_group4945aProps, setadd_case_group4945aProps}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cb, setheader_groupf55cb}= useContext(TotalContext) as TotalContextProps;
  const {header_groupf55cbProps, setheader_groupf55cbProps}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaaf, setrequired_dociument_main_groupdfaaf}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_groupdfaafProps, setrequired_dociument_main_groupdfaafProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83, setdoc_table8af83}= useContext(TotalContext) as TotalContextProps;
  const {doc_table8af83Props, setdoc_table8af83Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_id017ae, setattachment_id017ae}= useContext(TotalContext) as TotalContextProps;
  const {doc_name277c1, setdoc_name277c1}= useContext(TotalContext) as TotalContextProps;
  const {view_buttondd26e, setview_buttondd26e}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['add_case_group'] = add_case_group4945a,
      codeStates['setadd_case_group'] = setadd_case_group4945a,
      codeStates['add_case_group4945a'] = add_case_group4945aProps,
      codeStates['setadd_case_group4945a'] = setadd_case_group4945aProps,
      codeStates['header_group'] = header_groupf55cb,
      codeStates['setheader_group'] = setheader_groupf55cb,
      codeStates['header_groupf55cb'] = header_groupf55cbProps,
      codeStates['setheader_groupf55cb'] = setheader_groupf55cbProps,
      codeStates['required_dociument_main_group'] = required_dociument_main_groupdfaaf,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_groupdfaaf,
      codeStates['required_dociument_main_groupdfaaf'] = required_dociument_main_groupdfaafProps,
      codeStates['setrequired_dociument_main_groupdfaaf'] = setrequired_dociument_main_groupdfaafProps,
      codeStates['doc_table'] = doc_table8af83,
      codeStates['setdoc_table'] = setdoc_table8af83,
      codeStates['doc_table8af83'] = doc_table8af83Props,
      codeStates['setdoc_table8af83'] = setdoc_table8af83Props,
      codeStates['attachment_id'] = attachment_id017ae,
      codeStates['setattachment_id'] = setattachment_id017ae,
      codeStates['doc_name'] = doc_name277c1,
      codeStates['setdoc_name'] = setdoc_name277c1,
      codeStates['view_button'] = view_buttondd26e,
      codeStates['setview_button'] = setview_buttondd26e,
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
        "c0780ffe5460182dfaa3c069aec8af83",
        "8afff9d6ad2a52ad2c4a8c50430dd26e"
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
      if (id === "view_buttondd26e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_buttondd26e?.refresh])


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

 if (view_buttondd26e?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRPgGraph:AFVK:v1','viewamrpggraph','needstopPropagate')=='not in assembler'?e.stopPropagation():null
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
          disabled= {view_buttondd26e?.isDisabled ? true : false}
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

