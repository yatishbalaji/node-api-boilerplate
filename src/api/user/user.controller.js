/**
 * @fileOverview  User Controller
 * @author Darshit Vora
 * @class User\Controller
 * @memberof User
 * @return {UserMethods}
 */

const service = require('./user.service');
const db = require('../../conn/sqldb');

// const { BUCKET } = require('../../config/environment');
const messagesMap = {
  201: 'Your account created successfully.',
  409: 'Duplicate',
};

const { User } = db;

/**
 * Create new user in DB
 * @author Darshit Vora
 * @version 0.0.1
 * @async
 * @function
 * @name POST / - create
 * @memberof User\Controller
 * @param {string}
 * @returns {Object} Returns user creation confirmation
 */
async function create(req, res, next) {
  try {
    const status = await service.signup(req.body);

    return res.json({ message: messagesMap[status.code], id: status.id });
  } catch (err) {
    return next(err);
  }
}

/**
 * Find all the users in DB
 * @author Darshit Vora
 * @version 0.0.1
 * @async
 * @name GET / - index
 * @function
 * @memberof User\Controller
 *
 * @param {string}
 * @returns {Array} Returns array of user object
 */
async function index(req, res, next) {
  try {
    const limit = 100;
    const offset = 0;

    const users = await User.findAll({
      limit,
      offset,
    });

    return res.json(users);
  } catch (err) {
    return next(err);
  }
}

/**
 * Returns single user as per id
 * @author Darshit Vora
 * @version 0.0.1
 * @async
 * @function
 * @name GET /:id - getUser
 * @memberof User\Controller
 *
 * @param {string} id is used to identify user to be returned
 * @returns {Object} Returns user object
 */
async function getUser(req, res, next) {
  try {
    const user = await User.findOne({
      attributes: ['id', 'mobile', 'name', 'email'],
      where: { id: req.params.id },
      raw: true,
    });
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

/**
 * Updates single user as per id
 * @author Darshit Vora
 * @version 0.0.1
 * @async
 * @function
 * @name PUT /:id - update
 * @memberof User\Controller
 *
 * @param {string} id is used to identify user to be updated
 * @returns {Object} Returns user object
 */
async function update(req, res, next) {
  const SUCCESS = 200;
  try {
    await User.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );
    return res.sendStatus(SUCCESS);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  index,
  getUser,
  update,
};
