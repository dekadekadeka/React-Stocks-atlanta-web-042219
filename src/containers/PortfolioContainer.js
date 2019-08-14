import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            //render your portfolio stocks here
            this.props.myStocks.map(myStocks=> 
            <Stock stock={myStocks}
          handleClick={this.props.sellStock}/>)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
