import React, { useEffect } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';

const Layout = (props) => {
    useEffect(() => {
        props.firstcheckAuthenticated();
        props.load_user();
    }, []);

    return (
        <div>
            <Header  />
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);