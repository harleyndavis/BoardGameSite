import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, NavbarBrand, Button, Form, Input, Collapse, NavbarToggler, Nav, NavItem } from 'reactstrap';
import StarRatings from 'react-star-ratings';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      gameList: [],
      searchValue: "",
      isOpen: false
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
      <div className="card game-item">
        <img src={item.thumb_url} className="card-image-top" alt="game board, box, etc" />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <div className="stars">
            <StarRatings rating={item.average_user_rating} name="rating" starDimension="30px" starSpacing="10px" />
          </div>
          <p className="card-text"><b># of Reviews: </b>{item.num_user_ratings}</p>
          <p className="card-text"><b>Players: </b>{(item.min_players != null ? item.min_players : '??') +
            "-" + (item.max_players != null ? item.max_players : '??')}</p>
          <p className="card-text"><b>Playtime: </b>{(item.min_playtime != null ? item.min_playtime : '??') +
            "-" + (item.max_playtime != null ? item.max_playtime : '??')}</p>
          <a key={item.id} className="no-link stretched-link" href={item.url} target="_blank" rel="noopener noreferrer"></a>
        </div>
      </div >
    ));
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

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

  render() {
    return (

      <main className="content">
        <div>
          <Navbar className="navbar navbar-dark bg-dark">
            <NavbarBrand className="text-white text-uppercase text-center my-4">board game app</NavbarBrand>
            <Button onClick={this.handleClick}>random game</Button>
            <Form className="form-inline">
              <Input className="md-4" label="Search" type="text" placeholder="search game" onChange={this.updateInput} onKeyDown={this.onKeyDown} />
            </Form>
          </Navbar>
        </div>

        <div className="row justify-content-center">
          {this.renderItems()}
        </div>
      </main >);
  }
}
export default App;
