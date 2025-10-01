
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { cartService } from '../../app/services/cartService';
import { removeFromCart, updateQty, setCart } from '../actions/cartActions';


export const removeFromCartEpic = (action$) =>
  action$.pipe(
    ofType('REMOVE_FROM_CART_ASYNC'),
    mergeMap(action =>
      from(cartService.removeItem(action.payload)).pipe(
        map(() => removeFromCart(action.payload)),
        catchError(error => {
          console.error('Remove item error:', error);
          return of({ type: 'REMOVE_FROM_CART_FAILED' });
        })
      )
    )
  );


export const updateQtyEpic = (action$) =>
  action$.pipe(
    ofType('UPDATE_QTY_ASYNC'),
    mergeMap(action => {
      const { id, type } = action.payload;
      const currentItem =  null;

     
      return from(cartService.fetchCart()).pipe(
        map(items => setCart(items)),
        catchError(error => {
          console.error('Update qty error:', error);
          return of({ type: 'UPDATE_QTY_FAILED' });
        })
      );
    })
  );


export const loadCartEpic = (action$) =>
  action$.pipe(
    ofType('LOAD_CART_REQUEST'),
    mergeMap(() =>
      from(cartService.fetchCart()).pipe(
        map(items => setCart(items)),
        catchError(error => {
          console.error('Load cart error:', error);
          return of({ type: 'LOAD_CART_FAILED' });
        })
      )
    )
  );

export const cartEpics = [removeFromCartEpic, updateQtyEpic];