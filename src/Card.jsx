const ObjCard = ({title="", body="", uuid=""}) => {
  const id_displayed = "ID: " + uuid.split("-")[0] + "..."
  return (
    <>
      <div class="col-sm-4 mb-3 mb-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <span class="badge rounded-pill text-bg-light text-secondary">{id_displayed}</span>
            <p class="card-text">
              {body.length > 60 ? body.slice(0, 60) + "..." : body}
            </p>
            <a href="#" class="btn btn-secondary btn-sm">See more</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ObjCard;