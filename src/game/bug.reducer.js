import { X_WIDTH, Y_HEIGHT } from './constants';

let defaultBug = () => ({
	x: 0,
	y: 0,
	forward: true,
	hp: 5,
	gc: false
});

let bug = (state = defaultBug(), action, walls) => {
	const { x, y, forward, hp } = state;

	const move = () => {
		if (hp === 0) {
			return { x, y, forward};
		}

		let newX = forward ? x + 1 : x - 1;
		let newY = y;
		let newForward = forward;

		
		//Implement snaking pattern
		let collision = walls.some((w) => w.x === newX && w.y === newY);
		if (collision || (newX == X_WIDTH || newX === 0) ) {
			newX = x;
			newY = y + 1;
			newForward = !forward;
		}	
	
		//Go back to top if reached the end
		if (newY === Y_HEIGHT) {
			newY = 0;
		}

		return {
			x: newX,
			y: newY,
			forward: newForward	
		}
	}

	switch (action.type) {
		case "SPAWN_BUG":
			return state;
		case "GAME_TICK":
			let newHp = hp;
			if (Math.random() * 1000 > 991) {
				//newHp -= 1;
			};
			return {
				...move(),
				hp: newHp,
				gc: hp === 0
			}
	}
}

export default bug;