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
 

const Buttonuploader = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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

  let code:string = "    setcustomwidget({\r\n       open:true,\r\n       mainData:mainData\r\n       });\r\n ";
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
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {add_case_groupeb161, setadd_case_groupeb161}= useContext(TotalContext) as TotalContextProps;
  const {add_case_groupeb161Props, setadd_case_groupeb161Props}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878f, setheader_group4878f}= useContext(TotalContext) as TotalContextProps;
  const {header_group4878fProps, setheader_group4878fProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3, setdynamicactions094c3}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions094c3Props, setdynamicactions094c3Props}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6f, setcase_information_group28f6f}= useContext(TotalContext) as TotalContextProps;
  const {case_information_group28f6fProps, setcase_information_group28f6fProps}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36d, setvenue_group6a36d}= useContext(TotalContext) as TotalContextProps;
  const {venue_group6a36dProps, setvenue_group6a36dProps}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18, setgeorgia_group0fa18}= useContext(TotalContext) as TotalContextProps;
  const {georgia_group0fa18Props, setgeorgia_group0fa18Props}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fd, setgeorgias_group945fd}= useContext(TotalContext) as TotalContextProps;
  const {georgias_group945fdProps, setgeorgias_group945fdProps}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85f, setgeorgias_groups6f85f}= useContext(TotalContext) as TotalContextProps;
  const {georgias_groups6f85fProps, setgeorgias_groups6f85fProps}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87, setgeorgiass_groups86a87}= useContext(TotalContext) as TotalContextProps;
  const {georgiass_groups86a87Props, setgeorgiass_groups86a87Props}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044a, setgeorgsiass_groupsb044a}= useContext(TotalContext) as TotalContextProps;
  const {georgsiass_groupsb044aProps, setgeorgsiass_groupsb044aProps}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70, setdebtor_information_group78a70}= useContext(TotalContext) as TotalContextProps;
  const {debtor_information_group78a70Props, setdebtor_information_group78a70Props}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47, setfinancial_details_group52f47}= useContext(TotalContext) as TotalContextProps;
  const {financial_details_group52f47Props, setfinancial_details_group52f47Props}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6, setvenue_details_group17ac6}= useContext(TotalContext) as TotalContextProps;
  const {venue_details_group17ac6Props, setvenue_details_group17ac6Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92, setrequired_dociument_main_group04e92}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_main_group04e92Props, setrequired_dociument_main_group04e92Props}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8, setrequired_dociument_header_groupe39c8}= useContext(TotalContext) as TotalContextProps;
  const {required_dociument_header_groupe39c8Props, setrequired_dociument_header_groupe39c8Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9fa, setdoc_type_tablebe9fa}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_tablebe9faProps, setdoc_type_tablebe9faProps}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_idaf61f, setdoc_type_idaf61f}= useContext(TotalContext) as TotalContextProps;
  const {doc_type_name949dd, setdoc_type_name949dd}= useContext(TotalContext) as TotalContextProps;
  const {uploaderdff25, setuploaderdff25}= useContext(TotalContext) as TotalContextProps;
  const {doc_reference_urld9056, setdoc_reference_urld9056}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6b, setchecklist_main_group0df6b}= useContext(TotalContext) as TotalContextProps;
  const {checklist_main_group0df6bProps, setchecklist_main_group0df6bProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3d, setchecklist_group32b3d}= useContext(TotalContext) as TotalContextProps;
  const {checklist_group32b3dProps, setchecklist_group32b3dProps}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1, setchecklist_table198e1}= useContext(TotalContext) as TotalContextProps;
  const {checklist_table198e1Props, setchecklist_table198e1Props}= useContext(TotalContext) as TotalContextProps;
  const {customwidgetd1a34, setcustomwidgetd1a34}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['add_case_group'] = add_case_groupeb161,
      codeStates['setadd_case_group'] = setadd_case_groupeb161,
      codeStates['add_case_groupeb161'] = add_case_groupeb161Props,
      codeStates['setadd_case_groupeb161'] = setadd_case_groupeb161Props,
      codeStates['header_group'] = header_group4878f,
      codeStates['setheader_group'] = setheader_group4878f,
      codeStates['header_group4878f'] = header_group4878fProps,
      codeStates['setheader_group4878f'] = setheader_group4878fProps,
      codeStates['dynamicactions'] = dynamicactions094c3,
      codeStates['setdynamicactions'] = setdynamicactions094c3,
      codeStates['dynamicactions094c3'] = dynamicactions094c3Props,
      codeStates['setdynamicactions094c3'] = setdynamicactions094c3Props,
      codeStates['case_information_group'] = case_information_group28f6f,
      codeStates['setcase_information_group'] = setcase_information_group28f6f,
      codeStates['case_information_group28f6f'] = case_information_group28f6fProps,
      codeStates['setcase_information_group28f6f'] = setcase_information_group28f6fProps,
      codeStates['venue_group'] = venue_group6a36d,
      codeStates['setvenue_group'] = setvenue_group6a36d,
      codeStates['venue_group6a36d'] = venue_group6a36dProps,
      codeStates['setvenue_group6a36d'] = setvenue_group6a36dProps,
      codeStates['georgia_group'] = georgia_group0fa18,
      codeStates['setgeorgia_group'] = setgeorgia_group0fa18,
      codeStates['georgia_group0fa18'] = georgia_group0fa18Props,
      codeStates['setgeorgia_group0fa18'] = setgeorgia_group0fa18Props,
      codeStates['georgias_group'] = georgias_group945fd,
      codeStates['setgeorgias_group'] = setgeorgias_group945fd,
      codeStates['georgias_group945fd'] = georgias_group945fdProps,
      codeStates['setgeorgias_group945fd'] = setgeorgias_group945fdProps,
      codeStates['georgias_groups'] = georgias_groups6f85f,
      codeStates['setgeorgias_groups'] = setgeorgias_groups6f85f,
      codeStates['georgias_groups6f85f'] = georgias_groups6f85fProps,
      codeStates['setgeorgias_groups6f85f'] = setgeorgias_groups6f85fProps,
      codeStates['georgiass_groups'] = georgiass_groups86a87,
      codeStates['setgeorgiass_groups'] = setgeorgiass_groups86a87,
      codeStates['georgiass_groups86a87'] = georgiass_groups86a87Props,
      codeStates['setgeorgiass_groups86a87'] = setgeorgiass_groups86a87Props,
      codeStates['georgsiass_groups'] = georgsiass_groupsb044a,
      codeStates['setgeorgsiass_groups'] = setgeorgsiass_groupsb044a,
      codeStates['georgsiass_groupsb044a'] = georgsiass_groupsb044aProps,
      codeStates['setgeorgsiass_groupsb044a'] = setgeorgsiass_groupsb044aProps,
      codeStates['debtor_information_group'] = debtor_information_group78a70,
      codeStates['setdebtor_information_group'] = setdebtor_information_group78a70,
      codeStates['debtor_information_group78a70'] = debtor_information_group78a70Props,
      codeStates['setdebtor_information_group78a70'] = setdebtor_information_group78a70Props,
      codeStates['financial_details_group'] = financial_details_group52f47,
      codeStates['setfinancial_details_group'] = setfinancial_details_group52f47,
      codeStates['financial_details_group52f47'] = financial_details_group52f47Props,
      codeStates['setfinancial_details_group52f47'] = setfinancial_details_group52f47Props,
      codeStates['venue_details_group'] = venue_details_group17ac6,
      codeStates['setvenue_details_group'] = setvenue_details_group17ac6,
      codeStates['venue_details_group17ac6'] = venue_details_group17ac6Props,
      codeStates['setvenue_details_group17ac6'] = setvenue_details_group17ac6Props,
      codeStates['required_dociument_main_group'] = required_dociument_main_group04e92,
      codeStates['setrequired_dociument_main_group'] = setrequired_dociument_main_group04e92,
      codeStates['required_dociument_main_group04e92'] = required_dociument_main_group04e92Props,
      codeStates['setrequired_dociument_main_group04e92'] = setrequired_dociument_main_group04e92Props,
      codeStates['required_dociument_header_group'] = required_dociument_header_groupe39c8,
      codeStates['setrequired_dociument_header_group'] = setrequired_dociument_header_groupe39c8,
      codeStates['required_dociument_header_groupe39c8'] = required_dociument_header_groupe39c8Props,
      codeStates['setrequired_dociument_header_groupe39c8'] = setrequired_dociument_header_groupe39c8Props,
      codeStates['doc_type_table'] = doc_type_tablebe9fa,
      codeStates['setdoc_type_table'] = setdoc_type_tablebe9fa,
      codeStates['doc_type_tablebe9fa'] = doc_type_tablebe9faProps,
      codeStates['setdoc_type_tablebe9fa'] = setdoc_type_tablebe9faProps,
      codeStates['doc_type_id'] = doc_type_idaf61f,
      codeStates['setdoc_type_id'] = setdoc_type_idaf61f,
      codeStates['doc_type_name'] = doc_type_name949dd,
      codeStates['setdoc_type_name'] = setdoc_type_name949dd,
      codeStates['uploader'] = uploaderdff25,
      codeStates['setuploader'] = setuploaderdff25,
      codeStates['doc_reference_url'] = doc_reference_urld9056,
      codeStates['setdoc_reference_url'] = setdoc_reference_urld9056,
      codeStates['checklist_main_group'] = checklist_main_group0df6b,
      codeStates['setchecklist_main_group'] = setchecklist_main_group0df6b,
      codeStates['checklist_main_group0df6b'] = checklist_main_group0df6bProps,
      codeStates['setchecklist_main_group0df6b'] = setchecklist_main_group0df6bProps,
      codeStates['checklist_group'] = checklist_group32b3d,
      codeStates['setchecklist_group'] = setchecklist_group32b3d,
      codeStates['checklist_group32b3d'] = checklist_group32b3dProps,
      codeStates['setchecklist_group32b3d'] = setchecklist_group32b3dProps,
      codeStates['checklist_table'] = checklist_table198e1,
      codeStates['setchecklist_table'] = setchecklist_table198e1,
      codeStates['checklist_table198e1'] = checklist_table198e1Props,
      codeStates['setchecklist_table198e1'] = setchecklist_table198e1Props,
      codeStates['customwidget'] = customwidgetd1a34,
      codeStates['setcustomwidget'] = setcustomwidgetd1a34,
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
        "2835a4a5d4754169ba15a5e8d16be9fa",
        "fe13ae0852ab473f87e6d1b6ed7dff25"
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
      if (id === "uploaderdff25") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[uploaderdff25?.refresh])


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

    //hideElement
    setcustomwidgetd1a34((prev: any) => ({ ...prev, isHidden: true }));
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
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

 if (uploaderdff25?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:addCase:AFVK:v1','addcase','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='outlined-contrast'
          disabled= {uploaderdff25?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Upload")}
        </Button>}
      </div>
    
  )
}

export default Buttonuploader

