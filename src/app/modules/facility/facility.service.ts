import { IFacility } from "./facility.interface";
import { Facility } from "./facility.model";



const createFacilityIntoDB = async (payload:IFacility)=>{
    const result = await Facility.create(payload)
    
    
    return result;
};

const updateFacilityIntoDB = async(id:string, payload:Partial<IFacility>)=>{
    const result = await Facility.findByIdAndUpdate(id, payload,{new:true});

    return result;
}
const deleteFacilityIntoDB = async(id:string)=>{
    const result = await Facility.findByIdAndUpdate(id, {isDeleted:true},{new:true});

    return result;
}


export const FacilityService = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityIntoDB
}