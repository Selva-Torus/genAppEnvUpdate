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
import ExportOptionsModal from '../../utils/ExportOptionsModal';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import PageAddcodetypespage10 from '@/app/addcodetypes_v1/addcodetypes_v1page';
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
 

const Buttonedit_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [exportModalOpen, setExportModalOpen] = React.useState<boolean>(false);
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
  const [showProfileAsModalOpen10, setShowProfileAsModalOpen10] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {code_groupe769a, setcode_groupe769a}= useContext(TotalContext) as TotalContextProps;
  const {code_groupe769aProps, setcode_groupe769aProps}= useContext(TotalContext) as TotalContextProps;
  const {code_table4f011, setcode_table4f011}= useContext(TotalContext) as TotalContextProps;
  const {code_table4f011Props, setcode_table4f011Props}= useContext(TotalContext) as TotalContextProps;
  const {code_type_id290d4, setcode_type_id290d4}= useContext(TotalContext) as TotalContextProps;
  const {code_typea529e, setcode_typea529e}= useContext(TotalContext) as TotalContextProps;
  const {descriptionc87f7, setdescriptionc87f7}= useContext(TotalContext) as TotalContextProps;
  const {is_system8e69b, setis_system8e69b}= useContext(TotalContext) as TotalContextProps;
  const {is_active6db20, setis_active6db20}= useContext(TotalContext) as TotalContextProps;
  const {view_btnd2f71, setview_btnd2f71}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn90e4f, setedit_btn90e4f}= useContext(TotalContext) as TotalContextProps;
  const {delete_btneea06, setdelete_btneea06}= useContext(TotalContext) as TotalContextProps;
  const {trs_event_process_status54d4f, settrs_event_process_status54d4f}= useContext(TotalContext) as TotalContextProps;
  const {update_btnd1e18, setupdate_btnd1e18}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144, setdynamicactions48144}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions48144Props, setdynamicactions48144Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btn14068, setsave_btn14068}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aa, setcode_type_informationd59aa}= useContext(TotalContext) as TotalContextProps;
  const {code_type_informationd59aaProps, setcode_type_informationd59aaProps}= useContext(TotalContext) as TotalContextProps;
  const {groupa1a96, setgroupa1a96}= useContext(TotalContext) as TotalContextProps;
  const {groupa1a96Props, setgroupa1a96Props}= useContext(TotalContext) as TotalContextProps;
  const {addcodetypes_v1Props, setaddcodetypes_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['code_group'] = code_groupe769a,
      codeStates['setcode_group'] = setcode_groupe769a,
      codeStates['code_groupe769a'] = code_groupe769aProps,
      codeStates['setcode_groupe769a'] = setcode_groupe769aProps,
      codeStates['code_table'] = code_table4f011,
      codeStates['setcode_table'] = setcode_table4f011,
      codeStates['code_table4f011'] = code_table4f011Props,
      codeStates['setcode_table4f011'] = setcode_table4f011Props,
      codeStates['code_type_id'] = code_type_id290d4,
      codeStates['setcode_type_id'] = setcode_type_id290d4,
      codeStates['code_type'] = code_typea529e,
      codeStates['setcode_type'] = setcode_typea529e,
      codeStates['description'] = descriptionc87f7,
      codeStates['setdescription'] = setdescriptionc87f7,
      codeStates['is_system'] = is_system8e69b,
      codeStates['setis_system'] = setis_system8e69b,
      codeStates['is_active'] = is_active6db20,
      codeStates['setis_active'] = setis_active6db20,
      codeStates['view_btn'] = view_btnd2f71,
      codeStates['setview_btn'] = setview_btnd2f71,
      codeStates['edit_btn'] = edit_btn90e4f,
      codeStates['setedit_btn'] = setedit_btn90e4f,
      codeStates['delete_btn'] = delete_btneea06,
      codeStates['setdelete_btn'] = setdelete_btneea06,
      codeStates['trs_event_process_status'] = trs_event_process_status54d4f,
      codeStates['settrs_event_process_status'] = settrs_event_process_status54d4f,
      codeStates['update_btn'] = update_btnd1e18,
      codeStates['setupdate_btn'] = setupdate_btnd1e18,
      codeStates['dynamicactions'] = dynamicactions48144,
      codeStates['setdynamicactions'] = setdynamicactions48144,
      codeStates['dynamicactions48144'] = dynamicactions48144Props,
      codeStates['setdynamicactions48144'] = setdynamicactions48144Props,
      codeStates['save_btn'] = save_btn14068,
      codeStates['setsave_btn'] = setsave_btn14068,
      codeStates['code_type_information'] = code_type_informationd59aa,
      codeStates['setcode_type_information'] = setcode_type_informationd59aa,
      codeStates['code_type_informationd59aa'] = code_type_informationd59aaProps,
      codeStates['setcode_type_informationd59aa'] = setcode_type_informationd59aaProps,
      codeStates['group'] = groupa1a96,
      codeStates['setgroup'] = setgroupa1a96,
      codeStates['groupa1a96'] = groupa1a96Props,
      codeStates['setgroupa1a96'] = setgroupa1a96Props,
      codeStates['addcodetypes_v1'] = addcodetypes_v1Props,
      codeStates['setaddcodetypes_v1'] = setaddcodetypes_v1Props,
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
        "86a6076b26344fccbc7674d246c4f011",
        "3bccf9a71d0e435c89bf0f5ba8390e4f"
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
      if (id === "edit_btn90e4f") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen10(false)
  },[edit_btn90e4f?.refresh])


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

    //enableElement
    setupdate_btnd1e18((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave_btn14068((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,code_type_informationd59aaProps?.controls);
    setcode_type_informationd59aa(bindData6||{})
    setcode_type_informationd59aaProps({...code_type_informationd59aaProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,groupa1a96Props?.controls);
    setgroupa1a96(bindData8||{})
    setgroupa1a96Props({...groupa1a96Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps10:any =  [];
    let filterData10 = await getFilterProps(filterProps10,mainData);
    setaddcodetypes_v1Props([...filterData10 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen10(true);
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

 if (edit_btn90e4f?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeTypes:AFVK:v1','codetypes','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen10} 
        onClose={() => {
          setShowProfileAsModalOpen10(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit"
        variant="subheader-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addcodetypes"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddcodetypespage10  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {edit_btn90e4f?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

