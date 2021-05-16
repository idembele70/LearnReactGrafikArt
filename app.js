document.body.style.background = "#00000066";

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];

function ProductRowComponent({ product }) {
  const { name, price, stocked } = product;
  const isStocked = stocked ? "stocked" : "not-stocked";
  console.log("render");
  return (
    <tr>
      <td className={isStocked}>{name}</td>
      <td>{price}</td>
    </tr>
  );
}
const ProductRow = React.memo(ProductRowComponent);
function ProductCategoryRow({ product }) {
  return (
    <tr>
      <th>{product.category} </th>
    </tr>
  );
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }
  renderData(data, toFind, isStocked) {
    const rows = [];
    let prevCategory = null;
    data.forEach((productRow, i) => {
      const { category, name, stocked } = productRow;
      if ((!!toFind && !name.match(toFind)) || (isStocked && !stocked)) return;
      if (prevCategory != category) {
        rows.push(<ProductCategoryRow key={category} product={productRow} />);
        prevCategory = category;
      }
      rows.push(<ProductRow key={name + i} product={productRow} />);
    });
    return rows;
  }
  render() {
    const { products, toFind, isStocked } = this.props;
    return (
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{this.renderData(products, toFind, isStocked)}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }
  handleSearchValue(e) {
    return this.props.onSearchChange(e.target.value);
  }
  handleCheckChange(event) {
    return this.props.onCheckChange(event.target.checked);
  }
  render() {
    const { value, check } = this.props;
    return (
      <React.Fragment>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={value}
          onChange={this.handleSearchValue}
        />
        <div className="">
          <input
            type="checkbox"
            name="stock"
            id="stock"
            checked={check}
            onChange={this.handleCheckChange}
          />
          <label htmlFor="stock">only show product in stock</label>
        </div>
      </React.Fragment>
    );
  }
}

class ProductFilterTable extends React.Component {
  constructor() {
    super();
    this.state = {
      search: "",
      checked: true,
    };
    this.searchChange = this.searchChange.bind(this);
    this.checkChange = this.checkChange.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return nextProps.data !== this.props.data ||
      nextState.search !== this.props.search ||
      nextState.checked !== this.props.checked
  }
  searchChange(search) {
    return this.setState({ search });
  }
  checkChange(checked) {
    return this.setState({ checked });
  }
  render() {
    const { search, checked } = this.state;

    return (
      <div className="container">
        <div className="row search-bar">
          <SearchBar
            value={search}
            onSearchChange={this.searchChange}
            check={checked}
            onCheckChange={this.checkChange}
          />
        </div>
        <div className="row">
          <ProductTable
            products={this.props.data}
            toFind={search}
            isStocked={checked}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductFilterTable data={PRODUCTS} />,
  document.body.getElementsByTagName("div")[0]
);
const PRODUCTS2 = [
  {
    category: "Sporting Goods",
    price: "$290.99",
    stocked: false,
    name: "golf",
  },
  ...PRODUCTS,
  {
    category: "Electronics",
    price: "$399.99",
    stocked: true,
    name: "iPhone 6",
  },
];

setTimeout(() => {
  ReactDOM.render(
    <ProductFilterTable data={PRODUCTS2} />,
    document.body.getElementsByTagName("div")[0]
  );
}, 2000);
