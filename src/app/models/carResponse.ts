import { Car } from "./car";
import { ResponseModel } from "./responseModel";

export interface CarResponse extends ResponseModel{
    data:Car[],
}