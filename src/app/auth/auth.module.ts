import {NgModule} from '@angular/core';
import {AuthService} from './service/auth.service';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [],
    imports: [
        AuthRoutingModule
    ],
    providers: [AuthService]
})
export class AuthModule {
}
