import { Router } from "express";
import User from "../models/ScoreCard";
const router = Router();

router.delete("/cards", (req, res) => {
    res.json({message: 'Database cleared'});
    deleteDB()
});

let alreadyExist = false;
router.post("/card", async (req, res) => {
    const {name, subject, score} = req.body
    console.log("exist_before: " ,alreadyExist)
    await saveUser(name, subject, score)
    console.log("exist_after: " ,alreadyExist)
    if (alreadyExist === true){
        res.json({message: 'Updating (' + name + ', ' + subject + ', ' + score + ')'});
        alreadyExist = false
    }
    else{
        res.json({message: 'Adding (' + name + ', ' + subject + ', ' + score + ')'});
        
    }
    
    
});


router.get("/cards", (req, res) => {
    res.json({message: 'Get a get request'})
});

const deleteDB = async () => {
    try {
    await User.deleteMany({});
    console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
   };

const saveUser = async (name, subject, score) => {
    const existing = await User.findOneAndUpdate({ name, subject }, {name: name, subject:subject, score:score}, {new:true});
    if (existing) {
        alreadyExist = true
        console.log("exist: ", alreadyExist)
        try{
            return;
        } catch(e){throw new Error("User creation error: " + e);}
    }
    else{
        alreadyExist = false
        console.log("exist: " ,alreadyExist)
        try {
            const newUser = new User({ name, subject, score });
            console.log("Created user", newUser);
            return newUser.save();
            } catch (e) { throw new Error("User creation error: " + e); }
    }
};

export default router; 