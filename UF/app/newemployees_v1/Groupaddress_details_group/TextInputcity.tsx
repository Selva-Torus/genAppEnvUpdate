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

const TextInputcity = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1|73c2a20a785b4361a729fb7c45a12258|properties.city"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1|bba8ca5638ef4ca7b59fe895038b72f4|0158e5f3c93a4277ba5493dbf7505e71"
    }
  ],
  "dfdKey": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1:",
  "schemaData": {
    "type": "string"
  },
  "dataType": "string"
}
  const decodedTokenObj:any = decodeToken(token);
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const toast : Function = useInfoMsg()
  const keyset : Function = i18n.keyset("language");
  const [allCode,setAllCode]=useState<string>("");
  let schemaArray :string[] =[];
  const [dynamicStateandType,setDynamicStateandType]=useState<Record<string, any>>({name:'city',type:"text"})
  const routes: AppRouterInstance = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState<boolean>(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
   //another screen
  const {new_employee_group42d78, setnew_employee_group42d78}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_group42d78Props, setnew_employee_group42d78Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358, setdynamicactionsa8358}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358Props, setdynamicactionsa8358Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fd, setbasic_details_groupd39fd}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fdProps, setbasic_details_groupd39fdProps}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911, setcontact_details_groupa1911}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911Props, setcontact_details_groupa1911Props}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4, setaddress_details_groupb72f4}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4Props, setaddress_details_groupb72f4Props}= useContext(TotalContext) as TotalContextProps;
  const {address_details051da, setaddress_details051da}= useContext(TotalContext) as TotalContextProps;
  const {country66635, setcountry66635}= useContext(TotalContext) as TotalContextProps;
  const {state198ea, setstate198ea}= useContext(TotalContext) as TotalContextProps;
  const {city05e71, setcity05e71}= useContext(TotalContext) as TotalContextProps;
  const {postal_code9a646, setpostal_code9a646}= useContext(TotalContext) as TotalContextProps;
  const {nationality39fcd, setnationality39fcd}= useContext(TotalContext) as TotalContextProps;
  const {address_line15e52e, setaddress_line15e52e}= useContext(TotalContext) as TotalContextProps;
  const {address_line20e4f1, setaddress_line20e4f1}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6fe, setidentity_details_group6a6fe}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6feProps, setidentity_details_group6a6feProps}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6, setemployment_details_group89cd6}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6Props, setemployment_details_group89cd6Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1, setcompensation_details_groupf9ef1}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1Props, setcompensation_details_groupf9ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cd, setbank_details820cd}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cdProps, setbank_details820cdProps}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988, setemergency_contact_group73988}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988Props, setemergency_contact_group73988Props}= useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupcb53a, setskills_education_groupcb53a}= useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupcb53aProps, setskills_education_groupcb53aProps}= useContext(TotalContext) as TotalContextProps;
  const {skills_group36679, setskills_group36679}= useContext(TotalContext) as TotalContextProps;
  const {skills_group36679Props, setskills_group36679Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a, setskill9f89a}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89aProps, setskill9f89aProps}= useContext(TotalContext) as TotalContextProps;
  const {education_group70757, seteducation_group70757}= useContext(TotalContext) as TotalContextProps;
  const {education_group70757Props, seteducation_group70757Props}= useContext(TotalContext) as TotalContextProps;
  const {education2393a, seteducation2393a}= useContext(TotalContext) as TotalContextProps;
  const {education2393aProps, seteducation2393aProps}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63, setcert_groupedb63}= useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63Props, setcert_groupedb63Props}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06, setcertificationc7d06}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06Props, setcertificationc7d06Props}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7, setfamily_detail_group800b7}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7Props, setfamily_detail_group800b7Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps;
  

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
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:undefined}}));
    if(dynamicStateandType.type=="number"){
    setaddress_details_groupb72f4((prev: any) => ({ ...prev, city: +e.target.value }));
    validate = v.safeParse(schema, +e.target.value);
    }
    else{
    setaddress_details_groupb72f4((prev: any) => ({ ...prev, city: e.target.value }));
    validate = v.safeParse(schema, e.target.value);
    }
    const newInputValue = dynamicStateandType.type=="number" ? +e.target.value : e.target.value;
    let code:string=allCode;
     if (code != '') {
      let codeStates: any = {};
        codeStates['new_employee_group'] = new_employee_group42d78,
        codeStates['setnew_employee_group'] = setnew_employee_group42d78,
        codeStates['new_employee_group42d78'] = new_employee_group42d78Props,
        codeStates['setnew_employee_group42d78'] = setnew_employee_group42d78Props,
        codeStates['dynamicactions'] = dynamicactionsa8358,
        codeStates['setdynamicactions'] = setdynamicactionsa8358,
        codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
        codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
        codeStates['basic_details_group'] = basic_details_groupd39fd,
        codeStates['setbasic_details_group'] = setbasic_details_groupd39fd,
        codeStates['basic_details_groupd39fd'] = basic_details_groupd39fdProps,
        codeStates['setbasic_details_groupd39fd'] = setbasic_details_groupd39fdProps,
        codeStates['contact_details_group'] = contact_details_groupa1911,
        codeStates['setcontact_details_group'] = setcontact_details_groupa1911,
        codeStates['contact_details_groupa1911'] = contact_details_groupa1911Props,
        codeStates['setcontact_details_groupa1911'] = setcontact_details_groupa1911Props,
        codeStates['address_details_group'] = address_details_groupb72f4,
        codeStates['setaddress_details_group'] = setaddress_details_groupb72f4,
        codeStates['address_details_groupb72f4'] = address_details_groupb72f4Props,
        codeStates['setaddress_details_groupb72f4'] = setaddress_details_groupb72f4Props,
        codeStates['address_details'] = address_details051da,
        codeStates['setaddress_details'] = setaddress_details051da,
        codeStates['country'] = country66635,
        codeStates['setcountry'] = setcountry66635,
        codeStates['state'] = state198ea,
        codeStates['setstate'] = setstate198ea,
        codeStates['city'] = city05e71,
        codeStates['setcity'] = setcity05e71,
        codeStates['postal_code'] = postal_code9a646,
        codeStates['setpostal_code'] = setpostal_code9a646,
        codeStates['nationality'] = nationality39fcd,
        codeStates['setnationality'] = setnationality39fcd,
        codeStates['address_line1'] = address_line15e52e,
        codeStates['setaddress_line1'] = setaddress_line15e52e,
        codeStates['address_line2'] = address_line20e4f1,
        codeStates['setaddress_line2'] = setaddress_line20e4f1,
        codeStates['identity_details_group'] = identity_details_group6a6fe,
        codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
        codeStates['identity_details_group6a6fe'] = identity_details_group6a6feProps,
        codeStates['setidentity_details_group6a6fe'] = setidentity_details_group6a6feProps,
        codeStates['employment_details_group'] = employment_details_group89cd6,
        codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
        codeStates['employment_details_group89cd6'] = employment_details_group89cd6Props,
        codeStates['setemployment_details_group89cd6'] = setemployment_details_group89cd6Props,
        codeStates['compensation_details_group'] = compensation_details_groupf9ef1,
        codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
        codeStates['compensation_details_groupf9ef1'] = compensation_details_groupf9ef1Props,
        codeStates['setcompensation_details_groupf9ef1'] = setcompensation_details_groupf9ef1Props,
        codeStates['bank_details'] = bank_details820cd,
        codeStates['setbank_details'] = setbank_details820cd,
        codeStates['bank_details820cd'] = bank_details820cdProps,
        codeStates['setbank_details820cd'] = setbank_details820cdProps,
        codeStates['emergency_contact_group'] = emergency_contact_group73988,
        codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
        codeStates['emergency_contact_group73988'] = emergency_contact_group73988Props,
        codeStates['setemergency_contact_group73988'] = setemergency_contact_group73988Props,
        codeStates['skills_education_group'] = skills_education_groupcb53a,
        codeStates['setskills_education_group'] = setskills_education_groupcb53a,
        codeStates['skills_education_groupcb53a'] = skills_education_groupcb53aProps,
        codeStates['setskills_education_groupcb53a'] = setskills_education_groupcb53aProps,
        codeStates['skills_group'] = skills_group36679,
        codeStates['setskills_group'] = setskills_group36679,
        codeStates['skills_group36679'] = skills_group36679Props,
        codeStates['setskills_group36679'] = setskills_group36679Props,
        codeStates['skill'] = skill9f89a,
        codeStates['setskill'] = setskill9f89a,
        codeStates['skill9f89a'] = skill9f89aProps,
        codeStates['setskill9f89a'] = setskill9f89aProps,
        codeStates['education_group'] = education_group70757,
        codeStates['seteducation_group'] = seteducation_group70757,
        codeStates['education_group70757'] = education_group70757Props,
        codeStates['seteducation_group70757'] = seteducation_group70757Props,
        codeStates['education'] = education2393a,
        codeStates['seteducation'] = seteducation2393a,
        codeStates['education2393a'] = education2393aProps,
        codeStates['seteducation2393a'] = seteducation2393aProps,
        codeStates['cert_group'] = cert_groupedb63,
        codeStates['setcert_group'] = setcert_groupedb63,
        codeStates['cert_groupedb63'] = cert_groupedb63Props,
        codeStates['setcert_groupedb63'] = setcert_groupedb63Props,
        codeStates['certification'] = certificationc7d06,
        codeStates['setcertification'] = setcertificationc7d06,
        codeStates['certificationc7d06'] = certificationc7d06Props,
        codeStates['setcertificationc7d06'] = setcertificationc7d06Props,
        codeStates['family_detail_group'] = family_detail_group800b7,
        codeStates['setfamily_detail_group'] = setfamily_detail_group800b7,
        codeStates['family_detail_group800b7'] = family_detail_group800b7Props,
        codeStates['setfamily_detail_group800b7'] = setfamily_detail_group800b7Props,
        codeStates['famly_details'] = famly_detailsb06ea,
        codeStates['setfamly_details'] = setfamly_detailsb06ea,
        codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
        codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,
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
      if(address_details_groupb72f4?.city == "" || address_details_groupb72f4?.city == undefined){
      address_details_groupb72f4.city = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, address_details_groupb72f4?.city);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:"invalid"}}));
        }
    }else if(address_details_groupb72f4?.city !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +address_details_groupb72f4?.city);
        }
        else{
          validate = v.safeParse(schema, address_details_groupb72f4?.city);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:undefined}}));
    }
    }
    if(!validate?.success){
      return
    }
  }
  const handleBlur=async (e?:any) => {
      let validate:any
      if(address_details_groupb72f4?.city == "" || address_details_groupb72f4?.city == undefined){
      address_details_groupb72f4.city = "";
     if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, NaN);
        }
        else{
          validate = v.safeParse(schema, address_details_groupb72f4?.city);
        }
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:"invalid"}}));
        }
    }else if(address_details_groupb72f4?.city !== ""){
   if(dynamicStateandType.type=="number"){
          validate = v.safeParse(schema, +address_details_groupb72f4?.city);
        }
        else{
          validate = v.safeParse(schema, address_details_groupb72f4?.city);
        }
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:"invalid"}}));
    }else{
      setError('');
      setValidate((pre:any)=>({...pre,newEmployees_v1:{...pre?.newEmployees_v1,city:undefined}}));
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
        "bba8ca5638ef4ca7b59fe895038b72f4",
        "0158e5f3c93a4277ba5493dbf7505e71"
      );
      // const orchestrationData: any = await AxiosService.post(
      //   '/UF/Orchestration',
      //   {
      //     key: "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1",
      //     componentId: "bba8ca5638ef4ca7b59fe895038b72f4",
      //     controlId: "0158e5f3c93a4277ba5493dbf7505e71",
      //     isTable: false,
      //     from:"TextInputcity",
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
        setDynamicStateandType({name:'city', type: 'number'});
      }
      // if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      // if(orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties){
      //   let type:any={name:'city',type:'text'};
      //   type={
      //     name:'city',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.city.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.city.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.responses["200"].content["application/json"].schema.items.properties.city.type
      //   }
      //   setDynamicStateandType(type);
      // }
      // }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
      //   if(orchestrationData?.data?.schemaData?.at(0)?.schema.properties){
      //   let type:any={name:'city',type:'text'};
      //   type={
      //     name:'city',
      //     type: orchestrationData?.data?.schemaData?.at(0)?.schema.properties.city.type == 'string' ? 'text' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.city.type =='integer' ? 'number' : orchestrationData?.data?.schemaData?.at(0)?.schema.properties.city.type
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
  const address_details_groupb72f4Ref = useRef<any>(address_details_groupb72f4);
  useEffect(() => { address_details_groupb72f4Ref.current = address_details_groupb72f4; }, [address_details_groupb72f4]);
  useEffect(()=>{
      handleMapperValue();
      if(!address_details_groupb72f4?.city)
      {
        setaddress_details_groupb72f4Props((pre:any)=>({...pre,required:true}));
        setIsRequredData(true);
      }
      if(validateRefetch.init!=0)
        handleValidate();
    const handlerChange = (id:any) => {
      if (id === "0158e5f3c93a4277ba5493dbf7505e71") {
        handleChange({target:{value:address_details_groupb72f4Ref?.current?.city||""}});
      }
    };
    const handlerBlur = (id:any) => {
      if (id === "0158e5f3c93a4277ba5493dbf7505e71") {
        handleBlur({target:{value:address_details_groupb72f4Ref?.current?.city||""}});
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
  if(dfd_employees_v1Props?.setSearchFilters && dfd_employees_v1Props?.data)
  {
    if(Array.isArray(dfd_employees_v1Props.data) && dfd_employees_v1Props.data.length > 0){
      setaddress_details_groupb72f4((pre:any)=>({...pre,city:dfd_employees_v1Props.data[0]?.city}));
    }
  }
  },[dfd_employees_v1Props?.setSearchFilters])
  if (city05e71?.isHidden) {
    return <></>
  }
  return (   
    <div  
      style={{gridColumn: `13 / 19`,gridRow: `7 / 19`, gap:``, height: `100%`, overflow: 'auto', display: 'flex', flexDirection: 'column'}} >
      <div style={{ flex: 1, minHeight: 0 }}>
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        itsHaveCurrency={false}
        type={dynamicStateandType.type}
        value={address_details_groupb72f4?.city||""}
         disabled= {city05e71?.isDisabled ? true : false}
        pin='brick-brick'     
        placeholder='e.g. Chennai'      
        view='normal'
        contentAlign={"left"}
        headerPosition='top'
        headerText="City"
      errorMessage={error}
        validationState={validate?.newEmployees_v1?.city ? "invalid" : undefined}
      />
      </div>
    </div> 
  )
}

export default TextInputcity
