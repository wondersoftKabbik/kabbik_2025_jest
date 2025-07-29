import { siteConfig } from "@/config/config";
import { TCommonApiCallArgs } from "@/helpers/commonTypes";
import Cookies from "js-cookie";

export const getHeaders=(defaultTokenAllowed:boolean|undefined,noToken?:boolean,extraHeaders?:any)=>{
  const defaultToken =defaultTokenAllowed===false?'':siteConfig.defaultToken
  const userToken = Cookies.get("token") ? Cookies.get("token") : defaultToken;

  const myHeaders = new Headers();
  if(!noToken){
      myHeaders.append("Authorization", `Bearer ${userToken}`);
  }
  if(extraHeaders){
    for(let x in extraHeaders){
        myHeaders.append(x, extraHeaders[x]);
    }
  }
  myHeaders.append("Content-Type", "application/json");
  return myHeaders;
}


export const CommonApiHandler = async (
    {name,url,method,body,defaultTokenAllowed,catchCB,noToken,extraHeaders}:TCommonApiCallArgs
) => {
    const requestOptions :any= {
    method: method || "GET",
    headers: getHeaders(defaultTokenAllowed,noToken,extraHeaders),
  };
  if(body){
    requestOptions.body = body;
  }
  try {
    const response = await  fetch(url, requestOptions);
    return response.json();
  } catch (err) {
    catchCB && catchCB(err);
    return null;
  }
};