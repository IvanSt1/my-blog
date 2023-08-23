import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    state = {
        title: "",
        text: "",
        posts: []
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts');
            this.setState({ posts: response.data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/post', {
                title: this.state.title,
                text: this.state.text
            });
            this.setState({ title: "", text: "" });
            this.fetchPosts();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }

    renderPosts = () => {
        if (!this.state.posts) {
            return null;
        }

        return this.state.posts.map(post => (
            <div className="card" key={post.id} style={{ marginBottom: "10px" }}>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.text}</p>
                </div>
            </div>
        ));
    }
    handleDeleteAllPosts = async () => {
        try {
            await axios.delete('http://localhost:8080/posts');
            this.fetchPosts();
        } catch (error) {
            console.error("Error deleting all posts:", error);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Первый блог</h1>
                <hr />
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Заголовок</label>
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Заголовок"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Текст</label>
                        <textarea
                            className="form-control"
                            name="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            id="exampleFormControlTextarea1"
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Добавить</button>
                </form>
                <hr />
                <div>
                    <button onClick={this.handleDeleteAllPosts} className="btn btn-danger mb-3">Удалить все посты</button>
                    <hr />
                    {this.renderPosts()}
                </div>


            </div>
        );
    }
}

export default App;
