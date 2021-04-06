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

function Home() {
    return <div>
        <Welcome name="jean" />
        <Welcome name="nyna" />
        <Clock />
    </div>
}

ReactDOM.render(<Home />, document.querySelector('body > div'));