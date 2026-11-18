

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
const Dropdownasset_name = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_group4dbd5, setoverall_group4dbd5}= useContext(TotalContext) as TotalContextProps;
  const {overall_group4dbd5Props, setoverall_group4dbd5Props}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83a, setaction_details_group8c83a}= useContext(TotalContext) as TotalContextProps;
  const {action_details_group8c83aProps, setaction_details_group8c83aProps}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892, setaction_detail_group71892}= useContext(TotalContext) as TotalContextProps;
  const {action_detail_group71892Props, setaction_detail_group71892Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_identity_textf637e, setasset_identity_textf637e}= useContext(TotalContext) as TotalContextProps;
  const {asset_name5ebdb, setasset_name5ebdb}= useContext(TotalContext) as TotalContextProps;
  const {action_noc3dfc, setaction_noc3dfc}= useContext(TotalContext) as TotalContextProps;
  const {enforcement_pointe970a, setenforcement_pointe970a}= useContext(TotalContext) as TotalContextProps;
  const {commandf580f, setcommandf580f}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642, setrisk_conf_groupe5642}= useContext(TotalContext) as TotalContextProps;
  const {risk_conf_groupe5642Props, setrisk_conf_groupe5642Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861, setdynamicactionsc7861}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc7861Props, setdynamicactionsc7861Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    '1',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "1",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "1",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(action_detail_group71892?.asset_name=="" || action_detail_group71892?.asset_name==undefined || action_detail_group71892?.asset_name==null ){
    setSelectedItem("");
  }
  },[action_detail_group71892?.asset_name])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "0c1c5d72d927abe2e0adb9656e571892",
        "d5485888530b5e8eb8c43131d685ebdb"
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
  },[asset_name5ebdb?.refresh])

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
      setaction_detail_group71892((prev: any) => ({ ...prev, asset_name: staticTextValue, asset_name5ebdb: value}))
         setIsRequredData(false)
    } else {
       setaction_detail_group71892((prev: any) => ({ ...prev, asset_name: '', asset_name5ebdb: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,asset_name:undefined}}));
   
    // static
    selected.current={
      asset_name:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_group'] = overall_group4dbd5,
        codeStates['setoverall_group'] = setoverall_group4dbd5,
        codeStates['overall_group4dbd5'] = overall_group4dbd5Props,
        codeStates['setoverall_group4dbd5'] = setoverall_group4dbd5Props,
        codeStates['action_details_group'] = action_details_group8c83a,
        codeStates['setaction_details_group'] = setaction_details_group8c83a,
        codeStates['action_details_group8c83a'] = action_details_group8c83aProps,
        codeStates['setaction_details_group8c83a'] = setaction_details_group8c83aProps,
        codeStates['action_detail_group'] = action_detail_group71892,
        codeStates['setaction_detail_group'] = setaction_detail_group71892,
        codeStates['action_detail_group71892'] = action_detail_group71892Props,
        codeStates['setaction_detail_group71892'] = setaction_detail_group71892Props,
        codeStates['asset_identity_text'] = asset_identity_textf637e,
        codeStates['setasset_identity_text'] = setasset_identity_textf637e,
        codeStates['asset_name'] = asset_name5ebdb,
        codeStates['setasset_name'] = setasset_name5ebdb,
        codeStates['action_no'] = action_noc3dfc,
        codeStates['setaction_no'] = setaction_noc3dfc,
        codeStates['enforcement_point'] = enforcement_pointe970a,
        codeStates['setenforcement_point'] = setenforcement_pointe970a,
        codeStates['command'] = commandf580f,
        codeStates['setcommand'] = setcommandf580f,
        codeStates['risk_conf_group'] = risk_conf_groupe5642,
        codeStates['setrisk_conf_group'] = setrisk_conf_groupe5642,
        codeStates['risk_conf_groupe5642'] = risk_conf_groupe5642Props,
        codeStates['setrisk_conf_groupe5642'] = setrisk_conf_groupe5642Props,
        codeStates['dynamicactions'] = dynamicactionsc7861,
        codeStates['setdynamicactions'] = setdynamicactionsc7861,
        codeStates['dynamicactionsc7861'] = dynamicactionsc7861Props,
        codeStates['setdynamicactionsc7861'] = setdynamicactionsc7861Props,
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


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
    //validation
    if(action_detail_group71892?.asset_name == "" || action_detail_group71892?.asset_name == undefined){
      action_detail_group71892.asset_name = "";
      const validate:any = v.safeParse(schema, action_detail_group71892?.asset_name);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,asset_name:"invalid"}}));
        }
    }else if(action_detail_group71892?.asset_name !== ""){
    const validate:any = v.safeParse(schema, action_detail_group71892?.asset_name);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,asset_name:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,addRevocationReceipt_v1:{...pre?.addRevocationReceipt_v1,asset_name:undefined}}));
      }
    }
  }
  const action_detail_group71892Ref = useRef<any>(action_detail_group71892);
  useEffect(() => { action_detail_group71892Ref.current = action_detail_group71892; }, [action_detail_group71892]);
    useEffect(()=>{
        if(!action_detail_group71892?.asset_name)
        { 
          setaction_detail_group71892Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "d5485888530b5e8eb8c43131d685ebdb") {
        handleClick(action_detail_group71892Ref?.current?.asset_name5ebdb?action_detail_group71892Ref?.current?.asset_name5ebdb:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "d5485888530b5e8eb8c43131d685ebdb");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setaction_detail_group71892((pre:any)=>({...pre,asset_name:""}))
    else
      setInitialCount(1)
  },[asset_name5ebdb?.refresh])
  

  if (asset_name5ebdb?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `1 / 8`,
        gridRow: `9 / 21`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className=""
        placeholder={keyset("Select Agent")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled={ true }
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Agent Name
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            action_detail_group71892?.asset_name5ebdb ? [action_detail_group71892?.asset_name5ebdb] :
                action_detail_group71892?.asset_name ? (staticValueProps.find(p => p?.text?.value !== undefined && String(p?.text?.value) === String(action_detail_group71892?.asset_name))?.value?.value ?? action_detail_group71892?.asset_name) : []
            }
        onChange={handleClick} 
        validationState={validate?.addRevocationReceipt_v1?.asset_name ? "invalid" : undefined}
        errorMessage={error}
      /> 
    </div>
  );
};

export default Dropdownasset_name;
