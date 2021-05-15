// data
const data = [
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

//

class SearchBar extends React.Component {
  constructor() {
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }
  handleCheck(e) {
    return this.props.onCheckChange(e.target.checked);
  }
  handleValue(event) {
    return this.props.onValueChange(event.target.value);
  }
  render() {
    const { checked, value } = this.props;
    return (
      <div>
        <input
          type="text"
          id="search"
          name="search"
          value={value}
          placeholder="Search..."
          onChange={this.handleValue}
        />

        <br />
        <input
          type="checkbox"
          id="showStock"
          name="showStock"
          checked={checked}
          onChange={this.handleCheck}
          style={{ marginRight: 10 + "px" }}
        />
        <label htmlFor="showStock">Only show products in stock</label>
      </div>
    );
  }
}
class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pName, pPrice, PStock } = this.props;
    const isStocked = PStock ? "black" : "red";
    return (
      <tr>
        <td style={{ color: isStocked }}>{pName}</td>
        <td style={{ color: isStocked }}>{pPrice}</td>
      </tr>
    );
  }
}

function ProductCategoryRow({ name }) {
  return (
    <tr>
      <th>{name}</th>
    </tr>
  );
}

// Rendering data
function renderAllData(data, checked, searchWord) {
  const result = [];
  let currentCategory = null;

  data.forEach((product, i) => {
    if (checked && checked != product.stocked) return;
    if (searchWord && !product.name.match(searchWord)) return;
    if (product.category != currentCategory) {
      result.push(
        <ProductCategoryRow key={i + product.name} name={product.category} />
      );
      currentCategory = product.category;
    }
    result.push(
      <ProductRow
        key={i}
        pName={product.name}
        pPrice={product.price}
        PStock={product.stocked}
      />
    );
  });
  return result;
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { name, price, checked, value } = this.props;
    return (
      <table style={{ border: 1 + "px " + "solid" + " #" + 333 }}>
        <thead>
          <tr>
            <th>{name}</th>
            <th>{price}</th>
          </tr>
        </thead>
        <tbody>{renderAllData(data, checked, value)}</tbody>
      </table>
    );
  }
}

// Render to DOM
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      check: false,
    };
    this.checkChange = this.checkChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  checkChange(check) {
    return this.setState({ check });
  }
  handleValueChange(value) {
    return this.setState({ value });
  }
  render() {
    const { value, check } = this.state;

    return (
      <div>
        <SearchBar
          value={value}
          onValueChange={this.handleValueChange}
          checked={check}
          onCheckChange={this.checkChange}
        />
        <br />
        <ProductTable name="Name" price="Price" value={value} checked={check} />
      </div>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable />,
  document.body.getElementsByClassName("container")[0]
);
