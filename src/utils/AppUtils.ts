import moment from "moment";
import { ConvertDateToUtc } from "./DateUtils";

export const isUndefinedOrNull = (variable: any) => {
  if (variable && variable !== null) {
    return false;
  }
  return true;
};

export const getPath = (object: any, search: string): any => {
  if (object?.path === search) return [object.key];
  else if (object.subMenu || Array.isArray(object)) {
    let subMenu = Array.isArray(object) ? object : object.subMenu;
    for (let child of subMenu) {
      let result = getPath(child, search);
      if (result) {
        if (object.path) result.unshift(object.key);
        return result;
      }
    }
  }
};

export const generateQuery = (obj: any) => {
  if (obj !== undefined) {
    let a: string = Object.keys(obj)
      .map((key, index) => {
        let url = "";
        if (
          obj[key] !== undefined &&
          obj[key] !== null &&
          obj[key] !== "" &&
          obj[key].length !== 0
        ) {
          let value = obj[key];
          if (obj[key] instanceof Array) {
            value = obj[key].join(",");
          }
          if (obj[key] instanceof Date) {
            value = ConvertDateToUtc(obj[key]);
          }
          if (moment.isMoment(obj[key])) {
            value = obj[key].utc().format();
          }
          url = key + "=" + encodeURIComponent(value) + "&";
        }
        return url;
      })
      .join("");
    if (a.charAt(a.length - 1) === "&") {
      a = a.substring(0, a.length - 1);
    }
    return a;
  }
  return "";
};
