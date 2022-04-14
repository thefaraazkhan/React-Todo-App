const {check, validationResult} = require("express-validator");

exports.signupValidator = [
    check('firstName')
    .not().isEmpty()
    .trim()
    .withMessage('All fields required'),

    check('lastName')
    .not().isEmpty()
    .trim()
    .withMessage('All fields required'),

    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email'),

    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')


];

exports.signinValidator = [

    check('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid credentials'),

];

exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty()

    if(hasErrors){
        const firstError = result.array()[0].msg;
        return res.json({
            errorMessage: firstError
        });
    };
    
    next();
}


