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
import PageComboboxcheckpage2 from '@/app/comboboxcheck_v1/comboboxcheck_v1page';
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
 

const Buttonhh = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const savedData=useRef<Record<string, any>>({})
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
  let actionLockData : any = {"ttl":"","name":"","lockMode":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {grouped023, setgrouped023}= useContext(TotalContext) as TotalContextProps;
  const {grouped023Props, setgrouped023Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120, setdynamicactionsc9120}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsc9120Props, setdynamicactionsc9120Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986, setdynamicactionsa32986}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa32986Props, setdynamicactionsa32986Props}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8, settable12312058a8}= useContext(TotalContext) as TotalContextProps;
  const {table12312058a8Props, settable12312058a8Props}= useContext(TotalContext) as TotalContextProps;
  const {name31e2e, setname31e2e}= useContext(TotalContext) as TotalContextProps;
  const {hh6c7c1, sethh6c7c1}= useContext(TotalContext) as TotalContextProps;
  const {routee4686, setroutee4686}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3, settab_group03bf3}= useContext(TotalContext) as TotalContextProps;
  const {tab_group03bf3Props, settab_group03bf3Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119fae, settab_header_119fae}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_119faeProps, settab_header_119faeProps}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2, setgggg721e2}= useContext(TotalContext) as TotalContextProps;
  const {gggg721e2Props, setgggg721e2Props}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952, settab_header_2d8952}= useContext(TotalContext) as TotalContextProps;
  const {tab_header_2d8952Props, settab_header_2d8952Props}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015, setxbxvvcv42015}= useContext(TotalContext) as TotalContextProps;
  const {xbxvvcv42015Props, setxbxvvcv42015Props}= useContext(TotalContext) as TotalContextProps;
  const {comboboxcheck_v1Props, setcomboboxcheck_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['group'] = grouped023,
      codeStates['setgroup'] = setgrouped023,
      codeStates['grouped023'] = grouped023Props,
      codeStates['setgrouped023'] = setgrouped023Props,
      codeStates['dynamicactions'] = dynamicactionsc9120,
      codeStates['setdynamicactions'] = setdynamicactionsc9120,
      codeStates['dynamicactionsc9120'] = dynamicactionsc9120Props,
      codeStates['setdynamicactionsc9120'] = setdynamicactionsc9120Props,
      codeStates['dynamicactionsa'] = dynamicactionsa32986,
      codeStates['setdynamicactionsa'] = setdynamicactionsa32986,
      codeStates['dynamicactionsa32986'] = dynamicactionsa32986Props,
      codeStates['setdynamicactionsa32986'] = setdynamicactionsa32986Props,
      codeStates['table12312'] = table12312058a8,
      codeStates['settable12312'] = settable12312058a8,
      codeStates['table12312058a8'] = table12312058a8Props,
      codeStates['settable12312058a8'] = settable12312058a8Props,
      codeStates['name'] = name31e2e,
      codeStates['setname'] = setname31e2e,
      codeStates['hh'] = hh6c7c1,
      codeStates['sethh'] = sethh6c7c1,
      codeStates['route'] = routee4686,
      codeStates['setroute'] = setroutee4686,
      codeStates['tab_group'] = tab_group03bf3,
      codeStates['settab_group'] = settab_group03bf3,
      codeStates['tab_group03bf3'] = tab_group03bf3Props,
      codeStates['settab_group03bf3'] = settab_group03bf3Props,
      codeStates['tab_header_1'] = tab_header_119fae,
      codeStates['settab_header_1'] = settab_header_119fae,
      codeStates['tab_header_119fae'] = tab_header_119faeProps,
      codeStates['settab_header_119fae'] = settab_header_119faeProps,
      codeStates['gggg'] = gggg721e2,
      codeStates['setgggg'] = setgggg721e2,
      codeStates['gggg721e2'] = gggg721e2Props,
      codeStates['setgggg721e2'] = setgggg721e2Props,
      codeStates['tab_header_2'] = tab_header_2d8952,
      codeStates['settab_header_2'] = settab_header_2d8952,
      codeStates['tab_header_2d8952'] = tab_header_2d8952Props,
      codeStates['settab_header_2d8952'] = settab_header_2d8952Props,
      codeStates['xbxvvcv'] = xbxvvcv42015,
      codeStates['setxbxvvcv'] = setxbxvvcv42015,
      codeStates['xbxvvcv42015'] = xbxvvcv42015Props,
      codeStates['setxbxvvcv42015'] = setxbxvvcv42015Props,
      codeStates['comboboxcheck_v1'] = comboboxcheck_v1Props,
      codeStates['setcomboboxcheck_v1'] = setcomboboxcheck_v1Props,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "e3cf5bc049134a80a69af047a32058a8",
        "a599701799fe4dabb8f9b22417b6c7c1"
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
      if (id === "hh6c7c1") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[hh6c7c1?.refresh])

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
    setcomboboxcheck_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
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

 if (hh6c7c1?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT001:FNGK:AF:FNK:UF-UFW:CATK:TGW01:AFGK:TGW004:AFK:dynamicAction:AFVK:v1','dynamicaction','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        showOverlay = {true}
        position = {"center"}
        modalName = "comboboxcheck"
        className='w-[] h-[] bg-gray-50 overflow-auto'
      >
        <PageComboboxcheckpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 "
          onClick={handleClick}
          view='action'
          disabled= {hh6c7c1?.isDisabled ? true : false}
          pin='circle-circle'
          contentAlign={"center"}
        >
          {keyset("hhh")}
        </Button>}
      </div>
    
  )
}

export default Buttonhh

