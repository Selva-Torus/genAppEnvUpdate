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
import PageViewscodevaluepage8 from '@/app/viewscodevalue_v1/viewscodevalue_v1page';
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
 

const Buttonview_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData,onSelectLock,rowIndex,currentSelectedIds,skipUnlockRef,tableName}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any,onSelectLock?:any,rowIndex?:number,currentSelectedIds?:string[],skipUnlockRef?:React.MutableRefObject<boolean>,tableName?:string}) => {
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
  const [showProfileAsModalOpen8, setShowProfileAsModalOpen8] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {codesets_groupbc8b0, setcodesets_groupbc8b0}= useContext(TotalContext) as TotalContextProps;
  const {codesets_groupbc8b0Props, setcodesets_groupbc8b0Props}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811, setcode_sets_tablec9811}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tablec9811Props, setcode_sets_tablec9811Props}= useContext(TotalContext) as TotalContextProps;
  const {code_value_id599be, setcode_value_id599be}= useContext(TotalContext) as TotalContextProps;
  const {code_type_idcc48b, setcode_type_idcc48b}= useContext(TotalContext) as TotalContextProps;
  const {code597af, setcode597af}= useContext(TotalContext) as TotalContextProps;
  const {display_named01df, setdisplay_named01df}= useContext(TotalContext) as TotalContextProps;
  const {descriptione73c2, setdescriptione73c2}= useContext(TotalContext) as TotalContextProps;
  const {is_active35e58, setis_active35e58}= useContext(TotalContext) as TotalContextProps;
  const {view_btn5b489, setview_btn5b489}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna0277, setedit_btna0277}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn10f06, setdelete_btn10f06}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3, setcode_value_group30fa3}= useContext(TotalContext) as TotalContextProps;
  const {code_value_group30fa3Props, setcode_value_group30fa3Props}= useContext(TotalContext) as TotalContextProps;
  const {code_group871cc, setcode_group871cc}= useContext(TotalContext) as TotalContextProps;
  const {code_group871ccProps, setcode_group871ccProps}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28, setcode_value_config_groupa4a28}= useContext(TotalContext) as TotalContextProps;
  const {code_value_config_groupa4a28Props, setcode_value_config_groupa4a28Props}= useContext(TotalContext) as TotalContextProps;
  const {viewscodevalue_v1Props, setviewscodevalue_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['codesets_group'] = codesets_groupbc8b0,
      codeStates['setcodesets_group'] = setcodesets_groupbc8b0,
      codeStates['codesets_groupbc8b0'] = codesets_groupbc8b0Props,
      codeStates['setcodesets_groupbc8b0'] = setcodesets_groupbc8b0Props,
      codeStates['code_sets_table'] = code_sets_tablec9811,
      codeStates['setcode_sets_table'] = setcode_sets_tablec9811,
      codeStates['code_sets_tablec9811'] = code_sets_tablec9811Props,
      codeStates['setcode_sets_tablec9811'] = setcode_sets_tablec9811Props,
      codeStates['code_value_id'] = code_value_id599be,
      codeStates['setcode_value_id'] = setcode_value_id599be,
      codeStates['code_type_id'] = code_type_idcc48b,
      codeStates['setcode_type_id'] = setcode_type_idcc48b,
      codeStates['code'] = code597af,
      codeStates['setcode'] = setcode597af,
      codeStates['display_name'] = display_named01df,
      codeStates['setdisplay_name'] = setdisplay_named01df,
      codeStates['description'] = descriptione73c2,
      codeStates['setdescription'] = setdescriptione73c2,
      codeStates['is_active'] = is_active35e58,
      codeStates['setis_active'] = setis_active35e58,
      codeStates['view_btn'] = view_btn5b489,
      codeStates['setview_btn'] = setview_btn5b489,
      codeStates['edit_btn'] = edit_btna0277,
      codeStates['setedit_btn'] = setedit_btna0277,
      codeStates['delete_btn'] = delete_btn10f06,
      codeStates['setdelete_btn'] = setdelete_btn10f06,
      codeStates['code_value_group'] = code_value_group30fa3,
      codeStates['setcode_value_group'] = setcode_value_group30fa3,
      codeStates['code_value_group30fa3'] = code_value_group30fa3Props,
      codeStates['setcode_value_group30fa3'] = setcode_value_group30fa3Props,
      codeStates['code_group'] = code_group871cc,
      codeStates['setcode_group'] = setcode_group871cc,
      codeStates['code_group871cc'] = code_group871ccProps,
      codeStates['setcode_group871cc'] = setcode_group871ccProps,
      codeStates['code_value_config_group'] = code_value_config_groupa4a28,
      codeStates['setcode_value_config_group'] = setcode_value_config_groupa4a28,
      codeStates['code_value_config_groupa4a28'] = code_value_config_groupa4a28Props,
      codeStates['setcode_value_config_groupa4a28'] = setcode_value_config_groupa4a28Props,
      codeStates['viewscodevalue_v1'] = viewscodevalue_v1Props,
      codeStates['setviewscodevalue_v1'] = setviewscodevalue_v1Props,
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
        "c1f53e1b22158e787919d4f1987c9811",
        "b73a54d381eac38d664415c884a5b489"
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
      if (id === "view_btn5b489") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen8(false)
  },[view_btn5b489?.refresh])


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

    //bindTran
    // For group or table
    setcode_value_group30fa3(mainData||{})
    setcode_value_group30fa3Props({...code_value_group30fa3Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    setcode_group871cc(mainData||{})
    setcode_group871ccProps({...code_group871ccProps,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    setcode_value_config_groupa4a28(mainData||{})
    setcode_value_config_groupa4a28Props({...code_value_config_groupa4a28Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps8:any =  [];
    let filterData8 = await getFilterProps(filterProps8,mainData);
    setviewscodevalue_v1Props([...filterData8 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen8(true);
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

 if (view_btn5b489?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:codeValue:AFVK:v1','codevalue','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen8} 
        onClose={() => {
          setShowProfileAsModalOpen8(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="View Code Value"
        variant="subheader-3"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "viewscodevalue"
        className='w-[80%] h-[60%] bg-gray-50 overflow-auto'
      >
        <PageViewscodevaluepage8  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {view_btn5b489?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_btn

