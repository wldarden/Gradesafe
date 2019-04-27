import {createStructuredSelector} from 'reselect';
import {Set, Map, List} from 'immutable'

export const DataForClassList = createStructuredSelector({
    user: (state) => state.get('user', Map())
})

export const DataForStudentCourse = createStructuredSelector({
    user: (state) => state.get('user', Map()),
    course: (state) => state.get('course', Map())
})
