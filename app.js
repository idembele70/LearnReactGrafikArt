// Body style
document.body.style.backgroundColor = "#00000078";

// variables
const scaleNames = {
  c: "Celsius",
  f: "fahrenheit",
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) / (9 / 5);
}
function toFahrenheit(celsius) {
  return celsius * 1.8 + 32;
}
function tryConvert(temperature, convert) {
  return Number.isNaN(parseInt(temperature)) ? "" : convert(temperature);
}
// verification de l'etat de l'eau et affichage
function BoilingVedict({ celsius }) {
  const className =
    "alert alert-" +
    (celsius >= 100 ? "primary" : Number.isNaN(celsius) ? "danger" : "dark");
  const children =
    "L'eau " +
    (celsius >= 100
      ? "bout !"
      : Number.isNaN(celsius)
      ? "Je ne comprends pas votre temperature"
      : "ne bout pas !");
  return <div className={className}>{children}</div>;
}

class TemperatureInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    return this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const { scale, value } = this.props;
    const name = "scale" + (scale === "c" ? "c" : "f");
    const scaleName = scaleNames[scale];
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          Température (en {scaleName})
        </label>
        <input
          type="text"
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

// composition
function Button({ type, children }) {
  return <button className={"btn btn-" + type}>{children}</button>;
}

function SuccessBtn({ children }) {
  return <Button type="success">{children}</Button>;
}
const DangerBtn = ({ children }) => {
  return <Button type="danger" children={children} />;
};

function Row({ left, right }) {
 return <div className="row">
    <div className="col-md-6">{left}</div>
    <div className="col-md-6">{right}</div>
  </div>;
}

// saisie de la temperature
class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      scale: "c",
      temperature: "",
    };
    this.newTemperatureCelsius = this.newTemperatureCelsius.bind(this);
    this.newTemperatureFahrenheit = this.newTemperatureFahrenheit.bind(this);
  }
  newTemperatureCelsius(temperature) {
    this.setState({ scale: "c", temperature });
  }
  newTemperatureFahrenheit(temperature) {
    this.setState({ scale: "f", temperature });
  }
  render() {
    const { temperature, scale } = this.state;
    const celsius =
      scale === "c" ? temperature : tryConvert(temperature, toCelsius);
    const fahrenheit =
      scale === "f" ? temperature : tryConvert(temperature, toFahrenheit);
    return (
      <div className="mb-3">
        <Row
          left={
            <TemperatureInput
              scale="c"
              value={celsius}
              onTemperatureChange={this.newTemperatureCelsius}
            />
          }
          right={
            <TemperatureInput
              scale="f"
              value={fahrenheit}
              onTemperatureChange={this.newTemperatureFahrenheit}
            />
          }
        />

        <BoilingVedict celsius={parseInt(celsius)} />
        <Button type="primary m-1">Envoyer</Button>
        <SuccessBtn>Valider avec Success</SuccessBtn>
        <DangerBtn children="Refuser avec danger" />
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.body.children[0]);
