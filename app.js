const scaleNames = {
  f: "fahrenheit",
  c: "celsius",
};

function BoilingVedict({ celsius }) {
  return (
    <div className="celsiusAlert">
      L'eau {celsius >= 100 ? "bout" : "ne bout pas"}{" "}
    </div>
  );
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    return this.props.onTemperaturechange(event.target.value);
  }
  render() {
    const { scale, value } = this.props;
    const scaleName = "name" + (scale === "f" ? "f" : "c");
    return (
      <fieldset>
        <legend className="temperature">
          Enter temperature in {scaleNames[scale]}
        </legend>
        <input
          type="text"
          id={scaleName}
          name={scaleName}
          value={value}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

const toFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};
const toCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5 / 9;
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: "f",
      temperature: "",
    };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }
  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }
  handleFahrenheitChange(temperature) {
    this.setState({ temperature, scale: "f" });
  }
  tryconvert(temperature, convert) {
    const toConvert = parseInt(temperature);
    return !Number.isNaN(toConvert) ? convert(temperature) : "";
  }

  render() {
    const {} = this.props;
    const { temperature, scale } = this.state;
    let fahrenheit = null,
      celsius = null;
    if (scale === "f") {
      fahrenheit = temperature;
      celsius = this.tryconvert(temperature, toCelsius);
    } else {
      celsius = temperature;
      fahrenheit = this.tryconvert(temperature, toFahrenheit);
    }

    return (
      <React.Fragment>
        <TemperatureInput
          scale="f"
          value={fahrenheit}
          onTemperaturechange={this.handleFahrenheitChange}
        />
        <TemperatureInput
          scale="c"
          value={celsius}
          onTemperaturechange={this.handleCelsiusChange}
        />
        <BoilingVedict celsius={temperature} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Calculator />, document.body.querySelector(".container"));
