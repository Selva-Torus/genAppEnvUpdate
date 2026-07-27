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
import PageNewaccessrequestpage2 from '@/app/newaccessrequest_v1/newaccessrequest_v1page';
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
 

const Buttonedit_button = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {access_req_group1e80d, setaccess_req_group1e80d}= useContext(TotalContext) as TotalContextProps;
  const {access_req_group1e80dProps, setaccess_req_group1e80dProps}= useContext(TotalContext) as TotalContextProps;
  const {group26b23, setgroup26b23}= useContext(TotalContext) as TotalContextProps;
  const {group26b23Props, setgroup26b23Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_table3ced6, setaccess_req_table3ced6}= useContext(TotalContext) as TotalContextProps;
  const {access_req_table3ced6Props, setaccess_req_table3ced6Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req_id2d6a6, setaccess_req_id2d6a6}= useContext(TotalContext) as TotalContextProps;
  const {request_numberf227b, setrequest_numberf227b}= useContext(TotalContext) as TotalContextProps;
  const {full_named3fe3, setfull_named3fe3}= useContext(TotalContext) as TotalContextProps;
  const {system_name75ec8, setsystem_name75ec8}= useContext(TotalContext) as TotalContextProps;
  const {request_typeb69fc, setrequest_typeb69fc}= useContext(TotalContext) as TotalContextProps;
  const {access_role10fe1, setaccess_role10fe1}= useContext(TotalContext) as TotalContextProps;
  const {request_priorityacf12, setrequest_priorityacf12}= useContext(TotalContext) as TotalContextProps;
  const {risk_leveld8c37, setrisk_leveld8c37}= useContext(TotalContext) as TotalContextProps;
  const {statusa6dfb, setstatusa6dfb}= useContext(TotalContext) as TotalContextProps;
  const {view12159, setview12159}= useContext(TotalContext) as TotalContextProps;
  const {edit_button0da58, setedit_button0da58}= useContext(TotalContext) as TotalContextProps;
  const {delete_button2035f, setdelete_button2035f}= useContext(TotalContext) as TotalContextProps;
  const {attach_buttone9e89, setattach_buttone9e89}= useContext(TotalContext) as TotalContextProps;
  const {approve_button27195, setapprove_button27195}= useContext(TotalContext) as TotalContextProps;
  const {newaccessrequest_v1Props, setnewaccessrequest_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {button_updated86f7, setbutton_updated86f7}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8, setdynamicactions820e8}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions820e8Props, setdynamicactions820e8Props}= useContext(TotalContext) as TotalContextProps;
  const {save64168, setsave64168}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group1e8f3, setnew_access_group1e8f3}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group1e8f3Props, setnew_access_group1e8f3Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221, setaccess_req__group3a221}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group3a221Props, setaccess_req__group3a221Props}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edc, setbusiness_just__group75edc}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group75edcProps, setbusiness_just__group75edcProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21c, setvalid_groupec21c}= useContext(TotalContext) as TotalContextProps;
  const {valid_groupec21cProps, setvalid_groupec21cProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43d, setapp_inf_groupea43d}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_groupea43dProps, setapp_inf_groupea43dProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2, setprovision_group4e2a2}= useContext(TotalContext) as TotalContextProps;
  const {provision_group4e2a2Props, setprovision_group4e2a2Props}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4eb, setprov_group3b4eb}= useContext(TotalContext) as TotalContextProps;
  const {prov_group3b4ebProps, setprov_group3b4ebProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044, setrevocation_groupc3044}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupc3044Props, setrevocation_groupc3044Props}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87, setrev_groupa6a87}= useContext(TotalContext) as TotalContextProps;
  const {rev_groupa6a87Props, setrev_groupa6a87Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3, setaudit_groupc16c3}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupc16c3Props, setaudit_groupc16c3Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['access_req_group'] = access_req_group1e80d,
      codeStates['setaccess_req_group'] = setaccess_req_group1e80d,
      codeStates['access_req_group1e80d'] = access_req_group1e80dProps,
      codeStates['setaccess_req_group1e80d'] = setaccess_req_group1e80dProps,
      codeStates['group'] = group26b23,
      codeStates['setgroup'] = setgroup26b23,
      codeStates['group26b23'] = group26b23Props,
      codeStates['setgroup26b23'] = setgroup26b23Props,
      codeStates['access_req_table'] = access_req_table3ced6,
      codeStates['setaccess_req_table'] = setaccess_req_table3ced6,
      codeStates['access_req_table3ced6'] = access_req_table3ced6Props,
      codeStates['setaccess_req_table3ced6'] = setaccess_req_table3ced6Props,
      codeStates['access_req_id'] = access_req_id2d6a6,
      codeStates['setaccess_req_id'] = setaccess_req_id2d6a6,
      codeStates['request_number'] = request_numberf227b,
      codeStates['setrequest_number'] = setrequest_numberf227b,
      codeStates['full_name'] = full_named3fe3,
      codeStates['setfull_name'] = setfull_named3fe3,
      codeStates['system_name'] = system_name75ec8,
      codeStates['setsystem_name'] = setsystem_name75ec8,
      codeStates['request_type'] = request_typeb69fc,
      codeStates['setrequest_type'] = setrequest_typeb69fc,
      codeStates['access_role'] = access_role10fe1,
      codeStates['setaccess_role'] = setaccess_role10fe1,
      codeStates['request_priority'] = request_priorityacf12,
      codeStates['setrequest_priority'] = setrequest_priorityacf12,
      codeStates['risk_level'] = risk_leveld8c37,
      codeStates['setrisk_level'] = setrisk_leveld8c37,
      codeStates['status'] = statusa6dfb,
      codeStates['setstatus'] = setstatusa6dfb,
      codeStates['view'] = view12159,
      codeStates['setview'] = setview12159,
      codeStates['edit_button'] = edit_button0da58,
      codeStates['setedit_button'] = setedit_button0da58,
      codeStates['delete_button'] = delete_button2035f,
      codeStates['setdelete_button'] = setdelete_button2035f,
      codeStates['attach_button'] = attach_buttone9e89,
      codeStates['setattach_button'] = setattach_buttone9e89,
      codeStates['approve_button'] = approve_button27195,
      codeStates['setapprove_button'] = setapprove_button27195,
      codeStates['newaccessrequest_v1'] = newaccessrequest_v1Props,
      codeStates['setnewaccessrequest_v1'] = setnewaccessrequest_v1Props,
      codeStates['button_update'] = button_updated86f7,
      codeStates['setbutton_update'] = setbutton_updated86f7,
      codeStates['dynamicactions'] = dynamicactions820e8,
      codeStates['setdynamicactions'] = setdynamicactions820e8,
      codeStates['dynamicactions820e8'] = dynamicactions820e8Props,
      codeStates['setdynamicactions820e8'] = setdynamicactions820e8Props,
      codeStates['save'] = save64168,
      codeStates['setsave'] = setsave64168,
      codeStates['new_access_group'] = new_access_group1e8f3,
      codeStates['setnew_access_group'] = setnew_access_group1e8f3,
      codeStates['new_access_group1e8f3'] = new_access_group1e8f3Props,
      codeStates['setnew_access_group1e8f3'] = setnew_access_group1e8f3Props,
      codeStates['access_req__group'] = access_req__group3a221,
      codeStates['setaccess_req__group'] = setaccess_req__group3a221,
      codeStates['access_req__group3a221'] = access_req__group3a221Props,
      codeStates['setaccess_req__group3a221'] = setaccess_req__group3a221Props,
      codeStates['business_just__group'] = business_just__group75edc,
      codeStates['setbusiness_just__group'] = setbusiness_just__group75edc,
      codeStates['business_just__group75edc'] = business_just__group75edcProps,
      codeStates['setbusiness_just__group75edc'] = setbusiness_just__group75edcProps,
      codeStates['valid_group'] = valid_groupec21c,
      codeStates['setvalid_group'] = setvalid_groupec21c,
      codeStates['valid_groupec21c'] = valid_groupec21cProps,
      codeStates['setvalid_groupec21c'] = setvalid_groupec21cProps,
      codeStates['app_inf_group'] = app_inf_groupea43d,
      codeStates['setapp_inf_group'] = setapp_inf_groupea43d,
      codeStates['app_inf_groupea43d'] = app_inf_groupea43dProps,
      codeStates['setapp_inf_groupea43d'] = setapp_inf_groupea43dProps,
      codeStates['provision_group'] = provision_group4e2a2,
      codeStates['setprovision_group'] = setprovision_group4e2a2,
      codeStates['provision_group4e2a2'] = provision_group4e2a2Props,
      codeStates['setprovision_group4e2a2'] = setprovision_group4e2a2Props,
      codeStates['prov_group'] = prov_group3b4eb,
      codeStates['setprov_group'] = setprov_group3b4eb,
      codeStates['prov_group3b4eb'] = prov_group3b4ebProps,
      codeStates['setprov_group3b4eb'] = setprov_group3b4ebProps,
      codeStates['revocation_group'] = revocation_groupc3044,
      codeStates['setrevocation_group'] = setrevocation_groupc3044,
      codeStates['revocation_groupc3044'] = revocation_groupc3044Props,
      codeStates['setrevocation_groupc3044'] = setrevocation_groupc3044Props,
      codeStates['rev_group'] = rev_groupa6a87,
      codeStates['setrev_group'] = setrev_groupa6a87,
      codeStates['rev_groupa6a87'] = rev_groupa6a87Props,
      codeStates['setrev_groupa6a87'] = setrev_groupa6a87Props,
      codeStates['audit_group'] = audit_groupc16c3,
      codeStates['setaudit_group'] = setaudit_groupc16c3,
      codeStates['audit_groupc16c3'] = audit_groupc16c3Props,
      codeStates['setaudit_groupc16c3'] = setaudit_groupc16c3Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "6b7c6238e3f84271b65c7f36e733ced6",
        "b6efdf49aa3c4798b22de647d840da58"
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
      if (id === "edit_button0da58") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_button0da58?.refresh])


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

    // showArtifactAsModal
    let filterProps2:any =  [];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setnewaccessrequest_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //enableElement
    setbutton_updated86f7((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setsave64168((prev: any) => ({ ...prev, isDisabled: true }));
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,new_access_group1e8f3Props?.controls);
    setnew_access_group1e8f3(bindData8||{})
    setnew_access_group1e8f3Props({...new_access_group1e8f3Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,access_req__group3a221Props?.controls);
    setaccess_req__group3a221(bindData10||{})
    setaccess_req__group3a221Props({...access_req__group3a221Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,business_just__group75edcProps?.controls);
    setbusiness_just__group75edc(bindData12||{})
    setbusiness_just__group75edcProps({...business_just__group75edcProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,valid_groupec21cProps?.controls);
    setvalid_groupec21c(bindData14||{})
    setvalid_groupec21cProps({...valid_groupec21cProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,app_inf_groupea43dProps?.controls);
    setapp_inf_groupea43d(bindData16||{})
    setapp_inf_groupea43dProps({...app_inf_groupea43dProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,provision_group4e2a2Props?.controls);
    setprovision_group4e2a2(bindData18||{})
    setprovision_group4e2a2Props({...provision_group4e2a2Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,prov_group3b4ebProps?.controls);
    setprov_group3b4eb(bindData20||{})
    setprov_group3b4ebProps({...prov_group3b4ebProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,revocation_groupc3044Props?.controls);
    setrevocation_groupc3044(bindData22||{})
    setrevocation_groupc3044Props({...revocation_groupc3044Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,rev_groupa6a87Props?.controls);
    setrev_groupa6a87(bindData24||{})
    setrev_groupa6a87Props({...rev_groupa6a87Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData26 = filterByKeys(mainData,audit_groupc16c3Props?.controls);
    setaudit_groupc16c3(bindData26||{})
    setaudit_groupc16c3Props({...audit_groupc16c3Props,presetValues:mainData||{}})  
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

 if (edit_button0da58?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1','accessrequest','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Edit Access Request"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "newaccessrequest"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageNewaccessrequestpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {edit_button0da58?.isDisabled ? true : false}
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

export default Buttonedit_button

