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




const DynamicJsonFormpolicy_rules_dynamicjsonform = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData,setIsProcessing,controlData}:any) => {  
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
        "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:addLeavePolicyModify:AFVK:v1|4e279f3010e947cda8cc341d6c0ac371|properties.policy_rules_json"
      ],
      "targetKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newLeavePolicy:AFVK:v1|90fb798a8b9499384ff751e486d2196e|b56f4e7ed96e4ce6b3da034d6d02062a"
    }
  ],
  "schemaData": {
    "type": "object",
    "properties": {
      "minimum_service_months": {
        "type": "integer"
      },
      "maximum_consecutive_days": {
        "type": "integer"
      },
      "advance_notice_days": {
        "type": "integer"
      },
      "document_required": {
        "type": "boolean"
      },
      "approval_required": {
        "type": "boolean"
      },
      "sandwich_leave_enabled": {
        "type": "boolean"
      },
      "holiday_inclusion": {
        "type": "boolean"
      },
      "encashment_allowed": {
        "type": "boolean"
      }
    },
    "required": [
      "minimum_service_months",
      "maximum_consecutive_days",
      "advance_notice_days",
      "document_required",
      "approval_required",
      "sandwich_leave_enabled",
      "holiday_inclusion",
      "encashment_allowed"
    ]
  }
}
    const [goruleData,setGoruleData]=useState<any>({})
  const [isRequredData,setIsRequredData]=useState(false)
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>("");
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'policy_rules_json',type:"text"})
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
  const {new_access_group86c35, setnew_access_group86c35}= useContext(TotalContext) as TotalContextProps;
  const {new_access_group86c35Props, setnew_access_group86c35Props}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3, setaccess_req__groupae6e3}= useContext(TotalContext) as TotalContextProps;
  const {access_req__groupae6e3Props, setaccess_req__groupae6e3Props}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196e, setapp_inf_group2196e}= useContext(TotalContext) as TotalContextProps;
  const {app_inf_group2196eProps, setapp_inf_group2196eProps}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167c, setapprove_group0167c}= useContext(TotalContext) as TotalContextProps;
  const {approve_group0167cProps, setapprove_group0167cProps}= useContext(TotalContext) as TotalContextProps;
  const {accrual_rules_dynamicjsonform8866d, setaccrual_rules_dynamicjsonform8866d}= useContext(TotalContext) as TotalContextProps;
  const {policy_rules_dynamicjsonform2062a, setpolicy_rules_dynamicjsonform2062a}= useContext(TotalContext) as TotalContextProps;
  const {add_dts_dynamicjsonform65fd5, setadd_dts_dynamicjsonform65fd5}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57c, setvalid_group5c57c}= useContext(TotalContext) as TotalContextProps;
  const {valid_group5c57cProps, setvalid_group5c57cProps}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebd, setbusiness_just__groupd6ebd}= useContext(TotalContext) as TotalContextProps;
  const {business_just__groupd6ebdProps, setbusiness_just__groupd6ebdProps}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fca, setprovision_groupc3fca}= useContext(TotalContext) as TotalContextProps;
  const {provision_groupc3fcaProps, setprovision_groupc3fcaProps}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0, setleave_rule_groupf75c0}= useContext(TotalContext) as TotalContextProps;
  const {leave_rule_groupf75c0Props, setleave_rule_groupf75c0Props}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40, setdynamicactionsd8c40}= useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsd8c40Props, setdynamicactionsd8c40Props}= useContext(TotalContext) as TotalContextProps;
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
              "value": "CK:CT006:FNGK:AF:FNK:DF-DST:CATK:ECP:AFGK:HRM:AFK:policyRulesJson:AFVK:v1:NDP",
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
        if (!app_inf_group2196e?.policy_rules_json) {
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
    //setValidate((pre:any)=>({...pre,policy_rules_json:{}}))
      setapp_inf_group2196e((prev: any) => ({ ...prev, policy_rules_json: processedValues }))
    
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
        codeStates['new_access_group'] = new_access_group86c35,
        codeStates['setnew_access_group'] = setnew_access_group86c35,
        codeStates['new_access_group86c35'] = new_access_group86c35Props,
        codeStates['setnew_access_group86c35'] = setnew_access_group86c35Props,
        codeStates['access_req__group'] = access_req__groupae6e3,
        codeStates['setaccess_req__group'] = setaccess_req__groupae6e3,
        codeStates['access_req__groupae6e3'] = access_req__groupae6e3Props,
        codeStates['setaccess_req__groupae6e3'] = setaccess_req__groupae6e3Props,
        codeStates['app_inf_group'] = app_inf_group2196e,
        codeStates['setapp_inf_group'] = setapp_inf_group2196e,
        codeStates['app_inf_group2196e'] = app_inf_group2196eProps,
        codeStates['setapp_inf_group2196e'] = setapp_inf_group2196eProps,
        codeStates['approve_group'] = approve_group0167c,
        codeStates['setapprove_group'] = setapprove_group0167c,
        codeStates['approve_group0167c'] = approve_group0167cProps,
        codeStates['setapprove_group0167c'] = setapprove_group0167cProps,
        codeStates['accrual_rules_dynamicjsonform'] = accrual_rules_dynamicjsonform8866d,
        codeStates['setaccrual_rules_dynamicjsonform'] = setaccrual_rules_dynamicjsonform8866d,
        codeStates['policy_rules_dynamicjsonform'] = policy_rules_dynamicjsonform2062a,
        codeStates['setpolicy_rules_dynamicjsonform'] = setpolicy_rules_dynamicjsonform2062a,
        codeStates['add_dts_dynamicjsonform'] = add_dts_dynamicjsonform65fd5,
        codeStates['setadd_dts_dynamicjsonform'] = setadd_dts_dynamicjsonform65fd5,
        codeStates['valid_group'] = valid_group5c57c,
        codeStates['setvalid_group'] = setvalid_group5c57c,
        codeStates['valid_group5c57c'] = valid_group5c57cProps,
        codeStates['setvalid_group5c57c'] = setvalid_group5c57cProps,
        codeStates['business_just__group'] = business_just__groupd6ebd,
        codeStates['setbusiness_just__group'] = setbusiness_just__groupd6ebd,
        codeStates['business_just__groupd6ebd'] = business_just__groupd6ebdProps,
        codeStates['setbusiness_just__groupd6ebd'] = setbusiness_just__groupd6ebdProps,
        codeStates['provision_group'] = provision_groupc3fca,
        codeStates['setprovision_group'] = setprovision_groupc3fca,
        codeStates['provision_groupc3fca'] = provision_groupc3fcaProps,
        codeStates['setprovision_groupc3fca'] = setprovision_groupc3fcaProps,
        codeStates['leave_rule_group'] = leave_rule_groupf75c0,
        codeStates['setleave_rule_group'] = setleave_rule_groupf75c0,
        codeStates['leave_rule_groupf75c0'] = leave_rule_groupf75c0Props,
        codeStates['setleave_rule_groupf75c0'] = setleave_rule_groupf75c0Props,
        codeStates['dynamicactions'] = dynamicactionsd8c40,
        codeStates['setdynamicactions'] = setdynamicactionsd8c40,
        codeStates['dynamicactionsd8c40'] = dynamicactionsd8c40Props,
        codeStates['setdynamicactionsd8c40'] = setdynamicactionsd8c40Props,
    codeExecution(code,codeStates)
    }
  }
  const handleMapperValue=async()=>{
    try{
    const orchestrationData = getControlOrchestrationData(
      controlData,
      "90fb798a8b9499384ff751e486d2196e",
      "b56f4e7ed96e4ce6b3da034d6d02062a"
    );
      if(orchestrationData?.data?.error == true){
       
        return
      }
      setAllCode(orchestrationData?.data?.code)
     
       setGoruleData(orchestrationData?.data?.pfRuleData ||{})
      fetchSchema(orchestrationData?.data?.pfRuleData ||{})
      if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='apinode'){
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'policy_rules_json',type:'text'}
        type={
          name:'policy_rules_json',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.policy_rules_json.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.policy_rules_json.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.policy_rules_json.type
        }
        setDynamicStateandType(type)
      }
      }else if(orchestrationData?.data?.schemaData?.at(0)?.nodeType=='dbnode'){
        if(orchestrationData?.data?.schemaData[0].schema.properties){
        let type:any={name:'policy_rules_json',type:'text'}
        type={
          name:'policy_rules_json',
          type: orchestrationData?.data?.schemaData[0].schema.properties.policy_rules_json.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.properties.policy_rules_json.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.properties.policy_rules_json.type
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
  


        const {dfd_addleavepolicymodify_v1Props} = useContext(TotalContext) as TotalContextProps;
const [dynamicDFDData,setDynamicDFDData]=useState<any>({})
    ////
  const getDropdownData = async(count?:any, page: number = 1,dfd?:string)=>{
    let dynamicData:any=dynamicDFDData
      if(dfd =="addLeavePolicyModify_v1")
      {
        let dstKey0:string = dfd_addleavepolicymodify_v1Props.dstKey;
        if ("hasLogicCenter" in dfd_addleavepolicymodify_v1Props && !dfd_addleavepolicymodify_v1Props.hasLogicCenter) {
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
              addLeavePolicyModify_v1: Array.isArray(latest?.addLeavePolicyModify_v1)
                ? [...latest.addLeavePolicyModify_v1, ...records]
                : records
            };
          });
        } else {
          setDynamicDFDData((prev: any) => ({ ...(prev || {}), addLeavePolicyModify_v1:dfd_addleavepolicymodify_v1Props }));
        }
      }
    
  }
  

  if (policy_rules_dynamicjsonform2062a?.isHidden) {
    return <></>
  }
   if (isLoading) {
    return  <div style={{gridColumn: `1 / 25`,gridRow: `50 / 90`, gap:``, height: `100%`, overflow: 'auto'}} >
      Loading schema...</div>
  }

  if (!renderData) {
    return null;
  }
  return (   
    <div  
      style={{gridColumn: `1 / 25`,gridRow: `50 / 90`, gap:``, height: `100%`, overflow: 'auto'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <DynamicJsonForm
        metadata={renderData}
        onChange={handleChange}
        onValidationChange={(isValid) => {
          setValidate((prev: any) => ({
            ...prev,
            newLeavePolicy_v1:{
              ...prev?.newLeavePolicy_v1,
              policy_rules_json: isValid ? {} : 'invalid'
            }
          }));
        }}
        values={app_inf_group2196e?.policy_rules_json}
        revalidate={revalidate}
        contentAlign={"left"}
      getPaginationData={getDropdownData}
      dynamicData={dynamicDFDData}
      />
    </div> 
  )
}

export default DynamicJsonFormpolicy_rules_dynamicjsonform
