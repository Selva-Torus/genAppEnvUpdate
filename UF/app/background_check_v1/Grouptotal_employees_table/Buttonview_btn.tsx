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
 

const Buttonview_btn = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const {viewnewemployees_v1Props, setviewnewemployees_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_groupdf01f, setnew_employee_groupdf01f}= useContext(TotalContext) as TotalContextProps;
  const {new_employee_groupdf01fProps, setnew_employee_groupdf01fProps}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupe03ea, setbasic_details_groupe03ea}= useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupe03eaProps, setbasic_details_groupe03eaProps}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_group3ff3d, setcontact_details_group3ff3d}= useContext(TotalContext) as TotalContextProps;
  const {contact_details_group3ff3dProps, setcontact_details_group3ff3dProps}= useContext(TotalContext) as TotalContextProps;
  const {address_details_group75e08, setaddress_details_group75e08}= useContext(TotalContext) as TotalContextProps;
  const {address_details_group75e08Props, setaddress_details_group75e08Props}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group20918, setidentity_details_group20918}= useContext(TotalContext) as TotalContextProps;
  const {identity_details_group20918Props, setidentity_details_group20918Props}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group2c703, setemployment_details_group2c703}= useContext(TotalContext) as TotalContextProps;
  const {employment_details_group2c703Props, setemployment_details_group2c703Props}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_group83106, setcompensation_details_group83106}= useContext(TotalContext) as TotalContextProps;
  const {compensation_details_group83106Props, setcompensation_details_group83106Props}= useContext(TotalContext) as TotalContextProps;
  const {bank_detailsf21b7, setbank_detailsf21b7}= useContext(TotalContext) as TotalContextProps;
  const {bank_detailsf21b7Props, setbank_detailsf21b7Props}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_groupd1907, setemergency_contact_groupd1907}= useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_groupd1907Props, setemergency_contact_groupd1907Props}= useContext(TotalContext) as TotalContextProps;
  const {skills_group92cc8, setskills_group92cc8}= useContext(TotalContext) as TotalContextProps;
  const {skills_group92cc8Props, setskills_group92cc8Props}= useContext(TotalContext) as TotalContextProps;
  const {education_groupcd288, seteducation_groupcd288}= useContext(TotalContext) as TotalContextProps;
  const {education_groupcd288Props, seteducation_groupcd288Props}= useContext(TotalContext) as TotalContextProps;
  const {cert_group3be86, setcert_group3be86}= useContext(TotalContext) as TotalContextProps;
  const {cert_group3be86Props, setcert_group3be86Props}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group496b3, setfamily_detail_group496b3}= useContext(TotalContext) as TotalContextProps;
  const {family_detail_group496b3Props, setfamily_detail_group496b3Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['viewnewemployees_v1'] = viewnewemployees_v1Props,
      codeStates['setviewnewemployees_v1'] = setviewnewemployees_v1Props,
      codeStates['new_employee_group'] = new_employee_groupdf01f,
      codeStates['setnew_employee_group'] = setnew_employee_groupdf01f,
      codeStates['new_employee_groupdf01f'] = new_employee_groupdf01fProps,
      codeStates['setnew_employee_groupdf01f'] = setnew_employee_groupdf01fProps,
      codeStates['basic_details_group'] = basic_details_groupe03ea,
      codeStates['setbasic_details_group'] = setbasic_details_groupe03ea,
      codeStates['basic_details_groupe03ea'] = basic_details_groupe03eaProps,
      codeStates['setbasic_details_groupe03ea'] = setbasic_details_groupe03eaProps,
      codeStates['contact_details_group'] = contact_details_group3ff3d,
      codeStates['setcontact_details_group'] = setcontact_details_group3ff3d,
      codeStates['contact_details_group3ff3d'] = contact_details_group3ff3dProps,
      codeStates['setcontact_details_group3ff3d'] = setcontact_details_group3ff3dProps,
      codeStates['address_details_group'] = address_details_group75e08,
      codeStates['setaddress_details_group'] = setaddress_details_group75e08,
      codeStates['address_details_group75e08'] = address_details_group75e08Props,
      codeStates['setaddress_details_group75e08'] = setaddress_details_group75e08Props,
      codeStates['identity_details_group'] = identity_details_group20918,
      codeStates['setidentity_details_group'] = setidentity_details_group20918,
      codeStates['identity_details_group20918'] = identity_details_group20918Props,
      codeStates['setidentity_details_group20918'] = setidentity_details_group20918Props,
      codeStates['employment_details_group'] = employment_details_group2c703,
      codeStates['setemployment_details_group'] = setemployment_details_group2c703,
      codeStates['employment_details_group2c703'] = employment_details_group2c703Props,
      codeStates['setemployment_details_group2c703'] = setemployment_details_group2c703Props,
      codeStates['compensation_details_group'] = compensation_details_group83106,
      codeStates['setcompensation_details_group'] = setcompensation_details_group83106,
      codeStates['compensation_details_group83106'] = compensation_details_group83106Props,
      codeStates['setcompensation_details_group83106'] = setcompensation_details_group83106Props,
      codeStates['bank_details'] = bank_detailsf21b7,
      codeStates['setbank_details'] = setbank_detailsf21b7,
      codeStates['bank_detailsf21b7'] = bank_detailsf21b7Props,
      codeStates['setbank_detailsf21b7'] = setbank_detailsf21b7Props,
      codeStates['emergency_contact_group'] = emergency_contact_groupd1907,
      codeStates['setemergency_contact_group'] = setemergency_contact_groupd1907,
      codeStates['emergency_contact_groupd1907'] = emergency_contact_groupd1907Props,
      codeStates['setemergency_contact_groupd1907'] = setemergency_contact_groupd1907Props,
      codeStates['skills_group'] = skills_group92cc8,
      codeStates['setskills_group'] = setskills_group92cc8,
      codeStates['skills_group92cc8'] = skills_group92cc8Props,
      codeStates['setskills_group92cc8'] = setskills_group92cc8Props,
      codeStates['education_group'] = education_groupcd288,
      codeStates['seteducation_group'] = seteducation_groupcd288,
      codeStates['education_groupcd288'] = education_groupcd288Props,
      codeStates['seteducation_groupcd288'] = seteducation_groupcd288Props,
      codeStates['cert_group'] = cert_group3be86,
      codeStates['setcert_group'] = setcert_group3be86,
      codeStates['cert_group3be86'] = cert_group3be86Props,
      codeStates['setcert_group3be86'] = setcert_group3be86Props,
      codeStates['family_detail_group'] = family_detail_group496b3,
      codeStates['setfamily_detail_group'] = setfamily_detail_group496b3,
      codeStates['family_detail_group496b3'] = family_detail_group496b3Props,
      codeStates['setfamily_detail_group496b3'] = setfamily_detail_group496b3Props,
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
        "ff5c2423ab3b2a469a17c143ca975e2e"
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
      if (id === "view_btn75e2e") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
  },[view_btn75e2e?.refresh])


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

    // showArtifact
    let filterProps2: any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setviewnewemployees_v1Props([...filterData2 ]);
    routes.push(getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewNewEmployees:AFVK:v1', 'viewnewemployees_v1'));
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,new_employee_groupdf01fProps?.controls);
    setnew_employee_groupdf01f(bindData4||{})
    setnew_employee_groupdf01fProps({...new_employee_groupdf01fProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,basic_details_groupe03eaProps?.controls);
    setbasic_details_groupe03ea(bindData6||{})
    setbasic_details_groupe03eaProps({...basic_details_groupe03eaProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,contact_details_group3ff3dProps?.controls);
    setcontact_details_group3ff3d(bindData8||{})
    setcontact_details_group3ff3dProps({...contact_details_group3ff3dProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,address_details_group75e08Props?.controls);
    setaddress_details_group75e08(bindData10||{})
    setaddress_details_group75e08Props({...address_details_group75e08Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,identity_details_group20918Props?.controls);
    setidentity_details_group20918(bindData12||{})
    setidentity_details_group20918Props({...identity_details_group20918Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,compensation_details_group83106Props?.controls);
    setcompensation_details_group83106(bindData16||{})
    setcompensation_details_group83106Props({...compensation_details_group83106Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,bank_detailsf21b7Props?.controls);
    setbank_detailsf21b7(bindData18||{})
    setbank_detailsf21b7Props({...bank_detailsf21b7Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,emergency_contact_groupd1907Props?.controls);
    setemergency_contact_groupd1907(bindData20||{})
    setemergency_contact_groupd1907Props({...emergency_contact_groupd1907Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,skills_group92cc8Props?.controls);
    setskills_group92cc8(bindData22||{})
    setskills_group92cc8Props({...skills_group92cc8Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,education_groupcd288Props?.controls);
    seteducation_groupcd288(bindData24||{})
    seteducation_groupcd288Props({...education_groupcd288Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,cert_group3be86Props?.controls);
    setcert_group3be86(bindData26||{})
    setcert_group3be86Props({...cert_group3be86Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData28 = filterByKeys(mainData,family_detail_group496b3Props?.controls);
    setfamily_detail_group496b3(bindData28||{})
    setfamily_detail_group496b3Props({...family_detail_group496b3Props,presetValues:mainData||{}})  
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

 if (view_btn75e2e?.isHidden) {
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
          disabled= {view_btn75e2e?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdRemoveRedEye"
          iconDisplay='Start with Icon'
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview_btn

