
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";


const TextAreadescription = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'description',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
 /////////////
   //another screen
  const {maintenance_groupdb5a7, setmaintenance_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_groupdb5a7Props, setmaintenance_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3ac, setmaintenance_information_groupea3ac}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_information_groupea3acProps, setmaintenance_information_groupea3acProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cd, setexecution_details_group591cd}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_group591cdProps, setexecution_details_group591cdProps}= useContext(TotalContext) as TotalContextProps;
  const {execution_details_text71309, setexecution_details_text71309}= useContext(TotalContext) as TotalContextProps;
  const {performed_bycb4dc, setperformed_bycb4dc}= useContext(TotalContext) as TotalContextProps;
  const {vendor_name17b17, setvendor_name17b17}= useContext(TotalContext) as TotalContextProps;
  const {vendor_referencefa982, setvendor_referencefa982}= useContext(TotalContext) as TotalContextProps;
  const {downtime_hours721c7, setdowntime_hours721c7}= useContext(TotalContext) as TotalContextProps;
  const {cost35190, setcost35190}= useContext(TotalContext) as TotalContextProps;
  const {descriptioneaa55, setdescriptioneaa55}= useContext(TotalContext) as TotalContextProps;
  const {maintenance_checklist024ed, setmaintenance_checklist024ed}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672d, setdynamicactions8672d}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions8672dProps, setdynamicactions8672dProps}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "6f620f2c13924269ac67da12e7f591cd",
        "4d2cff9c971540339012e52dd6aeaa55"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'description',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='description')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'description',type:'text'}
        type={
          name:'description',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.description.type
        }
        setDynamicStateandType(type)
       
      }
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[descriptioneaa55?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setexecution_details_group591cd((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[descriptioneaa55?.refresh])

  const handleBlur=async(e:any)=>{
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['maintenance_group'] = maintenance_groupdb5a7,
        codeStates['setmaintenance_group'] = setmaintenance_groupdb5a7,
        codeStates['maintenance_groupdb5a7'] = maintenance_groupdb5a7Props,
        codeStates['setmaintenance_groupdb5a7'] = setmaintenance_groupdb5a7Props,
        codeStates['maintenance_information_group'] = maintenance_information_groupea3ac,
        codeStates['setmaintenance_information_group'] = setmaintenance_information_groupea3ac,
        codeStates['maintenance_information_groupea3ac'] = maintenance_information_groupea3acProps,
        codeStates['setmaintenance_information_groupea3ac'] = setmaintenance_information_groupea3acProps,
        codeStates['execution_details_group'] = execution_details_group591cd,
        codeStates['setexecution_details_group'] = setexecution_details_group591cd,
        codeStates['execution_details_group591cd'] = execution_details_group591cdProps,
        codeStates['setexecution_details_group591cd'] = setexecution_details_group591cdProps,
        codeStates['execution_details_text'] = execution_details_text71309,
        codeStates['setexecution_details_text'] = setexecution_details_text71309,
        codeStates['performed_by'] = performed_bycb4dc,
        codeStates['setperformed_by'] = setperformed_bycb4dc,
        codeStates['vendor_name'] = vendor_name17b17,
        codeStates['setvendor_name'] = setvendor_name17b17,
        codeStates['vendor_reference'] = vendor_referencefa982,
        codeStates['setvendor_reference'] = setvendor_referencefa982,
        codeStates['downtime_hours'] = downtime_hours721c7,
        codeStates['setdowntime_hours'] = setdowntime_hours721c7,
        codeStates['cost'] = cost35190,
        codeStates['setcost'] = setcost35190,
        codeStates['description'] = descriptioneaa55,
        codeStates['setdescription'] = setdescriptioneaa55,
        codeStates['maintenance_checklist'] = maintenance_checklist024ed,
        codeStates['setmaintenance_checklist'] = setmaintenance_checklist024ed,
        codeStates['dynamicactions'] = dynamicactions8672d,
        codeStates['setdynamicactions'] = setdynamicactions8672d,
        codeStates['dynamicactions8672d'] = dynamicactions8672dProps,
        codeStates['setdynamicactions8672d'] = setdynamicactions8672dProps,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    try{
    //setIsProcessing(true);
    setexecution_details_group591cd((prev: any) => ({ ...prev, description: e?.target?.value }));
    }catch (err: any) {
    ///setIsProcessing(false);
    if(typeof err == 'string')
      toast(err, 'danger');
    else
      toast(err?.response?.data?.errorDetails?.message, 'danger');
  }finally{
    //setIsProcessing(false);
  }
  }
  const handleFocus=async(e:any)=>{
    try{
    setIsProcessing(true);
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
  if (descriptioneaa55?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `17 / 25`,gridRow: `21 / 33`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {descriptioneaa55?.isDisabled ? true : false}
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { execution_details_group591cd?.description != null && typeof execution_details_group591cd?.description =='object' ? Object.keys(execution_details_group591cd?.description)?.length ?  JSON.stringify(execution_details_group591cd?.description,null ,2):"" : execution_details_group591cd?.description||""}
    />
  </div>
  )
}

export default TextAreadescription
