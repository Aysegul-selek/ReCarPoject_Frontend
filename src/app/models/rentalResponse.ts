import { Rental } from "./rental";
import { ResponseModel } from "./responseModel";

export interface RentalResponse extends ResponseModel{
    data:Rental[],
}