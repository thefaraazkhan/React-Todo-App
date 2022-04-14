const Admin = require("../src/models/AdminRegister");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {jwtSecret, jwtExpire} = require("../config/keys");
const Messages = require("../src/models/messageModel");



const signupController = async(req, res) => {
    

    const {firstName, lastName, email, password} = req.body;
    // console.log(req.body)

    try {
        const admin = await Admin.findOne({email})
        if(admin){
            return res.json({
                errorMessage: 'email already exists'
            });
        }else{

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            

            const newAdmin = new Admin({
                firstName: firstName,
                lastName:lastName,
                email: email,
                password: hashPassword
            })

            await newAdmin.save()
                .then( res.json({ 
                    successMessage: "You are registered please login"
                }) 
                    )

        }
        
    } catch (error) {
        // console.log(error);
        res.json({
            errorMessage: "Server error"
        })
    }


}





const signinController = async(req, res) => {
    

    const {email, password} = req.body;
    // console.log(email)

    try {

        const admin = await Admin.findOne({email})
        if(!admin){
            return res.json({
                errorMessage: 'Invalid credentials'
            })

        }else{
            const passwordMatch = await bcrypt.compare(password, admin.password);
            // console.log(passwordMatch);

            if(!passwordMatch){
                return res.json({
                    errorMessage: "Invalid credentials",
                })
                
            }else{
                const payload = {
                    admin: {
                        _id: admin._id
                    }
                };

                jwt.sign(payload, jwtSecret, {expiresIn: jwtExpire}, (err, token) =>{

                
                    if(err) console.log('jwt error:', err);
                    const {_id, firstName, lastName, email, isAdmin, isSuperAdmin} = admin;

                    res.json({
                        token,
                        admin: {_id, firstName, lastName, email, isAdmin, isSuperAdmin},
                    
                    })

            })

        }
        }
    } catch (error) {
        console.log(error)
    }

}


const getAdminById = async(req, res) => {
    const admin = await Admin.find({ _id: req.params.id });
    res.json(admin);
}





// const getAllUsers = async (req, res, next) => {
//     try {
//         console.log(req.params.id, "thisisi")
//       const users = await Admin.find({ _id: { $ne: req.params.id } }).select([
//         "email",
//         "firstName",
//         "lastName",
//         "_id",
//       ]);
//       return res.json(users);
//     } catch (ex) {
//       next(ex);
//     }
//   };


const getAllUsers = async (req, res, next) => {
    try {
        const idFromLocalStorage = req.params.id;
        const to = req.query.to;
      const usersInteraction = await Messages.find({
        users: {
            $all: [idFromLocalStorage, to],
      }
    });

    const allInteractedUserIdArray = [];
    for(var i=0; i<usersInteraction.length; i++){
        allInteractedUserIdArray.push(usersInteraction[i].users[0]);   //with whom admin interact

    }
    let uniqueChars = allInteractedUserIdArray.filter((element, index) => {
        return allInteractedUserIdArray.indexOf(element) === index;
    });
    
    const allInteractedUsers = await Admin.find({ _id: { $in: uniqueChars } }).select([
        "email",
        "firstName",
        "lastName",
        "_id",
    ]);

    const allInteractedUsersExceptMe = allInteractedUsers.filter((user, index) => {
        // return allInteractedUserIdArray.indexOf(element) === index;
        return user._id != idFromLocalStorage
    });


      return res.json(allInteractedUsersExceptMe);
    } catch (ex) {
      next(ex);
    }
  };





module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
    //   console.log(msg,"asdf")
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports ={signupController, signinController, getAdminById, getAllUsers};
        
        
    
    
