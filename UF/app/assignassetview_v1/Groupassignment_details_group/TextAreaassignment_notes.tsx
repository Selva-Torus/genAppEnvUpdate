
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


const TextAreaassignment_notes = ({checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
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
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'assignment_notes',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
 /////////////
   //another screen
  const {assign_asset_groupb4f2d, setassign_asset_groupb4f2d}= useContext(TotalContext) as TotalContextProps;
  const {assign_asset_groupb4f2dProps, setassign_asset_groupb4f2dProps}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9, setassignment_information_groupc96e9}= useContext(TotalContext) as TotalContextProps;
  const {assignment_information_groupc96e9Props, setassignment_information_groupc96e9Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4, setassignment_details_group136e4}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_group136e4Props, setassignment_details_group136e4Props}= useContext(TotalContext) as TotalContextProps;
  const {assignment_details_text97d83, setassignment_details_text97d83}= useContext(TotalContext) as TotalContextProps;
  const {actual_return_datec1f64, setactual_return_datec1f64}= useContext(TotalContext) as TotalContextProps;
  const {returned_atecafb, setreturned_atecafb}= useContext(TotalContext) as TotalContextProps;
  const {condition_at_return1d3c7, setcondition_at_return1d3c7}= useContext(TotalContext) as TotalContextProps;
  const {approved_by2b89c, setapproved_by2b89c}= useContext(TotalContext) as TotalContextProps;
  const {approval_statusf07b0, setapproval_statusf07b0}= useContext(TotalContext) as TotalContextProps;
  const {acknowledgement_signed5ee58, setacknowledgement_signed5ee58}= useContext(TotalContext) as TotalContextProps;
  const {assignment_notes59be1, setassignment_notes59be1}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "472c369f56f3afb6e920bdd86cc136e4",
        "42af881d6f334f6b673e31ef8e859be1"
      );
      if(orchestrationData?.data?.schemaData){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'assignment_notes',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='assignment_notes')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'assignment_notes',type:'text'}
        type={
          name:'assignment_notes',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.assignment_notes.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.assignment_notes.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.assignment_notes.type
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
  },[assignment_notes59be1?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setassignment_details_group136e4((pre:any)=>({...pre,assignment_notes:""}))
    }else 
      prevRefreshRef.current= true
  },[assignment_notes59be1?.refresh])

  const handleBlur=async(e:any)=>{
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['assign_asset_group'] = assign_asset_groupb4f2d,
        codeStates['setassign_asset_group'] = setassign_asset_groupb4f2d,
        codeStates['assign_asset_groupb4f2d'] = assign_asset_groupb4f2dProps,
        codeStates['setassign_asset_groupb4f2d'] = setassign_asset_groupb4f2dProps,
        codeStates['assignment_information_group'] = assignment_information_groupc96e9,
        codeStates['setassignment_information_group'] = setassignment_information_groupc96e9,
        codeStates['assignment_information_groupc96e9'] = assignment_information_groupc96e9Props,
        codeStates['setassignment_information_groupc96e9'] = setassignment_information_groupc96e9Props,
        codeStates['assignment_details_group'] = assignment_details_group136e4,
        codeStates['setassignment_details_group'] = setassignment_details_group136e4,
        codeStates['assignment_details_group136e4'] = assignment_details_group136e4Props,
        codeStates['setassignment_details_group136e4'] = setassignment_details_group136e4Props,
        codeStates['assignment_details_text'] = assignment_details_text97d83,
        codeStates['setassignment_details_text'] = setassignment_details_text97d83,
        codeStates['actual_return_date'] = actual_return_datec1f64,
        codeStates['setactual_return_date'] = setactual_return_datec1f64,
        codeStates['returned_at'] = returned_atecafb,
        codeStates['setreturned_at'] = setreturned_atecafb,
        codeStates['condition_at_return'] = condition_at_return1d3c7,
        codeStates['setcondition_at_return'] = setcondition_at_return1d3c7,
        codeStates['approved_by'] = approved_by2b89c,
        codeStates['setapproved_by'] = setapproved_by2b89c,
        codeStates['approval_status'] = approval_statusf07b0,
        codeStates['setapproval_status'] = setapproval_statusf07b0,
        codeStates['acknowledgement_signed'] = acknowledgement_signed5ee58,
        codeStates['setacknowledgement_signed'] = setacknowledgement_signed5ee58,
        codeStates['assignment_notes'] = assignment_notes59be1,
        codeStates['setassignment_notes'] = setassignment_notes59be1,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    try{
    //setIsProcessing(true);
    setassignment_details_group136e4((prev: any) => ({ ...prev, assignment_notes: e?.target?.value }));
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
  if (assignment_notes59be1?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 17`,gridRow: `34 / 48`, gap:``, height: `100%`}} >
    <TextArea
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {assignment_notes59be1?.isDisabled ? true : false}
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Assignment Notes"
      pin = {'brick-brick'}
      value = { assignment_details_group136e4?.assignment_notes != null && typeof assignment_details_group136e4?.assignment_notes =='object' ? Object.keys(assignment_details_group136e4?.assignment_notes)?.length ?  JSON.stringify(assignment_details_group136e4?.assignment_notes,null ,2):"" : assignment_details_group136e4?.assignment_notes||""}
    />
  </div>
  )
}

export default TextAreaassignment_notes
