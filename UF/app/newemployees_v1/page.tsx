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
const Groupnew_employee_group = dynamic(() => import("./Groupnew_employee_group/Groupnew_employee_group"), { ssr: false });


export default function PageNewemployeesV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } : { isDark: boolean; isHighContrast: boolean; bgStyle: string; textStyle: string } = useTheme();
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const securityData : SecurityData = {
  "CXO": {
    "blockedGroups": []
  },
  "HR Manager": {
    "blockedGroups": []
  },
  "Info Security Officer": {
    "blockedGroups": []
  },
  "Employee": {
    "blockedGroups": []
  },
  "IT Manager": {
    "blockedGroups": []
  },
  "Operation Staff": {
    "blockedGroups": []
  },
  "Auditor": {
    "blockedGroups": []
  },
  "Operation Manager": {
    "blockedGroups": []
  }
};
  let code : string = "";
  const routes : AppRouterInstance = useRouter();
  const toast : Function = useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<PrimaryTableData>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<Record<string, any>>({});
  const allRuleData:any={
  "new_employee_group": {
    "new_emp": {
      "show": false
    },
    "basic_divider": {
      "show": false
    },
    "contact_details_divider": {
      "show": false
    },
    "add_divider": {
      "show": false
    },
    "comp_divider": {
      "show": false
    },
    "emergency_divider": {
      "show": false
    },
    "skill_divider": {
      "show": false
    },
    "search_divider": {
      "show": false
    },
    "employee_id": {
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
    "save": {
      "show": false
    }
  },
  "basic_details_group": {
    "basic_details": {
      "show": false
    },
    "employee_code": {
      "show": false
    },
    "employee_number": {
      "show": false
    },
    "first_name": {
      "show": false
    },
    "middle_name": {
      "show": false
    },
    "last_name": {
      "show": false
    },
    "preferred_name": {
      "show": false
    },
    "gender": {
      "show": false
    },
    "blood_group": {
      "show": false
    },
    "date_of_birth": {
      "show": false
    },
    "marital_status": {
      "show": false
    }
  },
  "contact_details_group": {
    "contact_details": {
      "show": false
    },
    "personal_email": {
      "show": false
    },
    "work_email": {
      "show": false
    },
    "alternate_mobile_number": {
      "show": false
    },
    "mobile_number": {
      "show": false
    },
    "linkedin_profile": {
      "show": false
    }
  },
  "address_details_group": {
    "address_details": {
      "show": false
    },
    "country": {
      "show": false
    },
    "state": {
      "show": false
    },
    "city": {
      "show": false
    },
    "postal_code": {
      "show": false
    },
    "nationality": {
      "show": false
    },
    "address_line1": {
      "show": false
    },
    "address_line2": {
      "show": false
    }
  },
  "identity_details_group": {
    "identity_details": {
      "show": false
    },
    "national_id": {
      "show": false
    },
    "passport_number": {
      "show": false
    },
    "biometric_id": {
      "show": false
    }
  },
  "employment_details_group": {
    "employment_details": {
      "show": false
    },
    "employment_type": {
      "show": false
    },
    "employment_status": {
      "show": false
    },
    "hire_date": {
      "show": false
    },
    "confirmation_date": {
      "show": false
    },
    "probation_end_date": {
      "show": false
    },
    "work_mode": {
      "show": false
    },
    "time_zone": {
      "show": false
    },
    "hr_manager_id": {
      "show": false
    },
    "reporting_mmanager_id": {
      "show": false
    }
  },
  "compensation_details_group": {
    "compensation_details": {
      "show": false
    },
    "current_salary": {
      "show": false
    },
    "annual_ctc": {
      "show": false
    },
    "salary_currency": {
      "show": false
    }
  },
  "bank_details": {
    "bank_details": {
      "show": false
    },
    "bank_name": {
      "show": false
    },
    "bank_account_number": {
      "show": false
    },
    "ifsc_code": {
      "show": false
    }
  },
  "emergency_contact_group": {
    "emergency_contact": {
      "show": false
    },
    "emergency_contact_name": {
      "show": false
    },
    "emergency_contact_phone": {
      "show": false
    },
    "relationship": {
      "show": false
    }
  },
  "skills_education_group": {
    "skills_education": {
      "show": false
    },
    "family_divider": {
      "show": false
    }
  },
  "skills_group": {
    "skills_icon": {
      "show": false
    },
    "skill_text": {
      "show": false
    },
    "skill_des": {
      "show": false
    }
  },
  "skill": {
    "skill_name": {
      "show": false
    },
    "skill_category": {
      "show": false
    },
    "proficiency_level": {
      "show": false
    },
    "years_of_experience": {
      "show": false
    }
  },
  "education_group": {
    "education_icon": {
      "show": false
    },
    "ed_his_text": {
      "show": false
    },
    "ed_des": {
      "show": false
    }
  },
  "education": {
    "degree": {
      "show": false
    },
    "specialization": {
      "show": false
    },
    "institution_name": {
      "show": false
    },
    "cgpa": {
      "show": false
    }
  },
  "cert_group": {
    "certification_icon": {
      "show": false
    },
    "cert_text": {
      "show": false
    },
    "cert_des": {
      "show": false
    }
  },
  "certification": {
    "certification_name": {
      "show": false
    },
    "certification_provider": {
      "show": false
    },
    "certification_id": {
      "show": false
    }
  },
  "family_detail_group": {
    "family_icon": {
      "show": false
    },
    "fam_text": {
      "show": false
    },
    "family_des": {
      "show": false
    }
  },
  "famly_details": {
    "family_member_name": {
      "show": false
    },
    "relationship": {
      "show": false
    },
    "occupation": {
      "show": false
    },
    "contact_number": {
      "show": false
    }
  }
}
  const token:string = getCookie('token'); 
  const decodedTokenObj: DecodedToken = decodeToken(token);
  const screenName:string = "employees";
  const user : string | undefined = decodedTokenObj?.selectedAccessProfile;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const [tableData, setTableData] = useState<any[]>([]);  
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {newemployees_v1, setnewemployees_v1} = useContext(TotalContext) as TotalContextProps;
  const {newemployees_v1Props, setnewemployees_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [checknew_employee_group,setChecknew_employee_group,]=useState<boolean>(false);
  const [checkdynamicactions,setCheckdynamicactions,]=useState<boolean>(false);
  const [checkbasic_details_group,setCheckbasic_details_group,]=useState<boolean>(false);
  const [checkcontact_details_group,setCheckcontact_details_group,]=useState<boolean>(false);
  const [checkaddress_details_group,setCheckaddress_details_group,]=useState<boolean>(false);
  const [checkidentity_details_group,setCheckidentity_details_group,]=useState<boolean>(false);
  const [checkemployment_details_group,setCheckemployment_details_group,]=useState<boolean>(false);
  const [checkcompensation_details_group,setCheckcompensation_details_group,]=useState<boolean>(false);
  const [checkbank_details,setCheckbank_details,]=useState<boolean>(false);
  const [checkemergency_contact_group,setCheckemergency_contact_group,]=useState<boolean>(false);
  const [checkskills_education_group,setCheckskills_education_group,]=useState<boolean>(false);
  const [checkskills_group,setCheckskills_group,]=useState<boolean>(false);
  const [checkskill,setCheckskill,]=useState<boolean>(false);
  const [checkeducation_group,setCheckeducation_group,]=useState<boolean>(false);
  const [checkeducation,setCheckeducation,]=useState<boolean>(false);
  const [checkcert_group,setCheckcert_group,]=useState<boolean>(false);
  const [checkcertification,setCheckcertification,]=useState<boolean>(false);
  const [checkfamily_detail_group,setCheckfamily_detail_group,]=useState<boolean>(false);
  const [checkfamly_details,setCheckfamly_details,]=useState<boolean>(false);
  const {new_employee_group42d78, setnew_employee_group42d78} = useContext(TotalContext) as TotalContextProps;
  const {dynamicactionsa8358, setdynamicactionsa8358} = useContext(TotalContext) as TotalContextProps;
  const {basic_details_groupd39fd, setbasic_details_groupd39fd} = useContext(TotalContext) as TotalContextProps;
  const {contact_details_groupa1911, setcontact_details_groupa1911} = useContext(TotalContext) as TotalContextProps;
  const {address_details_groupb72f4, setaddress_details_groupb72f4} = useContext(TotalContext) as TotalContextProps;
  const {identity_details_group6a6fe, setidentity_details_group6a6fe} = useContext(TotalContext) as TotalContextProps;
  const {employment_details_group89cd6, setemployment_details_group89cd6} = useContext(TotalContext) as TotalContextProps;
  const {compensation_details_groupf9ef1, setcompensation_details_groupf9ef1} = useContext(TotalContext) as TotalContextProps;
  const {bank_details820cd, setbank_details820cd} = useContext(TotalContext) as TotalContextProps;
  const {emergency_contact_group73988, setemergency_contact_group73988} = useContext(TotalContext) as TotalContextProps;
  const {skills_education_groupcb53a, setskills_education_groupcb53a} = useContext(TotalContext) as TotalContextProps;
  const {skills_group36679, setskills_group36679} = useContext(TotalContext) as TotalContextProps;
  const {skill9f89a, setskill9f89a} = useContext(TotalContext) as TotalContextProps;
  const {education_group70757, seteducation_group70757} = useContext(TotalContext) as TotalContextProps;
  const {education2393a, seteducation2393a} = useContext(TotalContext) as TotalContextProps;
  const {cert_groupedb63, setcert_groupedb63} = useContext(TotalContext) as TotalContextProps;
  const {certificationc7d06, setcertificationc7d06} = useContext(TotalContext) as TotalContextProps;
  const {family_detail_group800b7, setfamily_detail_group800b7} = useContext(TotalContext) as TotalContextProps;
  const {famly_detailsb06ea, setfamly_detailsb06ea} = useContext(TotalContext) as TotalContextProps;
  const {dfd_bloodgroupcombo_v1Props, setdfd_bloodgroupcombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_maritalstatuscombo_v1Props, setdfd_maritalstatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employmenttypecombo_v1Props, setdfd_employmenttypecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employeestatuscombo_v1Props, setdfd_employeestatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gradecodecombo_v1Props, setdfd_gradecodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_vacancystatuscombo_v1Props, setdfd_vacancystatuscombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_positioncodecombo_v1Props, setdfd_positioncodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_empworkmodecombo_v1Props, setdfd_empworkmodecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_gendercombo_v1Props, setdfd_gendercombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_employees_v1Props, setdfd_employees_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_skilljson_v1Props, setdfd_skilljson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_familyjson_v1Props, setdfd_familyjson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_educationjson_v1Props, setdfd_educationjson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_certifyjson_v1Props, setdfd_certifyjson_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_countrycombo_v1Props, setdfd_countrycombo_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_statecombo_v1Props, setdfd_statecombo_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      bloodgroupcombo_v1:false,
      maritalstatuscombo_v1:false,
      employmenttypecombo_v1:false,
      employeestatuscombo_v1:false,
      gradecodecombo_v1:false,
      vacancystatuscombo_v1:false,
      positioncodecombo_v1:false,
      empworkmodecombo_v1:false,
      gendercombo_v1:false,
      employees_v1:false,
      skilljson_v1:false,
      familyjson_v1:false,
      educationjson_v1:false,
      certifyjson_v1:false,
      countrycombo_v1:false,
      statecombo_v1:false,
      currencycombo_v1:false,
    });
    async function bloodgroupcombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let bloodgroupcombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:bloodGroupCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          bloodgroupcombo_v1Body["dpdKey"] = encryptionDpd;
          bloodgroupcombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:bloodGroupCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          bloodgroupcombo_v1Body['filterData'] = filterData;
        }
        const bloodgroupcombo_v1Data:any=await AxiosService.post("/te/eventEmitter",bloodgroupcombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=bloodgroupcombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(bloodgroupcombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_bloodgroupcombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_bloodgroupcombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (bloodgroupcombo_v1Data?.data?.dataset) {
           setdfd_bloodgroupcombo_v1Props(
              Array.isArray(bloodgroupcombo_v1Data?.data?.dataset?.data)
                 ? bloodgroupcombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_bloodgroupcombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.bloodgroupcombo_v1) {
      bloodgroupcombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.bloodgroupcombo_v1= true
  },[refetch?.bloodgroupcombo_v1])
    async function maritalstatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let maritalstatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:maritalStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          maritalstatuscombo_v1Body["dpdKey"] = encryptionDpd;
          maritalstatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:maritalStatusCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          maritalstatuscombo_v1Body['filterData'] = filterData;
        }
        const maritalstatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",maritalstatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=maritalstatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(maritalstatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_maritalstatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_maritalstatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (maritalstatuscombo_v1Data?.data?.dataset) {
           setdfd_maritalstatuscombo_v1Props(
              Array.isArray(maritalstatuscombo_v1Data?.data?.dataset?.data)
                 ? maritalstatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_maritalstatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.maritalstatuscombo_v1) {
      maritalstatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.maritalstatuscombo_v1= true
  },[refetch?.maritalstatuscombo_v1])
    async function employmenttypecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let employmenttypecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employmentTypeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          employmenttypecombo_v1Body["dpdKey"] = encryptionDpd;
          employmenttypecombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employmentTypeCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          employmenttypecombo_v1Body['filterData'] = filterData;
        }
        const employmenttypecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",employmenttypecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=employmenttypecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(employmenttypecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_employmenttypecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_employmenttypecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (employmenttypecombo_v1Data?.data?.dataset) {
           setdfd_employmenttypecombo_v1Props(
              Array.isArray(employmenttypecombo_v1Data?.data?.dataset?.data)
                 ? employmenttypecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_employmenttypecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.employmenttypecombo_v1) {
      employmenttypecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.employmenttypecombo_v1= true
  },[refetch?.employmenttypecombo_v1])
    async function employeestatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let employeestatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          employeestatuscombo_v1Body["dpdKey"] = encryptionDpd;
          employeestatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employeeStatusCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          employeestatuscombo_v1Body['filterData'] = filterData;
        }
        const employeestatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",employeestatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=employeestatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(employeestatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_employeestatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_employeestatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (employeestatuscombo_v1Data?.data?.dataset) {
           setdfd_employeestatuscombo_v1Props(
              Array.isArray(employeestatuscombo_v1Data?.data?.dataset?.data)
                 ? employeestatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_employeestatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.employeestatuscombo_v1) {
      employeestatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.employeestatuscombo_v1= true
  },[refetch?.employeestatuscombo_v1])
    async function gradecodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let gradecodecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:gradeCodeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          gradecodecombo_v1Body["dpdKey"] = encryptionDpd;
          gradecodecombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:gradeCodeCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          gradecodecombo_v1Body['filterData'] = filterData;
        }
        const gradecodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",gradecodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=gradecodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(gradecodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_gradecodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_gradecodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (gradecodecombo_v1Data?.data?.dataset) {
           setdfd_gradecodecombo_v1Props(
              Array.isArray(gradecodecombo_v1Data?.data?.dataset?.data)
                 ? gradecodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_gradecodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.gradecodecombo_v1) {
      gradecodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.gradecodecombo_v1= true
  },[refetch?.gradecodecombo_v1])
    async function vacancystatuscombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let vacancystatuscombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:vacancyStatusCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          vacancystatuscombo_v1Body["dpdKey"] = encryptionDpd;
          vacancystatuscombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:vacancyStatusCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          vacancystatuscombo_v1Body['filterData'] = filterData;
        }
        const vacancystatuscombo_v1Data:any=await AxiosService.post("/te/eventEmitter",vacancystatuscombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=vacancystatuscombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(vacancystatuscombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_vacancystatuscombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_vacancystatuscombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (vacancystatuscombo_v1Data?.data?.dataset) {
           setdfd_vacancystatuscombo_v1Props(
              Array.isArray(vacancystatuscombo_v1Data?.data?.dataset?.data)
                 ? vacancystatuscombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_vacancystatuscombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.vacancystatuscombo_v1) {
      vacancystatuscombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.vacancystatuscombo_v1= true
  },[refetch?.vacancystatuscombo_v1])
    async function positioncodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let positioncodecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:positionCodeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          positioncodecombo_v1Body["dpdKey"] = encryptionDpd;
          positioncodecombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:positionCodeCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          positioncodecombo_v1Body['filterData'] = filterData;
        }
        const positioncodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",positioncodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=positioncodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(positioncodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_positioncodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_positioncodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (positioncodecombo_v1Data?.data?.dataset) {
           setdfd_positioncodecombo_v1Props(
              Array.isArray(positioncodecombo_v1Data?.data?.dataset?.data)
                 ? positioncodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_positioncodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.positioncodecombo_v1) {
      positioncodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.positioncodecombo_v1= true
  },[refetch?.positioncodecombo_v1])
    async function empworkmodecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let empworkmodecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:empWorkModeCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          empworkmodecombo_v1Body["dpdKey"] = encryptionDpd;
          empworkmodecombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:empWorkModeCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          empworkmodecombo_v1Body['filterData'] = filterData;
        }
        const empworkmodecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",empworkmodecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=empworkmodecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(empworkmodecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_empworkmodecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_empworkmodecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (empworkmodecombo_v1Data?.data?.dataset) {
           setdfd_empworkmodecombo_v1Props(
              Array.isArray(empworkmodecombo_v1Data?.data?.dataset?.data)
                 ? empworkmodecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_empworkmodecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.empworkmodecombo_v1) {
      empworkmodecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.empworkmodecombo_v1= true
  },[refetch?.empworkmodecombo_v1])
    async function gendercombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let gendercombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:genderCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          gendercombo_v1Body["dpdKey"] = encryptionDpd;
          gendercombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:genderCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          gendercombo_v1Body['filterData'] = filterData;
        }
        const gendercombo_v1Data:any=await AxiosService.post("/te/eventEmitter",gendercombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=gendercombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(gendercombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_gendercombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_gendercombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (gendercombo_v1Data?.data?.dataset) {
           setdfd_gendercombo_v1Props(
              Array.isArray(gendercombo_v1Data?.data?.dataset?.data)
                 ? gendercombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_gendercombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.gendercombo_v1) {
      gendercombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.gendercombo_v1= true
  },[refetch?.gendercombo_v1])
    async function employees_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let employees_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          employees_v1Body["dpdKey"] = encryptionDpd;
          employees_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          employees_v1Body['filterData'] = filterData;
        }
        const employees_v1Data:any=await AxiosService.post("/te/eventEmitter",employees_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=employees_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(employees_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_employees_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_employees_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (employees_v1Data?.data?.dataset) {
           setdfd_employees_v1Props(
              Array.isArray(employees_v1Data?.data?.dataset?.data)
                 ? employees_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_employees_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.employees_v1) {
      employees_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.employees_v1= true
  },[refetch?.employees_v1])
    async function skilljson_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let skilljson_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:skillJson:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          skilljson_v1Body["dpdKey"] = encryptionDpd;
          skilljson_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:skillJson:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          skilljson_v1Body['filterData'] = filterData;
        }
        const skilljson_v1Data:any=await AxiosService.post("/te/eventEmitter",skilljson_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=skilljson_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(skilljson_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_skilljson_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_skilljson_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (skilljson_v1Data?.data?.dataset) {
           setdfd_skilljson_v1Props(
              Array.isArray(skilljson_v1Data?.data?.dataset?.data)
                 ? skilljson_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_skilljson_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.skilljson_v1) {
      skilljson_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.skilljson_v1= true
  },[refetch?.skilljson_v1])
    async function familyjson_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let familyjson_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:familyJson:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          familyjson_v1Body["dpdKey"] = encryptionDpd;
          familyjson_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:familyJson:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          familyjson_v1Body['filterData'] = filterData;
        }
        const familyjson_v1Data:any=await AxiosService.post("/te/eventEmitter",familyjson_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=familyjson_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(familyjson_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_familyjson_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_familyjson_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (familyjson_v1Data?.data?.dataset) {
           setdfd_familyjson_v1Props(
              Array.isArray(familyjson_v1Data?.data?.dataset?.data)
                 ? familyjson_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_familyjson_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.familyjson_v1) {
      familyjson_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.familyjson_v1= true
  },[refetch?.familyjson_v1])
    async function educationjson_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let educationjson_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:educationJson:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          educationjson_v1Body["dpdKey"] = encryptionDpd;
          educationjson_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:educationJson:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          educationjson_v1Body['filterData'] = filterData;
        }
        const educationjson_v1Data:any=await AxiosService.post("/te/eventEmitter",educationjson_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=educationjson_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(educationjson_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_educationjson_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_educationjson_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (educationjson_v1Data?.data?.dataset) {
           setdfd_educationjson_v1Props(
              Array.isArray(educationjson_v1Data?.data?.dataset?.data)
                 ? educationjson_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_educationjson_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.educationjson_v1) {
      educationjson_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.educationjson_v1= true
  },[refetch?.educationjson_v1])
    async function certifyjson_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let certifyjson_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:certifyJson:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          certifyjson_v1Body["dpdKey"] = encryptionDpd;
          certifyjson_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:certifyJson:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          certifyjson_v1Body['filterData'] = filterData;
        }
        const certifyjson_v1Data:any=await AxiosService.post("/te/eventEmitter",certifyjson_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=certifyjson_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(certifyjson_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_certifyjson_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_certifyjson_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (certifyjson_v1Data?.data?.dataset) {
           setdfd_certifyjson_v1Props(
              Array.isArray(certifyjson_v1Data?.data?.dataset?.data)
                 ? certifyjson_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_certifyjson_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.certifyjson_v1) {
      certifyjson_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.certifyjson_v1= true
  },[refetch?.certifyjson_v1])
    async function countrycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let countrycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:countryCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          countrycombo_v1Body["dpdKey"] = encryptionDpd;
          countrycombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:countryCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          countrycombo_v1Body['filterData'] = filterData;
        }
        const countrycombo_v1Data:any=await AxiosService.post("/te/eventEmitter",countrycombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=countrycombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(countrycombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_countrycombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_countrycombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (countrycombo_v1Data?.data?.dataset) {
           setdfd_countrycombo_v1Props(
              Array.isArray(countrycombo_v1Data?.data?.dataset?.data)
                 ? countrycombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_countrycombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.countrycombo_v1) {
      countrycombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.countrycombo_v1= true
  },[refetch?.countrycombo_v1])
    async function statecombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let statecombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:stateCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          statecombo_v1Body["dpdKey"] = encryptionDpd;
          statecombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:stateCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
              delete temp?.DFDkey
              filterData.push(temp)
            }           
          }
          statecombo_v1Body['filterData'] = filterData;
        }
        const statecombo_v1Data:any=await AxiosService.post("/te/eventEmitter",statecombo_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        let dstKey:string=statecombo_v1Body?.key || ""
        dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
        if(statecombo_v1Data?.data?.dataset === 'Bulk Data Processing'){
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
        setdfd_statecombo_v1Props(api_paginationData?.data?.records || []);
      }else{
          setdfd_statecombo_v1Props({ hasLogicCenter: false, dstKey: dstKey })
      }
      }else if (statecombo_v1Data?.data?.dataset) {
           setdfd_statecombo_v1Props(
              Array.isArray(statecombo_v1Data?.data?.dataset?.data)
                 ? statecombo_v1Data?.data.dataset.data.map((obj: any) =>
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
        setdfd_statecombo_v1Props(api_paginationData?.data?.records || []);
        }
      }
  useEffect(()=>{
    if (prevRefreshRef?.current?.statecombo_v1) {
      statecombo_v1DFD(paginationData)
    }else 
      prevRefreshRef.current.statecombo_v1= true
  },[refetch?.statecombo_v1])
    async function currencycombo_v1DFD(pagination:any): Promise<void>{
        let filterData :any[] =[];
        let currencycombo_v1Body:te_refreshDto={
          key: "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:currencyCombo:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(pagination?.count) || 10,
          page:parseInt(pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          currencycombo_v1Body["dpdKey"] = encryptionDpd;
          currencycombo_v1Body["method"] = encryptionMethod;
        }
        if(newemployees_v1Props.length > 0){
          for(let i=0;i< newemployees_v1Props.length;i++){
            if(newemployees_v1Props[i].DFDkey == "CK:CT006:FNGK:AF:FNK:DF-DFD:CATK:ECP:AFGK:HRM:AFK:currencyCombo:AFVK:v1"){
              // delete newemployees_v1Props[i].DFDkey;
              let temp=structuredClone(newemployees_v1Props[i])
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
    setnewemployees_v1({...result,_artfactPFRule_:rule})
  }

  async function securityCheck(): Promise<void> {
    const { fetchBatchData } = await import("../utils/Orchestration");
    const data: any = await fetchBatchData(
      'CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1',
      [user],
      'pageNewemployeesV1',
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct006/ecp/hrm/v1';
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
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1"
            }
        })
        }else{
          await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:newEmployees:AFVK:v1"
            }
         })
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        try{
    await bloodgroupcombo_v1DFD(pagination)
    await maritalstatuscombo_v1DFD(pagination)
    await employmenttypecombo_v1DFD(pagination)
    await employeestatuscombo_v1DFD(pagination)
    await gradecodecombo_v1DFD(pagination)
    await vacancystatuscombo_v1DFD(pagination)
    await positioncodecombo_v1DFD(pagination)
    await empworkmodecombo_v1DFD(pagination)
    await gendercombo_v1DFD(pagination)
    await employees_v1DFD(pagination)
    await skilljson_v1DFD(pagination)
    await familyjson_v1DFD(pagination)
    await educationjson_v1DFD(pagination)
    await certifyjson_v1DFD(pagination)
    await countrycombo_v1DFD(pagination)
    await statecombo_v1DFD(pagination)
    await currencycombo_v1DFD(pagination)
          if (security == 'AA' || security == 'RA') {
          allowedGroup.map((nodes:AllowedGroupNode)=>{
            if(nodes?.groupName == 'new_employee_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setChecknew_employee_group(true)
            }
            if(nodes?.groupName == 'dynamicactions' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckdynamicactions(true)
            }
            if(nodes?.groupName == 'basic_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbasic_details_group(true)
            }
            if(nodes?.groupName == 'contact_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcontact_details_group(true)
            }
            if(nodes?.groupName == 'address_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckaddress_details_group(true)
            }
            if(nodes?.groupName == 'identity_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckidentity_details_group(true)
            }
            if(nodes?.groupName == 'employment_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemployment_details_group(true)
            }
            if(nodes?.groupName == 'compensation_details_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcompensation_details_group(true)
            }
            if(nodes?.groupName == 'bank_details' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckbank_details(true)
            }
            if(nodes?.groupName == 'emergency_contact_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckemergency_contact_group(true)
            }
            if(nodes?.groupName == 'skills_education_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckskills_education_group(true)
            }
            if(nodes?.groupName == 'skills_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckskills_group(true)
            }
            if(nodes?.groupName == 'skill' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckskill(true)
            }
            if(nodes?.groupName == 'education_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckeducation_group(true)
            }
            if(nodes?.groupName == 'education' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckeducation(true)
            }
            if(nodes?.groupName == 'cert_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcert_group(true)
            }
            if(nodes?.groupName == 'certification' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckcertification(true)
            }
            if(nodes?.groupName == 'family_detail_group' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckfamily_detail_group(true)
            }
            if(nodes?.groupName == 'famly_details' && (nodes?.security== 'AA' || nodes?.security == 'ATO' || nodes?.security == 'RA'))
            {
              setCheckfamly_details(true)
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
          codeStates['new_employee_group'] = new_employee_group42d78;
          codeStates['setnew_employee_group'] = setnew_employee_group42d78;
          codeStates['dynamicactions'] = dynamicactionsa8358;
          codeStates['setdynamicactions'] = setdynamicactionsa8358;
          codeStates['basic_details_group'] = basic_details_groupd39fd;
          codeStates['setbasic_details_group'] = setbasic_details_groupd39fd;
          codeStates['contact_details_group'] = contact_details_groupa1911;
          codeStates['setcontact_details_group'] = setcontact_details_groupa1911;
          codeStates['address_details_group'] = address_details_groupb72f4;
          codeStates['setaddress_details_group'] = setaddress_details_groupb72f4;
          codeStates['identity_details_group'] = identity_details_group6a6fe;
          codeStates['setidentity_details_group'] = setidentity_details_group6a6fe;
          codeStates['employment_details_group'] = employment_details_group89cd6;
          codeStates['setemployment_details_group'] = setemployment_details_group89cd6;
          codeStates['compensation_details_group'] = compensation_details_groupf9ef1;
          codeStates['setcompensation_details_group'] = setcompensation_details_groupf9ef1;
          codeStates['bank_details'] = bank_details820cd;
          codeStates['setbank_details'] = setbank_details820cd;
          codeStates['emergency_contact_group'] = emergency_contact_group73988;
          codeStates['setemergency_contact_group'] = setemergency_contact_group73988;
          codeStates['skills_education_group'] = skills_education_groupcb53a;
          codeStates['setskills_education_group'] = setskills_education_groupcb53a;
          codeStates['skills_group'] = skills_group36679;
          codeStates['setskills_group'] = setskills_group36679;
          codeStates['skill'] = skill9f89a;
          codeStates['setskill'] = setskill9f89a;
          codeStates['education_group'] = education_group70757;
          codeStates['seteducation_group'] = seteducation_group70757;
          codeStates['education'] = education2393a;
          codeStates['seteducation'] = seteducation2393a;
          codeStates['cert_group'] = cert_groupedb63;
          codeStates['setcert_group'] = setcert_groupedb63;
          codeStates['certification'] = certificationc7d06;
          codeStates['setcertification'] = setcertificationc7d06;
          codeStates['family_detail_group'] = family_detail_group800b7;
          codeStates['setfamily_detail_group'] = setfamily_detail_group800b7;
          codeStates['famly_details'] = famly_detailsb06ea;
          codeStates['setfamly_details'] = setfamly_detailsb06ea;
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
    routes.push("/employees_v1");
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
    setnewemployees_v1((pre:any)=>({...pre,...allRuleData||{}}))
  }, [])

  useEffect(()=>{
    if(newemployees_v1?._artfactPFRule_)
    {
      let data:any ={
        ...decodedTokenObj,
        session:decodedTokenObj,
      }
      handleArtfactRule(newemployees_v1?._artfactPFRule_,data,allRuleData)
    }
  },[])

  const parentRef:any = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (parentRef.current && !parentRef.current.contains(event.target)) {
        setnewemployees_v1((pre:any)=>({...pre,_selectedGroup_:""}))
      }
    };
      document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>

     <div className={clsx("",
        "w-full",
        isDark ? 'text-white' : 'text-black',
        isProcessing && "pointer-events-none select-none"
      )}

      ref={parentRef}
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
        {checknew_employee_group && initialLoad &&<Groupnew_employee_group
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
    