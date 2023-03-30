import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import Token from '../utils/token';
import iLogin from '../interfaces/iLogin';
import iToken from '../interfaces/iToken';
import User from '../database/models/User';

class UserService {
  protected model: ModelStatic<User> = User;

  async login({ email, password }: iLogin): Promise<iToken | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    const passwordCombined = bcrypt.compareSync(password, user.password);
    if (!passwordCombined) return undefined;

    const token = Token.build(email);
    return { token };
  }

  async roleLogin(email :string): Promise<string | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    return user.role;
  }
}

export default UserService;
