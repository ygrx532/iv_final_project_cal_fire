import { scaleLinear, scaleBand} from 'd3';

export const Scale = {
    linear: (min_value, max_value, start_pos, end_pos) => {
        // console.log('the linear scale for scatter plot/bar chart');
        return scaleLinear()
            .range([start_pos, end_pos])
            .domain([min_value, max_value])
            .nice();
        },
    band: (discreteValueArray, start_pos, end_pos) => {
        // console.log('the x scale for the bar chart');
        return scaleBand()
            .range([start_pos, end_pos])
            .domain(discreteValueArray);
    }
}

// Create a function that returns the Scales object
function Scales() {
    return Scale;
}

// Set the function as the default export
export default Scales;
