

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
const Dropdownstatus_op = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {simulator_main_group0541e, setsimulator_main_group0541e}= useContext(TotalContext) as TotalContextProps;
  const {simulator_main_group0541eProps, setsimulator_main_group0541eProps}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732, setsimulator_tab_groupfd732}= useContext(TotalContext) as TotalContextProps;
  const {simulator_tab_groupfd732Props, setsimulator_tab_groupfd732Props}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735b, setop_financial4735b}= useContext(TotalContext) as TotalContextProps;
  const {op_financial4735bProps, setop_financial4735bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39a, setop_financial_grp8a39a}= useContext(TotalContext) as TotalContextProps;
  const {op_financial_grp8a39aProps, setop_financial_grp8a39aProps}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op8fcb1, setproduct_code_op8fcb1}= useContext(TotalContext) as TotalContextProps;
  const {product_code_op_financ92df8, setproduct_code_op_financ92df8}= useContext(TotalContext) as TotalContextProps;
  const {message_type_opc2fc6, setmessage_type_opc2fc6}= useContext(TotalContext) as TotalContextProps;
  const {message_type_op_financcbd29, setmessage_type_op_financcbd29}= useContext(TotalContext) as TotalContextProps;
  const {date_op9a41b, setdate_op9a41b}= useContext(TotalContext) as TotalContextProps;
  const {date_op_fianc516b0, setdate_op_fianc516b0}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op4c851, setuuid_op4c851}= useContext(TotalContext) as TotalContextProps;
  const {uuid_op_financb7282, setuuid_op_financb7282}= useContext(TotalContext) as TotalContextProps;
  const {status_op98685, setstatus_op98685}= useContext(TotalContext) as TotalContextProps;
  const {status_op_financc8de7, setstatus_op_financc8de7}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason_op5ba8d, setreject_reason_op5ba8d}= useContext(TotalContext) as TotalContextProps;
  const {rej_reasn_op_financ13f05, setrej_reasn_op_financ13f05}= useContext(TotalContext) as TotalContextProps;
  const {submit_opcf1e2, setsubmit_opcf1e2}= useContext(TotalContext) as TotalContextProps;
  const {customwidget0c844, setcustomwidget0c844}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399b, setop_settlemente399b}= useContext(TotalContext) as TotalContextProps;
  const {op_settlemente399bProps, setop_settlemente399bProps}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706d, setop_settlement_grpb706d}= useContext(TotalContext) as TotalContextProps;
  const {op_settlement_grpb706dProps, setop_settlement_grpb706dProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005, setip_financial66005}= useContext(TotalContext) as TotalContextProps;
  const {ip_financial66005Props, setip_financial66005Props}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143c, setip_debtor_dtls8143c}= useContext(TotalContext) as TotalContextProps;
  const {ip_debtor_dtls8143cProps, setip_debtor_dtls8143cProps}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4, setip_creditor_dtls1ade4}= useContext(TotalContext) as TotalContextProps;
  const {ip_creditor_dtls1ade4Props, setip_creditor_dtls1ade4Props}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132, setpayment_dtls30132}= useContext(TotalContext) as TotalContextProps;
  const {payment_dtls30132Props, setpayment_dtls30132Props}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014, setaddionl_info43014}= useContext(TotalContext) as TotalContextProps;
  const {addionl_info43014Props, setaddionl_info43014Props}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7, setbutton_grp7b9b7}= useContext(TotalContext) as TotalContextProps;
  const {button_grp7b9b7Props, setbutton_grp7b9b7Props}= useContext(TotalContext) as TotalContextProps;
  const {reject_reason_drp_dwn_op5ba8d, setreject_reason_drp_dwn_op5ba8d}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'ACCP',
    'RJCT',
  ];

  useEffect(() => {
  if(op_financial_grp8a39a?.status_op=="" || op_financial_grp8a39a?.status_op==undefined || op_financial_grp8a39a?.status_op==null ){
    setSelectedItem("");
  }
  },[op_financial_grp8a39a?.status_op])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "1687ee1f949f41fdbe50d7088248a39a",
        "c29f1625a2fa4bd88deae0d479a98685"
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
  },[status_op98685?.refresh])

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
      "value": "ACCP",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "ACCP",
      "enabled": true
    }
  },
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "RJCT",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "RJCT",
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
      setop_financial_grp8a39a((prev: any) => ({ ...prev, status_op: staticTextValue, status_op98685: value}))
         setIsRequredData(false)
    } else {
       setop_financial_grp8a39a((prev: any) => ({ ...prev, status_op: '', status_op98685: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,status_op:undefined}}));
   
    // static
    selected.current={
      status_op:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['simulator_main_group'] = simulator_main_group0541e,
        codeStates['setsimulator_main_group'] = setsimulator_main_group0541e,
        codeStates['simulator_main_group0541e'] = simulator_main_group0541eProps,
        codeStates['setsimulator_main_group0541e'] = setsimulator_main_group0541eProps,
        codeStates['simulator_tab_group'] = simulator_tab_groupfd732,
        codeStates['setsimulator_tab_group'] = setsimulator_tab_groupfd732,
        codeStates['simulator_tab_groupfd732'] = simulator_tab_groupfd732Props,
        codeStates['setsimulator_tab_groupfd732'] = setsimulator_tab_groupfd732Props,
        codeStates['op_financial'] = op_financial4735b,
        codeStates['setop_financial'] = setop_financial4735b,
        codeStates['op_financial4735b'] = op_financial4735bProps,
        codeStates['setop_financial4735b'] = setop_financial4735bProps,
        codeStates['op_financial_grp'] = op_financial_grp8a39a,
        codeStates['setop_financial_grp'] = setop_financial_grp8a39a,
        codeStates['op_financial_grp8a39a'] = op_financial_grp8a39aProps,
        codeStates['setop_financial_grp8a39a'] = setop_financial_grp8a39aProps,
        codeStates['product_code_op'] = product_code_op8fcb1,
        codeStates['setproduct_code_op'] = setproduct_code_op8fcb1,
        codeStates['product_code_op_financ'] = product_code_op_financ92df8,
        codeStates['setproduct_code_op_financ'] = setproduct_code_op_financ92df8,
        codeStates['message_type_op'] = message_type_opc2fc6,
        codeStates['setmessage_type_op'] = setmessage_type_opc2fc6,
        codeStates['message_type_op_financ'] = message_type_op_financcbd29,
        codeStates['setmessage_type_op_financ'] = setmessage_type_op_financcbd29,
        codeStates['date_op'] = date_op9a41b,
        codeStates['setdate_op'] = setdate_op9a41b,
        codeStates['date_op_fianc'] = date_op_fianc516b0,
        codeStates['setdate_op_fianc'] = setdate_op_fianc516b0,
        codeStates['uuid_op'] = uuid_op4c851,
        codeStates['setuuid_op'] = setuuid_op4c851,
        codeStates['uuid_op_financ'] = uuid_op_financb7282,
        codeStates['setuuid_op_financ'] = setuuid_op_financb7282,
        codeStates['status_op'] = status_op98685,
        codeStates['setstatus_op'] = setstatus_op98685,
        codeStates['status_op_financ'] = status_op_financc8de7,
        codeStates['setstatus_op_financ'] = setstatus_op_financc8de7,
        codeStates['reject_reason_op'] = reject_reason_op5ba8d,
        codeStates['setreject_reason_op'] = setreject_reason_op5ba8d,
        codeStates['rej_reasn_op_financ'] = rej_reasn_op_financ13f05,
        codeStates['setrej_reasn_op_financ'] = setrej_reasn_op_financ13f05,
        codeStates['submit_op'] = submit_opcf1e2,
        codeStates['setsubmit_op'] = setsubmit_opcf1e2,
        codeStates['customwidget'] = customwidget0c844,
        codeStates['setcustomwidget'] = setcustomwidget0c844,
        codeStates['op_settlement'] = op_settlemente399b,
        codeStates['setop_settlement'] = setop_settlemente399b,
        codeStates['op_settlemente399b'] = op_settlemente399bProps,
        codeStates['setop_settlemente399b'] = setop_settlemente399bProps,
        codeStates['op_settlement_grp'] = op_settlement_grpb706d,
        codeStates['setop_settlement_grp'] = setop_settlement_grpb706d,
        codeStates['op_settlement_grpb706d'] = op_settlement_grpb706dProps,
        codeStates['setop_settlement_grpb706d'] = setop_settlement_grpb706dProps,
        codeStates['ip_financial'] = ip_financial66005,
        codeStates['setip_financial'] = setip_financial66005,
        codeStates['ip_financial66005'] = ip_financial66005Props,
        codeStates['setip_financial66005'] = setip_financial66005Props,
        codeStates['ip_debtor_dtls'] = ip_debtor_dtls8143c,
        codeStates['setip_debtor_dtls'] = setip_debtor_dtls8143c,
        codeStates['ip_debtor_dtls8143c'] = ip_debtor_dtls8143cProps,
        codeStates['setip_debtor_dtls8143c'] = setip_debtor_dtls8143cProps,
        codeStates['ip_creditor_dtls'] = ip_creditor_dtls1ade4,
        codeStates['setip_creditor_dtls'] = setip_creditor_dtls1ade4,
        codeStates['ip_creditor_dtls1ade4'] = ip_creditor_dtls1ade4Props,
        codeStates['setip_creditor_dtls1ade4'] = setip_creditor_dtls1ade4Props,
        codeStates['payment_dtls'] = payment_dtls30132,
        codeStates['setpayment_dtls'] = setpayment_dtls30132,
        codeStates['payment_dtls30132'] = payment_dtls30132Props,
        codeStates['setpayment_dtls30132'] = setpayment_dtls30132Props,
        codeStates['addionl_info'] = addionl_info43014,
        codeStates['setaddionl_info'] = setaddionl_info43014,
        codeStates['addionl_info43014'] = addionl_info43014Props,
        codeStates['setaddionl_info43014'] = setaddionl_info43014Props,
        codeStates['button_grp'] = button_grp7b9b7,
        codeStates['setbutton_grp'] = setbutton_grp7b9b7,
        codeStates['button_grp7b9b7'] = button_grp7b9b7Props,
        codeStates['setbutton_grp7b9b7'] = setbutton_grp7b9b7Props,
        codeStates['reject_reason_drp_dwn_op'] = reject_reason_drp_dwn_op5ba8d,
        codeStates['setreject_reason_drp_dwn_op'] = setreject_reason_drp_dwn_op5ba8d,
      codeStates['selected']  = selected
    codeExecution(customecode,codeStates)
    }
    if(value.length==0){
      return
    }
    try{
    setIsProcessing(true);
    let te_eventEmitter : any =  {};
    let copyFormhandlerData :any = {}
      //enableElement
    if (value === "RJCT") {
      setreject_reason_drp_dwn_op5ba8d((prev: any) => ({ ...prev, isDisabled: false }))
    }
      //disableElement
    if (value === "ACCP") {
      setreject_reason_drp_dwn_op5ba8d((prev: any) => ({ ...prev, isDisabled: true }))
    }
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
   
  async function handleConfirmonClick(){
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
    if(op_financial_grp8a39a?.status_op == "" || op_financial_grp8a39a?.status_op == undefined){
      op_financial_grp8a39a.status_op = "";
      const validate:any = v.safeParse(schema, op_financial_grp8a39a?.status_op);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,status_op:"invalid"}}));
        }
    }else if(op_financial_grp8a39a?.status_op !== ""){
    const validate:any = v.safeParse(schema, op_financial_grp8a39a?.status_op);
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,status_op:"invalid"}}));
      }else{
        setError('');
        setValidate((pre:any)=>({...pre,simulatorProcessUi_v1:{...pre?.simulatorProcessUi_v1,status_op:undefined}}));
      }
    }
  }
  const op_financial_grp8a39aRef = useRef<any>(op_financial_grp8a39a);
  useEffect(() => { op_financial_grp8a39aRef.current = op_financial_grp8a39a; }, [op_financial_grp8a39a]);
    useEffect(()=>{
        if(!op_financial_grp8a39a?.status_op)
        { 
          setop_financial_grp8a39aProps((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
       const handler = (id:any) => {
          if (id === "c29f1625a2fa4bd88deae0d479a98685") {
        handleClick(op_financial_grp8a39aRef?.current?.status_op98685?op_financial_grp8a39aRef?.current?.status_op98685:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "c29f1625a2fa4bd88deae0d479a98685");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setop_financial_grp8a39a((pre:any)=>({...pre,status_op:""}))
    else
      setInitialCount(1)
  },[status_op98685?.refresh])
  

  if (status_op98685?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `6 / 25`,
        gridRow: `38 / 46`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className="!rounded-lg"
        placeholder={keyset("")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled= {status_op98685?.isDisabled ? true : false}
        contentAlign={"center"}
        value={
            op_financial_grp8a39a?.status_op98685 ? [op_financial_grp8a39a?.status_op98685] :
                op_financial_grp8a39a?.status_op ? op_financial_grp8a39a?.status_op : []
            }
        onChange={handleClick} 
        validationState={validate?.simulatorProcessUi_v1?.status_op ? "invalid" : undefined}
        errorMessage={error}
      /> 
    </div>
  );
};

export default Dropdownstatus_op;
