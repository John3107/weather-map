import { Provider } from "react-redux";
// @ts-ignore
import renderer from "react-test-renderer";
import CityWeatherInfo from './CityWeatherInfo';
import {store} from "../../bll/store";

it('renders correctly snapshot', () => {
    const tree = renderer
        .create(<Provider store={store}><CityWeatherInfo/></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});