export default class Table extends React.Component {

    constructor(props){
        super(props);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function(){
        return Object.keys(this.props.data[0]);

    }

    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    render() {
        <tbody>
            {this.getRowsData()}
        </tbody>
    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
}