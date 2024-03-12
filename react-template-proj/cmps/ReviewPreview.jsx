export function ReviewPreview({ review, onRemoveReview }) {
    const { fullName, rating, readAt } = review
  
    return (
      <article className="review flex align-center justify-between">
        <span className="name">{fullName},</span>
        <span className="rating">{'⭐️'.repeat(rating)},</span>
        <span className="readAt">{readAt}</span>
        <span>
          <button onClick={() => onRemoveReview(review.id)}>X</button>
        </span>
      </article>
    )
  }
  