"use strict";

const utils = require('../utils/index');
const { sequelize } = require('../models/index');
const Stations = sequelize.import('../models/Stations.js');

/**
 * Component for solving k shortest paths problem.
 * 
 * Graph class component uses Yen's Algorithm (uses Dijkstra's Algorithm) to find the k shortest paths and returns paths and the cost of each path.
 * 
 * @since 0.0.1
 * @access private
 * 
 * @class
 * 
 * @param {Object} map Graph structure that represents relations between nodes and their cost.
 * 
 * @return {Class} Graph class.
 */
const Graph = (function (undefined) {

	const extractKeys = (obj) => {
		let keys = [], key;
		for (key in obj) {
		    Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
		}
		return keys;
	}

	const sorter = (a, b) => {
		return parseFloat(a) - parseFloat(b);
	}

	const routeSorter = (routes) => {
		if (routes.length <= 1) {
			return routes;
		}

		const supportElement = routes[0],
			  smallerElements = [],
			  biggerElements = [];

		for (let i = 1; i < routes.length; i++) {
			if (routes[i][0] <= supportElement[0]) {
				smallerElements.push(routes[i]);
			} else {
				biggerElements.push(routes[i]);
			}
		}

		return routeSorter(smallerElements).concat([supportElement]).concat(routeSorter(biggerElements));
	}

	const getRouteName = (a, b) => {
		return a < b ? a+''+b : b+''+a;
	}

	const getAllPaths = (map, start, end) => {
		const routes = [];

		const nextPaths = (HEAD, pathMemo, burned) => {
			if (HEAD === end) {
				return routes.push(new Array(...pathMemo, HEAD));
			}

			const keys = Object.keys(map[HEAD]);
			const newBurned = [];
			let node, p, routeName, newPathMemo;

			for (p in burned) {
				newBurned[p] = 1;
			}

			for (node of keys) {
				routeName = getRouteName(HEAD, node);
				newBurned[routeName] = 1;
			}

			for (node of keys) {
				routeName = getRouteName(HEAD, node);

				if (!burned[routeName]) {
					newPathMemo = new Array(...pathMemo, HEAD);

					newPathMemo[0] += map[HEAD][node];

					nextPaths(node, newPathMemo, newBurned);
				}
			}
		};

		nextPaths(start, [0], []);

		return routes;
	}

	const getPaths = (map, nodes, n) => {
		const [start, end] = nodes;

		let paths = getAllPaths(map, start, end);
		paths = routeSorter(paths);

		return n ? paths.slice(0, n) : paths;
	}

	const findPaths = (map, start, end, infinity = Infinity) => {
		let copy = null;

		let costs = {},
		    open = {'0': [start]},
		    predecessors = {},
		    keys;

		let addToOpen = (cost, vertex) => {
			let key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(vertex);
		}

		costs[start] = 0;

		while (open) {
			if (!(keys = extractKeys(open)).length) break;

			keys.sort(sorter);

			let key = keys[0],
			    bucket = open[key],
			    node = bucket.shift(),
			    currentCost = parseFloat(key),
			    adjacentNodes = map[node] || {};

			if (!bucket.length) delete open[key];

			for (let vertex in adjacentNodes) {
			    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
					let cost = adjacentNodes[vertex],
					    totalCost = cost + currentCost,
					    vertexCost = costs[vertex];

					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
						costs[vertex] = totalCost;
						addToOpen(totalCost, vertex);
						predecessors[vertex] = node;
					}
				}
			}

			if (costs[end] && costs[end] !== copy) {
				copy = costs[end];
			}
		}

		if (costs[end] === undefined) {
			return null;
		} else {
			predecessors['cost'] = costs[end];
			return predecessors;
		}

	}

	const extractShortest = (predecessors, end) => {
		let nodes = [],
		    u = end;

		while (u !== undefined) {
			nodes.push(u);
			u = predecessors[u];
		}

		nodes.reverse();
		nodes.unshift(predecessors.cost);
		return nodes;
	}

	const findShortestPath = (map, nodes) => {
		let start = nodes.shift(),
		    end,
		    predecessors,
		    path = [],
		    shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = findPaths(map, start, end);

			if (predecessors) {
				shortest = extractShortest(predecessors, end);

				if (nodes.length) {
					path.push.apply(path, shortest.slice(0, -1));
				} else {
					return path.concat(shortest);
				}
			} else {
				return null;
			}

			start = end;
		}
	}

	const toArray = (list, offset) => {
		try {
			return Array.prototype.slice.call(list, offset);
		} catch (e) {
			let a = [];
			for (let i = offset || 0, l = list.length; i < l; ++i) {
				a.push(list[i]);
			}
			return a;
		}
	}

	const isUnique = (path, paths) => {
		const s = path.join(``);

		for (let p of paths) {
			if (s === p.join(``))
				return false;
		}

		return true;
	}

	const kShortestPaths = (map, nodes, k, infinity = Infinity) => {
		
		const [start, end] = nodes;

		const paths = [];
		paths[0] = findShortestPath(map, [start, end]);

		let heap = [];

		for (let n = 1; n < k; n++) {
			const p = paths[0];

			for (let i = 1; i < p.length - 1; i++) {
				const _map = utils.cloneObject(map);

				for (let path of paths) {
					for (let d = 1; d < path.length - 1; d++) {
						if (path[d] === p[i]) {
							_map[path[d]][path[d+1]] = infinity;
							_map[path[d+1]][path[d]] = infinity;
						}
					}
				}

				const _p = findShortestPath(_map, [start, end]);
				if (isUnique(_p, paths)) {
					heap.push(_p);
				}

			}

			heap = routeSorter(heap);
			paths.unshift(heap[0]);

			heap = [];
		}

		return paths.reverse();

	}

	let Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.kShortestPaths = function (start, end, n) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return kShortestPaths(this.map, start, end);
		} else if (arguments.length === 3) {
			return kShortestPaths(this.map, [start, end], n);
		} else {
			return kShortestPaths(this.map, toArray(arguments), n);
		}
	};

	Graph.kShortestPaths = function (map, start, end, n) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return kShortestPaths(map, start, end);
		} else if (arguments.length === 4) {
			return kShortestPaths(map, [start, end], n);
		} else {
			return kShortestPaths(map, toArray(arguments, 1), n);
		}
	}

	Graph.prototype.getPaths = function (start, end, n) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return getPaths(this.map, start, end);
		} else if (arguments.length === 3) {
			return getPaths(this.map, [start, end], n);
		} else {
			return getPaths(this.map, toArray(arguments), n);
		}
	};

	Graph.getPaths = function (map, start, end, n) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return getPaths(map, start, end);
		} else if (arguments.length === 4) {
			return getPaths(map, [start, end], n);
		} else {
			return getPaths(map, toArray(arguments, 1), n);
		}
	}

	Graph.prototype.findShortestPath = function (start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(this.map, start);
		} else if (arguments.length === 2) {
			return findShortestPath(this.map, [start, end]);
		} else {
			return findShortestPath(this.map, toArray(arguments));
		}
	};

	Graph.findShortestPath = function (map, start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return findShortestPath(map, start);
		} else if (arguments.length === 3) {
			return findShortestPath(map, [start, end]);
		} else {
			return findShortestPath(map, toArray(arguments, 1));
		}
	};

	return Graph;

})();

