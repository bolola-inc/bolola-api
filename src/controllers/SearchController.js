/*
* Search Controller
*/

const models = require('../models');


async function GetSearchHistory(req, res){
    const search = await models.SearchHistory.findAll()
    console.log(search) 
}

async function CreatSearchHistory (req,res) {
    const search = await models.Search.create(req.body)
    res.send(search);
}

function GetSearchHistory(req, res) {
    const username = req.params.username;

    res.send(username);
}


module.exports = {
    GetSearchHistory
}

