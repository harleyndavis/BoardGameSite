import React, { Component } from 'react';
const gameData = [
    {
        id: 1,
        name: "Downforce",
        description: "High-stakes bidding on million-dollar race cars.",
        players: "2-6",
        playtime: "30-45"
    },
    {
        id: 2,
        name: "Rory's Story Cubes",
        description: "Rory's Story Cubes is a pocket-sized creative story generator, providing hours of imaginative play for all ages.",
        players: "1-8",
        playtime: "15-30"
    }
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameList: gameData
        };
    }
    renderItems = () => {
    };


    renderItems = () => {
        const newItems = gameData;
        return newItems.map(item => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`todo-title mr-2`}
                    title={item.description}>
                    {item.name}
                </span>



            </li>
        ));
    };

    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <ul className="list-group list-group-flush">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
