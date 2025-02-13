import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import moment from 'moment';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/models/user.model';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
   });
  }

  @Inject()
  private jwtService: JwtService

  @Inject()
  private userRepo: UserRepository
  
  public async validate(payload: any) {
    if (!payload) return new UnauthorizedException()
    return await this.userRepo.getById(payload.id);
  }

  public async verifyJwt(token: string): Promise<User> {
    const payload: any = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET
    }).then(data => data).catch(err => null);

    if (!payload) return null
  
    const user = await this.userRepo.getById(payload.id);
    return user;
  }

  public async signJwt(payload: any) {
    const [token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d'
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '60d'
      })
    ])
    return { token, refresh_token }
  }

  public async signSocialJwt(payload: any, expiresIn: string) {
    const [token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn
      }),
      this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn
      })
    ])
    return { token, refresh_token }
  }

  public calculateExpireDate(date: Date): string {
    const offsetDays = moment(date).day() - moment().day()
    return `${offsetDays}d` 
  }
}
