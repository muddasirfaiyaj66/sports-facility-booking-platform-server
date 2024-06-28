import { TErrorSources, TGenericErrorResponse } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err:any):TGenericErrorResponse =>{
    const pattern = /"([^"]*)"/;

const match = err.message.match(pattern);

const extractedMessage = match && match[1];
const statusCode = 400;
const errorSources:TErrorSources = [{
    path:'',
    message:`${extractedMessage} is already exist`
}]
return {
  statusCode,
  message: 'Duplicate Error',
  errorSources,
};

}


export default handleDuplicateError;