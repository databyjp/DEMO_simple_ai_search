const Card = ({title="", body="", btn_body=""}) => {
  return (
    <>
      <div class="col-sm-4 mb-3 mb-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">
              {body.length > 60 ? body.slice(0, 60) + "..." : body}
            </p>
            <a href="#" class="btn btn-secondary btn-sm">ID: {btn_body.split("-")[0] + "..."}</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;