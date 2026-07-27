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
import PageAddemployeejobpositionpage2 from '@/app/addemployeejobposition_v1/addemployeejobposition_v1page';
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
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {total_position_group79a63, settotal_position_group79a63}= useContext(TotalContext) as TotalContextProps;
  const {total_position_group79a63Props, settotal_position_group79a63Props}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59, settotal_positions_table22a59}= useContext(TotalContext) as TotalContextProps;
  const {total_positions_table22a59Props, settotal_positions_table22a59Props}= useContext(TotalContext) as TotalContextProps;
  const {position_idd92e4, setposition_idd92e4}= useContext(TotalContext) as TotalContextProps;
  const {position_codebd881, setposition_codebd881}= useContext(TotalContext) as TotalContextProps;
  const {position_titleda9c0, setposition_titleda9c0}= useContext(TotalContext) as TotalContextProps;
  const {grade_name6c5bb, setgrade_name6c5bb}= useContext(TotalContext) as TotalContextProps;
  const {employment_type16321, setemployment_type16321}= useContext(TotalContext) as TotalContextProps;
  const {experience_requiredcde5a, setexperience_requiredcde5a}= useContext(TotalContext) as TotalContextProps;
  const {job_levele1aaa, setjob_levele1aaa}= useContext(TotalContext) as TotalContextProps;
  const {view_btn7004e, setview_btn7004e}= useContext(TotalContext) as TotalContextProps;
  const {edit_btna042d, setedit_btna042d}= useContext(TotalContext) as TotalContextProps;
  const {delete_btnd0e5f, setdelete_btnd0e5f}= useContext(TotalContext) as TotalContextProps;
  const {ad_doca657b, setad_doca657b}= useContext(TotalContext) as TotalContextProps;
  const {addemployeejobposition_v1Props, setaddemployeejobposition_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335b, setposition_information_group5335b}= useContext(TotalContext) as TotalContextProps;
  const {position_information_group5335bProps, setposition_information_group5335bProps}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6, setcompensation_benfits_groupb46e6}= useContext(TotalContext) as TotalContextProps;
  const {compensation_benfits_groupb46e6Props, setcompensation_benfits_groupb46e6Props}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_position5f98e, setbt_add_position5f98e}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44, setdynamicactions76c44}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions76c44Props, setdynamicactions76c44Props}= useContext(TotalContext) as TotalContextProps;
  const {button_update94589, setbutton_update94589}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['total_position_group'] = total_position_group79a63,
      codeStates['settotal_position_group'] = settotal_position_group79a63,
      codeStates['total_position_group79a63'] = total_position_group79a63Props,
      codeStates['settotal_position_group79a63'] = settotal_position_group79a63Props,
      codeStates['total_positions_table'] = total_positions_table22a59,
      codeStates['settotal_positions_table'] = settotal_positions_table22a59,
      codeStates['total_positions_table22a59'] = total_positions_table22a59Props,
      codeStates['settotal_positions_table22a59'] = settotal_positions_table22a59Props,
      codeStates['position_id'] = position_idd92e4,
      codeStates['setposition_id'] = setposition_idd92e4,
      codeStates['position_code'] = position_codebd881,
      codeStates['setposition_code'] = setposition_codebd881,
      codeStates['position_title'] = position_titleda9c0,
      codeStates['setposition_title'] = setposition_titleda9c0,
      codeStates['grade_name'] = grade_name6c5bb,
      codeStates['setgrade_name'] = setgrade_name6c5bb,
      codeStates['employment_type'] = employment_type16321,
      codeStates['setemployment_type'] = setemployment_type16321,
      codeStates['experience_required'] = experience_requiredcde5a,
      codeStates['setexperience_required'] = setexperience_requiredcde5a,
      codeStates['job_level'] = job_levele1aaa,
      codeStates['setjob_level'] = setjob_levele1aaa,
      codeStates['view_btn'] = view_btn7004e,
      codeStates['setview_btn'] = setview_btn7004e,
      codeStates['edit_btn'] = edit_btna042d,
      codeStates['setedit_btn'] = setedit_btna042d,
      codeStates['delete_btn'] = delete_btnd0e5f,
      codeStates['setdelete_btn'] = setdelete_btnd0e5f,
      codeStates['ad_doc'] = ad_doca657b,
      codeStates['setad_doc'] = setad_doca657b,
      codeStates['addemployeejobposition_v1'] = addemployeejobposition_v1Props,
      codeStates['setaddemployeejobposition_v1'] = setaddemployeejobposition_v1Props,
      codeStates['position_information_group'] = position_information_group5335b,
      codeStates['setposition_information_group'] = setposition_information_group5335b,
      codeStates['position_information_group5335b'] = position_information_group5335bProps,
      codeStates['setposition_information_group5335b'] = setposition_information_group5335bProps,
      codeStates['compensation_benfits_group'] = compensation_benfits_groupb46e6,
      codeStates['setcompensation_benfits_group'] = setcompensation_benfits_groupb46e6,
      codeStates['compensation_benfits_groupb46e6'] = compensation_benfits_groupb46e6Props,
      codeStates['setcompensation_benfits_groupb46e6'] = setcompensation_benfits_groupb46e6Props,
      codeStates['bt_add_position'] = bt_add_position5f98e,
      codeStates['setbt_add_position'] = setbt_add_position5f98e,
      codeStates['dynamicactions'] = dynamicactions76c44,
      codeStates['setdynamicactions'] = setdynamicactions76c44,
      codeStates['dynamicactions76c44'] = dynamicactions76c44Props,
      codeStates['setdynamicactions76c44'] = setdynamicactions76c44Props,
      codeStates['button_update'] = button_update94589,
      codeStates['setbutton_update'] = setbutton_update94589,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "be36788337963d8ca3d8befe9e222a59",
        "3f411fd108deb56d63415bb5915a042d"
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
      if (id === "edit_btna042d") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[edit_btna042d?.refresh])


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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:jobPositions:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "ffc1d63fd7a3455d8438315430a6dcce",
        "object": {
          "properties.position_id": "b35b16a109f2255c92fde5b6913d92e4"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setaddemployeejobposition_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,position_information_group5335bProps?.controls);
    setposition_information_group5335b(bindData4||{})
    setposition_information_group5335bProps({...position_information_group5335bProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,compensation_benfits_groupb46e6Props?.controls);
    setcompensation_benfits_groupb46e6(bindData6||{})
    setcompensation_benfits_groupb46e6Props({...compensation_benfits_groupb46e6Props,presetValues:mainData||{}})  
    //disableElement
    setbt_add_position5f98e((prev: any) => ({ ...prev, isDisabled: true }));
    //enableElement
    setbutton_update94589((prev: any) => ({ ...prev, isDisabled: false }));
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

 if (edit_btna042d?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1','employeejobpositions','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        showOverlay = {true}
        position = {"center"}
        modalName = "addemployeejobposition"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageAddemployeejobpositionpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='outlined'
          disabled= {edit_btna042d?.isDisabled ? true : false}
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

