import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './models/user';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInput } from './dto/input/update-user.input';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { DeleteUserInput } from './dto/input/delete-user.input';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public createUser(createUserArgs: CreateUserInput): User {
    const user: User = {
      userId: uuidv4(),
      ...createUserArgs,
    };

    this.users.push(user);

    return user;
  }

  public updateUser(updateUserArgs: UpdateUserInput): User {
    const user = this.users.find(
      (user) => user.userId === updateUserArgs.userId,
    );

    Object.assign(user, updateUserArgs);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    return this.users.find((user) => user.userId === getUserArgs.userId);
  }

  public getUsers(getUsersArgs: GetUsersArgs): User[] {
    return getUsersArgs.userId.map((userId) => this.getUser({ userId }));
  }

  public deleteUser(deleteUsersArgs: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUsersArgs.userId,
    );

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }
}
