import React, { Component } from "react";
import axios from "axios";
import { MD5 } from "crypto-js";

const marvelApiUrl = "https://gateway.marvel.com:443/v1/public/";

// ENV
const API_KEY = process.env.REACT_APP_API_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async getComics() {
        const searchTitle = "Spider-Man";
        const searchYear = 2022;
        // API GET requirements
        const ts = Number(new Date());
        const hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
        const encodedSearchTitle = encodeURI(searchTitle);
        const url = `${marvelApiUrl}comics?format=comic&titleStartsWith=${encodedSearchTitle}&startYear=${searchYear}&apikey=${API_KEY}&ts=${ts}&hash=${hash}`;

        try {
            const response = await axios.get(url);

            if (response.data.data.total > 0) {
                const results = response.data.data.results;
                results.forEach((result) => {
                    console.log(result);
                });
            } else {
                console.log(`No results for ${searchTitle} in ${searchYear}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.getComics();
    }
    render() {
        return (
            <div className="container">
                <h1>Marvel API</h1>
                <script src="js/bootstrap.min.js"></script>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="q" className="form-label">
                            Search
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="q"
                            aria-describedby="queryHelp"
                            required
                        />
                        <div id="queryHelp" className="form-text">
                            Search for a comic series.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="searchYear" className="form-label">
                            Year
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="searchYear"
                            aria-describedby="yearHelp"
                            min="1961"
                            max="2099"
                            step="1"
                            required
                        />
                        <div id="yearHelp" className="form-text">
                            Include a year.
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                        >
                            Search for a series
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;