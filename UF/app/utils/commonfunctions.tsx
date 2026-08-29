
'use client'
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import { useContext } from "react";
export function normalToDynamicArrayCopyFormData(copiedData:any,type:any,state:any,setState:any=()=>{})
{

    if(type=='object')
    {
        setState({...state,...copiedData})
    }else{

    }
}

export function useHandleGroupArrayCopyFormData(){
    const AllStates:any = useContext(TotalContext) as TotalContextProps;
    return(copiedData:any,type:any,arraygroupName:any)=>{

        if(arraygroupName=="grouparray494e0")
        {
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray494e0_0,AllStates.setgrouparray494e0_0)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray494e0_1,AllStates.setgrouparray494e0_1)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray494e0_2,AllStates.setgrouparray494e0_2)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray494e0_3,AllStates.setgrouparray494e0_3)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray494e0_4,AllStates.setgrouparray494e0_4)
            normalToDynamicArrayCopyFormData(copiedData,type,AllStates.grouparray494e0_5,AllStates.setgrouparray494e0_5)
        }
    }
}


export function flattenKeepInner(obj:any, result:any = {}) {
  for (let key in obj) {
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[key] = value; // keep the parent key
      flattenKeepInner(value, result); // also spread inner keys
    } else {
      result[key] = value;
    }
  }
  return result;
}