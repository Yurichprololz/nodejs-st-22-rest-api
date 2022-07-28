export enum UserErrors {
  NotExist = "User does'n exist",
  LoginNotUnique = 'The user with this login already exists',
  SequelizeUniqueConstraintError = 'SequelizeUniqueConstraintError',
}
