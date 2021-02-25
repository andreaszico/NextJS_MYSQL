import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import theme from './theme';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Container } from '@material-ui/core';

export default class MyApp extends App {
    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>My page</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Microphone Shop
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ThemeProvider theme={theme}>   
                    <CssBaseline />
                    <Container>
                        <Box marginTop={8} className="kill">
                            <Component {...pageProps} />
                        </Box>
                    </Container>
                </ThemeProvider>
            </React.Fragment>
        );
    }
}