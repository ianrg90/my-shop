import classes from "./Main.module.css"

function Main(props){
    return (
        <main className= {classes.main}>{props.children}</main>
    )
}

export default Main