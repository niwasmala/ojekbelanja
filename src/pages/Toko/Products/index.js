import React, { Component } from 'react';

import FilterInput from '../../../components/FilterInput';
import FilterCards from '../../../components/FilterCards';
import { products, categories } from '../../../models';
import '../../pages.css';

export default class Products extends Component {
  constructor() {
    super();

    this.state = {
      products,
      keyword: ''
    }
  }

  /*** Methods ***/

  updateKeyword = (keyword) => {
    this.setState({
      keyword
    })
  }

  /*** Render ***/
  
  render() {
    return (
      <div>
        <FilterInput
          placeholder="Cari Produk"
          keyword={this.state.keyword}
          action={this.updateKeyword}
          withButton
          />
        <FilterCards
          keyword={this.state.keyword}
          items={this.state.products}
          sections={categories}
          titleField="name"
          descriptionField="desc"
          sectionField="category"
          imageField="image"
          action={this.props.action}
          actionReverse={this.props.actionReverse}
          collection={this.props.order}
          />
      </div>
    )
  }
}

Products.propTypes = {
  toko: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  action: React.PropTypes.func.isRequired,
  actionReverse: React.PropTypes.func.isRequired
}