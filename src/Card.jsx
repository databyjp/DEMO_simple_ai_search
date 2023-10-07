const ObjCard = ({title="", body="", uuid=""}) => {
  const id_displayed = "ID: " + uuid.split("-")[0] + "..."
  return (
    <>
      <div>
        <div class="card my-2">
          <div class="card-body">
            <h5 class="card-title">{title}</h5>
            <span class="badge rounded-pill text-bg-light text-secondary">{id_displayed}</span>
            <p class="card-text">
              {body}
            </p>
            <a href="#" class="btn btn-info btn-sm">See more</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ObjCard;