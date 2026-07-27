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
import PageViewaccessrequestpage2 from '@/app/viewaccessrequest_v1/viewaccessrequest_v1page';
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
 

const Buttonview = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const {viewaccessrequest_v1Props, setviewaccessrequest_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group99475, setnew_access_group99475}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group99475Props, setnew_access_group99475Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cf, setaccess_req__group580cf}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group580cfProps, setaccess_req__group580cfProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68d, setbusiness_just__group2c68d}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2c68dProps, setbusiness_just__group2c68dProps}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83b, setvalid_group6c83b}= useContext(TotalContext) as TotalContextProps;
  const {valid_group6c83bProps, setvalid_group6c83bProps}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5c, setapp_inf_group5ad5c}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group5ad5cProps, setapp_inf_group5ad5cProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166a, setprovision_groupe166a}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupe166aProps, setprovision_groupe166aProps}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05f, setprov_groupce05f}= useContext(TotalContext) as TotalContextProps;
  const {prov_groupce05fProps, setprov_groupce05fProps}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08, setrevocation_groupbee08}= useContext(TotalContext) as TotalContextProps;
  const {revocation_groupbee08Props, setrevocation_groupbee08Props}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6a, setaudit_groupdea6a}= useContext(TotalContext) as TotalContextProps;
  const {audit_groupdea6aProps, setaudit_groupdea6aProps}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92, setrev_group1cf92}= useContext(TotalContext) as TotalContextProps;
  const {rev_group1cf92Props, setrev_group1cf92Props}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['viewaccessrequest_v1'] = viewaccessrequest_v1Props,
      codeStates['setviewaccessrequest_v1'] = setviewaccessrequest_v1Props,
      codeStates['new_access_group'] = new_access_group99475,
      codeStates['setnew_access_group'] = setnew_access_group99475,
      codeStates['new_access_group99475'] = new_access_group99475Props,
      codeStates['setnew_access_group99475'] = setnew_access_group99475Props,
      codeStates['access_req__group'] = access_req__group580cf,
      codeStates['setaccess_req__group'] = setaccess_req__group580cf,
      codeStates['access_req__group580cf'] = access_req__group580cfProps,
      codeStates['setaccess_req__group580cf'] = setaccess_req__group580cfProps,
      codeStates['business_just__group'] = business_just__group2c68d,
      codeStates['setbusiness_just__group'] = setbusiness_just__group2c68d,
      codeStates['business_just__group2c68d'] = business_just__group2c68dProps,
      codeStates['setbusiness_just__group2c68d'] = setbusiness_just__group2c68dProps,
      codeStates['valid_group'] = valid_group6c83b,
      codeStates['setvalid_group'] = setvalid_group6c83b,
      codeStates['valid_group6c83b'] = valid_group6c83bProps,
      codeStates['setvalid_group6c83b'] = setvalid_group6c83bProps,
      codeStates['app_inf_group'] = app_inf_group5ad5c,
      codeStates['setapp_inf_group'] = setapp_inf_group5ad5c,
      codeStates['app_inf_group5ad5c'] = app_inf_group5ad5cProps,
      codeStates['setapp_inf_group5ad5c'] = setapp_inf_group5ad5cProps,
      codeStates['provision_group'] = provision_groupe166a,
      codeStates['setprovision_group'] = setprovision_groupe166a,
      codeStates['provision_groupe166a'] = provision_groupe166aProps,
      codeStates['setprovision_groupe166a'] = setprovision_groupe166aProps,
      codeStates['prov_group'] = prov_groupce05f,
      codeStates['setprov_group'] = setprov_groupce05f,
      codeStates['prov_groupce05f'] = prov_groupce05fProps,
      codeStates['setprov_groupce05f'] = setprov_groupce05fProps,
      codeStates['revocation_group'] = revocation_groupbee08,
      codeStates['setrevocation_group'] = setrevocation_groupbee08,
      codeStates['revocation_groupbee08'] = revocation_groupbee08Props,
      codeStates['setrevocation_groupbee08'] = setrevocation_groupbee08Props,
      codeStates['audit_group'] = audit_groupdea6a,
      codeStates['setaudit_group'] = setaudit_groupdea6a,
      codeStates['audit_groupdea6a'] = audit_groupdea6aProps,
      codeStates['setaudit_groupdea6a'] = setaudit_groupdea6aProps,
      codeStates['rev_group'] = rev_group1cf92,
      codeStates['setrev_group'] = setrev_group1cf92,
      codeStates['rev_group1cf92'] = rev_group1cf92Props,
      codeStates['setrev_group1cf92'] = setrev_group1cf92Props,
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
        "db0cdc374e734a0496c4501442312159"
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
      if (id === "view12159") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[view12159?.refresh])


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
    let filterProps2:any =  [
  {
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addAccessRequestModify:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "21d269e30ee840848c3f8d33112a6ffd",
        "object": {
          "properties.access_req_id": "c61da93761c34f6cb58ca67a0d92d6a6"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setviewaccessrequest_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,new_access_group99475Props?.controls);
    setnew_access_group99475(bindData4||{})
    setnew_access_group99475Props({...new_access_group99475Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,access_req__group580cfProps?.controls);
    setaccess_req__group580cf(bindData6||{})
    setaccess_req__group580cfProps({...access_req__group580cfProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,business_just__group2c68dProps?.controls);
    setbusiness_just__group2c68d(bindData8||{})
    setbusiness_just__group2c68dProps({...business_just__group2c68dProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,valid_group6c83bProps?.controls);
    setvalid_group6c83b(bindData10||{})
    setvalid_group6c83bProps({...valid_group6c83bProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,app_inf_group5ad5cProps?.controls);
    setapp_inf_group5ad5c(bindData12||{})
    setapp_inf_group5ad5cProps({...app_inf_group5ad5cProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,provision_groupe166aProps?.controls);
    setprovision_groupe166a(bindData14||{})
    setprovision_groupe166aProps({...provision_groupe166aProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData16 = filterByKeys(mainData,prov_groupce05fProps?.controls);
    setprov_groupce05f(bindData16||{})
    setprov_groupce05fProps({...prov_groupce05fProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData18 = filterByKeys(mainData,revocation_groupbee08Props?.controls);
    setrevocation_groupbee08(bindData18||{})
    setrevocation_groupbee08Props({...revocation_groupbee08Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData20 = filterByKeys(mainData,prov_groupce05fProps?.controls);
    setprov_groupce05f(bindData20||{})
    setprov_groupce05fProps({...prov_groupce05fProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData22 = filterByKeys(mainData,audit_groupdea6aProps?.controls);
    setaudit_groupdea6a(bindData22||{})
    setaudit_groupdea6aProps({...audit_groupdea6aProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData24 = filterByKeys(mainData,rev_group1cf92Props?.controls);
    setrev_group1cf92(bindData24||{})
    setrev_group1cf92Props({...rev_group1cf92Props,presetValues:mainData||{}})  
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

 if (view12159?.isHidden) {
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
        title="View Access Request"
        variant="header-1"
        showOverlay = {true}
        position = {"center"}
        modalName = "viewaccessrequest"
        className='w-[90%] h-[] bg-gray-50 overflow-auto'
      >
        <PageViewaccessrequestpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {view12159?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
          icon="MdOutlineRemoveRedEye"
          iconDisplay='Start with Icon'
        >
          {keyset("View")}
        </Button>}
      </div>
    
  )
}

export default Buttonview

