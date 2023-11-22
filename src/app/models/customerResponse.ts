import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface Customeresponse extends ResponseModel{
    data:Customer[],
}