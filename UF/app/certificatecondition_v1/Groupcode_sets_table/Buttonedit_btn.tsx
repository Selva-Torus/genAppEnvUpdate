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
import PageAddcertificationconditionpage6 from '@/app/addcertificationcondition_v1/addcertificationcondition_v1page';
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
  const [showProfileAsModalOpen6, setShowProfileAsModalOpen6] = React.useState<boolean>(false);
    // Modal mounts PageNewassetpage18 right away (so its te/eventEmitter calls
  // can start), but stays visually hidden until the page reports its
  // initial load is done -- avoids revealing a half-loaded modal.
  const [assetDataReady, setAssetDataReady] = React.useState<boolean>(false);
 /////////////
   //another screen

  const {codesets_groupedfac, setcodesets_groupedfac}= useContext(TotalContext) as TotalContextProps;
  const {codesets_groupedfacProps, setcodesets_groupedfacProps}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tableee3b7, setcode_sets_tableee3b7}= useContext(TotalContext) as TotalContextProps;
  const {code_sets_tableee3b7Props, setcode_sets_tableee3b7Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_condition_id207b7, setcert_condition_id207b7}= useContext(TotalContext) as TotalContextProps;
  const {condition_textc845e, setcondition_textc845e}= useContext(TotalContext) as TotalContextProps;
  const {due_datebc916, setdue_datebc916}= useContext(TotalContext) as TotalContextProps;
  const {edit_btn9ddb9, setedit_btn9ddb9}= useContext(TotalContext) as TotalContextProps;
  const {delete_btn57f4e, setdelete_btn57f4e}= useContext(TotalContext) as TotalContextProps;
  const {closed_on6f4e5, setclosed_on6f4e5}= useContext(TotalContext) as TotalContextProps;
  const {status_codee5fc9, setstatus_codee5fc9}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1, setgroup85ee1}= useContext(TotalContext) as TotalContextProps;
  const {group85ee1Props, setgroup85ee1Props}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93, setrule_config_groupa2b93}= useContext(TotalContext) as TotalContextProps;
  const {rule_config_groupa2b93Props, setrule_config_groupa2b93Props}= useContext(TotalContext) as TotalContextProps;
  const {addcertificationcondition_v1Props, setaddcertificationcondition_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {save_btn377c9, setsave_btn377c9}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417, setdynamicactionsbe417}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsbe417Props, setdynamicactionsbe417Props}= useContext(TotalContext) as TotalContextProps;
  const {update_btnf97f3, setupdate_btnf97f3}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42f, setinfo_groupcb42f}= useContext(TotalContext) as TotalContextProps;
  const {info_groupcb42fProps, setinfo_groupcb42fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['codesets_group'] = codesets_groupedfac,
      codeStates['setcodesets_group'] = setcodesets_groupedfac,
      codeStates['codesets_groupedfac'] = codesets_groupedfacProps,
      codeStates['setcodesets_groupedfac'] = setcodesets_groupedfacProps,
      codeStates['code_sets_table'] = code_sets_tableee3b7,
      codeStates['setcode_sets_table'] = setcode_sets_tableee3b7,
      codeStates['code_sets_tableee3b7'] = code_sets_tableee3b7Props,
      codeStates['setcode_sets_tableee3b7'] = setcode_sets_tableee3b7Props,
      codeStates['cert_condition_id'] = cert_condition_id207b7,
      codeStates['setcert_condition_id'] = setcert_condition_id207b7,
      codeStates['condition_text'] = condition_textc845e,
      codeStates['setcondition_text'] = setcondition_textc845e,
      codeStates['due_date'] = due_datebc916,
      codeStates['setdue_date'] = setdue_datebc916,
      codeStates['edit_btn'] = edit_btn9ddb9,
      codeStates['setedit_btn'] = setedit_btn9ddb9,
      codeStates['delete_btn'] = delete_btn57f4e,
      codeStates['setdelete_btn'] = setdelete_btn57f4e,
      codeStates['closed_on'] = closed_on6f4e5,
      codeStates['setclosed_on'] = setclosed_on6f4e5,
      codeStates['status_code'] = status_codee5fc9,
      codeStates['setstatus_code'] = setstatus_codee5fc9,
      codeStates['group'] = group85ee1,
      codeStates['setgroup'] = setgroup85ee1,
      codeStates['group85ee1'] = group85ee1Props,
      codeStates['setgroup85ee1'] = setgroup85ee1Props,
      codeStates['rule_config_group'] = rule_config_groupa2b93,
      codeStates['setrule_config_group'] = setrule_config_groupa2b93,
      codeStates['rule_config_groupa2b93'] = rule_config_groupa2b93Props,
      codeStates['setrule_config_groupa2b93'] = setrule_config_groupa2b93Props,
      codeStates['addcertificationcondition_v1'] = addcertificationcondition_v1Props,
      codeStates['setaddcertificationcondition_v1'] = setaddcertificationcondition_v1Props,
      codeStates['save_btn'] = save_btn377c9,
      codeStates['setsave_btn'] = setsave_btn377c9,
      codeStates['dynamicactions'] = dynamicactionsbe417,
      codeStates['setdynamicactions'] = setdynamicactionsbe417,
      codeStates['dynamicactionsbe417'] = dynamicactionsbe417Props,
      codeStates['setdynamicactionsbe417'] = setdynamicactionsbe417Props,
      codeStates['update_btn'] = update_btnf97f3,
      codeStates['setupdate_btn'] = setupdate_btnf97f3,
      codeStates['info_group'] = info_groupcb42f,
      codeStates['setinfo_group'] = setinfo_groupcb42f,
      codeStates['info_groupcb42f'] = info_groupcb42fProps,
      codeStates['setinfo_groupcb42f'] = setinfo_groupcb42fProps,
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
        "ec94f86fbeea65f5b26e9ebe93bee3b7",
        "265902fc8369242c81990e857fe9ddb9"
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
      if (id === "edit_btn9ddb9") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen6(false)
  },[edit_btn9ddb9?.refresh])


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
    let bindData2 = filterByKeys(mainData,group85ee1Props?.controls);
    setgroup85ee1(bindData2||{})
    setgroup85ee1Props({...group85ee1Props,presetValues:{...(mainData||{})}})
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,rule_config_groupa2b93Props?.controls);
    setrule_config_groupa2b93(bindData4||{})
    setrule_config_groupa2b93Props({...rule_config_groupa2b93Props,presetValues:{...(mainData||{})}})
    // showArtifactAsModal
    let filterProps6:any =  [];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setaddcertificationcondition_v1Props([...filterData6 ]);
  setAssetDataReady(false);          
    setShowProfileAsModalOpen6(true);
    //disableElement
    setsave_btn377c9((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setupdate_btnf97f3((prev: any) => ({ ...prev, isDisabled: false }));
    //bindTran
    // For group or table
    setinfo_groupcb42f(mainData||{})
    setinfo_groupcb42fProps({...info_groupcb42fProps,presetValues:{...(mainData||{})}})
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

 if (edit_btn9ddb9?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:TAG:AFGK:TAG:AFK:certificateCondition:AFVK:v1','certificatecondition','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen6} 
        onClose={() => {
          setShowProfileAsModalOpen6(false);
          setValidate({})
          setValidateRefetch({ value: false, init: 0 })
        }}
        title="Edit Condition"
        variant="header-1"
        ready={assetDataReady}
        showOverlay = {true}
        position = {"center"}
        modalName = "addcertificationcondition"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddcertificationconditionpage6  onReady={handleAssetPageReady}/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600 hover:!bg-[#ffffff]"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btn9ddb9?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

