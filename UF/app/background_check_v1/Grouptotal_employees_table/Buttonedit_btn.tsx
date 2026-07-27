'use client'




import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import i18n from '@/app/components/i18n';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import {commonSepareteDataFromTheObject, eventFunction, filterByKeys } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import UOmapperData from '@/context/dfdmapperContolnames.json';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable  from '@/app/utils/evaluateDecisionTable';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { getGridPositionFromOrder } from '@/app/utils/getGridPositionFromOrder';
import { Scan } from '@/app/utils/scanService';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { XMLParser } from 'fast-xml-parser'

    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonedit_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
  const token:string = getCookie('token');
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const decodedTokenObj:any = decodeToken(token);
  const createdBy : string = decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const [selectedData,setSelectedData]=useState<any[]>()
  useEffect(()=>{
    setSelectedData([lockedData?.data||{}])
  },[lockedData])

  let code:string = "";
  const prevRefreshRef = useRef(false);
  const [ruleData,setRulseData]=useState<any>([])
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const savedData=useRef<Record<string, any>>({});
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast : Function=useInfoMsg();
  let dfKey: string | any;
  const [showFlag, setShowFlag] = React.useState<boolean>(true);
  const lockMode:any = lockedData?.lockMode;
  const [loading, setLoading] = useState<boolean>(false);
  const routes : AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
    
 /////////////
   //another screen

  const {total_employees_group455f5, settotal_employees_group455f5}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_group455f5Props, settotal_employees_group455f5Props}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7, setemp_groupe44b7}= useContext(TotalContext) as TotalContextProps;
  const {emp_groupe44b7Props, setemp_groupe44b7Props}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379da, settotal_employees_table379da}= useContext(TotalContext) as TotalContextProps;
  const {total_employees_table379daProps, settotal_employees_table379daProps}= useContext(TotalContext) as TotalContextProps;
  const {check_idc0499, setcheck_idc0499}= useContext(TotalContext) as TotalContextProps;
  const {full_name8459f, setfull_name8459f}= useContext(TotalContext) as TotalContextProps;
  const {check_type67f55, setcheck_type67f55}= useContext(TotalContext) as TotalContextProps;
  const {initiated_dated326f, setinitiated_dated326f}= useContext(TotalContext) as TotalContextProps;
  const {completed_dateb46ea, setcompleted_dateb46ea}= useContext(TotalContext) as TotalContextProps;
  const {result428b3, setresult428b3}= useContext(TotalContext) as TotalContextProps;
  const {verification_status34423, setverification_status34423}= useContext(TotalContext) as TotalContextProps;
  const {view_btn75e2e, setview_btn75e2e}= useContext(TotalContext) as TotalContextProps;
  const {edit_btnd5238, setedit_btnd5238}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnd268c, setdelete_btnd268c}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_doc1691b, setbt_add_doc1691b}= useContext(TotalContext) as TotalContextProps;
  const {button_updated6240, setbutton_updated6240}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358, setdynamicactionsa8358}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358Props, setdynamicactionsa8358Props}= useContext(TotalContext) as TotalContextProps;
  const {savec5b7c, setsavec5b7c}= useContext(TotalContext) as TotalContextProps;
  const {newemployees_v1Props, setnewemployees_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_group42d78, setnew_employee_group42d78}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_group42d78Props, setnew_employee_group42d78Props}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fd, setbasic_details_groupd39fd}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fdProps, setbasic_details_groupd39fdProps}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911, setcontact_details_groupa1911}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911Props, setcontact_details_groupa1911Props}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4, setaddress_details_groupb72f4}= useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4Props, setaddress_details_groupb72f4Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6fe, setidentity_details_group6a6fe}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6feProps, setidentity_details_group6a6feProps}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6, setemployment_details_group89cd6}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6Props, setemployment_details_group89cd6Props}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cd, setbank_details820cd}= useContext(TotalContext) as TotalContextProps;
  const {bank_details820cdProps, setbank_details820cdProps}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988, setemergency_contact_group73988}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988Props, setemergency_contact_group73988Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1, setcompensation_details_groupf9ef1}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1Props, setcompensation_details_groupf9ef1Props}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89a, setskill9f89a}= useContext(TotalContext) as TotalContextProps;
  const {skill9f89aProps, setskill9f89aProps}= useContext(TotalContext) as TotalContextProps;
  const {education2393a, seteducation2393a}= useContext(TotalContext) as TotalContextProps;
  const {education2393aProps, seteducation2393aProps}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06, setcertificationc7d06}= useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06Props, setcertificationc7d06Props}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea}= useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06eaProps, setfamly_detailsb06eaProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_employees_group'] = total_employees_group455f5,
      codeStates['settotal_employees_group'] = settotal_employees_group455f5,
      codeStates['total_employees_group455f5'] = total_employees_group455f5Props,
      codeStates['settotal_employees_group455f5'] = settotal_employees_group455f5Props,
      codeStates['emp_group'] = emp_groupe44b7,
      codeStates['setemp_group'] = setemp_groupe44b7,
      codeStates['emp_groupe44b7'] = emp_groupe44b7Props,
      codeStates['setemp_groupe44b7'] = setemp_groupe44b7Props,
      codeStates['total_employees_table'] = total_employees_table379da,
      codeStates['settotal_employees_table'] = settotal_employees_table379da,
      codeStates['total_employees_table379da'] = total_employees_table379daProps,
      codeStates['settotal_employees_table379da'] = settotal_employees_table379daProps,
      codeStates['check_id'] = check_idc0499,
      codeStates['setcheck_id'] = setcheck_idc0499,
      codeStates['full_name'] = full_name8459f,
      codeStates['setfull_name'] = setfull_name8459f,
      codeStates['check_type'] = check_type67f55,
      codeStates['setcheck_type'] = setcheck_type67f55,
      codeStates['initiated_date'] = initiated_dated326f,
      codeStates['setinitiated_date'] = setinitiated_dated326f,
      codeStates['completed_date'] = completed_dateb46ea,
      codeStates['setcompleted_date'] = setcompleted_dateb46ea,
      codeStates['result'] = result428b3,
      codeStates['setresult'] = setresult428b3,
      codeStates['verification_status'] = verification_status34423,
      codeStates['setverification_status'] = setverification_status34423,
      codeStates['view_btn'] = view_btn75e2e,
      codeStates['setview_btn'] = setview_btn75e2e,
      codeStates['edit_btn'] = edit_btnd5238,
      codeStates['setedit_btn'] = setedit_btnd5238,
      codeStates['delete_btn'] = delete_btnd268c,
      codeStates['setdelete_btn'] = setdelete_btnd268c,
      codeStates['bt_add_doc'] = bt_add_doc1691b,
      codeStates['setbt_add_doc'] = setbt_add_doc1691b,
      codeStates['button_update'] = button_updated6240,
      codeStates['setbutton_update'] = setbutton_updated6240,
      codeStates['dynamicactions'] = dynamicactionsa8358,
      codeStates['setdynamicactions'] = setdynamicactionsa8358,
      codeStates['dynamicactionsa8358'] = dynamicactionsa8358Props,
      codeStates['setdynamicactionsa8358'] = setdynamicactionsa8358Props,
      codeStates['save'] = savec5b7c,
      codeStates['setsave'] = setsavec5b7c,
      codeStates['newemployees_v1'] = newemployees_v1Props,
      codeStates['setnewemployees_v1'] = setnewemployees_v1Props,
      codeStates['new_employee_group'] = new_employee_group42d78,
      codeStates['setnew_employee_group'] = setnew_employee_group42d78,
      codeStates['new_employee_group42d78'] = new_employee_group42d78Props,
      codeStates['setnew_employee_group42d78'] = setnew_employee_group42d78Props,
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
      codeStates['identity_details_group'] = identity_details_group6a6fe,
      codeStates['setidentity_details_group'] = setidentity_details_group6a6fe,
      codeStates['identity_details_group6a6fe'] = identity_details_group6a6feProps,
      codeStates['setidentity_details_group6a6fe'] = setidentity_details_group6a6feProps,
      codeStates['employment_details_group'] = employment_details_group89cd6,
      codeStates['setemployment_details_group'] = setemployment_details_group89cd6,
      codeStates['employment_details_group89cd6'] = employment_details_group89cd6Props,
      codeStates['setemployment_details_group89cd6'] = setemployment_details_group89cd6Props,
      codeStates['bank_details'] = bank_details820cd,
      codeStates['setbank_details'] = setbank_details820cd,
      codeStates['bank_details820cd'] = bank_details820cdProps,
      codeStates['setbank_details820cd'] = setbank_details820cdProps,
      codeStates['emergency_contact_group'] = emergency_contact_group73988,
      codeStates['setemergency_contact_group'] = setemergency_contact_group73988,
      codeStates['emergency_contact_group73988'] = emergency_contact_group73988Props,
      codeStates['setemergency_contact_group73988'] = setemergency_contact_group73988Props,
      codeStates['compensation_details_group'] = compensation_details_groupf9ef1,
      codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1,
      codeStates['compensation_details_groupf9ef1'] = compensation_details_groupf9ef1Props,
      codeStates['setcompensation_details_groupf9ef1'] = setcompensation_details_groupf9ef1Props,
      codeStates['skill'] = skill9f89a,
      codeStates['setskill'] = setskill9f89a,
      codeStates['skill9f89a'] = skill9f89aProps,
      codeStates['setskill9f89a'] = setskill9f89aProps,
      codeStates['education'] = education2393a,
      codeStates['seteducation'] = seteducation2393a,
      codeStates['education2393a'] = education2393aProps,
      codeStates['seteducation2393a'] = seteducation2393aProps,
      codeStates['certification'] = certificationc7d06,
      codeStates['setcertification'] = setcertificationc7d06,
      codeStates['certificationc7d06'] = certificationc7d06Props,
      codeStates['setcertificationc7d06'] = setcertificationc7d06Props,
      codeStates['famly_details'] = famly_detailsb06ea,
      codeStates['setfamly_details'] = setfamly_detailsb06ea,
      codeStates['famly_detailsb06ea'] = famly_detailsb06eaProps,
      codeStates['setfamly_detailsb06ea'] = setfamly_detailsb06eaProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "33564afe78fbb2cdfc338e23720379da",
        "ce6a9590d18d4e63b9cbee7c982d5238"
      );
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
      setPaginationData((pre: any) => ({
      ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 1,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 1000
    }))
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "edit_btnd5238") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[edit_btnd5238?.refresh])


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

  const handleClick=async()=>{
    try{  
      setIsProcessing(true);
      await delay(1000);
        //onClick

    //enableElement
    setbutton_updated6240((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsavec5b7c((prev: any) => ({ ...prev, isDisabled: true }));
    // showArtifact
    let filterProps6: any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "73c2a20a785b4361a729fb7c45a12258",
        "object": {
          "properties.employee_id": "460b0720818bd3d4011aab9e130c0499"
        }
      }
    ]
  }
];
    let filterData6 = await getFilterProps(filterProps6,mainData);
    setnewemployees_v1Props([...filterData6 ]);
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1', 'newemployees_v1'));
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,new_employee_group42d78Props?.controls);
    setnew_employee_group42d78(bindData8||{})
    setnew_employee_group42d78Props({...new_employee_group42d78Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,basic_details_groupd39fdProps?.controls);
    setbasic_details_groupd39fd(bindData10||{})
    setbasic_details_groupd39fdProps({...basic_details_groupd39fdProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,contact_details_groupa1911Props?.controls);
    setcontact_details_groupa1911(bindData12||{})
    setcontact_details_groupa1911Props({...contact_details_groupa1911Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,address_details_groupb72f4Props?.controls);
    setaddress_details_groupb72f4(bindData14||{})
    setaddress_details_groupb72f4Props({...address_details_groupb72f4Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,identity_details_group6a6feProps?.controls);
    setidentity_details_group6a6fe(bindData16||{})
    setidentity_details_group6a6feProps({...identity_details_group6a6feProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,employment_details_group89cd6Props?.controls);
    setemployment_details_group89cd6(bindData18||{})
    setemployment_details_group89cd6Props({...employment_details_group89cd6Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,bank_details820cdProps?.controls);
    setbank_details820cd(bindData20||{})
    setbank_details820cdProps({...bank_details820cdProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,emergency_contact_group73988Props?.controls);
    setemergency_contact_group73988(bindData22||{})
    setemergency_contact_group73988Props({...emergency_contact_group73988Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,compensation_details_groupf9ef1Props?.controls);
    setcompensation_details_groupf9ef1(bindData24||{})
    setcompensation_details_groupf9ef1Props({...compensation_details_groupf9ef1Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,skill9f89aProps?.controls);
    setskill9f89a(bindData26||{})
    setskill9f89aProps({...skill9f89aProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData28 = filterByKeys(mainData,education2393aProps?.controls);
    seteducation2393a(bindData28||{})
    seteducation2393aProps({...education2393aProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData30 = filterByKeys(mainData,certificationc7d06Props?.controls);
    setcertificationc7d06(bindData30||{})
    setcertificationc7d06Props({...certificationc7d06Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData32 = filterByKeys(mainData,famly_detailsb06eaProps?.controls);
    setfamly_detailsb06ea(bindData32||{})
    setfamly_detailsb06eaProps({...famly_detailsb06eaProps,presetValues:mainData||{}})  
      await handleCustomCode();
    }catch (err: any) {
      setIsProcessing(false);
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }finally{
      setIsProcessing(false);
    }
  }
    async function handleConfirmOnClick(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    } 


    async function handleConfirmOnCancel(){
      try{
        //confirmMsg
      }catch(err){
        toast(err, 'danger');
      }
    }

 if (edit_btnd5238?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1','backgroundcheck','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btnd5238?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdModeEdit"
          iconDisplay='Start with Icon'
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonedit_btn

