const db = require("../../data/db-config");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  // TODO
  // console.log(req.params.id);
  try {
    const scheme = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first();
    if (!scheme){
      next({ 
        status: 404,
        message: `scheme with scheme_id ${req.params.scheme_id} not found`,
      })
    } else {
      req.scheme = scheme;
      next()
    } 
  } catch (err) {
    next(err);
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  // TODO
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined || 
    typeof scheme_name !== 'string' ||
    scheme_name.trim().length === 0){
      next({
        status: 400,
        message: 'invalid scheme_name',
      })
    } else {
      next();

    }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  // TODO
  const { instructions, step_number } = req.body;
  const error = { status: 400 };
  if (
    instructions === undefined ||
    !instructions ||
    !instructions.trim() ||
    typeof step_number !== 'number' ||
    step_number < 1
  ){
    error.message = `invalid step`;
    next(error);
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
