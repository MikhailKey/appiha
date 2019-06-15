import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import idGenerator from 'react-id-generator';
import PostAddForm from '../post-add-form';

//import './app.css'
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
  
`

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: 'Going to learn React.', important: true, id: 1},
                {label: 'Started learning React.', important: false, id: 2},
                {label: 'I make my life better!', important: false, id: 3},
                512314
            ]
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.maxId = idGenerator();
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    render() {
        return(
            <AppBlock> 
                 <AppHeader />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList posts={this.state.data}
                    onDelete={this.deleteItem} />
                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>
            
        ) 
    }
    }
