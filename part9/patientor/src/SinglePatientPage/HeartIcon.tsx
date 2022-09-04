import React from "react";
import { HeartIconProps } from "../types";
import FavoriteIcon from '@mui/icons-material/Favorite';


const HeartIcon = (props: HeartIconProps) => {
    switch (props.rating) {
        case 0:
            return <FavoriteIcon color="success" />;
        case 1:
            return <FavoriteIcon color="info" />;
        case 2:
            return <FavoriteIcon color="warning" />;
        case 3:
            return <FavoriteIcon color="error" />;
    
        default:
            return <p>No icon available</p>;
    }
};

export default HeartIcon;