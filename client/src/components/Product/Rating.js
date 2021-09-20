import React from "react";
import { StarIcon } from "@material-ui/icons/Star";
import { StarHalfIcon } from "@material-ui/icons/StarHalf";
import { StarBorderIcon } from "@material-ui/icons/StarBorder";

export const Rating = (rating) => {
  return (
    <div className="starrating">
      {rating >= 1 ? (
        <StarIcon />
      ) : rating >= 0.5 ? (
        <StarHalfIcon />
      ) : (
        <StarBorderIcon />
      )}
      {rating >= 2 ? (
        <>
          <StarIcon />
        </>
      ) : rating >= 1.5 ? (
        <>
          <StarHalfIcon />
        </>
      ) : (
        <StarBorderIcon />
      )}
      {rating >= 3 ? (
        <>
          <StarIcon />
        </>
      ) : rating >= 2.5 ? (
        <>
          <StarHalfIcon />
        </>
      ) : (
        <StarBorderIcon />
      )}
      {rating >= 4 ? (
        <>
          <StarIcon />
        </>
      ) : rating >= 3.5 ? (
        <>
          <StarHalfIcon />
        </>
      ) : (
        <StarBorderIcon />
      )}
      {rating >= 5 ? (
        <>
          <StarIcon />
        </>
      ) : rating >= 4.5 ? (
        <>
          <StarHalfIcon />
        </>
      ) : (
        <StarBorderIcon />
      )}
    </div>
  );
};
