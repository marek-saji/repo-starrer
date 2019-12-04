import React, { Component } from 'react';
import '../FavCheckbox/style.css';
import './style.css';

class FavCheckboxPlaceholder extends Component
{
    render ()
    {
        return (
            <span className="favCheckbox">
                <span className="favCheckbox__label favCheckbox__label--placeholder">
          Favourite
                </span>
            </span>
        );
    }
}

export default FavCheckboxPlaceholder;
