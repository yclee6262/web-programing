import express from 'express';
import {genNumber, getNumber} from '../core/getNumber';
const router = express.Router()

let ans
console.log(genNumber())
router.post('/start', (_, res) => {
    genNumber() // ⽤亂數產⽣⼀個猜數字的 number
//    console.log('ans =', ans)
//    res.status(200).send({msg: 'The game has started.'})
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    const input_num = req.query.guess
    ans = getNumber()
    console.log("input = ", input_num)
    console.log("ans = ", ans)
    if (input_num > 100 || input_num < 1) {
        res.status(406).send({msg: 'Not a legal number.' })
    }else if (Number(input_num) < ans){
        res.json({msg: "Bigger"})
    }else if(Number(input_num) > ans){
        res.json({msg: "Smaller"})
    }else if(Number(input_num) === ans){
        res.json({msg: "Equal"})
        genNumber()
        ans = getNumber()
        console.log("win, new ans = ", ans)
    }
})
router.post('/restart', (_, res) => {
    genNumber()
    res.json({msg: 'The game has restarted.' })
})
export default router