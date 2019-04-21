import {Map} from 'immutable'

export default state => state.getIn(['http', 'requests'], Map())
