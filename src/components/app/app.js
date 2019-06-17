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
                {label: 'Going to learn React.', important: true, like: false, id: idGenerator()},
                {label: 'Started learning React.', important: false, like: false, id: idGenerator()},
                {label: 'I make my life better!', important: false, like: false, id: idGenerator()},
            ],
            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.filterPost = this.filterPost.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
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
        if (body.trim().length > 0)  {
        const newItem = {
            label: body,
            important: false,
            id: idGenerator()
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }
    }
    abbArray(value, id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            let newItem = {};
            if (value === 'important') {
                newItem = {...old, important: !old.important};
            } else if (value === 'like') {
                newItem = {...old, like: !old.like};
            }
            const newArr = [...data.slice(0, index), newItem,...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }
    onToggleImportant (id) {
        this.abbArray('important', id);
    }
    onToggleLiked (id) {
        this.abbArray('like', id);
    }
    
    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch(term) {
        this.setState({term})
    }
    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        const importants = data.filter(item => item.important).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        return(
            <AppBlock> 
                 <AppHeader 
                 liked={liked}
                 allPosts={allPosts}
                 importants={importants}/>
                <div className="search-panel d-flex">
                    <SearchPanel 
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter 
                    filter={filter}
                    onFilterSelect = {this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked = {this.onToggleLiked} />

                <PostAddForm
                    onAdd={this.addItem}/>
            </AppBlock>           
        ) 
    }
    }
