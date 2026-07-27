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

const TextInputreview_number = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceReviewModify:AFVK:v1|b03841acebc5e140e2200403d00450fe|properties.review_number"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceReview:AFVK:v1|7d9852de618fc302835e21622dfdb1de|2e04cff108f5455ab2256e5917619333"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceReviewModify:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_addperformancereviewmodify_v1Props, setdfd_addperformancereviewmodify_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'review_number',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_access_groupfa034, setnew_access_groupfa034}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupfa034Props, setnew_access_groupfa034Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1de, setaccess_req__groupdb1de}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupdb1deProps, setaccess_req__groupdb1deProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_inf14612, setbasic_inf14612}= useContext(TotalContext) as TotalContextProps;
  const {full_name13305, setfull_name13305}= useContext(TotalContext) as TotalContextProps;
  const {cycle_name855a5, setcycle_name855a5}= useContext(TotalContext) as TotalContextProps;
  const {review_number19333, setreview_number19333}= useContext(TotalContext) as TotalContextProps;
  const {review_type718e4, setreview_type718e4}= useContext(TotalContext) as TotalContextProps;
  const {review_status4ba57, setreview_status4ba57}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569, setvalid_groupb4569}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupb4569Props, setvalid_groupb4569Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26, setaddt__group82d26}= useContext(TotalContext) as TotalContextProps;
  const {addt__group82d26Props, setaddt__group82d26Props}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81, setaddt__dts_group7fd81}= useContext(TotalContext) as TotalContextProps;
  const {addt__dts_group7fd81Props, setaddt__dts_group7fd81Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354, setdynamicactions31354}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions31354Props, setdynamicactions31354Props}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newPerformanceReview_v1:{...pre?.newPerformanceReview_v1,review_number:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaccess_req__groupdb1de((prev: any) => ({ ...prev, review_number: +e.target.value }));
    }
    else{
    setaccess_req__groupdb1de((prev: any) => ({ ...prev, review_number: e.target.value }));
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupfa034,
        codeStates['setnew_access_group'] = setnew_access_groupfa034,
        codeStates['new_access_groupfa034'] = new_access_groupfa034Props,
        codeStates['setnew_access_groupfa034'] = setnew_access_groupfa034Props,
        codeStates['access_req__group'] = access_req__groupdb1de,
        codeStates['setaccess_req__group'] = setaccess_req__groupdb1de,
        codeStates['access_req__groupdb1de'] = access_req__groupdb1deProps,
        codeStates['setaccess_req__groupdb1de'] = setaccess_req__groupdb1deProps,
        codeStates['basic_inf'] = basic_inf14612,
        codeStates['setbasic_inf'] = setbasic_inf14612,
        codeStates['full_name'] = full_name13305,
        codeStates['setfull_name'] = setfull_name13305,
        codeStates['cycle_name'] = cycle_name855a5,
        codeStates['setcycle_name'] = setcycle_name855a5,
        codeStates['review_number'] = review_number19333,
        codeStates['setreview_number'] = setreview_number19333,
        codeStates['review_type'] = review_type718e4,
        codeStates['setreview_type'] = setreview_type718e4,
        codeStates['review_status'] = review_status4ba57,
        codeStates['setreview_status'] = setreview_status4ba57,
        codeStates['valid_group'] = valid_groupb4569,
        codeStates['setvalid_group'] = setvalid_groupb4569,
        codeStates['valid_groupb4569'] = valid_groupb4569Props,
        codeStates['setvalid_groupb4569'] = setvalid_groupb4569Props,
        codeStates['addt__group'] = addt__group82d26,
        codeStates['setaddt__group'] = setaddt__group82d26,
        codeStates['addt__group82d26'] = addt__group82d26Props,
        codeStates['setaddt__group82d26'] = setaddt__group82d26Props,
        codeStates['addt__dts_group'] = addt__dts_group7fd81,
        codeStates['setaddt__dts_group'] = setaddt__dts_group7fd81,
        codeStates['addt__dts_group7fd81'] = addt__dts_group7fd81Props,
        codeStates['setaddt__dts_group7fd81'] = setaddt__dts_group7fd81Props,
        codeStates['dynamicactions'] = dynamicactions31354,
        codeStates['setdynamicactions'] = setdynamicactions31354,
        codeStates['dynamicactions31354'] = dynamicactions31354Props,
        codeStates['setdynamicactions31354'] = setdynamicactions31354Props,
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
        "7d9852de618fc302835e21622dfdb1de",
        "2e04cff108f5455ab2256e5917619333"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newPerformanceReview:AFVK:v1",
      //     componentId: "7d9852de618fc302835e21622dfdb1de",
      //     controlId: "2e04cff108f5455ab2256e5917619333",
      //     isTable: false,
      //     from:"TextInputreview_number",
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
        setDynamicStateandType({name:'review_number', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'review_number',type:'text'};
      //   type={
      //     name:'review_number',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.review_number.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.review_number.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.review_number.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'review_number',type:'text'};
      //   type={
      //     name:'review_number',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.review_number.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.review_number.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.review_number.type
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
  const access_req__groupdb1deRef = useRef<any>(access_req__groupdb1de);
  useEffect(() => { access_req__groupdb1deRef.current = access_req__groupdb1de; }, [access_req__groupdb1de]);
  useEffect(()=>{
      handleMapperValue();
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "2e04cff108f5455ab2256e5917619333") {
        handleChange({target:{value:access_req__groupdb1deRef?.current?.review_number||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "2e04cff108f5455ab2256e5917619333") {
        handleBlur({target:{value:access_req__groupdb1deRef?.current?.review_number||""}});
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
  if(dfd_addperformancereviewmodify_v1Props?.setSearchFilters && dfd_addperformancereviewmodify_v1Props?.data)
  {
    if(Array.isArray(dfd_addperformancereviewmodify_v1Props.data) && dfd_addperformancereviewmodify_v1Props.data.length > 0){
      setaccess_req__groupdb1de((pre:any)=>({...pre,review_number:dfd_addperformancereviewmodify_v1Props.data[0]?.review_number}));
    }
  }
  },[dfd_addperformancereviewmodify_v1Props?.setSearchFilters])
  if (review_number19333?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `17 / 25`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={access_req__groupdb1de?.review_number||""}
         disabled= {review_number19333?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='type here....'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="Review Number"
      errorMessage={error}
        validationState={validate?.newPerformanceReview_v1?.review_number ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputreview_number
