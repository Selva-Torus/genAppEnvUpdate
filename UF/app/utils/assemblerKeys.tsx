import UOmapperData from '@/context/dfdmapperContolnames.json'


export function getRouteScreenDetails(key: string, artfactName: string,other:string=''): string {
  let assemblerKeys: any = [
  {
    "screenName": "dashboard",
    "screensName": "dashboard-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:hrmDashboard:AFVK:v1"
  },
  {
    "screenName": "employees",
    "screensName": "employees-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employees:AFVK:v1"
  },
  {
    "screenName": "access request",
    "screensName": "access_request-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:accessRequest:AFVK:v1"
  },
  {
    "screenName": "leave management",
    "screensName": "leave_management-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leaveRequest:AFVK:v1"
  },
  {
    "screenName": "background check",
    "screensName": "background_check-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:backgroundCheck:AFVK:v1"
  },
  {
    "screenName": "performance review",
    "screensName": "performance_review-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceReview:AFVK:v1"
  },
  {
    "screenName": "job grades",
    "screensName": "job_grades-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobGrades:AFVK:v1"
  },
  {
    "screenName": "job position",
    "screensName": "job_position-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:employeeJobPositions:AFVK:v1"
  },
  {
    "screenName": "leave policy",
    "screensName": "leave_policy-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:leavePolicy:AFVK:v1"
  },
  {
    "screenName": "performance cycle",
    "screensName": "performance_cycle-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:ECP:AFGK:HRM:AFK:performanceCycles:AFVK:v1"
  }
]

  let routeScreen: string = artfactName
  let isKeyInAssem:boolean=false

  assemblerKeys.forEach((item: any) => {
    if (item.ufKey == key) {
      routeScreen = item.screensName.replace('-v','_v')
      isKeyInAssem=true
    }
  })
  if(other!=''&&isKeyInAssem==false)
  {
    return 'not in assembler'
  }

  return routeScreen
}

export function getFilterProps(filterProps:any=[],mainData:any={}) {
  let result:any = [];  
  try{
  filterProps?.map((dfdData:any)=>{
    dfdData?.nodeBasedData?.map((nodes:any)=>{
      let filterObj:any = {}
      Object.keys(nodes?.object||{}).map((keys:any)=>{
        const mapperEntry = nodes?.object[keys]
        const mapperData = (UOmapperData as Record<string, any>)[mapperEntry]
        if (!mapperData) return
        const value = mainData[mapperData["source"]]
        if (value !== undefined) filterObj[keys] = value
      })
      result.push({
      DFDkey:dfdData.key,
      nodeId:nodes.nodeId,
      ...filterObj
    })
    }) 
  })
  return result;
}catch(e){
  console.log(e);
}
}

