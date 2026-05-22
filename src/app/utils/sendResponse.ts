// we are using this file because har baar response ko define karna padega, uska type, statuscode, success, message etc. to har baar code me likhna padega, To hamne sendresponse function bana liya which will be standardized for every response we will send.

import { Response } from "express";

type TResponse<T> = { //<T> = generic type which means that we can use any type for the data property, and it will be determined at the time of calling the sendResponse function. <T> can be a user, product, order, array, string etc. So jab function call hoga tabhi data ka type determina hoga
  statusCode: number;
  success: boolean;
  message?: string; // ? =optional, message ho bhi sakta hai or nahi bhi
  data: T; //T = generic type as above <T> means that data can be of any type.
};
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode ?? 200).json({  //?? means Nullish Coalescing Operator. explained below
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;

//?? means Nullish Coalescing Operator iska matlab agar left side null or undefined hai to right side ka value use karo, otherwise left side ka value use karo. Yaha par agar data.statusCode null or undefined hai to 200 use karo, otherwise data.statusCode use karo.
//we are not using || (or) here because we are checking with the value of null or undefined. || iske saath 0 || 200 to bhi output 200 ayega but with ?? ke saath 0 ?? 200 to output 0 ayega because 0 is not null or undefined. So we are using ?? here to check for null or undefined values.
