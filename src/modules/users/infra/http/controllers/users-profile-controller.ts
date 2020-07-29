import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserProfileService from '@modules/users/services/update-user-profile-service';
import ShowProfileService from '@modules/users/services/show-profile-service';

export default class UsersProfileController {
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const updateUser = container.resolve(UpdateUserProfileService);

    const user = await updateUser.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    return res.json(user);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(user_id);

    return res.json(user);
  }
}
