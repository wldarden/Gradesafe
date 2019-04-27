import {createStructuredSelector} from 'reselect';
import {Map} from 'immutable'

export const DataForClassList = createStructuredSelector({
    user: (state) => state.get('user', {})
})

export const DataForStudentCourse = createStructuredSelector({
    user: (state) => state.get('user', {}),
    course: (state) => state.get('course', {})
})
