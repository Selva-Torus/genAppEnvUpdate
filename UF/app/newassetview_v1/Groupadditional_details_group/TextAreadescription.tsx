
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
  const {new_asset_group3261e, setnew_asset_group3261e}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_group3261eProps, setnew_asset_group3261eProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113, setasset_info_groupcc113}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupcc113Props, setasset_info_groupcc113Props}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65, setclassification_groupd9d65}= useContext(TotalContext) as TotalContextProps;
  const {classification_groupd9d65Props, setclassification_groupd9d65Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35, setadditional_details_groupaff35}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_groupaff35Props, setadditional_details_groupaff35Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_text5aceb, setadditional_details_text5aceb}= useContext(TotalContext) as TotalContextProps;
  const {location2acd9, setlocation2acd9}= useContext(TotalContext) as TotalContextProps;
  const {description70aff, setdescription70aff}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900, setpyrchase_details_groupc3900}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_groupc3900Props, setpyrchase_details_groupc3900Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77, setdisposal_details_group67f77}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_group67f77Props, setdisposal_details_group67f77Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "b319d9ad35ed247c74a5a02ee39aff35",
        "186eee41caa5bc2a841ea332e8870aff"
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
  },[description70aff?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setadditional_details_groupaff35((pre:any)=>({...pre,description:""}))
    }else 
      prevRefreshRef.current= true
  },[description70aff?.refresh])

  const handleBlur=async(e:any)=>{
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['new_asset_group'] = new_asset_group3261e,
        codeStates['setnew_asset_group'] = setnew_asset_group3261e,
        codeStates['new_asset_group3261e'] = new_asset_group3261eProps,
        codeStates['setnew_asset_group3261e'] = setnew_asset_group3261eProps,
        codeStates['asset_info_group'] = asset_info_groupcc113,
        codeStates['setasset_info_group'] = setasset_info_groupcc113,
        codeStates['asset_info_groupcc113'] = asset_info_groupcc113Props,
        codeStates['setasset_info_groupcc113'] = setasset_info_groupcc113Props,
        codeStates['classification_group'] = classification_groupd9d65,
        codeStates['setclassification_group'] = setclassification_groupd9d65,
        codeStates['classification_groupd9d65'] = classification_groupd9d65Props,
        codeStates['setclassification_groupd9d65'] = setclassification_groupd9d65Props,
        codeStates['additional_details_group'] = additional_details_groupaff35,
        codeStates['setadditional_details_group'] = setadditional_details_groupaff35,
        codeStates['additional_details_groupaff35'] = additional_details_groupaff35Props,
        codeStates['setadditional_details_groupaff35'] = setadditional_details_groupaff35Props,
        codeStates['additional_details_text'] = additional_details_text5aceb,
        codeStates['setadditional_details_text'] = setadditional_details_text5aceb,
        codeStates['location'] = location2acd9,
        codeStates['setlocation'] = setlocation2acd9,
        codeStates['description'] = description70aff,
        codeStates['setdescription'] = setdescription70aff,
        codeStates['pyrchase_details_group'] = pyrchase_details_groupc3900,
        codeStates['setpyrchase_details_group'] = setpyrchase_details_groupc3900,
        codeStates['pyrchase_details_groupc3900'] = pyrchase_details_groupc3900Props,
        codeStates['setpyrchase_details_groupc3900'] = setpyrchase_details_groupc3900Props,
        codeStates['disposal_details_group'] = disposal_details_group67f77,
        codeStates['setdisposal_details_group'] = setdisposal_details_group67f77,
        codeStates['disposal_details_group67f77'] = disposal_details_group67f77Props,
        codeStates['setdisposal_details_group67f77'] = setdisposal_details_group67f77Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    try{
    //setIsProcessing(true);
    setadditional_details_groupaff35((prev: any) => ({ ...prev, description: e?.target?.value }));
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
  if (description70aff?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `7 / 25`,gridRow: `8 / 20`, gap:``, height: `100%`}} >
    <TextArea
      className="!rounded-md"
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled= {description70aff?.isDisabled ? true : false}
      readOnly={ true }
      placeholder = {'type here...'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Description"
      pin = {'brick-brick'}
      value = { additional_details_groupaff35?.description != null && typeof additional_details_groupaff35?.description =='object' ? Object.keys(additional_details_groupaff35?.description)?.length ?  JSON.stringify(additional_details_groupaff35?.description,null ,2):"" : additional_details_groupaff35?.description||""}
    />
  </div>
  )
}

export default TextAreadescription
