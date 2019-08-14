import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    allStocks:[],
    myStocks:[],
    filteredStocks:[]
  }

componentDidMount(){
  fetch("http://localhost:3000/stocks")
  .then(resp => resp.json())
  .then(data => {
    this.setState({allStocks: data,
    filteredStocks: data})
  })
}

buyStock = (stockHash) =>{
  let myStockArray = [...this.state.myStocks, stockHash]
  this.setState({myStocks: myStockArray})
}

sellStock = (stockHash) => {
  let soldStocks = this.state.myStocks.filter(stock => stock !==  stockHash)
  this.setState({myStocks: soldStocks})
}

handleSort = (e) => {
  if(e.target.value === "All"){
    this.setState({filteredStocks: this.state.allStocks})
  }else{

  let filteredStocksArray = this.state.allStocks.filter(stock =>{
    if(stock.type === e.target.value) return true
    else return false
  })
  this.setState({filteredStocks: filteredStocksArray})
}
}

handleRadioButtons=(e) => {
  if(e.target.value === "Alphabetically"){
    let filteredStocksArray = this.state.allStocks.sort((a, b) => {
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
    return 0;})
    this.setState({filteredStocks: filteredStocksArray})
    
  }else if (e.target.value === "Price"){
    let filteredStocksArray = this.state.allStocks.sort((a, b) => a.price - b.price)
    this.setState({filteredStocks: filteredStocksArray})
  }
}


  render() {
    return (
      <div>
        <SearchBar handleSort={this.handleSort} handleRadioButtons={this.handleRadioButtons}/>

          <div className="row">
            <div className="col-8">

              <StockContainer
              allStocks={this.state.filteredStocks}
              buyStock={this.buyStock}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
              myStocks={this.state.myStocks}
              sellStock={this.sellStock}
              />

            </div>
          </div>
      </div>
    );
  }
}


export default MainContainer;
