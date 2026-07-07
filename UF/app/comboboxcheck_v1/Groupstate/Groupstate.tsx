'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { getGroupOrchestrationData, getControlOrchestrationData, fetchBatchData } from '@/app/utils/Orchestration';
import { AxiosService } from '@/app/components/axiosService';
import { api_paginationDto, uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution, validatedCondition } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleGroupArrayCopyFormData } from '@/app/utils/commonfunctions'; 
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import evaluateDecisionTable,{ evaluateDecisionForDynamicActions,eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import uoMapperData from '@/context/dfdmapperContolnames.json';
import Tablestate  from './Tablestate';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupstate = ({lockedData={},setLockedData,primaryTableData={},tableData=[],setTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false,setIsProcessing, groupData: groupDataProp={}, controlData: controlDataProp={}}:any)=> {
  const token:string = getCookie('token'); 
  const decodedTokenObj:any = decodeToken(token);
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const copyFormData=useHandleGroupArrayCopyFormData()
  const [groupData, setGroupData] = useState<any>(groupDataProp);
  const [controlData, setControlData] = useState<any>(controlDataProp);
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_country_code_dfd_v1Props, setdfd_country_code_dfd_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const [showFlag, setShowFlag] = React.useState<string>("");
  const securityData:any={
  "emplyoee": {
    "allowedControls": [
      "country",
      "city",
      "lock",
      "otherdetails",
      "ddd"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupb",
      "groupc",
      "groupd"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "country",
      "city",
      "lock",
      "otherdetails",
      "ddd"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupb",
      "groupc",
      "groupd"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template": {
    "allowedControls": [
      "country",
      "city",
      "lock",
      "otherdetails",
      "ddd"
    ],
    "allowedGroups": [
      "canvas",
      "group1234",
      "state",
      "groupaaa",
      "groupb",
      "groupc",
      "groupd"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({});
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
 /////////////
   //another screen
  const {group123488888, setgroup123488888}= useContext(TotalContext) as TotalContextProps;
  const {group123488888Props, setgroup123488888Props}= useContext(TotalContext) as TotalContextProps;
  const {stateaa824, setstateaa824}= useContext(TotalContext) as TotalContextProps;
  const {stateaa824Props, setstateaa824Props}= useContext(TotalContext) as TotalContextProps;
  const {country0bab5, setcountry0bab5}= useContext(TotalContext) as TotalContextProps;
  const {city886d7, setcity886d7}= useContext(TotalContext) as TotalContextProps;
  const {lock00a31, setlock00a31}= useContext(TotalContext) as TotalContextProps;
  const {otherdetails9c51d, setotherdetails9c51d}= useContext(TotalContext) as TotalContextProps;
  const {ddd73ecf, setddd73ecf}= useContext(TotalContext) as TotalContextProps;
  const {groupaaa97733, setgroupaaa97733}= useContext(TotalContext) as TotalContextProps;
  const {groupaaa97733Props, setgroupaaa97733Props}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7, setgroupb8f3d7}= useContext(TotalContext) as TotalContextProps;
  const {groupb8f3d7Props, setgroupb8f3d7Props}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048, setgroupc0c048}= useContext(TotalContext) as TotalContextProps;
  const {groupc0c048Props, setgroupc0c048Props}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8, setgroupd487a8}= useContext(TotalContext) as TotalContextProps;
  const {groupd487a8Props, setgroupd487a8Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [ruleData,setRuleData]=useState<any>([])
  const [open, setOpen] = React.useState(false);
  const {comboboxcheck_v1, setcomboboxcheck_v1} = useContext(TotalContext) as TotalContextProps;
  const checkOrchestrationData = async (): Promise<{ groupData: any; controlData: any }> => {
  if (Object.keys(groupData).length > 0) {
    return { groupData, controlData } 
  };
  const data: any = await fetchBatchData(
    'CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:comboboxcheck:AFVK:v1',
    [user],
    'GroupState',
    token
  );
    const resolved = { groupData: data.groupData || {}, controlData: data.controlData || {} };
    setGroupData(resolved.groupData);
    setControlData(resolved.controlData);
    return resolved;
  };
  async function securityCheck() {
  const { groupData: currentGroupData } = await checkOrchestrationData();
  let orchestrationData:any = getGroupOrchestrationData(currentGroupData, "313c6f34804a462d880b1bfa4caaa824");
  code = orchestrationData?.data?.code;
  setAllCode(code)
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
  if(orchestrationData?.data?.rule?.nodes?.length > 0){
    setRuleData(orchestrationData?.data?.rule?.nodes)
    setstateaa824Props((pre:any)=>({...pre,isHaveRule:true}))
    let schemaFlag:any = evaluateDecisionTable(orchestrationData?.data?.rule.nodes,{},{...decodedTokenObj});
    if (schemaFlag.output) {
      setShowFlag(schemaFlag.output.toLowerCase());
    }else{
      setShowFlag("")
    }
  }
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("country")){
        setcountry0bab5({...country0bab5,isDisabled:true});

    }else
    {
      if(country0bab5?.isDisabled==null)
      {
        setcountry0bab5({...country0bab5,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("city")){
        setcity886d7({...city886d7,isDisabled:true});

    }else
    {
      if(city886d7?.isDisabled==null)
      {
        setcity886d7({...city886d7,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("lock")){
        setlock00a31({...lock00a31,isDisabled:true});

    }else
    {
      if(lock00a31?.isDisabled==null)
      {
        setlock00a31({...lock00a31,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("otherdetails")){
        setotherdetails9c51d({...otherdetails9c51d,isDisabled:true});

    }else
    {
      if(otherdetails9c51d?.isDisabled==null)
      {
        setotherdetails9c51d({...otherdetails9c51d,isDisabled:false});
      }
    }
    if(orchestrationData?.data?.readableControls.includes("ddd")){
        setddd73ecf({...ddd73ecf,isDisabled:true});

    }else
    {
      if(ddd73ecf?.isDisabled==null)
      {
        setddd73ecf({...ddd73ecf,isDisabled:false});
      }
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }

  const handleOnClick= async (selectedItem:any, selectedIndex?: number)=>{
    handleCustomCode()
    
  }
  const handleCustomCode=async () => {
    let customCode:any=""
    if (allCode != '') {
      let codeStates: any = {};
        codeStates['group1234'] = group123488888,
        codeStates['setgroup1234'] = setgroup123488888,
        codeStates['group123488888'] = group123488888Props,
        codeStates['setgroup123488888'] = setgroup123488888Props,
        codeStates['state'] = stateaa824,
        codeStates['setstate'] = setstateaa824,
        codeStates['stateaa824'] = stateaa824Props,
        codeStates['setstateaa824'] = setstateaa824Props,
        codeStates['country'] = country0bab5,
        codeStates['setcountry'] = setcountry0bab5,
        codeStates['city'] = city886d7,
        codeStates['setcity'] = setcity886d7,
        codeStates['lock'] = lock00a31,
        codeStates['setlock'] = setlock00a31,
        codeStates['otherdetails'] = otherdetails9c51d,
        codeStates['setotherdetails'] = setotherdetails9c51d,
        codeStates['ddd'] = ddd73ecf,
        codeStates['setddd'] = setddd73ecf,
        codeStates['groupaaa'] = groupaaa97733,
        codeStates['setgroupaaa'] = setgroupaaa97733,
        codeStates['groupaaa97733'] = groupaaa97733Props,
        codeStates['setgroupaaa97733'] = setgroupaaa97733Props,
        codeStates['groupb'] = groupb8f3d7,
        codeStates['setgroupb'] = setgroupb8f3d7,
        codeStates['groupb8f3d7'] = groupb8f3d7Props,
        codeStates['setgroupb8f3d7'] = setgroupb8f3d7Props,
        codeStates['groupc'] = groupc0c048,
        codeStates['setgroupc'] = setgroupc0c048,
        codeStates['groupc0c048'] = groupc0c048Props,
        codeStates['setgroupc0c048'] = setgroupc0c048Props,
        codeStates['groupd'] = groupd487a8,
        codeStates['setgroupd'] = setgroupd487a8,
        codeStates['groupd487a8'] = groupd487a8Props,
        codeStates['setgroupd487a8'] = setgroupd487a8Props,
      customCode = codeExecution(allCode,codeStates);
      return customCode;
    }

  }


  const stateaa824Ref = useRef<any>(null);
  const handleClearSearch = () => {
    stateaa824Ref.current?.setSearchParams();
    stateaa824Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(stateaa824) && Object.keys(stateaa824)?.length>0)
      {
        setstateaa824({})
      }
    }else 
      prevRefreshRef.current= true
  }, [stateaa824Props?.refresh,token])


  const renderBUttons=()=>{
    return (
          <></>
    )
  }
  return (
    <div 
      style={{          
        gridColumn: '1 / 25',
        gridRow: '1 / 121',
      
        //rowGap: '0px',
        overflow: 'visible',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
       onClick={(e:any)=>{e.stopPropagation()
        handleOnClick({}, 0);
          setcomboboxcheck_v1((pre:any)=>({...pre,_selectedGroup_:"state"}))
        }}
    >
      <div className='flex flex-col h-full w-full min-w-0 overflow-auto'>
        <div className='flex flex-1 w-full min-h-0'>
       {<Tablestate headerButtonsRenders={renderBUttons}
        tableData={tableData} setTableData={setTableData} lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={stateaa824Ref} ButtonGoRuleData={ButtonGoRuleData} setButtonGoRuleData ={setButtonGoRuleData} setIsProcessing={setIsProcessing} groupData={groupData} controlData={controlData}/>}
      </div>
      </div>
    </div>
 )
}

export default Groupstate
