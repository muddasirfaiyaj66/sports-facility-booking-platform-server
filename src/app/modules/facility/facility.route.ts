


import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { FacilityValidations } from "./facility.validation";
import { FacilityController } from "./facility.controller";

const router = express.Router()

router.post('/', auth(USER_ROLE.admin), validateRequest(FacilityValidations.createFacilitySchema),FacilityController.createFacility);


export const FacilityRoutes = router;