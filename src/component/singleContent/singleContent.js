import React from 'react';
import "./singleContent.scss"
import { img_300, unavailable } from '../../config/config';
import { Badge } from '@mui/material';
import ContentModal from '../contentModal/contentModal';

function SingleContent({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) {
    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge
                badgeContent={id}
                color={vote_average > 6 ? "primary" : "secondary"}
            />
            <img className='poster' src={poster ? img_300 + poster : unavailable} alt={title} />
            <b className="title">{title}</b>
            <div className="subTitleBox">
                <span className='aboutMovie'>{media_type === "tv" ? "TV Series" : "Movie"}</span>
                <span className="aboutMovie">{date}</span>
            </div>
        </ContentModal>
    )
}

export default SingleContent
