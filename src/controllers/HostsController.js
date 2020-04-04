/**
 * Users Controller
 */

const { sequelize } = require('../models/index');
const Stations = sequelize.import('../models/Stations.js');

const models = require("../models")

const hosts = [

	{id: 1, name: "Yerevan " , email: "YerevanQaxaqapetaran@gmail.com", stations: [{name: "Hin Krug", position: {x: 10,y: 32}}] },
	{id: 2, name: "Moskva" , email: "MoskvaQaxaqapetaran@gmail.com", stations: [{name: "Prk Gorkovo", position: {x: 160,y: 42}}]},
	{id: 3, name: "Stambul" , email: "StambulQaxaqapetaran@gmail.com", stations: [{name: "mechet alam", position: {x: 54, y: 634}}]},
	{id: 4, name: "Washington" , email: "WashingtonQaxaqapetaran@gmail.com", stations: [{name: "oracle", position: {x: 74, y: 44}}]},
	{id: 5, name: "Amsterdam" , email: "AmsterdamQaxaqapetaran@gmail.com", stations: [{name: "kissing park", position: {x: 104, y: 50}}]},
	{id: 6, name: "Oslo" , email: "OsloQaxaqapetaran@gmail.com", stations: [{name: "At the bakery", position: {x: 48, y: 274}}]},


]

function CreateHost (req, res) {

	const course = {

		id: hosts.length + 1,
		name: req.body.name,
		email: req.body.email
	}
	hosts.push(course)
	res.send(course)

}

function UpdateHost (req, res) {

	const course = hosts.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The hosts with given ID was not found')
		
    course.name = req.body.name
    course.email = req.body.name;
    res.send(course)

}

async function GetHosts (req, res) {
  const hosts = await models.Hosts.findAll()
  console.log(hosts)
}
function GetHostById (req, res) {
    

	const course = hosts.find(h => h.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The hosts with given ID was not found')
		res.send(course)
}



function DeleteHost (req, res) {

  const course = hosts.find(h => h.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The hosts with given ID was not found')

   const index = hosts.indexOf(course)
   hosts.splice(index, 1)
   
   res.send(course)


}

module.exports = {
  CreateHost,
  UpdateHost,
  GetHosts,
  DeleteHost,
  GetHostById
};
