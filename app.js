/*
 // functions :
function Field({ children, name, onChange, value }) {
    return <fieldset>
        <legend>{children}</legend>
        <input type="text" id={name} name={name} value={value} onChange={onChange} />
    </fieldset>
}

// class

class Temperature extends React.Component {
    constructor() {
        super();
        this.state = {
            celcius: '',
            farenheit: '',
        }
        this.temperatureCelcius = this.temperatureCelcius.bind(this);
        this.temperaturefarenheit = this.temperaturefarenheit.bind(this);
    }

    temperatureCelcius(e) {
        const celcius = parseInt(e.target.value)
        const farenheit = (celcius * 9 / 5) + 32
        this.setState({
            celcius: celcius ? celcius : '',
            farenheit: farenheit ? farenheit : ''
        })
    }
    temperaturefarenheit(e) {
        const farenheit = parseInt(e.target.value);
        const celcius = farenheit * 9 / 5 + 32;
        this.setState({
            farenheit: farenheit ? farenheit : '',
            celcius: celcius ? celcius : '',
        })
    }
    render() {
        return <div>
            <Field type="text" name="celcius" onChange={this.temperatureCelcius} value={this.state.celcius} >Enter temperature in Celcius</Field>
            <Field type="text" name="fahrenheit" onChange={this.temperaturefarenheit} value={this.state.farenheit} >Enter temperature in Farenheit</Field>
            <p>{this.state.celcius && this.state.celcius > 100 ? "The water would boil" :
                this.state.celcius && this.state.celcius < 100 ? "The vater would not boil" : ''} </p>
        </div>
    } 
}; 
const Home = () => {
    return <React.Fragment>
        <Temperature />
    </React.Fragment>
}

ReactDOM.render(<Home />, document.body.children[0]);
document.body.style.background = "#00000073"
*/



// Partie grafikart

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFarenheit(celcius) {
    return (celcius * 9 / 5) + 32;
}


function BoilingVedict({ celcius }) {
    if (celcius < 100) {
        return <div className="alert alert-info">L'eau ne bout pas </div>
    } return <div className='alert alert-success'>L'eau bout</div>

}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }
    render() {
        const { temperature, scale } = this.props
        const name = 'scale' + scale
        const scaleName = scaleNames[scale]
        return <React.Fragment>
            <label htmlFor={name} >Temperature (en {scaleName}) </label>
            <input type="text" id={name} className="form-control" value={temperature} onChange={this.handleChange} />
        </React.Fragment >
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 'f',
            temperature: 20,
        }
        this.handleCelciusChange = this.handleCelciusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)

    }
    handleCelciusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }
    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }
    render() {
        const { scale, temperature } = this.state
        let fahrenheit, celcius;
        if (scale === "f") { fahrenheit = temperature; celcius = toCelsius(fahrenheit) }
        else { celcius = temperature; fahrenheit = toFarenheit(celcius) }


        return <React.Fragment>
            <div className="form-group">
                <TemperatureInput scale="c" temperature={celcius} onTemperatureChange={this.handleCelciusChange} />
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVedict celcius={celcius} />
            </div>
        </React.Fragment>
    }
};




ReactDOM.render(<Calculator />, document.body.firstElementChild);
document.body.style.background = "#00000073"



/* React.com */
/*
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }


class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Saisissez la température en {scaleNames[scale]} :</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }

    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
} */
