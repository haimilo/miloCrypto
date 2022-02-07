import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../components/Banner/CoinInfo';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Banner/Carousel';

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();
    const fetchCoins = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    }

    console.log(coin);

    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            // flexDirection: "column",

            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid grey",
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
        },
        description: {
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography className={classes.heading} variant="h3">
                    {coin?.name}
                </Typography>
                <Typography className={classes.description} variant="subtitle1">
                    {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
                </Typography>
                <div className={classes.marketData}>
                    <span style={{ display: 'flex' }}>
                        <Typography className={classes.heading} variant="h5"
                            style={{ fontSize: '16px' }}
                        >
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: 'Montserrat', fontSize: '16px' }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                    <span style={{ display: 'flex' }}>
                        <Typography className={classes.heading} variant="h5"
                            style={{ fontSize: '16px' }}
                        >
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: 'Montserrat', fontSize: '16px' }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: 'flex' }}>
                        <Typography className={classes.heading} variant="h5" style={{ fontSize: '16px' }}>
                            Market Cap: {" "}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: 'Montserrat', fontSize: '16px' }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[currency.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                            )}
                            M
                        </Typography>
                    </span>
                </div>
            </div>

            {/* Chart */}
            <CoinInfo coin={coin} />
        </div>
    )
};

export default CoinPage;
