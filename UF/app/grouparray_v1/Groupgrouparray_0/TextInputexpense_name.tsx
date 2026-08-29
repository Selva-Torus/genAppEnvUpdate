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
import { useGlobal } from '@/context/GlobalContext'
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

const TextInputexpense_name = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const { token } = useGlobal();
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
        "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1|de2bf16ff1b543958a63ec1f5fde63e7|items.properties.employee_detail.properties.expense_name"
      ],
      "targetKey": "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:GroupArray:AFVK:v1|05177fac499640d4bf45a199a95494e0|469416b65d2a47c9a07eff3cb93c83ee"
    }
  ],
  "dfdKey": "CK:CT001:FNGK:AF:FNK:DF-DFD:CATK:TAM:AFGK:TA:AFK:Group_Array_dsd:AFVK:v1:",
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_group_array_dsd_v1Props, setdfd_group_array_dsd_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'expense_name',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
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
      setValidate((pre:any)=>({...pre,GroupArray_v1:{...pre?.GroupArray_v1,expense_name:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgrouparray494e0_0((prev: any) => ({ ...prev, expense_name: +e.target.value }));
    }
    else{
    setgrouparray494e0_0((prev: any) => ({ ...prev, expense_name: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
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
        "05177fac499640d4bf45a199a95494e0",
        "469416b65d2a47c9a07eff3cb93c83ee"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TAM:AFGK:TA:AFK:GroupArray:AFVK:v1",
      //     componentId: "05177fac499640d4bf45a199a95494e0",
      //     controlId: "469416b65d2a47c9a07eff3cb93c83ee",
      //     isTable: false,
      //     from:"TextInputexpense_name",
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
        setDynamicStateandType({name:'expense_name', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'expense_name',type:'text'};
      //   type={
      //     name:'expense_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.expense_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.expense_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.expense_name.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'expense_name',type:'text'};
      //   type={
      //     name:'expense_name',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.expense_name.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.expense_name.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.expense_name.type
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
  const grouparray494e0_0Ref = useRef<any>(grouparray494e0_0);
  useEffect(() => { grouparray494e0_0Ref.current = grouparray494e0_0; }, [grouparray494e0_0]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "469416b65d2a47c9a07eff3cb93c83ee") {
        handleChange({target:{value:grouparray494e0_0Ref?.current?.expense_name||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "469416b65d2a47c9a07eff3cb93c83ee") {
        handleBlur({target:{value:grouparray494e0_0Ref?.current?.expense_name||""}});
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
  if(dfd_group_array_dsd_v1Props?.setSearchFilters && dfd_group_array_dsd_v1Props?.data)
  {
    if(Array.isArray(dfd_group_array_dsd_v1Props.data) && dfd_group_array_dsd_v1Props.data.length > 0){
      setgrouparray494e0_0((pre:any)=>({...pre,expense_name:dfd_group_array_dsd_v1Props.data[0]?.expense_name}));
    }
  }
  },[dfd_group_array_dsd_v1Props?.setSearchFilters])
  if (expense_namec83ee?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `10 / 17`,gridRow: `15 / 32`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={grouparray494e0_0?.expense_name||""}
         disabled= {expense_namec83ee?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Expense Name"
      errorMessage={error}
        validationState={validate?.GroupArray_v1?.expense_name ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputexpense_name
