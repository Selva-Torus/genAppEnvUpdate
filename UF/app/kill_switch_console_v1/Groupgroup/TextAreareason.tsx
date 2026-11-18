
'use client'
import React, { useState,useContext,useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextArea } from '@/components/TextArea';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useGlobal } from '@/context/GlobalContext'
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import * as v from 'valibot';


const TextAreareason = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,encryptionFlagCompData,setIsProcessing,controlData}:any) => {
  const { token } = useGlobal();
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const decodedTokenObj:any = decodeToken(token);
  let code:string="";
  const prevRefreshRef = useRef<any>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'reason',type:"string"})
  const [allCode,setAllCode] = useState<string>("")
  const toast : Function = useInfoMsg()
  const routes : AppRouterInstance = useRouter()
  const [error, setError] = useState<string>('');
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  let schemaArray :string[] =[];
  schemaArray = [] ;
 /////////////
   //another screen
  const {overall_group8bfb3, setoverall_group8bfb3}= useContext(TotalContext) as TotalContextProps;
  const {overall_group8bfb3Props, setoverall_group8bfb3Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40, setai_asset_dependency_groupeee40}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_groupeee40Props, setai_asset_dependency_groupeee40Props}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0, setservice_identity_table953a0}= useContext(TotalContext) as TotalContextProps;
  const {service_identity_table953a0Props, setservice_identity_table953a0Props}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024, setai_asset_dependency_group_1ed024}= useContext(TotalContext) as TotalContextProps;
  const {ai_asset_dependency_group_1ed024Props, setai_asset_dependency_group_1ed024Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8, setgroupb1db8}= useContext(TotalContext) as TotalContextProps;
  const {groupb1db8Props, setgroupb1db8Props}= useContext(TotalContext) as TotalContextProps;
  const {action_no92cf2, setaction_no92cf2}= useContext(TotalContext) as TotalContextProps;
  const {asset_name0720a, setasset_name0720a}= useContext(TotalContext) as TotalContextProps;
  const {reasonb2319, setreasonb2319}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204, setrevocation_table5b204}= useContext(TotalContext) as TotalContextProps;
  const {revocation_table5b204Props, setrevocation_table5b204Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  const handleMapperValue=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "ad0576f81000455ba51c8e12117b1db8",
        "3e44bff2d289458e8e4d9ed8111b2319"
      );
      if(Array.isArray(orchestrationData?.data?.schemaData?.at(0)?.schema)){
        let allSchemas:any[]=orchestrationData?.data?.schemaData?.at(0)?.schema||[]
        let type:any={name:'reason',type:'text'}
        allSchemas.map((item:any)=>{
          if(item.name=='reason')
          {
            type=item
  
          }
        })
        setDynamicStateandType(type)       
      }
      if(orchestrationData?.data?.schemaData?.at(0).schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'reason',type:'text'}
        type={
          name:'reason',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.reason.type
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
  },[reasonb2319?.refresh])
  
  useEffect(()=>{
    if (prevRefreshRef.current) {
      setgroupb1db8((pre:any)=>({...pre,reason:""}))
    }else 
      prevRefreshRef.current= true
  },[reasonb2319?.refresh])

  const groupb1db8Ref = useRef<any>(groupb1db8);
  useEffect(() => { groupb1db8Ref.current = groupb1db8; }, [groupb1db8]);
  useEffect(()=>{
      handleMapperValue();
    if(validateRefetch.init!=0)
      handleValidate();
    const handlerChange = (id:any) => {
      if (id === "3e44bff2d289458e8e4d9ed8111b2319") {
        handleChange({target:{value:groupb1db8Ref?.current?.reason||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "3e44bff2d289458e8e4d9ed8111b2319") {
        handleBlur({target:{value:groupb1db8Ref?.current?.reason||""}});
      }
    };
    eventBus.on("triggerTextAreaChange", handlerChange);
    eventBus.on("triggerTextAreaBlur", handlerBlur);
    return () => {
      eventBus.off("triggerTextAreaChange", handlerChange);
      eventBus.off("triggerTextAreaBlur", handlerBlur);
    };
  },[validateRefetch.value])


  const handleBlur=async(e:any)=>{
    let validate:any
    code = allCode;
    if (code != '') {
      let codeStates: any = {};
        codeStates['overall_group'] = overall_group8bfb3,
        codeStates['setoverall_group'] = setoverall_group8bfb3,
        codeStates['overall_group8bfb3'] = overall_group8bfb3Props,
        codeStates['setoverall_group8bfb3'] = setoverall_group8bfb3Props,
        codeStates['ai_asset_dependency_group'] = ai_asset_dependency_groupeee40,
        codeStates['setai_asset_dependency_group'] = setai_asset_dependency_groupeee40,
        codeStates['ai_asset_dependency_groupeee40'] = ai_asset_dependency_groupeee40Props,
        codeStates['setai_asset_dependency_groupeee40'] = setai_asset_dependency_groupeee40Props,
        codeStates['service_identity_table'] = service_identity_table953a0,
        codeStates['setservice_identity_table'] = setservice_identity_table953a0,
        codeStates['service_identity_table953a0'] = service_identity_table953a0Props,
        codeStates['setservice_identity_table953a0'] = setservice_identity_table953a0Props,
        codeStates['ai_asset_dependency_group_1'] = ai_asset_dependency_group_1ed024,
        codeStates['setai_asset_dependency_group_1'] = setai_asset_dependency_group_1ed024,
        codeStates['ai_asset_dependency_group_1ed024'] = ai_asset_dependency_group_1ed024Props,
        codeStates['setai_asset_dependency_group_1ed024'] = setai_asset_dependency_group_1ed024Props,
        codeStates['group'] = groupb1db8,
        codeStates['setgroup'] = setgroupb1db8,
        codeStates['groupb1db8'] = groupb1db8Props,
        codeStates['setgroupb1db8'] = setgroupb1db8Props,
        codeStates['action_no'] = action_no92cf2,
        codeStates['setaction_no'] = setaction_no92cf2,
        codeStates['asset_name'] = asset_name0720a,
        codeStates['setasset_name'] = setasset_name0720a,
        codeStates['reason'] = reasonb2319,
        codeStates['setreason'] = setreasonb2319,
        codeStates['revocation_table'] = revocation_table5b204,
        codeStates['setrevocation_table'] = setrevocation_table5b204,
        codeStates['revocation_table5b204'] = revocation_table5b204Props,
        codeStates['setrevocation_table5b204'] = setrevocation_table5b204Props,
    codeExecution(code,codeStates)
    }
  }
  const handleChange = async(e: any) => {
    let validate:any;
    setError('');
    setValidate((pre:any)=>({...pre,killSwitchActionList_v1:{...pre?.killSwitchActionList_v1,reason:undefined}}));
    if(dynamicStateandType.type=="number"){
    setgroupb1db8((prev: any) => ({ ...prev, reason: +e?.target?.value }));
    }
    else{
    setgroupb1db8((prev: any) => ({ ...prev, reason: e?.target?.value }));
    }
    try{
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

  const handleValidate=async (e?:any) => {
      let validate:any
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
  if (reasonb2319?.isHidden) {
    return <></>
  }
return (
  <div 
  style={{gridColumn: `1 / 25`,gridRow: `15 / 31`, gap:``, height: `100%`}} >
    <TextArea
      require={isRequredData}
      className=""
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={ true }
      placeholder = {'Read Only'}
      contentAlign={"left"}
      headerPosition='top'
      headerText="Reason"
      pin = {'brick-brick'}
      value = { groupb1db8?.reason != null && typeof groupb1db8?.reason =='object' ? Object.keys(groupb1db8?.reason)?.length ?  JSON.stringify(groupb1db8?.reason,null ,2):"" : groupb1db8?.reason||""}
      errorMessage={error}
      validationState={validate?.killSwitchActionList_v1?.reason ? "invalid" : undefined}
    />
  </div>
  )
}

export default TextAreareason
