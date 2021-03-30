function Welcome(props) {
    console.log(props.name);
    return <h1>Bonjour {props.name}</h1>;
}

ReactDOM.render(<Welcome name = "Jean" />, document.querySelector('body > div'));