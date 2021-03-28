let n = 0;

function numberFormat(n) {
    return n.toString().padStart(2, '0')
}

function render() {
    const items = [
        'Tache 1',
        'Tache 2',
        'Tache 3'
    ];
    const lis = items.map(item=><li>{item}</li>)
    const title = <React.Fragment>
         <h1 className='title' id={"title" + n}>
            Bonjour les gens &nbsp;
        <span>{(n)}</span>
        </h1>
        <ul>
            {items.map((item,k)=><li key={k}>{item}</li>)}
        </ul>
    </React.Fragment>

    ReactDOM.render(title, document.getElementById('app'))
}

render()

window.setInterval(() => {
    n++
    render()
}, 1000);