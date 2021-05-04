class Field extends React.Component {
    render() {
        const { children, name, value, onChange, type } = this.props;
        return <div className="form-group">
            <label htmlFor={name}>{children}</label>
            {(type == "text") ?
                <input type={type} value={value} onChange={onChange} id={name} name={name} className="form-control" /> :
                <input type={type} checked={value} onChange={onChange} id={name} name={name} />
            }
        </div>
    }
};

function CheckBox({ children, val, onChange, name, type }) {
    return <div className="form-group">
        <input type={type} checked={val} onChange={onChange} id={name} name={name} />
        <label>{children}</label>
    </div>
}

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            nom: "",
            prenom: "",
            newsletter: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const name = e.target.name;
        const type = e.target.type;
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        return this.setState({ [name]: value })
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        this.setState({
            nom: '',
            prenom: '',
            newsletter: false
        })
    }
    render() {
        return <form className="container" onSubmit={this.handleSubmit} >
            <Field type="text" name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <CheckBox type="checkbox" name="newsletter" id="newsletter" onChange={this.handleChange} checked={this.state.newsletter}/> <br />
            <button className="btn btn-primary m-1">Envoyer</button>
            {JSON.stringify(this.state)}
        </form>
    }
};

ReactDOM.render(<Home />, document.body.firstElementChild);