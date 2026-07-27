'use client'


import React, { useState, useContext, useEffect, useRef, useMemo } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventDecisionTable } from '@/app/utils/evaluateDecisionTable';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import DynamicJsonForm from '@/components/DynamicJsonForm';
import { getSchemaByKeyAndCondition } from '@/app/utils/getSchemaByKeyAndCondition';
import decodeToken from '@/app/components/decodeToken';
import { getGroupOrchestrationData, getControlOrchestrationData } from '@/app/utils/Orchestration';
import * as v from 'valibot';




const DynamicJsonFormadditional_details_dynamicjsonform = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
  const token: string = getCookie('token');
  const prevRefreshRef = useRef(false);
  const decodedTokenObj: any = decodeToken(token);
  const {currentToken, setCurrentToken} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const actionDetails :any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "pfRuleData": {},
  "rule": {},
  "events": {},
  "mapper": [
    {
      "sourceKey": [
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addPerformanceCycleModify:AFVK:v1|027910746c6343f7b637e85490c0c120|properties.additional_details"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:viewPerformanceCycle:AFVK:v1|8db8e944155ef151489bacd8e1dc1763|1bcf01e54ebec3502c012783458d624a"
    }
  ],
  "schemaData": {
    "type": "object",
    "properties": {
      "notes": {
        "type": "string"
      },
      "effective_from": {
        "type": "string"
      },
      "review_owner": {
        "type": "string"
      },
      "rating_scale": {
        "type": "string"
      },
      "remarks": {
        "type": "string"
      }
    },
    "required": [
      "notes",
      "effective_from",
      "review_owner",
      "rating_scale",
      "remarks"
    ]
  }
}
    const [goruleData,setGoruleData]=useState<any>({})
  const [isRequredData,setIsRequredData]=useState(false)
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>("");
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'additional_details',type:"text"})
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const [revalidate, setRevalidate] = useState(0);
  const [validationStatus, setValidationStatus] = useState<boolean>(true);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
  /////////////
   //another screen
  const {new_access_groupc1763, setnew_access_groupc1763}= useContext(TotalContext) as TotalContextProps;
  const {new_access_groupc1763Props, setnew_access_groupc1763Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9, setaccess_req__group70ea9}= useContext(TotalContext) as TotalContextProps;
  const {access_req__group70ea9Props, setaccess_req__group70ea9Props}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5, setvalid_group35ad5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group35ad5Props, setvalid_group35ad5Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicjsonform81ed5, setdynamicjsonform81ed5}= useContext(TotalContext) as TotalContextProps;
  const {additional_details_dynamicjsonformd624a, setadditional_details_dynamicjsonformd624a}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99, setbusiness_just__group2db99}= useContext(TotalContext) as TotalContextProps;
  const {business_just__group2db99Props, setbusiness_just__group2db99Props}= useContext(TotalContext) as TotalContextProps;
  const {cycle_id84005, setcycle_id84005}= useContext(TotalContext) as TotalContextProps;
  //////////////
  
  const allData = {
  "name": "dynamicJsonForm",
  "_label": "DynamicJsonForm",
  "_type": "array",
  "items": [
    {
      "key": {
        "name": "key",
        "_label": "Key",
        "_type": "select",
        "selectionList": [
          {
            "key": "all",
            "label": "All"
          },
          {
            "key": "loginId",
            "label": "User Name"
          },
          {
            "key": "isAppAdmin",
            "label": "Application Administrator"
          },
          {
            "key": "client",
            "label": "Tenant Code"
          },
          {
            "key": "type",
            "label": "User Type"
          },
          {
            "key": "ag",
            "label": "Application Group"
          },
          {
            "key": "app",
            "label": "Application"
          },
          {
            "key": "userCode",
            "label": "User Code"
          },
          {
            "key": "orgGrpCode",
            "label": "Organization Group Code"
          },
          {
            "key": "selectedAccessProfile",
            "label": "Selected Access Profile"
          },
          {
            "key": "dap",
            "label": "Data Access Privilege"
          },
          {
            "key": "orgGrpName",
            "label": "Organization Group Name"
          },
          {
            "key": "orgCode",
            "label": "Organization Code"
          },
          {
            "key": "orgName",
            "label": "Organization Name"
          },
          {
            "key": "subOrgGrpCode",
            "label": "Sub-Organization Group Code"
          },
          {
            "key": "subOrgGrpName",
            "label": "Sub-Organization Group Name"
          },
          {
            "key": "subOrgCode",
            "label": "Sub-Organization Code"
          },
          {
            "key": "subOrgName",
            "label": "Sub-Organization Name"
          },
          {
            "key": "psGrpCode",
            "label": "Product/Service Group Code"
          },
          {
            "key": "psGrpName",
            "label": "Product/Service Group Name"
          },
          {
            "key": "psCode",
            "label": "Product/Service Code"
          },
          {
            "key": "psName",
            "label": "Product/Service Name"
          },
          {
            "key": "roleGrpCode",
            "label": "Role Group Code"
          },
          {
            "key": "roleGrpName",
            "label": "Role Group Name"
          },
          {
            "key": "roleCode",
            "label": "Role Code"
          },
          {
            "key": "roleName",
            "label": "Role Name"
          },
          {
            "key": "sid",
            "label": "Session ID"
          },
          {
            "key": "iat",
            "label": "Login Time"
          },
          {
            "key": "exp",
            "label": "Session Expiry Time"
          }
        ],
        "value": "all",
        "enabled": true
      },
      "value": {
        "name": "value",
        "_label": "Value",
        "_type": "array",
        "items": [
          {
            "condition": {
              "name": "condition",
              "_label": "Condition",
              "_type": "text",
              "value": "",
              "enabled": true
            },
            "schema": {
              "name": "schema",
              "_label": "Schema",
              "value": "CK:CT006:FNGK:AF:FNK:DF-DST:CATK:ECP:AFGK:HRM:AFK:cycleAdditionalDetailsJson:AFVK:v1:NDP",
              "_type": "artifactSelector",
              "_payload": {
                "fabric": [
                  "DF-DST"
                ],
                "subKey": "NDP"
              },
              "enabled": true
            }
          }
        ]
      }
    }
  ],
  "value": {},
  "enabled": true
};
  const [renderData, setRenderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
    const getFileUploaderFields = useMemo(() => {
    if (!renderData) return []

    const fileFields: { formKey: string; fieldKey: string; isArray: boolean }[] = []

    for (const [formKey, formConfig] of Object.entries(renderData) as any) {
      // Case 1: Object type - fields directly inside
      if (formConfig.type === 'object' && formConfig.fields) {
        for (const [fieldKey, fieldConfig] of Object.entries(formConfig.fields as any)) {
          if ((fieldConfig as any).type === 'documentuploader' || (fieldConfig as any).type === 'documentuploder') {
            fileFields.push({ formKey, fieldKey, isArray: false })
          }
        }
      }
      // Case 2: Array type - fields inside items.fields
      else if (formConfig.type === 'array' && formConfig.items?.fields) {
        for (const [fieldKey, fieldConfig] of Object.entries(formConfig.items.fields as any)) {
          if ((fieldConfig as any).type === 'documentuploader' || (fieldConfig as any).type === 'documentuploder') {
            fileFields.push({ formKey, fieldKey, isArray: true })
          }
        }
      }
    }

    return fileFields
  }, [renderData])

    const extractDefaultValues = (metadata: MetadataConfig): FieldValues => {
    const values: FieldValues = {}

    for (const key in metadata) {
      const field = metadata[key]

      if ('type' in field && field.type === 'object' && 'fields' in field) {
        // Nested object - recursively extract values
        values[key] = extractDefaultValues(field.fields)
      } else if ('defaultValue' in field) {
        // Simple field - extract default value
        values[key] = field.defaultValue
      }
    }

    return values
  }

  const fetchSchema = async (goruleData:any={},groupData:any={}) => {
    try {
      setIsLoading(true);
      const data = await getSchemaByKeyAndCondition(decodedTokenObj, allData,goruleData,groupData);
      setRenderData(data);

      if (data) {
        // Extract default values from metadata and initialize the form
        const defaultValues = extractDefaultValues(data)
        if (!new_access_groupc1763?.additional_details) {
          handleChange(defaultValues)
        }
      } else {
        // toast(i18n.t("No matching schema found for the provided condition."), 'danger');
      }
    } catch (error) {
      console.error('Error fetching schema:', error);
      toast(i18n.t("Error loading schema data."), 'danger');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    let forGetFormDataPointedData = {
      };

    if (prevRefreshRef.current) {
        fetchSchema(goruleData,forGetFormDataPointedData);
    }else 
      prevRefreshRef.current= true

  }, [currentToken]);

      type FieldValue = string | number | boolean | null;
      type FieldValues = { [key: string]: FieldValue | FieldValues | FieldValues[] };

        interface FieldMetadata {
        type: "text" | "number" | "boolean" | "date" | "dropdown" | "textarea";
        label: string;
        defaultValue: FieldValue;
        options?: string[]; // For dropdown fields
        placeholder?: string;
      }

      type MetadataConfig = {
        [key: string]: FieldMetadata | NestedMetadataConfig;
      };

      interface NestedMetadataConfig {
        type: "object";
        label: string;
        fields: MetadataConfig;
      }

      interface DynamicContentFieldsProps {
        metadata: MetadataConfig;
        onChange: (values: FieldValues) => void;
        className?: string;
      }
  // Validation  
    const [error, setError] = useState<string>('');
  schemaArray = [] ;
  function getLeafValues(obj:any) {
    let result:any = {};
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        result = { ...result, ...getLeafValues(obj[key]) };
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }
    const uploadFile = async (file: File, context?: string): Promise<string> => {
    try {
      const formData = new FormData()
        const basePath : string = process.env.NEXT_PUBLIC_DFS_PATH || "dfs-uploads";
        const bucketFolderame : string = process.env.NEXT_PUBLIC_DFS_BUCKETNAME || 'uploadfile';
        formData.append('file', file);
        formData.append('bucketFolderame', bucketFolderame.toLowerCase());
        formData.append('folderPath', basePath);

        const res : any = await AxiosService.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/UF/uploadimg`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              filename: file?.name
                ? file.name.replace(/\.[^/.]+$/, '')
                : ''
            }
          }
        )
        const fileId = res.data.imageUrl
      if (!fileId) {
        throw new Error('File upload failed: No fileId returned')
      }
      return fileId
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || 'File upload failed'
      throw new Error(errorMsg)
    }
  }

  // Function to process file uploads in values
  const processFileUploads = async (values: any): Promise<any> => {
    const processedValues = { ...values }

    for (const { formKey, fieldKey, isArray } of getFileUploaderFields) {
      if (isArray) {
        // Case: Array - iterate through each item
        const arrayData = values[formKey]
        if (Array.isArray(arrayData)) {
          processedValues[formKey] = await Promise.all(
            arrayData.map(async (item: any, index: number) => {
              const fileValue = item?.[fieldKey]
              if (fileValue?.file && fileValue.file instanceof File) {
                const uploadedResult = await uploadFile(fileValue.file, fieldKey)
                return { ...item, [fieldKey]: uploadedResult }
              }
              return item
            })
          )
        }
      } else {
        // Case: Object - direct access
        const fileValue = values[formKey]?.[fieldKey]
        if (fileValue?.file && fileValue.file instanceof File) {
          const uploadedResult = await uploadFile(fileValue.file, fieldKey)
          processedValues[formKey] = {
            ...processedValues[formKey],
            [fieldKey]: uploadedResult
          }
        }
      }
    }

    return processedValues
  }
  const handleChange = async(values: any) => {
    try{
    const processedValues = await processFileUploads(values)
    setError('')
    let flatentedValues:any=getLeafValues(processedValues)||{}
    //setValidate((pre:any)=>({...pre,additional_details:{}}))
      setnew_access_groupc1763((prev: any) => ({ ...prev, additional_details: processedValues }))
    
    setIsProcessing(true);
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
  const handleBlur=async () => {
    let code:any=allCode
     if (code != '') {
      let codeStates: any = {}
        codeStates['new_access_group'] = new_access_groupc1763,
        codeStates['setnew_access_group'] = setnew_access_groupc1763,
        codeStates['new_access_groupc1763'] = new_access_groupc1763Props,
        codeStates['setnew_access_groupc1763'] = setnew_access_groupc1763Props,
        codeStates['access_req__group'] = access_req__group70ea9,
        codeStates['setaccess_req__group'] = setaccess_req__group70ea9,
        codeStates['access_req__group70ea9'] = access_req__group70ea9Props,
        codeStates['setaccess_req__group70ea9'] = setaccess_req__group70ea9Props,
        codeStates['valid_group'] = valid_group35ad5,
        codeStates['setvalid_group'] = setvalid_group35ad5,
        codeStates['valid_group35ad5'] = valid_group35ad5Props,
        codeStates['setvalid_group35ad5'] = setvalid_group35ad5Props,
        codeStates['dynamicjsonform'] = dynamicjsonform81ed5,
        codeStates['setdynamicjsonform'] = setdynamicjsonform81ed5,
        codeStates['additional_details_dynamicjsonform'] = additional_details_dynamicjsonformd624a,
        codeStates['setadditional_details_dynamicjsonform'] = setadditional_details_dynamicjsonformd624a,
        codeStates['business_just__group'] = business_just__group2db99,
        codeStates['setbusiness_just__group'] = setbusiness_just__group2db99,
        codeStates['business_just__group2db99'] = business_just__group2db99Props,
        codeStates['setbusiness_just__group2db99'] = setbusiness_just__group2db99Props,
        codeStates['cycle_id'] = cycle_id84005,
        codeStates['setcycle_id'] = setcycle_id84005,
    codeExecution(code,codeStates)
    }
  }
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(
      controlData,
      "8db8e944155ef151489bacd8e1dc1763",
      "1bcf01e54ebec3502c012783458d624a"
    );
      if(orchestrationData?.data?.error == true){
       
        return
      }
      setAllCode(orchestrationData?.data?.code)
     
       setGoruleData(orchestrationData?.data?.pfRuleData ||{})
      fetchSchema(orchestrationData?.data?.pfRuleData ||{})
      if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'additional_details',type:'text'}
        type={
          name:'additional_details',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.additional_details.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.additional_details.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.additional_details.type
        }
        setDynamicStateandType(type)
      }
      }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
        if(orchestrationData?.data?.schemaData[0].schema.properties){
        let type:any={name:'additional_details',type:'text'}
        type={
          name:'additional_details',
          type: orchestrationData?.data?.schemaData[0].schema.properties.additional_details.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.properties.additional_details.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.properties.additional_details.type
        }
        setDynamicStateandType(type)
      }
      }

    }
    catch(err)
    {
      console.log(err)
    }
  }
  
  useEffect(()=>{
      handleMapperValue()
  },[])
  useEffect(()=>{
      handleBlur()
  },[])

  useEffect(() => {
    if (validateRefetch.init !== 0) {
      setRevalidate(prev => prev + 1);
    }
  }, [validateRefetch.value]);
  


        const {dfd_addperformancecyclemodify_v1Props} = useContext(TotalContext) as TotalContextProps;
const [dynamicDFDData,setDynamicDFDData]=useState<any>({})
    ////
  const getDropdownData = async(count?:any, page: number = 1,dfd?:string)=>{
    let dynamicData:any=dynamicDFDData
      if(dfd =="addPerformanceCycleModify_v1")
      {
        let dstKey0:string = dfd_addperformancecyclemodify_v1Props.dstKey;
        if ("hasLogicCenter" in dfd_addperformancecyclemodify_v1Props && !dfd_addperformancecyclemodify_v1Props.hasLogicCenter) {
          const api_paginationData:any = await AxiosService.post(
            '/UF/pagination',
            {key:dstKey0,
            page: page, 
            count: count},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              }
            }
          )
          const records:any = api_paginationData?.data?.records || [];
          if (records.length === 0) return;
          setDynamicDFDData((prev: any) => {
            const latest = prev || {};
            return {
              ...latest,
              addPerformanceCycleModify_v1: Array.isArray(latest?.addPerformanceCycleModify_v1)
                ? [...latest.addPerformanceCycleModify_v1, ...records]
                : records
            };
          });
        } else {
          setDynamicDFDData((prev: any) => ({ ...(prev || {}), addPerformanceCycleModify_v1:dfd_addperformancecyclemodify_v1Props }));
        }
      }
    
  }
  

  if (additional_details_dynamicjsonformd624a?.isHidden) {
    return <></>
  }
   if (isLoading) {
    return  <div style={{gridColumn: `13 / 25`,gridRow: `37 / 78`, gap:``, height: `100%`, overflow: 'auto'}} >
      Loading schema...</div>
  }

  if (!renderData) {
    return null;
  }
  return (   
    <div  
      style={{gridColumn: `13 / 25`,gridRow: `37 / 78`, gap:``, height: `100%`, overflow: 'auto'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <DynamicJsonForm
        metadata={renderData}
        onChange={handleChange}
        onValidationChange={(isValid) => {
          setValidate((prev: any) => ({
            ...prev,
            viewPerformanceCycle_v1:{
              ...prev?.viewPerformanceCycle_v1,
              additional_details: isValid ? {} : 'invalid'
            }
          }));
        }}
        values={new_access_groupc1763?.additional_details}
        revalidate={revalidate}
        contentAlign={"left"}
      getPaginationData={getDropdownData}
      dynamicData={dynamicDFDData}
      />
    </div> 
  )
}

export default DynamicJsonFormadditional_details_dynamicjsonform
