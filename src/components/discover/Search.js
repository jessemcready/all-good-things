import React from 'react';
import { Input } from 'semantic-ui-react'

const Search = ({handleChange}) => <Input onChange={handleChange} size='huge' placeholder='Name or Email Search' />

export default Search;
