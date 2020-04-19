/**
 * Users Controller
 */

const { sequelize } = require('../models/index');
const Stations = sequelize.import('../models/Stations.js');

const models = require("../models")


async function CreateHost (req, res) {

	const host = await models.Hosts.create(req.body)
	console.log(req.body)
	res.send(host)
} 

async function UpdateHost (req, res) {

	/*const course = models.Hosts.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The hosts with given ID was not found')*/
	const hosts = await models.Hosts.findOne({
		where : {
			id : req.params.id
		}
	})
		hosts.email = req.body.email
		await hosts.save()
		res.send(hosts)
}

async function GetHosts (req, res) {

   const hosts = await models.Hosts.findAll()
   console.log(hosts)
   res.send(hosts)

}

async function GetHostById (req, res) {

	const hosts = await models.Hosts.findOne({
		where: {
			id : req.params.id
		}
	})
		console.log(hosts)
		res.send(hosts)

   // res.send(hosts[parseInt(req.params.id)-1])
	/*const hosts = models.Hosts.find(h => h.id === parseInt(req.params.id));
	if (!hosts) res.status(404).send('The hosts with given ID was not found')
		res.send(hosts)*/
}


async function DeleteHost (req, res) {

  const hosts = await models.Hosts.destroy({
  	where : {
  		id : req.params.id
  	}
  })
}

module.exports = {
  CreateHost,
  UpdateHost,
  GetHosts,
  DeleteHost,
  GetHostById
};
