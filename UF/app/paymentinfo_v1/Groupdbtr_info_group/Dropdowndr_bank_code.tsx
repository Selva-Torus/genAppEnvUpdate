

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
const Dropdowndr_bank_code = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: any) => {
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
  const {payment_info_group1bac9, setpayment_info_group1bac9}= useContext(TotalContext) as TotalContextProps;
  const {payment_info_group1bac9Props, setpayment_info_group1bac9Props}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39d, setmidynamicactions3b39d}= useContext(TotalContext) as TotalContextProps;
  const {midynamicactions3b39dProps, setmidynamicactions3b39dProps}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6, setgeneral_info_groupc83e6}= useContext(TotalContext) as TotalContextProps;
  const {general_info_groupc83e6Props, setgeneral_info_groupc83e6Props}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8ea, setdbtr_info_group4e8ea}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_group4e8eaProps, setdbtr_info_group4e8eaProps}= useContext(TotalContext) as TotalContextProps;
  const {dbtr_info_text_label1015f, setdbtr_info_text_label1015f}= useContext(TotalContext) as TotalContextProps;
  const {dr_accounta8f91, setdr_accounta8f91}= useContext(TotalContext) as TotalContextProps;
  const {dr_namef1c15, setdr_namef1c15}= useContext(TotalContext) as TotalContextProps;
  const {dr_currency45f51, setdr_currency45f51}= useContext(TotalContext) as TotalContextProps;
  const {dr_account_balancea2246, setdr_account_balancea2246}= useContext(TotalContext) as TotalContextProps;
  const {dr_ibanbaa1f, setdr_ibanbaa1f}= useContext(TotalContext) as TotalContextProps;
  const {dr_street_name149b0, setdr_street_name149b0}= useContext(TotalContext) as TotalContextProps;
  const {dr_building_numberba75a, setdr_building_numberba75a}= useContext(TotalContext) as TotalContextProps;
  const {dr_pstl_code5ec76, setdr_pstl_code5ec76}= useContext(TotalContext) as TotalContextProps;
  const {dr_town_name19970, setdr_town_name19970}= useContext(TotalContext) as TotalContextProps;
  const {dr_countrydd685, setdr_countrydd685}= useContext(TotalContext) as TotalContextProps;
  const {dr_bank_codeffb62, setdr_bank_codeffb62}= useContext(TotalContext) as TotalContextProps;
  const {amount_input_typecd6ed, setamount_input_typecd6ed}= useContext(TotalContext) as TotalContextProps;
  const {dr_amount178b9, setdr_amount178b9}= useContext(TotalContext) as TotalContextProps;
  const {settlement_amount32b14, setsettlement_amount32b14}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8, setcr_info_groupb01e8}= useContext(TotalContext) as TotalContextProps;
  const {cr_info_groupb01e8Props, setcr_info_groupb01e8Props}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0, setchrg_info_group76ab0}= useContext(TotalContext) as TotalContextProps;
  const {chrg_info_group76ab0Props, setchrg_info_group76ab0Props}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6, setadd_info_groupe8dc6}= useContext(TotalContext) as TotalContextProps;
  const {add_info_groupe8dc6Props, setadd_info_groupe8dc6Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  items = [
    'EQBLKENAXXX',
  ];
  let staticValueProps: any[] = [
  {
    "text": {
      "name": "text",
      "_label": "Value to Save",
      "_type": "text",
      "value": "EQBLKENAXXX",
      "enabled": true
    },
    "value": {
      "name": "value",
      "_label": "Text to Display",
      "_type": "text",
      "value": "EQBLKENAXXX",
      "enabled": true
    }
  }
];

  useEffect(() => {
  if(dbtr_info_group4e8ea?.dr_bank_code=="" || dbtr_info_group4e8ea?.dr_bank_code==undefined || dbtr_info_group4e8ea?.dr_bank_code==null ){
    setSelectedItem("");
  }
  },[dbtr_info_group4e8ea?.dr_bank_code])
  const handleMapperValue=async()=>{
    try{
      const orchestrationData :any = getControlOrchestrationData(
        controlData,
        "3ecea796df8c424d898e967635c4e8ea",
        "819bac219f59454182dbe0f6d4affb62"
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
  },[dr_bank_codeffb62?.refresh])

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
      setdbtr_info_group4e8ea((prev: any) => ({ ...prev, dr_bank_code: staticTextValue, dr_bank_codeffb62: value}))
         setIsRequredData(false)
    } else {
       setdbtr_info_group4e8ea((prev: any) => ({ ...prev, dr_bank_code: '', dr_bank_codeffb62: '' }))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,paymentInfo_v1:{...pre?.paymentInfo_v1,dr_bank_code:undefined}}));
   
    // static
    selected.current={
      dr_bank_code:value
    }
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}      
        codeStates['payment_info_group'] = payment_info_group1bac9,
        codeStates['setpayment_info_group'] = setpayment_info_group1bac9,
        codeStates['payment_info_group1bac9'] = payment_info_group1bac9Props,
        codeStates['setpayment_info_group1bac9'] = setpayment_info_group1bac9Props,
        codeStates['midynamicactions'] = midynamicactions3b39d,
        codeStates['setmidynamicactions'] = setmidynamicactions3b39d,
        codeStates['midynamicactions3b39d'] = midynamicactions3b39dProps,
        codeStates['setmidynamicactions3b39d'] = setmidynamicactions3b39dProps,
        codeStates['general_info_group'] = general_info_groupc83e6,
        codeStates['setgeneral_info_group'] = setgeneral_info_groupc83e6,
        codeStates['general_info_groupc83e6'] = general_info_groupc83e6Props,
        codeStates['setgeneral_info_groupc83e6'] = setgeneral_info_groupc83e6Props,
        codeStates['dbtr_info_group'] = dbtr_info_group4e8ea,
        codeStates['setdbtr_info_group'] = setdbtr_info_group4e8ea,
        codeStates['dbtr_info_group4e8ea'] = dbtr_info_group4e8eaProps,
        codeStates['setdbtr_info_group4e8ea'] = setdbtr_info_group4e8eaProps,
        codeStates['dbtr_info_text_label'] = dbtr_info_text_label1015f,
        codeStates['setdbtr_info_text_label'] = setdbtr_info_text_label1015f,
        codeStates['dr_account'] = dr_accounta8f91,
        codeStates['setdr_account'] = setdr_accounta8f91,
        codeStates['dr_name'] = dr_namef1c15,
        codeStates['setdr_name'] = setdr_namef1c15,
        codeStates['dr_currency'] = dr_currency45f51,
        codeStates['setdr_currency'] = setdr_currency45f51,
        codeStates['dr_account_balance'] = dr_account_balancea2246,
        codeStates['setdr_account_balance'] = setdr_account_balancea2246,
        codeStates['dr_iban'] = dr_ibanbaa1f,
        codeStates['setdr_iban'] = setdr_ibanbaa1f,
        codeStates['dr_street_name'] = dr_street_name149b0,
        codeStates['setdr_street_name'] = setdr_street_name149b0,
        codeStates['dr_building_number'] = dr_building_numberba75a,
        codeStates['setdr_building_number'] = setdr_building_numberba75a,
        codeStates['dr_pstl_code'] = dr_pstl_code5ec76,
        codeStates['setdr_pstl_code'] = setdr_pstl_code5ec76,
        codeStates['dr_town_name'] = dr_town_name19970,
        codeStates['setdr_town_name'] = setdr_town_name19970,
        codeStates['dr_country'] = dr_countrydd685,
        codeStates['setdr_country'] = setdr_countrydd685,
        codeStates['dr_bank_code'] = dr_bank_codeffb62,
        codeStates['setdr_bank_code'] = setdr_bank_codeffb62,
        codeStates['amount_input_type'] = amount_input_typecd6ed,
        codeStates['setamount_input_type'] = setamount_input_typecd6ed,
        codeStates['dr_amount'] = dr_amount178b9,
        codeStates['setdr_amount'] = setdr_amount178b9,
        codeStates['settlement_amount'] = settlement_amount32b14,
        codeStates['setsettlement_amount'] = setsettlement_amount32b14,
        codeStates['cr_info_group'] = cr_info_groupb01e8,
        codeStates['setcr_info_group'] = setcr_info_groupb01e8,
        codeStates['cr_info_groupb01e8'] = cr_info_groupb01e8Props,
        codeStates['setcr_info_groupb01e8'] = setcr_info_groupb01e8Props,
        codeStates['chrg_info_group'] = chrg_info_group76ab0,
        codeStates['setchrg_info_group'] = setchrg_info_group76ab0,
        codeStates['chrg_info_group76ab0'] = chrg_info_group76ab0Props,
        codeStates['setchrg_info_group76ab0'] = setchrg_info_group76ab0Props,
        codeStates['add_info_group'] = add_info_groupe8dc6,
        codeStates['setadd_info_group'] = setadd_info_groupe8dc6,
        codeStates['add_info_groupe8dc6'] = add_info_groupe8dc6Props,
        codeStates['setadd_info_groupe8dc6'] = setadd_info_groupe8dc6Props,
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
  const dbtr_info_group4e8eaRef = useRef<any>(dbtr_info_group4e8ea);
  useEffect(() => { dbtr_info_group4e8eaRef.current = dbtr_info_group4e8ea; }, [dbtr_info_group4e8ea]);
    useEffect(()=>{
        handleBlur()
       const handler = (id:any) => {
          if (id === "819bac219f59454182dbe0f6d4affb62") {
        handleClick(dbtr_info_group4e8eaRef?.current?.dr_bank_codeffb62?dbtr_info_group4e8eaRef?.current?.dr_bank_codeffb62:"");
          }
        };
        eventBus.on("triggerElement|onClick", handler);
        eventBus.emit("DropdownReady", "819bac219f59454182dbe0f6d4affb62");
        return () => {
          eventBus.off("triggerElement|onClick", handler);
        };
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
     setdbtr_info_group4e8ea((pre:any)=>({...pre,dr_bank_code:""}))
    else
      setInitialCount(1)
    setdbtr_info_group4e8ea((pre:any)=>({...pre,dr_bank_code : items[0]}))
  },[dr_bank_codeffb62?.refresh])
  

  if (dr_bank_codeffb62?.isHidden) {
    return <></>
  }

  return (
    <div
      style={{
        gridColumn: `9 / 17`,
        gridRow: `53 / 67`,
        gap:``, 
        height: `100%`,
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column'}} >
      <Dropdown
        className="!rounded-lg"
        placeholder={keyset("Select")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        disabled={ true }
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Dr Bank Code
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        value={
            dbtr_info_group4e8ea?.dr_bank_codeffb62 ? [dbtr_info_group4e8ea?.dr_bank_codeffb62] :
                [items[0]]
            }
        onChange={handleClick} 
        validationState={validate?.paymentInfo_v1?.dr_bank_code ? "invalid" : undefined}
      /> 
    </div>
  );
};

export default Dropdowndr_bank_code;
