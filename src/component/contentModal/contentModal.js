import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
    img_500,
    unavailable,
    unavailableLandscape,
} from "../../config/config";
import "./contentModal.scss";
import { Button } from "@material-ui/core";
import Carousel from "../Carousel/Carousel";
import { YouTube } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCinema, getSingleCinemaCredits, getSingleCinemaVideo } from "../../redux/actions/entertainmentActions";
const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "90%",
        height: "80%",
        backgroundColor: "#39445a",
        border: "1px solid #282c34",
        borderRadius: 10,
        color: "white",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));


export default function ContentModal({ children}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const [content, setContent] = useState();
    // const [video, setVideo] = useState();

    const { type, id } = useParams();
    const dispatch = useDispatch();
    const { singleCinema, singleCinemaVideo, singleCinemaCredits } = useSelector(state => state.entertainment)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${ApiKey}&language=en-US`
        );
        setContent(data);
    };

    
    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${ApiKey}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);*/

    useEffect(() => {
        dispatch(getSingleCinema(type, id));
        dispatch(getSingleCinemaVideo(type, id));
        dispatch(getSingleCinemaCredits(type, id));
    }, [type, id]);

    return (
        <>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {singleCinema && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <img
                                    src={
                                        singleCinema.poster_path
                                            ? `${img_500}/${singleCinema.poster_path}`
                                            : unavailable
                                    }
                                    alt={singleCinema.name || singleCinema.title}
                                    className="ContentModal__portrait"
                                />
                                <img
                                    src={
                                        singleCinema.backdrop_path
                                            ? `${img_500}/${singleCinema.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={singleCinema.name || singleCinema.title}
                                    className="ContentModal__landscape"
                                />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {singleCinema.name || singleCinema.title}(
                                        {
                                            (
                                                singleCinema.first_air_date || singleCinema.release_date || "......"
                                            ).substring(0, 4)
                                        }
                                        )
                                    </span>
                                    {/*content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )*/}
                                    {
                                        singleCinema.tagline && (
                                            <i className="tagline">{singleCinema.tagline}</i>
                                        )
                                    }

                                    <span className="ContentModal__description">
                                        {singleCinema.overview ? singleCinema.overview : 'No description'}
                                    </span>

                                    <div>
                                        {
                                            singleCinemaCredits.length > 1 ?
                                                <div>
                                                    <Carousel />
                                                </div> : ""
                                        }
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTube />}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${singleCinemaVideo}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}
