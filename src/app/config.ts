import { NavigationStart } from '@angular/router'

//import { ROUTES_CHANGE } from '../store/core/core.actions'
import { USER_LOGGED_IN } from './store/actions/login.actions'

export function config (ngRedux, router, authService) {
//    router.events.subscribe(ev => {
//        if (ev instanceof NavigationStart) {
//            ngRedux.dispatch({
//            type: ROUTES_CHANGE
//            })
//        }
//    })

   if (authService.isUserAuthenticated()) {
       
       ngRedux.dispatch({
           type: USER_LOGGED_IN,
           result: {
               obj: true,
               status: true
           }
       });
   }
}