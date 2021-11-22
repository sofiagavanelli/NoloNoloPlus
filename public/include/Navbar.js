
//import 'bootstrap/dist/css/bootstrap.min.css'
var React = require('react');
/*
module.export = {

    Navbar: () => {
        const [results, setResults] = useState({ "results": [] });

        return ( 
            <Container>
                 <Navbar expand="lg" variant="light" bg="light">
                  <Container>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                  </Container>
                 </Navbar>
            </Container>
        )
    }

}*/


var Navbar = React.createClass({
    render: function () {

        return(
            <Container>
            <Navbar expand="lg" variant="light" bg="light">
             <Container>
               <Navbar.Brand href="#">Navbar</Navbar.Brand>
             </Container>
            </Navbar>
       </Container>
        );
    }
});
