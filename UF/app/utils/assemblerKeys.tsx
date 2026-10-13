import UOmapperData from '@/context/dfdmapperContolnames.json'


export function getRouteScreenDetails(key: string, artfactName: string,other:string=''): string {
  let assemblerKeys: any = [
  {
    "screenName": "my transaction",
    "screensName": "my_transaction-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:transactionProduct:AFVK:v1"
  },
  {
    "screenName": "wps",
    "screensName": "wps-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:wps:AFVK:v1"
  },
  {
    "screenName": "returns and refunds",
    "screensName": "returns_and_refunds-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:returnsRefund:AFVK:v1"
  },
  {
    "screenName": "enquiry",
    "screensName": "enquiry-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:enquiry:AFVK:v1"
  },
  {
    "screenName": "registration",
    "screensName": "registration-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:registration:AFVK:v1"
  },
  {
    "screenName": "dashboard",
    "screensName": "dashboard-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:dashboard:AFVK:v1"
  },
  {
    "screenName": "sif summary  report",
    "screensName": "sif_summary__report-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:sifSummaryReport:AFVK:v1"
  },
  {
    "screenName": "pif summary report",
    "screensName": "pif_summary_report-v1",
    "ufKey": "CK:CT005:FNGK:AF:FNK:UF-UFW:CATK:GSS:AFGK:WPS:AFK:pifSummaryReport:AFVK:v1"
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

