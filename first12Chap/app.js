const { body } = document;
body.style.background = "#00000066";

class Field extends React.Component {
  render() {
    
    return <input type="text" name="prenom" id="prenom" ref={this.props.reff} />;
  }
}
const FieldWForRef = React.forwardRef((props,ref)=>{
  return <Field reff={ref}/>
})

class Home extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.input = React.createRef();
  }
  handleClick() {
    console.log(this.input.current.value);
  }
  render() {
    return (
      <React.Fragment>
        <FieldWForRef ref={this.input} />
        <button type="submit" onClick={this.handleClick}>
          Envoyer
        </button>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Home />, body.querySelector(".container"));
