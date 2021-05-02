class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            nom: ["demo2", "demo1"],
            checked: true
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        return this.setState({ checked: e.target.checked })
    }
    render() {
        return <div>
            <label htmlFor="nom">Mon checkbox</label>
            <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
        </div >
    }
};

ReactDOM.render(<Home />, document.body.firstElementChild);