// Filling stations table
(async function() {
	const rand = (min, max) => Math.floor(Math.random() * (max-min)) + min;

	const n = 100;

	Stations.destroy({ where: {}, truncate: true });

	for (let i = 1; i <= n; i++) {
		try {
			await Stations.create({
				id: i,
				long: rand(2,15),
				lat: rand(2,15),
				createdAt: '2000-11-11', 
				updatedAt: '2000-11-11', 
				deletedAt: '2000-11-11'
			});
		}
		catch (e) { /* ignore... */ }
	}
})();

const distance = (x1, y1, x2, y2) => {
	return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
}

const generateMap = async (from, to, filter) => {
	// for time only (yet)
	const speed = 0.1;
	const map = {
		s: {}, // start
		e: {}  // end
	};

	const stations = await Stations.findAll({ attributes: ['id', 'long', 'lat'] });

	for (let station1 of stations) {
		let data1 = station1.dataValues;
		map[data1.id] = {};

		for (let station2 of stations) {
			let data2 = station2.dataValues;

			if (data2.id !== data1.id) {
				let d = distance(+data1.long, +data1.lat, +data2.long, +data2.lat);
				let t = d / speed;

				map[data1.id][data2.id] = t;
			}
		}
	}

	for (let station of stations) {
		let data = station.dataValues;

		let t1 = distance(+from[0], +from[1], +data.long, +data.lat) / speed;
		let t2 = distance(+to[0], +to[1], +data.long, +data.lat) / speed;

		map['s'][data.id] = t1;
		map[data.id]['s'] = t1;

		map['e'][data.id] = t2;
		map[data.id]['e'] = t2;
	}

	return map;
}


async function FindRoute (req, res) {
	const {from_x, from_y, to_x, to_y, filter, n} = req.query;

	const map = await generateMap([from_x, from_y], [to_x, to_y], filter);
	const graph = new Graph(map);

	console.time('routes');
	const routes = graph.kShortestPaths('s', 'e', n);
	console.timeEnd('routes');

	let output = ``;
	const decimalPlace = 1e2;

	for (let i in routes) {
		let route = routes[i];

		let p = Math.floor(route.shift() * decimalPlace) / decimalPlace;
		let r = route.join(' -> ');

		output += (+i+1) + ') ' + r + ' ' + p + '\n\n'; 
	}

	res.end(output);
}

module.exports = {
	FindRoute,
};
