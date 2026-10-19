

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
const Dropdownoperator_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {add_group713a3, setadd_group713a3}= useContext(TotalContext) as TotalContextProps;
  const {add_group713a3Props, setadd_group713a3Props}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6e, setrisk_rule_cond_grp9fa6e}= useContext(TotalContext) as TotalContextProps;
  const {risk_rule_cond_grp9fa6eProps, setrisk_rule_cond_grp9fa6eProps}= useContext(TotalContext) as TotalContextProps;
  const {rule_nameb202a, setrule_nameb202a}= useContext(TotalContext) as TotalContextProps;
  const {sequence_no20c50, setsequence_no20c50}= useContext(TotalContext) as TotalContextProps;
  const {operator_code06297, setoperator_code06297}= useContext(TotalContext) as TotalContextProps;
  const {compare_valueaa22d, setcompare_valueaa22d}= useContext(TotalContext) as TotalContextProps;
  const {attribute_name1565b, setattribute_name1565b}= useContext(TotalContext) as TotalContextProps;
  const {is_activea3076, setis_activea3076}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'IN',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "IN",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "IN",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(risk_rule_cond_grp9fa6e?.operator_code=="" || risk_rule_cond_grp9fa6e?.operator_code==undefined || risk_rule_cond_grp9fa6e?.operator_code==null ){
    setSelectedItem("");
  }
  },[risk_rule_cond_grp9fa6e?.operator_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "5ea00bc4b4c97dc044026d95c0f9fa6e",
        "1fe0577011eda128994af1fdf8806297"
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
  },[operator_code06297?.refresh])

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
      setrisk_rule_cond_grp9fa6e((prev: any) => ({ ...prev, operator_code: staticTextValue, operator_code06297: value}))
         setIsRequredData(false)
    } else {
       setrisk_rule_cond_grp9fa6e((prev: any) => ({ ...prev, operator_code: '', operator_code06297: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,viewRiskRuleCondition_v1:{...pre?.viewRiskRuleCondition_v1,operator_code:undefined}}));
   
    // static
    selected.current={
      operator_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['add_group'] = add_group713a3,
        codeStates['setadd_group'] = setadd_group713a3,
        codeStates['add_group713a3'] = add_group713a3Props,
        codeStates['setadd_group713a3'] = setadd_group713a3Props,
        codeStates['risk_rule_cond_grp'] = risk_rule_cond_grp9fa6e,
        codeStates['setrisk_rule_cond_grp'] = setrisk_rule_cond_grp9fa6e,
        codeStates['risk_rule_cond_grp9fa6e'] = risk_rule_cond_grp9fa6eProps,
        codeStates['setrisk_rule_cond_grp9fa6e'] = setrisk_rule_cond_grp9fa6eProps,
        codeStates['rule_name'] = rule_nameb202a,
        codeStates['setrule_name'] = setrule_nameb202a,
        codeStates['sequence_no'] = sequence_no20c50,
        codeStates['setsequence_no'] = setsequence_no20c50,
        codeStates['operator_code'] = operator_code06297,
        codeStates['setoperator_code'] = setoperator_code06297,
        codeStates['compare_value'] = compare_valueaa22d,
        codeStates['setcompare_value'] = setcompare_valueaa22d,
        codeStates['attribute_name'] = attribute_name1565b,
        codeStates['setattribute_name'] = setattribute_name1565b,
        codeStates['is_active'] = is_activea3076,
        codeStates['setis_active'] = setis_activea3076,
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
  const risk_rule_cond_grp9fa6eRef = useRef<any>(risk_rule_cond_grp9fa6e);
  useEffect(() => { risk_rule_cond_grp9fa6eRef.current = risk_rule_cond_grp9fa6e; }, [risk_rule_cond_grp9fa6e]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "1fe0577011eda128994af1fdf8806297") {
        handleClick(risk_rule_cond_grp9fa6eRef?.current?.operator_code06297?risk_rule_cond_grp9fa6eRef?.current?.operator_code06297:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "1fe0577011eda128994af1fdf8806297");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setrisk_rule_cond_grp9fa6e((pre:any)=>({...pre,operator_code:""}))
    else
      setInitialCount(1)
  },[operator_code06297?.refresh])
  

  if (operator_code06297?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `17 / 25`,
        gridRow: `2 / 14`,
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
        disabled= {operator_code06297?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Operator code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            risk_rule_cond_grp9fa6e?.operator_code06297 ? [risk_rule_cond_grp9fa6e?.operator_code06297] :
                risk_rule_cond_grp9fa6e?.operator_code ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(risk_rule_cond_grp9fa6e?.operator_code))?.value?.value ?? risk_rule_cond_grp9fa6e?.operator_code) : []
            }
        onChange={handleClick} 
        validationState={validate?.viewRiskRuleCondition_v1?.operator_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownoperator_code;
