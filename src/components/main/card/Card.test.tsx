import { Provider } from "react-redux";
// @ts-ignore
import renderer from "react-test-renderer";
import Card from './Card';
import {store} from "../../../bll/store";

it('renders correctly snapshot', () => {
    const tree = renderer
        .create(<Provider store={store}><Card prop={store.getState().app.selectedCity}/></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});