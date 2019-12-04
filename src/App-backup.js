import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, NavbarBrand, Button, Form, FormGroup, Label, Input, Collapse, NavbarToggler, Nav, NavItem } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: [],
      searchValue: "",
      isOpen: true,
    };
  }
  componentDidMount() {
    this.getRandomGame();
  }

  getRandomGame = () => {
    axios
      .get("https://www.boardgameatlas.com/api/search?random=true&client_id=FulWu9NWCQ")
      .then(res => this.setState({ gameList: [res.data.game] }))
      .catch(err => console.log(err));
  };

  renderItems = () => {
    const newItems = this.state.gameList;
    return newItems.map(item => (
      <div className="col-sm-4">
        <div className="card game-item">

          <img src={item.thumb_url} className="card-image-top" alt="game board, box, etc" />
          <div className="card-body">
            <h5 class="card-title">{item.name}</h5>
            <p className="card-text"><b>Players: </b>{(item.min_players != null ? item.min_players : 'Unknown') +
              "-" + (item.max_players != null ? item.max_players : 'Unknown')}</p>
            <p className="card-text"><b>Playtime: </b>{(item.min_playtime != null ? item.min_playtime : 'Unknown') +
              "-" + (item.max_playtime != null ? item.max_playtime : 'Unknown')}</p>
            <a key={item.id} className="no-link stretched-link" href={item.url} target="_blank" rel="noopener noreferrer"></a>
          </div>
        </div>
      </div >
    ));
  };

  handleClick = () => {
    this.getRandomGame();
    this.renderItems();
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.search();
    }
  }

  search = () => {
    axios
      .get("https://www.boardgameatlas.com/api/search?name=" + this.state.searchValue + "&client_id=FulWu9NWCQ&limit=20")
      .then(res => this.setState({ gameList: res.data.games }))
      .catch(err => console.log(err));
  }

  updateInput = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  toggle = () => {
    this.state.isOpen = !this.state.isOpen;
  }

  render() {
    return (
      <main className="content">
        <div>
          <Navbar className="navbar navbar-dark bg-dark">
            <NavbarBrand className="text-white text-uppercase text-center my-4">board game app</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Button onClick={this.handleClick}>random game</Button>
                </NavItem>
                <NavItem>
                  <Form className="form-inline">
                    <Input className="md-4" label="Search" type="text" placeholder="search game" onChange={this.updateInput} onKeyDown={this.onKeyDown} />
                  </Form>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>

        <div className="row">
          {this.renderItems()}
        </div>
      </main >);
  }
}
export default App;
