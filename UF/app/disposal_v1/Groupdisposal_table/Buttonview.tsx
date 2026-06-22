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
import PageAssetdisposalviewpage2 from '@/app/assetdisposalview_v1/assetdisposalview_v1page';
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
 

const Buttonview = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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

  const {overall_disposal_group04cba, setoverall_disposal_group04cba}= useContext(TotalContext) as TotalContextProps;
  const {overall_disposal_group04cbaProps, setoverall_disposal_group04cbaProps}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8c, seticon_text_group23d8c}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group23d8cProps, seticon_text_group23d8cProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5d, setdisposal_table75a5d}= useContext(TotalContext) as TotalContextProps;
  const {disposal_table75a5dProps, setdisposal_table75a5dProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_id46e83, setdisposal_id46e83}= useContext(TotalContext) as TotalContextProps;
  const {asset_namedaa81, setasset_namedaa81}= useContext(TotalContext) as TotalContextProps;
  const {disposal_methodba6cd, setdisposal_methodba6cd}= useContext(TotalContext) as TotalContextProps;
  const {disposal_datee0685, setdisposal_datee0685}= useContext(TotalContext) as TotalContextProps;
  const {witness_nameba0b9, setwitness_nameba0b9}= useContext(TotalContext) as TotalContextProps;
  const {data_wipe_methodc4b88, setdata_wipe_methodc4b88}= useContext(TotalContext) as TotalContextProps;
  const {disposal_cost910b8, setdisposal_cost910b8}= useContext(TotalContext) as TotalContextProps;
  const {view6b7cc, setview6b7cc}= useContext(TotalContext) as TotalContextProps;
  const {bt_editb236b, setbt_editb236b}= useContext(TotalContext) as TotalContextProps;
  const {assetdisposalview_v1Props, setassetdisposalview_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_group0196a, setinitiate_asset_disposal_group0196a}= useContext(TotalContext) as TotalContextProps;
  const {initiate_asset_disposal_group0196aProps, setinitiate_asset_disposal_group0196aProps}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369, setdisposal_details_groupaa369}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaa369Props, setdisposal_details_groupaa369Props}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8, setcompliance_financial_groupe5dd8}= useContext(TotalContext) as TotalContextProps;
  const {compliance_financial_groupe5dd8Props, setcompliance_financial_groupe5dd8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_disposal_group'] = overall_disposal_group04cba,
      codeStates['setoverall_disposal_group'] = setoverall_disposal_group04cba,
      codeStates['overall_disposal_group04cba'] = overall_disposal_group04cbaProps,
      codeStates['setoverall_disposal_group04cba'] = setoverall_disposal_group04cbaProps,
      codeStates['icon_text_group'] = icon_text_group23d8c,
      codeStates['seticon_text_group'] = seticon_text_group23d8c,
      codeStates['icon_text_group23d8c'] = icon_text_group23d8cProps,
      codeStates['seticon_text_group23d8c'] = seticon_text_group23d8cProps,
      codeStates['disposal_table'] = disposal_table75a5d,
      codeStates['setdisposal_table'] = setdisposal_table75a5d,
      codeStates['disposal_table75a5d'] = disposal_table75a5dProps,
      codeStates['setdisposal_table75a5d'] = setdisposal_table75a5dProps,
      codeStates['disposal_id'] = disposal_id46e83,
      codeStates['setdisposal_id'] = setdisposal_id46e83,
      codeStates['asset_name'] = asset_namedaa81,
      codeStates['setasset_name'] = setasset_namedaa81,
      codeStates['disposal_method'] = disposal_methodba6cd,
      codeStates['setdisposal_method'] = setdisposal_methodba6cd,
      codeStates['disposal_date'] = disposal_datee0685,
      codeStates['setdisposal_date'] = setdisposal_datee0685,
      codeStates['witness_name'] = witness_nameba0b9,
      codeStates['setwitness_name'] = setwitness_nameba0b9,
      codeStates['data_wipe_method'] = data_wipe_methodc4b88,
      codeStates['setdata_wipe_method'] = setdata_wipe_methodc4b88,
      codeStates['disposal_cost'] = disposal_cost910b8,
      codeStates['setdisposal_cost'] = setdisposal_cost910b8,
      codeStates['view'] = view6b7cc,
      codeStates['setview'] = setview6b7cc,
      codeStates['bt_edit'] = bt_editb236b,
      codeStates['setbt_edit'] = setbt_editb236b,
      codeStates['assetdisposalview_v1'] = assetdisposalview_v1Props,
      codeStates['setassetdisposalview_v1'] = setassetdisposalview_v1Props,
      codeStates['initiate_asset_disposal_group'] = initiate_asset_disposal_group0196a,
      codeStates['setinitiate_asset_disposal_group'] = setinitiate_asset_disposal_group0196a,
      codeStates['initiate_asset_disposal_group0196a'] = initiate_asset_disposal_group0196aProps,
      codeStates['setinitiate_asset_disposal_group0196a'] = setinitiate_asset_disposal_group0196aProps,
      codeStates['disposal_details_group'] = disposal_details_groupaa369,
      codeStates['setdisposal_details_group'] = setdisposal_details_groupaa369,
      codeStates['disposal_details_groupaa369'] = disposal_details_groupaa369Props,
      codeStates['setdisposal_details_groupaa369'] = setdisposal_details_groupaa369Props,
      codeStates['compliance_financial_group'] = compliance_financial_groupe5dd8,
      codeStates['setcompliance_financial_group'] = setcompliance_financial_groupe5dd8,
      codeStates['compliance_financial_groupe5dd8'] = compliance_financial_groupe5dd8Props,
      codeStates['setcompliance_financial_groupe5dd8'] = setcompliance_financial_groupe5dd8Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "356fd7ddf8ed4df7909d896283975a5d",
        "bc60424c15d94e66a7bd9b008af6b7cc"
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
      if (id === "view6b7cc") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view6b7cc?.refresh])

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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "1d36f55182b042ad946873239ea59ff0",
        "object": {
          "properties.disposal_id": "f563558ead094d6aba4142d194946e83"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setassetdisposalview_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,initiate_asset_disposal_group0196aProps?.controls);
    setinitiate_asset_disposal_group0196a(bindData4||{})
    setinitiate_asset_disposal_group0196aProps({...initiate_asset_disposal_group0196aProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,disposal_details_groupaa369Props?.controls);
    setdisposal_details_groupaa369(bindData6||{})
    setdisposal_details_groupaa369Props({...disposal_details_groupaa369Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,compliance_financial_groupe5dd8Props?.controls);
    setcompliance_financial_groupe5dd8(bindData8||{})
    setcompliance_financial_groupe5dd8Props({...compliance_financial_groupe5dd8Props,presetValues:mainData||{}})  
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

 if (view6b7cc?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assetDisposal:AFVK:v1','assetdisposal','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Disposal View"
        showOverlay = {true}
        position = {"center"}
        modalName = "assetdisposalview"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAssetdisposalviewpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view6b7cc?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview

