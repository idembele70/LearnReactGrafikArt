function WelcomeFunc({ name, children }) {
    return <div>
        <h1>Bonjour {name} </h1>
        <p> {children} </p>
    </div>
}
class Welcome extends React.Component {
    render() {
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>{this.props.children}</p>
        </div>
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
        this.timer = null;
    }
    render() {
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
    tick() {
        this.setState({ date: new Date() });
    }

    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000);
    }
    componentWillUnMount() {
        clearInterval(this.timer);
    }
}


class Incrementer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { n: props.start };
        this.step = props.step;
        this.timer = null;
    }
    componentDidMount() {
        this.timer = setInterval(this.increment.bind(this), 1000)
    }
    componentWillUnMount() {
        clearInterval(this.timer)
    }
    increment() {
        this.setState(function (state, props) { return { n: state.n + this.step } })
    }
    render() {
        return <div>
            {this.state.n}
        </div>
    }
}
function Home() {
    return <div>
        <Welcome name="jean" />
        <Welcome name="nyna" />
        <Clock />
        <Incrementer start={10} step={10} />
        <Incrementer start={100} step={2} />
        <Incrementer start step />
    </div>
}
Incrementer.defaultProps = {
    start : 0,
    step : 1,
}

ReactDOM.render(<Home />, document.querySelector('body > div'));