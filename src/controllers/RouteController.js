"use strict";

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

	const getRouteName = (a, b) => {
		return a < b ? a+''+b : b+''+a;
	}

	const getPaths = (map, nodes) => {
		const [start, end] = nodes;

		const routes = [];

		const nextPaths = (HEAD, pathMemo, burned) => {
			if (HEAD === end) {
				return routes.push(new Array(...pathMemo, HEAD));
			}

			let newBurned = [];
			let node, routeName, newPathMemo;

			for (let p in burned) {
				newBurned[p] = 1;
			}

			for (node of Object.keys(map[HEAD])) {
				routeName = getRouteName(HEAD, node);
				newBurned[routeName] = 1;
			}

			for (node of Object.keys(map[HEAD])) {
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

	let Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.getPaths = function (start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return getPaths(this.map, start);
		} else if (arguments.length === 2) {
			return getPaths(this.map, [start, end]);
		} else {
			return getPaths(this.map, toArray(arguments));
		}
	};

	Graph.getPaths = function (map, start, end) {
		if (Object.prototype.toString.call(start) === '[object Array]') {
			return getPaths(map, start);
		} else if (arguments.length === 3) {
			return getPaths(map, [start, end]);
		} else {
			return getPaths(map, toArray(arguments, 1));
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

function FindRoute (req, res) {
	const {from_x, from_y, to_x, to_y, filter} = req.params;

	
}

module.exports = {
	FindRoute
};