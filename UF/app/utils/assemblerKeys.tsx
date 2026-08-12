import UOmapperData from '@/context/dfdmapperContolnames.json'


export function getRouteScreenDetails(key: string, artfactName: string,other:string=''): string {
  let assemblerKeys: any = [
  {
    "screenName": "dashboard",
    "screensName": "dashboard-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:newDashboard:AFVK:v1"
  },
  {
    "screenName": "report",
    "screensName": "report-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFR:CATK:LAP:AFGK:LAP:AFK:report:AFVK:v1"
  },
  {
    "screenName": "filing packages",
    "screensName": "filing_packages-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "submissions hub",
    "screensName": "submissions_hub-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "service tracking",
    "screensName": "service_tracking-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "judgments",
    "screensName": "judgments-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "enforcement",
    "screensName": "enforcement-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "kill-switch control",
    "screensName": "kill-switch_control-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "compliance",
    "screensName": "compliance-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
  },
  {
    "screenName": "analytics",
    "screensName": "analytics-v1",
    "ufKey": "CK:CT006:FNGK:AF:FNK:UF-UFW:CATK:LAP:AFGK:LAP:AFK:lapTestScreen:AFVK:v1"
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

