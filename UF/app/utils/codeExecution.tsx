export const codeExecution = (codeString: string, paramsObject: any) => {
    const keys = Object.keys(paramsObject)
    const values = Object.values(paramsObject)
  
    const runCode = new Function(...keys, `${codeString};`)
    return runCode(...values)
  }
  export function validatedCondition(condition:string,data:any,methodtype:string='Single')
{
  try {
    const evaluate = (record: any): boolean => {
      const fn = new Function('obj', `with(Object(obj)){ return !!(${condition}); }`);
      return fn(record ?? {});
    };
    if (methodtype === 'Single') {
      const record = Array.isArray(data) ? data?.at(-1) : data;
      return evaluate(record);
    }
    return false;
  } catch {
    return false;
  }
}