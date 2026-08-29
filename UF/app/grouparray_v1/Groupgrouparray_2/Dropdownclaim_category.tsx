

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
const Dropdownclaim_category = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
  const { token } = useGlobal();
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
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
  const {grouparray494e0_0, setgrouparray494e0_0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_0Props, setgrouparray494e0_0Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1, setgrouparray494e0_1}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_1Props, setgrouparray494e0_1Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2, setgrouparray494e0_2}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_2Props, setgrouparray494e0_2Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3, setgrouparray494e0_3}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_3Props, setgrouparray494e0_3Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4, setgrouparray494e0_4}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_4Props, setgrouparray494e0_4Props}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5, setgrouparray494e0_5}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0_5Props, setgrouparray494e0_5Props}= useContext(TotalContext) as TotalContextProps;
  const {group84b9c, setgroup84b9c}= useContext(TotalContext) as TotalContextProps;
  const {group84b9cProps, setgroup84b9cProps}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0, setgrouparray494e0}= useContext(TotalContext) as TotalContextProps;
  const {grouparray494e0Props, setgrouparray494e0Props}= useContext(TotalContext) as TotalContextProps;
  const {daily_expense3c178, setdaily_expense3c178}= useContext(TotalContext) as TotalContextProps;
  const {expense_namec83ee, setexpense_namec83ee}= useContext(TotalContext) as TotalContextProps;
  const {email0c3ca, setemail0c3ca}= useContext(TotalContext) as TotalContextProps;
  const {expense_datee6e16, setexpense_datee6e16}= useContext(TotalContext) as TotalContextProps;
  const {claim_categoryf03f1, setclaim_categoryf03f1}= useContext(TotalContext) as TotalContextProps;
  const {category_total_amount49375, setcategory_total_amount49375}= useContext(TotalContext) as TotalContextProps;
  const {receipt_image4f1bf, setreceipt_image4f1bf}= useContext(TotalContext) as TotalContextProps;
  const {comments7171e, setcomments7171e}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'Food',
    'Travel',
    'Stationary Items',
    'Others',
  ];

  useEffect(() => {
  if(grouparray494e0_2?.claim_category=="" || grouparray494e0_2?.claim_category==undefined || grouparray494e0_2?.claim_category==null ){
    setSelectedItem("");
  }
  },[grouparray494e0_2?.claim_category])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "05177fac499640d4bf45a199a95494e0",
        "78dae5d535e248a08e9a4f2c15cf03f1"
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
  },[claim_categoryf03f1?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[];
      let staticTextValue:string = '';
      let staticValueProps : any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Food",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Food",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Travel",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Travel",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Stationary Items",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Stationary Items",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "Others",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "Others",
      "enabled": true
    }
  }
];
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
      setgrouparray494e0_2((prev: any) => ({ ...prev, claim_category: staticTextValue, claim_categoryf03f1: value}))
         setIsRequredData(false)
    } else {
       setgrouparray494e0_2((prev: any) => ({ ...prev, claim_category: '', claim_categoryf03f1: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,GroupArray_v1:{...pre?.GroupArray_v1,claim_category:undefined}}));
   
    // static
    selected.current={
      claim_category:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['grouparray49'] = grouparray494e0_0,
        codeStates['setgrouparray49'] = setgrouparray494e0_0,
        codeStates['grouparray494e0_0'] = grouparray494e0_0Props,
        codeStates['setgrouparray494e0_0'] = setgrouparray494e0_0Props,
        codeStates['grouparray49'] = grouparray494e0_1,
        codeStates['setgrouparray49'] = setgrouparray494e0_1,
        codeStates['grouparray494e0_1'] = grouparray494e0_1Props,
        codeStates['setgrouparray494e0_1'] = setgrouparray494e0_1Props,
        codeStates['grouparray49'] = grouparray494e0_2,
        codeStates['setgrouparray49'] = setgrouparray494e0_2,
        codeStates['grouparray494e0_2'] = grouparray494e0_2Props,
        codeStates['setgrouparray494e0_2'] = setgrouparray494e0_2Props,
        codeStates['grouparray49'] = grouparray494e0_3,
        codeStates['setgrouparray49'] = setgrouparray494e0_3,
        codeStates['grouparray494e0_3'] = grouparray494e0_3Props,
        codeStates['setgrouparray494e0_3'] = setgrouparray494e0_3Props,
        codeStates['grouparray49'] = grouparray494e0_4,
        codeStates['setgrouparray49'] = setgrouparray494e0_4,
        codeStates['grouparray494e0_4'] = grouparray494e0_4Props,
        codeStates['setgrouparray494e0_4'] = setgrouparray494e0_4Props,
        codeStates['grouparray49'] = grouparray494e0_5,
        codeStates['setgrouparray49'] = setgrouparray494e0_5,
        codeStates['grouparray494e0_5'] = grouparray494e0_5Props,
        codeStates['setgrouparray494e0_5'] = setgrouparray494e0_5Props,
        codeStates['group'] = group84b9c,
        codeStates['setgroup'] = setgroup84b9c,
        codeStates['group84b9c'] = group84b9cProps,
        codeStates['setgroup84b9c'] = setgroup84b9cProps,
        codeStates['grouparray'] = grouparray494e0,
        codeStates['setgrouparray'] = setgrouparray494e0,
        codeStates['grouparray494e0'] = grouparray494e0Props,
        codeStates['setgrouparray494e0'] = setgrouparray494e0Props,
        codeStates['daily_expense'] = daily_expense3c178,
        codeStates['setdaily_expense'] = setdaily_expense3c178,
        codeStates['expense_name'] = expense_namec83ee,
        codeStates['setexpense_name'] = setexpense_namec83ee,
        codeStates['email'] = email0c3ca,
        codeStates['setemail'] = setemail0c3ca,
        codeStates['expense_date'] = expense_datee6e16,
        codeStates['setexpense_date'] = setexpense_datee6e16,
        codeStates['claim_category'] = claim_categoryf03f1,
        codeStates['setclaim_category'] = setclaim_categoryf03f1,
        codeStates['category_total_amount'] = category_total_amount49375,
        codeStates['setcategory_total_amount'] = setcategory_total_amount49375,
        codeStates['receipt_image'] = receipt_image4f1bf,
        codeStates['setreceipt_image'] = setreceipt_image4f1bf,
        codeStates['comments'] = comments7171e,
        codeStates['setcomments'] = setcomments7171e,
        codeStates['grouparray_0'] = grouparray494e0_0,
        codeStates['setgrouparray_0'] = setgrouparray494e0_0,
        codeStates['grouparray_1'] = grouparray494e0_1,
        codeStates['setgrouparray_1'] = setgrouparray494e0_1,
        codeStates['grouparray_2'] = grouparray494e0_2,
        codeStates['setgrouparray_2'] = setgrouparray494e0_2,
        codeStates['grouparray_3'] = grouparray494e0_3,
        codeStates['setgrouparray_3'] = setgrouparray494e0_3,
        codeStates['grouparray_4'] = grouparray494e0_4,
        codeStates['setgrouparray_4'] = setgrouparray494e0_4,
        codeStates['grouparray_5'] = grouparray494e0_5,
        codeStates['setgrouparray_5'] = setgrouparray494e0_5,
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
  const grouparray494e0_2Ref = useRef<any>(grouparray494e0_2);
  useEffect(() => { grouparray494e0_2Ref.current = grouparray494e0_2; }, [grouparray494e0_2]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "78dae5d535e248a08e9a4f2c15cf03f1") {
        handleClick(grouparray494e0_2Ref?.current?.claim_categoryf03f1?grouparray494e0_2Ref?.current?.claim_categoryf03f1:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "78dae5d535e248a08e9a4f2c15cf03f1");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgrouparray494e0_2((pre:any)=>({...pre,claim_category:""}))
    else
      setInitialCount(1)
  },[claim_categoryf03f1?.refresh])
  

  if (claim_categoryf03f1?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `10 / 17`,
        gridRow: `75 / 89`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {claim_categoryf03f1?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Claim Category
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            grouparray494e0_2?.claim_categoryf03f1 ? [grouparray494e0_2?.claim_categoryf03f1] :
                grouparray494e0_2?.claim_category ? grouparray494e0_2?.claim_category : []
            }
        onChange={handleClick} 
        validationState={validate?.GroupArray_v1?.claim_category ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownclaim_category;
