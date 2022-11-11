import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { BcryptService } from './bcrypt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers:[
        BcryptService,
        AuthenticationService
    ],
    exports:[
        BcryptService,
        AuthenticationService
    ],
    imports:[
        JwtModule.register({
            secret:'hsaAfj%.@gyusGds73juhu*&^shdjDhf',
            signOptions:{expiresIn:'30d'}
        })
    ]
})
export class UtilityModule {}
