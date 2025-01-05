// Load TensorFlow.js and PPO.js scripts in your HTML
// <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"></script>
// <script src="ppo.js"></script>

function rewardInDistance(a0,a1,g0,g1){
  return -Math.sqrt(
            (a0 - g0) ** 2 + 
            (a1 - g1) ** 2
        )
}
// Define the environment class
class Env {
    constructor(actionNumber,BottomLimit,TopLimit,inputs,datatype='float32') {
        this.actionSpace = {
            'class': 'Box',
            'shape': [actionNumber],
            'low': BottomLimit,
            'high': TopLimit,
        };
        this.observationSpace = {
            'class': 'Box',
            'shape': [inputs],
            'dtype': datatype,
        };
    }

    // Step function to update the agent's position and calculate rewards
    async step(action,rewardFunction) {
        const oldAgent = this.agent.slice(0);
        // Update agent position based on action
        //2D move
        this.agent[0] += action[0] * 0.05;
        this.agent[1] += action[1] * 0.05;
        this.i += 1;

        // Calculate reward based on distance to the goal
        const reward = rewardInDistance(this.agent[0],this.agent[1],this.goal[0],this.goal[1]);

        // Check if the episode is done
        const done = this.i > this.maxi || reward > this.rewardtarget;
        if (reward > this.rewardtarget) {
            console.log('Goal reached Success:', reward);
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        return [
            [this.agent[0], this.agent[1], this.goal[0], this.goal[1]],
            reward, 
            done,
        ];
    }

    // Reset function to initialize or reset the agent and goal locations
    reset() {
      //this is 2D,left to be edited
        this.agent = [
            Math.random(),
            Math.random(),
        ];
        this.goal = [
            Math.random(),
            Math.random(),
        ];
        this.i = 0;
        this.maxi = 30
        this.rewardtarget = -0.01
        return [this.agent[0], this.agent[1], this.goal[0], this.goal[1]];
    }
}
