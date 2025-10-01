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
        map((user) => {
          localStorage.setItem("user", JSON.stringify(user));
          return loginSuccess(user);
        }),
        catchError((err) => of(loginFailure(err.message)))
      )
    )
  );
  