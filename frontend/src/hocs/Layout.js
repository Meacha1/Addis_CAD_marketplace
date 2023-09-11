import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';

const Layout = ({ children, checkAuthenticated, load_user, googleAuthenticate }) => {
    useEffect(() => {
        const value = queryString.parse(useLocation().search);
        const state = value.state ? value.state : null;
        const code = value.code ? value.code : null;

        console.log(state, code);

        if (state !== null && code !== null) {
            googleAuthenticate(state, code);
        } else {
            checkAuthenticated();
            load_user();
        }

    }, []);

    return (
        <div>
            <Header  />
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user, googleAuthenticate })(Layout);
