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
import PageNewassetpage2 from '@/app/newasset_v1/newasset_v1page';
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
 

const Buttonbt_edit = ({ mainData,lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}: { mainData:any,lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,setIsProcessing:any,controlData:any}) => {
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
  const {newasset_v1Props, setnewasset_v1Props}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7}= useContext(TotalContext) as TotalContextProps;
  const {new_asset_groupdb5a7Props, setnew_asset_groupdb5a7Props}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb}= useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeebProps, setasset_info_groupdeeebProps}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3}= useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3Props, setclassification_group3c6b3Props}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616Props, setadditional_details_group8c616Props}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407}= useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407Props, setpyrchase_details_group76407Props}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1}= useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1Props, setdisposal_details_groupaffa1Props}= useContext(TotalContext) as TotalContextProps;
  const {button_update10522, setbutton_update10522}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077fProps, setdynamicactions1077fProps}= useContext(TotalContext) as TotalContextProps;
  const {add_asset1b88e, setadd_asset1b88e}= useContext(TotalContext) as TotalContextProps;
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
      codeStates['newasset_v1'] = newasset_v1Props,
      codeStates['setnewasset_v1'] = setnewasset_v1Props,
      codeStates['new_asset_group'] = new_asset_groupdb5a7,
      codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7,
      codeStates['new_asset_groupdb5a7'] = new_asset_groupdb5a7Props,
      codeStates['setnew_asset_groupdb5a7'] = setnew_asset_groupdb5a7Props,
      codeStates['asset_info_group'] = asset_info_groupdeeeb,
      codeStates['setasset_info_group'] = setasset_info_groupdeeeb,
      codeStates['asset_info_groupdeeeb'] = asset_info_groupdeeebProps,
      codeStates['setasset_info_groupdeeeb'] = setasset_info_groupdeeebProps,
      codeStates['classification_group'] = classification_group3c6b3,
      codeStates['setclassification_group'] = setclassification_group3c6b3,
      codeStates['classification_group3c6b3'] = classification_group3c6b3Props,
      codeStates['setclassification_group3c6b3'] = setclassification_group3c6b3Props,
      codeStates['additional_details_group'] = additional_details_group8c616,
      codeStates['setadditional_details_group'] = setadditional_details_group8c616,
      codeStates['additional_details_group8c616'] = additional_details_group8c616Props,
      codeStates['setadditional_details_group8c616'] = setadditional_details_group8c616Props,
      codeStates['pyrchase_details_group'] = pyrchase_details_group76407,
      codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407,
      codeStates['pyrchase_details_group76407'] = pyrchase_details_group76407Props,
      codeStates['setpyrchase_details_group76407'] = setpyrchase_details_group76407Props,
      codeStates['disposal_details_group'] = disposal_details_groupaffa1,
      codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1,
      codeStates['disposal_details_groupaffa1'] = disposal_details_groupaffa1Props,
      codeStates['setdisposal_details_groupaffa1'] = setdisposal_details_groupaffa1Props,
      codeStates['button_update'] = button_update10522,
      codeStates['setbutton_update'] = setbutton_update10522,
      codeStates['dynamicactions'] = dynamicactions1077f,
      codeStates['setdynamicactions'] = setdynamicactions1077f,
      codeStates['dynamicactions1077f'] = dynamicactions1077fProps,
      codeStates['setdynamicactions1077f'] = setdynamicactions1077fProps,
      codeStates['add_asset'] = add_asset1b88e,
      codeStates['setadd_asset'] = setadd_asset1b88e,
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
        "5beed213b3364ec897d43d8e63017748"
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
      if (id === "bt_edit17748") {
        handleClick();
      }
    });
  },[currentToken,memoryVariables])

  useEffect(()=>{
    setShowProfileAsModalOpen2(false)
  },[bt_edit17748?.refresh])

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
    setnewasset_v1Props([...filterData2 ]);
    setShowProfileAsModalOpen2(true);
    //bindTran
    // For group or table
    let bindData4 = filterByKeys(mainData,new_asset_groupdb5a7Props?.controls);
    setnew_asset_groupdb5a7(bindData4||{})
    setnew_asset_groupdb5a7Props({...new_asset_groupdb5a7Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData6 = filterByKeys(mainData,asset_info_groupdeeebProps?.controls);
    setasset_info_groupdeeeb(bindData6||{})
    setasset_info_groupdeeebProps({...asset_info_groupdeeebProps,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData8 = filterByKeys(mainData,classification_group3c6b3Props?.controls);
    setclassification_group3c6b3(bindData8||{})
    setclassification_group3c6b3Props({...classification_group3c6b3Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData10 = filterByKeys(mainData,additional_details_group8c616Props?.controls);
    setadditional_details_group8c616(bindData10||{})
    setadditional_details_group8c616Props({...additional_details_group8c616Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData12 = filterByKeys(mainData,pyrchase_details_group76407Props?.controls);
    setpyrchase_details_group76407(bindData12||{})
    setpyrchase_details_group76407Props({...pyrchase_details_group76407Props,presetValues:mainData||{}})  
    //bindTran
    // For group or table
    let bindData14 = filterByKeys(mainData,disposal_details_groupaffa1Props?.controls);
    setdisposal_details_groupaffa1(bindData14||{})
    setdisposal_details_groupaffa1Props({...disposal_details_groupaffa1Props,presetValues:mainData||{}})  
    //enableElement
    setbutton_update10522((prev: any) => ({ ...prev, isDisabled: false }));
    //disableElement
    setadd_asset1b88e((prev: any) => ({ ...prev, isDisabled: true }));
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

 if (bt_edit17748?.isHidden) {
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
        title="Edit Asset"
        showOverlay = {true}
        position = {"center"}
        modalName = "newasset"
        className='w-[80%] h-[] bg-gray-50 overflow-auto'
      >
        <PageNewassetpage2/>
      </Modal>
        {showFlag && <Button 
          ref={buttonRef}
          className="!py-1 !text-gray-600"
          onClick={handleClick}
          view='outlined'
          disabled= {bt_edit17748?.isDisabled ? true : false}
          pin='brick-brick'
          contentAlign={"center"}
        >
          {keyset("Edit")}
        </Button>}
      </div>
    
  )
}

export default Buttonbt_edit

