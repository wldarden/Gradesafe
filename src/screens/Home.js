// import React, {Component} from 'react'
// import ListBox from '../components/ListBox';
// import Table from '../components/Table'
// import {connect} from 'react-redux'
// import {fetchZipCodes, addZipCode, fetchWeatherByZipCode} from '../redux/actions'
// import {HomeData} from "../redux/selector";
//
// class Home extends Component {
//
//     componentDidMount () {
//       this.props.fetchZipCodes();
//     }
//
//     render () {
//         let forecast = this.props.forecast;
//         forecast = forecast ? forecast.toJS() : [];
//         return (
//             <div className='Row'>
//                 <ListBox zipCodes={this.props.zipCodes} addZipCode={this.props.addZipCode} fetchWeatherByZipCode={this.props.fetchWeatherByZipCode} />
//
//                 <Table city={this.props.location.get('city', '')}
//                        state={this.props.location.get('region', '')}
//                        data={forecast}
//                        loading={this.props.loading}
//                 />
//             </div>
//         )
//     }
// }
//
// export default connect(HomeData, {fetchZipCodes, addZipCode, fetchWeatherByZipCode})(Home);
//
