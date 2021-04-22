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
        this.state = { n: props.start, timer: null };
        this.step = props.step;
    }
    componentDidMount() {
        return this.play();
    }
    componentWillUnMount() {
        return this.pause();
    }
    pause() {
        clearInterval(this.state.timer);
        return this.setState(()=> {
            return this.state.timer = null
        })
    }
    play() {
        clearInterval(this.state.timer);
        return this.setState({
            timer: setInterval(this.increment.bind(this), 1000)
        })
    }
    increment() {
        this.setState(function (state, props) { return { n: state.n + this.step } })
    }
    toggle() {
        return this.state.timer ? this.pause() : this.play();
    }
    label() {
        return this.state.timer ? "Pause" : "Play"
    }
    render() {
        return <div>
            Valeur : {this.state.n}
            <button onClick={this.toggle.bind(this)}>{this.label()}</button>
        </div>
    }
}

class ManualIncrementer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { n: 0 };
    }
    increment(e) {
        e.preventDefault()
        return this.setState((state, params) => ({ n: state.n + 1 }))
    }

    render() {
        return <div>
            Valeur : {this.state.n}
            <a href="/" onClick={this.increment.bind(this)}> Incrementer</a>
        </div>
    }
}

function Home() {
    return <div>
        <Welcome name="jean" />
        <Welcome name="nyna" />
        <Clock />
        <Incrementer />
    </div>
}
Incrementer.defaultProps = {
    start: 0,
    step: 1,
}

ReactDOM.render(<Home />, document.querySelector('body > div'));