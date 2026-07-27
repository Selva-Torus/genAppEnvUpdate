'use client'




import React, { useState,useContext,useEffect, useRef } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import i18n from '@/app/components/i18n';
import decodeToken from '@/app/components/decodeToken';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';
///////////////
////////////

const TextInputdays_per_year = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const allState:any = useContext(TotalContext) as TotalContextProps
  const actionDetails : any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": [
    {
      "sourceKey": [
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1|4e279f3010e947cda8cc341d6c0ac371|properties.days_per_year"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeavePolicy:AFVK:v1|844ad10a3f3090d34b205744d9d60f4e|0f6ef7facf492ff4b947151287e540db"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1:",
  "schemaData": {
    "type": "integer"
  },
  "dataType": "integer"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addleavepolicymodify_v1Props, setdfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'days_per_year',type:"number"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_group193d2, setnew_access_group193d2}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group193d2Props, setnew_access_group193d2Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7, setaccess_req__groupc57b7}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupc57b7Props, setaccess_req__groupc57b7Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94, setapp_inf_group60e94}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group60e94Props, setapp_inf_group60e94Props}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47, setapprove_group27e47}= useContext(TotalContext) as TotalContextProps;
  const {approve_group27e47Props, setapprove_group27e47Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4e, setvalid_group60f4e}= useContext(TotalContext) as TotalContextProps;
  const {valid_group60f4eProps, setvalid_group60f4eProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_entity44a9e, setleave_entity44a9e}= useContext(TotalContext) as TotalContextProps;
  const {days_per_year540db, setdays_per_year540db}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_days069b8, setcarry_forward_days069b8}= useContext(TotalContext) as TotalContextProps;
  const {carry_forward_expiry2db6d, setcarry_forward_expiry2db6d}= useContext(TotalContext) as TotalContextProps;
  const {accrual_frequency7324d, setaccrual_frequency7324d}= useContext(TotalContext) as TotalContextProps;
  const {max_consecutive_days47fe8, setmax_consecutive_days47fe8}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdb, setbusiness_just__group4dcdb}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group4dcdbProps, setbusiness_just__group4dcdbProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072, setprovision_group68072}= useContext(TotalContext) as TotalContextProps;
  const {provision_group68072Props, setprovision_group68072Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665, setleave_rule_group1e665}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_group1e665Props, setleave_rule_group1e665Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
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
  const handleChange = async(e: any) => {
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,viewLeavePolicy_v1:{...pre?.viewLeavePolicy_v1,days_per_year:undefined}}));
    if(dynamicStateandType.type=="number"){
    setvalid_group60f4e((prev: any) => ({ ...prev, days_per_year: +e.target.value }));
    }
    else{
    setvalid_group60f4e((prev: any) => ({ ...prev, days_per_year: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group193d2,
        codeStates['setnew_access_group'] = setnew_access_group193d2,
        codeStates['new_access_group193d2'] = new_access_group193d2Props,
        codeStates['setnew_access_group193d2'] = setnew_access_group193d2Props,
        codeStates['access_req__group'] = access_req__groupc57b7,
        codeStates['setaccess_req__group'] = setaccess_req__groupc57b7,
        codeStates['access_req__groupc57b7'] = access_req__groupc57b7Props,
        codeStates['setaccess_req__groupc57b7'] = setaccess_req__groupc57b7Props,
        codeStates['app_inf_group'] = app_inf_group60e94,
        codeStates['setapp_inf_group'] = setapp_inf_group60e94,
        codeStates['app_inf_group60e94'] = app_inf_group60e94Props,
        codeStates['setapp_inf_group60e94'] = setapp_inf_group60e94Props,
        codeStates['approve_group'] = approve_group27e47,
        codeStates['setapprove_group'] = setapprove_group27e47,
        codeStates['approve_group27e47'] = approve_group27e47Props,
        codeStates['setapprove_group27e47'] = setapprove_group27e47Props,
        codeStates['valid_group'] = valid_group60f4e,
        codeStates['setvalid_group'] = setvalid_group60f4e,
        codeStates['valid_group60f4e'] = valid_group60f4eProps,
        codeStates['setvalid_group60f4e'] = setvalid_group60f4eProps,
        codeStates['leave_entity'] = leave_entity44a9e,
        codeStates['setleave_entity'] = setleave_entity44a9e,
        codeStates['days_per_year'] = days_per_year540db,
        codeStates['setdays_per_year'] = setdays_per_year540db,
        codeStates['carry_forward_days'] = carry_forward_days069b8,
        codeStates['setcarry_forward_days'] = setcarry_forward_days069b8,
        codeStates['carry_forward_expiry'] = carry_forward_expiry2db6d,
        codeStates['setcarry_forward_expiry'] = setcarry_forward_expiry2db6d,
        codeStates['accrual_frequency'] = accrual_frequency7324d,
        codeStates['setaccrual_frequency'] = setaccrual_frequency7324d,
        codeStates['max_consecutive_days'] = max_consecutive_days47fe8,
        codeStates['setmax_consecutive_days'] = setmax_consecutive_days47fe8,
        codeStates['business_just__group'] = business_just__group4dcdb,
        codeStates['setbusiness_just__group'] = setbusiness_just__group4dcdb,
        codeStates['business_just__group4dcdb'] = business_just__group4dcdbProps,
        codeStates['setbusiness_just__group4dcdb'] = setbusiness_just__group4dcdbProps,
        codeStates['provision_group'] = provision_group68072,
        codeStates['setprovision_group'] = setprovision_group68072,
        codeStates['provision_group68072'] = provision_group68072Props,
        codeStates['setprovision_group68072'] = setprovision_group68072Props,
        codeStates['leave_rule_group'] = leave_rule_group1e665,
        codeStates['setleave_rule_group'] = setleave_rule_group1e665,
        codeStates['leave_rule_group1e665'] = leave_rule_group1e665Props,
        codeStates['setleave_rule_group1e665'] = setleave_rule_group1e665Props,
    codeExecution(code,codeStates);
    }  
     try{
      setIsProcessing(true);
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

  const handleValidate=async (e?:any) => {
      let validate:any
  }
  const handleBlur=async (e?:any) => {
      let validate:any

    try{
      setIsProcessing(true);
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "844ad10a3f3090d34b205744d9d60f4e",
        "0f6ef7facf492ff4b947151287e540db"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewLeavePolicy:AFVK:v1",
      //     componentId: "844ad10a3f3090d34b205744d9d60f4e",
      //     controlId: "0f6ef7facf492ff4b947151287e540db",
      //     isTable: false,
      //     from:"TextInputdays_per_year",
      //     accessProfile:accessProfile
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      // if(orchestrationData?.data?.error == true){
       
      //   return
      // }
      setAllCode(orchestrationData?.data?.code);
      if (orchestrationData?.data?.dataType ==='integer' || orchestrationData?.data?.dataType ==='number') {
        setDynamicStateandType({name:'days_per_year', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'days_per_year',type:'text'};
      //   type={
      //     name:'days_per_year',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.days_per_year.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.days_per_year.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.days_per_year.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'days_per_year',type:'text'};
      //   type={
      //     name:'days_per_year',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.days_per_year.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.days_per_year.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.days_per_year.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const valid_group60f4eRef = useRef<any>(valid_group60f4e);
  useEffect(() => { valid_group60f4eRef.current = valid_group60f4e; }, [valid_group60f4e]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0f6ef7facf492ff4b947151287e540db") {
        handleChange({target:{value:valid_group60f4eRef?.current?.days_per_year||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0f6ef7facf492ff4b947151287e540db") {
        handleBlur({target:{value:valid_group60f4eRef?.current?.days_per_year||""}});
      }
    };
    eventBus.on("triggerElement|onChange", handlerChange);
    eventBus.on("triggerElement|onBlur", handlerBlur);
    return () => {
      eventBus.off("triggerElement|onChange", handlerChange);
      eventBus.off("triggerElement|onBlur", handlerBlur);
    };
  },[validateRefetch.value])
  useEffect(() => {
  if(dfd_addleavepolicymodify_v1Props?.setSearchFilters && dfd_addleavepolicymodify_v1Props?.data)
  {
    if(Array.isArray(dfd_addleavepolicymodify_v1Props.data) && dfd_addleavepolicymodify_v1Props.data.length > 0){
      setvalid_group60f4e((pre:any)=>({...pre,days_per_year:dfd_addleavepolicymodify_v1Props.data[0]?.days_per_year}));
    }
  }
  },[dfd_addleavepolicymodify_v1Props?.setSearchFilters])
  if (days_per_year540db?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 7`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={valid_group60f4e?.days_per_year||""}
         disabled= {days_per_year540db?.isDisabled ? true : false}
        pin='brick-brick'     
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Days Per Year"
      errorMessage={error}
        validationState={validate?.viewLeavePolicy_v1?.days_per_year ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputdays_per_year
