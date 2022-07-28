import { ConflictException } from '@nestjs/common';
import { FindOptions, Op } from 'sequelize';
import { UserErrors } from 'src/users/helpers/user.errors.enum';

const getFindOptions = (
  limit: number,
  offset: number,
  loginSubstring: string | undefined,
) => {
  const opt: FindOptions = {
    where: {
      isDeleted: false,
      login: {
        [Op.iLike]: loginSubstring ? `%${loginSubstring}%` : '%',
      },
    },
  };

  if (limit) {
    opt.where;
    opt.limit = limit;
    opt.offset = offset;
  }
  return opt;
};

const getFindOneOptions = (id: string): FindOptions => {
  return {
    where: {
      id,
      isDeleted: false,
    },
  };
};

const isUniqueConstraintError = (error: Error) => {
  if (error.name === UserErrors.SequelizeUniqueConstraintError) {
    throw new ConflictException(UserErrors.LoginNotUnique);
  }
};

export { getFindOneOptions, getFindOptions, isUniqueConstraintError };
