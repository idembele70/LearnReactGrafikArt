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
document.body.style.background = "#00000073"

ReactDOM.render(<Home />, document.body.children[0]);