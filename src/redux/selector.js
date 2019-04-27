import {createStructuredSelector} from 'reselect';
import {Set, Map, List} from 'immutable'

export const DataForClassList = createStructuredSelector({
    user: (state) => state.get('user', Map()),
})
