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

const TextInputpolicy_code = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1|4e279f3010e947cda8cc341d6c0ac371|properties.policy_code"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1|ea310355e51365a74a46ea7eaf9ae6e3|90cd2f717b5749589f812bedd7a2d03e"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addleavepolicymodify_v1Props, setdfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'policy_code',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_group86c35, setnew_access_group86c35}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group86c35Props, setnew_access_group86c35Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3, setaccess_req__groupae6e3}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3Props, setaccess_req__groupae6e3Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf2e0e9, setbasic_inf2e0e9}= useContext(TotalContext) as TotalContextProps;
  const {policy_code2d03e, setpolicy_code2d03e}= useContext(TotalContext) as TotalContextProps;
  const {policy_name55cd1, setpolicy_name55cd1}= useContext(TotalContext) as TotalContextProps;
  const {leave_type58fae, setleave_type58fae}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196e, setapp_inf_group2196e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196eProps, setapp_inf_group2196eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167c, setapprove_group0167c}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167cProps, setapprove_group0167cProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57c, setvalid_group5c57c}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57cProps, setvalid_group5c57cProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebdProps, setbusiness_just__groupd6ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fca, setprovision_groupc3fca}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fcaProps, setprovision_groupc3fcaProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0Props, setleave_rule_groupf75c0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40, setdynamicactionsd8c40}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40Props, setdynamicactionsd8c40Props}= useContext(TotalContext) as TotalContextProps;
  

  // Validation  
    const [error, setError] = useState<string>('');

  schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
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
    if(e.target.value=="")
    {
      setIsRequredData(true)
    }else{
      setIsRequredData(false)
    }
      let validate:any;    
      setError('');
      setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__groupae6e3((prev: any) => ({ ...prev, policy_code: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setaccess_req__groupae6e3((prev: any) => ({ ...prev, policy_code: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_group86c35,
        codeStates['setnew_access_group'] = setnew_access_group86c35,
        codeStates['new_access_group86c35'] = new_access_group86c35Props,
        codeStates['setnew_access_group86c35'] = setnew_access_group86c35Props,
        codeStates['access_req__group'] = access_req__groupae6e3,
        codeStates['setaccess_req__group'] = setaccess_req__groupae6e3,
        codeStates['access_req__groupae6e3'] = access_req__groupae6e3Props,
        codeStates['setaccess_req__groupae6e3'] = setaccess_req__groupae6e3Props,
        codeStates['basic_inf'] = basic_inf2e0e9,
        codeStates['setbasic_inf'] = setbasic_inf2e0e9,
        codeStates['policy_code'] = policy_code2d03e,
        codeStates['setpolicy_code'] = setpolicy_code2d03e,
        codeStates['policy_name'] = policy_name55cd1,
        codeStates['setpolicy_name'] = setpolicy_name55cd1,
        codeStates['leave_type'] = leave_type58fae,
        codeStates['setleave_type'] = setleave_type58fae,
        codeStates['app_inf_group'] = app_inf_group2196e,
        codeStates['setapp_inf_group'] = setapp_inf_group2196e,
        codeStates['app_inf_group2196e'] = app_inf_group2196eProps,
        codeStates['setapp_inf_group2196e'] = setapp_inf_group2196eProps,
        codeStates['approve_group'] = approve_group0167c,
        codeStates['setapprove_group'] = setapprove_group0167c,
        codeStates['approve_group0167c'] = approve_group0167cProps,
        codeStates['setapprove_group0167c'] = setapprove_group0167cProps,
        codeStates['valid_group'] = valid_group5c57c,
        codeStates['setvalid_group'] = setvalid_group5c57c,
        codeStates['valid_group5c57c'] = valid_group5c57cProps,
        codeStates['setvalid_group5c57c'] = setvalid_group5c57cProps,
        codeStates['business_just__group'] = business_just__groupd6ebd,
        codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd,
        codeStates['business_just__groupd6ebd'] = business_just__groupd6ebdProps,
        codeStates['setbusiness_just__groupd6ebd'] = setbusiness_just__groupd6ebdProps,
        codeStates['provision_group'] = provision_groupc3fca,
        codeStates['setprovision_group'] = setprovision_groupc3fca,
        codeStates['provision_groupc3fca'] = provision_groupc3fcaProps,
        codeStates['setprovision_groupc3fca'] = setprovision_groupc3fcaProps,
        codeStates['leave_rule_group'] = leave_rule_groupf75c0,
        codeStates['setleave_rule_group'] = setleave_rule_groupf75c0,
        codeStates['leave_rule_groupf75c0'] = leave_rule_groupf75c0Props,
        codeStates['setleave_rule_groupf75c0'] = setleave_rule_groupf75c0Props,
        codeStates['dynamicactions'] = dynamicactionsd8c40,
        codeStates['setdynamicactions'] = setdynamicactionsd8c40,
        codeStates['dynamicactionsd8c40'] = dynamicactionsd8c40Props,
        codeStates['setdynamicactionsd8c40'] = setdynamicactionsd8c40Props,
    codeExecution(code,codeStates);
    }  
    if(!validate?.success){
      return
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
      if(access_req__groupae6e3?.policy_code == "" || access_req__groupae6e3?.policy_code == undefined){
      access_req__groupae6e3.policy_code = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, access_req__groupae6e3?.policy_code);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:"invalid"}}));
        }
    }else if(access_req__groupae6e3?.policy_code !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +access_req__groupae6e3?.policy_code);
        }
        else{
          validate = v.safeParse(schema, access_req__groupae6e3?.policy_code);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(access_req__groupae6e3?.policy_code == "" || access_req__groupae6e3?.policy_code == undefined){
      access_req__groupae6e3.policy_code = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, access_req__groupae6e3?.policy_code);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:"invalid"}}));
        }
    }else if(access_req__groupae6e3?.policy_code !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +access_req__groupae6e3?.policy_code);
        }
        else{
          validate = v.safeParse(schema, access_req__groupae6e3?.policy_code);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,newLeavePolicy_v1:{...pre?.newLeavePolicy_v1,policy_code:undefined}}));
    }
    }
    if(!validate?.success){
      return
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "ea310355e51365a74a46ea7eaf9ae6e3",
        "90cd2f717b5749589f812bedd7a2d03e"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1",
      //     componentId: "ea310355e51365a74a46ea7eaf9ae6e3",
      //     controlId: "90cd2f717b5749589f812bedd7a2d03e",
      //     isTable: false,
      //     from:"TextInputpolicy_code",
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
        setDynamicStateandType({name:'policy_code', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'policy_code',type:'text'};
      //   type={
      //     name:'policy_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.policy_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.policy_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.policy_code.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'policy_code',type:'text'};
      //   type={
      //     name:'policy_code',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.policy_code.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.policy_code.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.policy_code.type
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
  const access_req__groupae6e3Ref = useRef<any>(access_req__groupae6e3);
  useEffect(() => { access_req__groupae6e3Ref.current = access_req__groupae6e3; }, [access_req__groupae6e3]);
  useEffect(()=>{
      handleMapperValue();
      if(!access_req__groupae6e3?.policy_code)
      {
        setaccess_req__groupae6e3Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "90cd2f717b5749589f812bedd7a2d03e") {
        handleChange({target:{value:access_req__groupae6e3Ref?.current?.policy_code||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "90cd2f717b5749589f812bedd7a2d03e") {
        handleBlur({target:{value:access_req__groupae6e3Ref?.current?.policy_code||""}});
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
      setaccess_req__groupae6e3((pre:any)=>({...pre,policy_code:dfd_addleavepolicymodify_v1Props.data[0]?.policy_code}));
    }
  }
  },[dfd_addleavepolicymodify_v1Props?.setSearchFilters])
  if (policy_code2d03e?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `1 / 13`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={access_req__groupae6e3?.policy_code||""}
         disabled= {policy_code2d03e?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='e.g. LP001'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Policy Code"
      errorMessage={error}
        validationState={validate?.newLeavePolicy_v1?.policy_code ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputpolicy_code
