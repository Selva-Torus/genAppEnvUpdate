'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
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
import PageAddcategorydocumentpage2 from '@/app/addcategorydocument_v1/addcategorydocument_v1page';
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
 

const Buttonbt_add_doc = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const savedData=useRef<Record<string, any>>({})
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
    
 /////////////
   //another screen

  const {asset_dashboard_group485d3, setasset_dashboard_group485d3}= useContext(TotalContext) as TotalContextProps;
  const {asset_dashboard_group485d3Props, setasset_dashboard_group485d3Props}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6, settotal_asset_groupfe2e6}= useContext(TotalContext) as TotalContextProps;
  const {total_asset_groupfe2e6Props, settotal_asset_groupfe2e6Props}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622, setsoftware_category_group6e622}= useContext(TotalContext) as TotalContextProps;
  const {software_category_group6e622Props, setsoftware_category_group6e622Props}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3f, sethardware_category_groupfcf3f}= useContext(TotalContext) as TotalContextProps;
  const {hardware_category_groupfcf3fProps, sethardware_category_groupfcf3fProps}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317, setreq_maint_groupcf317}= useContext(TotalContext) as TotalContextProps;
  const {req_maint_groupcf317Props, setreq_maint_groupcf317Props}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50, setcat_groupe0f50}= useContext(TotalContext) as TotalContextProps;
  const {cat_groupe0f50Props, setcat_groupe0f50Props}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4ac, setcategory_table3e4ac}= useContext(TotalContext) as TotalContextProps;
  const {category_table3e4acProps, setcategory_table3e4acProps}= useContext(TotalContext) as TotalContextProps;
  const {acat_id37980, setacat_id37980}= useContext(TotalContext) as TotalContextProps;
  const {category_code97856, setcategory_code97856}= useContext(TotalContext) as TotalContextProps;
  const {asset_prefix8b10c, setasset_prefix8b10c}= useContext(TotalContext) as TotalContextProps;
  const {category_name11d7f, setcategory_name11d7f}= useContext(TotalContext) as TotalContextProps;
  const {depreciation_method2b046, setdepreciation_method2b046}= useContext(TotalContext) as TotalContextProps;
  const {useful_life_years73932, setuseful_life_years73932}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit226cc, setbt_edit226cc}= useContext(TotalContext) as TotalContextProps;
  const {bt_deleteebf73, setbt_deleteebf73}= useContext(TotalContext) as TotalContextProps;
  const {view0d148, setview0d148}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doc2ee68, setbt_add_doc2ee68}= useContext(TotalContext) as TotalContextProps;
  const {addcategorydocument_v1Props, setaddcategorydocument_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb9604, setdoc_attached_groupb9604}= useContext(TotalContext) as TotalContextProps;
  const {doc_attached_groupb9604Props, setdoc_attached_groupb9604Props}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8, settable_groupefcb8}= useContext(TotalContext) as TotalContextProps;
  const {table_groupefcb8Props, settable_groupefcb8Props}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042, setcategory_doc_table9b042}= useContext(TotalContext) as TotalContextProps;
  const {category_doc_table9b042Props, setcategory_doc_table9b042Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['asset_dashboard_group'] = asset_dashboard_group485d3,
      codeStates['setasset_dashboard_group'] = setasset_dashboard_group485d3,
      codeStates['asset_dashboard_group485d3'] = asset_dashboard_group485d3Props,
      codeStates['setasset_dashboard_group485d3'] = setasset_dashboard_group485d3Props,
      codeStates['total_asset_group'] = total_asset_groupfe2e6,
      codeStates['settotal_asset_group'] = settotal_asset_groupfe2e6,
      codeStates['total_asset_groupfe2e6'] = total_asset_groupfe2e6Props,
      codeStates['settotal_asset_groupfe2e6'] = settotal_asset_groupfe2e6Props,
      codeStates['software_category_group'] = software_category_group6e622,
      codeStates['setsoftware_category_group'] = setsoftware_category_group6e622,
      codeStates['software_category_group6e622'] = software_category_group6e622Props,
      codeStates['setsoftware_category_group6e622'] = setsoftware_category_group6e622Props,
      codeStates['hardware_category_group'] = hardware_category_groupfcf3f,
      codeStates['sethardware_category_group'] = sethardware_category_groupfcf3f,
      codeStates['hardware_category_groupfcf3f'] = hardware_category_groupfcf3fProps,
      codeStates['sethardware_category_groupfcf3f'] = sethardware_category_groupfcf3fProps,
      codeStates['req_maint_group'] = req_maint_groupcf317,
      codeStates['setreq_maint_group'] = setreq_maint_groupcf317,
      codeStates['req_maint_groupcf317'] = req_maint_groupcf317Props,
      codeStates['setreq_maint_groupcf317'] = setreq_maint_groupcf317Props,
      codeStates['cat_group'] = cat_groupe0f50,
      codeStates['setcat_group'] = setcat_groupe0f50,
      codeStates['cat_groupe0f50'] = cat_groupe0f50Props,
      codeStates['setcat_groupe0f50'] = setcat_groupe0f50Props,
      codeStates['category_table'] = category_table3e4ac,
      codeStates['setcategory_table'] = setcategory_table3e4ac,
      codeStates['category_table3e4ac'] = category_table3e4acProps,
      codeStates['setcategory_table3e4ac'] = setcategory_table3e4acProps,
      codeStates['acat_id'] = acat_id37980,
      codeStates['setacat_id'] = setacat_id37980,
      codeStates['category_code'] = category_code97856,
      codeStates['setcategory_code'] = setcategory_code97856,
      codeStates['asset_prefix'] = asset_prefix8b10c,
      codeStates['setasset_prefix'] = setasset_prefix8b10c,
      codeStates['category_name'] = category_name11d7f,
      codeStates['setcategory_name'] = setcategory_name11d7f,
      codeStates['depreciation_method'] = depreciation_method2b046,
      codeStates['setdepreciation_method'] = setdepreciation_method2b046,
      codeStates['useful_life_years'] = useful_life_years73932,
      codeStates['setuseful_life_years'] = setuseful_life_years73932,
      codeStates['bt_edit'] = bt_edit226cc,
      codeStates['setbt_edit'] = setbt_edit226cc,
      codeStates['bt_delete'] = bt_deleteebf73,
      codeStates['setbt_delete'] = setbt_deleteebf73,
      codeStates['view'] = view0d148,
      codeStates['setview'] = setview0d148,
      codeStates['bt_add_doc'] = bt_add_doc2ee68,
      codeStates['setbt_add_doc'] = setbt_add_doc2ee68,
      codeStates['addcategorydocument_v1'] = addcategorydocument_v1Props,
      codeStates['setaddcategorydocument_v1'] = setaddcategorydocument_v1Props,
      codeStates['doc_attached_group'] = doc_attached_groupb9604,
      codeStates['setdoc_attached_group'] = setdoc_attached_groupb9604,
      codeStates['doc_attached_groupb9604'] = doc_attached_groupb9604Props,
      codeStates['setdoc_attached_groupb9604'] = setdoc_attached_groupb9604Props,
      codeStates['table_group'] = table_groupefcb8,
      codeStates['settable_group'] = settable_groupefcb8,
      codeStates['table_groupefcb8'] = table_groupefcb8Props,
      codeStates['settable_groupefcb8'] = settable_groupefcb8Props,
      codeStates['category_doc_table'] = category_doc_table9b042,
      codeStates['setcategory_doc_table'] = setcategory_doc_table9b042,
      codeStates['category_doc_table9b042'] = category_doc_table9b042Props,
      codeStates['setcategory_doc_table9b042'] = setcategory_doc_table9b042Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "3de40d278fed40108fe057ba6413e4ac",
        "f749c31e18364b6baef7ea1dda22ee68"
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
      if (id === "bt_add_doc2ee68") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_add_doc2ee68?.refresh])

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
      setIsProcessing(true);
      await delay(1000);
        //onClick

    // showArtifactAsModal
    let filterProps2:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:categoryDocTable:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "48c4b1c6791435810a704a064e7a657b",
        "object": {
          "properties.acat_id": "802575a760fe484f8e6eb5d42bd37980"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setaddcategorydocument_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,doc_attached_groupb9604Props?.controls);
    setdoc_attached_groupb9604(bindData4||{})
    setdoc_attached_groupb9604Props({...doc_attached_groupb9604Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,table_groupefcb8Props?.controls);
    settable_groupefcb8(bindData6||{})
    settable_groupefcb8Props({...table_groupefcb8Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,category_doc_table9b042Props?.controls);
    setcategory_doc_table9b042(bindData8||{})
    setcategory_doc_table9b042Props({...category_doc_table9b042Props,presetValues:mainData||{}})  
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

 if (bt_add_doc2ee68?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetCategory:AFVK:v1','assetcategory','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Attachments"
        showOverlay = {true}
        position = {"center"}
        modalName = "addcategorydocument"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddcategorydocumentpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_add_doc2ee68?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Attachments")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_add_doc

