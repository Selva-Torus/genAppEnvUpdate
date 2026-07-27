

'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import UOmapperData from '@/context/dfdmapperContolnames.json'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Combobox } from '@/components/ComboBox';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import { getMapperDetailsDto,uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto, te_refreshDto } from '@/app/interfaces/interfaces';
import * as v from 'valibot';
import {commonSepareteDataFromTheObject, eventFunction } from '@/app/utils/eventFunction';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode,ActionDetails } from "@/types/global";
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

export default function ComboBoxfull_name({encryptionFlagCompData,setIsProcessing,controlData}:any) { 
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  let dfData:any;
  let dfdFlag:boolean = false;
  const toast:Function=useInfoMsg();
  const routes: AppRouterInstance = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [isRequredData,setIsRequredData]=useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [validate, setValidate]=useState<Record<string, any>>({})
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
    //validation
  let schemaArray = [] ;
    //showComponentAsPopup || showArtifactAsModal
 /////////////
   //another screen
  const {new_access_groupc501f, setnew_access_groupc501f}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc501fProps, setnew_access_groupc501fProps}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49, setaccess_req__group7ac49}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group7ac49Props, setaccess_req__group7ac49Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_req_details0272a, setleave_req_details0272a}= useContext(TotalContext) as TotalContextProps;
  const {leave_request_number77855, setleave_request_number77855}= useContext(TotalContext) as TotalContextProps;
  const {full_name9076a, setfull_name9076a}= useContext(TotalContext) as TotalContextProps;
  const {policy_nameab68b, setpolicy_nameab68b}= useContext(TotalContext) as TotalContextProps;
  const {leave_reason_category1f94d, setleave_reason_category1f94d}= useContext(TotalContext) as TotalContextProps;
  const {emergency_leave_checkbox8efe9, setemergency_leave_checkbox8efe9}= useContext(TotalContext) as TotalContextProps;
  const {start_date34ff8, setstart_date34ff8}= useContext(TotalContext) as TotalContextProps;
  const {end_date35399, setend_date35399}= useContext(TotalContext) as TotalContextProps;
  const {days_requested70ed8, setdays_requested70ed8}= useContext(TotalContext) as TotalContextProps;
  const {half_day_switch3bf69, sethalf_day_switch3bf69}= useContext(TotalContext) as TotalContextProps;
  const {half_day_sessioneee3c, sethalf_day_sessioneee3c}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178, setemp_avail_group11178}= useContext(TotalContext) as TotalContextProps;
  const {emp_avail_group11178Props, setemp_avail_group11178Props}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23, setleave_balance_group98e23}= useContext(TotalContext) as TotalContextProps;
  const {leave_balance_group98e23Props, setleave_balance_group98e23Props}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1b, setapp_det_groupe2c1b}= useContext(TotalContext) as TotalContextProps;
  const {app_det_groupe2c1bProps, setapp_det_groupe2c1bProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086e, setapprove_group4086e}= useContext(TotalContext) as TotalContextProps;
  const {approve_group4086eProps, setapprove_group4086eProps}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fd, setaudit_group087fd}= useContext(TotalContext) as TotalContextProps;
  const {audit_group087fdProps, setaudit_group087fdProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15, setdynamicactionsafd15}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsafd15Props, setdynamicactionsafd15Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [allCode, setAllCode] = React.useState<string>("");
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['new_access_group'] = new_access_groupc501f,
        codeStates['setnew_access_group'] = setnew_access_groupc501f,
        codeStates['new_access_groupc501f'] = new_access_groupc501fProps,
        codeStates['setnew_access_groupc501f'] = setnew_access_groupc501fProps,
        codeStates['access_req__group'] = access_req__group7ac49,
        codeStates['setaccess_req__group'] = setaccess_req__group7ac49,
        codeStates['access_req__group7ac49'] = access_req__group7ac49Props,
        codeStates['setaccess_req__group7ac49'] = setaccess_req__group7ac49Props,
        codeStates['leave_req_details'] = leave_req_details0272a,
        codeStates['setleave_req_details'] = setleave_req_details0272a,
        codeStates['leave_request_number'] = leave_request_number77855,
        codeStates['setleave_request_number'] = setleave_request_number77855,
        codeStates['full_name'] = full_name9076a,
        codeStates['setfull_name'] = setfull_name9076a,
        codeStates['policy_name'] = policy_nameab68b,
        codeStates['setpolicy_name'] = setpolicy_nameab68b,
        codeStates['leave_reason_category'] = leave_reason_category1f94d,
        codeStates['setleave_reason_category'] = setleave_reason_category1f94d,
        codeStates['emergency_leave_checkbox'] = emergency_leave_checkbox8efe9,
        codeStates['setemergency_leave_checkbox'] = setemergency_leave_checkbox8efe9,
        codeStates['start_date'] = start_date34ff8,
        codeStates['setstart_date'] = setstart_date34ff8,
        codeStates['end_date'] = end_date35399,
        codeStates['setend_date'] = setend_date35399,
        codeStates['days_requested'] = days_requested70ed8,
        codeStates['setdays_requested'] = setdays_requested70ed8,
        codeStates['half_day_switch'] = half_day_switch3bf69,
        codeStates['sethalf_day_switch'] = sethalf_day_switch3bf69,
        codeStates['half_day_session'] = half_day_sessioneee3c,
        codeStates['sethalf_day_session'] = sethalf_day_sessioneee3c,
        codeStates['emp_avail_group'] = emp_avail_group11178,
        codeStates['setemp_avail_group'] = setemp_avail_group11178,
        codeStates['emp_avail_group11178'] = emp_avail_group11178Props,
        codeStates['setemp_avail_group11178'] = setemp_avail_group11178Props,
        codeStates['leave_balance_group'] = leave_balance_group98e23,
        codeStates['setleave_balance_group'] = setleave_balance_group98e23,
        codeStates['leave_balance_group98e23'] = leave_balance_group98e23Props,
        codeStates['setleave_balance_group98e23'] = setleave_balance_group98e23Props,
        codeStates['app_det_group'] = app_det_groupe2c1b,
        codeStates['setapp_det_group'] = setapp_det_groupe2c1b,
        codeStates['app_det_groupe2c1b'] = app_det_groupe2c1bProps,
        codeStates['setapp_det_groupe2c1b'] = setapp_det_groupe2c1bProps,
        codeStates['approve_group'] = approve_group4086e,
        codeStates['setapprove_group'] = setapprove_group4086e,
        codeStates['approve_group4086e'] = approve_group4086eProps,
        codeStates['setapprove_group4086e'] = setapprove_group4086eProps,
        codeStates['audit_group'] = audit_group087fd,
        codeStates['setaudit_group'] = setaudit_group087fd,
        codeStates['audit_group087fd'] = audit_group087fdProps,
        codeStates['setaudit_group087fd'] = setaudit_group087fdProps,
        codeStates['dynamicactions'] = dynamicactionsafd15,
        codeStates['setdynamicactions'] = setdynamicactionsafd15,
        codeStates['dynamicactionsafd15'] = dynamicactionsafd15Props,
        codeStates['setdynamicactionsafd15'] = setdynamicactionsafd15Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }
  }
  const handleOrchestration=async()=>{
    try{
      const orchestrationData:any = getControlOrchestrationData(
        controlData,
        "e968590033094bbfaf1b81b7bf27ac49",
        "2c42f1ab3b54ac9c140f3572a8b9076a"
      );
      if(orchestrationData?.data?.error == true){      
        return
      }
      if (orchestrationData?.data) {
        setAllCode(orchestrationData?.data?.code)
        setPaginationData((pre: any) => ({
          ...pre,
          page: +orchestrationData?.data?.action?.pagination?.page || 0,
          pageSize: +orchestrationData?.data?.action?.pagination?.count || 0
        }))
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }
  useEffect(()=>{
    handleOrchestration()
  },[])
  const [eventFilterData,seteventFilterData]=useState({})
  const [dynamicDFDData,setDynamicDFDData]=useState<any>([])
  const prevRefreshRef = useRef(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const {dfd_employeenamecombo_v1Props, setdfd_employeenamecombo_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const getDropdownData = async(count?:any, page: number = 1,searchValue?:string,isFromEvent?:boolean,fromWhere?:string,eventFilterDataParam? : any)=>{
    let dstKey0:string = dfd_employeenamecombo_v1Props.dstKey;
    if (isFromEvent) {
      let paginationBody={}
      if(isFromEvent)
      {
        let temp="CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeNameCombo:AFVK:v1:"
        dstKey0=temp.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      }
      if(searchValue!=""||isFromEvent)
      {
        let getFromDataFilter = eventFilterDataParam ? eventFilterDataParam : eventFilterData
        let tempSearchFilter=nullFilter({full_name:searchValue,...getFromDataFilter})
        paginationBody= {key:dstKey0,
            page: page, 
            count: paginationData.pageSize,
            searchFilter:tempSearchFilter
          }
      }else
      {
          paginationBody= {key:dstKey0,
            page: page, 
            count: paginationData.pageSize,
          }
      }

      const api_paginationData:any = await AxiosService.post(
        '/UF/pagination',
        paginationBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const records:any = api_paginationData?.data?.records || [];
      if(fromWhere=="onScroll"&&records?.length==0)
        return
      else if(fromWhere=="onScroll")
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.full_name, item])).values()
        );
        setDynamicDFDData(unique)
        return
      }
      if(searchValue!=""||isFromEvent)
      {
        let temp:any = records
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.full_name, item])).values()
        );
        setDynamicDFDData(unique)
      }else
      {
        let temp:any = [...dynamicDFDData,...records]
        const unique = Array.from(
          new Map(temp.map((item:any) => [item.full_name, item])).values()
        );
        setDynamicDFDData(unique)
      }
    } else {
      if(prevRefreshRef.current==false) // prevent onload data get
        setDynamicDFDData(dfd_employeenamecombo_v1Props );
    }
  }
  const [selectedData,setselectedData]=useState("")
  const handleOnUpdate=async(data:any)=>{

    setaccess_req__group7ac49((pre:any)=>({...pre,full_name:data?.full_name}))
    setselectedData(data?.full_name)
  ///////////

    let selectedObj=dynamicDFDData?.find((items:any)=>(items?.full_name == data?.full_name && items?.full_name == data?.full_name)) || {};  
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
  const handleBlur = async (data:any="") => {
    //validation
    handleCustomCode()
  }

  const access_req__group7ac49Ref = useRef<any>(access_req__group7ac49);
  useEffect(() => { access_req__group7ac49Ref.current = access_req__group7ac49; }, [access_req__group7ac49]);
    useEffect(()=>{
        handleBlur()
      getDropdownData(10,1,"",true,"",{})
    const handler = (id:any) => {
      if (id === "2c42f1ab3b54ac9c140f3572a8b9076a") {
        handleOnUpdate({
          value:selectedData,
          text:access_req__group7ac49Ref?.current?.full_name||""
        });
      }
    };
    eventBus.on("triggerElement|onChange", handler);
    return () => {
      eventBus.off("triggerElement|onChange", handler);
    };
    },[])

  useEffect(()=>{
    if(access_req__group7ac49?.full_name=="")
    {
      setselectedData('')
    }else
    {

      let formBindedData:any=dynamicDFDData?.find((item:any)=>(item?.full_name==selectedData))?.full_name || access_req__group7ac49?.full_name;
      setselectedData(formBindedData)
    }
  },[access_req__group7ac49?.full_name])

  const [search, setSearch] = useState("");
return (
  <div 
    style={{
      gridColumn: `6 / 11`,
      gridRow: `7 / 19`, 
      gap:``,
      height: `100%`, 
      overflow: 'visible',
      display: 'flex',
      flexDirection: 'column'
 }} >
      <Combobox
      //style props
        className=""
        search={search}
        setSearch={setSearch}
        disabled= {full_name9076a?.isDisabled ? true : false}
        contentAlign={"center"}
        headerPosition='top'
        headerText={
          <>
            Employee
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        onBlur={handleBlur}
        isStatic={false}
        placeholder={"Search full_name..."}
        value={selectedData}
        onChange={handleOnUpdate}

        toSave="full_name"
        toDisplay="full_name"
        isArray={false}
        isMultiple={false}
        dynamicData={dynamicDFDData||[]}
        getPaginationData={getDropdownData}
        initialPage ={paginationData.page}
        pageCount ={paginationData.pageSize}
      />
    
  </div>
  )
}
