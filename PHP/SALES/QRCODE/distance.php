<?php
function calc_distance($point1, $point2)
{
    $radius      = 3958;      // Earth's radius (miles)
    $deg_per_rad = 57.29578;  // Number of degrees/radian (for conversion)

    $distance = ($radius * pi() * sqrt(
                ($point1['lat'] - $point2['lat'])
                * ($point1['lat'] - $point2['lat'])
                + cos($point1['lat'] / $deg_per_rad)  // Convert these to
                * cos($point2['lat'] / $deg_per_rad)  // radians for cos()
                * ($point1['long'] - $point2['long'])
                * ($point1['long'] - $point2['long'])
        ) / 180);

    return $distance;  // Returned using the units used for $radius.
}


 calc_distance(624208,627123);
    
?>
