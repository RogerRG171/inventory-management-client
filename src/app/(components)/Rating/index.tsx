import { Star } from 'lucide-react'
import React from 'react'

type RatingProps = {
  rating: number
}

const Rating = ({ rating }: RatingProps) => {
  return [1, 2, 3, 4, 5].map((i) => (
    <Star
      key={i}
      color={i <= rating ? '#ffc107' : '#e4e5e9'}
      className="h-4 w-4"
    />
  ))
}

export default Rating
