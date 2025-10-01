
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/authActions";
import { authService } from "../../app/services/authService";

export const loginEpic = (action$) =>
  action$.pipe(
    ofType(LOGIN_REQUEST),
    mergeMap((action) =>
      from(authService.login(action.payload)).pipe(
        map((userFromAPI) => {
          const savedUser = localStorage.getItem("user");
          let finalUser = userFromAPI;

          if (savedUser) {
            try {
              const parsed = JSON.parse(savedUser);
              finalUser = {
                ...userFromAPI,
                dob: parsed.dob || "",
                companyAddress: parsed.companyAddress || "",
                homeAddress: parsed.homeAddress || "",
                sex: parsed.sex || userFromAPI.gender || "Male",
              };
            } catch (e) {
              console.warn("Invalid saved user", e);
            }
          } else {
            finalUser = {
              ...userFromAPI,
              dob: "",
              companyAddress: "",
              homeAddress: "",
              sex: userFromAPI.gender || "Male",
            };
          }

          localStorage.setItem("user", JSON.stringify(finalUser));
          return loginSuccess(finalUser);
        }),
        catchError((err) => of(loginFailure(err.message || "Đăng nhập thất bại")))
      )
    )
  );