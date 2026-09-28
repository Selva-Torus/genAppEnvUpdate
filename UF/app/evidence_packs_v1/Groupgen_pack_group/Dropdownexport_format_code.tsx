

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
const Dropdownexport_format_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {overall_ai_asset_registry3c08f, setoverall_ai_asset_registry3c08f}= useContext(TotalContext) as TotalContextProps;
  const {overall_ai_asset_registry3c08fProps, setoverall_ai_asset_registry3c08fProps}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825, setoverall_tab_group97825}= useContext(TotalContext) as TotalContextProps;
  const {overall_tab_group97825Props, setoverall_tab_group97825Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723, setai_registry_tab_header5e723}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_tab_header5e723Props, setai_registry_tab_header5e723Props}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9, setgen_pack_groupbebe9}= useContext(TotalContext) as TotalContextProps;
  const {gen_pack_groupbebe9Props, setgen_pack_groupbebe9Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885, setai_registry_text_group_1b5885}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group_1b5885Props, setai_registry_text_group_1b5885Props}= useContext(TotalContext) as TotalContextProps;
  const {generate_btn339c9, setgenerate_btn339c9}= useContext(TotalContext) as TotalContextProps;
  const {asset_display_name70bbb, setasset_display_name70bbb}= useContext(TotalContext) as TotalContextProps;
  const {as_at_timestamp8327b, setas_at_timestamp8327b}= useContext(TotalContext) as TotalContextProps;
  const {sections_included9f322, setsections_included9f322}= useContext(TotalContext) as TotalContextProps;
  const {export_format_code07560, setexport_format_code07560}= useContext(TotalContext) as TotalContextProps;
  const {purpose_note26a17, setpurpose_note26a17}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0, setexport_pack_group738c0}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_group738c0Props, setexport_pack_group738c0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679d, setai_registry_text_group1679d}= useContext(TotalContext) as TotalContextProps;
  const {ai_registry_text_group1679dProps, setai_registry_text_group1679dProps}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2, setexport_pack_table4a1c2}= useContext(TotalContext) as TotalContextProps;
  const {export_pack_table4a1c2Props, setexport_pack_table4a1c2Props}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054, setaaaaaaaaaaaea054}= useContext(TotalContext) as TotalContextProps;
  const {aaaaaaaaaaaea054Props, setaaaaaaaaaaaea054Props}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6, setbbb6cbd6}= useContext(TotalContext) as TotalContextProps;
  const {bbb6cbd6Props, setbbb6cbd6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'PDF only',
  ];

  useEffect(() => {
  if(gen_pack_groupbebe9?.export_format_code=="" || gen_pack_groupbebe9?.export_format_code==undefined || gen_pack_groupbebe9?.export_format_code==null ){
    setSelectedItem("");
  }
  },[gen_pack_groupbebe9?.export_format_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "cbe1b3cc10294412827114df80dbebe9",
        "33c0c474b23e43e48df57b1f2f107560"
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
  },[export_format_code07560?.refresh])

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
      "value": "PDF only",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "PDF only",
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
      setgen_pack_groupbebe9((prev: any) => ({ ...prev, export_format_code: staticTextValue, export_format_code07560: value}))
         setIsRequredData(false)
    } else {
       setgen_pack_groupbebe9((prev: any) => ({ ...prev, export_format_code: '', export_format_code07560: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,auditEvidence_v1:{...pre?.auditEvidence_v1,export_format_code:undefined}}));
   
    // static
    selected.current={
      export_format_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['overall_ai_asset_registry'] = overall_ai_asset_registry3c08f,
        codeStates['setoverall_ai_asset_registry'] = setoverall_ai_asset_registry3c08f,
        codeStates['overall_ai_asset_registry3c08f'] = overall_ai_asset_registry3c08fProps,
        codeStates['setoverall_ai_asset_registry3c08f'] = setoverall_ai_asset_registry3c08fProps,
        codeStates['overall_tab_group'] = overall_tab_group97825,
        codeStates['setoverall_tab_group'] = setoverall_tab_group97825,
        codeStates['overall_tab_group97825'] = overall_tab_group97825Props,
        codeStates['setoverall_tab_group97825'] = setoverall_tab_group97825Props,
        codeStates['ai_registry_tab_header'] = ai_registry_tab_header5e723,
        codeStates['setai_registry_tab_header'] = setai_registry_tab_header5e723,
        codeStates['ai_registry_tab_header5e723'] = ai_registry_tab_header5e723Props,
        codeStates['setai_registry_tab_header5e723'] = setai_registry_tab_header5e723Props,
        codeStates['gen_pack_group'] = gen_pack_groupbebe9,
        codeStates['setgen_pack_group'] = setgen_pack_groupbebe9,
        codeStates['gen_pack_groupbebe9'] = gen_pack_groupbebe9Props,
        codeStates['setgen_pack_groupbebe9'] = setgen_pack_groupbebe9Props,
        codeStates['ai_registry_text_group_1'] = ai_registry_text_group_1b5885,
        codeStates['setai_registry_text_group_1'] = setai_registry_text_group_1b5885,
        codeStates['ai_registry_text_group_1b5885'] = ai_registry_text_group_1b5885Props,
        codeStates['setai_registry_text_group_1b5885'] = setai_registry_text_group_1b5885Props,
        codeStates['generate_btn'] = generate_btn339c9,
        codeStates['setgenerate_btn'] = setgenerate_btn339c9,
        codeStates['asset_display_name'] = asset_display_name70bbb,
        codeStates['setasset_display_name'] = setasset_display_name70bbb,
        codeStates['as_at_timestamp'] = as_at_timestamp8327b,
        codeStates['setas_at_timestamp'] = setas_at_timestamp8327b,
        codeStates['sections_included'] = sections_included9f322,
        codeStates['setsections_included'] = setsections_included9f322,
        codeStates['export_format_code'] = export_format_code07560,
        codeStates['setexport_format_code'] = setexport_format_code07560,
        codeStates['purpose_note'] = purpose_note26a17,
        codeStates['setpurpose_note'] = setpurpose_note26a17,
        codeStates['export_pack_group'] = export_pack_group738c0,
        codeStates['setexport_pack_group'] = setexport_pack_group738c0,
        codeStates['export_pack_group738c0'] = export_pack_group738c0Props,
        codeStates['setexport_pack_group738c0'] = setexport_pack_group738c0Props,
        codeStates['ai_registry_text_group'] = ai_registry_text_group1679d,
        codeStates['setai_registry_text_group'] = setai_registry_text_group1679d,
        codeStates['ai_registry_text_group1679d'] = ai_registry_text_group1679dProps,
        codeStates['setai_registry_text_group1679d'] = setai_registry_text_group1679dProps,
        codeStates['export_pack_table'] = export_pack_table4a1c2,
        codeStates['setexport_pack_table'] = setexport_pack_table4a1c2,
        codeStates['export_pack_table4a1c2'] = export_pack_table4a1c2Props,
        codeStates['setexport_pack_table4a1c2'] = setexport_pack_table4a1c2Props,
        codeStates['aaaaaaaaaaa'] = aaaaaaaaaaaea054,
        codeStates['setaaaaaaaaaaa'] = setaaaaaaaaaaaea054,
        codeStates['aaaaaaaaaaaea054'] = aaaaaaaaaaaea054Props,
        codeStates['setaaaaaaaaaaaea054'] = setaaaaaaaaaaaea054Props,
        codeStates['bbb'] = bbb6cbd6,
        codeStates['setbbb'] = setbbb6cbd6,
        codeStates['bbb6cbd6'] = bbb6cbd6Props,
        codeStates['setbbb6cbd6'] = setbbb6cbd6Props,
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
  const gen_pack_groupbebe9Ref = useRef<any>(gen_pack_groupbebe9);
  useEffect(() => { gen_pack_groupbebe9Ref.current = gen_pack_groupbebe9; }, [gen_pack_groupbebe9]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "33c0c474b23e43e48df57b1f2f107560") {
        handleClick(gen_pack_groupbebe9Ref?.current?.export_format_code07560?gen_pack_groupbebe9Ref?.current?.export_format_code07560:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "33c0c474b23e43e48df57b1f2f107560");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setgen_pack_groupbebe9((pre:any)=>({...pre,export_format_code:""}))
    else
      setInitialCount(1)
  },[export_format_code07560?.refresh])
  

  if (export_format_code07560?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `16 / 21`,
        gridRow: `13 / 27`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className="!rounded-md"
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {export_format_code07560?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Format
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            gen_pack_groupbebe9?.export_format_code07560 ? [gen_pack_groupbebe9?.export_format_code07560] :
                gen_pack_groupbebe9?.export_format_code ? gen_pack_groupbebe9?.export_format_code : []
            }
        onChange={handleClick} 
        validationState={validate?.auditEvidence_v1?.export_format_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdownexport_format_code;
