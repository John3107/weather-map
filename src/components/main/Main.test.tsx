import { Provider } from "react-redux";
// @ts-ignore
import renderer from "react-test-renderer";
import Main from './Main';
import {store} from "../../bll/store";

it('renders correctly snapshot', () => {
    const tree = renderer
        .create(<Provider store={store}><Main/></Provider>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

