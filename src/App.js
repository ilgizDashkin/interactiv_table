import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash';
import DetailRowView from './DetailRowView/DetailRowView';
import { searchZamer, average_lenght } from './Logic/logic.js';
import Select from './Select/Select'
// https://abcinblog.blogspot.com/2019/02/react-i.html сделано по урокам

class App extends Component {
  state = {
    isLoading: true,
    dataArr: [],
    data: [],
    sort: 'asc',  // 'desc'
    sortField: 'id', // поле по умолчанию
    row: null,
    sortZamer: ''
  }

  async componentDidMount() {
    // const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    const response = await fetch('https://ilgiz.h1n.ru/from_sql_json.php')
    const data = await response.json()
    console.log(data.pov_info)
    this.setState({
      isLoading: false,
      dataArr: data.pov_info,
      data: searchZamer(data.pov_info),
    })
  }

  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
  }

  onRowSelect = row => (
    // console.log(row)
    this.setState({ row })
  )
  _onChange = (event) => {
    const orderedData = searchZamer(this.state.dataArr, event.target.value)
    console.log(event.target.value)
    this.setState({
      data: orderedData
    })
  }

  render() {
    return (
      <div className="container bg-dark text-center text-white">
        <div className='container p-2'>
          <select className="form-control"
            onChange={this._onChange}>
            <option value="">по замеру</option>
            <option value="РП">замер от РП</option>
            <option value="ПС">замер от ПС</option>
            <option value="ТП">замер от ТП</option>
          </select>
        </div>
        {this.state.isLoading ? <Loader /> : <Table
          data={this.state.data}
          onSort={this.onSort}
          sort={this.state.sort}
          sortField={this.state.sortField}
          onRowSelect={this.onRowSelect}
          lenght={average_lenght(this.state.data)}
        />}
        {
          this.state.row ? <DetailRowView person={this.state.row} /> : null
        }
      </div>
    );
  }
}

export default App;

