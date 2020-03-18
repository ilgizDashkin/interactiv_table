import React, { Component } from 'react';
import Loader from './Loader/Loader';
import Table from './Table/Table';
import _ from 'lodash';
import DetailRowView from './DetailRowView/DetailRowView';
// https://abcinblog.blogspot.com/2019/02/react-i.html сделано по урокам

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    sort: 'asc',  // 'desc'
    sortField: 'id', // поле по умолчанию
    row: null,
  }

  async componentDidMount() {
    // const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    const response = await fetch('https://ilgiz.h1n.ru/from_sql_json.php')
    const data = await response.json()
    // const data = await response
     console.log(data.pov_info)
    this.setState({
      isLoading: false,
      // data: _.orderBy(data, this.state.sortField, this.state.sort)
      data: _.orderBy(data.pov_info, this.state.sortField, this.state.sort)
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
    this.setState({row})
  )

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? <Loader /> : <Table
          data={this.state.data}
          onSort={this.onSort}
          sort={this.state.sort}
          sortField={this.state.sortField}
          onRowSelect={this.onRowSelect}
        />}
        {
        this.state.row ? <DetailRowView person={this.state.row} /> : null
      }
      </div>
    );
  }
}

export default App;

