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

  const {add_case_grouped126, setadd_case_grouped126}= useContext(TotalContext) as TotalContextProps;
  const {add_case_grouped126Props, setadd_case_grouped126Props}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8, setheader_groupbd8a8}= useContext(TotalContext) as TotalContextProps;
  const {header_groupbd8a8Props, setheader_groupbd8a8Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1, setrequired_dociument_main_group255d1}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group255d1Props, setrequired_dociument_main_group255d1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7, setdoc_table9c4f7}= useContext(TotalContext) as TotalContextProps;
  const {doc_table9c4f7Props, setdoc_table9c4f7Props}= useContext(TotalContext) as TotalContextProps;
  const {attachment_idcc3f4, setattachment_idcc3f4}= useContext(TotalContext) as TotalContextProps;
  const {doc_name909a3, setdoc_name909a3}= useContext(TotalContext) as TotalContextProps;
  const {view_button22ede, setview_button22ede}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3c, setcase_information_group48f3c}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group48f3cProps, setcase_information_group48f3cProps}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709, setcard_group4c709}= useContext(TotalContext) as TotalContextProps;
  const {card_group4c709Props, setcard_group4c709Props}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235, setprincipal_group42235}= useContext(TotalContext) as TotalContextProps;
  const {principal_group42235Props, setprincipal_group42235Props}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3b, setintrest_group65c3b}= useContext(TotalContext) as TotalContextProps;
  const {intrest_group65c3bProps, setintrest_group65c3bProps}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6, setfees_group8c4a6}= useContext(TotalContext) as TotalContextProps;
  const {fees_group8c4a6Props, setfees_group8c4a6Props}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3, settotal_groupc52d3}= useContext(TotalContext) as TotalContextProps;
  const {total_groupc52d3Props, settotal_groupc52d3Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614, setvenue_details_group51614}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group51614Props, setvenue_details_group51614Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466, setchecklist_main_group2b466}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group2b466Props, setchecklist_main_group2b466Props}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0, setchecklist_tablecafb0}= useContext(TotalContext) as TotalContextProps;
  const {checklist_tablecafb0Props, setchecklist_tablecafb0Props}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9f, setspecial_rules_group7ce9f}= useContext(TotalContext) as TotalContextProps;
  const {special_rules_group7ce9fProps, setspecial_rules_group7ce9fProps}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109, setspecial_rules7f109}= useContext(TotalContext) as TotalContextProps;
  const {special_rules7f109Props, setspecial_rules7f109Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['add_case_group'] = add_case_grouped126,
      codeStates['setadd_case_group'] = setadd_case_grouped126,
      codeStates['add_case_grouped126'] = add_case_grouped126Props,
      codeStates['setadd_case_grouped126'] = setadd_case_grouped126Props,
      codeStates['header_group'] = header_groupbd8a8,
      codeStates['setheader_group'] = setheader_groupbd8a8,
      codeStates['header_groupbd8a8'] = header_groupbd8a8Props,
      codeStates['setheader_groupbd8a8'] = setheader_groupbd8a8Props,
      codeStates['required_dociument_main_group'] = required_dociument_main_group255d1,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group255d1,
      codeStates['required_dociument_main_group255d1'] = required_dociument_main_group255d1Props,
      codeStates['setrequired_dociument_main_group255d1'] = setrequired_dociument_main_group255d1Props,
      codeStates['doc_table'] = doc_table9c4f7,
      codeStates['setdoc_table'] = setdoc_table9c4f7,
      codeStates['doc_table9c4f7'] = doc_table9c4f7Props,
      codeStates['setdoc_table9c4f7'] = setdoc_table9c4f7Props,
      codeStates['attachment_id'] = attachment_idcc3f4,
      codeStates['setattachment_id'] = setattachment_idcc3f4,
      codeStates['doc_name'] = doc_name909a3,
      codeStates['setdoc_name'] = setdoc_name909a3,
      codeStates['view_button'] = view_button22ede,
      codeStates['setview_button'] = setview_button22ede,
      codeStates['case_information_group'] = case_information_group48f3c,
      codeStates['setcase_information_group'] = setcase_information_group48f3c,
      codeStates['case_information_group48f3c'] = case_information_group48f3cProps,
      codeStates['setcase_information_group48f3c'] = setcase_information_group48f3cProps,
      codeStates['card_group'] = card_group4c709,
      codeStates['setcard_group'] = setcard_group4c709,
      codeStates['card_group4c709'] = card_group4c709Props,
      codeStates['setcard_group4c709'] = setcard_group4c709Props,
      codeStates['principal_group'] = principal_group42235,
      codeStates['setprincipal_group'] = setprincipal_group42235,
      codeStates['principal_group42235'] = principal_group42235Props,
      codeStates['setprincipal_group42235'] = setprincipal_group42235Props,
      codeStates['intrest_group'] = intrest_group65c3b,
      codeStates['setintrest_group'] = setintrest_group65c3b,
      codeStates['intrest_group65c3b'] = intrest_group65c3bProps,
      codeStates['setintrest_group65c3b'] = setintrest_group65c3bProps,
      codeStates['fees_group'] = fees_group8c4a6,
      codeStates['setfees_group'] = setfees_group8c4a6,
      codeStates['fees_group8c4a6'] = fees_group8c4a6Props,
      codeStates['setfees_group8c4a6'] = setfees_group8c4a6Props,
      codeStates['total_group'] = total_groupc52d3,
      codeStates['settotal_group'] = settotal_groupc52d3,
      codeStates['total_groupc52d3'] = total_groupc52d3Props,
      codeStates['settotal_groupc52d3'] = settotal_groupc52d3Props,
      codeStates['venue_details_group'] = venue_details_group51614,
      codeStates['setvenue_details_group'] = setvenue_details_group51614,
      codeStates['venue_details_group51614'] = venue_details_group51614Props,
      codeStates['setvenue_details_group51614'] = setvenue_details_group51614Props,
      codeStates['checklist_main_group'] = checklist_main_group2b466,
      codeStates['setchecklist_main_group'] = setchecklist_main_group2b466,
      codeStates['checklist_main_group2b466'] = checklist_main_group2b466Props,
      codeStates['setchecklist_main_group2b466'] = setchecklist_main_group2b466Props,
      codeStates['checklist_table'] = checklist_tablecafb0,
      codeStates['setchecklist_table'] = setchecklist_tablecafb0,
      codeStates['checklist_tablecafb0'] = checklist_tablecafb0Props,
      codeStates['setchecklist_tablecafb0'] = setchecklist_tablecafb0Props,
      codeStates['special_rules_group'] = special_rules_group7ce9f,
      codeStates['setspecial_rules_group'] = setspecial_rules_group7ce9f,
      codeStates['special_rules_group7ce9f'] = special_rules_group7ce9fProps,
      codeStates['setspecial_rules_group7ce9f'] = setspecial_rules_group7ce9fProps,
      codeStates['special_rules'] = special_rules7f109,
      codeStates['setspecial_rules'] = setspecial_rules7f109,
      codeStates['special_rules7f109'] = special_rules7f109Props,
      codeStates['setspecial_rules7f109'] = setspecial_rules7f109Props,
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
        "040ce6f6cfa9a14028814480bdf9c4f7",
        "7ecbb5a0d018027fbcbbfd391e622ede"
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
      if (id === "view_button22ede") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view_button22ede?.refresh])


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

 if (view_button22ede?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:viewAMRCasePgGraph:AFVK:v1','viewamrcasepggraph','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Document Viewer"
        variant="display-1"
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
          disabled= {view_button22ede?.isDisabled ? true : false}
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

