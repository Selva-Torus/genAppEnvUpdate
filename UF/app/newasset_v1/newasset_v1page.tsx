'use client'
import React,{ useContext,useEffect,useState,useRef } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto,api_paginationDto } from '@/app/interfaces/interfaces';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import { DecodedToken,PrimaryTableData,SecurityData,EncryptionFlagPageData,PaginationData,AllowedGroupNode } from "@/types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import clsx from "clsx";
import dynamic from 'next/dynamic';
const Groupnew_asset_group = dynamic(() => import("./Groupnew_asset_group/Groupnew_asset_group"), { ssr: false });


export default function PageNewassetV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "Network Engineer": {
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ]
  },
  "Checker": {
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ]
  },
  "Maker": {
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ]
  },
  "Network Admin": {
    "allowedGroups": [
      "canvas",
      "new_asset_group",
      "asset_info_group",
      "classification_group",
      "additional_details_group",
      "pyrchase_details_group",
      "disposal_details_group",
      "dynamicactions"
    ]
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "new_asset_group": {
    "asset_id": {
      "show": false
    }
  },
  "asset_info_group": {
    "basic_infot_asset_text": {
      "show": false
    },
    "category_name": {
      "show": false
    },
    "asset_type": {
      "show": false
    },
    "asset_name": {
      "show": false
    },
    "asset_tag": {
      "show": false
    },
    "asset_code": {
      "show": false
    },
    "serial_number": {
      "show": false
    },
    "model_number": {
      "show": false
    },
    "manufacturer": {
      "show": false
    }
  },
  "classification_group": {
    "classification_text": {
      "show": false
    },
    "classification": {
      "show": false
    },
    "data_classification": {
      "show": false
    },
    "ownership_type": {
      "show": false
    },
    "lifecycle_stage": {
      "show": false
    },
    "asset_condition": {
      "show": false
    },
    "risk_level": {
      "show": false
    },
    "is_critical": {
      "show": false
    }
  },
  "additional_details_group": {
    "additional_details_text": {
      "show": false
    },
    "location": {
      "show": false
    },
    "description": {
      "show": false
    }
  },
  "pyrchase_details_group": {
    "purchase_details_text": {
      "show": false
    },
    "vendor_name": {
      "show": false
    },
    "purchase_cost": {
      "show": false
    },
    "currency": {
      "show": false
    },
    "purchase_date": {
      "show": false
    },
    "warranty_expiry": {
      "show": false
    },
    "current_value": {
      "show": false
    },
    "depreciation_rate": {
      "show": false
    },
    "salvage_value": {
      "show": false
    }
  },
  "disposal_details_group": {
    "disposal_details_text": {
      "show": false
    },
    "disposal_method": {
      "show": false
    },
    "disposal_date": {
      "show": false
    },
    "disposal_ref": {
      "show": false
    }
  },
  "dynamicactions": {
    "cancel": {
      "show": false
    },
    "button_update": {
      "show": false
    },
    "add_asset": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "assets";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {newasset_v1, setnewasset_v1} = useContext(TotalContext) as TotalContextProps;
  const {newasset_v1Props, setnewasset_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_asset_group,setChecknew_asset_group,]=useState<boolean>(false);
  const [checkasset_info_group,setCheckasset_info_group,]=useState<boolean>(false);
  const [checkclassification_group,setCheckclassification_group,]=useState<boolean>(false);
  const [checkadditional_details_group,setCheckadditional_details_group,]=useState<boolean>(false);
  const [checkpyrchase_details_group,setCheckpyrchase_details_group,]=useState<boolean>(false);
  const [checkdisposal_details_group,setCheckdisposal_details_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const {new_asset_groupdb5a7, setnew_asset_groupdb5a7} = useContext(TotalContext) as TotalContextProps;
  const {asset_info_groupdeeeb, setasset_info_groupdeeeb} = useContext(TotalContext) as TotalContextProps;
  const {classification_group3c6b3, setclassification_group3c6b3} = useContext(TotalContext) as TotalContextProps;
  const {additional_details_group8c616, setadditional_details_group8c616} = useContext(TotalContext) as TotalContextProps;
  const {pyrchase_details_group76407, setpyrchase_details_group76407} = useContext(TotalContext) as TotalContextProps;
  const {disposal_details_groupaffa1, setdisposal_details_groupaffa1} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactions1077f, setdynamicactions1077f} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assettypecombo_v1Props, setdfd_assettypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetcategorycombo_v1Props, setdfd_assetcategorycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetclassificationcombo_v1Props, setdfd_assetclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetdataclassificationcombo_v1Props, setdfd_assetdataclassificationcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_ownershiptypecombo_v1Props, setdfd_ownershiptypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assetconditioncombo_v1Props, setdfd_assetconditioncombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_disposalmethodcombo_v1Props, setdfd_disposalmethodcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_risklevelcombo_v1Props, setdfd_risklevelcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vendornamecombo_v1Props, setdfd_vendornamecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_assets_v1Props, setdfd_assets_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_lifecyclestagecombo_v1Props, setdfd_lifecyclestagecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_currencycombo_v1Props, setdfd_currencycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [controlData, setControlData] = useState<any>({});
  const [groupData, setGroupData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData : EncryptionFlagPageData ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [paginationDetails, setpaginationDetails] = useState<Record<string, any>>({});
  const [paginationData,setPaginationData]=useState<PaginationData>({count:10,page:1})
    const prevRefreshRef = useRef<any>({
      assettypecombo_v1:false,
      assetcategorycombo_v1:false,
      assetclassificationcombo_v1:false,
      assetdataclassificationcombo_v1:false,
      ownershiptypecombo_v1:false,
      assetconditioncombo_v1:false,
      disposalmethodcombo_v1:false,
      risklevelcombo_v1:false,
      vendornamecombo_v1:false,
      assets_v1:false,
      lifecyclestagecombo_v1:false,
      currencycombo_v1:false,
    });
    async function assettypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assettypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assettypecombo_v1Body["dpdKey"] = encryptionDpd;
          assettypecombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetTypeCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assettypecombo_v1Body['filterData'] = filterData;
        }
        const assettypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assettypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assettypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assettypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assettypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assettypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assettypecombo_v1Data?.data?.dataset) {
           setdfd_assettypecombo_v1Props(
              Array.isArray(assettypecombo_v1Data?.data?.dataset?.data)
                 ? assettypecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assettypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assettypecombo_v1) {
      assettypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assettypecombo_v1= true
  },[refetch?.assettypecombo_v1])
    async function assetcategorycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetcategorycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetcategorycombo_v1Body["dpdKey"] = encryptionDpd;
          assetcategorycombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetCategoryCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetcategorycombo_v1Body['filterData'] = filterData;
        }
        const assetcategorycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetcategorycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetcategorycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetcategorycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetcategorycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetcategorycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetcategorycombo_v1Data?.data?.dataset) {
           setdfd_assetcategorycombo_v1Props(
              Array.isArray(assetcategorycombo_v1Data?.data?.dataset?.data)
                 ? assetcategorycombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetcategorycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetcategorycombo_v1) {
      assetcategorycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetcategorycombo_v1= true
  },[refetch?.assetcategorycombo_v1])
    async function assetclassificationcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetclassificationcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetClassificationCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetclassificationcombo_v1Body["dpdKey"] = encryptionDpd;
          assetclassificationcombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetClassificationCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetclassificationcombo_v1Body['filterData'] = filterData;
        }
        const assetclassificationcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetclassificationcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetclassificationcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetclassificationcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetclassificationcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetclassificationcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetclassificationcombo_v1Data?.data?.dataset) {
           setdfd_assetclassificationcombo_v1Props(
              Array.isArray(assetclassificationcombo_v1Data?.data?.dataset?.data)
                 ? assetclassificationcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetclassificationcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetclassificationcombo_v1) {
      assetclassificationcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetclassificationcombo_v1= true
  },[refetch?.assetclassificationcombo_v1])
    async function assetdataclassificationcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetdataclassificationcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDataClassificationCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetdataclassificationcombo_v1Body["dpdKey"] = encryptionDpd;
          assetdataclassificationcombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetDataClassificationCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetdataclassificationcombo_v1Body['filterData'] = filterData;
        }
        const assetdataclassificationcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetdataclassificationcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetdataclassificationcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetdataclassificationcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetdataclassificationcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetdataclassificationcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetdataclassificationcombo_v1Data?.data?.dataset) {
           setdfd_assetdataclassificationcombo_v1Props(
              Array.isArray(assetdataclassificationcombo_v1Data?.data?.dataset?.data)
                 ? assetdataclassificationcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetdataclassificationcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetdataclassificationcombo_v1) {
      assetdataclassificationcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetdataclassificationcombo_v1= true
  },[refetch?.assetdataclassificationcombo_v1])
    async function ownershiptypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let ownershiptypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:ownershipTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          ownershiptypecombo_v1Body["dpdKey"] = encryptionDpd;
          ownershiptypecombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:ownershipTypeCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          ownershiptypecombo_v1Body['filterData'] = filterData;
        }
        const ownershiptypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",ownershiptypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=ownershiptypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(ownershiptypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_ownershiptypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_ownershiptypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (ownershiptypecombo_v1Data?.data?.dataset) {
           setdfd_ownershiptypecombo_v1Props(
              Array.isArray(ownershiptypecombo_v1Data?.data?.dataset?.data)
                 ? ownershiptypecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_ownershiptypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.ownershiptypecombo_v1) {
      ownershiptypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.ownershiptypecombo_v1= true
  },[refetch?.ownershiptypecombo_v1])
    async function assetconditioncombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assetconditioncombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetConditionCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assetconditioncombo_v1Body["dpdKey"] = encryptionDpd;
          assetconditioncombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assetConditionCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assetconditioncombo_v1Body['filterData'] = filterData;
        }
        const assetconditioncombo_v1Data:any=await AxiosService.post("/te/eventEmitter",assetconditioncombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assetconditioncombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assetconditioncombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetconditioncombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assetconditioncombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assetconditioncombo_v1Data?.data?.dataset) {
           setdfd_assetconditioncombo_v1Props(
              Array.isArray(assetconditioncombo_v1Data?.data?.dataset?.data)
                 ? assetconditioncombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assetconditioncombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assetconditioncombo_v1) {
      assetconditioncombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assetconditioncombo_v1= true
  },[refetch?.assetconditioncombo_v1])
    async function disposalmethodcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let disposalmethodcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:disposalMethodCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          disposalmethodcombo_v1Body["dpdKey"] = encryptionDpd;
          disposalmethodcombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:disposalMethodCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          disposalmethodcombo_v1Body['filterData'] = filterData;
        }
        const disposalmethodcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",disposalmethodcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=disposalmethodcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(disposalmethodcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_disposalmethodcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_disposalmethodcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (disposalmethodcombo_v1Data?.data?.dataset) {
           setdfd_disposalmethodcombo_v1Props(
              Array.isArray(disposalmethodcombo_v1Data?.data?.dataset?.data)
                 ? disposalmethodcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_disposalmethodcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.disposalmethodcombo_v1) {
      disposalmethodcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.disposalmethodcombo_v1= true
  },[refetch?.disposalmethodcombo_v1])
    async function risklevelcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let risklevelcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:riskLevelCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          risklevelcombo_v1Body["dpdKey"] = encryptionDpd;
          risklevelcombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:riskLevelCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          risklevelcombo_v1Body['filterData'] = filterData;
        }
        const risklevelcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",risklevelcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=risklevelcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(risklevelcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_risklevelcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_risklevelcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (risklevelcombo_v1Data?.data?.dataset) {
           setdfd_risklevelcombo_v1Props(
              Array.isArray(risklevelcombo_v1Data?.data?.dataset?.data)
                 ? risklevelcombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_risklevelcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.risklevelcombo_v1) {
      risklevelcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.risklevelcombo_v1= true
  },[refetch?.risklevelcombo_v1])
    async function vendornamecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let vendornamecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          vendornamecombo_v1Body["dpdKey"] = encryptionDpd;
          vendornamecombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:vendorNameCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          vendornamecombo_v1Body['filterData'] = filterData;
        }
        const vendornamecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",vendornamecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=vendornamecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(vendornamecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_vendornamecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_vendornamecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (vendornamecombo_v1Data?.data?.dataset) {
           setdfd_vendornamecombo_v1Props(
              Array.isArray(vendornamecombo_v1Data?.data?.dataset?.data)
                 ? vendornamecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_vendornamecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.vendornamecombo_v1) {
      vendornamecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.vendornamecombo_v1= true
  },[refetch?.vendornamecombo_v1])
    async function assets_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let assets_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          assets_v1Body["dpdKey"] = encryptionDpd;
          assets_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:assets:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          assets_v1Body['filterData'] = filterData;
        }
        const assets_v1Data:any=await AxiosService.post("/te/eventEmitter",assets_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=assets_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(assets_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assets_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_assets_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (assets_v1Data?.data?.dataset) {
           setdfd_assets_v1Props(
              Array.isArray(assets_v1Data?.data?.dataset?.data)
                 ? assets_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_assets_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.assets_v1) {
      assets_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.assets_v1= true
  },[refetch?.assets_v1])
    async function lifecyclestagecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let lifecyclestagecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:lifecycleStageCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          lifecyclestagecombo_v1Body["dpdKey"] = encryptionDpd;
          lifecyclestagecombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:lifecycleStageCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          lifecyclestagecombo_v1Body['filterData'] = filterData;
        }
        const lifecyclestagecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",lifecyclestagecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=lifecyclestagecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(lifecyclestagecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_lifecyclestagecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_lifecyclestagecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (lifecyclestagecombo_v1Data?.data?.dataset) {
           setdfd_lifecyclestagecombo_v1Props(
              Array.isArray(lifecyclestagecombo_v1Data?.data?.dataset?.data)
                 ? lifecyclestagecombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_lifecyclestagecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.lifecyclestagecombo_v1) {
      lifecyclestagecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.lifecyclestagecombo_v1= true
  },[refetch?.lifecyclestagecombo_v1])
    async function currencycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let currencycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:currencyCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          currencycombo_v1Body["dpdKey"] = encryptionDpd;
          currencycombo_v1Body["method"] = encryptionMethod;
        }
        if(newasset_v1Props.length > 0){
          for(let i=0;i< newasset_v1Props.length;i++){
            if(newasset_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:AMS:AFK:currencyCombo:AFVK:v1"){
              // delete newasset_v1Props[i].DFDkey;
              let temp=structuredClone(newasset_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          currencycombo_v1Body['filterData'] = filterData;
        }
        const currencycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",currencycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=currencycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(currencycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
          if(filterData.length>0){
            const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1,
          filterData:filterData
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_currencycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_currencycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (currencycombo_v1Data?.data?.dataset) {
           setdfd_currencycombo_v1Props(
              Array.isArray(currencycombo_v1Data?.data?.dataset?.data)
                 ? currencycombo_v1Data?.data.dataset.data.map((obj: any) =>
                  Object.fromEntries(
                    Object.entries(obj || {}).map(([key, value]) => [
                      key.toLowerCase(),
                      value
                    ])
                  )
                )
              : []
          );   
        }else{
         //////////////
        

        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        // if(encryptionFlagCont) {
        // api_paginationBody["dpdKey"] = encryptionDpd
        // api_paginationBody["method"] = encryptionMethod
        // }
        const api_paginationData:any = await AxiosService.post(
          '/UF/pagination',
          api_paginationBody,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if (api_paginationData?.data?.error == true) {
          toast(api_paginationData?.data?.errorDetails?.message, 'danger')
          return
        }
        setdfd_currencycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.currencycombo_v1) {
      currencycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.currencycombo_v1= true
  },[refetch?.currencycombo_v1])
  const handleArtfactRule=async(rule:any,data:any={},allRuleData:any)=>{
    const { getAftfactLevelRule } = await import("../utils/evaluateDecisionTable");
    let result :any =await getAftfactLevelRule(rule,data,allRuleData)
    setnewasset_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1',
      [user],
      'pageNewassetV1',
      token
    )
    const orchestrationData: any = data.pageData
    setGroupData(data.groupData || {});
    setControlData(data.controlData || {});
    const security:string = orchestrationData?.security;
    const allowedGroup: AllowedGroupNode[] = orchestrationData?.allowedGroup||[];
    code = orchestrationData?.code;
    const pagination:any = orchestrationData?.action?.pagination;
    setpaginationDetails({
      page: +orchestrationData?.action?.pagination?.page || 0,
      pageSize: +orchestrationData?.action?.pagination?.count || 0
    })
    if("artfactPFRule" in orchestrationData && orchestrationData?.artfactPFRule?.nodes?.length>0){
      await handleArtfactRule(orchestrationData?.artfactPFRule,{...decodedTokenObj},allRuleData)  
    }
    if (token) {
      try {
        let introspect:any;
        if(encryptionFlagPage){
           introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/ams/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/ams/v1';
      }
      try {
        if(encryptionFlagPage){
          await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:AMS:AFK:newAsset:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await assettypecombo_v1DFD(pagination)
    await assetcategorycombo_v1DFD(pagination)
    await assetclassificationcombo_v1DFD(pagination)
    await assetdataclassificationcombo_v1DFD(pagination)
    await ownershiptypecombo_v1DFD(pagination)
    await assetconditioncombo_v1DFD(pagination)
    await disposalmethodcombo_v1DFD(pagination)
    await risklevelcombo_v1DFD(pagination)
    await vendornamecombo_v1DFD(pagination)
    await assets_v1DFD(pagination)
    await lifecyclestagecombo_v1DFD(pagination)
    await currencycombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'new_asset_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecknew_asset_group(true)
            }
            if(nodes?.groupName == 'asset_info_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckasset_info_group(true)
            }
            if(nodes?.groupName == 'classification_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckclassification_group(true)
            }
            if(nodes?.groupName == 'additional_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckadditional_details_group(true)
            }
            if(nodes?.groupName == 'pyrchase_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckpyrchase_details_group(true)
            }
            if(nodes?.groupName == 'disposal_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdisposal_details_group(true)
            }
            if(nodes?.groupName == 'dynamicactions' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactions(true)
            }
          })
          }
           }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: Record<string, any> = {}
          codeStates['new_asset_group'] = new_asset_groupdb5a7;
          codeStates['setnew_asset_group'] = setnew_asset_groupdb5a7;
          codeStates['asset_info_group'] = asset_info_groupdeeeb;
          codeStates['setasset_info_group'] = setasset_info_groupdeeeb;
          codeStates['classification_group'] = classification_group3c6b3;
          codeStates['setclassification_group'] = setclassification_group3c6b3;
          codeStates['additional_details_group'] = additional_details_group8c616;
          codeStates['setadditional_details_group'] = setadditional_details_group8c616;
          codeStates['pyrchase_details_group'] = pyrchase_details_group76407;
          codeStates['setpyrchase_details_group'] = setpyrchase_details_group76407;
          codeStates['disposal_details_group'] = disposal_details_groupaffa1;
          codeStates['setdisposal_details_group'] = setdisposal_details_groupaffa1;
          codeStates['dynamicactions'] = dynamicactions1077f;
          codeStates['setdynamicactions'] = setdynamicactions1077f;
          const { codeExecution } = await import("../utils/codeExecution");
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = (): void => {
    routes.push("/");
  }
  const handleOnload = (): void => {
  }

  useEffect(() => {    
    setMemoryVariables((prev: Record<string, string>) => ({
      ...prev,
      screenName: screenName,    
    }))
    securityCheck();
    handleOnload();
    setnewasset_v1(allRuleData)
  }, [])

  useEffect(()=>{
    if(newasset_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(newasset_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: "grid",
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
       // minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl bg-neutral-900/80 px-6 py-4 text-sm text-white shadow-lg backdrop-blur">
            {/* Spinner */}
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            {/* Text */}
            <span className="font-medium tracking-wide">
              Processing, please wait…
            </span>
          </div>
        </div>
      )}
        {checknew_asset_group && initialLoad &&<Groupnew_asset_group
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          tableData={tableData}
          setTableData={setTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}
          setIsProcessing={setIsProcessing}
          controlData={controlData} 
          groupData={groupData}        />}
        
      </div> 
    </>
  )
}
    