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
import PageDeletescreenpage2 from '@/app/deletescreen_v1/deletescreen_v1page';
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
 

const Buttonbt_delete = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  let actionLockData : any = {"lockMode":"","name":"","ttl":""}
  const [allCode,setAllCode]=useState<string>("");
  const [gridPosition, setGridPosition] = useState<any>({ gridColumn: '1 / 3', gridRow: '1 / 12' });
  ////showComponentAsPopup || showArtifactAsModal
  const [showProfileAsModalOpen2, setShowProfileAsModalOpen2] = React.useState<boolean>(false);
    
 /////////////
   //another screen

  const {overall_asset_group7ded2, setoverall_asset_group7ded2}= useContext(TotalContext) as TotalContextProps;
  const {overall_asset_group7ded2Props, setoverall_asset_group7ded2Props}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bd, seticon_text_group476bd}= useContext(TotalContext) as TotalContextProps;
  const {icon_text_group476bdProps, seticon_text_group476bdProps}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38, setasset_tablef2b38}= useContext(TotalContext) as TotalContextProps;
  const {asset_tablef2b38Props, setasset_tablef2b38Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_id0e8f6, setasset_id0e8f6}= useContext(TotalContext) as TotalContextProps;
  const {asset_tagd67f5, setasset_tagd67f5}= useContext(TotalContext) as TotalContextProps;
  const {asset_name64bee, setasset_name64bee}= useContext(TotalContext) as TotalContextProps;
  const {category3fb9d, setcategory3fb9d}= useContext(TotalContext) as TotalContextProps;
  const {serial_no107f3, setserial_no107f3}= useContext(TotalContext) as TotalContextProps;
  const {status26d3e, setstatus26d3e}= useContext(TotalContext) as TotalContextProps;
  const {assigned_toea420, setassigned_toea420}= useContext(TotalContext) as TotalContextProps;
  const {location96640, setlocation96640}= useContext(TotalContext) as TotalContextProps;
  const {warranty_expiryd732d, setwarranty_expiryd732d}= useContext(TotalContext) as TotalContextProps;
  const {viewadef5, setviewadef5}= useContext(TotalContext) as TotalContextProps;
  const {bt_delete26265, setbt_delete26265}= useContext(TotalContext) as TotalContextProps;
  const {bt_edit17748, setbt_edit17748}= useContext(TotalContext) as TotalContextProps;
  const {bt_add_docb191a, setbt_add_docb191a}= useContext(TotalContext) as TotalContextProps;
  const {deletescreen_v1Props, setdeletescreen_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c02f, setgroup_delete3c02f}= useContext(TotalContext) as TotalContextProps;
  const {group_delete3c02fProps, setgroup_delete3c02fProps}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    code = allCode ||""
    if (code != '') {
      let codeStates: Record<string, any> = {};
      codeStates['overall_asset_group'] = overall_asset_group7ded2,
      codeStates['setoverall_asset_group'] = setoverall_asset_group7ded2,
      codeStates['overall_asset_group7ded2'] = overall_asset_group7ded2Props,
      codeStates['setoverall_asset_group7ded2'] = setoverall_asset_group7ded2Props,
      codeStates['icon_text_group'] = icon_text_group476bd,
      codeStates['seticon_text_group'] = seticon_text_group476bd,
      codeStates['icon_text_group476bd'] = icon_text_group476bdProps,
      codeStates['seticon_text_group476bd'] = seticon_text_group476bdProps,
      codeStates['asset_table'] = asset_tablef2b38,
      codeStates['setasset_table'] = setasset_tablef2b38,
      codeStates['asset_tablef2b38'] = asset_tablef2b38Props,
      codeStates['setasset_tablef2b38'] = setasset_tablef2b38Props,
      codeStates['asset_id'] = asset_id0e8f6,
      codeStates['setasset_id'] = setasset_id0e8f6,
      codeStates['asset_tag'] = asset_tagd67f5,
      codeStates['setasset_tag'] = setasset_tagd67f5,
      codeStates['asset_name'] = asset_name64bee,
      codeStates['setasset_name'] = setasset_name64bee,
      codeStates['category'] = category3fb9d,
      codeStates['setcategory'] = setcategory3fb9d,
      codeStates['serial_no'] = serial_no107f3,
      codeStates['setserial_no'] = setserial_no107f3,
      codeStates['status'] = status26d3e,
      codeStates['setstatus'] = setstatus26d3e,
      codeStates['assigned_to'] = assigned_toea420,
      codeStates['setassigned_to'] = setassigned_toea420,
      codeStates['location'] = location96640,
      codeStates['setlocation'] = setlocation96640,
      codeStates['warranty_expiry'] = warranty_expiryd732d,
      codeStates['setwarranty_expiry'] = setwarranty_expiryd732d,
      codeStates['view'] = viewadef5,
      codeStates['setview'] = setviewadef5,
      codeStates['bt_delete'] = bt_delete26265,
      codeStates['setbt_delete'] = setbt_delete26265,
      codeStates['bt_edit'] = bt_edit17748,
      codeStates['setbt_edit'] = setbt_edit17748,
      codeStates['bt_add_doc'] = bt_add_docb191a,
      codeStates['setbt_add_doc'] = setbt_add_docb191a,
      codeStates['deletescreen_v1'] = deletescreen_v1Props,
      codeStates['setdeletescreen_v1'] = setdeletescreen_v1Props,
      codeStates['group_delete'] = group_delete3c02f,
      codeStates['setgroup_delete'] = setgroup_delete3c02f,
      codeStates['group_delete3c02f'] = group_delete3c02fProps,
      codeStates['setgroup_delete3c02f'] = setgroup_delete3c02fProps,
      codeStates['response']  = savedData.current;
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async (data?:any) => {
    try{     
      const orchestrationData : any = getControlOrchestrationData(
        controlData,
        "2f7c1caa85a04bb5bacd9e41b26f2b38",
        "6dcb708c1fb946e7b2c214c3c2826265"
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
      if (id === "bt_delete26265") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_delete26265?.refresh])

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
    "key": "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "19752269565d4be2be63be1bd8cf4ff6",
        "object": {
          "properties.asset_id": "823d024d095240bc9f127486d790e8f6"
        }
      }
    ]
  }
];
    let filterData2 = await getFilterProps(filterProps2,mainData);
    setdeletescreen_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    setgroup_delete3c02f(mainData||{})
    setgroup_delete3c02fProps({...group_delete3c02fProps,presetValues:mainData||{}})  
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

 if (bt_delete26265?.isHidden) {
    return <></>
  }

  return (
    <div 
     onMouseDown={(e:any) => 
      getRouteScreenDetails('CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1','assets','needstopPropagate')=='not in assembler'?e.stopPropagation():null
    }
    >
       
      <Modal 
        open={showProfileAsModalOpen2} 
        onClose={() => setShowProfileAsModalOpen2(false)}
        title="Confirm Deletion"
        showOverlay = {true}
        position = {"center"}
        modalName = "deletescreen"
        className='w-[40%] h-[] bg-gray-50 overflow-auto'
      >
        <PageDeletescreenpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_delete26265?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Delete")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_delete

