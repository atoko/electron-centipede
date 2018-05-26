import bug from './bug.reducer';
import { X_WIDTH, Y_HEIGHT } from './constants';

let bugReducer = (state, action) => {
	let { bugs, walls } = state;
	switch (action.type) {
		case "SPAWN_BUG":
			return [...bugs, bug(undefined, action)];
		case "GAME_TICK":
			return bugs
				.map((b) => bug(b, action, walls))
				.filter((b) => b.gc === false);
		default:
			return bugs;
	}
}

let wallReducer = (state, action) => {
	let { bugs, walls } = state;
	switch (action.type) {
		case "GAME_TICK":
			let deadBugs = bugs.filter((bug) => {
				return bug.hp === 0;
			}).map((b) => ({x: b.x, y: b.y}));
			return [ ...walls, ...deadBugs ];
		default:
			return walls;
	}
}

let shipReducer = (state, action) => {
	let { ship } = state;
	switch(action.type) {
		case "NEW_GAME":			
			return { 
				x: 32, 
				y: 63, 
			};
	}
	return ship;
}

let grid = (state = null, action) => {
	switch(action.type) {
		case "NEW_GAME":			
			return { 
				bugs: [], 
				walls: [], 
				ship: shipReducer(state, action) 
			};
		case "SPAWN_BUG":
		case "GAME_TICK":
			let bugs = bugReducer(state, action);
			let walls = wallReducer(state, action);
			return { ...state, bugs, walls };
	}
	return state;
}

let centipede = grid;
export default centipede;