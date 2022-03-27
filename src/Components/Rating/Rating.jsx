import ReactStars from "react-rating-stars-component";
import React from "react";

const Rating = (newRating) => {
    console.log(newRating);

    return(
        <ReactStars
            count={5}
            onChange={Rating}
            size={30}
            isHalf={true}
            emptyIcon={<i class="fa-regular fa-star-sharp"/>}
            halfIcon={<i class="fa-solid fa-star-half-stroke"/>}
            fullIcon={<i class="fa-solid fa-star-sharp"/>}
            activeColor="#ffd700"
        />
    )
}

export default Rating;