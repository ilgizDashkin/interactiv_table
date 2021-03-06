import React, { Component } from 'react';
import Loader from './Loader/Loader';//картинка загрузки
import Table from './Table/Table';
import TableNew from './Table/TableNew';
import _ from 'lodash';//для сортировки таблицы
import { searchZamer, average_lenght } from './Logic/logic.js';
// сначала npm install anychart-react
import AnyChart from 'anychart-react'
//npm i @vkontakte/vkui @vkontakte/icons @vkontakte/vk-bridge
import { View, Panel, PanelHeader,Search } from '@vkontakte/vkui';//пакеты из вк
import '@vkontakte/vkui/dist/vkui.css';

// https://abcinblog.blogspot.com/2019/02/react-i.html сделано по урокам

class App extends Component {
  state = {
    isLoading: false,
    dataArr: [],
    data: [],
    sort: 'asc',  // 'desc'
    sortField: 'id', // поле по умолчанию
    row: null,
    sortZamer: '',
    data_new: [],
    query: '',
    graf: false
  }

  // запрос к серверу за данными
  requestData = async () => {
    if (this.state.query.length > 2) {
      this.setState({ isLoading: true }) //пока грузится показываем спинер
      const response = await fetch(`https://ilgiz.h1n.ru/from_sql_json.php?&query=${this.state.query}`)
      const data = await response.json()
      console.log(data)
      this.setState({
        isLoading: false,
        dataArr: data.pov_info,
        data: searchZamer(data.pov_info),
        data_new: data.pov_new
      })
      localStorage.state = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
    }
  }

  async componentDidMount() {
    this.requestData()
    // console.log('state')
    const lastState = localStorage.state
    if (lastState) {
      // console.log(lastState)
      this.setState(JSON.parse(localStorage.state))
    }
  }
  // здесь используем библиотеку lodash для сортировки таблицы
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc';
    const orderedData = _.orderBy(cloneData, sortField, sortType);
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField,
    })
    localStorage.state = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
    // console.log(this.state.data.map((elm) => elm.zamer))
  }

  _onChange = (event) => {
    const orderedData = searchZamer(this.state.dataArr, event.target.value)
    // console.log(event.target.value)
    this.setState({
      data: orderedData
    })
    localStorage.state = JSON.stringify(this.state);//сохраняем стейт в локалсторадже
  }
  //выбираем сортировку от пс рп тп
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  }

  // data_grapf = [
  //   ["тп-301 600м тп-3002"],
  //   ["тп-301 500м тп-3002"]
  // ];
  data_grapf() {
    const data = this.state.data
    let res_arr = []
    for (let elm of data) {
      if ((elm.zamer > 0) && (elm.zamer < 10000)) {
        const name = elm.name.split(' - ')
        const elem_arr = [`${name[0].split(' ').pop()} ${elm.zamer}m ${name[1]}`]
        res_arr.push(elem_arr)
      }
    }
    // console.log(res_arr)
    return res_arr
  }

  render() {
    return (
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>поиск КЛ</PanelHeader>
          <div className="container bg-dark text-center text-white">
            <div className='container p-2'>
              <a type="button" className="btn btn-danger btn-lg btn-block" href='https://ilgiz.h1n.ru/index.php'>на главную</a>
              <Search  value={this.state.query} onChange={this.handleChange} placeholder='введите КЛ, не менее 3 символов' />
              <button className='btn btn-info btn-lg btn-block' onClick={this.requestData}>поиск</button>
              <select className="form-control"
                onChange={this._onChange}>
                <option value="">по замеру</option>
                <option value="РП">замер от РП</option>
                <option value="ПС">замер от ПС</option>
                <option value="ТП">замер от ТП</option>
              </select>
            </div>

            {this.state.data.length ?//здесь выводим граф если есть данные
              <div>
                {this.state.graf ?//проверяем видимость
                  <>
                    <button className='btn btn-secondary btn-lg btn-block' onClick={() => this.setState({ graf: false })}>закрыть граф замеров</button>
                    <AnyChart
                      // type='column'
                      // type='bar'
                      // width= '800'
                      height={this.data_grapf().length * 15 > 800 ? 800 : this.data_grapf().length * 25}//выбираем высоту графика исходя из данных
                      type='wordtree'
                      // data={[[1, 2], [3, 5]]}
                      // из стейта берем замеры в массив
                      // data={this.state.data.map((elm) => (elm.zamer > 0 && elm.zamer < 10000) ? elm.zamer : null)}
                      data={this.data_grapf()}
                      // title="замеры до повреждения"
                    />
                  </> : <button className='btn btn-secondary btn-lg btn-block' onClick={() => this.setState({ graf: true })}>показать граф замеров</button>
                }
              </div>
              : null
            }

            {this.state.isLoading ?
              <Loader /> :
              <div>
                {this.state.data.length ?
                  <Table
                    data={this.state.data}
                    onSort={this.onSort}
                    sort={this.state.sort}
                    sortField={this.state.sortField}
                    lenght={average_lenght(this.state.data)}
                  /> :
                  <p>в основной базе не ничего не найдено :(</p>}
                {this.state.data_new.length ?
                  <TableNew
                    data={this.state.data_new}
                  /> :
                  <p>в новой базе не ничего не найдено :(</p>}
              </div>
            }
          </div>
        </Panel>
      </View>
    );
  }
}

export default App;

