

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGlobal } from '@/context/GlobalContext'
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { clearSetSarchFilterData } from '@/app/utils/commonfunctions';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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
let dfData:any;
let dfdFlag:boolean = false;
let getMapperDetailsBindValues:Record<string, any> ={} ;
const Dropdownmessage_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_nftransaction_v1Props, setdfd_nftransaction_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const keyset:Function=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState<number>(0)
  let getMapperDetails:string[];
  let getMapperDetailsValues:string[];
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef<any>(false);
  const loadingMoreRef = useRef<boolean>(false);    
  const isUserSelectionRef = useRef<boolean>(false);
  const [isDropdownDataReady, setIsDropdownDataReady] = useState<boolean>(false);
  let customecode:string="";
  const [allCode,setAllCode]=useState<string>("");
  const [ruleCode,setRuleCode]=useState<string>("");  
  const [dropdownValue, setdropdownValue] = useState<string | string[]>("");
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  let items:any = [];
  //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {main_group746bf, setmain_group746bf}= useContext(TotalContext) as TotalContextProps;
  const {main_group746bfProps, setmain_group746bfProps}= useContext(TotalContext) as TotalContextProps;
  const {search_label130a2, setsearch_label130a2}= useContext(TotalContext) as TotalContextProps;
  const {top_dividerdea5b, settop_dividerdea5b}= useContext(TotalContext) as TotalContextProps;
  const {trs_created_date28cb9, settrs_created_date28cb9}= useContext(TotalContext) as TotalContextProps;
  const {uuida0e9e, setuuida0e9e}= useContext(TotalContext) as TotalContextProps;
  const {debtor_account_no1b62b, setdebtor_account_no1b62b}= useContext(TotalContext) as TotalContextProps;
  const {debtor_name908b6, setdebtor_name908b6}= useContext(TotalContext) as TotalContextProps;
  const {creditor_account_no14a5f, setcreditor_account_no14a5f}= useContext(TotalContext) as TotalContextProps;
  const {cr_name1ecf4, setcr_name1ecf4}= useContext(TotalContext) as TotalContextProps;
  const {cr_currencydbebf, setcr_currencydbebf}= useContext(TotalContext) as TotalContextProps;
  const {cr_amounta1974, setcr_amounta1974}= useContext(TotalContext) as TotalContextProps;
  const {message_codefa765, setmessage_codefa765}= useContext(TotalContext) as TotalContextProps;
  const {bottom_divideradc51, setbottom_divideradc51}= useContext(TotalContext) as TotalContextProps;
  const {search4197d, setsearch4197d}= useContext(TotalContext) as TotalContextProps;
  const {clear91c04, setclear91c04}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Camt.055',
    'Camt.110',
    'Camt.111',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Camt.055",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Camt.055",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Camt.110",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Camt.110",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Camt.111",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Camt.111",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(main_group746bf?.message_code=="" || main_group746bf?.message_code==undefined || main_group746bf?.message_code==null ){
    setSelectedItem("");
  }
  },[main_group746bf?.message_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "3784ce38ae1194ccec87c8de818746bf",
        "938babaf79db99a673c07fa118bfa765"
      );
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
      if(orchestrationData?.data?.rule?.nodes?.length>0){
        setRuleCode(orchestrationData?.data?.rule)        
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[message_codefa765?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
      for (let i = 0; i < staticValueProps.length; i++) {
        if(staticValueProps[i]?.value?.name === "value"){ 
          if(staticValueProps[i]?.value?.value === value){
            staticTextValue = staticValueProps[i].text.value;
          }
        }
      }
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            temp.push(val)
          }else{
            temp.push(val)
          }        
        }
      }
      setmain_group746bf((prev: any) => ({ ...prev, message_code: staticTextValue, message_codefa765: value}))
         setIsRequredData(false)
    } else {
       setmain_group746bf((prev: any) => ({ ...prev, message_code: '', message_codefa765: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,nfTransactionSearch_v1:{...pre?.nfTransactionSearch_v1,message_code:undefined}}));
   
    // static
    selected.current={
      message_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['main_group'] = main_group746bf,
        codeStates['setmain_group'] = setmain_group746bf,
        codeStates['main_group746bf'] = main_group746bfProps,
        codeStates['setmain_group746bf'] = setmain_group746bfProps,
        codeStates['search_label'] = search_label130a2,
        codeStates['setsearch_label'] = setsearch_label130a2,
        codeStates['top_divider'] = top_dividerdea5b,
        codeStates['settop_divider'] = settop_dividerdea5b,
        codeStates['trs_created_date'] = trs_created_date28cb9,
        codeStates['settrs_created_date'] = settrs_created_date28cb9,
        codeStates['uuid'] = uuida0e9e,
        codeStates['setuuid'] = setuuida0e9e,
        codeStates['debtor_account_no'] = debtor_account_no1b62b,
        codeStates['setdebtor_account_no'] = setdebtor_account_no1b62b,
        codeStates['debtor_name'] = debtor_name908b6,
        codeStates['setdebtor_name'] = setdebtor_name908b6,
        codeStates['creditor_account_no'] = creditor_account_no14a5f,
        codeStates['setcreditor_account_no'] = setcreditor_account_no14a5f,
        codeStates['cr_name'] = cr_name1ecf4,
        codeStates['setcr_name'] = setcr_name1ecf4,
        codeStates['cr_currency'] = cr_currencydbebf,
        codeStates['setcr_currency'] = setcr_currencydbebf,
        codeStates['cr_amount'] = cr_amounta1974,
        codeStates['setcr_amount'] = setcr_amounta1974,
        codeStates['message_code'] = message_codefa765,
        codeStates['setmessage_code'] = setmessage_codefa765,
        codeStates['bottom_divider'] = bottom_divideradc51,
        codeStates['setbottom_divider'] = setbottom_divideradc51,
        codeStates['search'] = search4197d,
        codeStates['setsearch'] = setsearch4197d,
        codeStates['clear'] = clear91c04,
        codeStates['setclear'] = setclear91c04,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    
    try{
    setIsProcessing(true);
    if(value.length==0){
      return
    }
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
    }finally{
      setIsProcessing(false);
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  //validation
  let schemaArray = [] ;
  const handleBlur = async () => {
    //validation
  }
  const main_group746bfRef = useRef<any>(main_group746bf);
  useEffect(() => { main_group746bfRef.current = main_group746bf; }, [main_group746bf]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "938babaf79db99a673c07fa118bfa765") {
        handleClick(main_group746bfRef?.current?.message_codefa765?main_group746bfRef?.current?.message_codefa765:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "938babaf79db99a673c07fa118bfa765");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setmain_group746bf((pre:any)=>({...pre,message_code:""}))
    else
      setInitialCount(1)
  },[message_codefa765?.refresh])
  

  if (message_codefa765?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `53 / 67`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("Select")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {message_codefa765?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Message Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            main_group746bf?.message_codefa765 ? [main_group746bf?.message_codefa765] :
                main_group746bf?.message_code ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(main_group746bf?.message_code))?.value?.value ?? main_group746bf?.message_code) : []
            }
        onChange={handleClick} 
        validationState={validate?.nfTransactionSearch_v1?.message_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownmessage_code;
